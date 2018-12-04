import {Obs3AcyclingRecordings} from '../../../../src/types/schemas/obs%3AcyclingRecordings';
import {CONNECTION_STATUS, WebsocketStatus} from '../../../../src/types/nodecg-obs';

const {customElement, property} = Polymer.decorators;
const cyclingRecordingsRep = nodecg.Replicant<Obs3AcyclingRecordings>('obs:cyclingRecordings');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('ui-obs-status-item')
export default class UiObsStatusItemElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: String})
	namespace: string;

	@property({type: String, reflectToAttribute: true})
	status: string;

	_websocket: WebsocketStatus;
	_cyclingRecordings: boolean;

	static get observers() {
		return [
			'_updateStatus(_websocket.status, _cyclingRecordings)'
		];
	}

	ready() {
		super.ready();
		cyclingRecordingsRep.on('change', newVal => {
			this._cyclingRecordings = newVal;
		});
	}

	_transformsNamespace(namespace: string) {
		return namespace.slice(0, -3);
	}

	_updateStatus(websocketStatus: CONNECTION_STATUS, cyclingRecordings: boolean) {
		this.status = this._calcStatus(websocketStatus, cyclingRecordings);
	}

	_calcStatus(websocketStatus: CONNECTION_STATUS, cyclingRecordings: boolean) {
		if (websocketStatus === 'connected') {
			return cyclingRecordings ? 'cycling' : websocketStatus;
		}

		return websocketStatus;
	}
}
