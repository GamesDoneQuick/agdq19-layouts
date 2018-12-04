const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-gradient-text')
export default class AtomGradientTextElement extends Polymer.Element {
	@property({type: String})
	text: string;

	@property({type: String, reflectToAttribute: true})
	align: string;

	@property({type: Number})
	maxWidth: number;

	ready() {
		super.ready();

		// Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880
		this.shadowRoot!.querySelectorAll('sc-fitted-text').forEach(node => {
			(node as any).$.fittedContent.style.webkitBackgroundClip = 'text';
		});
	}
}
