import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let DashHostBidOptionElement = class DashHostBidOptionElement extends Polymer.Element {
    calcOptionMeterFillStyle(bid, option) {
        if (!bid || !option || !bid.options || bid.options.length <= 0) {
            return '';
        }
        let percent = option.rawTotal / bid.options[0].rawTotal;
        percent = Math.max(percent, 0); // Clamp to min 0
        percent = Math.min(percent, 1); // Clamp to max 1
        if (Number.isNaN(percent)) {
            percent = 0;
        }
        return `transform: scaleX(${percent});`;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], DashHostBidOptionElement.prototype, "bid", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashHostBidOptionElement.prototype, "option", void 0);
tslib_1.__decorate([
    property({ type: Number, reflectToAttribute: true })
], DashHostBidOptionElement.prototype, "index", void 0);
DashHostBidOptionElement = tslib_1.__decorate([
    customElement('dash-host-bid-option')
], DashHostBidOptionElement);
export default DashHostBidOptionElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWJpZC1vcHRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtYmlkLW9wdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLHdCQUF3QixHQUE3QyxNQUFxQix3QkFBeUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQVVwRSx3QkFBd0IsQ0FBQyxHQUFjLEVBQUUsTUFBZ0I7UUFDeEQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQy9ELE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFFRCxJQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ3hELE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQjtRQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUI7UUFDakQsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFCLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FDWjtRQUNELE9BQU8scUJBQXFCLE9BQU8sSUFBSSxDQUFDO0lBQ3pDLENBQUM7Q0FDRCxDQUFBO0FBckJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FEQUNWO0FBR2Y7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7d0RBQ1I7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDO3VEQUNyQztBQVJNLHdCQUF3QjtJQUQ1QyxhQUFhLENBQUMsc0JBQXNCLENBQUM7R0FDakIsd0JBQXdCLENBdUI1QztlQXZCb0Isd0JBQXdCIn0=