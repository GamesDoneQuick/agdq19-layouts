import * as tslib_1 from "tslib";
import { TweenLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const compositingOBSStatus = nodecg.Replicant('compositingOBS:websocket');
const compositingOBSTransitioning = nodecg.Replicant('compositingOBS:transitioning');
const interviewStopwatch = nodecg.Replicant('interview_stopwatch');
const lowerthirdTimeRemaining = nodecg.Replicant('interview:lowerthirdTimeRemaining');
const programScene = nodecg.Replicant('compositingOBS:programScene');
const questionShowing = nodecg.Replicant('interview_questionShowing');
const questionSortMap = nodecg.Replicant('interview_questionSortMap');
const questionTimeRemaining = nodecg.Replicant('interview:questionTimeRemaining');
const showPrizesOnMonitorRep = nodecg.Replicant('interview_showPrizesOnMonitor');
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
        this.selectedTab = 0;
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
            this._selectedTeleprompterTab = Number(newVal);
        });
        this.addEventListener('error-toast', (event) => {
            this.$.toast.showErrorToast(event.detail.text);
        });
    }
    connectedCallback() {
        super.connectedCallback();
        const ro = new window.ResizeObserver((entries) => {
            const entry = entries[0];
            const cr = entry.contentRect;
            TweenLite.set(this.$.liveView__actual, {
                scale: cr.width / 1920,
                x: '-50%'
            });
        });
        ro.observe(this.$.liveView__wrapper);
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
    hideCurrent() {
        this.hideLowerthird();
        this.hideQuestion();
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
    _handleSelectedTeleprompterTabChange(e) {
        showPrizesOnMonitorRep.value = Boolean(e.detail.value);
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
    property({ type: Number, reflectToAttribute: true })
], DashInterviewElement.prototype, "selectedTab", void 0);
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
    property({ type: Number })
], DashInterviewElement.prototype, "_selectedTeleprompterTab", void 0);
DashInterviewElement = tslib_1.__decorate([
    customElement('dash-interview')
], DashInterviewElement);
export default DashInterviewElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWludGVydmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUUvQixNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFrQiwwQkFBMEIsQ0FBQyxDQUFDO0FBQzNGLE1BQU0sMkJBQTJCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSw4QkFBOEIsQ0FBQyxDQUFDO0FBQzlGLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxxQkFBcUIsQ0FBQyxDQUFDO0FBQzlFLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBUyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQzlGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXFCLDZCQUE2QixDQUFDLENBQUM7QUFDekYsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwyQkFBMkIsQ0FBQyxDQUFDO0FBQy9FLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTJCLDJCQUEyQixDQUFDLENBQUM7QUFDaEcsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFTLGlDQUFpQyxDQUFDLENBQUM7QUFDMUYsTUFBTSxzQkFBc0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLCtCQUErQixDQUFDLENBQUM7QUFDMUYsTUFBTSxTQUFTLEdBQUksT0FBZSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUErQixDQUFDO0FBRTVIOzs7OztHQUtHO0FBRUgsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFR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