import {ChildBid, ParentBid} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

@customElement('dash-host-bid')
export default class DashHostBidElement extends Polymer.MutableData(Polymer.Element) {
	@property({
		type: String,
		reflectToAttribute: true,
		computed: '_computeType(bid)'
	})
	type: string;

	@property({type: Object})
	bid: ParentBid;

	@property({
		type: Boolean,
		computed: 'computeFailed(closed, bid)',
		reflectToAttribute: true
	})
	failed: boolean;

	@property({
		type: Boolean,
		computed: 'computeClosed(bid)',
		reflectToAttribute: true
	})
	closed: boolean;

	computeFailed(closed: boolean, bid: ParentBid) {
		return closed && bid.rawTotal < bid.rawGoal;
	}

	computeClosed(bid: ParentBid) {
		return bid.state.toLowerCase() === 'closed';
	}

	bidIsChallenge(bid: ParentBid) {
		return bid.type === 'challenge';
	}

	limitOptions(options: ChildBid[]) {
		if (!options) {
			return [];
		}

		return options.slice(0, 3);
	}

	bidHasMoreThanThreeOptions(bid: ParentBid) {
		if (!bid.options) {
			return false;
		}

		return bid.options.length > 3;
	}

	calcNumAdditionalOptions(bid: ParentBid) {
		if (!bid.options) {
			return 0;
		}

		return bid.options.length - 3;
	}

	calcBidName(description: string) {
		return description.replace(/\\n/g, ' ');
	}

	_computeType(bid: ParentBid) {
		return bid ? bid.type : '';
	}
}
