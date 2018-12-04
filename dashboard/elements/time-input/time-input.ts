const {customElement, property, observe} = Polymer.decorators;

@customElement('time-input')
export default class TimeInputElement extends Polymer.mixinBehaviors([Polymer.IronValidatableBehavior], Polymer.Element) {
	@property({type: Boolean, reflectToAttribute: true})
	invalid = false;

	@property({type: String, notify: true})
	value: string;

	@property({type: Number})
	_minutes: number | string;

	@property({type: Number})
	_seconds: number | string;

	@property({type: String})
	validator = 'time-validator';

	@observe('_minutes', '_seconds')
	_computeValue(minutes: number, seconds: number) {
		this.value = `${minutes}:${seconds}`;
	}

	setMS(m: number, s: number) {
		this._minutes = m < 10 ? `0${m}` : m;
		this._seconds = s < 10 ? `0${s}` : s;
	}
}
