import * as tslib_1 from "tslib";
const urlParams = new URLSearchParams(window.location.search);
const MIRROR_MODE = getBooleanUrlParam(urlParams, 'mirrored');
const GAME_ID = urlParams.has('game_id') ? urlParams.get('game_id') : 'supportclass';
const { customElement, property } = Polymer.decorators;
if (MIRROR_MODE) {
    document.title = `${document.title} (Mirrored)`;
}
function getBooleanUrlParam(params, paramName) {
    return params.has(paramName) && params.get(paramName) !== 'false' && params.get(paramName) !== '0';
}
const ITEM_ROWS = [[
        { name: 'hookshot' },
        { name: 'silvers' },
        { name: 'bow' },
        { name: 'boss0' }
    ], [
        { name: 'firerod' },
        { name: 'somaria' },
        { name: 'hammer' },
        { name: 'boss1' }
    ], [
        { name: 'icerod' },
        { name: 'byrna' },
        { name: 'flute' },
        { name: 'boss2' }
    ], [
        { name: 'quake' },
        { name: 'ether' },
        { name: 'bombos' },
        { name: 'boss3' }
    ], [
        { name: 'boots' },
        { name: 'moonpearl' },
        { name: 'glove', hasLevels: true },
        { name: 'boss4' }
    ], [
        { name: 'flippers' },
        { name: 'mirror' },
        { name: 'lantern' },
        { name: 'boss5' }
    ], [
        { name: 'powder' },
        { name: 'book' },
        { name: 'bottle', hasLevels: true },
        { name: 'boss6' }
    ], [
        { name: 'mushroom' },
        { name: 'shovel' },
        { name: 'net' },
        { name: 'boss7' }
    ], [
        { name: 'tunic', hasLevels: true },
        { name: 'shield', hasLevels: true },
        { name: 'sword', hasLevels: true },
        { name: 'boss8' }
    ], [
        { name: 'cape' },
        { name: 'boomerang', hasLevels: true },
        { name: 'boss10' },
        { name: 'boss9' }
    ]];
/**
 * @customElement
 * @polymer
 */
let GDQLttpTrackerElement = class GDQLttpTrackerElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.gameId = GAME_ID;
        this.mirrored = MIRROR_MODE;
    }
    static get observers() {
        return [
            '_computeItemsAndPrizes(items.*, prizes.*, medallions.*)'
        ];
    }
    ready() {
        super.ready();
        this.$.auth.signInAnonymously().then(() => {
            nodecg.log.info('Signed in anonymously.');
        }).catch((error) => {
            nodecg.log.error('Failed to sign in:', error);
        });
    }
    _computeItemsAndPrizes() {
        const finalArray = [];
        const items = this.items;
        const prizes = this.prizes;
        const medallions = this.medallions;
        if (!items || Object.keys(items).length <= 0 ||
            !prizes || prizes.length <= 0 ||
            !medallions || medallions.length <= 0) {
            this.itemsAndPrizes = finalArray;
            return;
        }
        ITEM_ROWS.forEach((row, rowIndex) => {
            row.forEach((item, itemIndex) => {
                const itemValue = items[item.name];
                if (itemIndex === 3) {
                    // Empty placeholder for the 4th column, which is blank.
                    finalArray.push({});
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
            };
            // Only these two bosses have medallion info.
            if (rowIndex === 8 || rowIndex === 9) {
                dungeonInfo.medallionLevel = medallions[rowIndex];
            }
            finalArray.push(dungeonInfo);
        });
        this.itemsAndPrizes = finalArray;
    }
    _calcCellClass(itemOrPrize, index) {
        const classes = new Set(['cell']);
        const sixesRemainder = (index + 1) % 6;
        if (itemOrPrize.dimmed) {
            classes.add('cell--dimmed');
        }
        if (sixesRemainder === 0) {
            classes.add('cell--prize');
        }
        else if (sixesRemainder === 4) {
            classes.add('cell--zeroWidth');
        }
        return Array.from(classes).join(' ');
    }
    _calcCellSrc(itemOrPrize) {
        let src = itemOrPrize.name;
        if (itemOrPrize.hasLevels) {
            if (typeof itemOrPrize.level === 'number') {
                src = String(src) + String(itemOrPrize.level);
            }
            else {
                return 'blank-pixel';
            }
        }
        return src ? src : 'blank-pixel';
    }
    _hasMedallion(itemOrPrize) {
        return 'medallionLevel' in itemOrPrize && itemOrPrize.medallionLevel !== undefined;
    }
    _calcCellMedallionSrc(itemOrPrize) {
        if (itemOrPrize.name !== 'dungeon') {
            return 'blank-pixel';
        }
        return `medallion${itemOrPrize.medallionLevel}`;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQLttpTrackerElement.prototype, "items", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQLttpTrackerElement.prototype, "prizes", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQLttpTrackerElement.prototype, "medallions", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQLttpTrackerElement.prototype, "itemsAndPrizes", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQLttpTrackerElement.prototype, "gameId", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQLttpTrackerElement.prototype, "mirrored", void 0);
GDQLttpTrackerElement = tslib_1.__decorate([
    customElement('gdq-lttp-tracker')
], GDQLttpTrackerElement);
export default GDQLttpTrackerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWx0dHAtdHJhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1sdHRwLXRyYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUQsTUFBTSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzlELE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQztBQUNyRixNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsSUFBSSxXQUFXLEVBQUU7SUFDaEIsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLGFBQWEsQ0FBQztDQUNoRDtBQUVELFNBQVMsa0JBQWtCLENBQUMsTUFBdUIsRUFBRSxTQUFpQjtJQUNyRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUM7QUFDcEcsQ0FBQztBQVVELE1BQU0sU0FBUyxHQUFHLENBQUM7UUFDbEIsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO1FBQ2xCLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQztRQUNqQixFQUFDLElBQUksRUFBRSxLQUFLLEVBQUM7UUFDYixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUM7S0FDZixFQUFFO1FBQ0YsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDO1FBQ2pCLEVBQUMsSUFBSSxF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