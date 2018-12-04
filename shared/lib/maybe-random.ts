/* tslint:disable:jsdoc-format */
import Random from './vendor/random';
import {TweenLite, Linear, Ease, TweenConfig} from 'gsap';

/**
 * The sole argument object to the getMaybeRandomNumber function.
 * probability - The percent chance for choosing a random value.
 * A value of 1 will always create a random value, a value of 0.5 will
 * create a random value 50% of the time, value of 0.25 will be 25%, etc.
 * normalValue - The value returned when a random value is NOT chosen.
 * [minValue = 0] - The minimum random value that can be generated.
 * [maxValue = 1] - The maximum random value that can be generated.
 */
export interface MaybeRandomNumberParams {
	probability: number;
	normalValue: number;
	minValue?: number;
	maxValue?: number;
}

export interface MaybeRandomTweenParams {
	target: object | object[];
	propName: string;
	duration: number;
	ease?: Ease;
	delay?: number;
	start: MaybeRandomNumberParams;
	end: MaybeRandomNumberParams;
	onUpdate?(randomValue: number): void;
}

/**
 * Returns a number that has a chance of being random.
 *
 * @param args - The args.
 * @returns The final calculated number.
 *
 * @example <caption>Example usage with default minValue and maxValue.</caption>
 * getMaybeRandomValue({
 *   probability: 0.5,
 *   normalValue: 1
 * });
 *
 * @example <caption>Example usage with specified minValue and maxValue.</caption>
 * getMaybeRandomValue({
 * 	probability: 0.25,
 *	normalValue: 10,
 *	minValue: 2,
 *	maxValue: 20
 * });
 */
export function getMaybeRandomNumber({
	probability,
	normalValue,
	minValue = 0,
	maxValue = 1
}: MaybeRandomNumberParams) {
	if (probability > 0) {
		const randomNumber = Random.real(0, 1, true)(Random.engines.browserCrypto);
		if (randomNumber <= probability) {
			return Random.real(minValue, maxValue, true)(Random.engines.browserCrypto);
		}
	}

	return normalValue;
}

/**
 * Creates a tween which uses getMaybeRandomNumber.
 *
 * @param target - The object to tween, or an array of objects.
 * @param propName - The name of the property to tween on the target object.
 * @param duration - The duration of the tween.
 * @param [ease=Linear.easeNone] - An easing function which accepts a single "progress" argument,
 * which is a float in the range 0 - 1. All GSAP eases are supported, as they follow this signature.
 * @param [delay=0] - How long, in seconds, to delay the start of the tween.
 * @param start - The starting getMaybeRandomNumber arguments.
 * @param end - The ending getMaybeRandomNumber arguments.
 * @param [onUpdate] - An optional callback which will be invoked on every tick with the new MaybeRandom value.
 * @returns A GSAP TweenLite tween.
 *
 * @example
 * createMaybeRandomTween({
 *	target: element.style,
 *	propName: 'opacity',
 *	duration: 1,
 *	ease: Sine.easeOut,
 *	start: {probability: 1, normalValue: 0},
 *	end: {probability: 0, normalValue: 1}
 * });
 */
export function createMaybeRandomTween({
	target,
	propName,
	duration,
	ease = Linear.easeNone,
	delay = 0,
	start,
	end,
	onUpdate
}: MaybeRandomTweenParams) {
	const proxy = {...start};
	const tweenProps = {
		ease,
		delay,
		...end
	} as Partial<TweenConfig>;

	if (Array.isArray(target)) {
		tweenProps.onUpdate = () => {
			const randomValue = getMaybeRandomNumber(proxy);
			target.forEach(childTarget => {
				(childTarget as any)[propName] = randomValue;
			});

			if (onUpdate) {
				onUpdate(randomValue);
			}
		};
	} else {
		tweenProps.onUpdate = () => {
			const randomValue = getMaybeRandomNumber(proxy);
			(target as any)[propName] = randomValue;
			if (onUpdate) {
				onUpdate(randomValue);
			}
		};
	}

	return TweenLite.to(proxy, duration, tweenProps);
}
