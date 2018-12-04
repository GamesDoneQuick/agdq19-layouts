import {CurrentHost} from '../../../../src/types/schemas/currentHost';

const {customElement, property} = Polymer.decorators;
const currentHost = nodecg.Replicant<CurrentHost>('currentHost');

/**
 * @customElement
 * @polymer
 */
@customElement('dash-host-name')
export default class DashHostNameElement extends Polymer.Element {
	@property({type: String})
	currentHost: string;

	@property({type: String})
	_enteredName = '';

	ready() {
		super.ready();
		currentHost.on('change', newVal => {
			this.currentHost = newVal;
		});
	}

	take() {
		currentHost.value = this._enteredName;
		this._enteredName = '';
	}

	_falsey(value: any) {
		return !value;
	}
}
