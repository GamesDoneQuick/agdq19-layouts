import {Runner} from '../../../src/types/Run';
import {Stopwatch} from '../../../src/types/schemas/stopwatch';
import {CurrentRun} from '../../../src/types/schemas/currentRun';
import {ChecklistComplete} from '../../../src/types/schemas/checklistComplete';
import {StopwatchResult} from '../../../src/types/Timekeeping';

const {customElement, property} = Polymer.decorators;
const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');
const currentRun = nodecg.Replicant<CurrentRun>('currentRun');
const checklistComplete = nodecg.Replicant<ChecklistComplete>('checklistComplete');

@customElement('gdq-timekeeper')
export default class GDQTimekeeperElement extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true})
	checklistIncomplete = true;

	@property({type: String, reflectToAttribute: true})
	state: string;

	@property({type: Boolean, reflectToAttribute: true})
	paused: boolean;

	@property({type: Array})
	results: (StopwatchResult | null)[];

	@property({type: Boolean})
	coop: boolean;

	@property({type: Boolean})
	notStarted: boolean;

	@property({type: Array})
	runners: Runner[];

	@property({type: String})
	time: string;

	ready() {
		super.ready();
		stopwatch.on('change', this.stopwatchChanged.bind(this));
		currentRun.on('change', newVal => {
			if (!newVal) {
				return;
			}

			const runners = newVal.runners.slice(0);
			runners.length = 4;
			for (let i = 0; i < 4; i++) {
				runners[i] = runners[i] || false;
			}
			this.runners = runners;
			this.coop = newVal.coop;
		});
		checklistComplete.on('change', newVal => {
			this.checklistIncomplete = !newVal;
		});
	}

	stopwatchChanged(newVal: Stopwatch | undefined) {
		if (!newVal) {
			return;
		}
		this.state = newVal.state;
		this.time = newVal.time.formatted;
		this.results = newVal.results.slice(0);
		this.notStarted = newVal.state === 'not_started';
		this.paused = newVal.state === 'paused';
	}

	confirmReset() {
		(this.$.resetDialog as PaperDialogElement).open();
	}

	startTimer() {
		nodecg.sendMessage('startTimer');
	}

	stopTimer() {
		nodecg.sendMessage('stopTimer');
	}

	resetTimer() {
		nodecg.sendMessage('resetTimer');
	}

	calcStartDisabled(checklistIncomplete: boolean, state: string) {
		return checklistIncomplete || state === 'running' || state === 'finished';
	}

	calcStartText(state: string) {
		switch (state) {
			case 'paused':
				return 'Resume';
			default:
				return 'Start';
		}
	}

	calcPauseDisabled(state: string) {
		return state !== 'running';
	}

	editMasterTime() {
		this.$['editDialog-text'].textContent = 'Enter a new master time.';
		this.$.editDialog.setAttribute('data-index', 'master');
		(this.$['editDialog-input'] as PaperInputElement).value = this.time;
		(this.$.editDialog as PaperDialogElement).open();
	}

	saveEditedTime() {
		const inputEl = this.$['editDialog-input'] as PaperInputElement;
		nodecg.sendMessage('editTime', {
			index: this.$.editDialog.getAttribute('data-index'),
			newTime: inputEl.value
		});
		inputEl.value = '';
	}

	editRunnerTime(e: Event) {
		const model = (e as any).model;
		this.$['editDialog-text'].innerHTML = `Enter a new final time for <b>${model.runner.name}.</b>`;
		this.$.editDialog.setAttribute('data-index', model.index);

		const result = this.results[model.index];
		if (result) {
			(this.$['editDialog-input'] as PaperInputElement).value = result.time.formatted;
			(this.$.editDialog as PaperDialogElement).open();
		}
	}

	editCoopTime() {
		this.$['editDialog-text'].innerHTML = 'Enter a new final time for <b>all runners.</b>';
		this.$.editDialog.setAttribute('data-index', '0');

		const result = this.results[0];
		if (result) {
			(this.$['editDialog-input'] as PaperInputElement).value = result.time.formatted;
			(this.$.editDialog as PaperDialogElement).open();
		}
	}
}
