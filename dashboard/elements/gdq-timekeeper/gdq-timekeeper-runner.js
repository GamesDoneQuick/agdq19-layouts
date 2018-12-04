import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let GDQTimekeeperRunnerElement = class GDQTimekeeperRunnerElement extends Polymer.Element {
    calcRunnerStatus(results, index) {
        if (!results) {
            return;
        }
        if (results[index] && results[index].time) {
            return results[index].time.formatted;
        }
        return 'Running';
    }
    calcRunnerStatusClass(results, index) {
        if (!results) {
            return;
        }
        if (results[index] && !results[index].forfeit) {
            return 'finished';
        }
        return '';
    }
    calcFinishHidden(results, index) {
        if (!results) {
            return;
        }
        return results[index] && !results[index].forfeit;
    }
    calcResumeHidden(results, index) {
        if (!results) {
            return;
        }
        return !results[index];
    }
    calcForfeitHidden(results, index) {
        if (!results) {
            return;
        }
        return results[index] && results[index].forfeit;
    }
    calcEditDisabled(results, runnerIndex) {
        if (!results) {
            return;
        }
        return !results[runnerIndex];
    }
    finish() {
        nodecg.sendMessage('completeRunner', { index: this.index, forfeit: false });
    }
    forfeit() {
        nodecg.sendMessage('completeRunner', { index: this.index, forfeit: true });
    }
    resume() {
        nodecg.sendMessage('resumeRunner', this.index);
    }
    editTime() {
        this.dispatchEvent(new CustomEvent('edit-time', { bubbles: true, composed: true }));
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQTimekeeperRunnerElement.prototype, "importPath", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimekeeperRunnerElement.prototype, "index", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQTimekeeperRunnerElement.prototype, "runner", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQTimekeeperRunnerElement.prototype, "results", void 0);
GDQTimekeeperRunnerElement = tslib_1.__decorate([
    customElement('gdq-timekeeper-runner')
], GDQTimekeeperRunnerElement);
export default GDQTimekeeperRunnerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVrZWVwZXItcnVubmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXRpbWVrZWVwZXItcnVubmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHckQsSUFBcUIsMEJBQTBCLEdBQS9DLE1BQXFCLDBCQUEyQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBYXRFLGdCQUFnQixDQUFDLE9BQTBCLEVBQUUsS0FBYTtRQUN6RCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2IsT0FBTztTQUNQO1FBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRTtZQUMxQyxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3JDO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUVELHFCQUFxQixDQUFDLE9BQTBCLEVBQUUsS0FBYTtRQUM5RCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2IsT0FBTztTQUNQO1FBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFO1lBQzlDLE9BQU8sVUFBVSxDQUFDO1NBQ2xCO1FBRUQsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBMEIsRUFBRSxLQUFhO1FBQ3pELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDYixPQUFPO1NBQ1A7UUFFRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDbEQsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQTBCLEVBQUUsS0FBYTtRQUN6RCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2IsT0FBTztTQUNQO1FBRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBMEIsRUFBRSxLQUFhO1FBQzFELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDYixPQUFPO1NBQ1A7UUFFRCxPQUFPLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQ2pELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxPQUEwQixFQUFFLFdBQW1CO1FBQy9ELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDYixPQUFPO1NBQ1A7UUFFRCxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxNQUFNO1FBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxPQUFPO1FBQ04sTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCxNQUFNO1FBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxRQUFRO1FBQ1AsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNELENBQUE7QUFsRkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7OERBQ047QUFHbkI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7eURBQ1g7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzswREFDVjtBQUdmO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDOzJEQUNZO0FBWGhCLDBCQUEwQjtJQUQ5QyxhQUFhLENBQUMsdUJBQXVCLENBQUM7R0FDbEIsMEJBQTBCLENBb0Y5QztlQXBGb0IsMEJBQTBCIn0=