import {Run, Runner, StopwatchResult} from '../../../../src/types';
import {ChecklistComplete} from '../../../../src/types/schemas/checklistComplete';
import {Stopwatch} from '../../../../src/types/schemas/stopwatch';

const {customElement, property} = Polymer.decorators;
const checklistComplete = nodecg.Replicant<ChecklistComplete>('checklistComplete');
const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');
const currentRun = nodecg.Replicant<Run>('currentRun');

/**
 * @customElement
 * @polymer
 */
@customElement('dash-host-currentrun')
export default class DashHostCurrentrunElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Boolean, reflectToAttribute: true})
	checklistComplete = false;

	@property({type: String})
	stopwatchTime: string;

	@property({type: Array})
	stopwatchResults: (StopwatchResult | null)[];

	@property({type: Array})
	runners: Runner[];

	ready() {
		super.ready();

		checklistComplete.on('change', newVal => {
			this.checklistComplete = newVal;
		});

		currentRun.on('change', newVal => {
			this.$.currentRunName.innerHTML = newVal.name.replace('\\n', '<br/>').trim();
			this.runners = newVal.runners;
		});

		stopwatch.on('change', newVal => {
			this.stopwatchTime = newVal.time.formatted;
			this.stopwatchResults = newVal.results;
		});
	}

	isValidResult(result: StopwatchResult | null, index: number, runners: Runner[]) {
		const runner = runners[index] as Runner;
		return result && result !== null && runner && runner.name;
	}

	_calcStatusText(newVal: boolean) {
		return newVal ? 'READY' : 'NOT READY';
	}

	_unionRunnersAndResults(runners?: Runner[], results?: StopwatchResult) {
		if (!runners || !results) {
			return;
		}

		return runners.map((runner, index) => {
			return {runner, result: (results as any)[index]};
		});
	}

	_calcRunnerStatus(result: StopwatchResult) {
		if (result && result.time) {
			return result.time.formatted;
		}

		return 'Running';
	}
}
