import * as tslib_1 from "tslib";
import { TimelineLite, Power4 } from 'gsap';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidManyElement = class GDQBreakBidManyElement extends Polymer.Element {
    enter() {
        this.$.optionRepeat.render();
        const tl = new TimelineLite();
        const optionElements = Array.from(this.shadowRoot.querySelectorAll('gdq-break-bid-many-option'));
        tl.addLabel('flickerOptions', '+=0');
        optionElements.forEach((optionElement, index) => {
            optionElement.style.opacity = '0';
            tl.add(createMaybeRandomTween({
                target: optionElement.style,
                propName: 'opacity',
                duration: 0.465,
                ease: Power4.easeIn,
                start: { probability: 1, normalValue: 0 },
                end: { probability: 0, normalValue: 1 }
            }), `flickerOptions+=${index * 0.1}`);
        });
        tl.addLabel('enterOptions', '+=0');
        optionElements.forEach((optionElement, index) => {
            tl.add(optionElement.enter(), `enterOptions+=${index * 0.1}`);
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        const optionElements = Array.from(this.shadowRoot.querySelectorAll('gdq-break-bid-many-option'));
        tl.addLabel('flickerOptions', '+=0');
        optionElements.slice(0).reverse().forEach((optionElement, index) => {
            tl.add(createMaybeRandomTween({
                target: optionElement.style,
                propName: 'opacity',
                duration: 0.2,
                ease: Power4.easeIn,
                start: { probability: 1, normalValue: 1 },
                end: { probability: 0, normalValue: 0 }
            }), `flickerOptions+=${index * 0.1}`);
        });
        return tl;
    }
    _calcOptions(bid) {
        if (!bid) {
            return [];
        }
        return bid.options.slice(0, 5);
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakBidManyElement.prototype, "bid", void 0);
GDQBreakBidManyElement = tslib_1.__decorate([
    customElement('gdq-break-bid-many')
], GDQBreakBidManyElement);
export default GDQBreakBidManyElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZC1tYW55LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWJyZWFrLWJpZC1tYW55LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUxQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUkzRSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsc0JBQXNCLEdBQTNDLE1BQXFCLHNCQUF1QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBSWxFLEtBQUs7UUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQWtDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFcEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixNQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUMsQ0FBbUMsQ0FBQztRQUVwSSxFQUFFLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDL0MsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7Z0JBQzdCLE1BQU0sRUFBRSxhQUFhLENBQUMsS0FBSztnQkFDM0IsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLFFBQVEsRUFBRSxLQUFLO2dCQUNmLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTTtnQkFDbkIsS0FBSyxFQUFFLEVBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFDO2dCQUN2QyxHQUFHLEVBQUUsRUFBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUM7YUFDckMsQ0FBQyxFQUFFLG1CQUFtQixLQUFLLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25DLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDL0MsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsaUJBQWlCLEtBQUssR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsSUFBSTtRQUNILE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVyxDQUFDLGdCQUFnQixDQUFDLDJCQUEyQixDQUFDLENBQW1DLENBQUM7UUFFcEksRUFBRSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNsRSxFQUFFLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2dCQUM3QixNQUFNLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQzNCLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUUsR0FBRztnQkFDYixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07Z0JBQ25CLEtBQUssRUFBRSxFQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBQztnQkFDdkMsR0FBRyxFQUFFLEVBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFDO2FBQ3JDLENBQUMsRUFBRSxtQkFBbUIsS0FBSyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBYztRQUMxQixJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ1QsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUVELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRCxDQUFBO0FBeERBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21EQUNWO0FBRkssc0JBQXNCO0lBRDFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztHQUNmLHNCQUFzQixDQTBEMUM7ZUExRG9CLHNCQUFzQiJ9