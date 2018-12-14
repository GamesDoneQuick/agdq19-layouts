import * as tslib_1 from "tslib";
var AtomTronlinesElement_1;
import Random from '../../../../shared/lib/vendor/random';
import * as createjs from '@createjs/easeljs';
import * as d3 from 'd3-random';
const { customElement, property, observe } = Polymer.decorators;
const fooMap = new WeakMap();
/**
 * @customElement
 * @polymer
 */
let AtomTronlinesElement = AtomTronlinesElement_1 = class AtomTronlinesElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        /**
         * The width of the canvas.
         */
        this.width = 450;
        /**
         * The height of the canvas.
         */
        this.height = 300;
        /**
         * The solid background color of the canvas.
         */
        this.backgroundColor = '#051113';
        /**
         * The direction of travel for the nodes.
         * Can be one of "up", "down", "left", or "right".
         */
        this.direction = 'up';
        /**
         * The width and height of each node, in pixels.
         */
        this.nodeSize = 2;
        /**
         * Nodes created per second.
         */
        this.creationRate = 20;
        /**
         * Expected distance traveled per frame, in pixels.
         * This is the "mu" value of the normal distribution.
         */
        this.speed = 1.5;
        /**
         * Variance in speed per node.
         * This is the "sigma" of the normal distribution.
         */
        this.speedRandomness = 0.25;
        /**
         * Expected distance tail length, in pixels.
         * This is the "mu" value of the normal distribution.
         */
        this.tailLength = 200;
        /**
         * Variance in tail length per node.
         * This is the "sigma" of the normal distribution.
         */
        this.tailLengthRandomness = 5;
        /**
         * The opacity of each node at the start of its path.
         */
        this.opacityStart = 0.5;
        /**
         * The opacity of each node at the end of its path.
         */
        this.opacityEnd = 0.2;
        /**
         * The color of the head of each node.
         */
        this.nodeColor = '#abd3e9';
        /**
         * The starting color of the tail of each node.
         */
        this.tailStartColor = '#abd3e9';
        /**
         * The ending color of the tail of each node.
         */
        this.tailEndColor = '#12383c';
        this.debug = false;
        /**
         * An array containing all nodes currently being drawn to the stage.
         */
        this._allocatedNodes = new Set();
        /**
         * An array containing all nodes currently unallocated.
         */
        this._freeNodes = new Set();
    }
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
            if (window.__SCREENSHOT_TESTING__) {
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
                if (this._allocatedNodes.size > AtomTronlinesElement_1.WARNING_THRESHOLD) {
                    if (!warnedLeak) {
                        console.warn('More than %d nodes are active, this is probably a leak!', AtomTronlinesElement_1.WARNING_THRESHOLD, this);
                        warnedLeak = true;
                    }
                }
                else {
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
        Array.from(this._allocatedNodes).forEach((node) => {
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
    clear(deep) {
        this._freeAllNodes();
        if (deep) {
            this._freeNodes = new Set();
        }
    }
    _creationRateChanged(newVal) {
        if (this._creationInterval) {
            clearInterval(this._creationInterval);
        }
        this._creationInterval = window.setInterval(() => {
            if (this._freeNodes.size <= 0) {
                this._createBlockOfFreeNodes(AtomTronlinesElement_1.BLOCK_SIZE);
            }
            const node = this._freeNodes.values().next().value;
            this._allocateNode(node);
        }, (1000 / newVal));
    }
    /**
     * Creates and adds a block of new nodes to the _freeNodes array.
     * @param blockSize - The number of nodes to add.
     */
    _createBlockOfFreeNodes(blockSize) {
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
        const tailMidColor = createjs.Graphics.getRGB(parseInt(this.tailEndColor.slice(1), 16), 0.5);
        const tailEndColor = createjs.Graphics.getRGB(parseInt(this.tailEndColor.slice(1), 16), 0);
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
    _allocateNode(node) {
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
        node.x = AtomTronlinesElement_1.getRandomUniform(0, this._invertDimensions ? this.height : this.width);
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
    _freeNode(node) {
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
        if (this._freeNodes.size > AtomTronlinesElement_1.BLOCK_SIZE * 2) {
            const freeNodesToKeep = Array.from(this._freeNodes).slice(0, AtomTronlinesElement_1.BLOCK_SIZE);
            this._freeNodes = new Set(freeNodesToKeep);
        }
    }
    _computeRandomSpeedFunc(speed, speedRandomness) {
        return d3.randomNormal.source(AtomTronlinesElement_1.getRandomUniform)(speed, speedRandomness);
    }
    _computeRandomTailLengthFunc(tailLength, tailLengthRandomness) {
        return d3.randomNormal.source(AtomTronlinesElement_1.getRandomUniform)(tailLength, tailLengthRandomness);
    }
    _resizeCanvas(width, height, direction) {
        this.style.width = `${width}px`;
        this.style.height = `${height}px`;
        /* tslint:disable:no-parameter-reassignment */
        if (direction === 'left' || direction === 'right') {
            const temp = width;
            width = height;
            height = temp;
        }
        /* tslint:enable:no-parameter-reassignment */
        this.$.canvas.width = width;
        this.$.canvas.height = height;
        if (this.bgRectCommand) {
            this.bgRectCommand.w = width;
            this.bgRectCommand.h = height;
        }
    }
    _computeInvertDimensions(direction) {
        return direction === 'left' || direction === 'right';
    }
    _backgroundColorChanged(newValue) {
        if (!this.bgFillCommand) {
            return;
        }
        this.bgFillCommand.style = newValue;
    }
};
AtomTronlinesElement.BLOCK_SIZE = 50;
AtomTronlinesElement.WARNING_THRESHOLD = 500;
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "width", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "height", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeInvertDimensions(direction)' })
], AtomTronlinesElement.prototype, "_invertDimensions", void 0);
tslib_1.__decorate([
    property({ type: String, observer: AtomTronlinesElement_1.prototype._backgroundColorChanged })
], AtomTronlinesElement.prototype, "backgroundColor", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], AtomTronlinesElement.prototype, "direction", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "nodeSize", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: AtomTronlinesElement_1.prototype._creationRateChanged })
], AtomTronlinesElement.prototype, "creationRate", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "speed", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "speedRandomness", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "tailLength", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "tailLengthRandomness", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "opacityStart", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTronlinesElement.prototype, "opacityEnd", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTronlinesElement.prototype, "nodeColor", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTronlinesElement.prototype, "tailStartColor", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTronlinesElement.prototype, "tailEndColor", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomTronlinesElement.prototype, "debug", void 0);
tslib_1.__decorate([
    property({ type: Object, computed: '_computeRandomSpeedFunc(speed, speedRandomness)' })
], AtomTronlinesElement.prototype, "_getRandomSpeed", void 0);
tslib_1.__decorate([
    property({ type: Object, computed: '_computeRandomTailLengthFunc(tailLength, tailLengthRandomness)' })
], AtomTronlinesElement.prototype, "_getRandomTailLength", void 0);
tslib_1.__decorate([
    observe('width', 'height', 'direction')
], AtomTronlinesElement.prototype, "_resizeCanvas", null);
AtomTronlinesElement = AtomTronlinesElement_1 = tslib_1.__decorate([
    customElement('atom-tronlines')
], AtomTronlinesElement);
export default AtomTronlinesElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS10cm9ubGluZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLXRyb25saW5lcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sS0FBSyxRQUFRLE1BQU0sbUJBQW1CLENBQUM7QUFDOUMsT0FBTyxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFDaEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUM5RCxNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBSTdCOzs7R0FHRztBQUVILElBQXFCLG9CQUFvQiw0QkFBekMsTUFBcUIsb0JBQXFCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMakU7OztPQUdHO0lBQ0g7O1FBS0M7O1dBRUc7UUFFSCxVQUFLLEdBQUcsR0FBRyxDQUFDO1FBRVo7O1dBRUc7UUFFSCxXQUFNLEdBQUcsR0FBRyxDQUFDO1FBS2I7O1dBRUc7UUFFSCxvQkFBZSxHQUFHLFNBQVMsQ0FBQztRQUU1Qjs7O1dBR0c7UUFFSCxjQUFTLEdBQWMsSUFBSSxDQUFDO1FBRTVCOztXQUVHO1FBRUgsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUViOztXQUVHO1FBRUgsaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEI7OztXQUdHO1FBRUgsVUFBSyxHQUFHLEdBQUcsQ0FBQztRQUVaOzs7V0FHRztRQUVILG9CQUFlLEdBQUcsSUFBSSxDQUFDO1FBRXZCOzs7V0FHRztRQUVILGVBQVUsR0FBRyxHQUFHLENBQUM7UUFFakI7OztXQUdHO1FBRUgseUJBQW9CLEdBQUcsQ0FBQyxDQUFDO1FBRXpCOztXQUVHO1FBRUgsaUJBQVksR0FBRyxHQUFHLENBQUM7UUFFbkI7O1dBRUc7UUFFSCxlQUFVLEdBQUcsR0FBRyxDQUFDO1FBRWpCOztXQUVHO1FBRUgsY0FBUyxHQUFHLFNB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