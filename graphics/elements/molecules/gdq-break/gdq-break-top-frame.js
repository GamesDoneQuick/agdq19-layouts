import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQBreakTopFrameElement = class GDQBreakTopFrameElement extends Polymer.Element {
    ready() {
        super.ready();
        const totalTextAmountElem = this.$.totalTextAmount;
        totalTextAmountElem.displayValueTransform = this._totalDisplayValueTransform.bind(this);
        nodecg.readReplicant('total', (totalVal) => {
            totalTextAmountElem.value = totalVal.raw;
            nodecg.listenFor('donation', this._handleDonation.bind(this));
        });
        nodecg.listenFor('total:manuallyUpdated', (totalVal) => {
            totalTextAmountElem.value = totalVal.raw;
        });
    }
    addDonationAlert(formattedAmount, rawAmount) {
        let backgroundColor = 'white';
        if (rawAmount >= 500) {
            backgroundColor = '#FF68B9';
        }
        else if (rawAmount >= 100) {
            backgroundColor = '#FFFBBD';
        }
        else if (rawAmount >= 20) {
            backgroundColor = '#00ffff';
        }
        this.$.donationAlerts.addAlert({
            text: formattedAmount,
            backgroundColor,
            holdDuration: rawAmount >= 500 ? 1 : 0.067
        });
    }
    _handleDonation({ amount, rawAmount, rawNewTotal }) {
        this.addDonationAlert(amount, rawAmount);
        this.$.totalTextAmount.value = rawNewTotal;
    }
    _totalDisplayValueTransform(displayValue) {
        return displayValue.toLocaleString('en-US', {
            maximumFractionDigits: 0
        }).replace(/1/ig, '\u00C0');
    }
};
GDQBreakTopFrameElement = tslib_1.__decorate([
    customElement('gdq-break-top-frame')
], GDQBreakTopFrameElement);
export default GDQBreakTopFrameElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXRvcC1mcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay10b3AtZnJhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDOzs7R0FHRztBQUVILElBQXFCLHVCQUF1QixHQUE1QyxNQUFxQix1QkFBd0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUNuRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGVBQTRDLENBQUM7UUFDaEYsbUJBQW1CLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV4RixNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQWUsRUFBRSxFQUFFO1lBQ2pELG1CQUFtQixDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ3pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLHVCQUF1QixFQUFFLENBQUMsUUFBZSxFQUFFLEVBQUU7WUFDN0QsbUJBQW1CLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCLENBQUMsZUFBdUIsRUFBRSxTQUFpQjtRQUMxRCxJQUFJLGVBQWUsR0FBRyxPQUFPLENBQUM7UUFDOUIsSUFBSSxTQUFTLElBQUksR0FBRyxFQUFFO1lBQ3JCLGVBQWUsR0FBRyxTQUFTLENBQUM7U0FDNUI7YUFBTSxJQUFJLFNBQVMsSUFBSSxHQUFHLEVBQUU7WUFDNUIsZUFBZSxHQUFHLFNBQVMsQ0FBQztTQUM1QjthQUFNLElBQUksU0FBUyxJQUFJLEVBQUUsRUFBRTtZQUMzQixlQUFlLEdBQUcsU0FBUyxDQUFDO1NBQzVCO1FBRUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUF3QyxDQUFDLFFBQVEsQ0FBQztZQUN6RCxJQUFJLEVBQUUsZUFBZTtZQUNyQixlQUFlO1lBQ2YsWUFBWSxFQUFFLFNBQVMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztTQUMxQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZSxDQUNkLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQTZEO1FBRTVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxlQUE2QyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7SUFDM0UsQ0FBQztJQUVELDJCQUEyQixDQUFDLFlBQW9CO1FBQy9DLE9BQU8sWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUU7WUFDM0MscUJBQXFCLEVBQUUsQ0FBQztTQUN4QixDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQ0QsQ0FBQTtBQTdDb0IsdUJBQXVCO0lBRDNDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztHQUNoQix1QkFBdUIsQ0E2QzNDO2VBN0NvQix1QkFBdUIifQ==