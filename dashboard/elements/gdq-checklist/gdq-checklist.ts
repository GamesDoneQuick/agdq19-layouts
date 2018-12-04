import {Checklist, ChecklistGroup} from '../../../src/types/schemas/checklist';

const {customElement, property} = Polymer.decorators;
const checklist = nodecg.Replicant<Checklist>('checklist');

@customElement('gdq-checklist')
export default class GDQChecklistElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	stageTechDuties: ChecklistGroup;

	@property({type: Array})
	extraContent: ChecklistGroup;

	@property({type: Array})
	techStationDuties: ChecklistGroup;

	@property({type: Boolean})
	audioReady: boolean;

	@property({type: Boolean})
	recordingsCycled: boolean;

	ready() {
		super.ready();
		checklist.on('change', newVal => {
			if (!newVal) {
				return;
			}
			this.extraContent = newVal.extraContent;
			this.techStationDuties = newVal.techStationDuties;
			this.stageTechDuties = newVal.stageTechDuties;
			this.audioReady = newVal.audioEngineerDuties.every(task => task.complete);

			const cycleRecordingsTask = newVal.special.find(task => task.name === 'Cycle Recordings');
			if (cycleRecordingsTask) {
				this.recordingsCycled = cycleRecordingsTask.complete;
			}
		});

		this._checkboxChanged = this._checkboxChanged.bind(this);
		this.addEventListener('change', this._checkboxChanged);
	}

	_checkboxChanged(e: Event) {
		const target = e.composedPath()[0] as PaperCheckboxElement;
		const category = target.getAttribute('category');
		const name = target.hasAttribute('name') ?
			target.getAttribute('name') :
			target.innerText.trim();

		if (!category) {
			return;
		}

		((checklist.value as any)[category] as ChecklistGroup).find(task => {
			if (task.name === name) {
				task.complete = Boolean(target.checked);
				return true;
			}

			return false;
		});
	}
}
