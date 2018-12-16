import {TimelineLite, Sine} from 'gsap';
import {Run, ScheduleItem} from '../../../../src/types/index';
import GDQBreakScheduleRunElement from './gdq-break-schedule-run';

const {customElement, property} = Polymer.decorators;

const currentRun = nodecg.Replicant<Run>('currentRun');
const nextRun = nodecg.Replicant<Run>('nextRun');
const schedule = nodecg.Replicant<ScheduleItem[]>('schedule');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-schedule')
export default class GDQBreakScheduleElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	upNext: Run;

	@property({type: Array})
	onDeck: Run[];

	_$runs: NodeListOf<GDQBreakScheduleRunElement>;
	_updateDebouncer: Polymer.Debouncer;

	ready() {
		super.ready();

		currentRun.on('change', () => {
			this.update();
		});

		schedule.on('change', () => {
			this.update();
		});

		this._$runs = this.shadowRoot!.querySelectorAll('gdq-break-schedule-run') as NodeListOf<GDQBreakScheduleRunElement>;
	}

	update() {
		this._updateDebouncer = Polymer.Debouncer.debounce(
			this._updateDebouncer,
			Polymer.Async.timeOut.after(16),
			this._update.bind(this)
		);
	}

	_update() {
		const tl = new TimelineLite();

		if (schedule.status !== 'declared' ||
			currentRun.status !== 'declared' ||
			!schedule.value ||
			!currentRun.value) {
			return tl;
		}

		tl.set(this._$runs, {willChange: 'opacity'});

		tl.to(this._$runs, 0.5, {
			opacity: 0,
			ease: Sine.easeInOut
		}, '+=0.25');

		tl.call(() => {
			this.upNext = currentRun.value!;

			const onDeckRuns = [nextRun.value!];
			schedule.value!.some(item => {
				if (item.type !== 'run' || !nextRun.value) {
					return false;
				}

				if (item.order <= nextRun.value!.order) {
					return false;
				}

				onDeckRuns.push(item);
				return onDeckRuns.length >= 3;
			});
			this.onDeck = onDeckRuns;
		});

		tl.to(this._$runs, 0.5, {
			opacity: 1,
			ease: Sine.easeInOut
		}, '+=0.1');

		tl.set(this._$runs, {clearProps: 'will-change'});

		return tl;
	}

	_getArrayItem(array: any[], index: number) {
		if (!array) {
			return null;
		}

		return array[index];
	}
}
