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
    _calcComplete(cell) {
        if (!cell || !cell.colors) {
            return false;
        }
        return cell.colors.length > 0 && cell.colors !== 'none' && cell.colors !== 'blank';
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, computed: '_computeLineFocused(board.lineFocused)' })
], AtomBingosyncBoardElement.prototype, "lineFocused", void 0);
AtomBingosyncBoardElement = tslib_1.__decorate([
    customElement('atom-bingosync-board')
], AtomBingosyncBoardElement);
export default AtomBingosyncBoardElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1iaW5nb3N5bmMtYm9hcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLWJpbmdvc3luYy1ib2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBUXJEOzs7O0dBSUc7QUFFSCxJQUFxQix5QkFBeUIsR0FBOUMsTUFBcUIseUJBQTBCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTjNGOzs7O09BSUc7SUFDSDs7UUFHQyxnQkFBVyxHQUFHLElBQUksQ0FBQztJQWlFcEIsQ0FBQztJQS9EQSxtQkFBbUIsQ0FBQyxXQUFvQjtRQUN2QyxPQUFPLFdBQVcsQ0FBQztJQUNwQixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWtCLEVBQUUsWUFBb0IsRUFBRSxXQUFvQjtRQUN4RSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2xDLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFFRCxRQUFRLFlBQVksRUFBRTtZQUNyQixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQ1osTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLFFBQVEsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDO2dCQUM5QixPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMzQztZQUNELEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUMsQ0FBQztnQkFDWixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVELE9BQU87b0JBQ04sS0FBSyxDQUFDLFdBQVcsQ0FBQztvQkFDbEIsS0FBSyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO29CQUN2QixLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7aUJBQ3ZCLENBQUM7YUFDRjtZQUNELEtBQUssT0FBTyxDQUFDLENBQUM7Z0JBQ2IsT0FBTztvQkFDTixLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDVCxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNULEtBQUssQ0FBQyxFQUFFLENBQUM7aUJBQ1QsQ0FBQzthQUNGO1lBQ0QsS0FBSyxPQUFPLENBQUMsQ0FBQztnQkFDYixPQUFPO29CQUNOLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1QsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDVCxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNULEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1IsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDUixDQUFDO2FBQ0Y7WUFDRDtnQkFDQyxPQUFPLEtBQUssQ0FBQztTQUNkO0lBQ0YsQ0FBQztJQUVELGFBQWEsQ0FBQyxJQUFnQjtRQUM3QixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUMxQixPQUFPLEtBQUssQ0FBQztTQUNiO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUM7SUFDcEYsQ0FBQztDQUNELENBQUE7QUFqRUE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsd0NBQXdDLEVBQUMsQ0FBQzs4REFDckY7QUFGQyx5QkFBeUI7SUFEN0MsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0dBQ2pCLHlCQUF5QixDQW1FN0M7ZUFuRW9CLHlCQUF5QiJ9