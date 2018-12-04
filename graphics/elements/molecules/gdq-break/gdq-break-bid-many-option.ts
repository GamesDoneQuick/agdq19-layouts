import {ChildBid, ParentBid} from '../../../../src/types/index';
import {TimelineLite, Power2} from 'gsap';
import AtomTweeningNumberElement from '../../atoms/atom-tweening-number/atom-tweening-number';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-bid-many-option')
export default class GDQBreakBidManyOptionElement extends Polymer.Element {
	@property({type: Object})
	bid: ParentBid;

	@property({type: Object})
	option: ChildBid;

	ready() {
		super.ready();
		const amountElem = this.$.amount as AtomTweeningNumberElement;
		amountElem.ease = Power2.easeOut;
		amountElem.displayValueTransform = displayValue => {
			return '$' + displayValue.toLocaleString('en-US', {
				maximumFractionDigits: 0,
				useGrouping: false
			});
		};
	}

	enter() {
		let meterPercent = this.option.rawTotal / this.bid.options[0].rawTotal;
		meterPercent = Math.max(meterPercent, 0); // Clamp to min 0
		meterPercent = Math.min(meterPercent, 1); // Clamp to max 1
		if (Number.isNaN(meterPercent)) {
			meterPercent = 0;
		}

		const tl = new TimelineLite();
		const duration = meterPercent * 0.75;

		tl.fromTo(this.$.meter, duration, {
			scaleX: 0
		}, {
			scaleX: meterPercent,
			ease: Power2.easeOut,
			onStart: () => {
				(this.$.amount as AtomTweeningNumberElement).tween(this.option.rawTotal, duration);
			}
		});

		return tl;
	}

	_calcOptionName(option: ChildBid) {
		if (!option) {
			return '';
		}

		return option.description || option.name;
	}
}
