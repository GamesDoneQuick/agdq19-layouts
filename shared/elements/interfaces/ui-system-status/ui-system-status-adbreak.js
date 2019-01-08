/// <reference lib="dom"/>
import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let UiSystemStatusCasparElement = class UiSystemStatusCasparElement extends Polymer.MutableData(Polymer.Element) {
    _computeStatus() {
        const statusSpan = this.$.status;
        if (this._currentIntermission &&
            this._currentIntermission.content &&
            this._currentIntermission.content[0] &&
            this._currentIntermission.content[0].type === 'adBreak') {
            const cantStartReason = this._currentIntermission.content[0].state.cantStartReason;
            if (cantStartReason) {
                statusSpan.style.color = 'var(--obs-system-status-error-color)';
                return cantStartReason;
            }
            statusSpan.style.color = 'var(--obs-system-status-nominal-color)';
            return 'READY';
        }
        statusSpan.style.color = 'var(--obs-system-status-nominal-color)';
        return 'NONE';
    }
};
tslib_1.__decorate([
    property({ type: String, computed: '_computeStatus(_currentIntermission)', reflectToAttribute: true })
], UiSystemStatusCasparElement.prototype, "status", void 0);
tslib_1.__decorate([
    property({ type: Object })
], UiSystemStatusCasparElement.prototype, "_currentIntermission", void 0);
UiSystemStatusCasparElement = tslib_1.__decorate([
    customElement('ui-system-status-adbreak')
], UiSystemStatusCasparElement);
export default UiSystemStatusCasparElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc3lzdGVtLXN0YXR1cy1hZGJyZWFrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktc3lzdGVtLXN0YXR1cy1hZGJyZWFrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUEwQjs7QUFLMUIsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLDJCQUEyQixHQUFoRCxNQUFxQiwyQkFBNEIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFPNUYsY0FBYztRQUNiLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBeUIsQ0FBQztRQUNwRCxJQUFJLElBQUksQ0FBQyxvQkFBb0I7WUFDNUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU87WUFDakMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3pELE1BQU0sZUFBZSxHQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztZQUNoRyxJQUFJLGVBQWUsRUFBRTtnQkFDcEIsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsc0NBQXNDLENBQUM7Z0JBQ2hFLE9BQU8sZUFBZSxDQUFDO2FBQ3ZCO1lBRUQsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsd0NBQXdDLENBQUM7WUFDbEUsT0FBTyxPQUFPLENBQUM7U0FDZjtRQUVELFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLHdDQUF3QyxDQUFDO1FBQ2xFLE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztDQUNELENBQUE7QUF4QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxzQ0FBc0MsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzsyREFDdEY7QUFHZjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt5RUFDMkI7QUFMaEMsMkJBQTJCO0lBRC9DLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztHQUNyQiwyQkFBMkIsQ0EwQi9DO2VBMUJvQiwyQkFBMkIifQ==