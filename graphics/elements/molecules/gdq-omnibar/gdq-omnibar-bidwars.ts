import {TimelineLite} from 'gsap';
import {ParentBid, ChildBid} from '../../../../src/types';
import GDQOmnibarBidwarOptionElement from './gdq-omnibar-bidwar-option';
import GDQOmnibarListElement from './gdq-omnibar-list';
import GDQOmnibarContentLabelElement from './gdq-omnibar-content-label';

const {customElement, property} = Polymer.decorators;
const MAX_OPTIONS = 4;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-bidwars')
export default class GDQOmnibarBidwarsElement extends Polymer.Element {
	@property({type: Array})
	bidWars: ParentBid[];

	enter(displayDuration: number, scrollHoldDuration: number) {
		const tl = new TimelineLite();
		const labelElem = this.$.label as GDQOmnibarContentLabelElement;

		this.bidWars.forEach((bidWar, bidIndex) => {
			// Show at most MAX_OPTIONS options.
			const bidElements = bidWar.options.slice(0, MAX_OPTIONS).map((option, index) => {
				const element = document.createElement('gdq-omnibar-bidwar-option') as GDQOmnibarBidwarOptionElement;
				element.bid = option;
				element.winning = index === 0;
				return element;
			});

			if (bidElements.length <= 0) {
				const placeholder = document.createElement('gdq-omnibar-bidwar-option') as GDQOmnibarBidwarOptionElement;
				placeholder.bid = {} as ChildBid;
				placeholder.placeholder = true;
				bidElements.push(placeholder);
			}

			const listElement = document.createElement('gdq-omnibar-list') as GDQOmnibarListElement;
			listElement.classList.add('list');
			listElement.marginSize = -8;
			bidElements.forEach(element => {
				listElement.appendChild(element);
			});
			this.$.lists.appendChild(listElement);

			Polymer.flush();
			bidElements.slice(0).reverse().forEach((element, index) => {
				element.render();
				element.style.zIndex = String(index); // First item has highest z-index, last item has lowest.
			});

			tl.call(() => {
				(this.$.lists as IronSelectorElement).select(bidIndex);
			});

			if (bidIndex === 0) {
				tl.add(labelElem.enter(bidWar.description));
			} else {
				tl.add(labelElem.change(bidWar.description));
			}

			tl.call(() => {
				tl.pause();
				const fooTl = listElement.enter(displayDuration, scrollHoldDuration);
				fooTl.call(tl.resume, undefined, tl);
			});
			tl.add(listElement.exit());
		});

		return tl;
	}

	exit() {
		const tl = new TimelineLite();
		tl.add((this.$.label as GDQOmnibarContentLabelElement).exit());
		return tl;
	}
}
