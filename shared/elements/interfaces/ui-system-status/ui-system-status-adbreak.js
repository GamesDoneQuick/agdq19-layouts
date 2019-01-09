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
            const state = this._currentIntermission.content[0].state;
            const cantStartReason = state.cantStartReason;
            if (cantStartReason) {
                statusSpan.style.color = 'var(--obs-system-status-error-color)';
                return cantStartReason;
            }
            statusSpan.style.color = 'var(--obs-system-status-nominal-color)';
            if (state.completed) {
                return 'COMPLETED';
            }
            if (state.started) {
                return 'PLAYING';
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc3lzdGVtLXN0YXR1cy1hZGJyZWFrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktc3lzdGVtLXN0YXR1cy1hZGJyZWFrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUEwQjs7QUFLMUIsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLDJCQUEyQixHQUFoRCxNQUFxQiwyQkFBNEIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFPNUYsY0FBYztRQUNiLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBeUIsQ0FBQztRQUNwRCxJQUFJLElBQUksQ0FBQyxvQkFBb0I7WUFDNUIsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU87WUFDakMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3pELE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFhLENBQUMsS0FBSyxDQUFDO1lBQ3RFLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxlQUFlLENBQUM7WUFDOUMsSUFBSSxlQUFlLEVBQUU7Z0JBQ3BCLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLHNDQUFzQyxDQUFDO2dCQUNoRSxPQUFPLGVBQWUsQ0FBQzthQUN2QjtZQUVELFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLHdDQUF3QyxDQUFDO1lBQ2xFLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDcEIsT0FBTyxXQUFXLENBQUM7YUFDbkI7WUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLE9BQU8sU0FBUyxDQUFDO2FBQ2pCO1lBRUQsT0FBTyxPQUFPLENBQUM7U0FDZjtRQUVELFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLHdDQUF3QyxDQUFDO1FBQ2xFLE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztDQUNELENBQUE7QUFqQ0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxzQ0FBc0MsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzsyREFDdEY7QUFHZjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt5RUFDMkI7QUFMaEMsMkJBQTJCO0lBRC9DLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztHQUNyQiwyQkFBMkIsQ0FtQy9DO2VBbkNvQiwyQkFBMkIifQ==