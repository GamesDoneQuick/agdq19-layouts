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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWludGVydmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBT0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBa0IsMEJBQTBCLENBQUMsQ0FBQztBQUMzRixNQUFNLDJCQUEyQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsOEJBQThCLENBQUMsQ0FBQztBQUM5RixNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVkscUJBQXFCLENBQUMsQ0FBQztBQUM5RSxNQUFNLHVCQUF1QixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVMsbUNBQW1DLENBQUMsQ0FBQztBQUM5RixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFxQiw2QkFBNkIsQ0FBQyxDQUFDO0FBQ3pGLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsMkJBQTJCLENBQUMsQ0FBQztBQUMvRSxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUE2QiwyQkFBMkIsQ0FBQyxDQUFDO0FBQ2xHLE1BQU0scUJBQXFCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBUyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQzFGLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwrQkFBK0IsQ0FBQyxDQUFDO0FBQzFGLE1BQU0sU0FBUyxHQUFJLE9BQWUsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBK0IsQ0FBQztBQUU1SDs7Ozs7R0FLRztBQUVILElBQXFCLG9CQUFvQixHQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxTQUFTO0lBUDNEOzs7OztPQUtHO0lBQ0g7O1FBZUMsc0JBQWlCLEdB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