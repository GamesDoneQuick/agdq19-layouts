import {TimelineLite, TweenLite, Sine} from 'gsap';
import * as gdqUtils from '../../../../shared/lib/gdq-utils';
import {CurrentLayout} from '../../../../src/types/schemas/currentLayout';
import CustomEase from '../../../../shared/lib/vendor/CustomEase';

const {customElement} = Polymer.decorators;
const HOME_POSITION = {x: 0, y: 0};
const HERO_HOLD_TIME = 1.5;
const GENERIC_HOLD_TIME = 0.5;
const MEDIA_READY_STATES = {
	HAVE_NOTHING: 0,
	HAVE_METADATA: 1,
	HAVE_CURRENT_DATA: 2,
	HAVE_FUTURE_DATA: 3,
	HAVE_ENOUGH_DATA: 4
};

const currentLayoutRep = nodecg.Replicant<CurrentLayout>('currentLayout');
interface Point {
	x: number;
	y: number;
}

CustomEase.create('ModifiedPower2EaseInOut', 'M0,0 C0.66,0 0.339,1 1,1');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-transition')
export default class GDQTransitionElement extends Polymer.Element {
	private readonly masterTimeline = new TimelineLite({autoRemoveChildren: true});
	private _initialized = false;
	private _$videos: HTMLVideoElement[];

	connectedCallback() {
		super.connectedCallback();

		const videos = Array.from(this.shadowRoot!.querySelectorAll('video'));
		const videoLoadPromises = videos.map(this.waitForVideoToLoad);
		Promise.all(videoLoadPromises).then(() => this.init());
		this._$videos = videos;

		if ((window as any).__SCREENSHOT_TESTING__) {
			TweenLite.set(this, {opacity: 1});
		} else {
			currentLayoutRep.once('change', newVal => {
				if (newVal.toLowerCase() === 'break') {
					this.fromClosedToPartial().progress(1);
				} else {
					this.fromClosedToOpen().progress(1);
				}
				TweenLite.set(this, {opacity: 1});
			});
		}
	}

