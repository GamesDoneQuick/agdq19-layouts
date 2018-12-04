import {Checklist, ChecklistGroup, ChecklistTask} from '../../../../src/types/schemas/checklist';

const {customElement, property} = Polymer.decorators;
const checklist = nodecg.Replicant<Checklist>('checklist');

/**
 * @customElement
 * @polymer
 */
@customElement('dash-producer-checklist')
export default class DashProducerChecklistElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	stageTechDuties: ChecklistGroup;

	@property({type: Array})
	extraContent: ChecklistGroup;

	@property({type: Array})
	audioReady: ChecklistGroup;

	@property({type: Array})
	techStationDuties: ChecklistGroup;

	@property({type: Array})
	audioEngineerDuties: ChecklistGroup;

	@property({type: Array})
	specialDuties: ChecklistGroup;

	ready() {
		super.ready();
		checklist.on('change', newVal => {
			this.extraContent = newVal.extraContent;
			this.techStationDuties = newVal.techStationDuties;
			this.stageTechDuties = newVal.stageTechDuties;
			this.audioEngineerDuties = newVal.audioEngineerDuties;
			this.specialDuties = newVal.special;
		});
	}

	_calcItemName(item: ChecklistTask) {
		return item ? (item.shortName || item.name) : '';
	}
}
