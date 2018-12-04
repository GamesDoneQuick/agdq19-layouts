import {Scores} from '../../../src/types/schemas/scores';

const {customElement, property} = Polymer.decorators;
const scoresRep = nodecg.Replicant<Scores>('scores');

@customElement('gdq-marioscores')
export default class GDQMarioScoresElement extends Polymer.Element {
	@property({type: Object})
	scores: Scores;

	ready() {
		super.ready();
		scoresRep.on('change', newVal => {
			if (newVal) {
				this.scores = newVal;
			}
		});
	}

	_scoreInputChanged(e: Event) {
		if (!scoresRep.value || !e.target) {
			return;
		}

		const target = e.target as PaperInputElement;
		const teamIndex = parseInt(String(target.getAttribute('data-team-index')), 10);
		const val = parseInt(String(target.value), 10);
		if (typeof val === 'number' && !isNaN(val)) {
			scoresRep.value[teamIndex] = val;
		}
	}
}
