import * as tslib_1 from "tslib";
var DashInterviewMonitorTweetElement_1;
const { customElement, property } = Polymer.decorators;
let DashInterviewMonitorTweetElement = DashInterviewMonitorTweetElement_1 = class DashInterviewMonitorTweetElement extends Polymer.Element {
    populateBody() {
        if (!this.tweet) {
            return;
        }
        this.$.body.innerHTML = this.tweet.text;
    }
};
tslib_1.__decorate([
    property({ type: Object, observer: DashInterviewMonitorTweetElement_1.prototype.populateBody })
], DashInterviewMonitorTweetElement.prototype, "tweet", void 0);
DashInterviewMonitorTweetElement = DashInterviewMonitorTweetElement_1 = tslib_1.__decorate([
    customElement('dash-interview-monitor-tweet')
], DashInterviewMonitorTweetElement);
export default DashInterviewMonitorTweetElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbW9uaXRvci10d2VldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW50ZXJ2aWV3LW1vbml0b3ItdHdlZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHckQsSUFBcUIsZ0NBQWdDLHdDQUFyRCxNQUFxQixnQ0FBaUMsU0FBUSxPQUFPLENBQUMsT0FBTztJQUk1RSxZQUFZO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTztTQUNQO1FBRUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0lBQ3pDLENBQUM7Q0FDRCxDQUFBO0FBVEE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxrQ0FBZ0MsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFDLENBQUM7K0RBQy9FO0FBRk8sZ0NBQWdDO0lBRHBELGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQztHQUN6QixnQ0FBZ0MsQ0FXcEQ7ZUFYb0IsZ0NBQWdDIn0=