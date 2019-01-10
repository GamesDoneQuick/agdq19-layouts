"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const TimeUtils = require("./lib/time");
const obs_1 = require("./obs");
const gdq_utils_1 = require("../../dist/shared/lib/gdq-utils");
const nodecg = nodecgApiContext.get();
const stopwatch = nodecg.Replicant('stopwatch');
const setupMetrics = nodecg.Replicant('setupMetrics');
let lastGameplayExitTransitionTimestamp;
let lastGameplayEntranceTransitionTimestamp;
setInterval(() => {
    updateState();
}, 100);
obs_1.compositingOBS.on('TransitionBegin', data => {
    if (!data || !data['to-scene'] || !data['from-scene']) {
        return;
    }
    if (gdq_utils_1.isGameScene(data['to-scene']) && !gdq_utils_1.isGameScene(data['from-scene'])) {
        lastGameplayEntranceTransitionTimestamp = Date.now();
    }
    if (!gdq_utils_1.isGameScene(data['to-scene']) && gdq_utils_1.isGameScene(data['from-scene'])) {
        lastGameplayExitTransitionTimestamp = Date.now();
    }
});
function updateState() {
    if (!obs_1.compositingOBS.replicants.programScene.value) {
        return;
    }
    const pgmSceneName = obs_1.compositingOBS.replicants.programScene.value.name;
    if (isTimerFinished() && gdq_utils_1.isGameScene(pgmSceneName)) {
        setupMetrics.value.timerFinishToTransition = TimeUtils.createTimeStruct(Date.now() - stopwatch.value.time.timestamp);
    }
    if (!gdq_utils_1.isGameScene(pgmSceneName) && lastGameplayExitTransitionTimestamp) {
        setupMetrics.value.transitionToTransition = TimeUtils.createTimeStruct(Date.now() - lastGameplayExitTransitionTimestamp);
    }
    if (gdq_utils_1.isGameScene(pgmSceneName) && !isTimerStarted() && lastGameplayEntranceTransitionTimestamp) {
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
//# sourceMappingURL=setup-timer.js.map