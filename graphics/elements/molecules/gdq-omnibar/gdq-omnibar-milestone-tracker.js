import * as tslib_1 from "tslib";
import { TweenLite, TimelineLite, Power2, Power1 } from 'gsap';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
const { customElement, property } = Polymer.decorators;
let GDQOmnibarMilestoneTrackerElement = class GDQOmnibarMilestoneTrackerElement extends Polymer.Element {
    ready() {
        super.ready();
        const startElem = this.$.start;
        const currentElem = this.$.current;
        const endElem = this.$.end;
        TweenLite.set([
            startElem.$.line,
            currentElem.$.line,
            endElem.$.line
        ], {
            scaleY: 0
        });
        TweenLite.set(currentElem, { x: 0 });
        TweenLite.set(startElem.$['body-content'], { x: '100%' });
        TweenLite.set(currentElem.$['body-content'], { x: '-105%' });
        TweenLite.set(endElem.$['body-content'], { x: '-100%' });
        TweenLite.set(this.$.nextGoalLabel, { x: '101%' });
    }
    enter(displayDuration) {
        const tl = new TimelineLite();
        const startElem = this.$.start;
        const currentElem = this.$.current;
        const endElem = this.$.end;
        const milestoneStart = this.milestone.precedingMilestone.total;
        const percentCompleted = (this.currentTotal - milestoneStart) / (this.milestone.total - milestoneStart);
        const availableSpace = this.$.body.getBoundingClientRect().width -
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
            onUpdate: (self) => {
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
            start: { probability: 1, normalValue: 0 },
            end: { probability: 0, normalValue: 0 }
        }));
        return tl;
    }
    _updateCurrentBody({ percent = 0, startValue = 0, endValue = 0, availableSpace, currentPointBodyRect }) {
        const currentElem = this.$.current;
        const availableLeftSpace = currentElem._gsTransform.x;
        const availableRightSpace = availableSpace - currentElem._gsTransform.x;
        const centeredOverhang = (currentPointBodyRect.width / 2) - 1.5;
        const leftDefecit = Math.max(centeredOverhang - availableLeftSpace, 0);
        const rightDefecit = Math.max(centeredOverhang - availableRightSpace, 0);
        const finalTransform = leftDefecit - rightDefecit;
        TweenLite.set(currentElem.$.body, { x: finalTransform });
        const delta = endValue - startValue;
        currentElem.amount = startValue + (delta * percent);
    }
};
tslib_1.__decorate([
    property({ type: Number })
], GDQOmnibarMilestoneTrackerElement.prototype, "currentTotal", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQOmnibarMilestoneTrackerElement.prototype, "milestone", void 0);
GDQOmnibarMilestoneTrackerElement = tslib_1.__decorate([
    customElement('gdq-omnibar-milestone-tracker')
], GDQOmnibarMilestoneTrackerElement);
export default GDQOmnibarMilestoneTrackerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbWlsZXN0b25lLXRyYWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci1taWxlc3RvbmUtdHJhY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU3RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUUzRSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFVckQsSUFBcUIsaUNBQWlDLEdBQXRELE1BQXFCLGlDQUFrQyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTzdFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQStDLENBQUM7UUFDekUsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFpRCxDQUFDO1FBQzdFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBNkMsQ0FBQztRQUVyRSxTQUFTLENBQUMsR0FBRyxDQUFDO1lBQ2IsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ2hCLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNsQixPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUk7U0FDZCxFQUFFO1lBQ0YsTUFBTSxFQUFFLENBQUM7U0FDVCxDQUFDLENBQUM7UUFFSCxTQUFTLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ25DLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFD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