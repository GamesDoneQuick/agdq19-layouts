import {AbstractRando} from '../../../classes/rando/abstract-rando';

const urlParams = new URLSearchParams(window.location.search);
const MIRROR_MODE = getBooleanUrlParam(urlParams, 'mirrored');
const GAME_ID = urlParams.has('game_id') ? urlParams.get('game_id') : 'supportclass';
const {customElement, property} = Polymer.decorators;
if (MIRROR_MODE) {
	document.title = `${document.title} (Mirrored)`;
}

function getBooleanUrlParam(params: URLSearchParams, paramName: string) {
	return params.has(paramName) && params.get(paramName) !== 'false' && params.get(paramName) !== '0';
}

interface Goal {
	name: keyof ITEMS | 'dungeon';
	hasLevels?: boolean;
	level?: boolean | number;
	dimmed?: boolean;
	medallionLevel?: number;
}

const ITEM_ROWS = [[
	{name: 'hookshot'},
	{name: 'silvers'},
	{name: 'bow'},
	{name: 'boss0'}
], [
	{name: 'firerod'},
	{name: 'somaria'},
	{name: 'hammer'},
	{name: 'boss1'}
], [
	{name: 'icerod'},
	{name: 'byrna'},
	{name: 'flute'},
	{name: 'boss2'}
], [
	{name: 'quake'},
	{name: 'ether'},
	{name: 'bombos'},
	{name: 'boss3'}
], [
	{name: 'boots'},
	{name: 'moonpearl'},
	{name: 'glove', hasLevels: true}, // has 2 variants (0-2)
	{name: 'boss4'}
], [
	{name: 'flippers'},
	{name: 'mirror'},
	{name: 'lantern'},
	{name: 'boss5'}
], [
	{name: 'powder'},
	{name: 'book'},
	{name: 'bottle', hasLevels: true}, // can be 0-4
	{name: 'boss6'}
], [
	{name: 'mushroom'},
	{name: 'shovel'},
	{name: 'net'},
	{name: 'boss7'}
], [
	{name: 'tunic', hasLevels: true}, // can be 1-3
	{name: 'shield', hasLevels: true}, // can be 0-3
	{name: 'sword', hasLevels: true}, // can be 0-4
	{name: 'boss8'}
], [
	{name: 'cape'},
	{name: 'boomerang', hasLevels: true}, // can be 0-3
	{name: 'boss10'},
	{name: 'boss9'}
]] as Goal[][];

interface ITEMS {
	agahnim: number;
	blank: boolean;
	bomb: number;
	bombos: boolean;
	book: boolean;
	boomerang: number;
	boots: boolean;
	boss0: number;
	boss1: number;
	boss2: number;
	boss3: number;
	boss4: number;
	boss5: number;
	boss6: number;
	boss7: number;
	boss8: number;
	boss9: number;
	boss10: number;
	bottle: number;
	bow: boolean;
	byrna: boolean;
	cape: boolean;
	ether: boolean;
	firerod: boolean;
	flippers: boolean;
	flute: boolean;
	glove: number;
	hammer: boolean;
	heartcontainer: number;
	heartpiece: number;
	hookshot: boolean;
	icerod: boolean;
	lantern: boolean;
	mirror: boolean;
	moonpearl: boolean;
	mpupgrade: number;
	mushroom: boolean;
	net: boolean;
	powder: boolean;
	quake: boolean;
	shield: number;
	shovel: boolean;
	silvers: boolean;
	somaria: boolean;
	sword: number;
	tunic: number;
	[key: string]: number | boolean;
}

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-lttp-tracker')
export default class GDQLttpTrackerElement extends AbstractRando<Goal> {
	@property({type: Array})
	goals: Goal[];

	@property({type: Array})
	items: ITEMS;

	@property({type: Array})
	prizes: number[];

	@property({type: Array})
	medallions: number[];

	@property({type: String})
	gameId: string = GAME_ID as string;

	@property({type: Boolean, reflectToAttribute: true})
	mirrored: boolean = MIRROR_MODE;

	static get observers() {
		return [
			'_computeGoals(items.*, prizes.*, medallions.*)'
		];
	}

	ready() {
		super.ready();

		(this.$.auth as any).signInAnonymously().then(() => {
			nodecg.log.info('Signed in anonymously.');
		}).catch((error: Error) => {
			nodecg.log.error('Failed to sign in:', error);
		});
	}

	_computeGoals() {
		const finalArray: Goal[] = [];
		const items = this.items;
		const prizes = this.prizes;
		const medallions = this.medallions;

		if (!items || Object.keys(items).length <= 0 ||
			!prizes || prizes.length <= 0 ||
			!medallions || medallions.length <= 0) {
			this.goals = finalArray;
			return;
		}

		ITEM_ROWS.forEach((row, rowIndex) => {
			row.forEach((item, itemIndex) => {
				const itemValue = items[item.name];

				if (itemIndex === 3) {
					// Empty placeholder for the 4th column, which is blank.
					finalArray.push({} as Goal);
				}

				finalArray.push({
					name: item.name,
					hasLevels: item.hasLevels,
					level: itemValue,
					dimmed: typeof item.name === 'string' && item.name.startsWith('boss') ?
						itemValue === 1 :
						itemValue === 0 || itemValue === false
				});
			});

			// Dungeon prize.
			const dungeonInfo = {
				name: 'dungeon',
				hasLevels: true,
				level: prizes[rowIndex],
				dimmed: false,
				medallionLevel: undefined
			} as Goal;

			// Only these two bosses have medallion info.
			if (rowIndex === 8 || rowIndex === 9) {
				dungeonInfo.medallionLevel = medallions[rowIndex];
			}

			finalArray.push(dungeonInfo);
		});

		this.goals = finalArray;
	}

	_calcCellClass(itemOrPrize: Goal, index: number) {
		const classes = new Set(['cell']);
		const sixesRemainder = (index + 1) % 6;

		if (itemOrPrize.dimmed) {
			classes.add('cell--dimmed');
		}

		if (sixesRemainder === 0) {
			classes.add('cell--prize');
		} else if (sixesRemainder === 4) {
			classes.add('cell--zeroWidth');
		}

		return Array.from(classes).join(' ');
	}

	_calcCellSrc(itemOrPrize: Goal) {
		let src = itemOrPrize.name;
		if (itemOrPrize.hasLevels) {
			if (typeof itemOrPrize.level === 'number') {
				src = String(src) + String(itemOrPrize.level);
			} else {
				return 'blank-pixel';
			}
		}

		return src ? String(src) : 'blank-pixel';
	}

	_hasMedallion(itemOrPrize: Goal) {
		return 'medallionLevel' in itemOrPrize && itemOrPrize.medallionLevel !== undefined;
	}

	_calcCellMedallionSrc(itemOrPrize: any) {
		if (itemOrPrize.name !== 'dungeon') {
			return 'blank-pixel';
		}

		return `medallion${itemOrPrize.medallionLevel}`;
	}
}
