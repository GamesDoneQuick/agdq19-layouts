import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Power2, Power4 } from 'gsap';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidChallengeElement = class GDQBreakBidChallengeElement extends Polymer.Element {
    ready() {
        super.ready();
        const amountElem = this.$.amount;
        const percentElem = this.$.percent;
        amountElem.ease = Power2.easeOut;
        amountElem.displayValueTransform = displayValue => {
            return '$' + displayValue.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            });
        };
        percentElem.ease = Power2.easeOut;
        percentElem.displayValueTransform = displayValue => {
            return displayValue.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            }) + '%';
        };
        TweenLite.set(this, { opacity: 0 });
        TweenLite.set(this.$.meter, { scaleX: 0 });
        TweenLite.set(this.$['meter-line'], { scaleY: 0 });
    }
    enter() {
        let meterPercent = this.bid.rawTotal / this.bid.rawGoal;
        meterPercent = Math.max(meterPercent, 0); // Clamp to min 0
        meterPercent = Math.min(meterPercent, 1); // Clamp to max 1
        if (Number.isNaN(meterPercent)) {
            meterPercent = 0;
        }
        const tl = new TimelineLite();
        const meterDuration = meterPercent * 0.75;
        tl.set(this.$.left, {
            width: `${meterPercent * 100}%`
        });
        tl.call(() => {
            this.$.goal.textContent = '$' + this.bid.rawGoal.toLocaleString('en-US', {
                maximumFractionDigits: 0,
                useGrouping: false
            });
            if (this.$.meter.clientWidth < this.$.amount.clientWidth) {
                TweenLite.set(this.$.amount, {
                    right: '',
                    left: '100%'
                });
            }
        }, undefined, null, '+=0.03');
        tl.add(createMaybeRandomTween({
            target: this.style,
            propName: 'opacity',
            duration: 0.465,
            ease: Power4.easeIn,
            start: { probability: 1, normalValue: 0 },
            end: { probability: 0, normalValue: 1 }
        }));
        tl.to(this.$['meter-line'], 0.324, {
            scaleY: 1,
            ease: Power2.easeInOut
        });
        tl.to(this.$.meter, meterDuration, {
            scaleX: 1,
            ease: Power2.easeOut,
            onStart: () => {
                this.$.amount.tween(this.bid.rawTotal, meterDuration);
                this.$.percent.tween(Math.floor(meterPercent * 100), meterDuration);
            }
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.add(createMaybeRandomTween({
            target: this.style,
            propName: 'opacity',
            duration: 0.2,
            ease: Power4.easeIn,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }));
        return tl;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakBidChallengeElement.prototype, "bid", void 0);
GDQBreakBidChallengeElement = tslib_1.__decorate([
    customElement('gdq-break-bid-challenge')
], GDQBreakBidChallengeElement);
export default GDQBreakBidChallengeElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZC1jaGFsbGVuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkLWNoYWxsZW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUU3RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUkzRSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsMkJBQTJCLEdBQWhELE1BQXFCLDJCQUE0QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBSXZFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQW1DLENBQUM7UUFDOUQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFvQyxDQUFDO1FBRWhFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNqQyxVQUFVLENBQUMscUJBQXFCLEdBQUcsWUFBWSxDQUFDLEVBQUU7WUFDakQsT0FBTyxHQUFHLEdBQUcsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pELHFCQUFxQixFQUFFLENBQUM7Z0JBQ3hCLFdBQVcsRUFBRSxLQUFLO2FBQ2xCLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQztRQUVGLFdBQVcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNsQyxXQUFXLENBQUMscUJBQXFCLEdBQUcsWUFBWSxDQUFDLEVBQUU7WUFDbEQsT0FBTyxZQUFZLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtnQkFDM0MscUJBQXFCLEVBQUUsQ0FBQztnQkFDeEIsV0FB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