import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashProducerElement = class DashProducerElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.selectedContentTab = 0;
        this.selectedBidsAndPrizesTab = 0;
        this.volunteerScheduleURL = nodecg.bundleConfig.volunteerScheduleURL;
        this.volunteerEvaluationsURL = nodecg.bundleConfig.volunteerEvaluationsURL;
    }
    connectedCallback() {
        super.connectedCallback();
        this.updateCurrentTime = this.updateCurrentTime.bind(this);
        this.updateCurrentTime();
        setInterval(this.updateCurrentTime, 1000);
    }
    updateCurrentTime() {
        const date = new Date();
        this.currentTime = date.toLocaleTimeString('en-US', { hour12: true });
    }
};
tslib_1.__decorate([
    property({ type: String })
], DashProducerElement.prototype, "currentTime", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashProducerElement.prototype, "selectedContentTab", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashProducerElement.prototype, "selectedBidsAndPrizesTab", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashProducerElement.prototype, "volunteerScheduleURL", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashProducerElement.prototype, "volunteerEvaluationsURL", void 0);
DashProducerElement = tslib_1.__decorate([
    customElement('dash-producer')
], DashProducerElement);
export default DashProducerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1wcm9kdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtcHJvZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBRHJGOztRQU1DLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUd2Qiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFHN0IseUJBQW9CLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztRQUdoRSw0QkFBdUIsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDO0lBYXZFLENBQUM7SUFYQSxpQkFBaUI7UUFDaEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2hCLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7SUFDckUsQ0FBQztDQUNELENBQUE7QUF6QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7d0RBQ0w7QUFHcEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7K0RBQ0Y7QUFHdkI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7cUVBQ0k7QUFHN0I7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7aUVBQ3VDO0FBR2hFO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO29FQUM2QztBQWRsRCxtQkFBbUI7SUFEdkMsYUFBYSxDQUFDLGVBQWUsQ0FBQztHQUNWLG1CQUFtQixDQTJCdkM7ZUEzQm9CLG1CQUFtQiJ9