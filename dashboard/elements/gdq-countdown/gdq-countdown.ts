import TimeInputElement from '../time-input/time-input';
import {Countdown} from '../../../src/types/schemas/countdown';
import {CountdownRunning} from '../../../src/types/schemas/countdownRunning';

const {customElement} = Polymer.decorators;
const countdownRunning = nodecg.Replicant<CountdownRunning>('countdownRunning');
const countdown = nodecg.Replicant<Countdown>('countdown');

@customElement('gdq-countdown')
export default class GDQCountdownElement extends Polymer.Element {
	connectedCallback() {
		super.connectedCallback();

		Polymer.RenderStatus.beforeNextRender(this, () => {
			countdown.on('change', newVal => {
				if (newVal) {
					const timeInput = this.$.timeInput as TimeInputElement;
					timeInput.setMS(newVal.minutes, newVal.seconds);
				}
			});

			countdownRunning.on('change', newVal => {
				if (newVal) {
					this.$.countdownContainer.setAttribute('disabled', 'true');
					this.$.start.setAttribute('disabled-running', 'true');
					this.$.stop.removeAttribute('disabled');
				} else {
					this.$.countdownContainer.removeAttribute('disabled');
					this.$.start.removeAttribute('disabled-running');
					this.$.stop.setAttribute('disabled', 'true');
				}

				this.checkStartButton();
			});
		});
	}

	start() {
		nodecg.sendMessage('startCountdown', (this.$.timeInput as TimeInputElement).value);
	}

	stop() {
		nodecg.sendMessage('stopCountdown');
	}

	_handleTimeInvalidChanged(e: Event) {
		if ((e as any).detail && (e as any).detail.value) {
			this.$.start.setAttribute('disabled-invalid', 'true');
		} else {
			this.$.start.removeAttribute('disabled-invalid');
		}

		this.checkStartButton();
	}

	/**
	 * Enables or disables the timer start button based on some criteria.
	 */
	checkStartButton() {
		if (this.$.start.hasAttribute('disabled-invalid') || this.$.start.hasAttribute('disabled-running')) {
			this.$.start.setAttribute('disabled', 'true');
		} else {
			this.$.start.removeAttribute('disabled');
		}
	}
}
