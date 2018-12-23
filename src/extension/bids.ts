'use strict';

// Packages
import equal = require('deep-equal');
import * as numeral from 'numeral';
import * as request from 'request-promise-native';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import {GDQUrls} from './urls';
import {TrackerObject, ChildBid, ParentBid} from '../types';
import {BitsTotal} from '../types/schemas/bits_total';

const nodecg = nodecgApiContext.get();
const POLL_INTERVAL = 60 * 1000;
const currentBidsRep = nodecg.Replicant<ParentBid[]>('currentBids', {defaultValue: []});
const allBidsRep = nodecg.Replicant<ParentBid[]>('allBids', {defaultValue: []});
const bitsTotal = nodecg.Replicant<BitsTotal>('bits_total');

// Get latest bid data every POLL_INTERVAL milliseconds
update();

/**
 * Grabs the latest bids from the Tracker.
 */
async function update() {
	nodecg.sendMessage('bids:updating');

	const currentPromise = request({
		uri: GDQUrls.currentBids,
		json: true
	});

	const allPromise = request({
		uri: GDQUrls.allBids,
		json: true
	});

	try {
		const [currentBidsJSON, allBidsJSON] = await Promise.all([
			currentPromise, allPromise
		]);
		const currentBids = processRawBids(currentBidsJSON);
		const allBids = processRawBids(allBidsJSON);

		// Bits incentives are always marked as "hidden", so they will never show in "current".
		// We must manually add them to "current".
		allBids.forEach(bid => {
			if (!bid.isBitsChallenge) {
				return;
			}

			const bidAlreadyExistsInCurrentBids = currentBids.find(currentBid => currentBid.id === bid.id);
			if (!bidAlreadyExistsInCurrentBids) {
				currentBids.unshift(bid);
			}
		});

		if (!equal(allBidsRep.value, allBids)) {
			allBidsRep.value = allBids;
		}

		if (!equal(currentBidsRep.value, currentBids)) {
			currentBidsRep.value = currentBids;
		}
	} catch (error) {
		nodecg.log.error('Error updating bids:', error);
	} finally {
		nodecg.sendMessage('bids:updated');
		setTimeout(update, POLL_INTERVAL);
	}
}

function processRawBids(bids: TrackerObject[]) {
	// The response from the tracker is flat. This is okay for donation incentives, but it requires
	// us to do some extra work to figure out what the options are for donation wars that have multiple
	// options.
	const formattedParentBidsById: {[key: string]: ParentBid} = {};
	const rawChildBids: TrackerObject[] = [];

	bids.sort(sortRawBidsByEarliestEndTime).forEach(bid => {
		if (bid.fields.state.toLowerCase() === 'denied' ||
			bid.fields.state.toLowerCase() === 'pending' ||
			bid.fields.state.toLowerCase() === 'hidden') {
			return;
		}

		// If this bid is an option for a donation war, add it to childBids array.
		// Else, add it to the formattedParentBidsById object.
		if (bid.fields.parent) {
			rawChildBids.push(bid);
		} else {
			// Format the bid to clean up unneeded cruft.
			const formattedParentBid = {
				id: bid.pk,
				name: bid.fields.name,
				description: bid.fields.shortdescription || `No shortdescription for bid #${bid.pk}`,
				total: numeral(bid.fields.total).format('$0,0[.]00'),
				rawTotal: parseFloat(bid.fields.total),
				state: bid.fields.state,
				speedrun: bid.fields.speedrun__name,
				speedrunEndtime: Date.parse(bid.fields.speedrun__endtime),
				public: bid.fields.public,

				// Green Hill Zone Blindfolded or Blindfolded Majora? Then this is a bits challenge.
				isBitsChallenge: Boolean(bid.pk === 5788 || bid.pk === 5831)
			} as ParentBid;

			// If this parent bid is not a target, that means it is a donation war that has options.
			// So, we should add an options property that is an empty array,
			// which we will fill in the next step.
			// Else, add the "goal" field to the formattedParentBid.
			if (bid.fields.istarget === false) {
				formattedParentBid.options = [];
			} else {
				const goal = parseFloat(bid.fields.goal);
				formattedParentBid.goalMet = bid.fields.total >= bid.fields.goal;
				if (formattedParentBid.isBitsChallenge) {
					formattedParentBid.goal = numeral(goal * 100).format('0,0');
					formattedParentBid.rawGoal = goal * 100;
					formattedParentBid.rawTotal = Math.min(bitsTotal.value, formattedParentBid.rawGoal);
					formattedParentBid.total = numeral(formattedParentBid.rawTotal).format('0,0');
					formattedParentBid.goalMet = formattedParentBid.rawTotal >= formattedParentBid.rawGoal;
					formattedParentBid.state = formattedParentBid.goalMet ? 'CLOSED' : 'OPENED';
				} else {
					formattedParentBid.goal = numeral(goal).format('$0,0[.]00');
					formattedParentBid.rawGoal = goal;
				}
			}

			formattedParentBidsById[bid.pk] = formattedParentBid;
		}
	});

	// Now that we have a big array of all child bids (i.e., donation war options), we need
	// to assign them to their parents in the parentBidsById object.
	rawChildBids.forEach(bid => {
		const formattedChildBid = {
			description: bid.fields.shortdescription,
			id: bid.pk,
			name: bid.fields.name,
			parent: bid.fields.parent,
			rawTotal: parseFloat(bid.fields.total),
			total: numeral(bid.fields.total).format('$0,0[.]00')
		} as ChildBid;

		const parent = formattedParentBidsById[bid.fields.parent];
		if (parent) {
			formattedParentBidsById[bid.fields.parent].options.push(formattedChildBid);
		} else {
			nodecg.log.error('Child bid #%d\'s parent (bid #%s) could not be found.' +
				' This child bid will be discarded!', bid.pk, bid.fields.parent);
		}
	});

	// Ah, but now we have to sort all these child bids by how much they have raised so far!
	// While we're at it, map all the parent bids back onto an array and set their "type".
	let bidsArray: ParentBid[] = [];
	for (const id in formattedParentBidsById) { // tslint:disable-line:no-for-in
		if (!{}.hasOwnProperty.call(formattedParentBidsById, id)) {
			continue;
		}

		const bid = formattedParentBidsById[id];
		bid.type = (() => {
			if (bid.options) {
				if (bid.options.length === 2) {
					return 'choice-binary';
				}

				return 'choice-many';
			}

			return 'challenge';
		})();

		bidsArray.push(bid);

		if (!bid.options) {
			continue;
		}

		bid.options = bid.options.sort((a, b) => {
			const aTotal = a.rawTotal;
			const bTotal = b.rawTotal;
			if (aTotal > bTotal) {
				return -1;
			}
			if (aTotal < bTotal) {
				return 1;
			}
			// a must be equal to b
			return 0;
		});
	}

	// Yes, we need to now sort again.
	bidsArray = bidsArray.sort(sortFormattedBidsByEarliestEndTime);
	return bidsArray;
}

function sortFormattedBidsByEarliestEndTime(a: ParentBid, b: ParentBid) {
	return a.speedrunEndtime - b.speedrunEndtime;
}

function sortRawBidsByEarliestEndTime(a: TrackerObject, b: TrackerObject) {
	return Date.parse(a.fields.speedrun__endtime) - Date.parse(b.fields.speedrun__endtime);
}
