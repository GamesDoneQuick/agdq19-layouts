import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
const recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
/**
 * @customElement
 * @polymer
 */
let GDQMiscTogglesElement = class GDQMiscTogglesElement extends Polymer.Element {
    ready() {
        super.ready();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            recordTrackerEnabled.on('change', newVal => {
                if (newVal) {
                    this.$.milestoneToggle.checked = newVal;
                }
            });
        });
    }
    _handleMiletoneTrackerToggleChange(e) {
        if (!e.target) {
            return;
        }
        recordTrackerEnabled.value = Boolean(e.target.checked);
    }
};
GDQMiscTogglesElement = tslib_1.__decorate([
    customElement('gdq-misc-toggles')
], GDQMiscTogglesElement);
export default GDQMiscTogglesElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1pc2MtdG9nZ2xlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1taXNjLXRvZ2dsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQzNDLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9FOzs7R0FHRztBQUVILElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUNqRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ2hELG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQzFDLElBQUksTUFBTSxFQUFFO29CQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBNEMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2lCQUN0RTtZQUNGLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsa0NBQWtDLENBQUMsQ0FBUTtRQUMxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU87U0FDUDtRQUNELG9CQUFvQixDQUFDLEtBQUssR0FBRyxPQUFPLENBQUUsQ0FBQyxDQUFDLE1BQW1DLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEYsQ0FBQztDQUNELENBQUE7QUFsQm9CLHFCQUFxQjtJQUR6QyxhQUFhLENBQUMsa0JBQWtCLENBQUM7R0FDYixxQkFBcUIsQ0FrQnpDO2VBbEJvQixxQkFBcUIifQ==