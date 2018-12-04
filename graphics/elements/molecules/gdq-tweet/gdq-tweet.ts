import {TimelineLite, Linear, Sine, Power2} from 'gsap';
import InterruptMixin, {ICompanionElement} from '../../../mixins/interrupt-mixin';
import {Tweet} from '../../../../src/types/Twitter';
import {typeAnim, untypeAnim} from '../../../../shared/lib/type-anims';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';
import * as DrawSVGPlugin from '../../../../shared/lib/vendor/DrawSVGPlugin';
(window as any)._gsapPlugins = [DrawSVGPlugin]; // prevent tree shaking

const {customElement, property} = Polymer.decorators;
const SVG = ((window as any).svgjs || (window as any).SVG) as svgjs.Library;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-tweet')
export default class GDQTweetElement extends InterruptMixin(Polymer.Element) {
	@property({type: String})
	label = '';

	@property({type: Object})
	companionElement: (ICompanionElement | null) = document.querySelector('gdq-sponsors');

	@property({type: String})
	bindToMessage = 'showTweet';

	@property({type: Number})
	backgroundOpacity = 0.25;

	_initialized: boolean;

	$svg: {
		svgDoc: svgjs.Doc;
		bgRect: svgjs.Rect;
	};

	ready() {
		super.ready();
		this._initBackgroundSVG();
		this._addReset();

		Polymer.RenderStatus.beforeNextRender(this, () => {
			const layoutAppElement = document.querySelector('layout-app');
			if (!this.companionElement && layoutAppElement) {
				const sponsorsElement = layoutAppElement.shadowRoot!.querySelector('gdq-sponsors');
				if (sponsorsElement) {
					this.companionElement = sponsorsElement as ICompanionElement;
				}
			}
		});
	}

	/**
	 * Adds a reset to the master timeline.
	 */
	_addReset() {
		const tl = this.timeline;
		tl.call(() => {
			this.$['body-actual'].innerHTML = '';
			this.$.name.innerHTML = '';
		}, undefined, null, '+=0.03');
		tl.set(this.$svg.bgRect.node, {drawSVG: '0%', 'fill-opacity': 0});
		tl.set([this.$.label, this.$.name], {scaleX: 0, color: 'transparent', clipPath: ''});
		tl.set(this.$['body-actual'], {opacity: 1});
	}

	/**
	 * Creates an entrance animation timeline.
	 * @param tweet - The tweet to enter.
	 * @returns A GSAP animation timeline.
	 */
	_createEntranceAnim(tweet: Tweet) {
		const tl = new TimelineLite();

		tl.addLabel('start', '+=0.03');

		tl.call(() => {
			(this.$.name as HTMLDivElement).innerText = `@${tweet.user.screen_name}`;
		}, undefined, null, 'start');

		tl.to(this.$svg.bgRect.node, 0.75, {
			drawSVG: '100%',
			ease: Linear.easeNone
		}, 'start');

		tl.to(this.$.name, 0.334, {
			scaleX: 1,
			ease: Sine.easeInOut,
			onComplete: () => {
				(this.$.name as HTMLDivElement).style.color = '';
				typeAnim(this.$.name as HTMLElement);
			}
		}, 'start+=0.05');

		tl.to(this.$.label, 0.334, {
			scaleX: 1,
			ease: Sine.easeInOut,
			onComplete: () => {
				(this.$.label as HTMLDivElement).style.color = '';
				typeAnim(this.$.label as HTMLElement);
			}
		}, 'start+=0.4');

		tl.to(this.$svg.bgRect.node, 0.5, {
			'fill-opacity': this.backgroundOpacity,
			ease: Sine.easeOut
		}, 'start+=1');

		tl.call(() => {
			this.$['body-actual'].innerHTML = tweet.text;
			typeAnim(this.$['body-actual'] as HTMLElement, {typeInterval: 0.01});
		});

		return tl;
	}

