const {customElement, property} = Polymer.decorators;

const enum STATUS {
	MISSING_FILES = 'MISSING_FILES',
	CONNECTED = 'CONNECTED',
	DISCONNECTED = 'DISCONNECTED'
}

/**
 * @customElement
 * @polymer
 */
@customElement('ui-system-status-caspar')
export default class UiSystemStatusCasparElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: String, computed: '_computeStatus(_connected, _missingFiles.*)', reflectToAttribute: true})
	status: STATUS = STATUS.DISCONNECTED;

	@property({type: Boolean})
	protected _connected: boolean;

	@property({type: Array})
	protected _missingFiles: string[];

	_computeStatus(): STATUS {
		if (this._missingFiles && this._missingFiles.length > 0) {
			return STATUS.MISSING_FILES;
		}

		return this._connected ? STATUS.CONNECTED : STATUS.CONNECTED;
	}
}
