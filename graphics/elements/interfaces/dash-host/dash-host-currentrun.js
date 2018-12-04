import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const checklistComplete = nodecg.Replicant('checklistComplete');
const stopwatch = nodecg.Replicant('stopwatch');
const currentRun = nodecg.Replicant('currentRun');
/**
 * @customElement
 * @polymer
 */
let DashHostCurrentrunElement = class DashHostCurrentrunElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.checklistComplete = false;
    }
    ready() {
        super.ready();
        checklistComplete.on('change', newVal => {
            this.checklistComplete = newVal;
        });
        currentRun.on('change', newVal => {
            this.$.currentRunName.innerHTML = newVal.name.replace('\\n', '<br/>').trim();
            this.runners = newVal.runners;
        });
        stopwatch.on('change', newVal => {
            this.stopwatchTime = newVal.time.formatted;
            this.stopwatchResults = newVal.results;
        });
    }
    isValidResult(result, index, runners) {
        const runner = runners[index];
        return result && result !== null && runner && runner.name;
    }
    _calcStatusText(newVal) {
        return newVal ? 'READY' : 'NOT READY';
    }
    _unionRunnersAndResults(runners, results) {
        if (!runners || !results) {
            return;
        }
        return runners.map((runner, index) => {
            return { runner, result: results[index] };
        });
    }
    _calcRunnerStatus(result) {
        if (result && result.time) {
            return result.time.formatted;
        }
        return 'Running';
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], DashHostCurrentrunElement.prototype, "checklistComplete", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashHostCurrentrunElement.prototype, "stopwatchTime", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashHostCurrentrunElement.prototype, "stopwatchResults", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashHostCurrentrunElement.prototype, "runners", void 0);
DashHostCurrentrunElement = tslib_1.__decorate([
    customElement('dash-host-currentrun')
], DashHostCurrentrunElement);
export default DashHostCurrentrunElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWN1cnJlbnRydW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtY3VycmVudHJ1bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBb0IsbUJBQW1CLENBQUMsQ0FBQztBQUNuRixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBQzNELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFFdkQ7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUwzRjs7O09BR0c7SUFDSDs7UUFHQyxzQkFBaUIsR0FBRyxLQUFLLENBQUM7SUF1RDNCLENBQUM7SUE1Q0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztRQUVILFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRUgsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUMzQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBOEIsRUFBRSxLQUFhLEVBQUUsT0FBaUI7UUFDN0UsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBVyxDQUFDO1FBQ3hDLE9BQU8sTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDM0QsQ0FBQztJQUVELGVBQWUsQ0FBQyxNQUFlO1FBQzlCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUN2QyxDQUFDO0lBRUQsdUJBQXVCLENBQUMsT0FBa0IsRUFBRSxPQUF5QjtRQUNwRSxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE9BQU87U0FDUDtRQUVELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNwQyxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRyxPQUFlLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxNQUF1QjtRQUN4QyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQzFCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDN0I7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNsQixDQUFDO0NBQ0QsQ0FBQTtBQXZEQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7b0VBQzFCO0FBRzFCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2dFQUNIO0FBR3RCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO21FQUNxQjtBQUc3QztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzswREFDTjtBQVhFLHlCQUF5QjtJQUQ3QyxhQUFhLENBQUMsc0JBQXNCLENBQUM7R0FDakIseUJBQXlCLENBeUQ3QztlQXpEb0IseUJBQXlCIn0=