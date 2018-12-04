import {Total} from '../../../../src/types/schemas/total';
import {Bits3Atotal} from '../../../../src/types/schemas/bits%3Atotal';

const {customElement, property} = Polymer.decorators;
const cashTotal = nodecg.Replicant<Total>('total');
const bitsTotal = nodecg.Replicant<Bits3Atotal>('bits:total');

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
