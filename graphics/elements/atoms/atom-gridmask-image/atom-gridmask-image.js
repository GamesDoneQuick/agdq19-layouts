import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Sine } from 'gsap';
import Random from '../../../../shared/lib/vendor/random';
const { customElement, property } = Polymer.decorators;
const SVG = (window.svgjs || window.SVG);
/**
 * @customElement
 * @polymer
 */
let AtomGridmaskImageElement = class AtomGridmaskImageElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.strokeSize = 0;
        this.withBackground = false;
        this.cellSize = 21;
        this.cellStagger = 0.002;
        /**
         * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
         */
        this.preserveAspectRatio = 'xMidYMid';
        this.entering = false;
        this.exiting = false;
        this._initialized = false;
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            this._initSVG();
            TweenLite.set(this.$svg.imageMaskCells, { opacity: 0 });
        });
    }
    enter() {
        const tl = new TimelineLite();
        const shuffledMaskCells = Random.shuffle(Random.engines.browserCrypto, this.$svg.imageMaskCells.slice(0));
        let didImageEntranceOnStart;
        tl.staggerTo(shuffledMaskCells, 0.224, {
            opacity: 1,
            ease: Sine.easeInOut,
            onStart: () => {
                // We only want this onStart handler to run once.
                // There is no "onStartAll" equivalent, only an "onCompleteAll".
                if (didImageEntranceOnStart) {
                    return;
                }
                didImageEntranceOnStart = true;
                this.entering = true;
            }
        }, this.cellStagger, 0, () => {
            this.entering = false;
            this.dispatchEvent(new CustomEvent('entered'));
        });
        return tl;
    }
    exit(options = {}) {
        const tl = new TimelineLite();
        const shuffledMaskCells = Random.shuffle(Random.engines.browserCrypto, this.$svg.imageMaskCells.slice(0));
        let didOnStart = false;
        tl.staggerTo(shuffledMaskCells, 0.224, {
            opacity: 0,
            ease: Sine.easeInOut,
            onStart: () => {
                // We only want this onStart handler to run once.
                // There is no "onStartAll" equivalent, only an "onCompleteAll".
                if (didOnStart) {
                    return;
                }
                didOnStart = true;
                this.exiting = true;
            }
        }, this.cellStagger, 0, () => {
            if (typeof options.onComplete === 'function') {
                options.onComplete();
            }
            this.exiting = false;
            this.dispatchEvent(new CustomEvent('exited'));
        });
        return tl;
    }
    _initSVG() {
        if (this._initialized) {
            throw new Error('this element has already been initialized');
        }
        this._initialized = true;
        this.$svg = {};
        const STROKE_SIZE = this.strokeSize;
        const ELEMENT_WIDTH = this.clientWidth;
        const ELEMENT_HEIGHT = this.clientHeight;
        const IMAGE_MASK_CELL_SIZE = this.cellSize;
        const IMAGE_MASK_ROWS = Math.ceil(ELEMENT_HEIGHT / IMAGE_MASK_CELL_SIZE);
        const IMAGE_MASK_COLUMNS = Math.ceil(ELEMENT_WIDTH / IMAGE_MASK_CELL_SIZE);
        const svgDoc = SVG(this);
        const mask = svgDoc.mask();
        const image = svgDoc.image(this.fallbackSrc);
        this.$svg.svgDoc = svgDoc;
        this.$svg.image = image;
        this.$svg.imageMaskCells = [];
        image.attr({ preserveAspectRatio: this.preserveAspectRatio });
        if (this.withBackground) {
            const bgRect = svgDoc.rect();
            bgRect.fill({ color: 'black', opacity: 0.25 });
            this.$svg.bgRect = bgRect;
            if (STROKE_SIZE > 0) {
                bgRect.stroke({
                    color: 'white',
                    // Makes it effectively STROKE_SIZE, because all SVG strokes
                    // are center strokes, and the outer half is cut off.
                    width: STROKE_SIZE * 2
                });
                image.move(STROKE_SIZE, STROKE_SIZE);
            }
        }
        // Generate the exitMask rects
        for (let r = 0; r < IMAGE_MASK_ROWS; r++) {
            const y = r * IMAGE_MASK_CELL_SIZE;
            for (let c = 0; c < IMAGE_MASK_COLUMNS; c++) {
                const x = c * IMAGE_MASK_CELL_SIZE;
                const rect = svgDoc.rect(IMAGE_MASK_CELL_SIZE, IMAGE_MASK_CELL_SIZE);
                rect.move(x, y);
                rect.fill({ color: '#FFFFFF' });
                mask.add(rect);
                this.$svg.imageMaskCells.push(rect);
            }
        }
        image.front();
        image.maskWith(mask);
        this.resize();
    }
    resize() {
        if (!this._initialized) {
            return;
        }
        const STROKE_SIZE = this.strokeSize;
        const ELEMENT_WIDTH = this.clientWidth;
        const ELEMENT_HEIGHT = this.clientHeight;
        this.$svg.svgDoc.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
        this.$svg.image.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
        if (this.withBackground) {
            this.$svg.bgRect.size(ELEMENT_WIDTH, ELEMENT_HEIGHT);
            if (STROKE_SIZE > 0) {
                // Mirror such that drawSVG anims start from the top right
                // and move clockwise to un-draw, counter-clockwise to draw.
                this.$svg.bgRect.transform({ scaleX: -1, x: ELEMENT_WIDTH });
                this.$svg.image.size(ELEMENT_WIDTH - (STROKE_SIZE * 2), ELEMENT_HEIGHT - (STROKE_SIZE * 2));
            }
        }
    }
};
tslib_1.__decorate([
    property({ type: Number })
], AtomGridmaskImageElement.prototype, "strokeSize", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], AtomGridmaskImageElement.prototype, "withBackground", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomGridmaskImageElement.prototype, "cellSize", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomGridmaskImageElement.prototype, "cellStagger", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomGridmaskImageElement.prototype, "fallbackSrc", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomGridmaskImageElement.prototype, "preserveAspectRatio", void 0);
tslib_1.__decorate([
    property({ type: Boolean, notify: true })
], AtomGridmaskImageElement.prototype, "entering", void 0);
tslib_1.__decorate([
    property({ type: Boolean, notify: true })
], AtomGridmaskImageElement.prototype, "exiting", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], AtomGridmaskImageElement.prototype, "_initialized", void 0);
AtomGridmaskImageElement = tslib_1.__decorate([
    customElement('atom-gridmask-image')
], AtomGridmaskImageElement);
export default AtomGridmaskImageElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1ncmlkbWFzay1pbWFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tZ3JpZG1hc2staW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRCxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBRSxNQUFjLENBQUMsS0FBSyxJQUFLLE1BQWMsQ0FBQyxHQUFHLENBQWtCLENBQUM7QUFFNUU7OztHQUdHO0FBRUgsSUFBcUIsd0JBQXdCLEdBQTdDLE1BQXFCLHdCQUF5QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTHJFOzs7T0FHRztJQUNIOztRQUdDLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFHZixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUd2QixhQUFRLEdBQUcsRUFBRSxDQUFDO1FBR2QsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLcEI7O1dBRUc7UUFFSCx3QkFBbUIsR0FBRyxVQUFVLENBQUM7UUFHakMsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUdqQixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBR2hCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBa0t0QixDQUFDO0lBekpBLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDaEQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUN2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