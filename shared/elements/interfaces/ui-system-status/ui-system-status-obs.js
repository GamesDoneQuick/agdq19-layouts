import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const cyclingRecordingsRep = nodecg.Replicant('obs:cyclingRecordings');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let UiSystemStatusObsElement = class UiSystemStatusObsElement extends Polymer.MutableData(Polymer.Element) {
    static get observers() {
        return [
            '_updateStatus(_websocket.status, _cyclingRecordings)'
        ];
    }
    ready() {
        super.ready();
        cyclingRecordingsRep.on('change', newVal => {
            this._cyclingRecordings = newVal;
        });
    }
    _transformsNamespace(namespace) {
        return namespace.slice(0, -3);
    }
    _updateStatus(websocketStatus, cyclingRecordings) {
        this.status = this._calcStatus(websocketStatus, cyclingRecordings);
    }
    _calcStatus(websocketStatus, cyclingRecordings) {
        if (websocketStatus === 'connected') {
            return cyclingRecordings ? 'cycling' : websocketStatus;
        }
        return websocketStatus;
    }
};
tslib_1.__decorate([
    property({ type: String })
], UiSystemStatusObsElement.prototype, "namespace", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], UiSystemStatusObsElement.prototype, "status", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiSystemStatusObsElement.prototype, "label", void 0);
UiSystemStatusObsElement = tslib_1.__decorate([
    customElement('ui-system-status-obs')
], UiSystemStatusObsElement);
export default UiSystemStatusObsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc3lzdGVtLXN0YXR1cy1vYnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS1zeXN0ZW0tc3RhdHVzLW9icy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBeUIsdUJBQXVCLENBQUMsQ0FBQztBQUUvRjs7OztHQUlHO0FBRUgsSUFBcUIsd0JBQXdCLEdBQTdDLE1BQXFCLHdCQUF5QixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQWF6RixNQUFNLEtBQUssU0FBUztRQUNuQixPQUFPO1lBQ04sc0RBQXNEO1NBQ3RELENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxTQUFpQjtRQUNyQyxPQUFPLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGFBQWEsQ0FBQyxlQUFrQyxFQUFFLGlCQUEwQjtRQUMzRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFFLGlCQUFpQixDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxlQUFrQyxFQUFFLGlCQUEwQjtRQUN6RSxJQUFJLGVBQWUsS0FBSyxXQUFXLEVBQUU7WUFDcEMsT0FBTyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7U0FDdkQ7UUFFRCxPQUFPLGVBQWUsQ0FBQztJQUN4QixDQUFDO0NBQ0QsQ0FBQTtBQXZDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsyREFDUDtBQUdsQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7d0RBQ3BDO0FBR2Y7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7dURBQ1g7QUFSTSx3QkFBd0I7SUFENUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0dBQ2pCLHdCQUF3QixDQXlDNUM7ZUF6Q29CLHdCQUF3QiJ9