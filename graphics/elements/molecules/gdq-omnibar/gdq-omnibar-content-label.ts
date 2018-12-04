import {TimelineLite, Power3, Power2} from 'gsap';

const {customElement} = Polymer.decorators;
const memoizedYardstickWidths = new Map();
const memoizedBodyTweenDurations = new Map();
const MAX_MEMOIZATION_MAP_SIZE = 150;
const ANCHOR_TWEEN_DURATION = 0.3;
const BODY_TWEEN_DURATION_PER_PX = 0.002;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-content-label')
export default class GDQOmnibarContentLabelElement extends Polymer.Element {
	enter(labelHtml: string) {
		labelHtml = this.processLabelHtml(labelHtml); // tslint:disable-line:no-parameter-reassignment

		const tl = new TimelineLite();
		const yardstickWidth = this.calcBodyWidth(labelHtml);

		tl.fromTo(this.$.anchor, ANCHOR_TWEEN_DURATION, {
			scaleY: 0
		}, {
			scaleY: 1,
			ease: Power3.easeInOut
		});

		tl.fromTo(this.$.body, this.calcBodyTweenDuration(labelHtml), {
			x: '-100%'
		}, {
			x: '0%',
			ease: Power2.easeOut,
			onStart: () => {
				const textElem = this.$.text as HTMLDivElement;
				textElem.innerHTML = labelHtml;
				textElem.style.width = `${Math.ceil(yardstickWidth)}px`;
			}
		});

		return tl;
	}

	change(labelHtml: string) {
		labelHtml = this.processLabelHtml(labelHtml); // tslint:disable-line:no-parameter-reassignment

		const tl = new TimelineLite();
		const yardstickWidth = this.calcBodyWidth(labelHtml);

		tl.to(this.$.body, this.calcBodyTweenDuration(labelHtml), {
			x: '-100%',
			ease: Power2.easeIn,
			onComplete: () => {
				const textElem = this.$.text as HTMLDivElement;
				textElem.innerHTML = labelHtml;
				textElem.style.width = `${Math.ceil(yardstickWidth)}px`;
			}
		});

		tl.to(this.$.body, this.calcBodyTweenDuration(labelHtml), {
			x: '0%',
			ease: Power2.easeOut,
			delay: 0.2
		});

		return tl;
	}

	exit() {
		const tl = new TimelineLite();

		tl.to(this.$.body, this.calcBodyTweenDuration(), {
			x: '-100%',
			ease: Power2.easeIn
		});

		tl.to(this, ANCHOR_TWEEN_DURATION, {
			scaleY: 0,
			ease: Power3.easeInOut
		});

		return tl;
	}

	processLabelHtml(labelHtml: string) {
		return labelHtml.replace(/\\n/g, '<br/>');
	}

	calcBodyWidth(labelHtml = ''): number {
		if (memoizedYardstickWidths.has(labelHtml)) {
			return memoizedYardstickWidths.get(labelHtml);
		}

		if (memoizedYardstickWidths.size > MAX_MEMOIZATION_MAP_SIZE) {
			memoizedYardstickWidths.clear();
		}

		this.$.yardstick.innerHTML = labelHtml;
		const width = this.$.yardstick.clientWidth;
		memoizedYardstickWidths.set(labelHtml, width);
		return width;
	}

	calcBodyTweenDuration(labelHtml?: string): number {
		if (memoizedBodyTweenDurations.has(labelHtml)) {
			return memoizedBodyTweenDurations.get(labelHtml);
		}

		if (memoizedBodyTweenDurations.size > MAX_MEMOIZATION_MAP_SIZE) {
			memoizedYardstickWidths.clear();
		}

		let duration;
		if (labelHtml) {
			const yardstickWidth = this.calcBodyWidth(labelHtml);
			duration = BODY_TWEEN_DURATION_PER_PX * (yardstickWidth + 30); // 30 = width added by chevrons
		} else {
			duration = BODY_TWEEN_DURATION_PER_PX * this.$.body.clientWidth;
		}

		memoizedBodyTweenDurations.set(labelHtml, duration);
		return duration;
	}
}
