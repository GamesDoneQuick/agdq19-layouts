import {Total} from '../../../src/types/schemas/total';

const {customElement, property} = Polymer.decorators;

const cashTotal = nodecg.Replicant<Total>('total');
const autoUpdateTotal = nodecg.Replicant<boolean>('autoUpdateTotal');

@customElement('gdq-totals')
export default class GDQTotalsElement extends Polymer.Element {
	@property({type: String})
	cashTotal = '?';

	@property({type: String})
	bitsTotal = '?';

	@property({type: Boolean})
	autoUpdateTotal: boolean;

	@property({type: Boolean})
	recordTrackerEnabled: boolean;

	@property({type: String})
	_editTarget: string;

	ready() {
		super.ready();
		cashTotal.on('change', newVal => {
			this.cashTotal = newVal.formatted;
		});
		autoUpdateTotal.on('change', newVal => {
			this.autoUpdateTotal = newVal;
		});
	}

	editCashTotal() {
		if (!cashTotal.value) {
			return;
		}
		(this.$.editTotalInput as PaperInputElement).value = String(cashTotal.value.raw);
		this._editTarget = 'cash';
		(this.$.editDialog as PaperDialogElement).open();
	}

	_handleAutoUpdateToggleChange(e: Event) {
		if (!e.target) {
			return;
		}
		autoUpdateTotal.value = Boolean((e.target as PaperToggleButtonElement).checked);
	}

	_handleEditDialogConfirmed() {
		nodecg.sendMessage('setTotal', {
			type: this._editTarget,
			newValue: parseFloat(String((this.$.editTotalInput as PaperInputElement).value))
		});
	}
}
