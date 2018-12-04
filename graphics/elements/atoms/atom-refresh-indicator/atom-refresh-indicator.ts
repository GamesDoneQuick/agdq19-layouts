const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-refresh-indicator')
export default class AtomRefreshIndicatorElement extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true, observer: AtomRefreshIndicatorElement.prototype._indeterminateChanged})
	indeterminate = true;

	@property({type: String})
	timeUntilRefresh = ':??';

	private _countdownInterval?: number;

	startCountdown(seconds: number) {
		const meterFillElem = this.$['meter-fill'] as HTMLDivElement;
		this.indeterminate = false;
		this.stopCountdown();
		meterFillElem.style.transform = '';

		const startTimestamp = Date.now();
		this._countdownInterval = window.setInterval(() => {
			const nowTimestamp = Date.now();
			const millisecondsElapsed = nowTimestamp - startTimestamp;
			const secondsRemaining = seconds - Math.ceil(millisecondsElapsed / 1000);
			const percentElapsed = Math.min(millisecondsElapsed / (seconds * 1000), 1) * 100;

			meterFillElem.style.transform = `translateX(-${percentElapsed}%)`;
			this.timeUntilRefresh = `:${String(secondsRemaining).padStart(2, '0')}`;

			if (secondsRemaining <= 0) {
				clearInterval(this._countdownInterval);
				this.indeterminate = true;
			}
		}, 1 / 60);
	}

	stopCountdown() {
		if (this._countdownInterval) {
			clearInterval(this._countdownInterval);
		}
	}

	_indeterminateChanged(newVal: boolean) {
		if (newVal) {
			this.stopCountdown();
			this.timeUntilRefresh = ':00';
		}
	}
}
