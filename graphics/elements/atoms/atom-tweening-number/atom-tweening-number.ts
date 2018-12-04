import {TweenLite, Ease, Power2} from 'gsap';

type DisplayValueTransform = (displayValue: number) => (number | string);

const {customElement, property} = Polymer.decorators;

// By default, displayValueTransform converts displayValue to a display with no fraction.
const defaultDisplayValueTransform = (displayValue: number) => {
	return displayValue.toLocaleString('en-US', {
		maximumFractionDigits: 0
	});
};

/**
 * @customElement
 * @polymer
 */
@customElement('atom-tweening-number')
export default class AtomTweeningNumberElement extends Polymer.Element {
	/**
	 * The value you wish to tween to.
	 */
	@property({type: Number, observer: AtomTweeningNumberElement.prototype._valueChanged})
	value: number;

	/**
	 * An optional function which takes in the currently displaying value
	 * and transforms it in some way. By default, it converts _displayValue
	 * to USD with no cents (whole integer dollar amounts only).
	 */
	@property({type: Object})
	displayValueTransform: DisplayValueTransform = defaultDisplayValueTransform;

	@property({type: Number})
	intervalLength = 1;

	/**
	 * How much time to add to the duration of the tween for
	 * each "interval" in the value. (Default interval length is 1).
	 */
	@property({type: Number})
	timePerValueInterval = 0.03;

	/**
	 * The maximum duration, in seconds, that a single value tween can be.
	 */
	@property({type: Number})
	maxDuration = 3;

	/**
	 * The ease to use when tweening between the old value and the new value.
	 */
	@property({type: Object})
	ease: Ease = Power2.easeOut;

	/**
	 * If true, doesn't tween the first time value is set.
	 */
	@property({type: Boolean})
	skipInitial = true;

	/**
	 * The value displaying right now, this is what actually gets tweened.
	 */
	@property({type: Number})
	_displayValue = 0;

	/**
	 * Whether or not we have done the first-time setup of the value, which simply sets
	 * it with no tween.
	 */
	@property({type: Boolean})
	_initialized = false;

	_tween: TweenLite | null = null;

	/**
	 * Computes how long the tween will be for a given value delta.
	 * @param deltaValue - The delta to compute a tween duration for.
	 * @returns - The computed tween duration, in seconds.
	 */
	calcTweenDuration(deltaValue: number) {
		const deltaIntervals = deltaValue / this.intervalLength;
		return Math.min(deltaIntervals * this.timePerValueInterval, this.maxDuration);
	}

	_valueChanged(newValue: number) {
		if (this.skipInitial && !this._initialized) {
			this._initialized = true;
			this._displayValue = newValue;
			return;
		}

		const deltaValue = newValue - this._displayValue;
		const duration = this.calcTweenDuration(deltaValue);
		this.tween(newValue, duration);
	}

	tween(newValue: number, duration: number) {
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
}
