import {Run, Runner} from '../../../src/types/Run';

const {customElement, property} = Polymer.decorators;

@customElement('gdq-run-editor')
export default class GDQRunEditorElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Boolean})
	showingOriginal = false;

	@property({type: Boolean})
	coop: boolean;

	@property({type: String})
	releaseYear: string;

	@property({type: String})
	console: string;

	@property({type: String})
	estimate: string;

	@property({type: String})
	category: string;

	@property({type: String})
	name: string;

	@property({type: Object})
	originalValues: Partial<Run> | undefined;

	@property({type: Array})
	runners: (Runner | undefined)[];

	@property({type: Number})
	pk: number;

	loadRun(run: Run) {
		this.name = run.name;
		this.category = run.category;
		this.estimate = run.estimate;
		this.console = run.console;
		this.releaseYear = String(run.releaseYear);
		this.runners = run.runners.map(runner => {
			if (runner) {
				return {name: runner.name, stream: runner.stream};
			}

			return;
		});
		this.coop = run.coop;
		this.originalValues = run.originalValues;
		this.pk = run.pk;
	}

	applyChanges() {
		// We have to build a new runners object.
		const runners = [];
		const runnerNameInputs = this.$.runners.querySelectorAll('paper-input[label^="Runner"]:not([disabled])') as NodeListOf<PaperInputElement>;
		const runnerStreamInputs = this.$.runners.querySelectorAll('paper-input[label="Twitch Channel"]:not([disabled])') as NodeListOf<PaperInputElement>;
		for (let i = 0; i < 4; i++) {
			if (runnerNameInputs[i].value || runnerStreamInputs[i].value) {
				runners[i] = {
					name: runnerNameInputs[i].value,
					stream: runnerStreamInputs[i].value
				};
			}
		}

		nodecg.sendMessage('modifyRun', {
			name: this.name,
			category: this.category,
			estimate: this.estimate,
			console: this.console,
			releaseYear: this.releaseYear,
			coop: this.coop,
			runners,
			pk: this.pk
		}, () => {
			const dialog = this.closest('paper-dialog');
			if (dialog) {
				dialog.close();
			}
		});
	}

	resetRun() {
		nodecg.sendMessage('resetRun', this.pk, () => {
			const dialog = this.closest('paper-dialog');
			if (dialog) {
				dialog.close();
			}
		});
	}

	calcHide(path: string, showingOriginal: boolean) {
		const originalPath = path.split('.').slice(0);
		originalPath.unshift('originalValues');
		const originalValue = this.get(originalPath);
		const hasOriginal = originalValue !== undefined;
		return showingOriginal && hasOriginal;
	}

	showOriginal() {
		this.showingOriginal = true;
	}

	hideOriginal() {
		this.showingOriginal = false;
	}

	_moveRunnerDown(e: Event) {
		const target = e.target as PaperButtonElement;
		if (!target) {
			return;
		}

		const rowDiv = target.closest('[data-index]') as HTMLDivElement;
		if (!rowDiv) {
			return;
		}

		const index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
		this.runners = this._moveRunner(this.runners, index, 'down');
	}

	_moveRunnerUp(e: Event) {
		const target = e.target as PaperButtonElement;
		if (!target) {
			return;
		}

		const rowDiv = target.closest('[data-index]') as HTMLDivElement;
		if (!rowDiv) {
			return;
		}

		const index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
		this.runners = this._moveRunner(this.runners, index, 'up');
	}

	/**
	 * Moves a runner up or down in the runners array.
	 * @param runnersArray - The array of runners to base these changes on.
	 * @param index - The index of the runner to move in the array.
	 * @param direction - Which direction to move the runner in.
	 * @returns An array of runners with the desired runner re-arrangement applied to it.
	 */
	_moveRunner(runnersArray: (Runner | undefined)[], index: number, direction: 'up' | 'down') {
		if (isNaN(index)) {
			throw new Error(`Index must be a number, got "${index}" which is a "${typeof index}"`);
		}

		if (index < 0 || index >= 4) {
			throw new Error(`Index must be >= 0 and < 4, got "${index}"`);
		}

		const newRunnersArray = runnersArray.slice(0);
		while (newRunnersArray.length < 4) {
			newRunnersArray.push(undefined);
		}

		const runnerToMove = newRunnersArray.splice(index, 1)[0];
		newRunnersArray.splice(index + (direction === 'up' ? -1 : 1), 0, runnerToMove);
		return newRunnersArray.slice(0, 4);
	}
}
