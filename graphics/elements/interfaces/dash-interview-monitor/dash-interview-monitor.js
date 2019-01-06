import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const total = nodecg.Replicant('total');
const currentRun = nodecg.Replicant('currentRun');
const nextRun = nodecg.Replicant('nextRun');
const currentLayout = nodecg.Replicant('currentLayout');
const throwIncoming = nodecg.Replicant('interview_throwIncoming');
const interviewStopwatch = nodecg.Replicant('interview_stopwatch');
const checklistComplete = nodecg.Replicant('checklistComplete');
const prizeModeRep = nodecg.Replicant('interview_showPrizesOnMonitor');
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
                if (!curr) {
                    return prev || '';
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW50ZXJ2aWV3LW1vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU1BLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQy9DLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTSxTQUFTLENBQUMsQ0FBQztBQUNqRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFnQixlQUFlLENBQUMsQ0FBQztBQUN2RSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLHlCQUF5QixDQUFDLENBQUM7QUFDM0UsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFxQixxQkFBcUIsQ0FBQyxDQUFDO0FBQ3ZGLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pFLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsK0JBQStCLENBQUMsQ0FBQztBQUdoRixJQUFxQiwyQkFBMkIsR0FBaEQsTUFBcUIsMkJBQTRCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBRDdGOztRQUdDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBU3RCLGNBQVMsR0FBRyxLQUFLLENBQUM7SUErRW5CLENBQUM7SUE3RUEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUE4QixDQUFD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