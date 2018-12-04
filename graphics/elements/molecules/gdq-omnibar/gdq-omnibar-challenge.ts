import {ParentBid} from '../../../../src/types';
import {TweenLite, TimelineLite, Sine, Linear, Power2, Power4} from 'gsap';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';
import AtomArrowBlockElement from '../../atoms/atom-arrow-block/atom-arrow-block';
import AtomChevronElement from '../../atoms/atom-chevron/atom-chevron';
import AtomInnerGlowTextElement from '../../atoms/atom-inner-glow-text/atom-inner-glow-text';
import AtomGradientTextElement from '../../atoms/atom-gradient-text/atom-gradient-text';

const {customElement, property} = Polymer.decorators;

const RIGHT_TIME_PER_PIXEL = 0.00107;
const LEFT_TIME_PER_PIXEL = 0.00107;
const PROGRESS_FILL_OFFSET = 10;
const TAIL_CHEVRON_WIDTH = 6;
const DIRECTION_CHANGE_DELAY = 0.1167;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-challenge')
export default class GDQOmnibarChallengeElement extends Polymer.Element {
	@property({type: Object})
	bid: ParentBid;

	private _revealTweenWidth: number;
	private _progressTweenDuration: number;

	ready() {
		super.ready();
		TweenLite.set(this.$.tailChevron, {opacity: 0});
		TweenLite.set(this.$.body, {opacity: 0});
		TweenLite.set(this.$.total, {opacity: 0});
		TweenLite.set(this.$.goal, {opacity: 0});
	}

