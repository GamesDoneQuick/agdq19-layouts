'use strict';

import {CurrentRun} from '../types/schemas/currentRun';

const LS_TIMER_PHASE = {
	NotRunning: 0,
	Running: 1,
	Ended: 2,
	Paused: 3
};

// Packages
import * as clone from 'clone';
import * as liveSplitCore from 'livesplit-core';
import gamepad = require('gamepad');
import * as usbDetect from 'usb-detection';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as TimeUtils from './lib/time';
import * as GDQTypes from '../types';
import {Stopwatch} from '../types/schemas/stopwatch';

const lsRun = liveSplitCore.Run.new();
const segment = liveSplitCore.Segment.new('finish');
lsRun.pushSegment(segment);
const timer = liveSplitCore.Timer.new(lsRun);

const nodecg = nodecgApiContext.get();
const checklistComplete = nodecg.Replicant<boolean>('checklistComplete');
const currentRun = nodecg.Replicant<CurrentRun>('currentRun');
const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');

// Load the existing time and start the stopwatch at that.
timer.start();
timer.pause();
initGameTime();
if (stopwatch.value.state === GDQTypes.StopwatchStateEnum.RUNNING) {
	const missedTime = Date.now() - stopwatch.value.time.timestamp;
	const previousTime = stopwatch.value.time.raw;
	const timeOffset = previousTime + missedTime;
	nodecg.log.info('Recovered %s seconds of lost time.', (missedTime / 1000).toFixed(2));
	start(true);
	liveSplitCore.TimeSpan.fromSeconds(timeOffset / 1000).with((t: any) => timer.setGameTime(t));
}

nodecg.listenFor('startTimer', start);
nodecg.listenFor('stopTimer', pause);
nodecg.listenFor('resetTimer', reset);
nodecg.listenFor('completeRunner', (data: {index: number; forfeit: boolean}) => {
	if (!currentRun.value) {
		return;
	}

	if (currentRun.value.coop) {
		// Finish all runners.
		currentRun.value.runners.forEach((runner: GDQTypes.Runner, index: number) => {
			if (!runner) {
				return;
			}

			completeRunner({index, forfeit: data.forfeit});
		});
	} else {
		completeRunner(data);
	}
});
nodecg.listenFor('resumeRunner', (index: number) => {
	if (!currentRun.value) {
		return;
	}

	if (currentRun.value.coop) {
		// Resume all runners.
		currentRun.value.runners.forEach((runner: GDQTypes.Runner, runnerIndex: number) => {
			if (!runner) {
				return;
			}

			resumeRunner(runnerIndex);
		});
	} else {
		resumeRunner(index);
	}
});
nodecg.listenFor('editTime', editTime);

if (nodecg.bundleConfig.footpedal.enabled) {
	gamepad.init();
	usbDetect.startMonitoring();

	// Poll for events
	setInterval(gamepad.processEvents, 16); // tslint:disable-line no-string-based-set-interval

	// Update the list of gamepads when usb-detection sees a change.
	usbDetect.on('change', () => {
		nodecg.log.info('USB devices changed, checking for new gamepads.');
		gamepad.detectDevices();
	});

	// Listen for buttonId down event from our target gamepad.
	gamepad.on('down', (_id, num) => {
		if (num !== nodecg.bundleConfig.footpedal.buttonId) {
			return;
		}

		if (!currentRun.value) {
			return;
		}

		if (stopwatch.value.state === GDQTypes.StopwatchStateEnum.RUNNING) {
			// If this is a race, don't let the pedal finish the timer.
			if (currentRun.value.runners.length > 1 && !currentRun.value.coop) {
				nodecg.log.warn('Footpedal was hit to finish the timer, but this is a race so no action will be taken.');
				return;
			}

			nodecg.log.info('Footpedal hit, finishing timer.');

			// Finish all runners.
			currentRun.value.runners.forEach((runner: GDQTypes.Runner, index: number) => {
				if (!runner) {
					return;
				}

				completeRunner({index, forfeit: false});
			});
		} else if (stopwatch.value.state === GDQTypes.StopwatchStateEnum.NOT_STARTED) {
			if (!checklistComplete.value) {
				nodecg.log.warn('Footpedal was hit to start the timer, but the checklist is not complete so no action will be taken.');
				return;
			}

			nodecg.log.info('Footpedal hit, starting timer.');
			start();

			// Resume all runners.
			currentRun.value.runners.forEach((runner: GDQTypes.Runner, index: number) => {
				if (!runner) {
					return;
				}

				resumeRunner(index);
			});
		} else {
			nodecg.log.warn('Footpedal was hit in a forbidden stopwatch state (%s), ignoring.', stopwatch.value.state);
		}
	});
}

setInterval(tick, 100); // 10 times per second.

/**
 * Starts the timer.
 * @param force - Forces the timer to start again, even if already running.
 */
