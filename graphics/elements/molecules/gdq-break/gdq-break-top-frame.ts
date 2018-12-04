import AtomTweeningNumberElement from '../../atoms/atom-tweening-number/atom-tweening-number';
import AtomTinyAlertsElement from '../../atoms/atom-tiny-alerts/atom-tiny-alerts';
import {Total} from '../../../../src/types/schemas/total';

const {customElement} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-top-frame')
export default class GDQBreakTopFrameElement extends Polymer.Element {
	ready() {
		super.ready();
		const totalTextAmountElem = this.$.totalTextAmount as AtomTweeningNumberElement;
		totalTextAmountElem.displayValueTransform = this._totalDisplayValueTransform.bind(this);

		nodecg.readReplicant('total', (totalVal: Total) => {
			totalTextAmountElem.value = totalVal.raw;
			nodecg.listenFor('donation', this._handleDonation.bind(this));
		});

		nodecg.listenFor('total:manuallyUpdated', (totalVal: Total) => {
			totalTextAmountElem.value = totalVal.raw;
		});
	}

	addDonationAlert(formattedAmount: string, rawAmount: number) {
		let backgroundColor = 'white';
		if (rawAmount >= 500) {
			backgroundColor = '#FF68B9';
		} else if (rawAmount >= 100) {
			backgroundColor = '#FFFBBD';
		} else if (rawAmount >= 20) {
			backgroundColor = '#00ffff';
		}

		(this.$.donationAlerts as AtomTinyAlertsElement).addAlert({
			text: formattedAmount,
			backgroundColor,
			holdDuration: rawAmount >= 500 ? 1 : 0.067
		});
	}

	_handleDonation(
		{amount, rawAmount, rawNewTotal}: { amount: string; rawAmount: number; rawNewTotal: number }
	) {
		this.addDonationAlert(amount, rawAmount);
		(this.$.totalTextAmount as AtomTweeningNumberElement).value = rawNewTotal;
	}

	_totalDisplayValueTransform(displayValue: number) {
		return displayValue.toLocaleString('en-US', {
			maximumFractionDigits: 0
		}).replace(/1/ig, '\u00C0');
	}
}
