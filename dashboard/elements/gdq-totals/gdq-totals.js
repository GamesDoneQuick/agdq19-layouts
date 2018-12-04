import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const cashTotal = nodecg.Replicant('total');
const autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');
let GDQTotalsElement = class GDQTotalsElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.cashTotal = '?';
        this.bitsTotal = '?';
    }
    ready() {
        super.ready();
        cashTotal.on('change', newVal => {
            this.cashTotal = newVal.formatted;
        });
        autoUpdateTotal.on('change', newVal => {
            this.autoUpdateTotal = newVal;
        });
    }
    editCashTotal() {
        if (!cashTotal.value) {
            return;
        }
        this.$.editTotalInput.value = String(cashTotal.value.raw);
        this._editTarget = 'cash';
        this.$.editDialog.open();
    }
    _handleAutoUpdateToggleChange(e) {
        if (!e.target) {
            return;
        }
        autoUpdateTotal.value = Boolean(e.target.checked);
    }
    _handleEditDialogConfirmed() {
        nodecg.sendMessage('setTotal', {
            type: this._editTarget,
            newValue: parseFloat(String(this.$.editTotalInput.value))
        });
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQTotalsElement.prototype, "cashTotal", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTotalsElement.prototype, "bitsTotal", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQTotalsElement.prototype, "autoUpdateTotal", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQTotalsElement.prototype, "recordTrackerEnabled", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTotalsElement.prototype, "_editTarget", void 0);
GDQTotalsElement = tslib_1.__decorate([
    customElement('gdq-totals')
], GDQTotalsElement);
export default GDQTotalsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRvdGFscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10b3RhbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsaUJBQWlCLENBQUMsQ0FBQztBQUdyRSxJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWlCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFEN0Q7O1FBR0MsY0FBUyxHQUFHLEdBQUcsQ0FBQztRQUdoQixjQUFTLEdBQUcsR0FBRyxDQUFDO0lBMkNqQixDQUFDO0lBaENBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDSCxlQUFlLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhO1FBQ1osSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDckIsT0FBTztTQUNQO1FBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFvQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztRQUN6QixJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQWlDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELDZCQUE2QixDQUFDLENBQVE7UUFDckMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDZCxPQUFPO1NBQ1A7UUFDRCxlQUFlLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBbUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBRUQsMEJBQTBCO1FBQ3pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFO1lBQzlCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVztZQUN0QixRQUFRLEVBQUUsVUFBVSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQW9DLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEYsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUE5Q0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7bURBQ1Q7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7bURBQ1Q7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7eURBQ0Q7QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7OERBQ0k7QUFHOUI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7cURBQ0w7QUFkQSxnQkFBZ0I7SUFEcEMsYUFBYSxDQUFDLFlBQVksQ0FBQztHQUNQLGdCQUFnQixDQWdEcEM7ZUFoRG9CLGdCQUFnQiJ9