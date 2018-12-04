import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashHostElement = class DashHostElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
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
], DashHostElement.prototype, "currentTime", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashHostElement.prototype, "selectedBidsAndPrizesTab", void 0);
DashHostElement = tslib_1.__decorate([
    customElement('dash-host')
], DashHostElement);
export default DashHostElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHckQsSUFBcUIsZUFBZSxHQUFwQyxNQUFxQixlQUFnQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQURqRjs7UUFNQyw2QkFBd0IsR0FBRyxDQUFDLENBQUM7SUFhOUIsQ0FBQztJQVhBLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxpQkFBaUI7UUFDaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0QsQ0FBQTtBQWhCQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztvREFDTDtBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztpRUFDSTtBQUxULGVBQWU7SUFEbkMsYUFBYSxDQUFDLFdBQVcsQ0FBQztHQUNOLGVBQWUsQ0FrQm5DO2VBbEJvQixlQUFlIn0=