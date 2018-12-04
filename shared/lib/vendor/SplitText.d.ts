// tslint:disable:no-unnecessary-class
export class SplitText {
	chars: HTMLElement[];
	lines: HTMLElement[];
	words: HTMLElement[];

	constructor(target: HTMLElement, options: Partial<SplitTextOptions>);

	revert(): void;
	split(options: Partial<SplitTextOptions>): void;
}
export {SplitText as default};

interface SplitTextOptions {
	type: string;
	charsClass: string;
	linesClass: string;
	position: 'relative' | 'absolute';
	wordDelimiter: string;
	wordsClass: string;
	specialChars: string[] | Function;
	reduceWhiteSpace: boolean;
}
