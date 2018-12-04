import {IntermissionContentItem, Run, ScheduleItem} from '../../../../src/types';
import {CurrentIntermission} from '../../../../src/types/schemas/currentIntermission';
import {Stopwatch} from '../../../../src/types/schemas/stopwatch';

const {customElement, property} = Polymer.decorators;

const currentIntermission = nodecg.Replicant<CurrentIntermission>('currentIntermission');
const currentRun = nodecg.Replicant<Run>('currentRun');
const schedule = nodecg.Replicant<ScheduleItem[]>('schedule');
const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');

@customElement('ui-rundown')
export default class UiRundownElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	schedule: ScheduleItem[];

	@property({type: Array})
	remainderItems: ScheduleItem[];

	@property({type: Array})
	currentItems: (ScheduleItem | IntermissionContentItem)[];

	@property({type: Number, observer: UiRundownElement.prototype._maxRunsToShowChanged})
	maxRunsToShow = 4;

	@property({type: Boolean, reflectToAttribute: true})
	allowScrollback = false;

	private _futureStartIndex: number;
	private _updateScheduleSliceDebouncer: Polymer.Debouncer;

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
		(this.$.remainderItems as any).scrollToIndex(this._futureStartIndex);
	}

	_debounceUpdateScheduleSlice() {
		this._updateScheduleSliceDebouncer = Polymer.Debouncer.debounce(
			this._updateScheduleSliceDebouncer,
			Polymer.Async.timeOut.after(10),
			this._updateScheduleSlice
		);
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

		let currentItems: (ScheduleItem | IntermissionContentItem)[] = [currentRun.value];
		if (currentIntermission.value.preOrPost === 'pre') {
			currentItems = [
				...currentIntermission.value.content,
				...currentItems
			];
		} else {
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

			if (item.type !== 'run' && (item as any).order === lastRunOrder) {
				endIndex = index;
				return false;
			}

			return true;
		});

		if (this.allowScrollback) {
			this.remainderItems = schedule.value.slice(0);
			this._futureStartIndex = startIndex;
			this.scrollToFuture();
		} else {
			this.remainderItems = endIndex > -1 ?
				schedule.value.slice(startIndex, startIndex + endIndex + 1) :
				schedule.value.slice(startIndex);
		}

		this.currentItems = currentItems;
	}

	_maxRunsToShowChanged() {
		this._debounceUpdateScheduleSlice();
	}

	_showTooltip(e: Event) {
		const notes = (e as any).model.item.notes;
		if (!notes || notes.trim().length <= 0 || !e.target) {
			return;
		}

		this.$['tooltip-content'].innerHTML = notes
			.replace(/\r\n/g, '<br/>')
			.replace(/\n/g, '<br/>');

		const thisRect = this.getBoundingClientRect();
		const itemRect = (e.target as HTMLElement).getBoundingClientRect();
		const tooltipRect = this.$['tooltip-content'].getBoundingClientRect();
		const offset = -4;

		const tooltip = this.$.tooltip as HTMLDivElement;
		tooltip.style.opacity = '1';
		tooltip.style.top = `${itemRect.top - thisRect.top - tooltipRect.height + offset}px`;
	}

	_hideTooltip() {
		(this.$.tooltip as HTMLDivElement).style.opacity = '0';
	}
}
