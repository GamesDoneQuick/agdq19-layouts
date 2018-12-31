import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashLowerthirdNameInputElement = class DashLowerthirdNameInputElement extends Polymer.Element {
    ready() {
        super.ready();
        const nameElem = this.$.name;
        nameElem.$.input.style.fontSize = '24px';
        nameElem.$.toggleIcon.style.height = '100%';
        nameElem.$.toggleIcon.style.padding = '0';
        nameElem.$.clearIcon.style.height = '100%';
        nameElem.$.clearIcon.style.padding = '0';
    }
    clear() {
        const nameElem = this.$.name;
        nameElem.value = '';
        nameElem.value = '';
    }
};
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashLowerthirdNameInputElement.prototype, "selectedItem", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashLowerthirdNameInputElement.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashLowerthirdNameInputElement.prototype, "title", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashLowerthirdNameInputElement.prototype, "disabled", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashLowerthirdNameInputElement.prototype, "items", void 0);
DashLowerthirdNameInputElement = tslib_1.__decorate([
    customElement('dash-lowerthird-name-input')
], DashLowerthirdNameInputElement);
export default DashLowerthirdNameInputElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1sb3dlcnRoaXJkLW5hbWUtaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWxvd2VydGhpcmQtbmFtZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBR3JELElBQXFCLDhCQUE4QixHQUFuRCxNQUFxQiw4QkFBK0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQWdCMUUsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBVyxDQUFDO1FBQ3BDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzVDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQzNDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQzFDLENBQUM7SUFFRCxLQUFLO1FBQ0osTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFXLENBQUM7UUFDcEMsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDcEIsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUNELENBQUE7QUE3QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztvRUFDbEI7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzs0REFDMUI7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOzZEQUN6QjtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO2dFQUNSO0FBR2xCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDOzZEQUNSO0FBZEksOEJBQThCO0lBRGxELGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQztHQUN2Qiw4QkFBOEIsQ0ErQmxEO2VBL0JvQiw4QkFBOEIifQ==