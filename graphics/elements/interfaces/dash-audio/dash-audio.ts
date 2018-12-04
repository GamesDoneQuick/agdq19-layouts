import {Checklist, ChecklistGroup} from '../../../../src/types/schemas/checklist';
import {Run, Runner} from '../../../../src/types';
import {ChecklistComplete} from '../../../../src/types/schemas/checklistComplete';
import {Stopwatch} from '../../../../src/types/schemas/stopwatch';

const {customElement, property} = Polymer.decorators;

const checklist = nodecg.Replicant<Checklist>('checklist');
const checklistComplete = nodecg.Replicant<ChecklistComplete>('checklistComplete');
const currentRun = nodecg.Replicant<Run>('currentRun');
const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');

@customElement('dash-audio')
export default class DashAudioElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	audioEngineerDuties: ChecklistGroup;

	@property({type: Array})
	runners: Runner[];

	@property({type: String})
	stopwatchTime: string;

	@property({type: String})
	stopwatchState: 'not_started' | 'running' | 'paused' | 'finished';

	@property({type: Array})
	stopwatchResults: (null | {
		time: {
			days: number;
			hours: number;
			minutes: number;
			seconds: number;
			milliseconds: number;
			formatted: string;
			raw: number;
			timestamp: number;
		};
		place: number;
		forfeit: boolean;
	})[];

	ready() {
		super.ready();

		checklist.on('change', newVal => {
			this.audioEngineerDuties = newVal.audioEngineerDuties;
		});

		checklistComplete.on('change', newVal => {
			const statusDiv = this.$.checklistStatus as HTMLDivElement;
			if (newVal) {
				statusDiv.style.backgroundColor = '#cfffcf';
				statusDiv.innerText = 'READY TO START';
			} else {
				statusDiv.style.backgroundColor = '#ffe2e2';
				statusDiv.innerText = 'NOT READY YET';
			}
		});

		currentRun.on('change', newVal => {
			this.$['currentRun-name'].innerHTML = newVal.name.replace('\\n', '<br/>').trim();
			this.runners = newVal.runners;
		});

		stopwatch.on('change', newVal => {
			this.stopwatchState = newVal.state;
			this.stopwatchTime = newVal.time.formatted;
			this.stopwatchResults = newVal.results;
		});

		this._checkboxChanged = this._checkboxChanged.bind(this);
		this.addEventListener('change', this._checkboxChanged);
	}

	calcRunnersString(runners: Runner[]) {
		let concatenatedRunners = runners[0].name;
		if (runners.length >= 1) {
			concatenatedRunners = runners.slice(1).reduce((prev, curr, index, array) => {
				if (index === array.length - 1) {
					return `${prev} & ${curr.name}`;
				}

				return `${prev}, ${curr.name}`;
			}, concatenatedRunners);
		}
		return concatenatedRunners;
	}

	_checkboxChanged(e: Event) {
		if (!checklist.value) {
			return;
		}

		const target = e.composedPath()[0] as PaperCheckboxElement;
		const category = target.getAttribute('category') as keyof Checklist;
		const name = target.innerText.trim();
		checklist.value[category].find(task => {
			if (task.name === name) {
				task.complete = Boolean(target.checked);
				return true;
			}

			return false;
		});
	}
}
