import Random from '../../../../shared/lib/vendor/random';
import * as createjs from '@createjs/easeljs';
import * as d3 from 'd3-random';
const {customElement, property, observe} = Polymer.decorators;
const fooMap = new WeakMap();

type DIRECTION = 'up' | 'down' | 'left' | 'right';

/**
 * @customElement
 * @polymer
 */
@customElement('atom-tronlines')
export default class AtomTronlinesElement extends Polymer.Element {
	static BLOCK_SIZE = 50;
	static WARNING_THRESHOLD = 500;

	/**
	 * The width of the canvas.
	 */
	@property({type: Number})
	width = 450;

	/**
	 * The height of the canvas.
	 */
	@property({type: Number})
	height = 300;

	@property({type: Boolean, computed: '_computeInvertDimensions(direction)'})
	_invertDimensions: boolean;

	/**
	 * The solid background color of the canvas.
	 */
	@property({type: String, observer: AtomTronlinesElement.prototype._backgroundColorChanged})
	backgroundColor = '#050505';

	/**
	 * The direction of travel for the nodes.
	 * Can be one of "up", "down", "left", or "right".
	 */
	@property({type: String, reflectToAttribute: true})
	direction: DIRECTION = 'up';

	/**
	 * The width and height of each node, in pixels.
	 */
	@property({type: Number})
	nodeSize = 2;

	/**
	 * Nodes created per second.
	 */
	@property({type: Number, observer: AtomTronlinesElement.prototype._creationRateChanged})
	creationRate = 20;

	/**
	 * Expected distance traveled per frame, in pixels.
	 * This is the "mu" value of the normal distribution.
	 */
	@property({type: Number})
	speed = 1.5;

	/**
	 * Variance in speed per node.
	 * This is the "sigma" of the normal distribution.
	 */
	@property({type: Number})
	speedRandomness = 0.25;

	/**
	 * Expected distance tail length, in pixels.
	 * This is the "mu" value of the normal distribution.
	 */
	@property({type: Number})
	tailLength = 200;

	/**
	 * Variance in tail length per node.
	 * This is the "sigma" of the normal distribution.
	 */
	@property({type: Number})
	tailLengthRandomness = 5;

	/**
	 * The opacity of each node at the start of its path.
	 */
	@property({type: Number})
	opacityStart = 0.5;

	/**
	 * The opacity of each node at the end of its path.
	 */
	@property({type: Number})
	opacityEnd = 0.2;

	/**
	 * The color of the head of each node.
	 */
	@property({type: String})
	nodeColor = '#6082d6';

	/**
	 * The starting color of the tail of each node.
	 */
	@property({type: String})
	tailStartColor = '#02a6ff';

	/**
	 * The ending color of the tail of each node.
	 */
	@property({type: String})
	tailEndColor = '#0079ff';

	@property({type: Boolean, reflectToAttribute: true})
	debug = false;

	/**
	 * An array containing all nodes currently being drawn to the stage.
	 */
	_allocatedNodes = new Set();

	/**
	 * An array containing all nodes currently unallocated.
	 */
	_freeNodes = new Set();

	@property({type: Object, computed: '_computeRandomSpeedFunc(speed, speedRandomness)'})
	_getRandomSpeed: Function;

	@property({type: Object, computed: '_computeRandomTailLengthFunc(tailLength, tailLengthRandomness)'})
	_getRandomTailLength: Function;

	private bgFillCommand: any;
	private bgRectCommand: any;
	private stage: createjs.Stage;
	private _creationInterval?: number;

	static getRandomUniform(min = 0, max = 1) {
		return Random.real(min, max, true)(Random.engines.browserCrypto);
	}

