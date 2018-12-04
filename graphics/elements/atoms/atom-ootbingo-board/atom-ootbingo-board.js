import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let AtomOotbingoBoardElement = class AtomOotbingoBoardElement extends Polymer.MutableData(Polymer.Element) {
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
], AtomOotbingoBoardElement.prototype, "lineFocused", void 0);
AtomOotbingoBoardElement = tslib_1.__decorate([
    customElement('atom-ootbingo-board')
], AtomOotbingoBoardElement);
export default AtomOotbingoBoardElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1vb3RiaW5nby1ib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tb290YmluZ28tYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQVFyRDs7OztHQUlHO0FBRUgsSUFBcUIsd0JBQXdCLEdBQTdDLE1BQXFCLHdCQUF5QixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQU4xRjs7OztPQUlHO0lBQ0g7O1FBR0MsZ0JBQVcsR0FBRyxJQUFJLENBQUM7SUFpRXBCLENBQUM7SUEvREEsbUJBQW1CLENBQUMsV0FBb0I7UUFDdkMsT0FBTyxXQUFXLENBQUM7SUFDcEIsQ0FBQztJQUVELFVBQVUsQ0FBQyxLQUFrQixFQUFFLFlBQW9CLEVBQUUsV0FBb0I7UUFDeEUsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNsQyxPQUFPLEtBQUssQ0FBQztTQUNiO1FBRUQsUUFBUSxZQUFZLEVBQUU7WUFDckIsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLE1BQU0sQ0FBQyxDQUFDO2dCQUNaLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekQsTUFBTSxRQUFRLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztnQkFDOUIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDM0M7WUFDRCxLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssTUFBTSxDQUFDLENBQUM7Z0JBQ1osTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1RCxPQUFPO29CQUNOLEtBQUssQ0FBQyxXQUFXLENBQUM7b0JBQ2xCLEtBQUssQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO29CQUN0QixLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO2lCQUN2QixDQUFDO2FBQ0Y7WUFDRCxLQUFLLE9BQU8sQ0FBQyxDQUFDO2dCQUNiLE9BQU87b0JBQ04sS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDUixLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1QsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDVCxLQUFLLENBQUMsRUFBRSxDQUFDO2lCQUNULENBQUM7YUFDRjtZQUNELEtBQUssT0FBTyxDQUFDLENBQUM7Z0JBQ2IsT0FBTztvQkFDTixLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNULEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ1QsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDVCxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ1IsQ0FBQzthQUNGO1lBQ0Q7Z0JBQ0MsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNGLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBZ0I7UUFDN0IsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDMUIsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDO0lBQ3BGLENBQUM7Q0FDRCxDQUFBO0FBakVBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLHdDQUF3QyxFQUFDLENBQUM7NkRBQ3JGO0FBRkMsd0JBQXdCO0lBRDVDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztHQUNoQix3QkFBd0IsQ0FtRTVDO2VBbkVvQix3QkFBd0IifQ==