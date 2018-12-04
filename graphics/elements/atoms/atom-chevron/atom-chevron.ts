import CSSReflectionMixin from '../../../mixins/css-reflection-mixin';

const {customElement, property} = Polymer.decorators;
const SVG = ((window as any).svgjs || (window as any).SVG) as svgjs.Library;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-chevron')
export default class AtomChevronElement extends CSSReflectionMixin(Polymer.Element) {
	static DEFAULT_THICKNESS = 6;
	static DEFAULT_STROKE_SIZE = 1;

	/**
	 * The direction the chevron should point.
	 */
	@property({type: String, reflectToAttribute: true})
	direction: 'left' | 'right' = 'right';

	@property({type: Boolean})
	noAutoRender = false;

	svgDoc: svgjs.Doc;
	chevron: svgjs.Polygon;

	_lastDirection: 'left' | 'right';

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
	static createChevron({
		width,
		height,
		thickness,
		fillColor,
		strokeSize,
		strokeColor
	}: {
		width: number;
		height: number;
		thickness: number;
		fillColor: string;
		strokeSize: number;
		strokeColor: string;
	}) {
		const chevron = new SVG.Polygon();
		const pointArray = AtomChevronElement.createChevronPointArray({width, height, thickness});
		chevron.plot(pointArray);
		chevron.fill(fillColor);
		if (strokeSize > 0) {
			chevron.stroke({width: strokeSize, color: strokeColor});
		}

		return chevron;
	}

	static createChevronPointArray(
		{width, height, thickness}:
			{ width: number; height: number; thickness: number }
	) {
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
		this.svgDoc = SVG(this.shadowRoot as any);
	}

	connectedCallback() {
		super.connectedCallback();
		if (!this.noAutoRender) {
			if (document.readyState === 'complete') {
				Polymer.RenderStatus.afterNextRender(this, this.render);
			} else {
				window.addEventListener('load', () => {
					Polymer.RenderStatus.afterNextRender(this, this.render);
				});
			}
		}
	}

	render(width?: number, height?: number) {
		this.svgDoc.clear();

		/* tslint:disable:no-parameter-reassignment */
		width = typeof width === 'number' ? width : this.scrollWidth;
		height = typeof height === 'number' ? height : this.clientHeight;
		/* tslint:enable:no-parameter-reassignment */

		const strokeSize = parseInt(this.readCSSCustomProperty(
			'--atom-chevron-stroke-size',
			AtomChevronElement.DEFAULT_STROKE_SIZE
		), 10);
		const thickness = parseInt(this.readCSSCustomProperty(
			'--atom-chevron-thickness',
			AtomChevronElement.DEFAULT_THICKNESS
		), 10);
		this.svgDoc.size(width, height);

		const chevron = AtomChevronElement.createChevron({
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
			this.svgDoc.transform({scaleX: -1});
			this._lastDirection = 'left';
		}
	}
}
