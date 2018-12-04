import {Prize, Run} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;
const currentRunRep = nodecg.Replicant<Run>('currentRun');

/**
 * @customElement
 * @polymer
 */
@customElement('dash-interview-monitor-prize')
export default class DashInterviewMonitorPrizeElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	prize: Prize;

	@property({type: Object})
	currentRun: Run;

	@property({type: String, reflectToAttribute: true, computed: '_computeBidType(prize)'})
	bidType: string;

	@property({type: Boolean, reflectToAttribute: true, computed: '_computeClosed(prize, currentRun)'})
	closed: boolean;

	ready() {
		super.ready();

		currentRunRep.on('change', newVal => {
			this.currentRun = newVal;
		});
	}

	_computeBidType(prize: Prize) {
		return prize.sumdonations ? 'total' : 'single';
	}

	_computeClosed(prize?: Prize, currentRun?: Run) {
		if (!prize || !currentRun) {
			return false;
		}

		return prize.endrun.order < currentRun.order;
	}

	_calcBidTypeChar(bidType?: string) {
		if (!bidType) {
			return '';
		}
		return bidType.charAt(0);
	}

	_calcOpening(prize?: Prize, currentRun?: Run) {
		if (!prize || !currentRun) {
			return '?';
		}

		if (prize.startrun.order <= currentRun.order) {
			return 'OPEN';
		}

		return prize.startrun.name;
	}

	_calcClosing(prize?: Prize, currentRun?: Run) {
		if (!prize || !currentRun) {
			return '?';
		}

		if (prize.endrun.order < currentRun.order) {
			return 'CLOSED';
		}

		return prize.endrun.name;
	}
}