	/**
	 * Creates an animation for changing the currently displayed tweet.
	 * This is only used when hot-swapping tweets
	 * (i.e., changing tweets while the graphic is already showing).
	 * @param tweet - The new tweet to show.
	 * @returns A GSAP animation timeline.
	 */
	_createChangeAnim(tweet: Tweet) {
		const tl = new TimelineLite();
		let exitedPreviousTweet = false;

		tl.call(() => {
			if (exitedPreviousTweet) {
				return;
			}

			tl.pause();
			const exitTextTl = new TimelineLite();
			exitTextTl.add(untypeAnim(this.$.name as HTMLElement, 0.01), 0);
			exitTextTl.add(untypeAnim(this.$['body-actual'] as HTMLElement, 0.01), 0.08);
			exitTextTl.call(() => {
				exitedPreviousTweet = true;
				tl.resume();
			});
		}, undefined, null, '+=0.03');

		tl.call(() => {
			(this.$.name as HTMLDivElement).innerText = `@${tweet.user.screen_name}`;
			this.$['body-actual'].innerHTML = tweet.text;

			const enterTextTl = new TimelineLite();
			enterTextTl.add(typeAnim(this.$.name as HTMLElement, {typeInterval: 0.01}), 0);
			enterTextTl.add(typeAnim(this.$['body-actual'] as HTMLElement, {typeInterval: 0.01}), 0.08);
		}, undefined, null, '+=0.03');

		return tl;
	}

	/**
	 * Creates an exit animation timeline.
	 * @returns A GSAP animation timeline.
	 */
	_createExitAnim() {
		const tl = new TimelineLite();

		tl.add('exit');

		tl.add(createMaybeRandomTween({
			target: (this.$['body-actual'] as HTMLDivElement).style,
			propName: 'opacity',
			duration: 0.465,
			start: {probability: 1, normalValue: 1},
			end: {probability: 0, normalValue: 0}
		}), 'exit');

		tl.to(this.$svg.bgRect.node, 0.5, {
			'fill-opacity': 0,
			ease: Sine.easeOut
		}, 'exit');

		tl.to(this.$svg.bgRect.node, 1.5, {
			drawSVG: '0%',
			ease: Power2.easeIn
		}, 'exit');

		tl.fromTo(this.$.label, 0.334, {
			clipPath: 'inset(0 0% 0 0)'
		}, {
			clipPath: 'inset(0 100% 0 0)',
			ease: Sine.easeInOut
		}, 'exit+=0.9');

		tl.fromTo(this.$.name, 0.334, {
			clipPath: 'inset(0 0 0 0%)'
		}, {
			clipPath: 'inset(0 0 0 100%)',
			ease: Sine.easeInOut
		}, 'exit+=1.3');

		return tl;
	}

	_initBackgroundSVG() {
		if (this._initialized) {
			throw new Error('this element has already been initialized');
		}

		this._initialized = true;

		const STROKE_SIZE = 1;
		(this as any).$svg = {};

		const svgDoc = SVG(this.$.background as HTMLDivElement);
		const bgRect = svgDoc.rect();
		this.$svg.svgDoc = svgDoc;
		this.$svg.bgRect = bgRect;

		// Intentionally flip the width and height.
		// This is part of how we get the drawSVG anim to go in the direction we want.
		bgRect.stroke({
			color: 'white',

			// Makes it effectively STROKE_SIZE, because all SVG strokes
			// are center strokes, and the outer half is cut off.
			width: STROKE_SIZE * 2
		});
		bgRect.fill({color: 'black', opacity: this.backgroundOpacity});

		this.resize();
	}

	resize() {
		if (!this._initialized) {
			return;
		}

		const ELEMENT_WIDTH = this.$.background.clientWidth;
		const ELEMENT_HEIGHT = this.$.background.clientHeight;

		this.$svg.svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
		this.$svg.bgRect.size(ELEMENT_HEIGHT, ELEMENT_WIDTH);

		// Rotate and translate such that drawSVG anims start from the top right
		// and move clockwise to un-draw, counter-clockwise to un-draw.
		this.$svg.bgRect.style({transform: `rotate(90deg) translateY(${-ELEMENT_WIDTH}px)`});
	}

	_falsey(value: any) {
		return !value;
	}
}
