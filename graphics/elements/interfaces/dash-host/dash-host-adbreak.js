import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashHostAdbreakElement = class DashHostAdbreakElement extends Polymer.MutableData(Polymer.Element) {
    start() {
        this.dispatchEvent(new CustomEvent('start', {
            detail: {
                adBreakId: this.adBreak.id
            },
            bubbles: true,
            composed: true
        }));
    }
    cancel() {
        this.dispatchEvent(new CustomEvent('cancel', {
            detail: {
                adBreakId: this.adBreak.id
            },
            bubbles: true,
            composed: true
        }));
    }
    complete() {
        this.dispatchEvent(new CustomEvent('complete', {
            detail: {
                adBreakId: this.adBreak.id
            },
            bubbles: true,
            composed: true
        }));
    }
    _calcStartButtonText(adBreakState) {
        if (adBreakState.canStart) {
            return 'Start Break';
        }
        if (adBreakState.cantStartReason) {
            return adBreakState.cantStartReason;
        }
        return 'Prerequisites unmet';
    }
    _calcCompleteButtonHidden(adBreak) {
        const lastAd = adBreak.ads[adBreak.ads.length - 1];
        return lastAd.adType.toLowerCase() !== 'image';
    }
    any(...args) {
        return args.find(arg => Boolean(arg));
    }
};
tslib_1.__decorate([
    property({ type: Object })
], DashHostAdbreakElement.prototype, "adBreak", void 0);
DashHostAdbreakElement = tslib_1.__decorate([
    customElement('dash-host-adbreak')
], DashHostAdbreakElement);
export default DashHostAdbreakElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWFkYnJlYWsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtYWRicmVhay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBR3JELElBQXFCLHNCQUFzQixHQUEzQyxNQUFxQixzQkFBdUIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFJdkYsS0FBSztRQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzNDLE1BQU0sRUFBRTtnQkFDUCxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2FBQzFCO1lBQ0QsT0FBTyxFQUFFLElBQUk7WUFDYixRQUFRLEVBQUUsSUFBSTtTQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU07UUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUM1QyxNQUFNLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTthQUMxQjtZQUNELE9BQU8sRUFBRSxJQUFJO1lBQ2IsUUFBUSxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxVQUFVLEVBQUU7WUFDOUMsTUFBTSxFQUFFO2dCQUNQLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7YUFDMUI7WUFDRCxPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxJQUFJO1NBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0JBQW9CLENBQUMsWUFBMEI7UUFDOUMsSUFBSSxZQUFZLENBQUMsUUFBUSxFQUFFO1lBQzFCLE9BQU8sYUFBYSxDQUFDO1NBQ3JCO1FBRUQsSUFBSSxZQUFZLENBQUMsZUFBZSxFQUFFO1lBQ2pDLE9BQU8sWUFBWSxDQUFDLGVBQWUsQ0FBQztTQUNwQztRQUVELE9BQU8scUJBQXFCLENBQUM7SUFDOUIsQ0FBQztJQUVELHlCQUF5QixDQUFDLE9BQWdCO1FBQ3pDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sQ0FBQztJQUNoRCxDQUFDO0lBRUQsR0FBRyxDQUFDLEdBQUcsSUFBVztRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0QsQ0FBQTtBQXBEQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt1REFDUjtBQUZHLHNCQUFzQjtJQUQxQyxhQUFhLENBQUMsbUJBQW1CLENBQUM7R0FDZCxzQkFBc0IsQ0FzRDFDO2VBdERvQixzQkFBc0IifQ==