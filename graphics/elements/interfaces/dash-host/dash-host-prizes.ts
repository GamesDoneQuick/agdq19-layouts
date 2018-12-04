import {Prize} from '../../../../src/types';
import AtomRefreshIndicatorElement from '../../atoms/atom-refresh-indicator/atom-refresh-indicator';

const {customElement, property} = Polymer.decorators;
const currentPrizes = nodecg.Replicant<Prize[]>('currentPrizes');

@customElement('dash-host-prizes')
export default class DashHostPrizesElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	prizes: Prize[];

	@property({type: String, notify: true})
	prizeFilterString: string;

	ready() {
		super.ready();
		currentPrizes.on('change', newVal => {
			this.prizes = newVal;
		});

		nodecg.listenFor('prizes:updating', () => {
			(this.$.cooldown as AtomRefreshIndicatorElement).indeterminate = true;
		});

		nodecg.listenFor('prizes:updated', () => {
			(this.$.cooldown as AtomRefreshIndicatorElement).startCountdown(60);
		});
	}

	computePrizesFilter(str: string) {
		if (str) {
			// Return a filter function for the current search string.
			const regexp = new RegExp(str, 'ig');
			return (prize: Prize) => {
				return regexp.test(prize.description);
			};
		}

		// Set filter to null to disable filtering.
		return null;
	}
}
