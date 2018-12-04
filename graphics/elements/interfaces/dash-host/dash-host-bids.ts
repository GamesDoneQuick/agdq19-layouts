import {ParentBid, Run} from '../../../../src/types';
import AtomRefreshIndicatorElement from '../../atoms/atom-refresh-indicator/atom-refresh-indicator';

const {customElement, property} = Polymer.decorators;
const allBids = nodecg.Replicant<ParentBid[]>('allBids');
const currentRun = nodecg.Replicant<Run>('currentRun');
const runOrderMap = nodecg.Replicant<string[]>('runOrderMap');

@customElement('dash-host-bids')
export default class DashHostBidsElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	relevantBids: ParentBid[];

	@property({type: String, notify: true})
	bidFilterString: string;

	@property({type: Object})
	dialogBid: ParentBid;

	@property({type: Array})
	bidTypes = ['choice-many', 'choice-binary'];

	ready() {
		super.ready();
		allBids.on('change', () => {
			this.recalcRelevantBids();
		});

		currentRun.on('change', () => {
			this.recalcRelevantBids();
		});

		runOrderMap.on('change', () => {
			this.recalcRelevantBids();
		});

		nodecg.listenFor('bids:updating', () => {
			(this.$.cooldown as AtomRefreshIndicatorElement).indeterminate = true;
		});

		nodecg.listenFor('bids:updated', () => {
			(this.$.cooldown as AtomRefreshIndicatorElement).startCountdown(60);
		});
	}

	closeDialog() {
		(this.$.dialog as PaperDialogElement).close();
	}

	computeBidsFilter(str: string) {
		if (str) {
			// Return a filter function for the current search string.
			const regexp = new RegExp(escapeRegExp(str), 'ig');
			return (bid: ParentBid) => {
				return regexp.test(bid.description);
			};
		}

		// Set filter to null to disable filtering.
		return null;
	}

	recalcRelevantBids() {
		if (allBids.status !== 'declared' ||
			currentRun.status !== 'declared' ||
			runOrderMap.status !== 'declared' ||
			!allBids.value ||
			!runOrderMap.value ||
			!currentRun.value) {
			return;
		}

		this.relevantBids = allBids.value.filter(bid => {
			if (!this.bidTypes.includes(bid.type)) {
				return false;
			}

			if (bid.speedrun in runOrderMap.value!) {
				return (runOrderMap.value! as any)[bid.speedrun] >= (currentRun.value! as any).order;
			}

			return true;
		}).sort((a, b) => {
			return (runOrderMap.value! as any)[a.speedrun] - (runOrderMap.value! as any)[b.speedrun];
		});
	}

	calcBidName(description: string) {
		return description.replace('||', ' -- ');
	}

	_handleBidTap(e: any) {
		if (e.target.bid.type !== 'choice-many') {
			return;
		}

		this.dialogBid = e.target.bid;
		(this.$.dialog as PaperDialogElement).open();
	}
}

function escapeRegExp(text: string) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
