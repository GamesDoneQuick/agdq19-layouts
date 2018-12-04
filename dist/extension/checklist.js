'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const equals = require("deep-equal");
const clone = require("clone");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const obs = require("./obs");
const nodecg = nodecgApiContext.get();
// To edit the list of checklist items, edit the "default" value of schemas/checklist.json.
// Any changes you make will be fully picked up and integrated next time NodeCG starts.
const checklist = nodecg.Replicant('checklist');
const checklistDefault = checklist.schema.default;
// Reconcile differences between persisted value and what we expect the checklistDefault to be.
const persistedValue = checklist.value;
if (!equals(persistedValue, checklistDefault)) {
    const mergedChecklist = clone(checklistDefault);
    for (const category in checklistDefault) { // tslint:disable-line:no-for-in
        if (!{}.hasOwnProperty.call(checklistDefault, category)) {
            continue;
        }
        const results = checklistDefault[category].map(task => {
            const persistedGroup = persistedValue[category];
            if (persistedGroup) {
                const persistedTask = persistedGroup.find(({ name }) => {
                    return name === task.name;
                });
                if (persistedTask) {
                    return persistedTask;
                }
            }
            return task;
        });
        mergedChecklist[category] = results;
    }
    checklist.value = mergedChecklist;
}
let initializedRecordingTask = false;
const checklistComplete = nodecg.Replicant('checklistComplete');
checklist.on('change', (newVal, oldVal) => {
    let foundIncompleteTask = false;
    Object.keys(newVal).forEach(category => {
        if (!foundIncompleteTask) {
            foundIncompleteTask = newVal[category].some(task => !task.complete);
        }
    });
    checklistComplete.value = !foundIncompleteTask;
    // Recording Cycling
    if (!initializedRecordingTask) {
        initializedRecordingTask = true;
        return;
    }
    if (!newVal.special) {
        return;
    }
    const newCycleRecordingsTask = newVal.special.find(({ name }) => name === 'Cycle Recordings');
    if (!newCycleRecordingsTask) {
        return;
    }
    if (!newCycleRecordingsTask.complete) {
        return;
    }
    if (!oldVal || !oldVal.special) {
        return cycleRecordings();
    }
    const oldCycleRecordingsTask = oldVal.special.find(({ name }) => name === 'Cycle Recordings');
    if (!oldCycleRecordingsTask || !oldCycleRecordingsTask.complete) {
        return cycleRecordings();
    }
});
function cycleRecordings() {
    if (obs.compositingOBSConnected()) {
        obs.cycleRecordings().catch((error) => {
            nodecg.log.error('Failed to cycle recordings:', error);
        });
    }
}
function reset() {
    for (const category in checklist.value) { // tslint:disable-line:no-for-in
        if (!{}.hasOwnProperty.call(checklist.value, category)) {
            continue;
        }
        checklist.value[category].forEach(task => {
            task.complete = false;
        });
    }
    if (obs.compositingOBSConnected()) {
        obs.resetCropping();
    }
}
exports.reset = reset;
//# sourceMappingURL=checklist.js.map