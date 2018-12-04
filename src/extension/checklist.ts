'use strict';

// Packages
import equals = require('deep-equal');
import * as clone from 'clone';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as obs from './obs';
import {Checklist, ChecklistGroup} from '../types/schemas/checklist';

const nodecg = nodecgApiContext.get();

// To edit the list of checklist items, edit the "default" value of schemas/checklist.json.
// Any changes you make will be fully picked up and integrated next time NodeCG starts.
const checklist = nodecg.Replicant<Checklist>('checklist');
const checklistDefault = checklist.schema.default as Checklist;

// Reconcile differences between persisted value and what we expect the checklistDefault to be.
const persistedValue = checklist.value;
if (!equals(persistedValue, checklistDefault)) {
	const mergedChecklist = clone(checklistDefault);

	for (const category in checklistDefault) { // tslint:disable-line:no-for-in
		if (!{}.hasOwnProperty.call(checklistDefault, category)) {
			continue;
		}

		const results = ((checklistDefault as any)[category] as ChecklistGroup).map(task => {
			const persistedGroup = (persistedValue as any)[category] as ChecklistGroup;
			if (persistedGroup) {
				const persistedTask = persistedGroup.find(({name}) => {
					return name === task.name;
				});

				if (persistedTask) {
					return persistedTask;
				}
			}

			return task;
		});
		((mergedChecklist as any)[category] as ChecklistGroup) = results;
	}

	checklist.value = mergedChecklist;
}

let initializedRecordingTask = false;
const checklistComplete = nodecg.Replicant('checklistComplete');
checklist.on('change', (newVal, oldVal) => {
	let foundIncompleteTask = false;

	Object.keys(newVal).forEach(category => {
		if (!foundIncompleteTask) {
			foundIncompleteTask = ((newVal as any)[category] as ChecklistGroup).some(task => !task.complete);
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

	const newCycleRecordingsTask = newVal.special.find(({name}) => name === 'Cycle Recordings');
	if (!newCycleRecordingsTask) {
		return;
	}

	if (!newCycleRecordingsTask.complete) {
		return;
	}

	if (!oldVal || !oldVal.special) {
		return cycleRecordings();
	}

	const oldCycleRecordingsTask = oldVal.special.find(({name}) => name === 'Cycle Recordings');
	if (!oldCycleRecordingsTask || !oldCycleRecordingsTask.complete) {
		return cycleRecordings();
	}
});

function cycleRecordings() {
	if (obs.compositingOBSConnected()) {
		obs.cycleRecordings().catch((error: Error) => {
			nodecg.log.error('Failed to cycle recordings:', error);
		});
	}
}

export function reset() {
	for (const category in checklist.value) { // tslint:disable-line:no-for-in
		if (!{}.hasOwnProperty.call(checklist.value, category)) {
			continue;
		}

		((checklist.value as any)[category] as ChecklistGroup).forEach(task => {
			task.complete = false;
		});
	}

	if (obs.compositingOBSConnected()) {
		obs.resetCropping();
	}
}
