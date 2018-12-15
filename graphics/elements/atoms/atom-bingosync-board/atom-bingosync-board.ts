const {customElement, property} = Polymer.decorators;

interface BoardCell {
	slot: string;
	colors: string;
	name: string;
}

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('atom-bingosync-board')
export default class AtomBingosyncBoardElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Boolean, reflectToAttribute: true, computed: '_computeLineFocused(board.lineFocused)'})
	lineFocused = true;

	_computeLineFocused(lineFocused: boolean) {
		return lineFocused;
	}

	_calcCells(cells: BoardCell[], selectedLine: string, lineFocused: boolean) {
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

	_calcColorClasses(cell?: BoardCell) {
		if (!cell || !cell.colors || cell.colors === 'none' || cell.colors === 'blank' || cell.colors.length <= 0) {
			return '';
		}

		const firstColor = cell.colors.split(' ').pop();
		return `cell--${firstColor}`;
	}
}
