import * as tslib_1 from "tslib";
var AtomChevronElement_1;
import CSSReflectionMixin from '../../../mixins/css-reflection-mixin';
const { customElement, property } = Polymer.decorators;
const SVG = (window.svgjs || window.SVG);
/**
 * @customElement
 * @polymer
 */
let AtomChevronElement = AtomChevronElement_1 = class AtomChevronElement extends CSSReflectionMixin(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        /**
         * The direction the chevron should point.
         */
        this.direction = 'right';
        this.noAutoRender = false;
    }
    /**
     * Creates a new chevron shape as an SVG.js Polygon.
     * The chevron always points right.
     * If you need it to point another way, apply a transform to it.
     * @param width - How wide, in pixels, to draw the chevron.
     * @param height - How tall, in pixels, to draw the chevron.
     * @param thickness - How thick, in pixels, to draw the chevron.
     * @param fillColor - The color to apply to the interior of the chevron.
     * @param strokeSize - The thickness of the chevron border.
     * @param strokeColor - The color to apply to the border of the chevron.
     * @returns The constructed SVG.js Polygon instance.
     */
    static createChevron({ width, height, thickness, fillColor, strokeSize, strokeColor }) {
        const chevron = new SVG.Polygon();
        const pointArray = AtomChevronElement_1.createChevronPointArray({ width, height, thickness });
        chevron.plot(pointArray);
        chevron.fill(fillColor);
        if (strokeSize > 0) {
            chevron.stroke({ width: strokeSize, color: strokeColor });
        }
        return chevron;
    }
    static createChevronPointArray({ width, height, thickness }) {
        return new SVG.PointArray([
            [0, 0],
            [thickness, 0],
            [width, height / 2],
            [thickness, height],
            [0, height],
            [width - thickness, height / 2]
        ]);
    }
    ready() {
        super.ready();
        this.svgDoc = SVG(this.shadowRoot);
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this.noAutoRender) {
            if (document.readyState === 'complete') {
                Polymer.RenderStatus.afterNextRender(this, this.render);
            }
            else {
                window.addEventListener('load', () => {
                    Polymer.RenderStatus.afterNextRender(this, this.render);
                });
            }
        }
    }
    render(width, height) {
        this.svgDoc.clear();
        /* tslint:disable:no-parameter-reassignment */
        width = typeof width === 'number' ? width : this.scrollWidth;
        height = typeof height === 'number' ? height : this.clientHeight;
        /* tslint:enable:no-parameter-reassignment */
        const strokeSize = parseInt(this.readCSSCustomProperty('--atom-chevron-stroke-size', AtomChevronElement_1.DEFAULT_STROKE_SIZE), 10);
        const thickness = parseInt(this.readCSSCustomProperty('--atom-chevron-thickness', AtomChevronElement_1.DEFAULT_THICKNESS), 10);
        this.svgDoc.size(width, height);
        const chevron = AtomChevronElement_1.createChevron({
            width: width - strokeSize,
            height: height - strokeSize,
            thickness,
            fillColor: this.readCSSCustomProperty('--atom-chevron-fill-color'),
            strokeSize,
            strokeColor: this.readCSSCustomProperty('--atom-chevron-stroke-color')
        });
        chevron.move(strokeSize / 2, strokeSize / 2);
        this.chevron = chevron;
        this.svgDoc.add(chevron);
        if (this.direction === 'left' && this._lastDirection !== 'left') {
            this.svgDoc.transform({ scaleX: -1 });
            this._lastDirection = 'left';
        }
    }
};
AtomChevronElement.DEFAULT_THICKNESS = 6;
AtomChevronElement.DEFAULT_STROKE_SIZE = 1;
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], AtomChevronElement.prototype, "direction", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], AtomChevronElement.prototype, "noAutoRender", void 0);
AtomChevronElement = AtomChevronElement_1 = tslib_1.__decorate([
    customElement('atom-chevron')
], AtomChevronElement);
export default AtomChevronElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1jaGV2cm9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRvbS1jaGV2cm9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxrQkFBa0IsTUFBTSxzQ0FBc0MsQ0FBQztBQUV0RSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxHQUFHLEdBQUcsQ0FBRSxNQUFjLENBQUMsS0FBSyxJQUFLLE1BQWMsQ0FBQyxHQUFHLENBQWtCLENBQUM7QUFFNUU7OztHQUdHO0FBRUgsSUFBcUIsa0JBQWtCLDBCQUF2QyxNQUFxQixrQkFBbUIsU0FBUSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTG5GOzs7T0FHRztJQUNIOztRQUtDOztXQUVHO1FBRUgsY0FBUyxHQUFxQixPQUFPLENBQUM7UUFHdEMsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFpSHRCLENBQUM7SUExR0E7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQ3BCLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQVFYO1FBQ0EsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbEMsTUFBTSxVQUFVLEdBQUcsb0JBQWtCLENBQUMsdUJBQXVCLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFDMUYsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLENBQUMs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