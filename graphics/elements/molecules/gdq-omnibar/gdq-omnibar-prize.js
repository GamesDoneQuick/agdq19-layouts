import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarPrizeElement = class GDQOmnibarPrizeElement extends Polymer.Element {
    enter() {
        return this.$.listItem.enter();
    }
    exit() {
        return this.$.listItem.exit();
    }
    calcBidAmountText(prize) {
        return prize.sumdonations ?
            `${prize.minimumbid} in Total Donations` :
            `${prize.minimumbid} Single Donation`;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQOmnibarPrizeElement.prototype, "prize", void 0);
GDQOmnibarPrizeElement = tslib_1.__decorate([
    customElement('gdq-omnibar-prize')
], GDQOmnibarPrizeElement);
export default GDQOmnibarPrizeElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItcHJpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci1wcml6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLHNCQUFzQixHQUEzQyxNQUFxQixzQkFBdUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUlsRSxLQUFLO1FBQ0osT0FBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQXNDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0QsQ0FBQztJQUVELElBQUk7UUFDSCxPQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBc0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBWTtRQUM3QixPQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixHQUFHLEtBQUssQ0FBQyxVQUFVLHFCQUFxQixDQUFDLENBQUM7WUFDMUMsR0FBRyxLQUFLLENBQUMsVUFBVSxrQkFBa0IsQ0FBQztJQUN4QyxDQUFDO0NBQ0QsQ0FBQTtBQWZBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FEQUNaO0FBRk8sc0JBQXNCO0lBRDFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztHQUNkLHNCQUFzQixDQWlCMUM7ZUFqQm9CLHNCQUFzQiJ9