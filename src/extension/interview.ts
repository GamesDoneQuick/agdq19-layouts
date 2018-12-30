'use strict';

// Packages
import * as firebase from 'firebase-admin';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as TimeUtils from './lib/time';
import * as GDQTypes from '../types';
import {ListenForCb, Replicant} from '../types/nodecg';
import {InterviewThrowIncoming} from '../types/schemas/interview_throwIncoming';
import {InterviewQuestionSortMap} from '../types/schemas/interview_questionSortMap';
import {InterviewQuestionTweets} from '../types/schemas/interview_questionTweets';
import {InterviewStopwatch} from '../types/schemas/interview_stopwatch';
import {CurrentLayout} from '../types/schemas/currentLayout';
import {InterviewPrizePlaylist} from '../types/schemas/interview_prizePlaylist';
import {InterviewShowPrizesOnMonitor} from '../types/schemas/interview_showPrizesOnMonitor';

const nodecg = nodecgApiContext.get();

firebase.initializeApp({
	credential: firebase.credential.cert(nodecg.bundleConfig.firebase),
	databaseURL: `https://${nodecg.bundleConfig.firebase.project_id}.firebaseio.com`
});

const database = firebase.database();
const lowerthirdPulseTimeRemaining = nodecg.Replicant<number>('interview:lowerthirdTimeRemaining', {defaultValue: 0, persistent: false});
const lowerthirdShowing = nodecg.Replicant<boolean>('interview:lowerthirdShowing', {defaultValue: false, persistent: false});
const throwIncoming = nodecg.Replicant<InterviewThrowIncoming>('interview_throwIncoming');
const questionPulseTimeRemaining = nodecg.Replicant<number>('interview:questionTimeRemaining', {defaultValue: 0, persistent: false});
const questionShowing = nodecg.Replicant<boolean>('interview_questionShowing', {defaultValue: false, persistent: false});
const questionSortMap = nodecg.Replicant<InterviewQuestionSortMap>('interview_questionSortMap');
const questionTweetsRep = nodecg.Replicant<InterviewQuestionTweets>('interview_questionTweets');
const interviewStopwatch = nodecg.Replicant<InterviewStopwatch>('interview_stopwatch');
const currentLayout = nodecg.Replicant<CurrentLayout>('currentLayout');
const prizePlaylist = nodecg.Replicant<InterviewPrizePlaylist>('interview_prizePlaylist');
const showPrizesOnMonitor = nodecg.Replicant<InterviewShowPrizesOnMonitor>('interview_showPrizesOnMonitor');
const allPrizes = nodecg.Replicant<GDQTypes.Prize[]>('allPrizes');
const pulseIntervalMap = new Map();
const pulseTimeoutMap = new Map();
let interviewTimer: TimeUtils.CountupTimer | null;
let _repliesListener: (a: firebase.database.DataSnapshot | null, b?: string) => any;
let _repliesRef: firebase.database.Reference;

// Restore lost time, if applicable.
if (interviewStopwatch.value.running) {
	const missedTime = Date.now() - interviewStopwatch.value.time.timestamp;
	const previousTime = interviewStopwatch.value.time.raw;
	const offset = previousTime + missedTime;
	interviewStopwatch.value.running = false;
	startInterviewTimer(offset);
}

nodecg.Replicant('interview_names');

lowerthirdShowing.on('change', (newVal: boolean) => {
	if (!newVal) {
		clearTimerFromMap(lowerthirdShowing, pulseIntervalMap);
		clearTimerFromMap(lowerthirdShowing, pulseTimeoutMap);
		lowerthirdPulseTimeRemaining.value = 0;
	}
});

currentLayout.on('change', (newVal: string) => {
	if (newVal === 'interview') {
		throwIncoming.value = false;
		startInterviewTimer();
	} else {
		stopInterviewTimer();
	}
});

nodecg.listenFor('pulseInterviewLowerthird', (duration: number) => {
	pulse(lowerthirdShowing, lowerthirdPulseTimeRemaining, duration);
});

nodecg.listenFor('pulseInterviewQuestion', (id, cb) => {
	pulse(questionShowing, questionPulseTimeRemaining, 10).then(() => {
		markQuestionAsDone(id, cb);
	}).catch(error => {
		if (cb && !cb.handled) {
			cb(error);
		}
	});
});

