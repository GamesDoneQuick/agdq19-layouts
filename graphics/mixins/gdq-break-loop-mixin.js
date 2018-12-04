import * as tslib_1 from "tslib";
const { property } = Polymer.decorators;
/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base) => {
    /**
     * @mixinClass
     * @polymer
     *
     * A base class for iterating through an array of items and playing an animation for each one in series.
     * This element is not useful on its own, it needs to be extended by some other element which implements
     * a _showItem method.
     */
    class GDQBreakLoopMixin extends base {
        constructor() {
            super(...arguments);
            this.noAutoLoop = false;
            this.maxNoMoreItemsRetries = Infinity;
            this.itemIdField = 'id';
            this._noMoreItemsRetries = 0;
        }
        ready() {
            super.ready();
            if (!this.noAutoLoop) {
                this._loop();
            }
        }
        _loop() {
            if (window.__SCREENSHOT_TESTING__) {
                return;
            }
            // If there's no items, do nothing and try again in one second.
            if (!this.availableItems || this.availableItems.length <= 0) {
                clearTimeout(this._loopRetryTimeout);
                this._loopRetryTimeout = window.setTimeout(() => {
                    this._loop();
                }, 1000);
                return;
            }
            const availableItems = this.availableItems;
            let nextIdx = 0;
            if (this.currentItem && this.currentItem[this.itemIdField]) {
                // Figure out the array index of the current item.
                let currentIdx = -1;
                availableItems.some((item, index) => {
                    if (item[this.itemIdField] === this.currentItem[this.itemIdField]) {
                        currentIdx = index;
                        return true;
                    }
                    return false;
                });
                nextIdx = currentIdx + 1;
            }
            // If this index is greater than the max, loop back to the start.
            if (nextIdx >= availableItems.length) {
                nextIdx = 0;
            }
            const nextItem = availableItems[nextIdx];
            // If the next item is the same as the current item, do nothing and try again in one second.
            if (this.currentItem
                && nextItem[this.itemIdField] === this.currentItem[this.itemIdField]
                && this._noMoreItemsRetries < this.maxNoMoreItemsRetries) {
                this._noMoreItemsRetries++;
                clearTimeout(this._loopRetryTimeout);
                this._loopRetryTimeout = window.setTimeout(() => {
                    this._loop();
                }, 1000);
                return;
            }
            // Kill any existing loop, if one was somehow running.
            // This also resets our internal state, used to make things like the enter/exit anims more seamless.
            this._killLoop();
            // Show the next item.
            this.currentItem = nextItem;
            const tl = this._showItem(nextItem);
            tl.call(() => {
                this._loop();
            });
            this._currentLoopIterationTimeline = tl;
        }
        _killLoop() {
            if (this._currentLoopIterationTimeline) {
                this._currentLoopIterationTimeline.clear();
                this._currentLoopIterationTimeline.kill();
                this._currentLoopIterationTimeline = undefined;
            }
            clearTimeout(this._loopRetryTimeout);
            this._noMoreItemsRetries = 0;
            if (this._resetState) {
                this._resetState();
            }
        }
    }
    tslib_1.__decorate([
        property({ type: Array })
    ], GDQBreakLoopMixin.prototype, "availableItems", void 0);
    tslib_1.__decorate([
        property({ type: Object })
    ], GDQBreakLoopMixin.prototype, "currentItem", void 0);
    tslib_1.__decorate([
        property({ type: Boolean })
    ], GDQBreakLoopMixin.prototype, "noAutoLoop", void 0);
    tslib_1.__decorate([
        property({ type: Number })
    ], GDQBreakLoopMixin.prototype, "maxNoMoreItemsRetries", void 0);
    tslib_1.__decorate([
        property({ type: String })
    ], GDQBreakLoopMixin.prototype, "itemIdField", void 0);
    tslib_1.__decorate([
        property({ type: Number })
    ], GDQBreakLoopMixin.prototype, "_noMoreItemsRetries", void 0);
    return GDQBreakLoopMixin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWxvb3AtbWl4aW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstbG9vcC1taXhpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFZdEM7OztHQUdHO0FBQ0gsZUFBZSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBaUMsRUFBRSxFQUFFO0lBQzFFOzs7Ozs7O09BT0c7SUFDSCxNQUFlLGlCQUE0QixTQUFRLElBQUk7UUFBdkQ7O1lBUUMsZUFBVSxHQUFHLEtBQUssQ0FBQztZQUduQiwwQkFBcUIsR0FBRyxRQUFRLENBQUM7WUFHakMsZ0JBQVcsR0FBbUIsSUFBc0IsQ0FBQztZQUdyRCx3QkFBbUIsR0FBRyxDQUFDLENBQUM7UUErRnpCLENBQUM7UUF2RkEsS0FBSztZQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO2dCQUNyQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDYjtRQUNGLENBQUM7UUFFRCxLQUFLO1lBQ0osSUFBSyxNQUFjLENBQUMsc0JBQXNCLEVBQUU7Z0JBQzNDLE9BQU87YUFDUDtZQUVELCtEQUErRDtZQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7Z0JBQzVELFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO29CQUMvQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2QsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNULE9BQU87YUFDUDtZQUVELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENB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