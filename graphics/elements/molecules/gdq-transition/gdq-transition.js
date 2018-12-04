import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Sine } from 'gsap';
import * as gdqUtils from '../../../../shared/lib/gdq-utils';
import CustomEase from '../../../../shared/lib/vendor/CustomEase';
const { customElement } = Polymer.decorators;
const HOME_POSITION = { x: 0, y: 0 };
const HERO_HOLD_TIME = 1.5;
const GENERIC_HOLD_TIME = 0.5;
const MEDIA_READY_STATES = {
    HAVE_NOTHING: 0,
    HAVE_METADATA: 1,
    HAVE_CURRENT_DATA: 2,
    HAVE_FUTURE_DATA: 3,
    HAVE_ENOUGH_DATA: 4
};
const currentLayoutRep = nodecg.Replicant('gdq:currentLayout');
CustomEase.create('ModifiedPower2EaseInOut', 'M0,0 C0.66,0 0.339,1 1,1');
/**
 * @customElement
 * @polymer
 */
let GDQTransitionElement = class GDQTransitionElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.masterTimeline = new TimelineLite({ autoRemoveChildren: true });
        this._initialized = false;
    }
    ready() {
        super.ready();
        const videos = Array.from(this.shadowRoot.querySelectorAll('video'));
        const videoLoadPromises = videos.map(this.waitForVideoToLoad);
        Promise.all(videoLoadPromises).then(() => this.init());
        this._$videos = videos;
        if (window.__SCREENSHOT_TESTING__) {
            TweenLite.set(this, { opacity: 1 });
        }
        else {
            currentLayoutRep.once('change', newVal => {
                if (newVal.toLowerCase() === 'break') {
                    this.fromClosedToPartial().progress(1);
                }
                else {
                    this.fromClosedToOpen().progress(1);
                }
                TweenLite.set(this, { opacity: 1 });
            });
        }
    }
    init() {
        if (this._initialized) {
            throw new Error('already initialized');
        }
        this._initialized = true;
        this.dispatchEvent(new CustomEvent('initialized'));
        if (window.__SCREENSHOT_TESTING__) {
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
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.heroExit();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericExit();
                }
            }
            else if (gdqUtils.isGameScene(data.fromScene)) {
                if (data.toScene === 'Break') {
                    animationTimeline = this.heroEnter();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            else if (data.fromScene === 'Interview') {
                if (data.toScene === 'Break') {
                    this.genericEnter();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            else if (data.fromScene === 'Countdown') {
                if (data.toScene === 'Break') {
                    animationTimeline = this.heroEnter();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            else if (data.fromScene === 'Advertisements') {
                if (data.toScene === 'Break') {
                    this.genericEnter();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
                    animationTimeline = this.genericNone();
                }
            }
            else if (data.fromScene === 'Technical Difficulties') {
                if (data.toScene === 'Break') {
                    animationTimeline = this.genericNone();
                }
                else if (gdqUtils.isGameScene(data.toScene)) {
                    animationTimeline = this.genericNone();
                }
                else if (data.toScene === 'Interview' || data.toScene === 'Countdown' || data.toScene === 'Advertisements') {
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
        return this.genericBase({ startPartial: false, endPartial: false });
    }
    genericEnter() {
        console.log('genericEnter');
        return this.genericBase({ startPartial: false, endPartial: true });
    }
    genericExit() {
        console.log('genericExit');
        return this.genericBase({ startPartial: true, endPartial: false });
    }
    genericBoth() {
        console.log('genericBoth');
        return this.genericBase({ startPartial: true, endPartial: true });
    }
    genericBase({ startPartial = false, endPartial = false }) {
        const videos = [
            this.$['bottomTrapAnimation-enter'],
            this.$['bottomTrapAnimation-exit'],
            this.$.bottomRectAnimation,
            this.$.topTrapAnimation,
            this.$.topRectAnimation
        ];
        const tl = new TimelineLite({
            onStart: () => {
                this.hideVideos(...videos);
                nodecg.playSound('transition-general');
            }
        });
        const closingAnim = startPartial ? this.fromPartialToClosed() : this.fromOpenToClosed();
        closingAnim.call(() => {
            this.playVideos(this.$.genericAnimation);
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
        ];
        const tl = new TimelineLite({
            onStart: () => {
                this.playVideos(...videos);
                nodecg.playSound('transition-hero-enter');
            }
        });
        tl.add(this.fromOpenToClosed());
        tl.add(this.fromClosedToPartial({ fadeOutVideos: true }), `+=${HERO_HOLD_TIME}`);
        return tl;
    }
    heroExit() {
        console.log('heroExit');
        const videos = [
            this.$['bottomTrapAnimation-exit'],
            this.$.bottomRectAnimation,
            this.$.topTrapAnimation,
            this.$.topRectAnimation
        ];
        const tl = new TimelineLite({
            onStart: () => {
                this.playVideos(...videos);
                nodecg.playSound('transition-hero-exit');
            }
        });
        tl.add(this.fromPartialToClosed());
        tl.add(this.fromClosedToOpen({ fadeOutVideos: true }), `+=${HERO_HOLD_TIME}`);
        return tl;
    }
    fromOpenToClosed() {
        const tl = new TimelineLite();
        tl.add(this.closeGeometry());
        return tl;
    }
    fromClosedToOpen({ fadeOutVideos = false } = {}) {
        return this.openGeometry({
            bottomFrontRect: { x: 26, y: 413 },
            topFrontRect: { x: -10, y: -418 },
            bottomFrontTrapezoid: { x: -667, y: 488 },
            topFrontTrapezoid: { x: 14, y: -521 },
            bottomBackRect: { x: 0, y: 421 },
            topBackRect: { x: -10, y: -437 },
            bottomBackTrapezoid: { x: -666, y: 510 },
            topBackTrapezoid: { x: 0, y: -543 },
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
    fromClosedToPartial({ fadeOutVideos = false } = {}) {
        const tl = new TimelineLite();
        tl.add(this.openGeometry({
            bottomFrontRect: { x: 26, y: 321 },
            topFrontRect: { x: -10, y: -349 },
            bottomFrontTrapezoid: { x: -503, y: 364 },
            topFrontTrapezoid: { x: 8, y: -417 },
            bottomBackRect: { x: 0, y: 323 },
            topBackRect: { x: 0, y: -351 },
            bottomBackTrapezoid: { x: -490, y: 374 },
            topBackTrapezoid: { x: 0, y: -426 },
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
    openGeometry({ bottomFrontRect, topFrontRect, bottomFrontTrapezoid, topFrontTrapezoid, bottomBackRect, topBackRect, bottomBackTrapezoid, topBackTrapezoid, fadeOutVideos = false, fadeOutAll = false }) {
        const tl = new TimelineLite();
        tl.addLabel('start', 0.03);
        tl.addLabel('frontRects', 'start');
        tl.addLabel('frontTraps', 'start+=0.1');
        tl.addLabel('backRects', 'start+=0.1667');
        tl.addLabel('backTraps', 'start+=0.2334');
        // Front rects.
        tl.to(this.$.bottomFrontRect, 0.2167, Object.assign({}, bottomFrontRect, { ease: 'ModifiedPower2EaseInOut' }), 'frontRects');
        tl.to(this.$.topFrontRect, 0.2167, Object.assign({}, topFrontRect, { ease: 'ModifiedPower2EaseInOut' }), 'frontRects');
        // Front traps.
        tl.to(this.$.bottomFrontTrapezoid, 0.2667, Object.assign({}, bottomFrontTrapezoid, { ease: 'ModifiedPower2EaseInOut' }), 'frontTraps');
        tl.to(this.$.topFrontTrapezoid, 0.2667, Object.assign({}, topFrontTrapezoid, { ease: 'ModifiedPower2EaseInOut' }), 'frontTraps');
        // Back rects.
        tl.to(this.$.bottomBackRect, 0.2334, Object.assign({}, bottomBackRect, { ease: 'ModifiedPower2EaseInOut' }), 'backRects');
        tl.to(this.$.topBackRect, 0.2334, Object.assign({}, topBackRect, { ease: 'ModifiedPower2EaseInOut' }), 'backRects');
        // Back traps.
        tl.to(this.$.bottomBackTrapezoid, 0.2334, Object.assign({}, bottomBackTrapezoid, { ease: 'ModifiedPower2EaseInOut' }), 'backTraps');
        tl.to(this.$.topBackTrapezoid, 0.2334, Object.assign({}, topBackTrapezoid, { ease: 'ModifiedPower2EaseInOut' }), 'backTraps');
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
        tl.set(this, { opacity: 1 }, 'start');
        // Back traps.
        tl.to(this.$.bottomBackTrapezoid, 0.2334, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'backTraps');
        tl.to(this.$.topBackTrapezoid, 0.2334, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'backTraps');
        // Back rects.
        tl.to(this.$.bottomBackRect, 0.2334, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'backRects');
        tl.to(this.$.topBackRect, 0.2334, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'backRects');
        // Front traps.
        tl.to(this.$.bottomFrontTrapezoid, 0.2667, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'frontTraps');
        tl.to(this.$.topFrontTrapezoid, 0.2667, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'frontTraps');
        // Front rects.
        tl.to(this.$.bottomFrontRect, 0.2167, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'frontRects');
        tl.to(this.$.topFrontRect, 0.2167, Object.assign({}, HOME_POSITION, { ease: 'ModifiedPower2EaseInOut' }), 'frontRects');
        return tl;
    }
    async waitForInit() {
        return new Promise(resolve => {
            if (this._initialized) {
                return resolve();
            }
            this.addEventListener('initialized', () => {
                resolve();
            }, { once: true, passive: true });
        });
    }
    async waitForVideoToLoad(videoElem) {
        return new Promise(resolve => {
            if (videoElem.readyState >= MEDIA_READY_STATES.HAVE_ENOUGH_DATA) {
                return resolve();
            }
            videoElem.addEventListener('canplaythrough', () => {
                resolve();
            }, { once: true, passive: true });
        });
    }
    playVideos(...videoElems) {
        if (window.__SCREENSHOT_TESTING__) {
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
    showVideos(...videoElems) {
        if (window.__SCREENSHOT_TESTING__) {
            return;
        }
        videoElems.forEach(videoElem => {
            videoElem.style.display = '';
            videoElem.style.opacity = '';
        });
    }
    hideVideos(...videoElems) {
        if (window.__SCREENSHOT_TESTING__) {
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
};
GDQTransitionElement = tslib_1.__decorate([
    customElement('gdq-transition')
], GDQTransitionElement);
export default GDQTransitionElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtdHJhbnNpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sS0FBSyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFFN0QsT0FBTyxVQUFVLE1BQU0sMENBQTBDLENBQUM7QUFFbEUsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDM0MsTUFBTSxhQUFhLEdBQUcsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztBQUNuQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7QUFDOUIsTUFBTSxrQkFBa0IsR0FBRztJQUMxQixZQUFZLEVBQUUsQ0FBQztJQUNmLGFBQWEsRUFBRSxDQUFDO0lBQ2hCLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQixnQkFBZ0IsRUFBRSxDQUFDO0NBQ25CLENBQUM7QUFFRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXFCLG1CQUFtQixDQUFDLENBQUM7QUFNbkYsVUFBVSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0FBRXpFOzs7R0FHRztBQUVILElBQXFCLG9CQUFvQixHQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUxqRTs7O09BR0c7SUFDSDs7UUFFa0IsbUJBQWMsR0FBRyxJQUFJLFlBQVksQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFDdkUsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFzZDlCLENBQUM7SUFuZEEsS0FBSztRQUNK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