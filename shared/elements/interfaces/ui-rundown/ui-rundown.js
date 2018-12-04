import * as tslib_1 from "tslib";
var UiRundownElement_1;
const { customElement, property } = Polymer.decorators;
const currentIntermission = nodecg.Replicant('currentIntermission');
const currentRun = nodecg.Replicant('currentRun');
const schedule = nodecg.Replicant('schedule');
const stopwatch = nodecg.Replicant('stopwatch');
let UiRundownElement = UiRundownElement_1 = class UiRundownElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.maxRunsToShow = 4;
        this.allowScrollback = false;
    }
    ready() {
        super.ready();
        this._debounceUpdateScheduleSlice = this._debounceUpdateScheduleSlice.bind(this);
        this._updateScheduleSlice = this._updateScheduleSlice.bind(this);
        currentIntermission.on('change', (_newVal, _oldVal, operations) => {
            const ignore = operations ?
                operations.every(operation => {
                    return operation.path.endsWith('/state');
                }) :
                false;
            if (ignore) {
                return;
            }
            this._debounceUpdateScheduleSlice();
        });
        currentRun.on('change', this._debounceUpdateScheduleSlice);
        schedule.on('change', this._debounceUpdateScheduleSlice);
        stopwatch.on('change', (newVal, oldVal) => {
            if (!oldVal || newVal.state !== oldVal.state || newVal.time.raw < oldVal.time.raw) {
                return this._debounceUpdateScheduleSlice();
            }
        });
    }
    scrollToFuture() {
        // There don't seem to be typings for IronListElement...
        this.$.remainderItems.scrollToIndex(this._futureStartIndex);
    }
    _debounceUpdateScheduleSlice() {
        this._updateScheduleSliceDebouncer = Polymer.Debouncer.debounce(this._updateScheduleSliceDebouncer, Polymer.Async.timeOut.after(10), this._updateScheduleSlice);
    }
    _updateScheduleSlice() {
        if (currentRun.status !== 'declared' ||
            schedule.status !== 'declared' ||
            stopwatch.status !== 'declared' ||
            currentIntermission.status !== 'declared' ||
            !currentIntermission.value ||
            !currentRun.value ||
            !schedule.value) {
            return;
        }
        let currentItems = [currentRun.value];
        if (currentIntermission.value.preOrPost === 'pre') {
            currentItems = [
                ...currentIntermission.value.content,
                ...currentItems
            ];
        }
        else {
            currentItems = currentItems.concat(currentIntermission.value.content);
        }
        // Start after whatever the last item was in currentItems.
        const lastCurrentItem = currentItems[currentItems.length - 1];
        const startIndex = schedule.value.findIndex(item => {
            return item.id === lastCurrentItem.id && item.type === lastCurrentItem.type;
        }) + 1;
        let numFoundRuns = 0;
        let endIndex = -1;
        let lastRunOrder = currentRun.value.order;
        schedule.value.slice(startIndex).some((item, index) => {
            if (numFoundRuns < this.maxRunsToShow) {
                if (item.type === 'run') {
                    lastRunOrder = item.order;
                    numFoundRuns++;
                    if (numFoundRuns >= this.maxRunsToShow) {
                        endIndex = index;
                        return false;
                    }
                }
                return false;
            }
            if (item.type !== 'run' && item.order === lastRunOrder) {
                endIndex = index;
                return false;
            }
            return true;
        });
        if (this.allowScrollback) {
            this.remainderItems = schedule.value.slice(0);
            this._futureStartIndex = startIndex;
            this.scrollToFuture();
        }
        else {
            this.remainderItems = endIndex > -1 ?
                schedule.value.slice(startIndex, startIndex + endIndex + 1) :
                schedule.value.slice(startIndex);
        }
        this.currentItems = currentItems;
    }
    _maxRunsToShowChanged() {
        this._debounceUpdateScheduleSlice();
    }
    _showTooltip(e) {
        const notes = e.model.item.notes;
        if (!notes || notes.trim().length <= 0 || !e.target) {
            return;
        }
        this.$['tooltip-content'].innerHTML = notes
            .replace(/\r\n/g, '<br/>')
            .replace(/\n/g, '<br/>');
        const thisRect = this.getBoundingClientRect();
        const itemRect = e.target.getBoundingClientRect();
        const tooltipRect = this.$['tooltip-content'].getBoundingClientRect();
        const offset = -4;
        const tooltip = this.$.tooltip;
        tooltip.style.opacity = '1';
        tooltip.style.top = `${itemRect.top - thisRect.top - tooltipRect.height + offset}px`;
    }
    _hideTooltip() {
        this.$.tooltip.style.opacity = '0';
    }
};
tslib_1.__decorate([
    property({ type: Array })
], UiRundownElement.prototype, "schedule", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiRundownElement.prototype, "remainderItems", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiRundownElement.prototype, "currentItems", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: UiRundownElement_1.prototype._maxRunsToShowChanged })
], UiRundownElement.prototype, "maxRunsToShow", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiRundownElement.prototype, "allowScrollback", void 0);
UiRundownElement = UiRundownElement_1 = tslib_1.__decorate([
    customElement('ui-rundown')
], UiRundownElement);
export default UiRundownElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcnVuZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXJ1bmRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFzQixxQkFBcUIsQ0FBQyxDQUFDO0FBQ3pGLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQU0sWUFBWSxDQUFDLENBQUM7QUFDdkQsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBaUIsVUFBVSxDQUFDLENBQUM7QUFDOUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUczRCxJQUFxQixnQkFBZ0Isd0JBQXJDLE1BQXFCLGdCQUFpQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQURsRjs7UUFZQyxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUdsQixvQkFBZSxHQUFHLEtBQUssQ0FBQztJQXdJekIsQ0FBQztJQW5JQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakYsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakUsbUJBQW1CLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLEVBQUU7WUFDakUsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUM7Z0JBQzFCLFVBQVUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JB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