export function start(force = false) {
	if (!force && stopwatch.value.state === GDQTypes.StopwatchStateEnum.RUNNING) {
		return;
	}

	stopwatch.value.state = GDQTypes.StopwatchStateEnum.RUNNING;
	if (timer.currentPhase() === LS_TIMER_PHASE.NotRunning) {
		timer.start();
		initGameTime();
	} else {
		timer.resume();
	}
}

function initGameTime() {
	liveSplitCore.TimeSpan.fromSeconds(0).with((t: any) => timer.setLoadingTimes(t));
	timer.initializeGameTime();
	const existingSeconds = stopwatch.value.time.raw / 1000;
	liveSplitCore.TimeSpan.fromSeconds(existingSeconds).with((t: any) => timer.setGameTime(t));
}

/**
 * Updates the stopwatch replicant.
 */
function tick() {
	if (stopwatch.value.state !== GDQTypes.StopwatchStateEnum.RUNNING) {
		return;
	}

	const time = timer.currentTime();
	const gameTime = time.gameTime();
	if (!gameTime) {
		return;
	}

	stopwatch.value.time = TimeUtils.createTimeStruct((gameTime.totalSeconds() * 1000));
}

/**
 * Pauses the timer.
 */
export function pause() {
	timer.pause();
	stopwatch.value.state = GDQTypes.StopwatchStateEnum.PAUSED;
}

/**
 * Pauses and resets the timer, clearing the time and results.
 */
export function reset() {
	pause();
	timer.reset(true);
	stopwatch.value.time = TimeUtils.createTimeStruct();
	stopwatch.value.results = [null, null, null, null];
	stopwatch.value.state = GDQTypes.StopwatchStateEnum.NOT_STARTED;
}

/**
 * Marks a runner as complete.
 * @param index - The runner to modify (0-3).
 * @param forfeit - Whether or not the runner forfeit.
 */
function completeRunner({index, forfeit}: {index: number; forfeit: boolean}) {
	if (!stopwatch.value.results[index]) {
		stopwatch.value.results[index] = {
			time: clone(stopwatch.value.time),
			place: 0,
			forfeit: false
		};
	}

	(stopwatch.value.results[index] as any).forfeit = forfeit;
	recalcPlaces();
}

/**
 * Marks a runner as still running.
 * @param index - The runner to modify (0-3).
 */
function resumeRunner(index: number) {
	stopwatch.value.results[index] = null;
	recalcPlaces();

	if (stopwatch.value.state === GDQTypes.StopwatchStateEnum.FINISHED) {
		const missedMilliseconds = Date.now() - stopwatch.value.time.timestamp;
		const newMilliseconds = stopwatch.value.time.raw + missedMilliseconds;
		stopwatch.value.time = TimeUtils.createTimeStruct(newMilliseconds);
		liveSplitCore.TimeSpan.fromSeconds(newMilliseconds / 1000).with((t: any) => timer.setGameTime(t));
		start();
	}
}

/**
 * Edits the final time of a result.
 * @param index - The result index to edit.
 * @param newTime - A hh:mm:ss (or mm:ss) formatted new time.
 */
function editTime({index, newTime}: {index: number | string; newTime: string}) {
	if (!newTime) {
		return;
	}

	if (!currentRun.value) {
		return;
	}

	const newMilliseconds = TimeUtils.parseTimeString(newTime);
	if (isNaN(newMilliseconds)) {
		return;
	}

	if (index === 'master' || currentRun.value.runners.length === 1) {
		if (newMilliseconds === 0) {
			return reset();
		}

		stopwatch.value.time = TimeUtils.createTimeStruct(newMilliseconds);
		liveSplitCore.TimeSpan.fromSeconds(newMilliseconds / 1000).with((t: any) => timer.setGameTime(t));
	}

	if (typeof index === 'number' && stopwatch.value.results[index]) {
		(stopwatch.value.results as any)[index].time = TimeUtils.createTimeStruct(newMilliseconds);
		recalcPlaces();
	}
}

/**
 * Re-calculates the podium place for all runners.
 */
function recalcPlaces() {
	const finishedResults = stopwatch.value.results.filter((r: GDQTypes.StopwatchResult) => {
		if (r) {
			r.place = 0;
			return !r.forfeit;
		}

		return false;
	}) as GDQTypes.StopwatchResult[];

	finishedResults.sort((a, b) => {
		return a.time.raw - b.time.raw;
	});

	finishedResults.forEach((r, index) => {
		r.place = index + 1;
	});

	// If every runner is finished, stop ticking and set timer state to "finished".
	let allRunnersFinished = true;
	if (currentRun.value) {
		currentRun.value.runners.forEach((runner: GDQTypes.Runner, index: number) => {
			if (!runner) {
				return;
			}

			if (!stopwatch.value.results[index]) {
				allRunnersFinished = false;
			}
		});
	}

	if (allRunnersFinished) {
		pause();
		stopwatch.value.state = GDQTypes.StopwatchStateEnum.FINISHED;
	}
}
