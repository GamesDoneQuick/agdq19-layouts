const {customElement} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('ui-system-status')
export default class UiSystemStatusElement extends Polymer.MutableData(Polymer.Element) {}
