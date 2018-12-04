import {Prize} from '../../../../src/types';
import GDQOmnibarListItemElement from './gdq-omnibar-list-item';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-prize')
export default class GDQOmnibarPrizeElement extends Polymer.Element {
	@property({type: Object})
	prize: Prize;

	enter() {
		return (this.$.listItem as GDQOmnibarListItemElement).enter();
	}

	exit() {
		return (this.$.listItem as GDQOmnibarListItemElement).exit();
	}

	calcBidAmountText(prize: Prize) {
		return prize.sumdonations ?
			`${prize.minimumbid} in Total Donations` :
			`${prize.minimumbid} Single Donation`;
	}
}
