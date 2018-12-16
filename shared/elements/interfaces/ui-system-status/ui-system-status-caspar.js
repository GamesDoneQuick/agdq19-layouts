"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        return this._connected ? "CONNECTED" /* CONNECTED */ : "CONNECTED" /* CONNECTED */;
    }
};
__decorate([
    property({ type: String, computed: '_computeStatus(_connected, _missingFiles.*)', reflectToAttribute: true })
], UiSystemStatusCasparElement.prototype, "status", void 0);
__decorate([
    property({ type: Boolean })
], UiSystemStatusCasparElement.prototype, "_connected", void 0);
__decorate([
    property({ type: Array })
], UiSystemStatusCasparElement.prototype, "_missingFiles", void 0);
UiSystemStatusCasparElement = __decorate([
    customElement('ui-system-status-caspar')
], UiSystemStatusCasparElement);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc3lzdGVtLXN0YXR1cy1jYXNwYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS1zeXN0ZW0tc3RhdHVzLWNhc3Bhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBUXJEOzs7R0FHRztBQUVILElBQU0sMkJBQTJCLEdBQWpDLE1BQU0sMkJBQTRCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTDlFOzs7T0FHRztJQUNIOztRQUdDLFdBQU0scUNBQStCO0lBZXRDLENBQUM7SUFQQSxjQUFjO1FBQ2IsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN4RCwyQ0FBNEI7U0FDNUI7UUFFRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyw2QkFBa0IsQ0FBQyw0QkFBaUIsQ0FBQztJQUM5RCxDQUFDO0NBQ0QsQ0FBQTtBQWZBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsNkNBQTZDLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7MkRBQ3ZFO0FBR3JDO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDOytEQUNJO0FBRzlCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO2tFQUNVO0FBUjdCLDJCQUEyQjtJQURoQyxhQUFhLENBQUMseUJBQXlCLENBQUM7R0FDbkMsMkJBQTJCLENBaUJoQyJ9