import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let UiToastElement = class UiToastElement extends Polymer.Element {
    showSuccessToast(text) {
        this._successToastText = text;
        this.$.successToast.show();
    }
    showErrorToast(text) {
        this._errorToastText = text;
        this.$.errorToast.show();
    }
};
tslib_1.__decorate([
    property({ type: String })
], UiToastElement.prototype, "_successToastText", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiToastElement.prototype, "_errorToastText", void 0);
UiToastElement = tslib_1.__decorate([
    customElement('ui-toast')
], UiToastElement);
export default UiToastElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS10b2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTzFELGdCQUFnQixDQUFDLElBQVk7UUFDNUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQWtDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVELGNBQWMsQ0FBQyxJQUFZO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBZ0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0NBQ0QsQ0FBQTtBQWRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3lEQUNDO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3VEQUNEO0FBTEosY0FBYztJQURsQyxhQUFhLENBQUMsVUFBVSxDQUFDO0dBQ0wsY0FBYyxDQWdCbEM7ZUFoQm9CLGNBQWMifQ==