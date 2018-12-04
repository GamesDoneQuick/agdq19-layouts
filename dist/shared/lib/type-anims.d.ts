import { TimelineLite } from 'gsap';
export interface TypeAnimOptions {
    splitType: 'chars' | 'chars,words' | 'chars,words,lines';
    typeInterval: number;
}
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
export declare function typeAnim(element: HTMLElement, { splitType, typeInterval }?: Partial<TypeAnimOptions>): TimelineLite;
/**
 * Creates an animation for a "type-out" or "un-type" effect on an HTML element.
 * The element must have previously used the "typeAnim" method to define its "split" property.
 * Uses GSAP's SplitText library.
 *
 * @param element - The element to play this animation on.
 * @param typeInterval - The amount of time, in seconds, between each individual character being shown.
 * @returns A GSAP TimelineLite instance.
 */
export declare function untypeAnim(element: HTMLElement, typeInterval?: number): TimelineLite;
//# sourceMappingURL=type-anims.d.ts.map