import * as tslib_1 from "tslib";
const { customElement, property, observe } = Polymer.decorators;
const checklistRep = nodecg.Replicant('checklist');
const stopwatchRep = nodecg.Replicant('stopwatch');
const cyclingRecordingsRep = nodecg.Replicant('obs_cyclingRecordings');
/**
 * @customElement
 * @polymer
 */
let GDQChecklistRecordingElement = class GDQChecklistRecordingElement extends Polymer.Element {
    ready() {
        super.ready();
        checklistRep.on('change', newVal => {
            if (!newVal) {
                return;
            }
            const incompleteTasks = [];
            for (const key in newVal) { // tslint:disable-line:no-for-in
                if (!{}.hasOwnProperty.call(newVal, key)) {
                    continue;
                }
                const category = newVal[key];
                category.forEach(task => {
                    if (!task.complete) {
                        incompleteTasks.push(task);
                    }
                });
            }
            this.warning = incompleteTasks.length > 1 && incompleteTasks[0].name !== 'Cycle Recordings';
        });
        stopwatchRep.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this._stopwatchState = newVal.state === 'running';
        });
        cyclingRecordingsRep.on('change', newVal => {
            this._cyclingRecordings = newVal;
        });
        nodecg.listenFor('obs:recordingsCycled', error => {
            const toast = this.$.toast;
            if (error) {
                let errorString = error;
                if (error.message) {
                    errorString = error.message;
                }
                else if (error.error) {
                    errorString = error.error;
                }
                toast.showErrorToast('Failed to cycle recordings: ' + errorString);
            }
            else {
                toast.showSuccessToast('Recordings cycled.');
            }
        });
        this.addEventListener('click', () => {
            const checkbox = this.$.checkbox;
            checkbox.click();
        });
    }
    _calcDisabled(stopwatchState, cyclingRecordings) {
        this.disabled = Boolean(stopwatchState || cyclingRecordings);
    }
    _calcContextPage(warning, disabled, cyclingRecordings) {
        if (cyclingRecordings) {
            return 'cycling';
        }
        if (disabled) {
            return 'disabled';
        }
        if (warning) {
            return 'warning';
        }
        return 'all-clear';
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQChecklistRecordingElement.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQChecklistRecordingElement.prototype, "category", void 0);
tslib_1.__decorate([
    property({ type: Boolean, notify: true, reflectToAttribute: true })
], GDQChecklistRecordingElement.prototype, "checked", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQChecklistRecordingElement.prototype, "warning", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQChecklistRecordingElement.prototype, "disabled", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQChecklistRecordingElement.prototype, "_stopwatchState", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQChecklistRecordingElement.prototype, "_cyclingRecordings", void 0);
tslib_1.__decorate([
    observe('_stopwatchState', '_cyclingRecordings')
], GDQChecklistRecordingElement.prototype, "_calcDisabled", null);
GDQChecklistRecordingElement = tslib_1.__decorate([
    customElement('gdq-checklist-recording')
], GDQChecklistRecordingElement);
export default GDQChecklistRecordingElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNoZWNrbGlzdC1yZWNvcmRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtY2hlY2tsaXN0LXJlY29yZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUM5RCxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBQzlELE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFDOUQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLHVCQUF1QixDQUFDLENBQUM7QUFFaEY7OztHQUdHO0FBRUgsSUFBcUIsNEJBQTRCLEdBQWpELE1BQXFCLDRCQUE2QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBc0J4RSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsWUFBWSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbEMsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWixPQUFPO2FBQ1A7WUFFRCxNQUFNLGVBQWUsR0FBbUIsRUFBRSxDQUFDO1lBQzNDLEtBQUssTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLEVBQUUsZ0NBQWdDO2dCQUMzRCxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUN6QyxTQUFTO2lCQUNUO2dCQUVELE1BQU0sUUFBUSxHQUFJLE1BQWMsQ0FBQyxHQUFHLENBQW1CLENBQUM7Z0JBQ3hELFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3dCQUNuQixlQUFlLENBQUMsSUFBSSxDQUFDLElB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