import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const stopwatch = nodecg.Replicant('stopwatch');
const currentRun = nodecg.Replicant('currentRun');
const checklistComplete = nodecg.Replicant('checklistComplete');
let GDQTimekeeperElement = class GDQTimekeeperElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.checklistIncomplete = true;
    }
    ready() {
        super.ready();
        stopwatch.on('change', this.stopwatchChanged.bind(this));
        currentRun.on('change', newVal => {
            if (!newVal) {
                return;
            }
            const runners = newVal.runners.slice(0);
            runners.length = 4;
            for (let i = 0; i < 4; i++) {
                runners[i] = runners[i] || false;
            }
            this.runners = runners;
            this.coop = newVal.coop;
        });
        checklistComplete.on('change', newVal => {
            this.checklistIncomplete = !newVal;
        });
    }
    stopwatchChanged(newVal) {
        if (!newVal) {
            return;
        }
        this.state = newVal.state;
        this.time = newVal.time.formatted;
        this.results = newVal.results.slice(0);
        this.notStarted = newVal.state === 'not_started';
        this.paused = newVal.state === 'paused';
    }
    confirmReset() {
        this.$.resetDialog.open();
    }
    startTimer() {
        nodecg.sendMessage('startTimer');
    }
    stopTimer() {
        nodecg.sendMessage('stopTimer');
    }
    resetTimer() {
        nodecg.sendMessage('resetTimer');
    }
    calcStartDisabled(checklistIncomplete, state) {
        return checklistIncomplete || state === 'running' || state === 'finished';
    }
    calcStartText(state) {
        switch (state) {
            case 'paused':
                return 'Resume';
            default:
                return 'Start';
        }
    }
    calcPauseDisabled(state) {
        return state !== 'running';
    }
    editMasterTime() {
        this.$['editDialog-text'].textContent = 'Enter a new master time.';
        this.$.editDialog.setAttribute('data-index', 'master');
        this.$['editDialog-input'].value = this.time;
        this.$.editDialog.open();
    }
    saveEditedTime() {
        const inputEl = this.$['editDialog-input'];
        nodecg.sendMessage('editTime', {
            index: this.$.editDialog.getAttribute('data-index'),
            newTime: inputEl.value
        });
        inputEl.value = '';
    }
    editRunnerTime(e) {
        const model = e.model;
        this.$['editDialog-text'].innerHTML = `Enter a new final time for <b>${model.runner.name}.</b>`;
        this.$.editDialog.setAttribute('data-index', model.index);
        const result = this.results[model.index];
        if (result) {
            this.$['editDialog-input'].value = result.time.formatted;
            this.$.editDialog.open();
        }
    }
    editCoopTime() {
        this.$['editDialog-text'].innerHTML = 'Enter a new final time for <b>all runners.</b>';
        this.$.editDialog.setAttribute('data-index', '0');
        const result = this.results[0];
        if (result) {
            this.$['editDialog-input'].value = result.time.formatted;
            this.$.editDialog.open();
        }
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQTimekeeperElement.prototype, "checklistIncomplete", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GDQTimekeeperElement.prototype, "state", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQTimekeeperElement.prototype, "paused", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQTimekeeperElement.prototype, "results", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQTimekeeperElement.prototype, "coop", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQTimekeeperElement.prototype, "notStarted", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQTimekeeperElement.prototype, "runners", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQTimekeeperElement.prototype, "time", void 0);
GDQTimekeeperElement = tslib_1.__decorate([
    customElement('gdq-timekeeper')
], GDQTimekeeperElement);
export default GDQTimekeeperElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVrZWVwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtdGltZWtlZXBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFDM0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBYSxZQUFZLENBQUMsQ0FBQztBQUM5RCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQW9CLG1CQUFtQixDQUFDLENBQUM7QUFHbkYsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBRGpFOztRQUdDLHdCQUFtQixHQUFHLElBQUksQ0FBQztJQThINUIsQ0FBQztJQXZHQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pELFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDM0IsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxL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