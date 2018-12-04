import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
const autoUploadRecordings = nodecg.Replicant('autoUploadRecordings');
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
            autoUploadRecordings.on('change', newVal => {
                this.$.uploadToggle.checked = newVal;
            });
            this._checkUploadToggleDisable();
        });
    }
    _checkUploadToggleDisable() {
        if (nodecg.bundleConfig.youtubeUploadScriptPath) {
            this.$.uploadToggle.removeAttribute('disabled');
        }
        else {
            this.$.uploadToggle.setAttribute('disabled', 'true');
        }
    }
    _handleMiletoneTrackerToggleChange(e) {
        if (!e.target) {
            return;
        }
        recordTrackerEnabled.value = Boolean(e.target.checked);
    }
    _handleUploadToggleChange(e) {
        if (!e.target) {
            return;
        }
        autoUploadRecordings.value = Boolean(e.target.checked);
    }
};
GDQMiscTogglesElement = tslib_1.__decorate([
    customElement('gdq-misc-toggles')
], GDQMiscTogglesElement);
export default GDQMiscTogglesElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1pc2MtdG9nZ2xlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1taXNjLXRvZ2dsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQzNDLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxzQkFBc0IsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9FOzs7R0FHRztBQUVILElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUNqRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ2hELG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQzFDLElBQUksTUFBTSxFQUFFO29CQUNWLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBNEMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2lCQUN0RTtZQUNGLENBQUMsQ0FBQyxDQUFDO1lBRUgsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUF5QyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDcEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCx5QkFBeUI7UUFDeEIsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hELElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNoRDthQUFNO1lBQ04sSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNyRDtJQUNGLENBQUM7SUFFRCxrQ0FBa0MsQ0FBQyxDQUFRO1FBQzFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ2QsT0FBTztTQUNQO1FBQ0Qsb0JBQW9CLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBRSxDQUFDLENBQUMsTUFBbUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRUQseUJBQXlCLENBQUMsQ0FBUTtRQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU87U0FDUDtRQUNELG9CQUFvQixDQUFDLEtBQUssR0FBRyxPQUFPLENBQUUsQ0FBQyxDQUFDLE1BQW1DLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEYsQ0FBQztDQUNELENBQUE7QUF2Q29CLHFCQUFxQjtJQUR6QyxhQUFhLENBQUMsa0JBQWtCLENBQUM7R0FDYixxQkFBcUIsQ0F1Q3pDO2VBdkNvQixxQkFBcUIifQ==