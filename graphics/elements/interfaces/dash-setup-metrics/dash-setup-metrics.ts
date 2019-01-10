import {SetupMetrics} from '../../../../src/types/schemas/setupMetrics';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('dash-setup-metrics')
export default class DashSetupMetricsElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	setupMetrics: SetupMetrics;
}
