import {Stopwatch} from '../../../src/types/schemas/stopwatch';
import {Checklist, ChecklistGroup} from '../../../src/types/schemas/checklist';
import UiToastElement from '../../../shared/elements/interfaces/ui-toast/ui-toast';

const {customElement, property, observe} = Polymer.decorators;
const checklistRep = nodecg.Replicant<Checklist>('checklist');
const stopwatchRep = nodecg.Replicant<Stopwatch>('stopwatch');
const cyclingRecordingsRep = nodecg.Replicant<boolean>('obs:cyclingRecordings');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-checklist-recording')
export default class GDQChecklistRecordingElement extends Polymer.Element {
	@property({type: String})
	name: string;

	@property({type: String})
	category: string;

	@property({type: Boolean, notify: true, reflectToAttribute: true})
	checked: boolean;

	@property({type: Boolean, reflectToAttribute: true})
	warning: boolean;

	@property({type: Boolean, reflectToAttribute: true})
	disabled: boolean;

	@property({type: Boolean})
	_stopwatchState: boolean;

	@property({type: Boolean})
	_cyclingRecordings: boolean;

	ready() {
		super.ready();

		checklistRep.on('change', newVal => {
			if (!newVal) {
				return;
			}

			const incompleteTasks: ChecklistGroup = [];
			for (const key in newVal) { // tslint:disable-line:no-for-in
				if (!{}.hasOwnProperty.call(newVal, key)) {
					continue;
				}

				const category = (newVal as any)[key] as ChecklistGroup;
				category.forEach(task => {
					if (!task.complete) {
						incompleteTasks.push(task);
					}
				});
			}
			this.warning = incompleteTasks.length > 1 && incompleteTasks[0].name !== 'Cycle Recordings';
		});

		stopwatchRep.on('change', newVal => {
			if (!newVal) {
				return;
			}

			this._stopwatchState = newVal.state === 'running';
		});

		cyclingRecordingsRep.on('change', newVal => {
			this._cyclingRecordings = newVal;
		});

		nodecg.listenFor('obs:recordingsCycled', error => {
			const toast = this.$.toast as UiToastElement;

			if (error) {
				let errorString = error;
				if (error.message) {
					errorString = error.message;
				} else if (error.error) {
					errorString = error.error;
				}
				toast.showErrorToast('Failed to cycle recordings: ' + errorString);
			} else {
				toast.showSuccessToast('Recordings cycled.');
			}
		});

		this.addEventListener('click', () => {
			const checkbox = this.$.checkbox as PaperCheckboxElement;
			checkbox.click();
		});
	}

	@observe('_stopwatchState', '_cyclingRecordings')
	_calcDisabled(stopwatchState: boolean, cyclingRecordings: boolean) {
		this.disabled = Boolean(stopwatchState || cyclingRecordings);
	}

	_calcContextPage(warning: boolean, disabled: boolean, cyclingRecordings: boolean) {
		if (cyclingRecordings) {
			return 'cycling';
		}

		if (disabled) {
			return 'disabled';
		}

		if (warning) {
			return 'warning';
		}

		return 'all-clear';
	}
}
