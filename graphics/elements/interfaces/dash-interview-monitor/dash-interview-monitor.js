import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const total = nodecg.Replicant('total');
const currentRun = nodecg.Replicant('currentRun');
const nextRun = nodecg.Replicant('nextRun');
const currentLayout = nodecg.Replicant('gdq:currentLayout');
const throwIncoming = nodecg.Replicant('interview:throwIncoming');
const interviewStopwatch = nodecg.Replicant('interview:stopwatch');
const checklistComplete = nodecg.Replicant('checklistComplete');
const prizeModeRep = nodecg.Replicant('interview:showPrizesOnMonitor');
let DashInterviewMonitorElement = class DashInterviewMonitorElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.throwIncoming = false;
        this.prizeMode = false;
    }
    ready() {
        super.ready();
        const totalAmountElem = this.$['total-amount'];
        totalAmountElem.displayValueTransform = displayValue => {
            return displayValue.toLocaleString('en-US', {
                maximumFractionDigits: 0
            });
        };
        total.on('change', newVal => {
            totalAmountElem.value = newVal.raw;
        });
        this.updateUpNextDisplay = this.updateUpNextDisplay.bind(this);
        currentLayout.on('change', this.updateUpNextDisplay);
        currentRun.on('change', this.updateUpNextDisplay);
        nextRun.on('change', this.updateUpNextDisplay);
        throwIncoming.on('change', newVal => {
            this.throwIncoming = newVal;
        });
        interviewStopwatch.on('change', newVal => {
            this.timeElapsed = newVal.time.formatted.split('.')[0];
        });
        checklistComplete.on('change', newVal => {
            const checklistStatusDiv = this.$.checklistStatus;
            if (newVal) {
                checklistStatusDiv.style.backgroundColor = '#cfffcf';
                checklistStatusDiv.innerText = 'DONE WITH SETUP';
            }
            else {
                checklistStatusDiv.style.backgroundColor = '#ffe2e2';
                checklistStatusDiv.innerText = 'STILL DOING SETUP';
            }
        });
        prizeModeRep.on('change', newVal => {
            this.prizeMode = newVal;
        });
    }
    updateUpNextDisplay() {
        let upNextRun = nextRun.value;
        if (currentLayout.value === 'break' || currentLayout.value === 'interview') {
            upNextRun = currentRun.value;
        }
        if (!upNextRun) {
            return;
        }
        this.upNextRunName = upNextRun.name.replace('\\n', ' ').trim();
        let concatenatedRunners;
        if (upNextRun.runners.length === 1) {
            concatenatedRunners = upNextRun.runners[0].name;
        }
        else {
            concatenatedRunners = upNextRun.runners.slice(1).reduce((prev, curr, index, array) => {
                if (index === array.length - 1) {
                    return `${prev} &<br/>${curr.name}`;
                }
                return `${prev},<br/>${curr.name}`;
            }, upNextRun.runners[0].name);
        }
        this.$.nextRunners.innerHTML = String(concatenatedRunners);
    }
    _calcSelectedPage(prizeMode) {
        return prizeMode ? 1 : 0;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], DashInterviewMonitorElement.prototype, "throwIncoming", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterviewMonitorElement.prototype, "timeElapsed", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterviewMonitorElement.prototype, "upNextRunName", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], DashInterviewMonitorElement.prototype, "prizeMode", void 0);
DashInterviewMonitorElement = tslib_1.__decorate([
    customElement('dash-interview-monitor')
], DashInterviewMonitorElement);
export default DashInterviewMonitorElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW50ZXJ2aWV3LW1vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTSxTQUFTLENBQUMsQ0FBQztBQUNqRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFxQixtQkFBbUIsQ0FBQyxDQUFDO0FBQ2hGLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUseUJBQXlCLENBQUMsQ0FBQztBQUMzRSxNQUFNLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXVCLHFCQUFxQixDQUFDLENBQUM7QUFDekYsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLG1CQUFtQixDQUFDLENBQUM7QUFDekUsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwrQkFBK0IsQ0FBQyxDQUFDO0FBR2hGLElBQXFCLDJCQUEyQixHQUFoRCxNQUFxQiwyQkFBNEIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFEN0Y7O1FBR0Msa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFTdEIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQTJFbkIsQ0FBQztJQXpFQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQThCLENB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