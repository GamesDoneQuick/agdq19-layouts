const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-header')
export default class GDQBreakHeaderElement extends Polymer.Element {
	@property({type: String})
	text: string;
}
