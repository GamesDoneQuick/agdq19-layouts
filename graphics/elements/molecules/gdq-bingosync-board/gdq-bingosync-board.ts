import {Bingosync3Aboard} from '../../../../src/types/schemas/bingosync%3Aboard';
import {TweenLite, Sine, Power2} from 'gsap';

const {customElement, property} = Polymer.decorators;
const boardRep = nodecg.Replicant<Bingosync3Aboard>('bingosync:board');
const urlParams = new URLSearchParams(window.location.search);
const embiggenUrlParam = urlParams.get('embiggen');
let EMBIGGEN: boolean | null;
if (embiggenUrlParam === 'true') {
	EMBIGGEN = true;
	(window as any).title += ' - EMBIGGENED';
} else if (embiggenUrlParam === 'false') {
	EMBIGGEN = false;
	(window as any).title += ' - debiggened';
} else {
	EMBIGGEN = null;
}

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-bingosync-board')
export default class GDQBingosyncBoardElement extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true})
	embiggened: boolean = Boolean(EMBIGGEN);

	@property({type: Boolean, observer: GDQBingosyncBoardElement.prototype._embiggenStateChanged})
	_embiggenState = false;

	@property({type: Boolean, observer: GDQBingosyncBoardElement.prototype._hiddenStateChanged})
	_hiddenState = false;

	ready() {
		super.ready();
		boardRep.on('change', newVal => {
			if (!newVal) {
				return;
			}

			this._embiggenState = newVal.embiggen;
			this._hiddenState = newVal.cardHidden;
		});
	}

	_embiggenStateChanged(newVal: boolean) {
		if (EMBIGGEN === null) {
			return;
		}

		if ((newVal && EMBIGGEN) || (!newVal && !EMBIGGEN)) {
			TweenLite.to(this, 0.3, {
				opacity: 1,
				ease: Sine.easeInOut
			});
		} else {
			TweenLite.to(this, 0.3, {
				opacity: 0,
				ease: Sine.easeInOut
			});
		}
	}

	_hiddenStateChanged(newVal: boolean) {
		if (newVal) {
			TweenLite.to(this.$.cover, 0.3, {
				y: '0%',
				ease: Power2.easeOut
			});
		} else {
			TweenLite.to(this.$.cover, 0.3, {
				y: '-100%',
				ease: Power2.easeIn
			});
		}
	}
}
