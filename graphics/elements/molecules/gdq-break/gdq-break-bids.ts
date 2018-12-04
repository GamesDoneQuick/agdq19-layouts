import {TimelineLite, Sine, Power2} from 'gsap';
import GDQBreakLoopMixin from '../../../mixins/gdq-break-loop-mixin';
import {ParentBid} from '../../../../src/types/index';
import {typeAnim} from '../../../../shared/lib/type-anims';

const {customElement} = Polymer.decorators;

export interface BidElement extends Polymer.Element {
	bid: ParentBid;
	enter(): TimelineLite;
	exit(): TimelineLite;
}

const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const currentBids = nodecg.Replicant<ParentBid[]>('currentBids');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-bids')
export default class GDQBreakBidsElement extends GDQBreakLoopMixin(Polymer.Element)<ParentBid> {
	_previousBidElement?: BidElement;

	ready() {
		super.ready();
		this.maxNoMoreItemsRetries = 30;
		currentBids.on('change', newVal => {
			this.availableItems = newVal;
		});
	}

	show() {
		const tl = new TimelineLite();

		tl.to(this, 0.333, {
			opacity: 1,
			ease: Sine.easeInOut
		}, 0);

		tl.to(this, 1, {
			x: '0%',
			ease: Power2.easeOut
		}, 0);

		return tl;
	}

	hide() {
		const tl = new TimelineLite();

		tl.to(this, 1, {
			x: '-100%',
			ease: Power2.easeIn
		});

		tl.to(this, 0.333, {
			opacity: 0,
			ease: Sine.easeInOut
		}, '-=0.333');

		return tl;
	}

	_showItem(bid: ParentBid) {
		let elementTagName;
		if (bid.type === 'choice-many') {
			elementTagName = 'gdq-break-bid-many';
		} else if (bid.type === 'choice-binary') {
			elementTagName = 'gdq-break-bid-binary';
		} else if (bid.type === 'challenge') {
			elementTagName = 'gdq-break-bid-challenge';
		} else {
			nodecg.log.error('Got bid of unexpected type (%s):', bid.type, JSON.stringify(bid, null, 2));
		}

		const tl = new TimelineLite();
		if (!elementTagName) {
			return tl;
		}

		const previousElement = this._previousBidElement;
		const element = document.createElement(elementTagName) as BidElement;
		element.bid = bid;
		this._previousBidElement = element;

		this.$.content.appendChild(element);
		if (previousElement) {
			tl.add(previousElement.exit());
			tl.call(() => {
				previousElement.remove();
			});
		}

		tl.call(() => {
			const contentElem = this.$.content as IronSelectorElement;
			contentElem.selectIndex(contentElem.indexOf(element));
			this.$['description-actual'].innerHTML = bid.description.replace(/\\n/g, '</br>');
			typeAnim(this.$['description-actual'] as HTMLDivElement);
		}, undefined, null, '+=0.1');

		tl.add(element.enter());

		// Give the bid some time to show.
		tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);

		return tl;
	}
}
