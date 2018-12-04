const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('ui-obs-status')
export default class UiObsStatusElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	_namespaces: string[];
}
