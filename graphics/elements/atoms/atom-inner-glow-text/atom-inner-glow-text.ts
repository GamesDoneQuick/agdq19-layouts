const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-inner-glow-text')
export default class AtomInnerGlowTextElement extends Polymer.Element {
	@property({type: String})
	text: string;
}
