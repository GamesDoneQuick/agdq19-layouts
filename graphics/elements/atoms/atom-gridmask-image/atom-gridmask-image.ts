import {TimelineLite, TweenLite, Sine} from 'gsap';
import Random from '../../../../shared/lib/vendor/random';

const {customElement, property} = Polymer.decorators;
const SVG = ((window as any).svgjs || (window as any).SVG) as svgjs.Library;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-gridmask-image')
export default class AtomGridmaskImageElement extends Polymer.Element {
	@property({type: Number})
	strokeSize = 0;

	@property({type: Boolean})
	withBackground = false;

	@property({type: Number})
	cellSize = 21;

	@property({type: Number})
	cellStagger = 0.002;

	@property({type: String})
	fallbackSrc: string;

	/**
	 * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio
	 */
	@property({type: String})
	preserveAspectRatio = 'xMidYMid';

	@property({type: Boolean, notify: true})
	entering = false;

	@property({type: Boolean, notify: true})
	exiting = false;

	@property({type: Boolean})
	_initialized = false;

	$svg: {
		svgDoc: svgjs.Doc;
		image: svgjs.Image;
		imageMaskCells: svgjs.Rect[];
		bgRect: svgjs.Rect;
	};

	connectedCallback() {
		super.connectedCallback();
		Polymer.RenderStatus.beforeNextRender(this, () => {
			this._initSVG();
			TweenLite.set(this.$svg.imageMaskCells, {opacity: 0});
		});
	}

	enter() {
		const tl = new TimelineLite();
		const shuffledMaskCells = Random.shuffle(
			Random.engines.browserCrypto,
			this.$svg.imageMaskCells.slice(0)
		);

		let didImageEntranceOnStart: boolean;
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

	exit(options: { onComplete?: Function } = {}) { // tslint:disable-line:no-empty
		const tl = new TimelineLite();
		const shuffledMaskCells = Random.shuffle(
			Random.engines.browserCrypto,
			this.$svg.imageMaskCells.slice(0)
		);

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
		(this as any).$svg = {};

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

		image.attr({preserveAspectRatio: this.preserveAspectRatio});

		if (this.withBackground) {
			const bgRect = svgDoc.rect();
			bgRect.fill({color: 'black', opacity: 0.25});

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
				rect.fill({color: '#FFFFFF'});
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
				this.$svg.bgRect.transform({scaleX: -1, x: ELEMENT_WIDTH});

				this.$svg.image.size(ELEMENT_WIDTH - (STROKE_SIZE * 2), ELEMENT_HEIGHT - (STROKE_SIZE * 2));
			}
		}
	}
}
