import {Ff4FeRandoBoards, Goal} from '../../../../src/types/schemas/ff4feRandoBoards';
import {AbstractLocalRando} from '../../../classes/rando/abstract-local-rando';

const {customElement, property} = Polymer.decorators;
const boardsRep = nodecg.Replicant<Ff4FeRandoBoards>('ff4feRandoBoards');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-ff4fe-tracker')
export default class GDQFF4FETrackerElement extends AbstractLocalRando<Goal> {
	@property({type: Array})
	goals: Goal[];

	@property({type: Number})
	index: number;

	ready() {
		super.ready();
		boardsRep.on('change', newVal => {
			this.goals = newVal[this.index];
		});
	}
}
