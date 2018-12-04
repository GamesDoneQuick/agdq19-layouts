/* tslint:disable:jsdoc-format */
import Random from './vendor/random';
import { TweenLite, Linear } from 'gsap';
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
export function getMaybeRandomNumber({ probability, normalValue, minValue = 0, maxValue = 1 }) {
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
export function createMaybeRandomTween({ target, propName, duration, ease = Linear.easeNone, delay = 0, start, end, onUpdate }) {
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
    return TweenLite.to(proxy, duration, tweenProps);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF5YmUtcmFuZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWF5YmUtcmFuZG9tLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGlDQUFpQztBQUNqQyxPQUFPLE1BQU0sTUFBTSxpQkFBaUIsQ0FBQztBQUNyQyxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBb0IsTUFBTSxNQUFNLENBQUM7QUE2QjFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxVQUFVLG9CQUFvQixDQUFDLEVBQ3BDLFdBQVcsRUFDWCxXQUFXLEVBQ1gsUUFBUSxHQUFHLENBQUMsRUFDWixRQUFRLEdBQUcsQ0FBQyxFQUNhO0lBQ3pCLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRTtRQUNwQixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzRSxJQUFJLFlBQVksSUFBSSxXQUFXLEVBQUU7WUFDaEMsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzRTtLQUNEO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDcEIsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxFQUN0QyxNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsRUFDdEIsS0FBSyxHQUFHLENBQUMsRUFDVCxLQUFLLEVBQ0wsR0FBRyxFQUNILFFBQVEsRUFDZ0I7SUFDeEIsTUFBTSxLQUFLLHFCQUFPLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sVUFBVSxHQUFHLGdCQUNsQixJQUFJO1FBQ0osS0FBSyxJQUNGLEdBQUcsQ0FDa0IsQ0FBQztJQUUxQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDMUIsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDMUIsTUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDM0IsV0FBbUIsQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLFFBQVEsRUFBRTtnQkFDYixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEI7UUFDRixDQUFDLENBQUM7S0FDRjtTQUFNO1FBQ04sVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDMUIsTUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0MsTUFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsQ0FBQztZQUN4QyxJQUFJLFFBQVEsRUFBRTtnQkFDYixRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDdEI7UUFDRixDQUFDLENBQUM7S0FDRjtJQUVELE9BQU8sU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2xELENBQUMifQ==