	enter() {
		const progressFillElem = this.$.progressFill as AtomArrowBlockElement;
		const progressBlockElem = this.$.progressBlock as AtomArrowBlockElement;
		const goalBlockElem = this.$.goalBlock as AtomArrowBlockElement;
		const tailChevronElem = this.$.tailChevron as AtomChevronElement;
		const totalElem = this.$.total as AtomGradientTextElement;
		let progressPercentage = this.bid.rawTotal / this.bid.rawGoal;
		progressPercentage = Math.min(progressPercentage, 1); // Clamp to 1 max.
		progressPercentage = Math.max(progressPercentage, 0); // Clamp to 0 min.

		const revealTweenWidth = this.$.body.clientWidth - tailChevronElem.clientWidth + PROGRESS_FILL_OFFSET;
		this._revealTweenWidth = revealTweenWidth;
		const progressBlockWidth = progressBlockElem.clientWidth;
		const tl = new TimelineLite();
		let didFlickerGoalBlock = false;

		/* This mess of bullshit is how we get the animated fill to be clipped how we want. */
		const progressFillGroup = progressFillElem.svgDoc.group();
		const progressFillClip = progressBlockElem.arrowBlock.clone();
		progressFillClip.attr({filter: 'none'});
		TweenLite.set(progressFillElem.arrowBlock.node, {x: '-100%'});
		progressFillElem.arrowBlock.before(progressFillClip);
		progressFillElem.arrowBlock.before(progressFillGroup);
		progressFillElem.arrowBlock.addTo(progressFillGroup);
		progressFillGroup.clipWith(progressFillClip);
		/* End mess of bullshit. */

		tl.set(tailChevronElem, {opacity: 1});
		tl.call(() => {
			goalBlockElem.arrowBlock.attr({'fill-opacity': 0});
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

		tl.addLabel('reveal', `+=${DIRECTION_CHANGE_DELAY}`);
		tl.to(tailChevronElem, revealTweenWidth * LEFT_TIME_PER_PIXEL, {
			x: 0,
			ease: 'BidwarOptionReveal',
			onUpdate: () => {
				// Flicker the goal block shortly after it has been fully revealed.
				if (!didFlickerGoalBlock && (tailChevronElem as any)._gsTransform.x <= progressBlockWidth) {
					didFlickerGoalBlock = true;
					createMaybeRandomTween({
						target: {},
						propName: 'placeholder',
						duration: 0.465,
						delay: 0.1,
						ease: Power4.easeIn,
						start: {probability: 1, normalValue: 0},
						end: {probability: 0, normalValue: 1},
						onUpdate: randomValue => {
							(this.$.goal as AtomInnerGlowTextElement).style.opacity = String(randomValue);
							(this.$.goalBlock as AtomArrowBlockElement).arrowBlock.attr({'fill-opacity': randomValue});
						}
					});
				}
			}
		}, 'reveal');
		tl.to(this.$.body, revealTweenWidth * LEFT_TIME_PER_PIXEL, {
			clipPath: 'inset(0 -13px 0 0px)',
			ease: 'BidwarOptionReveal',
			onComplete: () => {
				TweenLite.to(this.$.body, 0.18, {
					clipPath: 'inset(0 -13px)'
				});
			}
		}, 'reveal');

		tl.set(tailChevronElem, {'--atom-chevron-background': 'transparent'});

		const progressFillWidth = progressFillElem.arrowBlock.node.getBoundingClientRect().width - PROGRESS_FILL_OFFSET;
		const tailChevronEndX = progressFillWidth * progressPercentage;
		this._progressTweenDuration = progressFillWidth * progressPercentage * RIGHT_TIME_PER_PIXEL;
		tl.addLabel('fillProgress', '+=0');
		tl.to(tailChevronElem, this._progressTweenDuration, {
			x: tailChevronEndX,
			ease: Power2.easeInOut,
			callbackScope: this,
			onUpdate() {
				if ((tailChevronElem as any)._gsTransform.x >= PROGRESS_FILL_OFFSET) {
					TweenLite.set(progressFillElem.arrowBlock.node, {
						x: (tailChevronElem as any)._gsTransform.x + PROGRESS_FILL_OFFSET
					});
				}
			}
		}, 'fillProgress');

		const totalTextCanFitOnLeft = (tailChevronEndX - 7) >= (totalElem.$.gradientFill.clientWidth + 24);
		if (totalTextCanFitOnLeft) {
			totalElem.align = 'right';
			TweenLite.set(totalElem, {left: tailChevronEndX - 6});
		} else {
			TweenLite.set(totalElem, {left: tailChevronEndX + totalElem.clientWidth + 25});
		}

		tl.add(createMaybeRandomTween({
			target: totalElem.style,
			propName: 'opacity',
			duration: 0.465,
			ease: Power4.easeIn,
			start: {probability: 1, normalValue: 0},
			end: {probability: 0, normalValue: 1}
		}));

		return tl;
	}

	exit() {
		const tl = new TimelineLite();

		// Things seem to ignore the clip path when they have a will-change style.
		tl.set(this.$.goal, {willChange: 'unset'});
		tl.set(this.$.total, {willChange: 'unset'});

		tl.addLabel('concealFill', '+=0.1'); // Give the will-change sets above time to apply.
		tl.to(this.$.tailChevron, this._progressTweenDuration, {
			x: TAIL_CHEVRON_WIDTH,
			ease: Power2.easeInOut,
			onUpdate: () => {
				if ((this.$.tailChevron as any)._gsTransform.x >= PROGRESS_FILL_OFFSET) {
					TweenLite.set((this.$.progressFill as AtomArrowBlockElement).arrowBlock.node, {
						x: (this.$.tailChevron as any)._gsTransform.x + PROGRESS_FILL_OFFSET
					});
				}
			}
		}, 'concealFill');

		tl.set(this.$.tailChevron, {clearProps: '--atom-chevron-background'});
		tl.set(this.$.body, {clipPath: 'inset(0 -13px 0 0px)'});

		tl.addLabel('concealAll', `+=${DIRECTION_CHANGE_DELAY}`);
		const concealTweenWidth = this._revealTweenWidth + TAIL_CHEVRON_WIDTH;
		tl.to(this.$.tailChevron, concealTweenWidth * RIGHT_TIME_PER_PIXEL, {
			x: concealTweenWidth,
			ease: Sine.easeInOut
		}, 'concealAll');
		tl.to(this.$.body, concealTweenWidth * RIGHT_TIME_PER_PIXEL, {
			clipPath: `inset(0 -13px 0 ${concealTweenWidth}px)`,
			ease: Sine.easeInOut
		}, 'concealAll');

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
		const progressFillElem = this.$.progressFill as AtomArrowBlockElement;
		const progressBlockElem = this.$.progressBlock as AtomArrowBlockElement;

		(this.$.goalBlock as AtomArrowBlockElement).render(); // Must be rendered before #progressBlock.
		(this.$.tailChevron as AtomChevronElement).render();
		progressBlockElem.render({useContentWidth: false});
		(this.$.separatorChevron as AtomChevronElement).render();

		progressFillElem.render({useContentWidth: false}); // Must be rendered after #progressBlock.

		// Set the progressFill svgDoc to be the same size as the progressBlock svgDoc.
		progressFillElem.svgDoc.size(
			progressBlockElem.svgDoc.width(),
			progressBlockElem.svgDoc.height()
		);

		// Copy the points from the progressBlock shape to the progressFill shape.
		// This ensures that these shapes are identical.
		progressFillElem.arrowBlock.attr({
			points: progressBlockElem.arrowBlock.attr('points')
		});
	}
}
