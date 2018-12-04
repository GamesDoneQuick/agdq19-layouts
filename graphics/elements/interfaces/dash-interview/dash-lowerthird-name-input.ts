const {customElement, property} = Polymer.decorators;

@customElement('dash-lowerthird-name-input')
export default class DashLowerthirdNameInputElement extends Polymer.Element {
	@property({type: String, notify: true})
	selectedItem: string;

	@property({type: String, notify: true})
	name: string;

	@property({type: String, notify: true})
	title: string;

	@property({type: Boolean})
	disabled: boolean;

	@property({type: Array})
	items: string[];

	ready() {
		super.ready();
		const nameElem = this.$.name as any;
		nameElem.$.input.style.fontSize = '24px';
		nameElem.$.input.style.height = '45px';
		nameElem.$.toggleIcon.style.height = '100%';
		nameElem.$.toggleIcon.style.padding = '0';
		nameElem.$.clearIcon.style.height = '100%';
		nameElem.$.clearIcon.style.padding = '0';
	}

	clear() {
		const nameElem = this.$.name as any;
		nameElem.value = '';
		nameElem.value = '';
	}
}
