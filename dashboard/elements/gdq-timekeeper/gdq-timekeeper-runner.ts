import {Runner} from '../../../src/types/Run';
import {StopwatchResult} from '../../../src/types/Timekeeping';

const {customElement, property} = Polymer.decorators;

@customElement('gdq-timekeeper-runner')
export default class GDQTimekeeperRunnerElement extends Polymer.Element {
	@property({type: String})
	importPath: string; // https://github.com/Polymer/polymer-linter/issues/71

	@property({type: Number})
	index: number;

	@property({type: Object})
	runner: Runner;

	@property({type: Array})
	results: (StopwatchResult | null)[];

	calcRunnerStatus(results: StopwatchResult[], index: number) {
		if (!results) {
			return;
		}

		if (results[index] && results[index].time) {
			return results[index].time.formatted;
		}

		return 'Running';
	}

	calcRunnerStatusClass(results: StopwatchResult[], index: number) {
		if (!results) {
			return;
		}

		if (results[index] && !results[index].forfeit) {
			return 'finished';
		}

		return '';
	}

	calcFinishHidden(results: StopwatchResult[], index: number) {
		if (!results) {
			return;
		}

		return results[index] && !results[index].forfeit;
	}

	calcResumeHidden(results: StopwatchResult[], index: number) {
		if (!results) {
			return;
		}

		return !results[index];
	}

	calcForfeitHidden(results: StopwatchResult[], index: number) {
		if (!results) {
			return;
		}

		return results[index] && results[index].forfeit;
	}

	calcEditDisabled(results: StopwatchResult[], runnerIndex: number) {
		if (!results) {
			return;
		}

		return !results[runnerIndex];
	}

	finish() {
		nodecg.sendMessage('completeRunner', {index: this.index, forfeit: false});
	}

	forfeit() {
		nodecg.sendMessage('completeRunner', {index: this.index, forfeit: true});
	}

	resume() {
		nodecg.sendMessage('resumeRunner', this.index);
	}

	editTime() {
		this.dispatchEvent(new CustomEvent('edit-time', {bubbles: true, composed: true}));
	}
}
