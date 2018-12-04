const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-runinfo-misc')
export default class GDQRuninfoMiscElement extends Polymer.Element {
	@property({type: Number})
	maxTextWidth: number;

	@property({type: String})
	console: string;

	@property({type: String})
	releaseYear: string;

	@property({type: String})
	estimate: string;
}
