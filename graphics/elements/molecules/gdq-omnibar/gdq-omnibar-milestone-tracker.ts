import {TweenLite, TimelineLite, Power2, Power1} from 'gsap';
import GDQOmnibarMilestoneTrackerPointElement from './gdq-omnibar-milestone-tracker-point';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';

const {customElement, property} = Polymer.decorators;

export interface Milestone {
	name: string;
	total: number;
	precedingMilestone: {name: string; total: number};
	succeedingMilestone?: {name: string; total: number};
}

@customElement('gdq-omnibar-milestone-tracker')
export default class GDQOmnibarMilestoneTrackerElement extends Polymer.Element {
	@property({type: Number})
	currentTotal: number;

	@property({type: Object})
	milestone: Milestone;

	ready() {
		super.ready();

		const startElem = this.$.start as GDQOmnibarMilestoneTrackerPointElement;
		const currentElem = this.$.current as GDQOmnibarMilestoneTrackerPointElement;
		const endElem = this.$.end as GDQOmnibarMilestoneTrackerPointElement;

		TweenLite.set([
			startElem.$.line,
			currentElem.$.line,
			endElem.$.line
		], {
			scaleY: 0
		});

		TweenLite.set(currentElem, {x: 0});
		TweenLite.set(startElem.$['body-content'], {x: '100%'});
		TweenLite.set(currentElem.$['body-content'], {x: '-105%'});
		TweenLite.set(endElem.$['body-content'], {x: '-100%'});
		TweenLite.set(this.$.nextGoalLabel, {x: '101%'});
	}

	enter(displayDuration: number) {
		const tl = new TimelineLite();
		const startElem = this.$.start as GDQOmnibarMilestoneTrackerPointElement;
		const currentElem = this.$.current as GDQOmnibarMilestoneTrackerPointElement;
		const endElem = this.$.end as GDQOmnibarMilestoneTrackerPointElement;
		const milestoneStart = this.milestone.precedingMilestone.total;
		const percentCompleted = (this.currentTotal - milestoneStart) / (this.milestone.total - milestoneStart);
		const availableSpace =
			this.$.body.getBoundingClientRect().width -
			currentElem.$.line.clientWidth;
		const currentPointBodyRect = currentElem.$.body.getBoundingClientRect();
		this._updateCurrentBody({
			percent: 0,
			availableSpace,
			currentPointBodyRect
		});

		tl.to([
			startElem.$.line,
			endElem.$.line
		], 0.25, {
			scaleY: 1,
			ease: Power2.easeInOut
		});

		tl.to([
			startElem.$['body-content'],
			endElem.$['body-content'],
			this.$.nextGoalLabel
		], 0.75, {
			x: '0%',
			ease: Power2.easeInOut
		});

		tl.to(currentElem.$.line, 0.25, {
			scaleY: 1,
			ease: Power2.easeInOut
		}, '+=0.08');

		tl.to(currentElem.$['body-content'], 0.25, {
			x: '0%',
			ease: Power2.easeInOut
		});

		const fooTween = TweenLite.to([
			currentElem,
			this.$.fill
		], (percentCompleted * 3) + 0.5, {
			x: `${percentCompleted * availableSpace}px`,
			ease: Power1.easeInOut,
			onUpdate: (self: TweenLite) => {
				this._updateCurrentBody({
					percent: self.progress(),
					startValue: this.milestone.precedingMilestone.total,
					endValue: this.currentTotal,
					availableSpace,
					currentPointBodyRect
				});
			},
			onUpdateParams: ['{self}']
		});
		tl.add(fooTween);

		tl.to({}, displayDuration, {});

		return tl;
	}

	exit() {
		const tl = new TimelineLite();

		tl.add(createMaybeRandomTween({
			target: this.style,
			propName: 'opacity',
			duration: 0.465,
			start: {probability: 1, normalValue: 0},
			end: {probability: 0, normalValue: 0}
		}));

		return tl;
	}

	_updateCurrentBody(
		{percent = 0, startValue = 0, endValue = 0, availableSpace, currentPointBodyRect}:
		{percent?: number; startValue?: number; endValue?: number; availableSpace: number; currentPointBodyRect: ClientRect | DOMRect}
	) {
		const currentElem = this.$.current as GDQOmnibarMilestoneTrackerPointElement;
		const availableLeftSpace = (currentElem as any)._gsTransform.x;
		const availableRightSpace = availableSpace - (currentElem as any)._gsTransform.x;
		const centeredOverhang = (currentPointBodyRect.width / 2) - 1.5;
		const leftDefecit = Math.max(centeredOverhang - availableLeftSpace, 0);
		const rightDefecit = Math.max(centeredOverhang - availableRightSpace, 0);
		const finalTransform = leftDefecit - rightDefecit;
		TweenLite.set(currentElem.$.body, {x: finalTransform});

		const delta = endValue - startValue;
		currentElem.amount = startValue + (delta * percent);
	}
}
