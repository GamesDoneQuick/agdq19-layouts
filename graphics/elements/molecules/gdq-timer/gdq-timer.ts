import {TimelineLite, Power2} from 'gsap';
import {Stopwatch} from '../../../../src/types/schemas/stopwatch';

const {customElement, property} = Polymer.decorators;

const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');

@customElement('gdq-timer')
export default class GDQTimerElement extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true})
	notStarted: boolean;

	@property({type: Boolean, reflectToAttribute: true, observer: GDQTimerElement.prototype.pausedChanged})
	paused: boolean;

	@property({type: Boolean, reflectToAttribute: true, observer: GDQTimerElement.prototype.finishedChanged})
	finished: boolean;

	@property({type: Number})
	hours: number;

	@property({type: Number})
	minutes: number;

	@property({type: Number})
	seconds: number;

	@property({type: Number})
	milliseconds: number;

	ready() {
		super.ready();

		const timerTL = new TimelineLite({autoRemoveChildren: true});
		stopwatch.on('change', (newVal, oldVal) => {
			this.hours = newVal.time.hours;
			this.minutes = newVal.time.minutes;
			this.seconds = newVal.time.seconds;
			this.milliseconds = newVal.time.milliseconds;

			if (oldVal) {
				if (newVal.state === 'running' && oldVal.state !== 'running') {
					this._flash(timerTL);
				} else if (newVal.state !== 'running' && newVal.state !== oldVal.state) {
					timerTL.clear();
					(this.$.startFlash as HTMLDivElement).style.opacity = '0';
				}

				if (newVal.state === 'finished' && oldVal.state !== 'finished') {
					this._flash(timerTL);
				}
			}

			this.notStarted = newVal.state === 'not_started';
			this.paused = newVal.state === 'paused';
			this.finished = newVal.state === 'finished';
		});
	}

	pausedChanged(newVal: boolean) {
		if (newVal && this.finished) {
			this.finished = false;
		}
	}

	finishedChanged(newVal: boolean) {
		if (newVal && this.paused) {
			this.paused = false;
		}
	}

	_lessThanEqZero(num: number) {
		return num <= 0;
	}

	_padTime(num: number) {
		return String(num).padStart(2, '0');
	}

	_formatMilliseconds(milliseconds: number) {
		return Math.floor(milliseconds / 100);
	}

	_flash(timeline: TimelineLite) {
		return timeline.fromTo(this.$.startFlash, 1, {
			opacity: 0.5
		}, {
			opacity: 0,
			ease: Power2.easeIn
		});
	}
}
