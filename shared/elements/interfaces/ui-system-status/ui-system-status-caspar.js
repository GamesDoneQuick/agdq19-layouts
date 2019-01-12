import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let UiSystemStatusCasparElement = class UiSystemStatusCasparElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.status = "DISCONNECTED" /* DISCONNECTED */;
    }
    _computeStatus() {
        if (this._missingFiles && this._missingFiles.length > 0) {
            return "MISSING_FILES" /* MISSING_FILES */;
        }
        return this._connected ? "CONNECTED" /* CONNECTED */ : "DISCONNECTED" /* DISCONNECTED */;
    }
};
tslib_1.__decorate([
    property({ type: String, computed: '_computeStatus(_connected, _missingFiles.*)', reflectToAttribute: true })
], UiSystemStatusCasparElement.prototype, "status", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], UiSystemStatusCasparElement.prototype, "_connected", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiSystemStatusCasparElement.prototype, "_missingFiles", void 0);
UiSystemStatusCasparElement = tslib_1.__decorate([
    customElement('ui-system-status-caspar')
], UiSystemStatusCasparElement);
export default UiSystemStatusCasparElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc3lzdGVtLXN0YXR1cy1jYXNwYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS1zeXN0ZW0tc3RhdHVzLWNhc3Bhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBUXJEOzs7R0FHRztBQUVILElBQXFCLDJCQUEyQixHQUFoRCxNQUFxQiwyQkFBNEIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFMN0Y7OztPQUdHO0lBQ0g7O1FBR0MsV0FBTSxxQ0FBK0I7SUFldEMsQ0FBQztJQVBBLGNBQWM7UUFDYixJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3hELDJDQUE0QjtTQUM1QjtRQUVELE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLDZCQUFrQixDQUFDLGtDQUFvQixDQUFDO0lBQ2pFLENBQUM7Q0FDRCxDQUFBO0FBZkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSw2Q0FBNkMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzsyREFDdkU7QUFHckM7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7K0RBQ0k7QUFHOUI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7a0VBQ1U7QUFSZCwyQkFBMkI7SUFEL0MsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0dBQ3BCLDJCQUEyQixDQWlCL0M7ZUFqQm9CLDJCQUEyQiJ9