import Random from '../../../../shared/lib/vendor/random';

const NUM_BITS = 4;
const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('atom-binary-clock')
export default class AtomBinaryClockElement extends Polymer.Element {
	@property({type: Number, observer: AtomBinaryClockElement.prototype._updateHours})
	hours: number;

	@property({type: Number, observer: AtomBinaryClockElement.prototype._updateMinutes})
	minutes: number;

	@property({type: Number, observer: AtomBinaryClockElement.prototype._updateSeconds})
	seconds: number;

	@property({type: Number, observer: AtomBinaryClockElement.prototype._updateMilliseconds})
	milliseconds: number;

	@property({type: Boolean, reflectToAttribute: true})
	pulsating = false;

	@property({type: Boolean, reflectToAttribute: true, observer: AtomBinaryClockElement.prototype._randomizedChanged})
	randomized = false;

	_randomFlashingInterval: number | undefined;
	_$hourOnesCells: NodeListOf<HTMLDivElement>;
	_$minuteTensCells: NodeListOf<HTMLDivElement>;
	_$minuteOnesCells: NodeListOf<HTMLDivElement>;
	_$secondTensCells: NodeListOf<HTMLDivElement>;
	_$secondOnesCells: NodeListOf<HTMLDivElement>;
	_$millisecondHundredthsCells: NodeListOf<HTMLDivElement>;

	ready() {
		super.ready();
		const cells = Array.from(this.shadowRoot!.querySelectorAll('.cell'));

		[
			'hourOnes',
			'minuteTens',
			'minuteOnes',
			'secondTens',
			'secondOnes',
			'millisecondHundredths'
		].forEach((columnName, index) => {
			const offset = index * NUM_BITS;
			(this as any)[`_$${columnName}Cells`] = cells.slice(offset, offset + NUM_BITS);
		});
	}

	startRandomFlashing() {
		if ((window as any).__SCREENSHOT_TESTING__) {
			return;
		}

		if (this._randomFlashingInterval) {
			return this._randomFlashingInterval;
		}

		this._randomFlashingInterval = window.setInterval(() => {
			this.flashRandomCell();
		}, 100);
		return this._randomFlashingInterval;
	}

	stopRandomFlashing() {
		const cells = Array.from(this.shadowRoot!.querySelectorAll('.cell--flash'));
		cells.forEach(cell => cell.classList.remove('cell--flash'));
		clearInterval(this._randomFlashingInterval);
		this._randomFlashingInterval = undefined;
	}

	flashRandomCell() {
		const availableCells = Array.from(this.shadowRoot!.querySelectorAll('.cell:not(.cell--flash)'));
		if (availableCells.length === 0) {
			return;
		}

		const cell = Random.pick(Random.engines.browserCrypto, availableCells);
		cell.classList.add('cell--flash');
		setTimeout(() => {
			cell.classList.remove('cell--flash', 'cell--on');
		}, 450);
	}

	_updateHours() {
		this._setColumn(numberPlace(this.hours, 1), this._$hourOnesCells);
	}

	_updateMinutes() {
		this._setColumn(numberPlace(this.minutes, 10), this._$minuteTensCells);
		this._setColumn(numberPlace(this.minutes, 1), this._$minuteOnesCells);
	}

	_updateSeconds() {
		this._setColumn(numberPlace(this.seconds, 10), this._$secondTensCells);
		this._setColumn(numberPlace(this.seconds, 1), this._$secondOnesCells);
	}

	_updateMilliseconds() {
		this._setColumn(numberPlace(this.milliseconds, 100), this._$millisecondHundredthsCells);
	}

	_randomizedChanged(newVal: boolean) {
		if (newVal) {
			this.startRandomFlashing();
		} else {
			this.stopRandomFlashing();
		}
	}

	_setColumn(num: number, cells: NodeListOf<HTMLDivElement>) {
		num
			.toString(2)
			.padStart(NUM_BITS, '0')
			.split('')
			.forEach((oneOrZero, index) => {
				const on = oneOrZero === '1';
				cells[index].classList.toggle('cell--on', on);
			});
	}
}

function numberPlace(num: number, place: number) {
	if (typeof place !== 'number') {
		throw new Error('must provide a place and it must be a number');
	}

	if (place === 1) {
		return num % 10;
	}

	return Math.floor(num / place);
}
