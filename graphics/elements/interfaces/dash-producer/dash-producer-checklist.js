import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const checklist = nodecg.Replicant('checklist');
/**
 * @customElement
 * @polymer
 */
let DashProducerChecklistElement = class DashProducerChecklistElement extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        checklist.on('change', newVal => {
            this.extraContent = newVal.extraContent;
            this.techStationDuties = newVal.techStationDuties;
            this.stageTechDuties = newVal.stageTechDuties;
            this.audioEngineerDuties = newVal.audioEngineerDuties;
            this.specialDuties = newVal.special;
        });
    }
    _calcItemName(item) {
        return item ? (item.shortName || item.name) : '';
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklistElement.prototype, "stageTechDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklistElement.prototype, "extraContent", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklistElement.prototype, "audioReady", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklistElement.prototype, "techStationDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklistElement.prototype, "audioEngineerDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashProducerChecklistElement.prototype, "specialDuties", void 0);
DashProducerChecklistElement = tslib_1.__decorate([
    customElement('dash-producer-checklist')
], DashProducerChecklistElement);
export default DashProducerChecklistElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1wcm9kdWNlci1jaGVja2xpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLXByb2R1Y2VyLWNoZWNrbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFFM0Q7OztHQUdHO0FBRUgsSUFBcUIsNEJBQTRCLEdBQWpELE1BQXFCLDRCQUE2QixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQW1CN0YsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN4QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUM5QyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLG1CQUFtQixDQUFDO1lBQ3RELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBbUI7UUFDaEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0NBQ0QsQ0FBQTtBQS9CQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztxRUFDUTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztrRUFDSztBQUc3QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztnRUFDRztBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt1RUFDVTtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5RUFDWTtBQUdwQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzttRUFDTTtBQWpCViw0QkFBNEI7SUFEaEQsYUFBYSxDQUFDLHlCQUF5QixDQUFDO0dBQ3BCLDRCQUE0QixDQWlDaEQ7ZUFqQ29CLDRCQUE0QiJ9