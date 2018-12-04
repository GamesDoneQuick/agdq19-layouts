import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let GDQTimekeeperCoopElement = class GDQTimekeeperCoopElement extends Polymer.Element {
    calcRunnerStatus(results) {
        if (results[0]) {
            return results[0].time.formatted;
        }
        return 'Running';
    }
    calcRunnerStatusClass(results) {
        if (results[0] && !results[0].forfeit) {
            return 'finished';
        }
        return '';
    }
    calcFinishHidden(results) {
        return results[0] && !results[0].forfeit;
    }
    calcResumeHidden(results) {
        return !results[0];
    }
    calcForfeitHidden(results) {
        return results[0] && results[0].forfeit;
    }
    calcEditDisabled(results) {
        return !results[0];
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
    calcConcatenatedRunners(runners) {
        let concatenatedRunners = runners[0].name;
        if (runners.length > 1) {
            concatenatedRunners = runners.slice(1).reduce((prev, curr, index, array) => {
                if (!curr || !curr.name) {
                    return prev;
                }
                if (index === array.length - 1) {
                    return `${prev} & ${curr.name}`;
                }
                return `${prev}, ${curr.name}`;
            }, concatenatedRunners);
        }
        return concatenatedRunners;
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQTimekeeperCoopElement.prototype, "importPath", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimekeeperCoopElement.prototype, "index", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQTimekeeperCoopElement.prototype, "runners", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQTimekeeperCoopElement.prototype, "results", void 0);
GDQTimekeeperCoopElement = tslib_1.__decorate([
    customElement('gdq-timekeeper-coop')
], GDQTimekeeperCoopElement);
export default GDQTimekeeperCoopElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVrZWVwZXItY29vcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS10aW1la2VlcGVyLWNvb3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQix3QkFBd0IsR0FBN0MsTUFBcUIsd0JBQXlCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFhcEUsZ0JBQWdCLENBQUMsT0FBMEI7UUFDMUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDZixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ2pDO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbEIsQ0FBQztJQUVELHFCQUFxQixDQUFDLE9BQTBCO1FBQy9DLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN0QyxPQUFPLFVBQVUsQ0FBQztTQUNsQjtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQTBCO1FBQzFDLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUMxQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBMEI7UUFDMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBMEI7UUFDM0MsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN6QyxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsT0FBMEI7UUFDMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTTtRQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQsT0FBTztRQUNOLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRUQsTUFBTTtRQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsUUFBUTtRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxPQUFpQjtRQUN4QyxJQUFJLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDMUMsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN2QixtQkFBbUIsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMxRSxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDeEIsT0FBTyxJQUFJLENBQUM7aUJBQ1o7Z0JBRUQsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQy9CLE9BQU8sR0FBRyxJQUFJLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNoQztnQkFFRCxPQUFPLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztTQUN4QjtRQUNELE9BQU8sbUJBQW1CLENBQUM7SUFDNUIsQ0FBQztDQUNELENBQUE7QUE1RUE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7NERBQ047QUFHbkI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7dURBQ1g7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5REFDTjtBQUdsQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5REFDWTtBQVhoQix3QkFBd0I7SUFENUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0dBQ2hCLHdCQUF3QixDQThFNUM7ZUE5RW9CLHdCQUF3QiJ9