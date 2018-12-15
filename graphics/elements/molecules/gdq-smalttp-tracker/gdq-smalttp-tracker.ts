import {SmalttpData, Goal} from '../../../../src/types/schemas/smalttpData';
import {AbstractLocalRando} from '../../../classes/rando/abstract-local-rando';

const {customElement, property} = Polymer.decorators;
const smalttpData = nodecg.Replicant<SmalttpData>('smalttpData');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-smalttp-tracker')
export default class GDQSmalttpTrackerElement extends AbstractLocalRando<Goal> {
	@property({type: Array})
	goals: Goal[];

	ready() {
		super.ready();
		smalttpData.on('change', newVal => {
			this.goals = newVal;
		});
	}
}
