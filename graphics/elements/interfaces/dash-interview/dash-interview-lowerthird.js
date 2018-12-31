import * as tslib_1 from "tslib";
// Packages
import { TweenLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const currentIntermissionRep = nodecg.Replicant('currentIntermission');
const currentRunRep = nodecg.Replicant('currentRun');
const interviewNamesRep = nodecg.Replicant('interview_names');
const lowerthirdShowingRep = nodecg.Replicant('interview:lowerthirdShowing');
const runnersRep = nodecg.Replicant('runners');
const scheduleRep = nodecg.Replicant('schedule');
/**
 * @customElement
 * @polymer
 */
let DashInterviewLowerthirdElement = class DashInterviewLowerthirdElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.lowerthirdShowing = false;
        this._typeaheadCandidates = [];
    }
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            runnersRep.on('change', newVal => {
                if (newVal && newVal.length > 0) {
                    this._typeaheadCandidates = newVal.filter(Boolean).map(runner => runner.name).map(String).sort();
                }
                else {
                    this._typeaheadCandidates = [];
                }
            });
            interviewNamesRep.on('change', newVal => {
                this.setNames(newVal);
            });
            lowerthirdShowingRep.on('change', newVal => {
                this.lowerthirdShowing = newVal;
            });
            const ro = new window.ResizeObserver((entries) => {
                const entry = entries[0];
                const cr = entry.contentRect;
                TweenLite.set(this.$.lowerthirdPreview, {
                    scale: cr.width / 1920
                });
            });
            ro.observe(this.$.previewContainer);
        });
    }
    updatePreview() {
        this._updatePreviewDebouncer = Polymer.Debouncer.debounce(this._updatePreviewDebouncer, Polymer.Async.timeOut.after(16), this._updatePreview.bind(this));
    }
    calcStartDisabled(lowerthirdShowing, questionShowing) {
        return lowerthirdShowing || questionShowing;
    }
    showLowerthird() {
        this.takeNames();
        lowerthirdShowingRep.value = true;
    }
    hideLowerthird() {
        lowerthirdShowingRep.value = false;
    }
    autoLowerthird() {
        this.takeNames();
        nodecg.sendMessage('pulseInterviewLowerthird', 10);
    }
    /**
     * Takes the names currently entered into the inputs.
     */
    takeNames() {
        interviewNamesRep.value = this.getNames();
    }
    /**
     * Returns an array of the names currently entered into the inputs.
     */
    getNames() {
        const inputs = this.getInputs();
        return inputs.map(input => {
            return {
                name: input.name,
                title: input.title
            };
        });
    }
    setNames(names) {
        const typeaheads = this.getInputs();
        if (!names || names.length <= 0) {
            typeaheads.forEach(input => {
                input.name = '';
                input.title = '';
            });
            return;
        }
        typeaheads.forEach((input, index) => {
            input.name = String((names[index] && names[index].name) || '');
            input.title = String((names[index] && names[index].title) || '');
        });
    }
    /**
     * Retrieves the name inputs as an array of DOM elements.
     */
    getInputs() {
        return Array.from(this.$.nameInputs.shadowRoot.querySelectorAll('ui-sortable-list-item'))
            .map(uiSortableListItem => uiSortableListItem.shadowRoot.querySelector('dash-lowerthird-name-input'));
    }
    any(...args) {
        return args.find(arg => arg);
    }
    openRefillDialog() {
        if (!currentIntermissionRep.value ||
            !scheduleRep.value ||
            !currentRunRep.value) {
            return;
        }
        const currentInterview = currentIntermissionRep.value.content.find(item => item.type === 'interview');
        const nextInterview = scheduleRep.value.find(scheduleItem => {
            // Ignore items which are not interviews.
            if (scheduleItem.type !== 'interview') {
                return false;
            }
            // If we have a currentInterview, return the first interview after it.
            if (currentInterview) {
                return scheduleItem.order > currentInterview.order;
            }
            // If we don't have a currentInterview, return the first interview after the currentRun.
            // Ignore items before the currentRun.
            return scheduleItem.order >= currentRunRep.value.order;
        });
        let currentInterviewNames = [];
        let nextInterviewNames = [];
        if (currentInterview) {
            currentInterviewNames = currentInterview.interviewers.concat(currentInterview.interviewees);
        }
        if (nextInterview) {
            nextInterviewNames = nextInterview.interviewers.concat(nextInterview.interviewees);
        }
        while (currentInterviewNames.length < 5) {
            currentInterviewNames.push('(none)');
        }
        while (nextInterviewNames.length < 5) {
            nextInterviewNames.push('(none)');
        }
        this.$.currentLowerthirdRefillOption.names = currentInterviewNames;
        this.$.nextLowerthirdRefillOption.names = nextInterviewNames;
        this.$.lowerthirdRefillDialog.open();
        nodecg.log.info('currentInterview:', currentInterview);
        nodecg.log.info('currentInterviewNames:', currentInterviewNames);
        nodecg.log.info('nextInterview:', nextInterview);
        nodecg.log.info('nextInterviewNames:', nextInterviewNames);
    }
    closeRefillDialog() {
        this.$.lowerthirdRefillDialog.close();
    }
    _handleRefillOptionAccepted(e) {
        this.setNames(e.detail.names);
        this.takeNames();
        this.closeRefillDialog();
    }
    _handleNameInputChange(event) {
        if (!interviewNamesRep.value) {
            return;
        }
        interviewNamesRep.value[event.model.index] = {
            name: event.target.name,
            title: event.target.title
        };
    }
    _updatePreview() {
        this.$.lowerthirdPreview.updatePreview(this.getNames());
    }
};
tslib_1.__decorate([
    property({ type: Boolean, notify: true })
], DashInterviewLowerthirdElement.prototype, "lowerthirdShowing", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterviewLowerthirdElement.prototype, "questionShowing", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewLowerthirdElement.prototype, "_typeaheadCandidates", void 0);
DashInterviewLowerthirdElement = tslib_1.__decorate([
    customElement('dash-interview-lowerthird')
], DashInterviewLowerthirdElement);
export default DashInterviewLowerthirdElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbG93ZXJ0aGlyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW50ZXJ2aWV3LWxvd2VydGhpcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFdBQVc7QUFDWCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBUy9CLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXNCLHFCQUFxQixDQUFDLENBQUM7QUFDNUYsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTSxZQUFZLENBQUMsQ0FBQztBQUMxRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWlCLGlCQUFpQixDQUFDLENBQUM7QUFDOUUsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLDZCQUE2QixDQUFDLENBQUM7QUFDdEYsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVyxTQUFTLENBQUMsQ0FBQztBQUN6RCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFpQixVQUFVLENBQUMsQ0FBQztBQUVqRTs7O0dBR0c7QUFFSCxJQUFxQiw4QkFBOEIsR0FBbkQsTUFBcUIsOEJBQStCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMM0U7OztPQUdHO0lBQ0g7O1FBR0Msc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBTTFCLHlCQUFvQixHQUFhLEVBQUUsQ0FBQztJQXlMckMsQ0FBQztJQXJMQSxpQkFBaUI7UUFDaEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ2hELFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FB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