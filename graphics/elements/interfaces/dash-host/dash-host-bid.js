import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashHostBidElement = class DashHostBidElement extends Polymer.MutableData(Polymer.Element) {
    computeFailed(closed, bid) {
        return closed && bid.rawTotal < bid.rawGoal;
    }
    computeClosed(bid) {
        return bid.state.toLowerCase() === 'closed';
    }
    bidIsChallenge(bid) {
        return bid.type === 'challenge';
    }
    limitOptions(options) {
        if (!options) {
            return [];
        }
        return options.slice(0, 3);
    }
    bidHasMoreThanThreeOptions(bid) {
        if (!bid.options) {
            return false;
        }
        return bid.options.length > 3;
    }
    calcNumAdditionalOptions(bid) {
        if (!bid.options) {
            return 0;
        }
        return bid.options.length - 3;
    }
    calcBidName(description) {
        return description.replace(/\\n/g, ' ');
    }
    _computeType(bid) {
        return bid ? bid.type : '';
    }
};
tslib_1.__decorate([
    property({
        type: String,
        reflectToAttribute: true,
        computed: '_computeType(bid)'
    })
], DashHostBidElement.prototype, "type", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashHostBidElement.prototype, "bid", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        computed: 'computeFailed(closed, bid)',
        reflectToAttribute: true
    })
], DashHostBidElement.prototype, "failed", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        computed: 'computeClosed(bid)',
        reflectToAttribute: true
    })
], DashHostBidElement.prototype, "closed", void 0);
DashHostBidElement = tslib_1.__decorate([
    customElement('dash-host-bid')
], DashHostBidElement);
export default DashHostBidElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWJpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaG9zdC1iaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBeUJuRixhQUFhLENBQUMsTUFBZSxFQUFFLEdBQWM7UUFDNUMsT0FBTyxNQUFNLElBQUksR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQzdDLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBYztRQUMzQixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxDQUFDO0lBQzdDLENBQUM7SUFFRCxjQUFjLENBQUMsR0FBYztRQUM1QixPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxZQUFZLENBQUMsT0FBbUI7UUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNiLE9BQU8sRUFBRSxDQUFDO1NBQ1Y7UUFFRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxHQUFjO1FBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFFRCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsd0JBQXdCLENBQUMsR0FBYztRQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLENBQUMsQ0FBQztTQUNUO1FBRUQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxXQUFtQjtRQUM5QixPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxZQUFZLENBQUMsR0FBYztRQUMxQixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzVCLENBQUM7Q0FDRCxDQUFBO0FBOURBO0lBTEMsUUFBUSxDQUFDO1FBQ1QsSUFBSSxFQUFFLE1BQU07UUFDWixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFFBQVEsRUFBRSxtQkFBbUI7S0FDN0IsQ0FBQztnREFDVztBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOytDQUNWO0FBT2Y7SUFMQyxRQUFRLENBQUM7UUFDVCxJQUFJLEVBQUUsT0FBTztRQUNiLFFBQVEsRUFBRSw0QkFBNEI7UUFDdEMsa0JBQWtCLEVBQUUsSUFBSTtLQUN4QixDQUFDO2tEQUNjO0FBT2hCO0lBTEMsUUFBUSxDQUFDO1FBQ1QsSUFBSSxFQUFFLE9BQU87UUFDYixRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLGtCQUFrQixFQUFFLElBQUk7S0FDeEIsQ0FBQztrREFDYztBQXZCSSxrQkFBa0I7SUFEdEMsYUFBYSxDQUFDLGVBQWUsQ0FBQztHQUNWLGtCQUFrQixDQW9FdEM7ZUFwRW9CLGtCQUFrQiJ9