	init() {
		if (this._initialized) {
			throw new Error('already initialized');
		}
		this._initialized = true;
		this.dispatchEvent(new CustomEvent('initialized'));

		if ((window as any).__SCREENSHOT_TESTING__) {
			this._$videos.forEach(video => {
				video.currentTime = video.duration;
			});
		}

		// Hide all videos to start.
		this.hideVideos(...this._$videos);

		nodecg.listenFor('compositingOBS:transitioning', data => {
			console.log('compositingOBS:transitioning |', data);
			if (!data || !data.fromScene || !data.toScene) {
				return;
			}

			if (data.name !== 'Blank Stinger') {
				return;
			}

			let animationTimeline;
			if (data.fromScene === 'Break') {
				if (data.toScene === 'Break') {
					animationTimeline = this.genericBoth();
				} else if (gdqUtils.isGameScene(data.toScene)) {
					animationTimeline = this.heroExit();
				} else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
					animationTimeline = this.genericExit();
				}
			} else if (gdqUtils.isGameScene(data.fromScene)) {
				if (data.toScene === 'Break') {
					animationTimeline = this.heroEnter();
				} else if (gdqUtils.isGameScene(data.toScene)) {
					animationTimeline = this.genericNone();
				} else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
					animationTimeline = this.genericNone();
				}
			} else if (data.fromScene === 'Interview') {
				if (data.toScene === 'Break') {
					this.genericEnter();
				} else if (gdqUtils.isGameScene(data.toScene)) {
					animationTimeline = this.genericNone();
				} else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
					animationTimeline = this.genericNone();
				}
			} else if (data.fromScene === 'Countdown') {
				if (data.toScene === 'Break') {
					animationTimeline = this.heroEnter();
				} else if (gdqUtils.isGameScene(data.toScene)) {
					animationTimeline = this.genericNone();
				} else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
					animationTimeline = this.genericNone();
				}
			} else if (data.fromScene === 'Advertisements') {
				if (data.toScene === 'Break') {
					this.genericEnter();
				} else if (gdqUtils.isGameScene(data.toScene)) {
					animationTimeline = this.genericNone();
				} else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
					animationTimeline = this.genericNone();
				}
			} else if (data.fromScene === 'Technical Difficulties') {
				if (data.toScene === 'Break') {
					animationTimeline = this.genericNone();
				} else if (gdqUtils.isGameScene(data.toScene)) {
					animationTimeline = this.genericNone();
				} else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
					animationTimeline = this.genericNone();
				}
			}

			if (animationTimeline) {
				this.masterTimeline.clear();
				this.masterTimeline.add(animationTimeline);
			}
		});
		console.log('listening for transition events...');
	}

	genericNone() {
		console.log('genericNone');
		return this.genericBase({startPartial: false, endPartial: false});
	}

	genericEnter() {
		console.log('genericEnter');
		return this.genericBase({startPartial: false, endPartial: true});
	}

	genericExit() {
		console.log('genericExit');
		return this.genericBase({startPartial: true, endPartial: false});
	}

	genericBoth() {
		console.log('genericBoth');
		return this.genericBase({startPartial: true, endPartial: true});
	}

	genericBase({startPartial = false, endPartial = false}) {
		const videos = [
			this.$['bottomTrapAnimation-enter'],
			this.$['bottomTrapAnimation-exit'],
			this.$.bottomRectAnimation,
			this.$.topTrapAnimation,
			this.$.topRectAnimation
		] as HTMLVideoElement[];

		const tl = new TimelineLite({
			onStart: () => {
				this.hideVideos(...videos);
				nodecg.playSound('transition-general');
			}
		});

		const closingAnim = startPartial ? this.fromPartialToClosed() : this.fromOpenToClosed();
		closingAnim.call(() => {
			this.playVideos(this.$.genericAnimation as HTMLVideoElement);
		}, undefined, null, 'frontRects');

		tl.add(closingAnim);
		tl.add(endPartial ? this.fromClosedToPartial() : this.fromClosedToOpen(), `+=${GENERIC_HOLD_TIME}`);
		return tl;
	}

	heroEnter() {
		console.log('heroEnter');
		const videos = [
			this.$['bottomTrapAnimation-enter'],
			this.$.bottomRectAnimation,
			this.$.topTrapAnimation,
			this.$.topRectAnimation
		] as HTMLVideoElement[];

		const tl = new TimelineLite({
			onStart: () => {
				this.playVideos(...videos);
				nodecg.playSound('transition-hero-enter');
			}
		});

		tl.add(this.fromOpenToClosed());
		tl.add(this.fromClosedToPartial({fadeOutVideos: true}), `+=${HERO_HOLD_TIME}`);
		return tl;
	}

	heroExit() {
		console.log('heroExit');
		const videos = [
			this.$['bottomTrapAnimation-exit'],
			this.$.bottomRectAnimation,
			this.$.topTrapAnimation,
			this.$.topRectAnimation
		] as HTMLVideoElement[];

		const tl = new TimelineLite({
			onStart: () => {
				this.playVideos(...videos);
				nodecg.playSound('transition-hero-exit');
			}
		});

		tl.add(this.fromPartialToClosed());
		tl.add(this.fromClosedToOpen({fadeOutVideos: true}), `+=${HERO_HOLD_TIME}`);
		return tl;
	}

	fromOpenToClosed() {
		const tl = new TimelineLite();
		tl.add(this.closeGeometry());
		return tl;
	}

	fromClosedToOpen({fadeOutVideos = false} = {}) {
		return this.openGeometry({
			bottomFrontRect: {x: 31, y: 493},
			topFrontRect: {x: -12, y: -498},
			bottomFrontTrapezoid: {x: -800, y: 585},
			topFrontTrapezoid: {x: 17, y: -625},
			bottomBackRect: {x: 0, y: 505},
			topBackRect: {x: -12, y: -524},
			bottomBackTrapezoid: {x: -800, y: 612},
			topBackTrapezoid: {x: 0, y: -651.6},
			fadeOutVideos,
			fadeOutAll: true
		});
	}

	fromPartialToClosed() {
		const tl = new TimelineLite();

		tl.to([
			this.$.topFrameContent,
			this.$.bottomFrameContent
		], 0.333, {
			opacity: 0,
			ease: Sine.easeInOut
		}, 0);

		tl.add(this.closeGeometry(), 0);

		return tl;
	}

	fromClosedToPartial({fadeOutVideos = false} = {}) {
		const tl = new TimelineLite();

		tl.add(this.openGeometry({
			bottomFrontRect: {x: 31, y: 385},
			topFrontRect: {x: -10, y: -419},
			bottomFrontTrapezoid: {x: -603, y: 437},
			topFrontTrapezoid: {x: 10, y: -500},
			bottomBackRect: {x: 0, y: 388},
			topBackRect: {x: 0, y: -421},
			bottomBackTrapezoid: {x: -588, y: 449},
			topBackTrapezoid: {x: 0, y: -511},
			fadeOutVideos
		}));

		tl.to([
			this.$.topFrameContent,
			this.$.bottomFrameContent
		], 0.333, {
			opacity: 1,
			ease: Sine.easeInOut
		});

		return tl;
	}

	openGeometry({
		bottomFrontRect,
		topFrontRect,
		bottomFrontTrapezoid,
		topFrontTrapezoid,
		bottomBackRect,
		topBackRect,
		bottomBackTrapezoid,
		topBackTrapezoid,
		fadeOutVideos = false,
		fadeOutAll = false
	}: {
		bottomFrontRect: Point;
		topFrontRect: Point;
		bottomFrontTrapezoid: Point;
		topFrontTrapezoid: Point;
		bottomBackRect: Point;
		topBackRect: Point;
		bottomBackTrapezoid: Point;
		topBackTrapezoid: Point;
		fadeOutVideos?: Boolean;
		fadeOutAll?: Boolean;
	}) {
		const tl = new TimelineLite();

		tl.addLabel('start', 0.03);
		tl.addLabel('frontRects', 'start');
		tl.addLabel('frontTraps', 'start+=0.1');
		tl.addLabel('backRects', 'start+=0.1667');
		tl.addLabel('backTraps', 'start+=0.2334');

		// Front rects.
		tl.to(this.$.bottomFrontRect, 0.2167, {
			...bottomFrontRect,
			ease: 'ModifiedPower2EaseInOut'
		}, 'frontRects');
		tl.to(this.$.topFrontRect, 0.2167, {
			...topFrontRect,
			ease: 'ModifiedPower2EaseInOut'
		}, 'frontRects');

		// Front traps.
		tl.to(this.$.bottomFrontTrapezoid, 0.2667, {
			...bottomFrontTrapezoid,
			ease: 'ModifiedPower2EaseInOut'
		}, 'frontTraps');
		tl.to(this.$.topFrontTrapezoid, 0.2667, {
			...topFrontTrapezoid,
			ease: 'ModifiedPower2EaseInOut'
		}, 'frontTraps');

		// Back rects.
		tl.to(this.$.bottomBackRect, 0.2334, {
			...bottomBackRect,
			ease: 'ModifiedPower2EaseInOut'
		}, 'backRects');
		tl.to(this.$.topBackRect, 0.2334, {
			...topBackRect,
			ease: 'ModifiedPower2EaseInOut'
		}, 'backRects');

		// Back traps.
		tl.to(this.$.bottomBackTrapezoid, 0.2334, {
			...bottomBackTrapezoid,
			ease: 'ModifiedPower2EaseInOut'
		}, 'backTraps');
		tl.to(this.$.topBackTrapezoid, 0.2334, {
			...topBackTrapezoid,
			ease: 'ModifiedPower2EaseInOut'
		}, 'backTraps');

		if (fadeOutVideos) {
			tl.to(this._$videos, 0.25, {
				opacity: 0,
				ease: Sine.easeInOut,
				onComplete: () => {
					console.log('hide all videos');
					this.hideVideos(...this._$videos);
				}
			}, tl.duration() / 2);
		}
		if (fadeOutAll) {
			tl.to(this, 0.25, {
				opacity: 0,
				ease: Sine.easeInOut
			});
		}

		return tl;
	}

	closeGeometry() {
		const tl = new TimelineLite();

		tl.addLabel('start', 0.03);
		tl.addLabel('backTraps', 'start');
		tl.addLabel('backRects', 'start+=0.0667');
		tl.addLabel('frontTraps', 'start+=0.1334');
		tl.addLabel('frontRects', 'start+=0.2334');

		tl.set(this, {opacity: 1}, 'start');

		// Back traps.
		tl.to(this.$.bottomBackTrapezoid, 0.2334, {
			...HOME_POSITION,
			ease: 'ModifiedPower2EaseInOut'
		}, 'backTraps');
		tl.to(this.$.topBackTrapezoid, 0.2334, {
			...HOME_POSITION,
			ease: 'ModifiedPower2EaseInOut'
		}, 'backTraps');

		// Back rects.
		tl.to(this.$.bottomBackRect, 0.2334, {
			...HOME_POSITION,
			ease: 'ModifiedPower2EaseInOut'
		}, 'backRects');
		tl.to(this.$.topBackRect, 0.2334, {
			...HOME_POSITION,
			ease: 'ModifiedPower2EaseInOut'
		}, 'backRects');

		// Front traps.
		tl.to(this.$.bottomFrontTrapezoid, 0.2667, {
			...HOME_POSITION,
			ease: 'ModifiedPower2EaseInOut'
		}, 'frontTraps');
		tl.to(this.$.topFrontTrapezoid, 0.2667, {
			...HOME_POSITION,
			ease: 'ModifiedPower2EaseInOut'
		}, 'frontTraps');

		// Front rects.
		tl.to(this.$.bottomFrontRect, 0.2167, {
			...HOME_POSITION,
			ease: 'ModifiedPower2EaseInOut'
		}, 'frontRects');
		tl.to(this.$.topFrontRect, 0.2167, {
			...HOME_POSITION,
			ease: 'ModifiedPower2EaseInOut'
		}, 'frontRects');

		return tl;
	}

	async waitForInit() {
		return new Promise(resolve => {
			if (this._initialized) {
				return resolve();
			}

			this.addEventListener('initialized', () => {
				resolve();
			}, {once: true, passive: true});
		});
	}

	async waitForVideoToLoad(videoElem: HTMLVideoElement) {
		return new Promise(resolve => {
			if (videoElem.readyState >= MEDIA_READY_STATES.HAVE_ENOUGH_DATA) {
				return resolve();
			}

			videoElem.addEventListener('canplaythrough', () => {
				resolve();
			}, {once: true, passive: true});
		});
	}

	playVideos(...videoElems: HTMLVideoElement[]) {
		if ((window as any).__SCREENSHOT_TESTING__) {
			return;
		}

		this.showVideos(...videoElems);
		videoElems.forEach(videoElem => {
			videoElem.play().then(() => {
				console.log('started playing', videoElem.id);
			}).catch(() => {
				console.error('failed to play', videoElem.id);
			});
		});
	}

	showVideos(...videoElems: HTMLVideoElement[]) {
		if ((window as any).__SCREENSHOT_TESTING__) {
			return;
		}

		videoElems.forEach(videoElem => {
			videoElem.style.display = '';
			videoElem.style.opacity = '';
		});
	}

	hideVideos(...videoElems: HTMLVideoElement[]) {
		if ((window as any).__SCREENSHOT_TESTING__) {
			return;
		}

		videoElems.forEach(videoElem => {
			videoElem.pause();
			videoElem.currentTime = 0;
			requestAnimationFrame(() => {
				videoElem.style.display = 'none';
				videoElem.style.opacity = '0';
			});
		});
	}
}
