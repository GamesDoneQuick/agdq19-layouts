import { TimelineLite } from 'gsap';
import { SplitText } from './vendor/SplitText';
// Reference GSAP plugins to prevent them from being tree-shaken out of the build.
window._gsapPlugins = [SplitText];
// A simple placeholder empty object used to create empty padding tweens.
const EMPTY_OBJ = {};
// Used to remember what splits and split types have previously been used on elements.
const memoryMap = new WeakMap();
/**
 * Creates an animation for a "type-in" effect on an HTML element.
 * Uses GSAP's SplitText library.
 *
 * @param element - The element to play this animation on.
 * @param options - Optional options.
 * @param options.splitType - Controls whether to split the
 * text into chars, chars and words, or chars, words, and lines.
 * @param options.typeInterval - The amount of time, in seconds,
 * between each individual character being shown.
 * @returns A GSAP TimelineLite instance.
 */
export function typeAnim(element, { splitType = 'chars,words', typeInterval = 0.03 } = {}) {
    const tl = new TimelineLite();
    const split = new SplitText(element, {
        type: splitType,
        charsClass: 'character',
        linesClass: 'line'
    });
    memoryMap.set(element, { split });
    switch (splitType) {
        case 'chars':
            tl.staggerFromTo(split.chars, 0.001, {
                visibility: 'hidden'
            }, {
                visibility: 'visible'
            }, typeInterval);
            break;
        case 'chars,words':
        case 'chars,words,lines':
            split.words.forEach((word) => {
                tl.staggerFromTo(word.children, 0.001, {
                    visibility: 'hidden'
                }, {
                    visibility: 'visible'
                }, typeInterval);
                tl.to(EMPTY_OBJ, typeInterval, EMPTY_OBJ);
            });
            break;
        default:
            throw new Error(`Unexpected splitType "${splitType}"`);
    }
    return tl;
}
/**
 * Creates an animation for a "type-out" or "un-type" effect on an HTML element.
 * The element must have previously used the "typeAnim" method to define its "split" property.
 * Uses GSAP's SplitText library.
 *
 * @param element - The element to play this animation on.
 * @param typeInterval - The amount of time, in seconds, between each individual character being shown.
 * @returns A GSAP TimelineLite instance.
 */
export function untypeAnim(element, typeInterval = 0.03) {
    const tl = new TimelineLite();
    if (!memoryMap.has(element)) {
        return tl;
    }
    const split = memoryMap.get(element).split;
    if (split.words) {
        split.words.forEach((word) => {
            tl.staggerTo(word.children, 0.001, {
                visibility: 'hidden'
            }, typeInterval);
            tl.to(EMPTY_OBJ, typeInterval, EMPTY_OBJ);
        });
    }
    else {
        tl.staggerFrom(split.chars, 0.001, {
            visibility: 'hidden'
        }, typeInterval);
    }
    return tl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1hbmltcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR5cGUtYW5pbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFN0Msa0ZBQWtGO0FBQ2pGLE1BQWMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUUzQyx5RUFBeUU7QUFDekUsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBRXJCLHNGQUFzRjtBQUN0RixNQUFNLFNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0FBT2hDOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLFFBQVEsQ0FDdkIsT0FBb0IsRUFDcEIsRUFBQyxTQUFTLEdBQUcsYUFBYSxFQUFFLFlBQVksR0FBRyxJQUFJLEtBQThCLEVBQUU7SUFFL0UsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUU5QixNQUFNLEtBQUssR0FBRyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUU7UUFDcEMsSUFBSSxFQUFFLFNBQVM7UUFDZixVQUFVLEVBQUUsV0FBVztRQUN2QixVQUFVLEVBQUUsTUFBTTtLQUNsQixDQUFDLENBQUM7SUFFSCxTQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7SUFFaEMsUUFBUSxTQUFTLEVBQUU7UUFDbEIsS0FBSyxPQUFPO1lBQ1gsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRTtnQkFDcEMsVUFBVSxFQUFFLFFBQVE7YUFDcEIsRUFBRTtnQkFDRixVQUFVLEVBQUUsU0FBUzthQUNyQixFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRWpCLE1BQU07UUFDUCxLQUFLLGFBQWEsQ0FBQztRQUNuQixLQUFLLG1CQUFtQjtZQUN2QixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO2dCQUNqQyxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFO29CQUN0QyxVQUFVLEVBQUUsUUFBUTtpQkFDcEIsRUFBRTtvQkFDRixVQUFVLEVBQUUsU0FBUztpQkFDckIsRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFFakIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzNDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNQO1lBQ0MsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUN4RDtJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ1gsQ0FBQztBQUVEOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FBQyxPQUFvQixFQUFFLFlBQVksR0FBRyxJQUFJO0lBQ25FLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDNUIsT0FBTyxFQUFFLENBQUM7S0FDVjtJQUVELE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBRTNDLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtRQUNoQixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ2pDLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUU7Z0JBQ2xDLFVBQVUsRUFBRSxRQUFRO2FBQ3BCLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFFakIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0tBQ0g7U0FBTTtRQUNOLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7WUFDbEMsVUFBVSxFQUFFLFFBQVE7U0FDcEIsRUFBRSxZQUFZLENBQUMsQ0FBQztLQUNqQjtJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ1gsQ0FBQyJ9