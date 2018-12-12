import * as tslib_1 from "tslib";
var GDQBingosyncBoardElement_1;
import { TweenLite, Sine, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
const boardRep = nodecg.Replicant('bingosync:board');
const urlParams = new URLSearchParams(window.location.search);
const embiggenUrlParam = urlParams.get('embiggen');
let EMBIGGEN;
if (embiggenUrlParam === 'true') {
    EMBIGGEN = true;
    window.title += ' - EMBIGGENED';
}
else if (embiggenUrlParam === 'false') {
    EMBIGGEN = false;
    window.title += ' - debiggened';
}
else {
    EMBIGGEN = null;
}
/**
 * @customElement
 * @polymer
 */
let GDQBingosyncBoardElement = GDQBingosyncBoardElement_1 = class GDQBingosyncBoardElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.embiggened = Boolean(EMBIGGEN);
        this._embiggenState = false;
        this._hiddenState = false;
    }
    ready() {
        super.ready();
        boardRep.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this._embiggenState = newVal.embiggen;
            this._hiddenState = newVal.cardHidden;
        });
    }
    _embiggenStateChanged(newVal) {
        if (EMBIGGEN === null) {
            return;
        }
        if ((newVal && EMBIGGEN) || (!newVal && !EMBIGGEN)) {
            TweenLite.to(this, 0.3, {
                opacity: 1,
                ease: Sine.easeInOut
            });
        }
        else {
            TweenLite.to(this, 0.3, {
                opacity: 0,
                ease: Sine.easeInOut
            });
        }
    }
    _hiddenStateChanged(newVal) {
        if (newVal) {
            TweenLite.to(this.$.cover, 0.3, {
                y: '0%',
                ease: Power2.easeOut
            });
        }
        else {
            TweenLite.to(this.$.cover, 0.3, {
                y: '-100%',
                ease: Power2.easeIn
            });
        }
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQBingosyncBoardElement.prototype, "embiggened", void 0);
tslib_1.__decorate([
    property({ type: Boolean, observer: GDQBingosyncBoardElement_1.prototype._embiggenStateChanged })
], GDQBingosyncBoardElement.prototype, "_embiggenState", void 0);
tslib_1.__decorate([
    property({ type: Boolean, observer: GDQBingosyncBoardElement_1.prototype._hiddenStateChanged })
], GDQBingosyncBoardElement.prototype, "_hiddenState", void 0);
GDQBingosyncBoardElement = GDQBingosyncBoardElement_1 = tslib_1.__decorate([
    customElement('gdq-bingosync-board')
], GDQBingosyncBoardElement);
export default GDQBingosyncBoardElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJpbmdvc3luYy1ib2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1iaW5nb3N5bmMtYm9hcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFN0MsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQW1CLGlCQUFpQixDQUFDLENBQUM7QUFDdkUsTUFBTSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM5RCxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkQsSUFBSSxRQUF3QixDQUFDO0FBQzdCLElBQUksZ0JBQWdCLEtBQUssTUFBTSxFQUFFO0lBQ2hDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDZixNQUFjLENBQUMsS0FBSyxJQUFJLGVBQWUsQ0FBQztDQUN6QztLQUFNLElBQUksZ0JBQWdCLEtBQUssT0FBTyxFQUFFO0lBQ3hDLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDaEIsTUFBYyxDQUFDLEtBQUssSUFBSSxlQUFlLENBQUM7Q0FDekM7S0FBTTtJQUNOLFFBQVEsR0FBRyxJQUFJLENBQUM7Q0FDaEI7QUFFRDs7O0dBR0c7QUFFSCxJQUFxQix3QkFBd0IsZ0NBQTdDLE1BQXFCLHdCQUF5QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTHJFOzs7T0FHRztJQUNIOztRQUdDLGVBQVUsR0FBWSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFHeEMsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFHdkIsaUJBQVksR0FBRyxLQUFLLENBQUM7SUE2Q3RCLENBQUM7SUEzQ0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxNQUFlO1FBQ3BDLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUN0QixPQUFPO1NBQ1A7UUFFRCxJQUFJLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNuRCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2dCQUNWLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUzthQUNwQixDQUFDLENBQUM7U0FDSDthQUFNO1lBQ04sU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN2QixPQUFPLEVBQUUsQ0FBQztnQkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7YUFDcEIsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0lBRUQsbUJBQW1CLENBQUMsTUFBZTtRQUNsQyxJQUFJLE1BQU0sRUFBRTtZQUNYLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUMvQixDQUFDLEVBQUUsSUFBSTtnQkFDUCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87YUFDcEIsQ0FBQyxDQUFDO1NBQ0g7YUFBTTtZQUNOLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO2dCQUMvQixDQUFDLEVBQUUsT0FBTztnQkFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07YUFDbkIsQ0FBQyxDQUFDO1NBQ0g7SUFDRixDQUFDO0NBQ0QsQ0FBQTtBQW5EQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7NERBQ1o7QUFHeEM7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSwwQkFBd0IsQ0FBQyxTQUFTLENBQUMscUJBQXFCLEVBQUMsQ0FBQztnRUFDdkU7QUFHdkI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSwwQkFBd0IsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLEVBQUMsQ0FBQzs4REFDdkU7QUFSRCx3QkFBd0I7SUFENUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDO0dBQ2hCLHdCQUF3QixDQXFENUM7ZUFyRG9CLHdCQUF3QiJ9