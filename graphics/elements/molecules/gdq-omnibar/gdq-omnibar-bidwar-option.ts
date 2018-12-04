import {CustomEase} from '../../../../shared/lib/vendor/CustomEase';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';
import {TimelineLite, Sine, TweenLite, Linear, Power4} from 'gsap';
import {ChildBid} from '../../../../src/types';
import AtomChevronElement from '../../atoms/atom-chevron/atom-chevron';
import AtomArrowBlockElement from '../../atoms/atom-arrow-block/atom-arrow-block';
import AtomInnerGlowTextElement from '../../atoms/atom-inner-glow-text/atom-inner-glow-text';

const {customElement, property} = Polymer.decorators;

const RIGHT_TIME_PER_PIXEL = 0.00157;
const LEFT_TIME_PER_PIXEL = 0.00157;
const TAIL_CHEVRON_WIDTH = 6;

CustomEase.create('BidwarOptionReveal', 'M0,0 C0.166,0.166 0.234,1 1,1');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-bidwar-option')
export default class GDQOmnibarBidwarOptionElement extends Polymer.Element {
	@property({type: Object})
	bid: ChildBid;

	@property({type: Boolean, reflectToAttribute: true})
	placeholder: boolean;

	@property({type: Boolean, reflectToAttribute: true})
	winning: boolean;

	private _revealTweenWidth: number;

	ready() {
		super.ready();
		TweenLite.set(this.$.tailChevron, {opacity: 0});
		TweenLite.set(this.$.body, {opacity: 0});
		TweenLite.set(this.$.total, {opacity: 0});
	}

	enter() {
		const tailChevronElem = this.$.tailChevron as AtomChevronElement;
		const totalBlockElem = this.$.totalBlock as AtomArrowBlockElement;
		const tl = new TimelineLite();
		const revealTweenWidth = this.$.body.clientWidth - tailChevronElem.clientWidth + TAIL_CHEVRON_WIDTH;
		this._revealTweenWidth = revealTweenWidth;

		tl.set(tailChevronElem, {opacity: 1});
		tl.call(() => {
			totalBlockElem.arrowBlock.attr({'fill-opacity': 0});
		});

		tl.fromTo(tailChevronElem.chevron.node, 0.334, {
			drawSVG: '0%'
		}, {
			drawSVG: '100%',
			ease: Linear.easeNone
		});

		tl.from(tailChevronElem.chevron.node, 0.2167, {
			fill: 'transparent'
		});

		tl.addLabel('slideRight', `-=${1 / 60}`);
		tl.to(tailChevronElem, revealTweenWidth * RIGHT_TIME_PER_PIXEL, {
			x: revealTweenWidth,
			ease: Sine.easeIn
		}, 'slideRight');

		tl.set(this.$.body, {
			clipPath: `inset(0 -13px 0 ${revealTweenWidth}px)`,
			opacity: 1
		});

		tl.addLabel('reveal', '+=0.1167');
		tl.to(tailChevronElem, revealTweenWidth * LEFT_TIME_PER_PIXEL, {
			x: 0,
			ease: 'BidwarOptionReveal'
		}, 'reveal');
		tl.to(this.$.body, revealTweenWidth * LEFT_TIME_PER_PIXEL, {
			clipPath: 'inset(0 -13px 0 0px)',
			ease: 'BidwarOptionReveal'
		}, 'reveal');

		tl.addLabel('flickerTotal', '-=0.667');
		tl.add(createMaybeRandomTween({
			target: {},
			propName: 'placeholder',
			duration: 0.465,
			ease: Power4.easeIn,
			start: {probability: 1, normalValue: 0},
			end: {probability: 0, normalValue: 1},
			onUpdate: randomValue => {
				(this.$.total as AtomInnerGlowTextElement).style.opacity = String(randomValue);
				totalBlockElem.arrowBlock.attr({'fill-opacity': randomValue});
			}
		}), 'flickerTotal');

		return tl;
	}

	exit() {
		const tl = new TimelineLite();

		// The total seems to ignore the clip path when it has a will-change style.
		tl.set(this.$.total, {willChange: 'unset'});

		tl.addLabel('conceal', '+=0.1');
		tl.to(this.$.tailChevron, this._revealTweenWidth * RIGHT_TIME_PER_PIXEL, {
			x: this._revealTweenWidth,
			ease: Sine.easeInOut
		}, 'conceal');
		tl.to(this.$.body, this._revealTweenWidth * RIGHT_TIME_PER_PIXEL, {
			clipPath: `inset(0 -13px 0 ${this._revealTweenWidth}px)`,
			ease: Sine.easeInOut
		}, 'conceal');

		tl.add(createMaybeRandomTween({
			target: this.style,
			propName: 'opacity',
			duration: 0.465,
			start: {probability: 1, normalValue: 1},
			end: {probability: 0, normalValue: 0}
		}));

		return tl;
	}

	render() {
		(this.$.tailChevron as AtomChevronElement).render();
		(this.$.labelBlock as AtomArrowBlockElement).render();
		(this.$.totalBlock as AtomArrowBlockElement).render();
	}

	formatOptionDescription(bid: ChildBid) {
		const fallback = 'Be the first to bid!';
		if (bid && !(bid.description || bid.name)) {
			nodecg.log.error('Got weird bid war option:', JSON.stringify(bid, null, 2));
			return fallback;
		}

		return bid ? (bid.description || bid.name) : fallback;
	}
}
