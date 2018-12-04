import {TimelineLite, Linear, Sine, Power2} from 'gsap';
import InterruptMixin, {IInterruptMixin} from '../../../mixins/interrupt-mixin';
import {Tweet} from '../../../../src/types/Twitter';
import AtomGridmaskImageElement from '../../atoms/atom-gridmask-image/atom-gridmask-image';
import {typeAnim} from '../../../../shared/lib/type-anims';
import GDQTweetElement from '../gdq-tweet/gdq-tweet';
import * as DrawSVGPlugin from '../../../../shared/lib/vendor/DrawSVGPlugin';

(window as any)._gsapPlugins = [DrawSVGPlugin]; // prevent tree shaking

const {customElement, property} = Polymer.decorators;
const SVG = ((window as any).svgjs || (window as any).SVG) as svgjs.Library;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-fanart')
export default class GDQBreakFanartElement extends InterruptMixin(Polymer.Element) {
	@property({type: Number})
	backgroundOpacity = 0.25;

	_bgRect: svgjs.Rect;

	ready() {
		super.ready();
		(this.$.tweet as IInterruptMixin).companionElement = null;
		this._initBackgroundSVG();
	}

	connectedCallback() {
		super.connectedCallback();
		Polymer.RenderStatus.beforeNextRender(this, () => {
			this._addReset();
		});
	}

	/**
	 * Adds a reset to the master timeline.
	 */
	_addReset() {
		const tl = this.timeline;
		tl.set(this._bgRect.node, {drawSVG: '0%', 'fill-opacity': 0});
		tl.set(this.$.label, {scaleX: 0, color: 'transparent', clipPath: ''});
		tl.call((this.$.tweet as IInterruptMixin)._addReset, undefined, this.$.tweet);
	}

	/**
	 * Creates an entrance animation timeline.
	 * @param tweet - The tweet to enter.
	 * @returns A GSAP animation timeline.
	 */
	_createEntranceAnim(tweet: Tweet) {
		const tl = new TimelineLite();
		const $image = this.$.image as AtomGridmaskImageElement;

		const media = tweet.gdqMedia;
		if (!media) {
			return tl;
		}

		let didStartingWork = false; // GSAP likes to run .calls again when you .resume
		tl.call(() => {
			if (didStartingWork) {
				return;
			}
			didStartingWork = true;

			tl.pause();
			$image.$svg.image.load(media[0].media_url_https).loaded(() => {
				tl.resume();
			}).error(error => {
				nodecg.log.error(error);
				tl.clear();
				tl.resume();
			});
		}, undefined, null, '+=0.03');

		tl.addLabel('start', '+=0.03');

		tl.to(this._bgRect.node, 0.75, {
			drawSVG: '100%',
			ease: Linear.easeNone
		}, 'start');

		tl.add($image.enter(), 'start');
		tl.add((this.$.tweet as GDQTweetElement)._createEntranceAnim(tweet), 'start+=0.1');

		tl.to(this.$.label, 0.334, {
			scaleX: 1,
			ease: Sine.easeInOut,
			onComplete: () => {
				(this.$.label as HTMLDivElement).style.color = '';
				typeAnim(this.$.label as HTMLDivElement);
			}
		}, 'start+=0.4');

		tl.to(this._bgRect.node, 0.5, {
			'fill-opacity': this.backgroundOpacity,
			ease: Sine.easeOut
		}, 'start+=1');

		if (media.length > 1) {
			media.slice(1).forEach(mediaEntity => {
				tl.add(this._createHold());
				tl.add(this._changeImage(mediaEntity.media_url_https));
			});
		}

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

		if (!tweet.gdqMedia) {
			return tl;
		}

		let exitedPreviousItem = false; // GSAP likes to run .calls again when you .resume
		tl.call(() => {
			if (exitedPreviousItem) {
				return;
			}

			tl.pause();
			const exitTextTl = new TimelineLite();
			exitTextTl.add((this.$.tweet as GDQTweetElement)._createChangeAnim(tweet), 0);
			exitTextTl.call(() => {
				exitedPreviousItem = true;
				tl.resume();
			});
		}, undefined, null, '+=0.03');

		tl.add(this._changeImage(tweet.gdqMedia[0].media_url_https), '+=0.03');

		if (tweet.gdqMedia.length > 1) {
			tweet.gdqMedia.slice(1).forEach(mediaEntity => {
				tl.add(this._createHold());
				tl.add(this._changeImage(mediaEntity.media_url_https));
			});
		}

		return tl;
	}

	/**
	 * Changes just the image, without changing the tweet body.
	 * Used in tweets which have more than one image (they can have up to four).
	 * @param newSrc - The url of the new image to show.
	 * @returns A GSAP animation timeline.
	 */
	_changeImage(newSrc: string) {
		const tl = new TimelineLite();
		const $image = this.$.image as AtomGridmaskImageElement;

		tl.add($image.exit({
			onComplete: () => {
				tl.pause();
				$image.$svg.image.load(newSrc).loaded(() => {
					tl.resume();
				}).error(error => {
					nodecg.log.error(error);
					tl.resume();
				});
			}
		}));

		tl.add($image.enter(), '+=0.05');

		return tl;
	}

	/**
	 * Creates an exit animation timeline.
	 * @returns A GSAP animation timeline.
	 */
	_createExitAnim() {
		const tl = new TimelineLite();

		tl.add('exit');

		tl.to(this._bgRect.node, 0.5, {
			'fill-opacity': 0,
			ease: Sine.easeOut
		}, 'exit');

		tl.to(this._bgRect.node, 1.5, {
			drawSVG: '0%',
			ease: Power2.easeIn
		}, 'exit');

		tl.fromTo(this.$.label, 0.334, {
			clipPath: 'inset(0 0% 0 0)'
		}, {
			clipPath: 'inset(0 100% 0 0)',
			ease: Sine.easeInOut
		}, 'exit+=0.9');

		tl.add((this.$.tweet as GDQTweetElement)._createExitAnim(), 'exit');
		tl.add((this.$.image as AtomGridmaskImageElement).exit(), 'exit+=0.1');

		return tl;
	}

	_initBackgroundSVG() {
		const STROKE_SIZE = 1;
		const ELEMENT_WIDTH = this.$.background.clientWidth;
		const ELEMENT_HEIGHT = this.$.background.clientHeight;

		const svgDoc = SVG(this.$.background as HTMLElement);
		const bgRect = svgDoc.rect();
		this._bgRect = bgRect;

		svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);

		// Intentionally flip the width and height.
		// This is part of how we get the drawSVG anim to go in the direction we want.
		bgRect.size(ELEMENT_HEIGHT, ELEMENT_WIDTH);
		bgRect.stroke({
			color: 'white',

			// Makes it effectively STROKE_SIZE, because all SVG strokes
			// are center strokes, and the outer half is cut off.
			width: STROKE_SIZE * 2
		});
		bgRect.fill({color: 'black', opacity: this.backgroundOpacity});

		// Rotate and translate such that drawSVG anims start from the bottom right
		// and move counter-clockwise to draw, clockwise to un-draw.
		bgRect.style({transform: `rotate(90deg) scaleX(-1) translateX(${-ELEMENT_HEIGHT}px) translateY(${-ELEMENT_WIDTH}px)`});
	}
}
