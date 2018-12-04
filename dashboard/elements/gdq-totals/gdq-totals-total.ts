const {customElement, property} = Polymer.decorators;

@customElement('gdq-totals-total')
export default class GDQTotalsTotalElement extends Polymer.Element {
	@property({type: String})
	value = '?';

	@property({type: String})
	currency: String;

	edit() {
		this.dispatchEvent(new CustomEvent('edit', {bubbles: true, composed: true}));
	}

	equal(a: any, b: any) {
		return a === b;
	}
}
