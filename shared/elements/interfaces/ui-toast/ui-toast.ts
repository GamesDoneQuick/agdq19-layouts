const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('ui-toast')
export default class UiToastElement extends Polymer.Element {
	@property({type: String})
	_successToastText: string;

	@property({type: String})
	_errorToastText: string;

	showSuccessToast(text: string) {
		this._successToastText = text;
		(this.$.successToast as PaperToastElement).show();
	}

	showErrorToast(text: string) {
		this._errorToastText = text;
		(this.$.errorToast as PaperToastElement).show();
	}
}
