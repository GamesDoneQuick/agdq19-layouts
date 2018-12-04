'use strict';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';

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

function moveItem(data: SortableListMoveArgs, direction: 'up' | 'down') {
	// Error if the replicant isn't an array, or doesn't have any items.
	const replicant = nodecg.Replicant(data.replicantName, data.replicantBundle);
	if (!replicant || !Array.isArray(replicant.value) || replicant.value.length <= 0) {
		log.error('Replicant must be an array, and must have a length greater than zero.');
		return;
	}

	// Error if the item is not found.
	if (data.itemIdField.length > 0) {
		const actualItemIndex = replicant.value.findIndex((item: any) => {
			if (data.useSortMap) {
				return item === data.itemId;
			}

			return item && item[data.itemIdField] === data.itemId;
		});

		if (actualItemIndex < 0 || isNaN(actualItemIndex)) {
			log.error('Item not found with these args:', data);
			return;
		}

		// Error if the provided index does not match the actual found index.
		if (actualItemIndex !== data.itemIndex) {
			log.error('Expected item index %s, got %s. Full data:', data.itemIndex, actualItemIndex, data);
			return;
		}
	}

	// Abort if moving the item up, and it can't be moved up any further.
	if (data.itemIndex === 0 && direction === 'up') {
		return;
	}

	// Abort if moving the item down, and it can't be moved down any further.
	if (data.itemIndex === (replicant.value.length - 1) && direction === 'down') {
		return;
	}

	const newIndex = direction === 'up' ? (data.itemIndex - 1) : (data.itemIndex + 1);
	const newArray = replicant.value.slice(0);
	newArray.splice(newIndex, 0, newArray.splice(data.itemIndex, 1)[0]);
	replicant.value = newArray;
}
