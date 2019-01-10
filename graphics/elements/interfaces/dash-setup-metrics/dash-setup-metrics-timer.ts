const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('dash-setup-metrics-timer')
export default class DashSetupMetricsTimerElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: String})
	label: string;

	@property({type: String})
	time: string;
}
