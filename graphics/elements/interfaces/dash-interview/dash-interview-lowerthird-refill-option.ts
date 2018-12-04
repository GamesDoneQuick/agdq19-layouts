const {customElement, property} = Polymer.decorators;

@customElement('dash-interview-lowerthird-refill-option')
export default class DashInterviewLowerthirdRefillOptionElement extends Polymer.Element {
	@property({type: String, reflectToAttribute: true})
	type: string;

	@property({type: Array})
	names: string[];

	accept() {
		this.dispatchEvent(new CustomEvent('accepted', {
			detail: {
				names: this.names
					.filter(name => name !== '(none)')
					.map(name => {
						return {name};
					})
			}
		}));
	}
}
