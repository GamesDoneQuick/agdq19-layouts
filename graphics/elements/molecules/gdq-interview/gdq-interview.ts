const {customElement} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-interview')
export default class GdqInterviewElement extends Polymer.Element {
	showLowerthird(...args: any[]) {
		return (this.$.lowerthird as any).show(...args);
	}
}
