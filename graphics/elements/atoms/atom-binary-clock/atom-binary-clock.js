import * as tslib_1 from "tslib";
var AtomBinaryClockElement_1;
import Random from '../../../../shared/lib/vendor/random';
const NUM_BITS = 4;
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomBinaryClockElement = AtomBinaryClockElement_1 = class AtomBinaryClockElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.pulsating = false;
        this.randomized = false;
    }
    ready() {
        super.ready();
        const cells = Array.from(this.shadowRoot.querySelectorAll('.cell'));
        [
            'hourOnes',
            'minuteTens',
            'minuteOnes',
            'secondTens',
            'secondOnes',
            'millisecondHundredths'
        ].forEach((columnName, index) => {
            const offset = index * NUM_BITS;
            this[`_$${columnName}Cells`] = cells.slice(offset, offset + NUM_BITS);
        });
    }
    startRandomFlashing() {
        if (window.__SCREENSHOT_TESTING__) {
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
        const cells = Array.from(this.shadowRoot.querySelectorAll('.cell--flash'));
        cells.forEach(cell => cell.classList.remove('cell--flash'));
        clearInterval(this._randomFlashingInterval);
        this._randomFlashingInterval = undefined;
    }
    flashRandomCell() {
        const availableCells = Array.from(this.shadowRoot.querySelectorAll('.cell:not(.cell--flash)'));
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
    _randomizedChanged(newVal) {
        if (newVal) {
            this.startRandomFlashing();
        }
        else {
            this.stopRandomFlashing();
        }
    }
    _setColumn(num, cells) {
        num
            .toString(2)
            .padStart(NUM_BITS, '0')
            .split('')
            .forEach((oneOrZero, index) => {
            const on = oneOrZero === '1';
            cells[index].classList.toggle('cell--on', on);
        });
    }
};
tslib_1.__decorate([
    property({ type: Number, observer: AtomBinaryClockElement_1.prototype._updateHours })
], AtomBinaryClockElement.prototype, "hours", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: AtomBinaryClockElement_1.prototype._updateMinutes })
], AtomBinaryClockElement.prototype, "minutes", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: AtomBinaryClockElement_1.prototype._updateSeconds })
], AtomBinaryClockElement.prototype, "seconds", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: AtomBinaryClockElement_1.prototype._updateMilliseconds })
], AtomBinaryClockElement.prototype, "milliseconds", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], AtomBinaryClockElement.prototype, "pulsating", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: AtomBinaryClockElement_1.prototype._randomizedChanged })
], AtomBinaryClockElement.prototype, "randomized", void 0);
AtomBinaryClockElement = AtomBinaryClockElement_1 = tslib_1.__decorate([
    customElement('atom-binary-clock')
], AtomBinaryClockElement);
export default AtomBinaryClockElement;
function numberPlace(num, place) {
    if (typeof place !== 'number') {
        throw new Error('must provide a place and it must be a number');
    }
    if (place === 1) {
        return num % 10;
    }
    return Math.floor(num / place);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1iaW5hcnktY2xvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLWJpbmFyeS1jbG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNuQixNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsc0JBQXNCLDhCQUEzQyxNQUFxQixzQkFBdUIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUxuRTs7O09BR0c7SUFDSDs7UUFlQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBR2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7SUFrR3BCLENBQUM7SUF4RkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXJFO1lBQ0MsVUFBVTtZQUNWLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLFlBQVk7WUFDWix1QkFBdUI7U0FDdkIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDL0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQztZQUMvQixJQUFZLENBQUMsS0FBSyxVQUFVLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQztRQUNoRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxtQkFBbUI7UUFDbEIsSUFBSyxNQUFjLENBQUMsc0JBQXNCLEVBQUU7WUFDM0MsT0FBTztTQUNQO1FBRUQsSUFBSSxJQUFJLENBQUMsdUJB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