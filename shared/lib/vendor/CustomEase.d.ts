import {Ease} from 'gsap';

// tslint:disable:no-unnecessary-class
export class CustomEase {
	static create(id: string, data: string): Ease;
	static get(id: string): Ease;
	static getSVGData(ease: string | Ease, vars: {width: number; height: number; x: number; y: number; path: number}): string;
}
export {CustomEase as default};
