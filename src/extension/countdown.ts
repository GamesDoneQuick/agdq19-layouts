'use strict';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as TimeUtils from './lib/time';
import {Countdown} from '../types/schemas/countdown';
import {CountdownRunning} from '../types/schemas/countdownRunning';

const nodecg = nodecgApiContext.get();
const time = nodecg.Replicant<Countdown>('countdown', {
	defaultValue: TimeUtils.createTimeStruct(600 * 1000),
	persistent: false
});
const running = nodecg.Replicant<CountdownRunning>('countdownRunning', {
	defaultValue: false,
	persistent: false
});
let countdownTimer: TimeUtils.CountdownTimer;

nodecg.listenFor('startCountdown', start);
nodecg.listenFor('stopCountdown', stop);

/**
 * Starts the countdown at the specified startTime.
 * @param startTime - A formatted time string, such as 1:00 for one hour.
 */
function start(startTime: string) {
	if (running.value) {
		return;
	}

	const durationMs = TimeUtils.parseTimeString(startTime);
	if (durationMs <= 0) {
		return;
	}

	running.value = true;
	time.value = TimeUtils.createTimeStruct(durationMs);

	if (countdownTimer) {
		countdownTimer.stop();
		countdownTimer.removeAllListeners();
	}

	countdownTimer = new TimeUtils.CountdownTimer(Date.now() + durationMs);
	countdownTimer.on('tick', remainingTimeStruct => {
		time.value = remainingTimeStruct;
	});
}

/**
 * Stops the countdown.
 */
function stop() {
	if (!running.value) {
		return;
	}

	running.value = false;
	if (countdownTimer) {
		countdownTimer.stop();
	}
}
