import * as tslib_1 from "tslib";
const { customElement, property, observe } = Polymer.decorators;
let TimeInputElement = class TimeInputElement extends Polymer.mixinBehaviors([Polymer.IronValidatableBehavior], Polymer.Element) {
    constructor() {
        super(...arguments);
        this.invalid = false;
        this.validator = 'time-validator';
    }
    _computeValue(minutes, seconds) {
        this.value = `${minutes}:${seconds}`;
    }
    setMS(m, s) {
        this._minutes = m < 10 ? `0${m}` : m;
        this._seconds = s < 10 ? `0${s}` : s;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], TimeInputElement.prototype, "invalid", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], TimeInputElement.prototype, "value", void 0);
tslib_1.__decorate([
    property({ type: Number })
], TimeInputElement.prototype, "_minutes", void 0);
tslib_1.__decorate([
    property({ type: Number })
], TimeInputElement.prototype, "_seconds", void 0);
tslib_1.__decorate([
    property({ type: String })
], TimeInputElement.prototype, "validator", void 0);
tslib_1.__decorate([
    observe('_minutes', '_seconds')
], TimeInputElement.prototype, "_computeValue", null);
TimeInputElement = tslib_1.__decorate([
    customElement('time-input')
], TimeInputElement);
export default TimeInputElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRpbWUtaW5wdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHOUQsSUFBcUIsZ0JBQWdCLEdBQXJDLE1BQXFCLGdCQUFpQixTQUFRLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDO0lBRHhIOztRQUdDLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFZaEIsY0FBUyxHQUFHLGdCQUFnQixDQUFDO0lBVzlCLENBQUM7SUFSQSxhQUFhLENBQUMsT0FBZSxFQUFFLE9BQWU7UUFDN0MsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLE9BQU8sSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0lBRUQsS0FBSyxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7Q0FDRCxDQUFBO0FBdkJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQztpREFDcEM7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzsrQ0FDekI7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztrREFDQztBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztrREFDQztBQUcxQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzttREFDSTtBQUc3QjtJQURDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDO3FEQUcvQjtBQW5CbUIsZ0JBQWdCO0lBRHBDLGFBQWEsQ0FBQyxZQUFZLENBQUM7R0FDUCxnQkFBZ0IsQ0F5QnBDO2VBekJvQixnQkFBZ0IifQ==