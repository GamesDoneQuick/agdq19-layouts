import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { property } = Polymer.decorators;
const EMPTY_OBJ = {};
/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base) => {
    /**
     * @mixinClass
     * @polymer
     */
    class InterruptMixin extends base {
        constructor() {
            super(...arguments);
            this.timeline = new TimelineLite({ autoRemoveChildren: true });
            /**
             * How long, in seconds, to hold items for after they have finished entering.
             */
            this.itemDisplayDuration = 9;
            /**
             * If true, it means that we're currently showing an item,
             * and are at a point in the animation where we can show another one
             * without performing a full exit/enter cycle again.
             */
            this.canExtend = false;
        }
        ready() {
            super.ready();
            if (this.bindToMessage && this.bindToMessage.length > 0 && this.bindToMessage !== 'false') {
                nodecg.listenFor(this.bindToMessage, this.playItem.bind(this));
            }
        }
        /**
         * Plays the entrance animation for this element.
         * Then, holds it for itemDisplayDuration seconds.
         * Then, plays the exit animation for this element.
         *
         * If this.companionElement is defined, this method will run this.companionElement.hide()
         * before playing the entrance animation for this element.
         *
         * @param item - The item to show.
         * @returns - A GSAP TimelineLite instance.
         */
        playItem(item) {
            const tl = this.timeline;
            if (!item) {
                return tl;
            }
            let companionElementsArray;
            if (Array.isArray(this.companionElement)) {
                companionElementsArray = this.companionElement;
            }
            else {
                companionElementsArray = [this.companionElement];
            }
            companionElementsArray = companionElementsArray.filter(companionElement => {
                return companionElement && typeof companionElement.hide === 'function';
            });
            if (this.canExtend) {
                const newAnim = new TimelineLite();
                newAnim.add(this._createChangeAnim(item));
                newAnim.add(this._createHold());
                tl.add(newAnim, 'exit-=0.01');
                tl.shiftChildren(newAnim.duration(), true, tl.getLabelTime('exit'));
            }
            else {
                this._addReset();
                // Wait for prizes to hide, if applicable.
                tl.call(() => {
                    this._setCanExtend(true);
                    if (companionElementsArray.length <= 0) {
                        return;
                    }
                    tl.pause(null, false);
                    const companionExitTl = new TimelineLite();
                    companionElementsArray.forEach(companionElement => {
                        companionExitTl.add(companionElement.hide(), 0);
                    });
                    companionExitTl.call(() => {
                        tl.resume(null, false);
                    });
                }, undefined, null, '+=0.03');
                if (companionElementsArray.length > 0) {
                    tl.addPause();
                }
                tl.add(this._createEntranceAnim(item), '+=0.03');
                if (window.__SCREENSHOT_TESTING__) {
                    return tl;
                }
                tl.add(this._createHold());
                tl.addLabel('exit', '+=0');
                const exitAnim = new TimelineLite({
                    onStart: () => {
                        this._setCanExtend(false);
                    }
                });
                exitAnim.add(this._createExitAnim());
                tl.add(exitAnim);
                if (companionElementsArray.length > 0) {
                    tl.addLabel('companionEnter', '+=0');
                    companionElementsArray.forEach(companionElement => {
                        tl.add(companionElement.show(), 'companionEnter');
                    });
                }
                // Padding
                tl.to(EMPTY_OBJ, 0.1, EMPTY_OBJ);
            }
            return tl;
        }
        /**
         * Creates a dummy tween which can be used to hold something as-is
         * for itemDisplayDuration seconds.
         * @returns - A GSAP animation timeline.
         */
        _createHold() {
            const tl = new TimelineLite();
            tl.to(EMPTY_OBJ, this.itemDisplayDuration, EMPTY_OBJ);
            return tl;
        }
        _canExtendChanged(newVal) {
            if (newVal) {
                this.dispatchEvent(new CustomEvent('can-extend'));
            }
        }
    }
    tslib_1.__decorate([
        property({ type: Object })
    ], InterruptMixin.prototype, "companionElement", void 0);
    tslib_1.__decorate([
        property({ type: Object })
    ], InterruptMixin.prototype, "timeline", void 0);
    tslib_1.__decorate([
        property({ type: String })
    ], InterruptMixin.prototype, "bindToMessage", void 0);
    tslib_1.__decorate([
        property({ type: Number })
    ], InterruptMixin.prototype, "itemDisplayDuration", void 0);
    tslib_1.__decorate([
        property({ type: Boolean, notify: true, observer: InterruptMixin.prototype._canExtendChanged, readOnly: true })
    ], InterruptMixin.prototype, "canExtend", void 0);
    return InterruptMixin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJydXB0LW1peGluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZXJydXB0LW1peGluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBb0JsQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUN0QyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFFckI7OztHQUdHO0FBQ0gsZUFBZSxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBaUMsRUFBRSxFQUFFO0lBQzFFOzs7T0FHRztJQUNILE1BQWUsY0FBZSxTQUFRLElBQUk7UUFBMUM7O1lBS0MsYUFBUSxHQUFpQixJQUFJLFlBQVksQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFRdEU7O2VBRUc7WUFFSCx3QkFBbUIsR0FBRyxDQUFDLENBQUM7WUFFeEI7Ozs7ZUFJRztZQUVILGNBQVMsR0FBRyxLQUFLLENBQUM7UUEySG5CLENBQUM7UUFwSEEsS0FBSztZQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVkLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxPQUFPLEVBQUU7Z0JBQzFGLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQy9EO1FBQ0YsQ0FBQztRQUVEOzs7Ozs7Ozs7O1dBVUc7UUFDSCxRQUFRLENBQUMsSUFBUztZQUNqQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBRXpCLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFLENBQUM7YUFDVjtZQUVELElBQUks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