	ready() {
		super.ready();

		let frameCounter = 0;
		let warnedLeak = false;
		const stage = new createjs.Stage(this.$.canvas);

		const bg = new createjs.Shape();

		this.bgFillCommand = bg.graphics
			.beginFill(this.backgroundColor).command;

		this.bgRectCommand = bg.graphics
			.drawRect(0, 0, this.width, this.height).command;

		stage.addChild(bg);
		this.stage = stage;

		const handleFrame = () => {
			if ((window as any).__SCREENSHOT_TESTING__) {
				this.clear();
				stage.update();
				return;
			}

			this.advanceSimulation();

			if (this.debug) {
				const totalNodes = this._allocatedNodes.size + this._freeNodes.size;
				this.$.debugInfo.textContent = `${this._allocatedNodes.size}/${totalNodes}`;
			}

			frameCounter++;
			if (frameCounter > 60) {
				frameCounter = 0;

				if (this._allocatedNodes.size > AtomTronlinesElement.WARNING_THRESHOLD) {
					if (!warnedLeak) {
						console.warn(
							'More than %d nodes are active, this is probably a leak!',
							AtomTronlinesElement.WARNING_THRESHOLD,
							this
						);
						warnedLeak = true;
					}
				} else {
					warnedLeak = false;
				}
			}

			stage.update();
			requestAnimationFrame(handleFrame);
		};

		handleFrame();

		setInterval(() => {
			this._sweepExcessFreeNodes();
		}, 10000);
	}

	/**
	 * Advances the simulation by one tick.
	 * In most cases, this means one frame in a 60fps simulation.
	 */
	advanceSimulation() {
		const opacityRange = Math.abs(this.opacityStart - this.opacityEnd);
		const tickTime = Date.now();
		const TIME_PER_TICK_IDEAL = 1000 / 60;
		Array.from(this._allocatedNodes).forEach((node: createjs.Shape) => {
			const metadata = fooMap.get(node);
			let percent = 1;
			if (metadata.lastTickTime) {
				percent = (tickTime - metadata.lastTickTime) / TIME_PER_TICK_IDEAL;
			}

			node.y -= metadata.speed * percent;

			const journeyPercentage = 1 - (node.y / (this._invertDimensions ? this.width : this.height));
			node.alpha = this.opacityStart - (opacityRange * journeyPercentage);
			metadata.lastTickTime = tickTime;

			// If a node's alpha is less than zero, remove it.
			// Or a node has completely scrolled off the canvas, remove it.
			if (node.alpha <= 0 || (node.y + metadata.tailLength) <= 0) {
				this._freeNode(node);
			}
		});
	}

	/**
	 * Clears all nodes from the canvas.
	 * @param deep - If true, also deletes all created nodes in the freeNodes pool.
	 */
	clear(deep?: boolean) {
		this._freeAllNodes();
		if (deep) {
			this._freeNodes = new Set();
		}
	}

	_creationRateChanged(newVal: number) {
		if (this._creationInterval) {
			clearInterval(this._creationInterval);
		}

		this._creationInterval = window.setInterval(() => {
			if (this._freeNodes.size <= 0) {
				this._createBlockOfFreeNodes(AtomTronlinesElement.BLOCK_SIZE);
			}
			const node = this._freeNodes.values().next().value;
			this._allocateNode(node);
		}, (1000 / newVal));
	}

	/**
	 * Creates and adds a block of new nodes to the _freeNodes array.
	 * @param blockSize - The number of nodes to add.
	 */
	_createBlockOfFreeNodes(blockSize: number) {
		for (let i = 0; i < blockSize; i++) {
			this._freeNodes.add(this._createNode());
		}
	}

	/**
	 * Creates a new node instance.
	 * @returns The created node instance.
	 */
	_createNode() {
		const shape = new createjs.Shape();
		const maxTailLength = this.tailLength + this.tailLengthRandomness;

		// The typings for the getRGB method are currently incorrect, so just ignore them.
		const tailMidColor = (createjs as any).Graphics.getRGB(parseInt(this.tailEndColor.slice(1), 16), 0.5);
		const tailEndColor = (createjs as any).Graphics.getRGB(parseInt(this.tailEndColor.slice(1), 16), 0);

		const metadata = {
			tailGradientCommand: shape.graphics
				.beginLinearGradientFill([this.tailStartColor, tailMidColor, tailEndColor], [0, 0.5, 1], 0, 0, 0, maxTailLength).command,
			tailRectCommand: shape.graphics
				.drawRect(0, 0, this.nodeSize, 0).command,
			tailLength: 0,
			speed: 0,
			lastTickTime: null
		};

		fooMap.set(shape, metadata);

		shape.graphics
			.beginFill(this.nodeColor)
			.drawRect(0, 0, this.nodeSize, this.nodeSize);

		shape.cache(0, 0, this.nodeSize, maxTailLength);

		return shape;
	}

