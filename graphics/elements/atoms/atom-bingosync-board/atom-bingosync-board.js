import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let AtomBingosyncBoardElement = class AtomBingosyncBoardElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this.lineFocused = true;
    }
    _computeLineFocused(lineFocused) {
        return lineFocused;
    }
    _calcCells(cells, selectedLine, lineFocused) {
        if (!lineFocused || !selectedLine) {
            return cells;
        }
        switch (selectedLine) {
            case 'row1':
            case 'row2':
            case 'row3':
            case 'row4':
            case 'row5': {
                const rowIndex = parseInt(selectedLine.slice(3), 10) - 1;
                const rowStart = rowIndex * 5;
                return cells.slice(rowStart, rowStart + 5);
            }
            case 'col1':
            case 'col2':
            case 'col3':
            case 'col4':
            case 'col5': {
                const columnStart = parseInt(selectedLine.slice(3), 10) - 1;
                return [
                    cells[columnStart],
                    cells[columnStart + 5],
                    cells[columnStart + 10],
                    cells[columnStart + 15],
                    cells[columnStart + 20]
                ];
            }
            case 'tl-br': {
                return [
                    cells[0],
                    cells[6],
                    cells[12],
                    cells[18],
                    cells[24]
                ];
            }
            case 'bl-tr': {
                return [
                    cells[20],
                    cells[16],
                    cells[12],
                    cells[8],
                    cells[4]
                ];
            }
            default:
                return cells;
        }
    }
    _calcColorClasses(cell) {
        if (!cell || !cell.colors || cell.colors === 'none' || cell.colors === 'blank' || cell.colors.length <= 0) {
            return '';
        }
        const firstColor = cell.colors.split(' ').pop();
        return `cell--${firstColor}`;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, computed: '_computeLineFocused(board.lineFocused)' })
], AtomBingosyncBoardElement.prototype, "lineFocused", void 0);
AtomBingosyncBoardElement = tslib_1.__decorate([
    customElement('atom-bingosync-board')
], AtomBingosyncBoardElement);
export default AtomBingosyncBoardElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1iaW5nb3N5bmMtYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLWJpbmdvc3luYy1ib2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBUXJEOzs7O0dBSUc7QUFFSCxJQUFxQix5QkFBeUIsR0FBOUMsTUFBcUIseUJBQTBCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTjNGOzs7O09BSUc7SUFDSDs7UUFHQyxnQkFBVyxHQUFHLElBQUksQ0FBQztJQWtFcEIsQ0FBQztJQWhFQSxtQkFBbUIsQ0FBQyxXQUFvQjtRQUN2QyxPQUFPLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWtCLEVBQUUsWUFBb0IsRUFBRSxXQUFvQjtRQUN4RSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFFRCxRQUFRLFlBQVksRUFBRTtZQUNyQixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQ1osTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMzQztZQUNELEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUMsQ0FBQztnQkFDWixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVELE9BQU87b0JBQ04sS0FBSyxDQUFDLFdBQVcsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUN2QixLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7aUJBQ3ZCLENBQUM7YUFDRjtZQUNELEtBQUssT0FBTyxDQUFDLENBQUM7Z0JBQ2IsT0FBTztvQkFDTixLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDVCxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNULEtBQUssQ0FBQyxFQUFFLENBQUM7aUJBQ1QsQ0FBQzthQUNGO1lBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztnQkFDYixPQUFPO29CQUNOLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1QsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDVCxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNULEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDUixDQUFDO2FBQ0Y7WUFDRDtnQkFDQyxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0YsQ0FBQztJQUVELGlCQUFpQixDQUFDLElBQWdCO1FBQ2pDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtZQUMxRyxPQUFPLEVBQUUsQ0FBQztTQUNWO1FBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEQsT0FBTyxTQUFTLFVBQVUsRUFBRSxDQUFDO0lBQzlCLENBQUM7Q0FDRCxDQUFBO0FBbEVBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLHdDQUF3QyxFQUFDLENBQUM7OERBQ3JGO0FBRkMseUJBQXlCO0lBRDdDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztHQUNqQix5QkFBeUIsQ0FvRTdDO2VBcEVvQix5QkFBeUIifQ==