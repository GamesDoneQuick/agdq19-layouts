import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let GDQRunEditorElement = class GDQRunEditorElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.showingOriginal = false;
    }
    loadRun(run) {
        this.name = run.name;
        this.category = run.category;
        this.estimate = run.estimate;
        this.console = run.console;
        this.releaseYear = String(run.releaseYear);
        this.runners = run.runners.map(runner => {
            if (runner) {
                return { name: runner.name, stream: runner.stream };
            }
            return;
        });
        this.coop = run.coop;
        this.originalValues = run.originalValues;
        this.pk = run.pk;
    }
    applyChanges() {
        // We have to build a new runners object.
        const runners = [];
        const runnerNameInputs = this.$.runners.querySelectorAll('paper-input[label^="Runner"]:not([disabled])');
        const runnerStreamInputs = this.$.runners.querySelectorAll('paper-input[label="Twitch Channel"]:not([disabled])');
        for (let i = 0; i < 4; i++) {
            if (runnerNameInputs[i].value || runnerStreamInputs[i].value) {
                runners[i] = {
                    name: runnerNameInputs[i].value,
                    stream: runnerStreamInputs[i].value
                };
            }
        }
        nodecg.sendMessage('modifyRun', {
            name: this.name,
            category: this.category,
            estimate: this.estimate,
            console: this.console,
            releaseYear: this.releaseYear,
            coop: this.coop,
            runners,
            pk: this.pk
        }, () => {
            const dialog = this.closest('paper-dialog');
            if (dialog) {
                dialog.close();
            }
        });
    }
    resetRun() {
        nodecg.sendMessage('resetRun', this.pk, () => {
            const dialog = this.closest('paper-dialog');
            if (dialog) {
                dialog.close();
            }
        });
    }
    calcHide(path, showingOriginal) {
        const originalPath = path.split('.').slice(0);
        originalPath.unshift('originalValues');
        const originalValue = this.get(originalPath);
        const hasOriginal = originalValue !== undefined;
        return showingOriginal && hasOriginal;
    }
    showOriginal() {
        this.showingOriginal = true;
    }
    hideOriginal() {
        this.showingOriginal = false;
    }
    _moveRunnerDown(e) {
        const target = e.target;
        if (!target) {
            return;
        }
        const rowDiv = target.closest('[data-index]');
        if (!rowDiv) {
            return;
        }
        const index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
        this.runners = this._moveRunner(this.runners, index, 'down');
    }
    _moveRunnerUp(e) {
        const target = e.target;
        if (!target) {
            return;
        }
        const rowDiv = target.closest('[data-index]');
        if (!rowDiv) {
            return;
        }
        const index = parseInt(String(rowDiv.getAttribute('data-index')), 10);
        this.runners = this._moveRunner(this.runners, index, 'up');
    }
    /**
     * Moves a runner up or down in the runners array.
     * @param runnersArray - The array of runners to base these changes on.
     * @param index - The index of the runner to move in the array.
     * @param direction - Which direction to move the runner in.
     * @returns An array of runners with the desired runner re-arrangement applied to it.
     */
    _moveRunner(runnersArray, index, direction) {
        if (isNaN(index)) {
            throw new Error(`Index must be a number, got "${index}" which is a "${typeof index}"`);
        }
        if (index < 0 || index >= 4) {
            throw new Error(`Index must be >= 0 and < 4, got "${index}"`);
        }
        const newRunnersArray = runnersArray.slice(0);
        while (newRunnersArray.length < 4) {
            newRunnersArray.push(undefined);
        }
        const runnerToMove = newRunnersArray.splice(index, 1)[0];
        newRunnersArray.splice(index + (direction === 'up' ? -1 : 1), 0, runnerToMove);
        return newRunnersArray.slice(0, 4);
    }
};
tslib_1.__decorate([
    property({ type: Boolean })
], GDQRunEditorElement.prototype, "showingOriginal", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQRunEditorElement.prototype, "coop", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunEditorElement.prototype, "releaseYear", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunEditorElement.prototype, "console", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunEditorElement.prototype, "estimate", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunEditorElement.prototype, "category", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQRunEditorElement.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQRunEditorElement.prototype, "originalValues", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQRunEditorElement.prototype, "runners", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQRunEditorElement.prototype, "pk", void 0);
GDQRunEditorElement = tslib_1.__decorate([
    customElement('gdq-run-editor')
], GDQRunEditorElement);
export default GDQRunEditorElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bi1lZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtcnVuLWVkaXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBR3JELElBQXFCLG1CQUFtQixHQUF4QyxNQUFxQixtQkFBb0IsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFEckY7O1FBR0Msb0JBQWUsR0FBRyxLQUFLLENBQUM7SUE4SnpCLENBQUM7SUFqSUEsT0FBTyxDQUFDLEdBQVE7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsT0FBTyxFQUFDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUM7YUFDbEQ7WUFFRCxPQUFPO1FBQ1IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQsWUFBWTtRQUNYLHlDQUF5QztRQUN6QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyw4Q0FBOEMsQ0FBa0MsQ0FBQztRQUMxSSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHFEQUFxRCxDQUFrQyxDQUFDO1FBQ25KLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUM3RCxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUc7b0JBQ1osSUFBSSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7b0JBQy9CLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO2lCQUNuQyxDQUFDO2FBQ0Y7U0FDRDtRQUVELE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFO1lBQy9CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixPQUFPO1lBQ1AsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO1NBQ1gsRUFBRSxHQUFHLEVBQUU7WUFDUCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVDLElBQUksTUFBTSxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNmO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsUUFBUTtRQUNQLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFO1lBQzVDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDNUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2Y7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBWSxFQUFFLGVBQXdCO1FBQzlDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlDLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzdDLE1BQU0sV0FBVyxHQUFHLGFBQWEsS0FBSyxTQUFTLENBQUM7UUFDaEQsT0FBTyxlQUFlLElBQUksV0FBVyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxZQUFZO1FBQ1gsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELFlBQVk7UUFDWCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZSxDQUFDLENBQVE7UUFDdkIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQTRCLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNaLE9BQU87U0FDUDtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFtQixDQUFDO1FBQ2hFLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixPQUFPO1NBQ1A7UUFFRCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELGFBQWEsQ0FBQyxDQUFRO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUE0QixDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWixPQUFPO1NBQ1A7UUFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBbUIsQ0FBQztRQUNoRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1osT0FBTztTQUNQO1FBRUQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxXQUFXLENBQUMsWUFBb0MsRUFBRSxLQUFhLEVBQUUsU0FBd0I7UUFDeEYsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsS0FBSyxpQkFBaUIsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZGO1FBRUQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUM5RDtRQUVELE1BQU0sZUFBZSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsT0FBTyxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNsQyxlQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hDO1FBRUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQy9FLE9BQU8sZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNELENBQUE7QUE5SkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7NERBQ0Y7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7aURBQ1o7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3REFDTDtBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztvREFDVDtBQUdoQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztxREFDUjtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztxREFDUjtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztpREFDWjtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzJEQUNnQjtBQUd6QztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztvREFDUTtBQUdoQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzsrQ0FDZDtBQTdCUyxtQkFBbUI7SUFEdkMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0dBQ1gsbUJBQW1CLENBZ0t2QztlQWhLb0IsbUJBQW1CIn0=