import * as tslib_1 from "tslib";
import { TimelineLite, Linear, Sine, Power2 } from 'gsap';
import InterruptMixin from '../../../mixins/interrupt-mixin';
import { typeAnim, untypeAnim } from '../../../../shared/lib/type-anims';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
import * as DrawSVGPlugin from '../../../../shared/lib/vendor/DrawSVGPlugin';
window._gsapPlugins = [DrawSVGPlugin]; // prevent tree shaking
const { customElement, property } = Polymer.decorators;
const SVG = (window.svgjs || window.SVG);
/**
 * @customElement
 * @polymer
 */
let GDQTweetElement = class GDQTweetElement extends InterruptMixin(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.label = '';
        this.companionElement = document.querySelector('gdq-sponsors');
        this.bindToMessage = 'showTweet';
        this.backgroundOpacity = 0.25;
    }
    ready() {
        super.ready();
        this._initBackgroundSVG();
        this._addReset();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            const layoutAppElement = document.querySelector('layout-app');
            if (!this.companionElement && layoutAppElement) {
                const sponsorsElement = layoutAppElement.shadowRoot.querySelector('gdq-sponsors');
                if (sponsorsElement) {
                    this.companionElement = sponsorsElement;
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
        tl.set(this.$svg.bgRect.node, { drawSVG: '0%', 'fill-opacity': 0 });
        tl.set([this.$.label, this.$.name], { scaleX: 0, color: 'transparent', clipPath: '' });
        tl.set(this.$['body-actual'], { opacity: 1 });
    }
    /**
     * Creates an entrance animation timeline.
     * @param tweet - The tweet to enter.
     * @returns A GSAP animation timeline.
     */
    _createEntranceAnim(tweet) {
        const tl = new TimelineLite();
        tl.addLabel('start', '+=0.03');
        tl.call(() => {
            this.$.name.innerText = `@${tweet.user.screen_name}`;
        }, undefined, null, 'start');
        tl.to(this.$svg.bgRect.node, 0.75, {
            drawSVG: '100%',
            ease: Linear.easeNone
        }, 'start');
        tl.to(this.$.name, 0.334, {
            scaleX: 1,
            ease: Sine.easeInOut,
            onComplete: () => {
                this.$.name.style.color = '';
                typeAnim(this.$.name);
            }
        }, 'start+=0.05');
        tl.to(this.$.label, 0.334, {
            scaleX: 1,
            ease: Sine.easeInOut,
            onComplete: () => {
                this.$.label.style.color = '';
                typeAnim(this.$.label);
            }
        }, 'start+=0.4');
        tl.to(this.$svg.bgRect.node, 0.5, {
            'fill-opacity': this.backgroundOpacity,
            ease: Sine.easeOut
        }, 'start+=1');
        tl.call(() => {
            this.$['body-actual'].innerHTML = tweet.text;
            typeAnim(this.$['body-actual'], { typeInterval: 0.01 });
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
    _createChangeAnim(tweet) {
        const tl = new TimelineLite();
        let exitedPreviousTweet = false;
        tl.call(() => {
            if (exitedPreviousTweet) {
                return;
            }
            tl.pause();
            const exitTextTl = new TimelineLite();
            exitTextTl.add(untypeAnim(this.$.name, 0.01), 0);
            exitTextTl.add(untypeAnim(this.$['body-actual'], 0.01), 0.08);
            exitTextTl.call(() => {
                exitedPreviousTweet = true;
                tl.resume();
            });
        }, undefined, null, '+=0.03');
        tl.call(() => {
            this.$.name.innerText = `@${tweet.user.screen_name}`;
            this.$['body-actual'].innerHTML = tweet.text;
            const enterTextTl = new TimelineLite();
            enterTextTl.add(typeAnim(this.$.name, { typeInterval: 0.01 }), 0);
            enterTextTl.add(typeAnim(this.$['body-actual'], { typeInterval: 0.01 }), 0.08);
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
            target: this.$['body-actual'].style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
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
        this.$svg = {};
        const svgDoc = SVG(this.$.background);
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
        bgRect.fill({ color: 'black', opacity: this.backgroundOpacity });
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
        this.$svg.bgRect.style({ transform: `rotate(90deg) translateY(${-ELEMENT_WIDTH}px)` });
    }
    _falsey(value) {
        return !value;
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQTweetElement.prototype, "label", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQTweetElement.prototype, "companionElement", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTweetElement.prototype, "bindToMessage", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTweetElement.prototype, "backgroundOpacity", void 0);
GDQTweetElement = tslib_1.__decorate([
    customElement('gdq-tweet')
], GDQTweetElement);
export default GDQTweetElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXR3ZWV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXR3ZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sY0FBbUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUVsRixPQUFPLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQzNFLE9BQU8sS0FBSyxhQUFhLE1BQU0sNkNBQTZDLENBQUM7QUFDNUUsTUFBYyxDQUFDLFlBQVksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsdUJBQXVCO0FBRXZFLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLEdBQUcsR0FBRyxDQUFFLE1BQWMsQ0FBQyxLQUFLLElBQUssTUFBYyxDQUFDLEdBQUcsQ0FBa0IsQ0FBQztBQUU1RTs7O0dBR0c7QUFFSCxJQUFxQixlQUFlLEdBQXBDLE1BQXFCLGVBQWdCLFNBQVEsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFMNUU7OztPQUdHO0lBQ0g7O1FBR0MsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUdYLHFCQUFnQixHQUErQixRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBR3RGLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBRzVCLHNCQUFpQixHQUFHLElBQUksQ0FBQztJQTJOMUIsQ0FBQztJQWxOQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLE9BQU8sQ0FBQyxZ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