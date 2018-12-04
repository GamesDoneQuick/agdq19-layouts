"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:jsdoc-format */
const random_1 = require("./vendor/random");
const gsap_1 = require("gsap");
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
function getMaybeRandomNumber({ probability, normalValue, minValue = 0, maxValue = 1 }) {
    if (probability > 0) {
        const randomNumber = random_1.default.real(0, 1, true)(random_1.default.engines.browserCrypto);
        if (randomNumber <= probability) {
            return random_1.default.real(minValue, maxValue, true)(random_1.default.engines.browserCrypto);
        }
    }
    return normalValue;
}
exports.getMaybeRandomNumber = getMaybeRandomNumber;
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
function createMaybeRandomTween({ target, propName, duration, ease = gsap_1.Linear.easeNone, delay = 0, start, end, onUpdate }) {
    const proxy = Object.assign({}, start);
    const tweenProps = Object.assign({ ease,
        delay }, end);
    if (Array.isArray(target)) {
        tweenProps.onUpdate = () => {
            const randomValue = getMaybeRandomNumber(proxy);
            target.forEach(childTarget => {
                childTarget[propName] = randomValue;
            });
            if (onUpdate) {
                onUpdate(randomValue);
            }
        };
    }
    else {
        tweenProps.onUpdate = () => {
            const randomValue = getMaybeRandomNumber(proxy);
            target[propName] = randomValue;
            if (onUpdate) {
                onUpdate(randomValue);
            }
        };
    }
    return gsap_1.TweenLite.to(proxy, duration, tweenProps);
}
exports.createMaybeRandomTween = createMaybeRandomTween;
//# sourceMappingURL=maybe-random.js.map