import {ChildBid, ParentBid} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('dash-host-bid-option')
export default class DashHostBidOptionElement extends Polymer.Element {
	@property({type: Object})
	bid: ParentBid;

	@property({type: Object})
	option: ChildBid;

	@property({type: Number, reflectToAttribute: true})
	index: number;

	calcOptionMeterFillStyle(bid: ParentBid, option: ChildBid) {
		if (!bid || !option || !bid.options || bid.options.length <= 0) {
			return '';
		}

		let percent = option.rawTotal / bid.options[0].rawTotal;
		percent = Math.max(percent, 0); // Clamp to min 0
		percent = Math.min(percent, 1); // Clamp to max 1
		if (Number.isNaN(percent)) {
			percent = 0;
		}
		return `transform: scaleX(${percent});`;
	}
}
