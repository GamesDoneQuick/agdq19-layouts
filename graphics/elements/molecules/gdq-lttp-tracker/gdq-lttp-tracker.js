import * as tslib_1 from "tslib";
import { AbstractRando } from '../../../classes/rando/abstract-rando';
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
let GDQLttpTrackerElement = class GDQLttpTrackerElement extends AbstractRando {
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
            '_computeGoals(items.*, prizes.*, medallions.*)'
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
    _computeGoals() {
        const finalArray = [];
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
        this.goals = finalArray;
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
        return src ? String(src) : 'blank-pixel';
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
], GDQLttpTrackerElement.prototype, "goals", void 0);
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
    property({ type: String })
], GDQLttpTrackerElement.prototype, "gameId", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQLttpTrackerElement.prototype, "mirrored", void 0);
GDQLttpTrackerElement = tslib_1.__decorate([
    customElement('gdq-lttp-tracker')
], GDQLttpTrackerElement);
export default GDQLttpTrackerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWx0dHAtdHJhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1sdHRwLXRyYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUVwRSxNQUFNLFNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzlELE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztBQUM5RCxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUM7QUFDckYsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELElBQUksV0FBVyxFQUFFO0lBQ2hCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxhQUFhLENBQUM7Q0FDaEQ7QUFFRCxTQUFTLGtCQUFrQixDQUFDLE1BQXVCLEVBQUUsU0FBaUI7SUFDckUsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssT0FBTyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDO0FBQ3BHLENBQUM7QUFVRCxNQUFNLFNBQVMsR0FBRyxDQUFDO1FBQ2xCLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQztRQUNsQixFQUFDLElBQUksRUFBRSxTQUFTLEVBQUM7UUFDakIsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDO1FBQ2IsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDO0tBQ2YsRUFBRTtRQUNGLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQztRQUNqQixFQUFDLElBQUksRUFBRSxTQUFTLEVBQUM7UUFDakIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztLQUNmLEVBQUU7UUFDRixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUM7UUFDaEIsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDO1FBQ2YsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDO1FBQ2YsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDO0tBQ2YsRUFBRTtRQUNGLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztRQUNmLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztRQUNmLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQztRQUNoQixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUM7S0FDZixFQUFFO1FBQ0YsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDO1FBQ2YsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDO1FBQ25CLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDO1FBQ2hDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztLQUNmLEVBQUU7UUFDRixFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7UUFDbEIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBQztRQUNqQixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUM7S0FDZixFQUFFO1FBQ0YsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztRQUNkLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDO1FBQ2pDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztLQUNmLEVBQUU7UUFDRixFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7UUFDbEIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQztRQUNiLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztLQUNmLEVBQUU7UUFDRixFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQztRQUNoQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQztRQUNqQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQztRQUNoQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUM7S0FDZixFQUFFO1FBQ0YsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO1FBQ2QsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUM7UUFDcEMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztLQUNmLENBQWEsQ0FBQztBQW9EZjs7O0dBR0c7QUFFSCxJQUFxQixxQkFBcUIsR0FBMUMsTUFBcUIscUJBQXNCLFNBQVEsYUFBbUI7SUFMdEU7OztPQUdHO0lBQ0g7O1FBZUMsV0FBTSxHQUFXLE9BQWlCLENBQUM7UUFHbkMsYUFBUSxHQUFZLFdBQVcsQ0FBQztJQStHakMsQ0FBQztJQTdHQSxNQUFNLEtBQUssU0FBUztRQUNuQixPQUFPO1lBQ04sZ0RBQWdEO1NBQ2hELENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBWSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWE7UUFDWixNQUFNLFVBQVUsR0FBVyxFQUFFLENBQUM7UUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFFbkMsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQzNDLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQztZQUM3QixDQUFDLFVBQVUsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztZQUN4QixPQUFPO1NBQ1A7UUFFRCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ25DLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEVBQUU7Z0JBQy9CLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRW5DLElBQUksU0FBUyxLQUFLLENBQUMsRUFBRTtvQkFDcEIsd0RBQXdEO29CQUN4RCxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQVUsQ0FBQyxDQUFDO2lCQUM1QjtnQkFFRCxVQUFVLENBQUMsSUFBSSxDQUFDO29CQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7b0JBQ3pCLEtBQUssRUFBRSxTQUFTO29CQUNoQixNQUFNLEVBQUUsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUN0RSxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLFNBQVMsS0FBSyxDQUFDLElBQUksU0FBUyxLQUFLLEtBQUs7aUJBQ3ZDLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1lBRUgsaUJBQWlCO1lBQ2pCLE1BQU0sV0FBVyxHQUFHO2dCQUNuQixJQUFJLEVBQUUsU0FBUztnQkFDZixTQUFTLEVBQUUsSUFBSTtnQkFDZixLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFDdkIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsY0FBYyxFQUFFLFNBQVM7YUFDakIsQ0FBQztZQUVWLDZDQUE2QztZQUM3QyxJQUFJLFFBQVEsS0FBSyxDQUFDLElBQUksUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDckMsV0FBVyxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDbEQ7WUFFRCxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELGNBQWMsQ0FBQyxXQUFpQixFQUFFLEtBQWE7UUFDOUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV2QyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztTQUM1QjtRQUVELElBQUksY0FBYyxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQzNCO2FBQU0sSUFBSSxjQUFjLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUMvQjtRQUVELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFlBQVksQ0FBQyxXQUFpQjtRQUM3QixJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQzNCLElBQUksV0FBVyxDQUFDLFNBQVMsRUFBRTtZQUMxQixJQUFJLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQzFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QztpQkFBTTtnQkFDTixPQUFPLGFBQWEsQ0FBQzthQUNyQjtTQUNEO1FBRUQsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQzFDLENBQUM7SUFFRCxhQUFhLENBQUMsV0FBaUI7UUFDOUIsT0FBTyxnQkFBZ0IsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUM7SUFDcEYsQ0FBQztJQUVELHFCQUFxQixDQUFDLFdBQWdCO1FBQ3JDLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7WUFDbkMsT0FBTyxhQUFhLENBQUM7U0FDckI7UUFFRCxPQUFPLFlBQVksV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ2pELENBQUM7Q0FDRCxDQUFBO0FBOUhBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO29EQUNWO0FBR2Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7b0RBQ1g7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztxREFDUDtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5REFDSDtBQUdyQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztxREFDVTtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7dURBQ3BCO0FBakJaLHFCQUFxQjtJQUR6QyxhQUFhLENBQUMsa0JBQWtCLENBQUM7R0FDYixxQkFBcUIsQ0FnSXpDO2VBaElvQixxQkFBcUIifQ==