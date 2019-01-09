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
const currentLayoutRep = nodecg.Replicant('currentLayout');
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
    connectedCallback() {
        super.connectedCallback();
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
            bottomFrontRect: { x: 31, y: 493 },
            topFrontRect: { x: -12, y: -498 },
            bottomFrontTrapezoid: { x: -800, y: 585 },
            topFrontTrapezoid: { x: 17, y: -625 },
            bottomBackRect: { x: 0, y: 505 },
            topBackRect: { x: -12, y: -524 },
            bottomBackTrapezoid: { x: -800, y: 612 },
            topBackTrapezoid: { x: 0, y: -651.6 },
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
            bottomFrontRect: { x: 31, y: 385 },
            topFrontRect: { x: -10, y: -419 },
            bottomFrontTrapezoid: { x: -603, y: 437 },
            topFrontTrapezoid: { x: 10, y: -500 },
            bottomBackRect: { x: 0, y: 388 },
            topBackRect: { x: 0, y: -421 },
            bottomBackTrapezoid: { x: -588, y: 449 },
            topBackTrapezoid: { x: 0, y: -511 },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRyYW5zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtdHJhbnNpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ25ELE9BQU8sS0FBSyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFFN0QsT0FBTyxVQUFVLE1BQU0sMENBQTBDLENBQUM7QUFFbEUsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDM0MsTUFBTSxhQUFhLEdBQUcsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztBQUNuQyxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUM7QUFDM0IsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUM7QUFDOUIsTUFBTSxrQkFBa0IsR0FBRztJQUMxQixZQUFZLEVBQUUsQ0FBQztJQUNmLGFBQWEsRUFBRSxDQUFDO0lBQ2hCLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsZ0JBQWdCLEVBQUUsQ0FBQztJQUNuQixnQkFBZ0IsRUFBRSxDQUFDO0NBQ25CLENBQUM7QUFFRixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWdCLGVBQWUsQ0FBQyxDQUFDO0FBTTFFLFVBQVUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUV6RTs7O0dBR0c7QUFFSCxJQUFxQixvQkFBb0IsR0FBekMsTUFBcUIsb0JBQXFCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMakU7OztPQUdHO0lBQ0g7O1FBRWtCLG1CQUFjLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZFLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBc2Q5QixDQUFDO0lBbmRBLGlCQUFpQjtRQUNo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