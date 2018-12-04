import {AdBreak, AdBreakState} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

@customElement('dash-host-adbreak')
export default class DashHostAdbreakElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	adBreak: AdBreak;

	start() {
		this.dispatchEvent(new CustomEvent('start', {
			detail: {
				adBreakId: this.adBreak.id
			},
			bubbles: true,
			composed: true
		}));
	}

	cancel() {
		this.dispatchEvent(new CustomEvent('cancel', {
			detail: {
				adBreakId: this.adBreak.id
			},
			bubbles: true,
			composed: true
		}));
	}

	complete() {
		this.dispatchEvent(new CustomEvent('complete', {
			detail: {
				adBreakId: this.adBreak.id
			},
			bubbles: true,
			composed: true
		}));
	}

	_calcStartButtonText(adBreakState: AdBreakState) {
		if (adBreakState.canStart) {
			return 'Start Break';
		}

		if (adBreakState.cantStartReason) {
			return adBreakState.cantStartReason;
		}

		return 'Prequisites unmet';
	}

	_calcCompleteButtonHidden(adBreak: AdBreak) {
		const lastAd = adBreak.ads[adBreak.ads.length - 1];
		return lastAd.adType.toLowerCase() !== 'image';
	}

	any(...args: any[]) {
		return args.find(arg => Boolean(arg));
	}
}