	/**
	 * Adds a node to the stage.
	 * @param node - The node to add to the stage.
	 */
	_allocateNode(node: createjs.Shape) {
		const tailLength = this._getRandomTailLength();

		const metadata = fooMap.get(node);

		metadata.tailGradientCommand.style.props.ratios[0] = Math.min(this.nodeSize / this.tailLength, 1);
		metadata.tailGradientCommand.style.props.y1 = tailLength;
		metadata.tailRectCommand.h = tailLength;

		metadata.tailLength = tailLength;
		metadata.speed = this._getRandomSpeed();
		metadata.lastTickTime = null;
		node.updateCache();
		node.alpha = this.opacityStart;
		node.y = this._invertDimensions ? this.width : this.height;
		node.x = AtomTronlinesElement.getRandomUniform(0, this._invertDimensions ? this.height : this.width);

		this.stage.addChild(node);
		this._freeNodes.delete(node);
		this._allocatedNodes.add(node);
	}

	/**
	 * Removes all nodes from the stage, returning them to the pool.
	 */
	_freeAllNodes() {
		this._allocatedNodes.forEach(node => {
			this._freeNode(node);
		});
	}

	/**
	 * Frees a node, removing it from the stage and returning it to the pool.
	 * @param node - The node to free.
	 */
	_freeNode(node: createjs.DisplayObject) {
		this.stage.removeChild(node);
		this._allocatedNodes.delete(node);
		this._freeNodes.add(node);
	}

	/**
	 * Removes excess free nodes.
	 * Excess free nodes are caused by tabbing away from the page,
	 * or after lowering the node creation rate.
	 */
	_sweepExcessFreeNodes() {
		if (this._freeNodes.size > AtomTronlinesElement.BLOCK_SIZE * 2) {
			const freeNodesToKeep = Array.from(this._freeNodes).slice(0, AtomTronlinesElement.BLOCK_SIZE);
			this._freeNodes = new Set(freeNodesToKeep);
		}
	}

	_computeRandomSpeedFunc(speed: number, speedRandomness: number) {
		return d3.randomNormal.source(AtomTronlinesElement.getRandomUniform)(speed, speedRandomness);
	}

	_computeRandomTailLengthFunc(tailLength: number, tailLengthRandomness: number) {
		return d3.randomNormal.source(AtomTronlinesElement.getRandomUniform)(tailLength, tailLengthRandomness);
	}

	@observe('width', 'height', 'direction')
	_resizeCanvas(width: number, height: number, direction: DIRECTION) {
		this.style.width = `${width}px`;
		this.style.height = `${height}px`;

		/* tslint:disable:no-parameter-reassignment */
		if (direction === 'left' || direction === 'right') {
			const temp = width;
			width = height;
			height = temp;
		}
		/* tslint:enable:no-parameter-reassignment */

		(this.$.canvas as HTMLCanvasElement).width = width;
		(this.$.canvas as HTMLCanvasElement).height = height;

		if (this.bgRectCommand) {
			this.bgRectCommand.w = width;
			this.bgRectCommand.h = height;
		}
	}

	_computeInvertDimensions(direction: DIRECTION) {
		return direction === 'left' || direction === 'right';
	}

	_backgroundColorChanged(newValue: string) {
		if (!this.bgFillCommand) {
			return;
		}
		this.bgFillCommand.style = newValue;
	}
}
