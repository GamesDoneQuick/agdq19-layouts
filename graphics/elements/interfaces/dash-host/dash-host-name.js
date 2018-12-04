import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentHost = nodecg.Replicant('currentHost');
/**
 * @customElement
 * @polymer
 */
let DashHostNameElement = class DashHostNameElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this._enteredName = '';
    }
    ready() {
        super.ready();
        currentHost.on('change', newVal => {
            this.currentHost = newVal;
        });
    }
    take() {
        currentHost.value = this._enteredName;
        this._enteredName = '';
    }
    _falsey(value) {
        return !value;
    }
};
tslib_1.__decorate([
    property({ type: String })
], DashHostNameElement.prototype, "currentHost", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashHostNameElement.prototype, "_enteredName", void 0);
DashHostNameElement = tslib_1.__decorate([
    customElement('dash-host-name')
], DashHostNameElement);
export default DashHostNameElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LW5hbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsYUFBYSxDQUFDLENBQUM7QUFFakU7OztHQUdHO0FBRUgsSUFBcUIsbUJBQW1CLEdBQXhDLE1BQXFCLG1CQUFvQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTGhFOzs7T0FHRztJQUNIOztRQU1DLGlCQUFZLEdBQUcsRUFBRSxDQUFDO0lBaUJuQixDQUFDO0lBZkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUk7UUFDSCxXQUFXLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDdEMsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFVO1FBQ2pCLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0NBQ0QsQ0FBQTtBQXBCQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3REFDTDtBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt5REFDUDtBQUxFLG1CQUFtQjtJQUR2QyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7R0FDWCxtQkFBbUIsQ0FzQnZDO2VBdEJvQixtQkFBbUIifQ==