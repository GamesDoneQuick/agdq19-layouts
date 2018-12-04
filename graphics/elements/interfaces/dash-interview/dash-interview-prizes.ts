import {Prize} from '../../../../src/types';
import {Interview3AprizePlaylist} from '../../../../src/types/schemas/interview%3AprizePlaylist';

const {customElement, property} = Polymer.decorators;
const allPrizesRep = nodecg.Replicant<Prize[]>('allPrizes');
const prizePlaylistRep = nodecg.Replicant<Interview3AprizePlaylist>('interview:prizePlaylist');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('dash-interview-prizes')
export default class DashInterviewPrizesElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	allPrizes: Prize[];

	@property({type: Array})
	prizePlaylist: Interview3AprizePlaylist;

	@property({type: String})
	searchString = '';

	ready() {
		super.ready();

		allPrizesRep.on('change', newVal => {
			this.allPrizes = newVal;
		});

		prizePlaylistRep.on('change', newVal => {
			this.prizePlaylist = newVal;
		});
	}

	clearFilter() {
		this.searchString = '';
	}

	addPrizeToPlayList(prizeOrPrizeId: Prize | number) {
		const prizeId = disambiguatePrizeId(prizeOrPrizeId);
		nodecg.sendMessage('interview:addPrizeToPlaylist', prizeId);
	}

	removePrizeFromPlaylist(prizeOrPrizeId: Prize | number) {
		const prizeId = disambiguatePrizeId(prizeOrPrizeId);
		nodecg.sendMessage('interview:removePrizeFromPlaylist', prizeId);
	}

	clearPlaylist() {
		nodecg.sendMessage('interview:clearPrizePlaylist');
	}

	_calcClearIconHidden(searchString: string) {
		return !searchString || searchString.length <= 0;
	}

	_calcPrizesToList(allPrizes?: Prize[], searchString?: string) {
		if (!allPrizes || allPrizes.length <= 0) {
			return [];
		}

		if (!searchString || searchString.trim().length === 0) {
			return allPrizes;
		}

		return allPrizes.filter(prize => {
			return prize.description.toLowerCase().includes(searchString.toLowerCase());
		});
	}

	_isPrizeInPlaylist(prizeOrPrizeId: Prize | number, prizePlaylist: Interview3AprizePlaylist) {
		if (!prizePlaylist) {
			return false;
		}

		const prizeId = disambiguatePrizeId(prizeOrPrizeId);
		return prizePlaylist.findIndex(({id}) => id === prizeId) >= 0;
	}

	_calcClearPlaylistDisabled(prizePlaylist: Interview3AprizePlaylist) {
		return !prizePlaylist || prizePlaylist.length <= 0;
	}

	_handlePrizeListingAddTap(e: any) {
		this.addPrizeToPlayList(e.model.prize);
	}

	_handlePrizeListingRemoveTap(e: any) {
		this.removePrizeFromPlaylist(e.model.prize);
	}

	_calcPrizesInPlaylist(allPrizes?: Prize[], prizePlaylist?: Interview3AprizePlaylist) {
		if (!allPrizes || allPrizes.length === 0 ||
			!prizePlaylist || prizePlaylist.length === 0) {
			return [];
		}

		return prizePlaylist.map(playlistEntry => {
			return allPrizes.find(prize => {
				return prize.id === playlistEntry.id;
			});
		});
	}

	_calcPlaylistPrizeChecked(prize?: Prize, prizePlaylist?: Interview3AprizePlaylist) {
		if (!prize || !prizePlaylist || prizePlaylist.length <= 0) {
			return false;
		}

		console.log(prize, prizePlaylist);

		const playlistEntry = prizePlaylist.find(pe => pe.id === prize.id);
		if (!playlistEntry) {
			return false;
		}

		return playlistEntry.complete;
	}
}

/**
 * Given a prize Object or prize ID Number, will always return a prize ID Number.
 * @param prizeOrPrizeId - Either a prize Object or a prize ID Number.
 * @returns A prize ID Number.
 */
function disambiguatePrizeId(prizeOrPrizeId?: Prize | number) {
	return typeof prizeOrPrizeId === 'object' ?
		prizeOrPrizeId.id :
		prizeOrPrizeId;
}
