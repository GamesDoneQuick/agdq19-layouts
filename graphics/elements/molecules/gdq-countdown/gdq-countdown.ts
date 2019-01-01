import {TimelineLite, TweenLite, Sine} from 'gsap';
import {CountdownRunning} from '../../../../src/types/schemas/countdownRunning';
import {Countdown} from '../../../../src/types/schemas/countdown';
import {NowPlaying} from '../../../../src/types/schemas/nowPlaying';
import {typeAnim} from '../../../../shared/lib/type-anims';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';

const {customElement, property} = Polymer.decorators;

const countdownRunning = nodecg.Replicant<CountdownRunning>('countdownRunning');
const countdownTime = nodecg.Replicant<Countdown>('countdown');
const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-countdown')
export default class GDQCountdownElement extends Polymer.Element {
	@property({type: Object})
	private readonly countdownTimeline: TimelineLite = new TimelineLite({autoRemoveChildren: true});

	private _initialized: boolean;
	private _didTweenRed: boolean;
	private _didTweenTeal: boolean;
	private _fooTimeout?: number;
	private _fooDebouncer: Polymer.Debouncer | null = null;
	private _coldOpenStarted = false;
	private _soundTick: number;

	ready() {
		super.ready();
		TweenLite.set(this.$.countdown, {opacity: 0});

		countdownRunning.on('change', newVal => {
			if (newVal) {
				this.showTimer();
				this._coldOpenStarted = false;
			} else {
				this._debounceFoo();
			}
		});

		countdownTime.on('change', newVal => {
			(this.$.countdownMinutesTens as HTMLDivElement).innerText = String(Math.floor(newVal.minutes / 10));
			(this.$.countdownMinutesOnes as HTMLDivElement).innerText = String(newVal.minutes % 10);
			(this.$.countdownSecondsTens as HTMLDivElement).innerText = String(Math.floor(newVal.seconds / 10));
			(this.$.countdownSecondsOnes as HTMLDivElement).innerText = String(newVal.seconds % 10);

			if (newVal.raw <= 60000) {
				if (!this._didTweenRed) {
					this._didTweenRed = true;
					this._didTweenTeal = false;
					TweenLite.to(this.$.countdown, 1, {
						color: '#ED5A5A',
						ease: Sine.easeInOut
					});
				}
			} else if (!this._didTweenTeal) { // eslint-disable-line no-lonely-if
				this._didTweenRed = false;
				this._didTweenTeal = true;
				TweenLite.to(this.$.countdown, 1, {
					color: '#00FFFF',
					ease: Sine.easeInOut
				});
			}

			if (newVal.raw <= 60000 && newVal.raw > 0) {
				const currentSecond = Math.floor(newVal.raw / 1000);
				if (currentSecond !== this._soundTick) {
					nodecg.playSound('tally');
					this._soundTick = currentSecond;
				}
			}

			if (newVal.raw === 0 && this._coldOpenStarted === false) {
				this._coldOpenStarted = true;
				this.playOpen();
			}

			if (newVal.raw <= 0) {
				this.$.countdown.classList.add('blink');
				this._debounceFoo();
			} else {
				this.$.countdown.classList.remove('blink');
			}
		});

		nowPlaying.on('change', newVal => {
			this.$.nowPlaying.textContent = `${newVal.game || '?'} - ${newVal.title || '?'}`;
			typeAnim(this.$.nowPlaying as HTMLDivElement);
		});

		(this.$.coldopen as HTMLVideoElement).addEventListener('ended', () => {
			TweenLite.to(this.$.coldopen, 1, {
				delay: 2,
				opacity: 0,
				onComplete: () => {
					(this.$.coldopen as HTMLVideoElement).currentTime = 0;
					TweenLite.set(this.$.coldopen, {opacity: 1});
				}
			});
		});
	}

	playOpen() {
		(this.$.coldopen as HTMLVideoElement).play();
	}

	showTimer() {
		if (!this._initialized) {
			this._initialized = true;
		}

		clearTimeout(this._fooTimeout);

		const tl = this.countdownTimeline;

		tl.add(createMaybeRandomTween({
			target: (this.$.pressStart as HTMLDivElement).style,
			propName: 'opacity',
			duration: 0.465,
			start: {probability: 1, normalValue: 1},
			end: {probability: 0, normalValue: 0}
		}), 'flickerTotal');

		tl.set(this.$.countdown, {opacity: 1});
		tl.staggerFromTo([
			this.$.countdownMinutesTens,
			this.$.countdownMinutesOnes,
			this.$.countdownColon,
			this.$.countdownSecondsTens,
			this.$.countdownSecondsOnes
		], 0.001, {
			visibility: 'hidden'
		}, {
			visibility: 'visible'
		}, 0.03);
	}

	hideTimer() {
		if (!this._initialized) {
			this._initialized = true;
			return;
		}

		const tl = this.countdownTimeline;

		tl.add(createMaybeRandomTween({
			target: (this.$.countdown as HTMLDivElement).style,
			propName: 'opacity',
			duration: 0.465,
			start: {probability: 1, normalValue: 1},
			end: {probability: 0, normalValue: 0}
		}), 'flickerTotal');

		tl.set(this.$.pressStart, {opacity: 1});
		tl.add(typeAnim(this.$.pressStart as HTMLDivElement));
	}

	_debounceFoo() {
		this._fooDebouncer = Polymer.Debouncer.debounce(
			this._fooDebouncer,
			Polymer.Async.timeOut.after(300),
			this._foo.bind(this)
		);
	}

	_foo() {
		clearTimeout(this._fooTimeout);
		if (countdownRunning.value === false) {
			if (countdownTime.value && countdownTime.value.raw <= 0) {
				this._fooTimeout = window.setTimeout(() => {
					this.hideTimer();
				}, 120);
			} else {
				this.hideTimer();
			}
		}
	}
}
