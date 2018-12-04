import CSSReflectionMixin from '../../../mixins/css-reflection-mixin';

const {customElement, property} = Polymer.decorators;
const SVG = (window as any).SVG as svgjs.Library;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-arrow-block')
export default class AtomArrowBlockElement extends CSSReflectionMixin(Polymer.Element) {
	static DEFAULT_STROKE_SIZE = 1;
	static DEFAULT_CHEVRON_WIDTH = 17;
	static DEFAULT_SHADOW_SIZE = 12;

	@property({type: Boolean})
	glow = true;

	svgDoc: svgjs.Doc;
	arrowBlock: svgjs.Element;

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
	static createArrowBlock({
		height,
		bodyWidth,
		chevronWidth,
		fillColor,
		fillOpacity,
		strokeSize,
		strokeColor
	}: {
		height: number;
		bodyWidth: number;
		chevronWidth: number;
		fillColor: string;
		fillOpacity: number;
		strokeSize: number;
		strokeColor: string;
	}) {
		const chevron = new SVG.Polygon();
		const pointArray = AtomArrowBlockElement.createArrowBlockPointArray({height, bodyWidth, chevronWidth});
		chevron.plot(pointArray);
		chevron.fill({color: fillColor, opacity: fillOpacity});
		if (strokeSize > 0) {
			chevron.stroke({width: strokeSize, color: strokeColor});
		}

		return chevron;
	}

	static createArrowBlockPointArray(
		{height, bodyWidth, chevronWidth}:
		{ height: number; bodyWidth: number; chevronWidth: number }
	) {
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
		this.svgDoc = SVG(this.shadowRoot as any);
	}

	render({useContentWidth = true} = {}) {
		this.svgDoc.clear();
		this.svgDoc.size(0, 0);

		const strokeSize = parseInt(this.readCSSCustomProperty(
			'--atom-arrow-block-stroke-size',
			AtomArrowBlockElement.DEFAULT_STROKE_SIZE
		), 10);
		const chevronWidth = parseInt(this.readCSSCustomProperty(
			'--atom-arrow-block-chevron-width',
			AtomArrowBlockElement.DEFAULT_CHEVRON_WIDTH
		), 10);
		const shadowSize = parseFloat(this.readCSSCustomProperty(
			'--atom-arrow-block-shadow-size',
			AtomArrowBlockElement.DEFAULT_SHADOW_SIZE
		));
		const fillOpacity = parseFloat(this.readCSSCustomProperty(
			'--atom-arrow-block-fill-opacity',
			1
		));

		const bodyWidth = useContentWidth ?
			this.$.content.clientWidth :
			this.getBoundingClientRect().width - (chevronWidth * 2) - strokeSize;
		const height = this.clientHeight;
		const width = bodyWidth + (chevronWidth * 2) + strokeSize;

		const arrowBlock = AtomArrowBlockElement.createArrowBlock({
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
			arrowBlock.attr({filter: 'url(#glowFilter)'});
			this.svgDoc.node.appendChild(this.$.filterDefs);
			this.svgDoc.node.style.marginRight = `${-shadowSize * 2}px`;
			this.svgDoc.transform({x: -shadowSize, y: -shadowSize});
			moveAmt = (strokeSize / 2) + shadowSize;
			this.svgDoc.size(width + (shadowSize * 2), height + (shadowSize * 2));
		} else {
			this.svgDoc.size(width, height);
		}

		this.$.filterHolder.remove();
		arrowBlock.move(moveAmt, moveAmt);
		this.arrowBlock = arrowBlock;
		this.svgDoc.add(arrowBlock);
	}
}
