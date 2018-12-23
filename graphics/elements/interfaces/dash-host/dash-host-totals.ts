import {Total} from '../../../../src/types/schemas/total';
import {BitsTotal} from '../../../../src/types/schemas/bits_total';

const {customElement, property} = Polymer.decorators;
const cashTotal = nodecg.Replicant<Total>('total');
const bitsTotal = nodecg.Replicant<BitsTotal>('bits_total');

@customElement('dash-host-totals')
export default class DashHostTotalsElement extends Polymer.Element {
	@property({type: String})
	cashTotal: string;

	@property({type: String})
	bitsTotal: string;

	connectedCallback() {
		super.connectedCallback();
		cashTotal.on('change', newVal => {
			this.cashTotal = newVal.formatted;
		});
		bitsTotal.on('change', newVal => {
			this.bitsTotal = newVal.toLocaleString('en-US');
		});
	}
}
