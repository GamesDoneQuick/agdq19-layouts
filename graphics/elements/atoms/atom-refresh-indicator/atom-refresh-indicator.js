import * as tslib_1 from "tslib";
var AtomRefreshIndicatorElement_1;
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomRefreshIndicatorElement = AtomRefreshIndicatorElement_1 = class AtomRefreshIndicatorElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.indeterminate = true;
        this.timeUntilRefresh = ':??';
    }
    startCountdown(seconds) {
        const meterFillElem = this.$['meter-fill'];
        this.indeterminate = false;
        this.stopCountdown();
        meterFillElem.style.transform = '';
        const startTimestamp = Date.now();
        this._countdownInterval = window.setInterval(() => {
            const nowTimestamp = Date.now();
            const millisecondsElapsed = nowTimestamp - startTimestamp;
            const secondsRemaining = seconds - Math.ceil(millisecondsElapsed / 1000);
            const percentElapsed = Math.min(millisecondsElapsed / (seconds * 1000), 1) * 100;
            meterFillElem.style.transform = `translateX(-${percentElapsed}%)`;
            this.timeUntilRefresh = `:${String(secondsRemaining).padStart(2, '0')}`;
            if (secondsRemaining <= 0) {
                clearInterval(this._countdownInterval);
                this.indeterminate = true;
            }
        }, 1 / 60);
    }
    stopCountdown() {
        if (this._countdownInterval) {
            clearInterval(this._countdownInterval);
        }
    }
    _indeterminateChanged(newVal) {
        if (newVal) {
            this.stopCountdown();
            this.timeUntilRefresh = ':00';
        }
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: AtomRefreshIndicatorElement_1.prototype._indeterminateChanged })
], AtomRefreshIndicatorElement.prototype, "indeterminate", void 0);
tslib_1.__decorate([
    property({ type: String })
], AtomRefreshIndicatorElement.prototype, "timeUntilRefresh", void 0);
AtomRefreshIndicatorElement = AtomRefreshIndicatorElement_1 = tslib_1.__decorate([
    customElement('atom-refresh-indicator')
], AtomRefreshIndicatorElement);
export default AtomRefreshIndicatorElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1yZWZyZXNoLWluZGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tcmVmcmVzaC1pbmRpY2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsMkJBQTJCLG1DQUFoRCxNQUFxQiwyQkFBNEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUx4RTs7O09BR0c7SUFDSDs7UUFHQyxrQkFBYSxHQUFHLElBQUksQ0FBQztRQUdyQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUF1QzFCLENBQUM7SUFuQ0EsY0FBYyxDQUFDLE9BQWU7UUFDN0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQW1CLENBQUM7UUFDN0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3JCLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVuQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ2pELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNoQyxNQUFNLG1CQUFtQixHQUFHLFlBQVksR0FBRyxjQUFjLENBQUM7WUFDMUQsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUN6RSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUVqRixhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxlQUFlLGNBQWMsSUFBSSxDQUFDO1lBQ2xFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUV4RSxJQUFJLGdCQUFnQixJQUFJLENBQUMsRUFBRTtnQkFDMUIsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN2QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzthQUMxQjtRQUNGLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsYUFBYTtRQUNaLElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQzVCLGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUN2QztJQUNGLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxNQUFlO1FBQ3BDLElBQUksTUFBTSxFQUFFO1lBQ1gsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7U0FDOUI7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQTFDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSw2QkFBMkIsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUMsQ0FBQztrRUFDdEc7QUFHckI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7cUVBQ0E7QUFMTCwyQkFBMkI7SUFEL0MsYUFBYSxDQUFDLHdCQUF3QixDQUFDO0dBQ25CLDJCQUEyQixDQTRDL0M7ZUE1Q29CLDJCQUEyQiJ9