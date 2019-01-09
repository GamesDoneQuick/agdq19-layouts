import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashProducerElement = class DashProducerElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.selectedContentTab = 0;
        this.selectedBidsAndPrizesTab = 0;
        this.volunteerScheduleURL = nodecg.bundleConfig.volunteerScheduleURL;
        this.volunteerEvaluationsURL = nodecg.bundleConfig.volunteerEvaluationsURL;
        this.techNotesURL = nodecg.bundleConfig.techNotesURL;
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
tslib_1.__decorate([
    property({ type: String })
], DashProducerElement.prototype, "techNotesURL", void 0);
DashProducerElement = tslib_1.__decorate([
    customElement('dash-producer')
], DashProducerElement);
export default DashProducerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1wcm9kdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtcHJvZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBRHJGOztRQU1DLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUd2Qiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7UUFHN0IseUJBQW9CLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxvQkFBb0IsQ0FBQztRQUdoRSw0QkFBdUIsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLHVCQUF1QixDQUFDO1FBR3RFLGlCQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7SUFhakQsQ0FBQztJQVhBLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxpQkFBaUI7UUFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0QsQ0FBQTtBQTVCQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3REFDTDtBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsrREFDRjtBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztxRUFDSTtBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztpRUFDdUM7QUFHaEU7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7b0VBQzZDO0FBR3RFO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3lEQUN1QjtBQWpCNUIsbUJBQW1CO0lBRHZDLGFBQWEsQ0FBQyxlQUFlLENBQUM7R0FDVixtQkFBbUIsQ0E4QnZDO2VBOUJvQixtQkFBbUIifQ==