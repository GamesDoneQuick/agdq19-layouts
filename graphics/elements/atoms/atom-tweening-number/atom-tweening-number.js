import * as tslib_1 from "tslib";
var AtomTweeningNumberElement_1;
import { TweenLite, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
// By default, displayValueTransform converts displayValue to a display with no fraction.
const defaultDisplayValueTransform = (displayValue) => {
    return displayValue.toLocaleString('en-US', {
        maximumFractionDigits: 0
    });
};
/**
 * @customElement
 * @polymer
 */
let AtomTweeningNumberElement = AtomTweeningNumberElement_1 = class AtomTweeningNumberElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        /**
         * An optional function which takes in the currently displaying value
         * and transforms it in some way. By default, it converts _displayValue
         * to USD with no cents (whole integer dollar amounts only).
         */
        this.displayValueTransform = defaultDisplayValueTransform;
        this.intervalLength = 1;
        /**
         * How much time to add to the duration of the tween for
         * each "interval" in the value. (Default interval length is 1).
         */
        this.timePerValueInterval = 0.03;
        /**
         * The maximum duration, in seconds, that a single value tween can be.
         */
        this.maxDuration = 3;
        /**
         * The ease to use when tweening between the old value and the new value.
         */
        this.ease = Power2.easeOut;
        /**
         * If true, doesn't tween the first time value is set.
         */
        this.skipInitial = true;
        /**
         * The value displaying right now, this is what actually gets tweened.
         */
        this._displayValue = 0;
        /**
         * Whether or not we have done the first-time setup of the value, which simply sets
         * it with no tween.
         */
        this._initialized = false;
        this._tween = null;
    }
    /**
     * Computes how long the tween will be for a given value delta.
     * @param deltaValue - The delta to compute a tween duration for.
     * @returns - The computed tween duration, in seconds.
     */
    calcTweenDuration(deltaValue) {
        const deltaIntervals = deltaValue / this.intervalLength;
        return Math.min(deltaIntervals * this.timePerValueInterval, this.maxDuration);
    }
    _valueChanged(newValue) {
        if (this.skipInitial && !this._initialized) {
            this._initialized = true;
            this._displayValue = newValue;
            return;
        }
        const deltaValue = newValue - this._displayValue;
        const duration = this.calcTweenDuration(deltaValue);
        this.tween(newValue, duration);
    }
    tween(newValue, duration) {
        if (this._tween) {
            this._tween.kill();
            this._tween = null;
        }
        this._tween = TweenLite.to(this, duration, {
            _displayValue: newValue,
            ease: this.ease
        });
        return this._tween;
    }
};
tslib_1.__decorate([
    property({ type: Number, observer: AtomTweeningNumberElement_1.prototype._valueChanged })
], AtomTweeningNumberElement.prototype, "value", void 0);
tslib_1.__decorate([
    property({ type: Object })
], AtomTweeningNumberElement.prototype, "displayValueTransform", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTweeningNumberElement.prototype, "intervalLength", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTweeningNumberElement.prototype, "timePerValueInterval", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTweeningNumberElement.prototype, "maxDuration", void 0);
tslib_1.__decorate([
    property({ type: Object })
], AtomTweeningNumberElement.prototype, "ease", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], AtomTweeningNumberElement.prototype, "skipInitial", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomTweeningNumberElement.prototype, "_displayValue", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], AtomTweeningNumberElement.prototype, "_initialized", void 0);
AtomTweeningNumberElement = AtomTweeningNumberElement_1 = tslib_1.__decorate([
    customElement('atom-tweening-number')
], AtomTweeningNumberElement);
export default AtomTweeningNumberElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS10d2VlbmluZy1udW1iZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLXR3ZWVuaW5nLW51bWJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVEsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBSTdDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRCx5RkFBeUY7QUFDekYsTUFBTSw0QkFBNEIsR0FBRyxDQUFDLFlBQW9CLEVBQUUsRUFBRTtJQUM3RCxPQUFPLFlBQVksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO1FBQzNDLHFCQUFxQixFQUFFLENBQUM7S0FDeEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUY7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLGlDQUE5QyxNQUFxQix5QkFBMEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUx0RTs7O09BR0c7SUFDSDs7UUFRQzs7OztXQUlHO1FBRUgsMEJBQXFCLEdBQTBCLDRCQUE0QixDQUFDO1FBRzVFLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBRW5COzs7V0FHRztRQUVILHlCQUFvQixHQUFHLElBQUksQ0FBQztRQUU1Qjs7V0FFRztRQUVILGdCQUFXLEdBQUcsQ0FBQyxDQUFDO1FBRWhCOztXQUVHO1FBRUgsU0FBSSxHQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFFNUI7O1dBRUc7UUFFSCxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUVuQjs7V0FFRztRQUVILGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRWxCOzs7V0FHRztRQUVILGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLFdBQU0sR0FBcUIsSUFBSSxDQUFDO0lBcUNqQyxDQUFDO0lBbkNBOzs7O09BSUc7SUFDSCxpQkFBaUIsQ0FBQyxVQUFrQjtRQUNuQyxNQUFNLGNBQWMsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELGFBQWEsQ0FBQyxRQUFnQjtRQUM3QixJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1lBQzlCLE9BQU87U0FDUDtRQUVELE1BQU0sVUFBVSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ2pELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7UUFDdkMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDbkI7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtZQUMxQyxhQUFhLEVBQUUsUUFBUTtZQUN2QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDZixDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDcEIsQ0FBQztDQUNELENBQUE7QUF4RkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSwyQkFBeUIsQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFDLENBQUM7d0RBQ3hFO0FBUWQ7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7d0VBQ21EO0FBRzVFO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2lFQUNOO0FBT25CO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3VFQUNHO0FBTTVCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzhEQUNUO0FBTWhCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3VEQUNHO0FBTTVCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDOzhEQUNQO0FBTW5CO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2dFQUNQO0FBT2xCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDOytEQUNMO0FBdERELHlCQUF5QjtJQUQ3QyxhQUFhLENBQUMsc0JBQXNCLENBQUM7R0FDakIseUJBQXlCLENBNkY3QztlQTdGb0IseUJBQXlCIn0=