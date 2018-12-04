import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let GDQTotalsTotalElement = class GDQTotalsTotalElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.value = '?';
    }
    edit() {
        this.dispatchEvent(new CustomEvent('edit', { bubbles: true, composed: true }));
    }
    equal(a, b) {
        return a === b;
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQTotalsTotalElement.prototype, "value", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTotalsTotalElement.prototype, "currency", void 0);
GDQTotalsTotalElement = tslib_1.__decorate([
    customElement('gdq-totals-total')
], GDQTotalsTotalElement);
export default GDQTotalsTotalElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRvdGFscy10b3RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10b3RhbHMtdG90YWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixxQkFBcUIsR0FBMUMsTUFBcUIscUJBQXNCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFEbEU7O1FBR0MsVUFBSyxHQUFHLEdBQUcsQ0FBQztJQVliLENBQUM7SUFQQSxJQUFJO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELEtBQUssQ0FBQyxDQUFNLEVBQUUsQ0FBTTtRQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEIsQ0FBQztDQUNELENBQUE7QUFaQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztvREFDYjtBQUdaO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3VEQUNSO0FBTEcscUJBQXFCO0lBRHpDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQztHQUNiLHFCQUFxQixDQWN6QztlQWRvQixxQkFBcUIifQ==