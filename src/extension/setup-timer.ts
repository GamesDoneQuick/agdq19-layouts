// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as TimeUtils from './lib/time';
import {compositingOBS} from './obs';
import {isGameScene} from '../../dist/shared/lib/gdq-utils';
import {SetupMetrics} from '../types/schemas/setupMetrics';
import {Stopwatch} from '../types/schemas/stopwatch';

const nodecg = nodecgApiContext.get();
const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');
const setupMetrics = nodecg.Replicant<SetupMetrics>('setupMetrics');
let lastGameplayExitTransitionTimestamp: number;
let lastGameplayEntranceTransitionTimestamp: number;

setInterval(() => {
	updateState();
}, 100);

compositingOBS.on('TransitionBegin', data => {
	if (!data || !data['to-scene'] || !data['from-scene']) {
		return;
	}

	if (isGameScene(data['to-scene']) && !isGameScene(data['from-scene'])) {
		lastGameplayEntranceTransitionTimestamp = Date.now();
	}

	if (!isGameScene(data['to-scene']) && isGameScene(data['from-scene'])) {
		lastGameplayExitTransitionTimestamp = Date.now();
	}
});

function updateState() {
	if (!compositingOBS.replicants.programScene.value) {
		return;
	}

	const pgmSceneName = compositingOBS.replicants.programScene.value.name;

	if (isTimerFinished() && isGameScene(pgmSceneName)) {
		setupMetrics.value.timerFinishToTransition = TimeUtils.createTimeStruct(Date.now() - stopwatch.value.time.timestamp);
	}

	if (!isGameScene(pgmSceneName) && lastGameplayExitTransitionTimestamp) {
		setupMetrics.value.transitionToTransition = TimeUtils.createTimeStruct(Date.now() - lastGameplayExitTransitionTimestamp);
	}

	if (isGameScene(pgmSceneName) && !isTimerStarted() && lastGameplayEntranceTransitionTimestamp) {
		setupMetrics.value.transitionToTimerStart = TimeUtils.createTimeStruct(Date.now() - lastGameplayEntranceTransitionTimestamp);
	}
}

function isTimerStarted() {
	if (!stopwatch.value) {
		return true;
	}

	return stopwatch.value.state !== 'not_started';
}

function isTimerFinished() {
	if (!stopwatch.value) {
		return true;
	}

	return stopwatch.value.state === 'finished';
}
