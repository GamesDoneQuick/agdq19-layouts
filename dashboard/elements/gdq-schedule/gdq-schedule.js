import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const canSeekSchedule = nodecg.Replicant('canSeekSchedule');
const currentRun = nodecg.Replicant('currentRun');
const nextRun = nodecg.Replicant('nextRun');
const schedule = nodecg.Replicant('schedule');
/**
 * @customElement
 * @polymer
 */
let GDQScheduleElement = class GDQScheduleElement extends Polymer.Element {
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            canSeekSchedule.on('change', () => {
                this._checkButtons();
            });
            schedule.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                // We don't have typings for vaadin-combo-box@^2.0.0
                this.$.typeahead.items = newVal
                    .filter(item => item.type === 'run')
                    .map(speedrun => speedrun.name);
                this._checkButtons();
            });
            nextRun.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                // Disable "next" button if at end of schedule
                const nextRunEl = this.$.nextRun;
                if (newVal) {
                    nextRunEl.setRun(newVal);
                    this.$.editNext.removeAttribute('disabled');
                }
                else {
                    nextRunEl.setRun({});
                    this.$.editNext.setAttribute('disabled', 'true');
                }
                this._checkButtons();
            });
            currentRun.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                const currentRunEl = this.$.currentRun;
                currentRunEl.setRun(newVal);
                this._checkButtons();
            });
        });
    }
    /**
     * Takes the current value of the typeahead and loads that as the current speedrun.
     * Shows a helpful error toast if no matching speedrun could be found.
     */
    takeTypeahead() {
        // We don't have typings for vaadin-combo-box@^2.0.0
        const typeahead = this.$.typeahead;
        if (!typeahead.value || !schedule.value) {
            return;
        }
        const nameToFind = typeahead.value;
        // Find the run based on the name.
        const matched = schedule.value.some(run => {
            if (run.type !== 'run') {
                return false;
            }
            if (run.name.toLowerCase() === nameToFind.toLowerCase()) {
                this._pendingSetCurrentRunByOrderMessageResponse = true;
                this._checkButtons();
                nodecg.sendMessage('setCurrentRunByOrder', run.order, () => {
                    this._pendingSetCurrentRunByOrderMessageResponse = false;
                    typeahead.value = '';
                    typeahead._suggestions = [];
                    this._checkButtons();
                });
                return true;
            }
            return false;
        });
        if (!matched) {
            this.$.toast.show(`Could not find speedrun with name "${nameToFind}".`);
        }
    }
    fetchLatestSchedule() {
        const toast = this.$.toast;
        this.$.fetchLatestSchedule.setAttribute('disabled', 'true');
        nodecg.sendMessage('updateSchedule', (err, updated) => {
            this.$.fetchLatestSchedule.removeAttribute('disabled');
            if (err) {
                nodecg.log.warn(err.message);
                toast.show('Error updating schedule. Check console.');
                return;
            }
            if (updated) {
                nodecg.log.info('Schedule successfully updated');
                toast.show('Successfully updated schedule.');
            }
            else {
                nodecg.log.info('Schedule unchanged, not updated');
                toast.show('Schedule unchanged, not updated.');
            }
        });
    }
    next() {
        this._pendingNextRunMessageResponse = true;
        this._checkButtons();
        nodecg.sendMessage('nextRun', () => {
            this._pendingNextRunMessageResponse = false;
            this._checkButtons();
        });
    }
    previous() {
        this._pendingPreviousRunMessageResponse = true;
        this._checkButtons();
        nodecg.sendMessage('previousRun', () => {
            this._pendingPreviousRunMessageResponse = false;
            this._checkButtons();
        });
    }
    editCurrent() {
        if (!currentRun.value) {
            return;
        }
        const editor = this.$.editor;
        const editDialog = this.$.editDialog;
        editor.title = `Edit Current Run (#${currentRun.value.order})`;
        editor.loadRun(currentRun.value);
        editDialog.open();
    }
    editNext() {
        if (!nextRun.value) {
            return;
        }
        const editor = this.$.editor;
        const editDialog = this.$.editDialog;
        editor.title = `Edit Next Run (#${nextRun.value.order})`;
        editor.loadRun(nextRun.value);
        editDialog.open();
    }
    _checkButtons() {
        if (canSeekSchedule.status !== 'declared' ||
            schedule.status !== 'declared' ||
            currentRun.status !== 'declared' ||
            nextRun.status !== 'declared' ||
            !schedule.value) {
            return;
        }
        let shouldDisableNext = false;
        let shouldDisablePrev = false;
        let shouldDisableTake = false;
        if (!canSeekSchedule.value ||
            this._pendingSetCurrentRunByOrderMessageResponse ||
            this._pendingPreviousRunMessageResponse ||
            this._pendingNextRunMessageResponse) {
            shouldDisableNext = true;
            shouldDisablePrev = true;
            shouldDisableTake = true;
        }
        // Disable nextRun button if there is no next run.
        if (!nextRun.value) {
            shouldDisableNext = true;
        }
        // Disable prevRun button if there is no prev run, or if there is no currentRun.
        if (currentRun.value) {
            // If there is any run in the schedule with an earlier order than currentRun,
            // then there must be a prevRun.
            const prevRunExists = schedule.value.find(run => {
                if (run.type !== 'run' || !currentRun.value) {
                    return false;
                }
                return run.order < currentRun.value.order;
            });
            if (!prevRunExists) {
                shouldDisablePrev = true;
            }
        }
        else {
            shouldDisablePrev = true;
        }
        // Disable take button if there's no takeTypeahead value.
        if (!this.$.typeahead.value) {
            shouldDisableTake = true;
        }
        if (shouldDisableNext) {
            this.$.next.setAttribute('disabled', 'true');
        }
        else {
            this.$.next.removeAttribute('disabled');
        }
        if (shouldDisablePrev) {
            this.$.previous.setAttribute('disabled', 'true');
        }
        else {
            this.$.previous.removeAttribute('disabled');
        }
        if (shouldDisableTake) {
            this.$.take.setAttribute('disabled', 'true');
        }
        else {
            this.$.take.removeAttribute('disabled');
        }
    }
    _typeaheadKeyup(e) {
        if (e.key === 'Enter' && this.$.typeahead.inputValue) {
            this.takeTypeahead();
        }
    }
};
tslib_1.__decorate([
    property({ type: Boolean })
], GDQScheduleElement.prototype, "_pendingSetCurrentRunByOrderMessageResponse", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQScheduleElement.prototype, "_pendingNextRunMessageResponse", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQScheduleElement.prototype, "_pendingPreviousRunMessageResponse", void 0);
GDQScheduleElement = tslib_1.__decorate([
    customElement('gdq-schedule')
], GDQScheduleElement);
export default GDQScheduleElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNjaGVkdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXNjaGVkdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFDOUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxTQUFTLENBQUMsQ0FBQztBQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFpQixVQUFVLENBQUMsQ0FBQztBQUU5RDs7O0dBR0c7QUFFSCxJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFVOUQsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNoRCxlQUFlLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztZQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNaLE9BQU87aUJBQ1A7Z0JBRUQsb0RBQW9EO2dCQUNuRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQWlCLENBQUMsS0FBSyxHQUFHLE1BQU07cUJBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDO3FCQUNu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