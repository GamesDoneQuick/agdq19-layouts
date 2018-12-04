import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashProducerElement = class DashProducerElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.selectedContentTab = 0;
        this.selectedBidsAndPrizesTab = 0;
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
DashProducerElement = tslib_1.__decorate([
    customElement('dash-producer')
], DashProducerElement);
export default DashProducerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1wcm9kdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtcHJvZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBRHJGOztRQU1DLHVCQUFrQixHQUFHLENBQUMsQ0FBQztRQUd2Qiw2QkFBd0IsR0FBRyxDQUFDLENBQUM7SUFhOUIsQ0FBQztJQVhBLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxpQkFBaUI7UUFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0QsQ0FBQTtBQW5CQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3REFDTDtBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsrREFDRjtBQUd2QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztxRUFDSTtBQVJULG1CQUFtQjtJQUR2QyxhQUFhLENBQUMsZUFBZSxDQUFDO0dBQ1YsbUJBQW1CLENBcUJ2QztlQXJCb0IsbUJBQW1CIn0=