questionShowing.on('change', (newVal: boolean) => {
	// Hide the interview lowerthird when a question starts showing.
	if (newVal) {
		lowerthirdShowing.value = false;
	} else {
		clearTimerFromMap(questionShowing, pulseIntervalMap);
		clearTimerFromMap(questionShowing, pulseTimeoutMap);
		questionPulseTimeRemaining.value = 0;
	}
});

questionSortMap.on('change', (newVal: any, oldVal: any) => {
	if (!oldVal || newVal[0] !== oldVal[0]) {
		questionShowing.value = false;
	}
});

database.ref('/active_tweet_id').on('value', activeTweetIdSnapshot => {
	if (!activeTweetIdSnapshot) {
		return;
	}

	if (_repliesRef && _repliesListener) {
		_repliesRef.off('value', _repliesListener);
	}

	const activeTweetID = activeTweetIdSnapshot.val();
	_repliesRef = database.ref(`/tweets/${activeTweetID}/replies`);
	_repliesListener = _repliesRef.on('value', repliesSnapshot => {
		if (!repliesSnapshot) {
			return;
		}

		const rawReplies = repliesSnapshot.val();
		const convertedAndFilteredReplies = [];
		for (const item in rawReplies) { //tslint:disable-line:no-for-in
			if (!{}.hasOwnProperty.call(rawReplies, item)) {
				continue;
			}

			const reply = rawReplies[item];

			// Exclude tweets that somehow have no approval status yet.
			if (!reply.approval_status) {
				continue;
			}

			// Exclude any tweet that hasn't been approved by tier1.
			if (reply.approval_status.tier1 !== 'approved') {
				continue;
			}

			// Exclude tweets that have already been marked as "done" by tier2 (this app).
			if (reply.approval_status.tier2 === 'done') {
				continue;
			}

			convertedAndFilteredReplies.push(reply);
		}

		questionTweetsRep.value = convertedAndFilteredReplies;
		updateQuestionSortMap();
	});
});

// Ensure that the prize playlist only contains prizes currently in the tracker.
allPrizes.on('change', (newVal: any) => {
	prizePlaylist.value = prizePlaylist.value.filter((playlistEntry: any) => {
		return newVal.find((prize: any) => {
			return prize.id === playlistEntry.id;
		});
	});
});

nodecg.listenFor('interview:updateQuestionSortMap', updateQuestionSortMap);

nodecg.listenFor('interview:markQuestionAsDone', markQuestionAsDone);

nodecg.listenFor('interview:end', () => {
	database.ref('/active_tweet_id').set(0);
});

nodecg.listenFor('interview:addPrizeToPlaylist', (prizeId: unknown) => {
	if (typeof prizeId !== 'number' || prizeId < 0) {
		return;
	}

	const existingIndex = prizePlaylist.value.findIndex(({id}: {id: number}) => id === prizeId);
	if (existingIndex >= 0) {
		return;
	}

	prizePlaylist.value.push({
		id: prizeId,
		complete: false
	});
});

nodecg.listenFor('interview:markPrizeAsDone', (prizeId: unknown) => {
	if (typeof prizeId !== 'number' || prizeId < 0) {
		return;
	}

	const entry = prizePlaylist.value.find(({id}: {id: number}) => id === prizeId);
	if (entry) {
		entry.complete = true;
	}
});

nodecg.listenFor('interview:markPrizeAsNotDone', (prizeId: unknown) => {
	if (typeof prizeId !== 'number' || prizeId < 0) {
		return;
	}

	const entry = prizePlaylist.value.find(({id}: {id: number}) => id === prizeId);
	if (entry) {
		entry.complete = false;
	}
});

nodecg.listenFor('interview:clearPrizePlaylist', () => {
	prizePlaylist.value = [];
});

nodecg.listenFor('interview:showPrizePlaylistOnMonitor', () => {
	showPrizesOnMonitor.value = true;
});

nodecg.listenFor('interview:hidePrizePlaylistOnMonitor', () => {
	showPrizesOnMonitor.value = false;
});

