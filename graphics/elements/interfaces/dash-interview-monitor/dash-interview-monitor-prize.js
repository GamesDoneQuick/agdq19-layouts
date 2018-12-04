import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentRunRep = nodecg.Replicant('currentRun');
/**
 * @customElement
 * @polymer
 */
let DashInterviewMonitorPrizeElement = class DashInterviewMonitorPrizeElement extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        currentRunRep.on('change', newVal => {
            this.currentRun = newVal;
        });
    }
    _computeBidType(prize) {
        return prize.sumdonations ? 'total' : 'single';
    }
    _computeClosed(prize, currentRun) {
        if (!prize || !currentRun) {
            return false;
        }
        return prize.endrun.order < currentRun.order;
    }
    _calcBidTypeChar(bidType) {
        if (!bidType) {
            return '';
        }
        return bidType.charAt(0);
    }
    _calcOpening(prize, currentRun) {
        if (!prize || !currentRun) {
            return '?';
        }
        if (prize.startrun.order <= currentRun.order) {
            return 'OPEN';
        }
        return prize.startrun.name;
    }
    _calcClosing(prize, currentRun) {
        if (!prize || !currentRun) {
            return '?';
        }
        if (prize.endrun.order < currentRun.order) {
            return 'CLOSED';
        }
        return prize.endrun.name;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], DashInterviewMonitorPrizeElement.prototype, "prize", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashInterviewMonitorPrizeElement.prototype, "currentRun", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, computed: '_computeBidType(prize)' })
], DashInterviewMonitorPrizeElement.prototype, "bidType", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, computed: '_computeClosed(prize, currentRun)' })
], DashInterviewMonitorPrizeElement.prototype, "closed", void 0);
DashInterviewMonitorPrizeElement = tslib_1.__decorate([
    customElement('dash-interview-monitor-prize')
], DashInterviewMonitorPrizeElement);
export default DashInterviewMonitorPrizeElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbW9uaXRvci1wcml6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW50ZXJ2aWV3LW1vbml0b3ItcHJpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFNLFlBQVksQ0FBQyxDQUFDO0FBRTFEOzs7R0FHRztBQUVILElBQXFCLGdDQUFnQyxHQUFyRCxNQUFxQixnQ0FBaUMsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFhakcsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFZO1FBQzNCLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDaEQsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFhLEVBQUUsVUFBZ0I7UUFDN0MsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNiO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQzlDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2IsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUNELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsWUFBWSxDQUFDLEtBQWEsRUFBRSxVQUFnQjtRQUMzQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQzFCLE9BQU8sR0FBRyxDQUFDO1NBQ1g7UUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDN0MsT0FBTyxNQUFNLENBQUM7U0FDZDtRQUVELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUVELFlBQVksQ0FBQyxLQUFhLEVBQUUsVUFBZ0I7UUFDM0MsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMxQixPQUFPLEdBQUcsQ0FBQztTQUNYO1FBRUQsSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQzFDLE9BQU8sUUFBUSxDQUFDO1NBQ2hCO1FBRUQsT0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUMxQixDQUFDO0NBQ0QsQ0FBQTtBQTdEQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsrREFDWjtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO29FQUNUO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixFQUFDLENBQUM7aUVBQ3ZFO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLG1DQUFtQyxFQUFDLENBQUM7Z0VBQ25GO0FBWEksZ0NBQWdDO0lBRHBELGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQztHQUN6QixnQ0FBZ0MsQ0ErRHBEO2VBL0RvQixnQ0FBZ0MifQ==