import * as tslib_1 from "tslib";
import { Sine, TimelineLite } from 'gsap';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarListItemElement = class GDQOmnibarListItemElement extends Polymer.Element {
    ready() {
        super.ready();
        this._$borderBodies = this.shadowRoot.querySelectorAll('.border-body');
        this._$leftBorderCaps = this.shadowRoot.querySelectorAll('.border-cap:first-child');
        this._$rightBorderCaps = this.shadowRoot.querySelectorAll('.border-cap:last-child');
    }
    enter() {
        const enterTL = new TimelineLite();
        enterTL.fromTo(this, 0.234, {
            x: 20,
            opacity: 0
        }, {
            x: 0,
            opacity: 1,
            ease: Sine.easeOut
        });
        return enterTL;
    }
    exit() {
        const exitTL = new TimelineLite();
        exitTL.to(this._$borderBodies, 0.465, {
            scaleX: 0,
            ease: Sine.easeInOut
        }, 0);
        exitTL.to(this._$rightBorderCaps, 0.465, {
            x: -this.clientWidth + 2,
            ease: Sine.easeInOut
        }, 0);
        exitTL.add(createMaybeRandomTween({
            target: this.$.text.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 0 },
            end: { probability: 0, normalValue: 0 }
        }), 0);
        exitTL.to([this._$leftBorderCaps, this._$rightBorderCaps], 0.165, {
            scaleX: 0,
            ease: Sine.easeInOut
        });
        return exitTL;
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQOmnibarListItemElement.prototype, "firstLine", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQOmnibarListItemElement.prototype, "secondLine", void 0);
GDQOmnibarListItemElement = tslib_1.__decorate([
    customElement('gdq-omnibar-list-item')
], GDQOmnibarListItemElement);
export default GDQOmnibarListItemElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbGlzdC1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW9tbmliYXItbGlzdC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN4QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUUzRSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBV3JFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFRCxLQUFLO1FBQ0osTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDM0IsQ0FBQyxFQUFFLEVBQUU7WUFDTCxPQUFPLEVBQUUsQ0FBQztTQUNWLEVBQUU7WUFDRixDQUFDLEVBQUUsQ0FBQztZQUNKLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ2xCLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFO1lBQ3JDLE1BQU0sRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLEVBQUU7WUFDeEMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDO1lBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNwQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztZQUNqQyxNQUFNLEVBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUF1QixDQUFDLEtBQUs7WUFDN0MsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsRUFBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUM7WUFDdkMsR0FBRyxFQUFFLEVBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFDO1NBQ3JDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVQLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsS0FBSyxFQUFFO1lBQ2pFLE1BQU0sRUFBRSxDQUFDO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztDQUNELENBQUE7QUEzREE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7NERBQ1A7QUFHbEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7NkRBQ047QUFMQyx5QkFBeUI7SUFEN0MsYUFBYSxDQUFDLHVCQUF1QixDQUFDO0dBQ2xCLHlCQUF5QixDQTZEN0M7ZUE3RG9CLHlCQUF5QiJ9