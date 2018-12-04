// tslint:disable:no-dynamic-delete
'use strict';

// Packages
import * as clone from 'clone';
import {diff} from 'deep-diff';
import merge = require('lodash.merge');
import * as objectPath from 'object-path';

// Ours
import * as GDQTypes from '../../types';

/**
 * Calculates the original values for a modified run.
 * @param run - The modified run (currentRun or nextRun).
 * @param original - The original run as it exists in the schedule.
 * @returns The original values of any modified properties.
 */
export function calcOriginalValues(run: GDQTypes.Run, original: GDQTypes.Run) {
	run = clone(run); // tslint:disable-line:no-parameter-reassignment
	delete run.originalValues;
	const differences = diff(original, run);
	if (!differences) {
		return;
	}

	const originalValues = {} as Partial<GDQTypes.Run>;
	differences.forEach(difference => {
		switch (difference.kind) {
			case 'N':
				// The only place that 'N' differences can happen is in the "runners" array.
				/* istanbul ignore else: shouldn't be possible to enter the else path */
				if (difference.path[0] === 'runners') {
					if (!originalValues.runners) {
						originalValues.runners = [];
					}

					objectPath.set(originalValues, difference.path, '');
				} else {
					throw new Error(`Unexpected difference:\n${JSON.stringify(difference)}`);
				}

				break;
			case 'D':
				// The only place that 'D' differences can happen is in the "runners" array.
				/* istanbul ignore else: shouldn't be possible to enter the else path */
				if (difference.path[0] === 'runners') {
					if (!originalValues.runners) {
						originalValues.runners = [];
					}

					objectPath.set(originalValues, difference.path, difference.lhs);
				} else {
					throw new Error(`Unexpected difference:\n${JSON.stringify(difference)}`);
				}

				break;
			case 'A':
				// The only place that 'A' differences can happen is in the "runners" array.
				/* istanbul ignore else: shouldn't be possible to enter the else path */
				if (difference.path[0] === 'runners' && difference.path.length === 1) {
					if (!originalValues.runners) {
						originalValues.runners = [];
					}

					if (!difference.item || typeof difference.index !== 'number') {
						throw new Error(`Unexpected difference:\n${JSON.stringify(difference)}`);
					}

					switch (difference.item.kind) {
						case 'N':
							originalValues.runners[difference.index] = {name: '', stream: ''};
							break;
						case 'D':
							originalValues.runners[difference.index] = clone(original.runners[difference.index]);
							break;
						/* istanbul ignore next: shouldn't be possible to enter default path */
						default:
							throw new Error(`Unexpected difference:\n${JSON.stringify(difference)}`);
					}
				} else {
					throw new Error(`Unexpected difference:\n${JSON.stringify(difference)}`);
				}
				break;
			case 'E':
				objectPath.set(originalValues, difference.path, difference.lhs);
				break;
			/* istanbul ignore next: shouldn't be possible */
			default:
				throw new Error(`Unexpected difference:\n${JSON.stringify(difference)}`);
		}
	});

	return originalValues;
}

/**
 * Given an active run (currentRun or nextRun) and that same unmodified (but formatted) from the schedule,
 * returns a new run object with new changes from the tracker incorporated.
 * @param run - An active run (currentRun or nextRun)
 * @param unmodifiedRun - An unmodified (but formatted) run from the schedule.
 * @returns The merged run.
 */
export function mergeChangesFromTracker(run: GDQTypes.Run, unmodifiedRun: GDQTypes.Run) {
	// Immediately clone everything, because we can return either and the diffing code
	// relies on currentRun and nextRun never being the same object as what is in the schedule replicant.
	run = clone(run); // tslint:disable-line:no-parameter-reassignment
	unmodifiedRun = clone(unmodifiedRun); // tslint:disable-line:no-parameter-reassignment

	if (!run.originalValues) {
		return unmodifiedRun;
	}

	const oldOriginalValues = run.originalValues;
	const newOriginalValues = calcOriginalValues(run, unmodifiedRun);
	if (!newOriginalValues) {
		return unmodifiedRun;
	}

	const differences = diff(oldOriginalValues, newOriginalValues);
	if (!differences) {
		return run;
	}

	differences.forEach(difference => {
		let pathBase: string[] = [];
		let pathTip = '';
		if (difference.path) {
			pathBase = difference.path.length > 1 ? difference.path.slice(0, -1) : [];
			pathTip = difference.path[difference.path.length - 1];
		}

		if (!run.originalValues) {
			return;
		}

		switch (difference.kind) {
			case 'E':
				if (difference.path[0] === 'runners' && difference.rhs === '') {
					delete (objectPath.get(run, pathBase) as any)[pathTip];
				} else {
					objectPath.set(run, difference.path, difference.rhs);
				}

				delete (objectPath.get(run.originalValues, pathBase) as any)[pathTip];
				break;
			case 'N':
				if (typeof difference.rhs === 'object') {
					if (difference.path) {
						merge((objectPath.get(run, pathBase) as any)[pathTip], difference.rhs);
					} else {
						merge(run, difference.rhs);
					}
				} else {
					objectPath.set(run, difference.path, difference.rhs);
				}

				break;
			case 'D':
				if (difference.path) {
					delete (objectPath.get(run.originalValues, pathBase) as any)[pathTip];
				} else {
					for (const key in difference.lhs) { // tslint:disable-line:no-for-in
						/* istanbul ignore if */
						if (!{}.hasOwnProperty.call(difference.lhs, key)) {
							continue;
						}

						delete (run.originalValues as any)[key];
					}
				}
				break;
			/* istanbul ignore next: shouldn't be possible */
			default:
				throw new Error(`Unexpected difference:\n${JSON.stringify(difference)}`);
		}
	});

	if (run.originalValues) {
		if (run.originalValues.runners) {
			for (let i = 0; i < run.originalValues.runners.length; i++) {
				if (typeof run.originalValues.runners[i] === 'object' &&
					Object.keys(run.originalValues.runners[i]).length === 0) {
					delete run.originalValues.runners[i];
				}
			}

			if (Object.keys(run.originalValues.runners).length === 0) {
				delete run.originalValues.runners;
			}
		}

		if (Object.keys(run.originalValues).length === 0) {
			delete run.originalValues;
		}
	}

	if (run.runners) {
		run.runners = run.runners.filter((runner: GDQTypes.Runner) => {
			return runner.name || runner.stream;
		});
	}

	return run;
}
