import * as tslib_1 from "tslib";
var AtomArrowBlockElement_1;
import CSSReflectionMixin from '../../../mixins/css-reflection-mixin';
const { customElement, property } = Polymer.decorators;
const SVG = window.SVG;
/**
 * @customElement
 * @polymer
 */
let AtomArrowBlockElement = AtomArrowBlockElement_1 = class AtomArrowBlockElement extends CSSReflectionMixin(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.glow = true;
    }
    /**
     * Creates a new arrow block shape as an SVG.js Polygon.
     * The chevron always points right.
     * If you need it to point another way, apply a transform to it.
     * @param height - How tall, in pixels, to draw the arrow block.
     * @param bodyWidth - How wide, in pixels, to draw the straight body part of the arrow block.
     * @param chevronWidth - How wide, in pixels, to draw the chevron ends of the arrow block;
     * @param fillColor - The color to apply to the interior of the arrow block.
     * @param fillOpacity - The opacity to apply to the fillColor.
     * @param strokeSize - The thickness of the arrow block border.
     * @param strokeColor - The color to apply to the border of the arrow block.
     * @returns - The constructed SVG.js Polygon instance.
     */
    static createArrowBlock({ height, bodyWidth, chevronWidth, fillColor, fillOpacity, strokeSize, strokeColor }) {
        const chevron = new SVG.Polygon();
        const pointArray = AtomArrowBlockElement_1.createArrowBlockPointArray({ height, bodyWidth, chevronWidth });
        chevron.plot(pointArray);
        chevron.fill({ color: fillColor, opacity: fillOpacity });
        if (strokeSize > 0) {
            chevron.stroke({ width: strokeSize, color: strokeColor });
        }
        return chevron;
    }
    static createArrowBlockPointArray({ height, bodyWidth, chevronWidth }) {
        return new SVG.PointArray([
            [0, 0],
            [chevronWidth + bodyWidth, 0],
            [(chevronWidth * 2) + bodyWidth, height / 2],
            [chevronWidth + bodyWidth, height],
            [0, height],
            [chevronWidth, height / 2]
        ]);
    }
    ready() {
        super.ready();
        this.svgDoc = SVG(this.shadowRoot);
    }
    render({ useContentWidth = true } = {}) {
        this.svgDoc.clear();
        this.svgDoc.size(0, 0);
        const strokeSize = parseInt(this.readCSSCustomProperty('--atom-arrow-block-stroke-size', AtomArrowBlockElement_1.DEFAULT_STROKE_SIZE), 10);
        const chevronWidth = parseInt(this.readCSSCustomProperty('--atom-arrow-block-chevron-width', AtomArrowBlockElement_1.DEFAULT_CHEVRON_WIDTH), 10);
        const shadowSize = parseFloat(this.readCSSCustomProperty('--atom-arrow-block-shadow-size', AtomArrowBlockElement_1.DEFAULT_SHADOW_SIZE));
        const fillOpacity = parseFloat(this.readCSSCustomProperty('--atom-arrow-block-fill-opacity', 1));
        const bodyWidth = useContentWidth ?
            this.$.content.clientWidth :
            this.getBoundingClientRect().width - (chevronWidth * 2) - strokeSize;
        const height = this.clientHeight;
        const width = bodyWidth + (chevronWidth * 2) + strokeSize;
        const arrowBlock = AtomArrowBlockElement_1.createArrowBlock({
            height: height - strokeSize,
            bodyWidth,
            chevronWidth,
            fillColor: this.readCSSCustomProperty('--atom-arrow-block-fill-color'),
            fillOpacity,
            strokeSize,
            strokeColor: this.readCSSCustomProperty('--atom-arrow-block-stroke-color')
        });
        let moveAmt = (strokeSize / 2);
        if (this.glow) {
            arrowBlock.attr({ filter: 'url(#glowFilter)' });
            this.svgDoc.node.appendChild(this.$.filterDefs);
            this.svgDoc.node.style.marginRight = `${-shadowSize * 2}px`;
            this.svgDoc.transform({ x: -shadowSize, y: -shadowSize });
            moveAmt = (strokeSize / 2) + shadowSize;
            this.svgDoc.size(width + (shadowSize * 2), height + (shadowSize * 2));
        }
        else {
            this.svgDoc.size(width, height);
        }
        this.$.filterHolder.remove();
        arrowBlock.move(moveAmt, moveAmt);
        this.arrowBlock = arrowBlock;
        this.svgDoc.add(arrowBlock);
    }
};
AtomArrowBlockElement.DEFAULT_STROKE_SIZE = 1;
AtomArrowBlockElement.DEFAULT_CHEVRON_WIDTH = 17;
AtomArrowBlockElement.DEFAULT_SHADOW_SIZE = 12;
tslib_1.__decorate([
    property({ type: Boolean })
], AtomArrowBlockElement.prototype, "glow", void 0);
AtomArrowBlockElement = AtomArrowBlockElement_1 = tslib_1.__decorate([
    customElement('atom-arrow-block')
], AtomArrowBlockElement);
export default AtomArrowBlockElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1hcnJvdy1ibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tYXJyb3ctYmxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLGtCQUFrQixNQUFNLHNDQUFzQyxDQUFDO0FBRXRFLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLEdBQUcsR0FBSSxNQUFjLENBQUMsR0FBb0IsQ0FBQztBQUVqRDs7O0dBR0c7QUFFSCxJQUFxQixxQkFBcUIsNkJBQTFDLE1BQXFCLHFCQUFzQixTQUFRLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFMdEY7OztPQUdHO0lBQ0g7O1FBT0MsU0FBSSxHQUFHLElBQUksQ0FBQztJQXVIYixDQUFDO0lBbEhBOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUN2QixNQUFNLEVBQ04sU0FBUyxFQUNULFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNYLFVBQVUsRUFDVixXQUFXLEVBU1g7UUFDQSxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQyxNQUFNLFVBQVUsR0FBRyx1QkFBcUIsQ0FBQywwQkFBMEIsQ0FBQyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztRQUN2RyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksVUFBVSxHQUFHLENBQUMsRUFBRTtZQUNuQixPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztTQUN4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