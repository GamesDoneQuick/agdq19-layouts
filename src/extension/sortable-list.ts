'use strict';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import {Replicant} from '../types/nodecg';

const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:sortable-list`);

interface SortableListMoveArgs {
	replicantName: string;
	replicantBundle: string;
	itemIndex: number;
	itemId: string | number;
	itemIdField: string;
	useSortMap: boolean;
}

nodecg.listenFor('sortable-list:moveItemToTop', (data: unknown) => {
	if (isSortableListMoveArgs(data)) {
		moveItem(data, 'top');
	} else {
		log.error('Invalid data:', data);
	}
});

nodecg.listenFor('sortable-list:moveItemUp', (data: unknown) => {
	if (isSortableListMoveArgs(data)) {
		moveItem(data, 'up');
	} else {
		log.error('Invalid data:', data);
	}
});

nodecg.listenFor('sortable-list:moveItemDown', (data: unknown) => {
	if (isSortableListMoveArgs(data)) {
		moveItem(data, 'down');
	} else {
		log.error('Invalid data:', data);
	}
});

nodecg.listenFor('sortable-list:moveItemToBottom', (data: unknown) => {
	if (isSortableListMoveArgs(data)) {
		moveItem(data, 'bottom');
	} else {
		log.error('Invalid data:', data);
	}
});

nodecg.listenFor('sortable-list:removeItem', (data: unknown) => {
	if (isSortableListMoveArgs(data)) {
		removeItem(data);
	} else {
		log.error('Invalid data:', data);
	}
});

function isSortableListMoveArgs(data: unknown): data is SortableListMoveArgs {
	if (typeof data !== 'object' || data === null) {
		return false;
	}

	return data.hasOwnProperty('replicantName') &&
		data.hasOwnProperty('replicantBundle') &&
		data.hasOwnProperty('itemIndex') &&
		data.hasOwnProperty('itemId') &&
		data.hasOwnProperty('itemIdField') &&
		data.hasOwnProperty('useSortMap');
}

function findReplicant(data: SortableListMoveArgs) {
	// Error if the replicant isn't an array, or doesn't have any items.
	const replicant = nodecg.Replicant(data.replicantName, data.replicantBundle);
	if (!replicant || !Array.isArray(replicant.value) || replicant.value.length <= 0) {
		throw new Error('Replicant must be an array, and must have a length greater than zero.');
	}

	return replicant as Replicant<unknown[]>;
}

function assertItem(data: SortableListMoveArgs) {
	const replicant = findReplicant(data);

	// Error if the item is not found.
	if (data.itemIdField.length > 0) {
		const actualItemIndex = replicant.value.findIndex((item: any) => {
			if (data.useSortMap) {
				return item === data.itemId;
			}

			return item && item[data.itemIdField] === data.itemId;
		});

		if (actualItemIndex < 0 || isNaN(actualItemIndex)) {
			throw new Error(`Item not found with these args: ${data}`);
		}

		// Error if the provided index does not match the actual found index.
		if (actualItemIndex !== data.itemIndex) {
			throw new Error(`Expected item index ${data.itemIndex}, got ${actualItemIndex}. Full data: ${data}`);
		}
	}
}

function moveItem(data: SortableListMoveArgs, direction: 'top' | 'up' | 'down' | 'bottom') {
	const replicant = findReplicant(data);
	assertItem(data);

	// Abort if moving the item up, and it can't be moved up any further.
	if (data.itemIndex === 0 && direction === 'up') {
		return;
	}

	// Abort if moving the item down, and it can't be moved down any further.
	if (data.itemIndex === (replicant.value.length - 1) && direction === 'down') {
		return;
	}

	let newIndex;
	switch (direction) {
		case 'top':
			newIndex = 0;
			break;
		case 'up':
			newIndex = data.itemIndex - 1;
			break;
		case 'down':
			newIndex = data.itemIndex + 1;
			break;
		case 'bottom':
			newIndex = replicant.value.length - 1;
			break;
		default:
			return;
	}
	const newArray = replicant.value.slice(0);
	newArray.splice(newIndex, 0, newArray.splice(data.itemIndex, 1)[0]);
	replicant.value = newArray;
}

function removeItem(data: SortableListMoveArgs) {
	const replicant = findReplicant(data);
	assertItem(data);

	const newArray = replicant.value.slice(0);
	newArray.splice(data.itemIndex, 1);
	replicant.value = newArray;
}