function markQuestionAsDone(id: any, cb: ListenForCb | undefined) {
	if (!_repliesRef) {
		if (cb && !cb.handled) {
			cb(new Error('_repliesRef not ready!'));
		}
		return;
	}

	if (!id) {
		if (cb && !cb.handled) {
			cb();
		}
		return;
	}

	_repliesRef.child(id).transaction(tweet => {
		if (tweet) {
			if (!tweet.approval_status) {
				tweet.approval_status = {}; // eslint-disable-line camelcase
			}

			tweet.approval_status.tier2 = 'done';
		}

		return tweet;
	}).then(() => {
		updateQuestionSortMap();
		if (cb && !cb.handled) {
			cb();
		}
	}).catch(error => {
		nodecg.log.error('[interview]', error);
		if (cb && !cb.handled) {
			cb(error);
		}
	});
}

/**
 * Fixes up the sort map by adding and new IDs and removing deleted IDs.
 */
function updateQuestionSortMap() {
	// To the sort map, add the IDs of any new question tweets.
	questionTweetsRep.value.forEach((tweet: GDQTypes.Tweet) => {
		if (questionSortMap.value.indexOf(tweet.id_str) < 0) {
			questionSortMap.value.push(tweet.id_str);
		}
	});

	// From the sort map, remove the IDs of any question tweets that were deleted or have been filtered out.
	for (let i = questionSortMap.value.length - 1; i >= 0; i--) {
		const result = questionTweetsRep.value.findIndex((tweet: GDQTypes.Tweet) => {
			return tweet.id_str === questionSortMap.value[i];
		});
		if (result < 0) {
			questionSortMap.value.splice(i, 1);
		}
	}
}

/**
 * Pulses a replicant for a specified duration, and tracks the remaining time in another replicant.
 * @param showingRep - The Boolean replicant that controls if the element is showing or not.
 * @param pulseTimeRemainingRep - The Number replicant that tracks the remaining time in this pulse.
 * @param duration - The desired duration of the pulse in seconds.
 * @returns A promise which resolves when the pulse has completed.
 */
async function pulse(showingRep: Replicant<boolean>, pulseTimeRemainingRep: Replicant<number>, duration: number) {
	return new Promise(resolve => {
		// Don't stack pulses
		if (showingRep.value) {
			return resolve();
		}

		showingRep.value = true;
		pulseTimeRemainingRep.value = duration;
		clearTimerFromMap(showingRep, pulseIntervalMap);
		clearTimerFromMap(showingRep, pulseTimeoutMap);

		// Count down lowerthirdPulseTimeRemaining
		pulseIntervalMap.set(showingRep, setInterval(() => {
			if (pulseTimeRemainingRep.value > 0) {
				pulseTimeRemainingRep.value--;
			} else {
				clearTimerFromMap(showingRep, pulseIntervalMap);
				pulseTimeRemainingRep.value = 0;
			}
		}, 1000));

		// End pulse after "duration" seconds
		pulseTimeoutMap.set(showingRep, setTimeout(() => {
			clearTimerFromMap(showingRep, pulseIntervalMap);
			pulseTimeRemainingRep.value = 0;
			showingRep.value = false;
			resolve();
		}, duration * 1000));
	});
}

function clearTimerFromMap(key: any, map: Map<any, number>) {
	clearInterval(map.get(key));
	clearTimeout(map.get(key));
	map.delete(key);
}

function startInterviewTimer(offset = 0) {
	if (interviewStopwatch.value.running) {
		return;
	}

	interviewStopwatch.value.running = true;
	interviewStopwatch.value.time = TimeUtils.createTimeStruct();
	if (interviewTimer) {
		interviewTimer.stop();
		interviewTimer.removeAllListeners();
	}

	interviewTimer = new TimeUtils.CountupTimer({offset});
	interviewTimer.on('tick', elapsedTimeStruct => {
		interviewStopwatch.value.time = elapsedTimeStruct;
	});
}

function stopInterviewTimer() {
	if (!interviewStopwatch.value.running) {
		return;
	}

	interviewStopwatch.value.running = false;
	if (interviewTimer) {
		interviewTimer.stop();
	}
}
