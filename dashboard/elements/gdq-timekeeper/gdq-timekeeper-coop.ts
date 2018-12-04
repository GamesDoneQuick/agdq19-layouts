import {Runner} from '../../../src/types/Run';
import {StopwatchResult} from '../../../src/types/Timekeeping';

const {customElement, property} = Polymer.decorators;

@customElement('gdq-timekeeper-coop')
export default class GDQTimekeeperCoopElement extends Polymer.Element {
	@property({type: String})
	importPath: string; // https://github.com/Polymer/polymer-linter/issues/71

	@property({type: Number})
	index: number;

	@property({type: Array})
	runners: Runner[];

	@property({type: Array})
	results: (StopwatchResult | null)[];

	calcRunnerStatus(results: StopwatchResult[]) {
		if (results[0]) {
			return results[0].time.formatted;
		}

		return 'Running';
	}

	calcRunnerStatusClass(results: StopwatchResult[]) {
		if (results[0] && !results[0].forfeit) {
			return 'finished';
		}

		return '';
	}

	calcFinishHidden(results: StopwatchResult[]) {
		return results[0] && !results[0].forfeit;
	}

	calcResumeHidden(results: StopwatchResult[]) {
		return !results[0];
	}

	calcForfeitHidden(results: StopwatchResult[]) {
		return results[0] && results[0].forfeit;
	}

	calcEditDisabled(results: StopwatchResult[]) {
		return !results[0];
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

	calcConcatenatedRunners(runners: Runner[]) {
		let concatenatedRunners = runners[0].name;
		if (runners.length > 1) {
			concatenatedRunners = runners.slice(1).reduce((prev, curr, index, array) => {
				if (!curr || !curr.name) {
					return prev;
				}

				if (index === array.length - 1) {
					return `${prev} & ${curr.name}`;
				}

				return `${prev}, ${curr.name}`;
			}, concatenatedRunners);
		}
		return concatenatedRunners;
	}
}
