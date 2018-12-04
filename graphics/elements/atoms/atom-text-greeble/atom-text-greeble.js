import * as tslib_1 from "tslib";
var AtomTextGreebleElement_1;
import Random from '../../../../shared/lib/vendor/random';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomTextGreebleElement = AtomTextGreebleElement_1 = class AtomTextGreebleElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        /**
         * The number of characters this greeble should be in length.
         */
        this.length = 15;
        /**
         * How many times per second to update the text.
         */
        this.tickRate = 5;
        /**
         * The set of characters from which to create the random strings.
         */
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    }
    update() {
        let str = '';
        for (let i = 0; i < this.length; i++) { // tslint:disable-line:prefer-for-of
            str += Random.pick(Random.engines.browserCrypto, this._charactersArray);
        }
        if (window.__SCREENSHOT_TESTING__) {
            str = new Array(this.length).fill('0').join('');
        }
        this.text = str;
    }
    _tickRateChanged(newVal) {
        if (this._tickInterval) {
            clearInterval(this._tickInterval);
        }
        this._tickInterval = window.setInterval(() => {
            this.update();
        }, 1000 / newVal);
    }
    _computeCharactersArray(characters) {
        return characters.split('');
    }
};
tslib_1.__decorate([
    property({ type: Number })
], AtomTextGreebleElement.prototype, "length", void 0);
tslib_1.__decorate([
    property({ type: Number, observer: AtomTextGreebleElement_1.prototype._tickRateChanged })
], AtomTextGreebleElement.prototype, "tickRate", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTextGreebleElement.prototype, "characters", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomTextGreebleElement.prototype, "text", void 0);
tslib_1.__decorate([
    property({ type: Array, computed: '_computeCharactersArray(characters)' })
], AtomTextGreebleElement.prototype, "_charactersArray", void 0);
AtomTextGreebleElement = AtomTextGreebleElement_1 = tslib_1.__decorate([
    customElement('atom-text-greeble')
], AtomTextGreebleElement);
export default AtomTextGreebleElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS10ZXh0LWdyZWVibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhdG9tLXRleHQtZ3JlZWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBRTFELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7O0dBR0c7QUFFSCxJQUFxQixzQkFBc0IsOEJBQTNDLE1BQXFCLHNCQUF1QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTG5FOzs7T0FHRztJQUNIOztRQUVDOztXQUVHO1FBRUgsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVaOztXQUVHO1FBRUgsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUViOztXQUVHO1FBRUgsZUFBVSxHQUFHLHNDQUFzQyxDQUFDO0lBdUNyRCxDQUFDO0lBMUJBLE1BQU07UUFDTCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLG9DQUFvQztZQUMzRSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUN4RTtRQUVELElBQUssTUFBYyxDQUFDLHNCQUFzQixFQUFFO1lBQzNDLEdBQUcsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNoRDtRQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFjO1FBQzlCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN2QixhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUM1QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZixDQUFDLEVBQUUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxVQUFrQjtRQUN6QyxPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNELENBQUE7QUFuREE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7c0RBQ2I7QUFNWjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLHdCQUFzQixDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBQyxDQUFDO3dEQUN6RTtBQU1iO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzBEQUMyQjtBQU1wRDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztvREFDWjtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUscUNBQXFDLEVBQUMsQ0FBQztnRUFDOUM7QUExQlAsc0JBQXNCO0lBRDFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztHQUNkLHNCQUFzQixDQXdEMUM7ZUF4RG9CLHNCQUFzQiJ9