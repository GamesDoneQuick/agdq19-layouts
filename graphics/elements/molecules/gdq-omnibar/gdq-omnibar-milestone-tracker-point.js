import * as tslib_1 from "tslib";
var GDQOmnibarMilestoneTrackerPointElement_1;
const { customElement, property } = Polymer.decorators;
const ONE_MILLION = 1000000;
let GDQOmnibarMilestoneTrackerPointElement = GDQOmnibarMilestoneTrackerPointElement_1 = class GDQOmnibarMilestoneTrackerPointElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.align = 'left';
        this.dropTrailingZeroes = false;
    }
    _alignChanged(newVal) {
        const bodyElem = this.$.body;
        if (newVal !== 'center') {
            bodyElem.style.left = '';
        }
        const bodyRect = this.$.body.getBoundingClientRect();
        bodyElem.style.left = `${(bodyRect.width / -2) + 1.5}px`;
    }
    _calcDisplayAmount(amount) {
        return `$${this._formatAmount(amount / ONE_MILLION)}M`;
    }
    _formatAmount(amount) {
        let amountString = String(amount).substr(0, 4);
        if (this.dropTrailingZeroes) {
            while ((amountString.endsWith('0') || amountString.endsWith('.')) &&
                amountString.length > 1) {
                amountString = amountString.slice(0, -1);
            }
        }
        // Use the monospace version of the "1" character in the gdqpixel font.
        return amountString.replace(/1/ig, '\u00C0');
    }
};
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, observer: GDQOmnibarMilestoneTrackerPointElement_1.prototype._alignChanged })
], GDQOmnibarMilestoneTrackerPointElement.prototype, "align", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQOmnibarMilestoneTrackerPointElement.prototype, "amount", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQOmnibarMilestoneTrackerPointElement.prototype, "dropTrailingZeroes", void 0);
GDQOmnibarMilestoneTrackerPointElement = GDQOmnibarMilestoneTrackerPointElement_1 = tslib_1.__decorate([
    customElement('gdq-omnibar-milestone-tracker-point')
], GDQOmnibarMilestoneTrackerPointElement);
export default GDQOmnibarMilestoneTrackerPointElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbWlsZXN0b25lLXRyYWNrZXItcG9pbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci1taWxlc3RvbmUtdHJhY2tlci1wb2ludC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUM7QUFJNUIsSUFBcUIsc0NBQXNDLDhDQUEzRCxNQUFxQixzQ0FBdUMsU0FBUSxPQUFPLENBQUMsT0FBTztJQURuRjs7UUFHQyxVQUFLLEdBQWMsTUFBTSxDQUFDO1FBTTFCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztJQStCNUIsQ0FBQztJQTdCQSxhQUFhLENBQUMsTUFBaUI7UUFDOUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFzQixDQUFDO1FBQy9DLElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUN4QixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7U0FDekI7UUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3JELFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDMUQsQ0FBQztJQUVELGtCQUFrQixDQUFDLE1BQWM7UUFDaEMsT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFDeEQsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFjO1FBQzNCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLE9BQ0MsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzFELFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUNyQjtnQkFDRixZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN6QztTQUNEO1FBRUQsdUVBQXVFO1FBQ3ZFLE9BQU8sWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNELENBQUE7QUFyQ0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsd0NBQXNDLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBQyxDQUFDO3FFQUNuRztBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztzRUFDVjtBQUdmO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO2tGQUNDO0FBUlAsc0NBQXNDO0lBRDFELGFBQWEsQ0FBQyxxQ0FBcUMsQ0FBQztHQUNoQyxzQ0FBc0MsQ0F1QzFEO2VBdkNvQixzQ0FBc0MifQ==