import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashInterviewLowerthirdRefillOptionElement = class DashInterviewLowerthirdRefillOptionElement extends Polymer.Element {
    accept() {
        this.dispatchEvent(new CustomEvent('accepted', {
            detail: {
                names: this.names
                    .filter(name => name !== '(none)')
                    .map(name => {
                    return { name };
                })
            }
        }));
    }
};
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], DashInterviewLowerthirdRefillOptionElement.prototype, "type", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewLowerthirdRefillOptionElement.prototype, "names", void 0);
DashInterviewLowerthirdRefillOptionElement = tslib_1.__decorate([
    customElement('dash-interview-lowerthird-refill-option')
], DashInterviewLowerthirdRefillOptionElement);
export default DashInterviewLowerthirdRefillOptionElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbG93ZXJ0aGlyZC1yZWZpbGwtb3B0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1pbnRlcnZpZXctbG93ZXJ0aGlyZC1yZWZpbGwtb3B0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHckQsSUFBcUIsMENBQTBDLEdBQS9ELE1BQXFCLDBDQUEyQyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBT3RGLE1BQU07UUFDTCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtZQUM5QyxNQUFNLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3FCQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUM7cUJBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDWCxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDO2FBQ0g7U0FDRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRCxDQUFBO0FBaEJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzt3RUFDdEM7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5RUFDUjtBQUxJLDBDQUEwQztJQUQ5RCxhQUFhLENBQUMseUNBQXlDLENBQUM7R0FDcEMsMENBQTBDLENBa0I5RDtlQWxCb0IsMENBQTBDIn0=