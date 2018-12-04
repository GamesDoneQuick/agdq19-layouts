import AtomTweeningNumberElement from '../../atoms/atom-tweening-number/atom-tweening-number';
import {Total} from '../../../../src/types/schemas/total';

const {customElement} = Polymer.decorators;
const total = nodecg.Replicant<Total>('total');

@customElement('gdq-omnibar-total')
export default class GDQOmnibarTotalElement extends Polymer.Element {
	ready() {
		super.ready();
		const totalTextAmountElem = this.$.totalTextAmount as AtomTweeningNumberElement;
		totalTextAmountElem.displayValueTransform = this._totalDisplayValueTransform.bind(this);
		total.on('change', newVal => {
			totalTextAmountElem.value = newVal.raw;
		});
	}

	_totalDisplayValueTransform(displayValue: number) {
		const formatted = displayValue.toLocaleString('en-US', {
			maximumFractionDigits: 0,
			minimumFractionDigits: 0
		}).replace(/1/ig, '\u00C0');

		// Part of the workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=67029
		this.$.totalTextAmountPlaceholder.textContent = formatted;

		return formatted;
	}
}
