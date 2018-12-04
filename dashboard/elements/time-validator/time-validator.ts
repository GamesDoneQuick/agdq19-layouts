const {customElement} = Polymer.decorators;

@customElement('time-validator')
export default class TimeValidatorElement extends Polymer.mixinBehaviors([Polymer.IronValidatorBehavior], Polymer.Element) {
	validate(value: string) {
		// This regex validates incomplete times (by design)
		return !value || value.match(/^[0-9]{0,2}:[0-9]{0,2}$/);
	}
}
