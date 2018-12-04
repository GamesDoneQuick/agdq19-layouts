import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const checklist = nodecg.Replicant('checklist');
const checklistComplete = nodecg.Replicant('checklistComplete');
const currentRun = nodecg.Replicant('currentRun');
const stopwatch = nodecg.Replicant('stopwatch');
let DashAudioElement = class DashAudioElement extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        checklist.on('change', newVal => {
            this.audioEngineerDuties = newVal.audioEngineerDuties;
        });
        checklistComplete.on('change', newVal => {
            const statusDiv = this.$.checklistStatus;
            if (newVal) {
                statusDiv.style.backgroundColor = '#cfffcf';
                statusDiv.innerText = 'READY TO START';
            }
            else {
                statusDiv.style.backgroundColor = '#ffe2e2';
                statusDiv.innerText = 'NOT READY YET';
            }
        });
        currentRun.on('change', newVal => {
            this.$['currentRun-name'].innerHTML = newVal.name.replace('\\n', '<br/>').trim();
            this.runners = newVal.runners;
        });
        stopwatch.on('change', newVal => {
            this.stopwatchState = newVal.state;
            this.stopwatchTime = newVal.time.formatted;
            this.stopwatchResults = newVal.results;
        });
        this._checkboxChanged = this._checkboxChanged.bind(this);
        this.addEventListener('change', this._checkboxChanged);
    }
    calcRunnersString(runners) {
        let concatenatedRunners = runners[0].name;
        if (runners.length >= 1) {
            concatenatedRunners = runners.slice(1).reduce((prev, curr, index, array) => {
                if (index === array.length - 1) {
                    return `${prev} & ${curr.name}`;
                }
                return `${prev}, ${curr.name}`;
            }, concatenatedRunners);
        }
        return concatenatedRunners;
    }
    _checkboxChanged(e) {
        if (!checklist.value) {
            return;
        }
        const target = e.composedPath()[0];
        const category = target.getAttribute('category');
        const name = target.innerText.trim();
        checklist.value[category].find(task => {
            if (task.name === name) {
                task.complete = Boolean(target.checked);
                return true;
            }
            return false;
        });
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashAudioElement.prototype, "audioEngineerDuties", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashAudioElement.prototype, "runners", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashAudioElement.prototype, "stopwatchTime", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashAudioElement.prototype, "stopwatchState", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashAudioElement.prototype, "stopwatchResults", void 0);
DashAudioElement = tslib_1.__decorate([
    customElement('dash-audio')
], DashAudioElement);
export default DashAudioElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1hdWRpby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtYXVkaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBQzNELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBb0IsbUJBQW1CLENBQUMsQ0FBQztBQUNuRixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFNLFlBQVksQ0FBQyxDQUFDO0FBQ3ZELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFHM0QsSUFBcUIsZ0JBQWdCLEdBQXJDLE1BQXFCLGdCQUFpQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQTZCakYsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsbUJBQW1CLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBaUMsQ0FBQztZQUMzRCxJQUFJLE1BQU0sRUFBRTtnQkFDWCxTQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7Z0JBQzVDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7YUFDdkM7aUJBQU07Z0JBQ04sU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsU0FB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