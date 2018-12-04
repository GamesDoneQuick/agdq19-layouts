import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const compositingOBSStatus = nodecg.Replicant('compositingOBS:websocket');
const compositingOBSTransitioning = nodecg.Replicant('compositingOBS:transitioning');
const interviewStopwatch = nodecg.Replicant('interview:stopwatch');
const lowerthirdTimeRemaining = nodecg.Replicant('interview:lowerthirdTimeRemaining');
const programScene = nodecg.Replicant('compositingOBS:programScene');
const questionShowing = nodecg.Replicant('interview:questionShowing');
const questionSortMap = nodecg.Replicant('interview:questionSortMap');
const questionTimeRemaining = nodecg.Replicant('interview:questionTimeRemaining');
const showPrizesOnMonitorRep = nodecg.Replicant('interview:showPrizesOnMonitor');
const baseClass = Polymer.SCDataBindingHelpers(Polymer.MutableData(Polymer.Element));
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 * @appliesMixin Polymer.SCDataBindingHelpers
 */
let DashInterviewElement = class DashInterviewElement extends baseClass {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     * @appliesMixin Polymer.SCDataBindingHelpers
     */
    constructor() {
        super(...arguments);
        this._programSceneName = '';
        this._markingTopQuestionAsDone = false;
        this._sendingTransitionCommand = false;
    }
    ready() {
        super.ready();
        lowerthirdTimeRemaining.on('change', newVal => {
            this.lowerthirdTimeRemaining = newVal;
        });
        questionTimeRemaining.on('change', newVal => {
            this.questionTimeRemaining = newVal;
        });
        compositingOBSTransitioning.on('change', newVal => {
            this._transitioning = newVal;
        });
        programScene.on('change', newVal => {
            this._programSceneName = newVal ? newVal.name : '';
        });
        compositingOBSStatus.on('change', newVal => {
            this._disconnectedFromOBS = Boolean(!newVal || newVal.status !== 'connected');
        });
        interviewStopwatch.on('change', newVal => {
            this._timeElapsed = newVal.time.formatted.split('.')[0];
        });
        showPrizesOnMonitorRep.on('change', newVal => {
            this._modeToggleChecked = !newVal;
        });
        this.addEventListener('error-toast', (event) => {
            this.$.toast.showErrorToast(event.detail.text);
        });
    }
    showLowerthird() {
        this.$.lowerthirdControls.autoLowerthird();
    }
    hideLowerthird() {
        this.$.lowerthirdControls.hideLowerthird();
    }
    showQuestion() {
        if (!questionSortMap.value) {
            return;
        }
        this._markingTopQuestionAsDone = true;
        nodecg.sendMessage('pulseInterviewQuestion', questionSortMap.value[0], error => {
            this._markingTopQuestionAsDone = false;
            if (error) {
                this.$.toast.showErrorToast('Failed to load next interview question.');
                nodecg.log.error(error);
            }
        });
    }
    hideQuestion() {
        questionShowing.value = false;
        this._markingTopQuestionAsDone = false;
    }
    openInterviewTransitionConfirmation() {
        this.$.interviewTransitionConfirmation.open();
    }
    async transitionToInterview() {
        return this.transitionToScene('Interview');
    }
    async transitionToBreak() {
        return this.transitionToScene('Break');
    }
    async transitionToScene(sceneName, transitionName = 'Blank Stinger') {
        const toastElem = this.$.toast;
        this._sendingTransitionCommand = true;
        try {
            await nodecg.sendMessage('compositingOBS:transition', {
                name: transitionName,
                sceneName
            });
            toastElem.showSuccessToast(`Successfully started transition to "${sceneName}".`);
        }
        catch (error) {
            let errorString = error;
            if (error.message) {
                errorString = error.message;
            }
            else if (error.error) {
                errorString = error.error;
            }
            toastElem.showErrorToast('Failed to transition: ' + errorString);
        }
        this._sendingTransitionCommand = false;
    }
    _computeTransitionToBreakDisabled(_sendingTransitionCommand, _transitioning, _disconnectedFromOBS, _programSceneName) {
        return _sendingTransitionCommand ||
            _transitioning ||
            _disconnectedFromOBS ||
            _programSceneName === 'Break';
    }
    _any(...args) {
        return args.find(arg => Boolean(arg));
    }
    _handleModeToggleChange(e) {
        showPrizesOnMonitorRep.value = !e.target.checked;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], DashInterviewElement.prototype, "lowerthirdShowing", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashInterviewElement.prototype, "lowerthirdTimeRemaining", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], DashInterviewElement.prototype, "questionShowing", void 0);
tslib_1.__decorate([
    property({ type: Number })
], DashInterviewElement.prototype, "questionTimeRemaining", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterviewElement.prototype, "_programSceneName", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterviewElement.prototype, "_markingTopQuestionAsDone", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterviewElement.prototype, "_sendingTransitionCommand", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterviewElement.prototype, "_errorToastText", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterviewElement.prototype, "_successToastText", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterviewElement.prototype, "_transitioning", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterviewElement.prototype, "_disconnectedFromOBS", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        computed: '_computeTransitionToBreakDisabled(_sendingTransitionCommand, _transitioning, _disconnectedFromOBS, _programSceneName)'
    })
], DashInterviewElement.prototype, "_transitionToBreakDisabled", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterviewElement.prototype, "_timeElapsed", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterviewElement.prototype, "_modeToggleChecked", void 0);
DashInterviewElement = tslib_1.__decorate([
    customElement('dash-interview')
], DashInterviewElement);
export default DashInterviewElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWludGVydmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBa0IsMEJBQTBCLENBQUMsQ0FBQztBQUMzRixNQUFNLDJCQUEyQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsOEJBQThCLENBQUMsQ0FBQztBQUM5RixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVkscUJBQXFCLENBQUMsQ0FBQztBQUM5RSxNQUFNLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVMsbUNBQW1DLENBQUMsQ0FBQztBQUM5RixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLDZCQUE2QixDQUFDLENBQUM7QUFDNUUsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwyQkFBMkIsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTZCLDJCQUEyQixDQUFDLENBQUM7QUFDbEcsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFTLGlDQUFpQyxDQUFDLENBQUM7QUFDMUYsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLCtCQUErQixDQUFDLENBQUM7QUFDMUYsTUFBTSxTQUFTLEdBQUksT0FBZSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUErQixDQUFDO0FBRTVIOzs7OztHQUtHO0FBRUgsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLFNBQVM7SUFQM0Q7Ozs7O09BS0c7SUFDSDs7UUFlQyxzQkFBaUIsR0FB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