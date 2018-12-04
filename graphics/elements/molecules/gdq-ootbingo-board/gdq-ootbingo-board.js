import * as tslib_1 from "tslib";
var GDQOotbingoBoardElement_1;
import { TweenLite, Sine, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
const boardRep = nodecg.Replicant('ootBingo:board');
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
let GDQOotbingoBoardElement = GDQOotbingoBoardElement_1 = class GDQOotbingoBoardElement extends Polymer.Element {
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
], GDQOotbingoBoardElement.prototype, "embiggened", void 0);
tslib_1.__decorate([
    property({ type: Boolean, observer: GDQOotbingoBoardElement_1.prototype._embiggenStateChanged })
], GDQOotbingoBoardElement.prototype, "_embiggenState", void 0);
tslib_1.__decorate([
    property({ type: Boolean, observer: GDQOotbingoBoardElement_1.prototype._hiddenStateChanged })
], GDQOotbingoBoardElement.prototype, "_hiddenState", void 0);
GDQOotbingoBoardElement = GDQOotbingoBoardElement_1 = tslib_1.__decorate([
    customElement('gdq-ootbingo-board')
], GDQOotbingoBoardElement);
export default GDQOotbingoBoardElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9vdGJpbmdvLWJvYXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW9vdGJpbmdvLWJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsT0FBTyxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFrQixnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUQsTUFBTSxnQkFBZ0IsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ25ELElBQUksUUFBd0IsQ0FBQztBQUM3QixJQUFJLGdCQUFnQixLQUFLLE1BQU0sRUFBRTtJQUNoQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ2YsTUFBYyxDQUFDLEtBQUssSUFBSSxlQUFlLENBQUM7Q0FDekM7S0FBTSxJQUFJLGdCQUFnQixLQUFLLE9BQU8sRUFBRTtJQUN4QyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ2hCLE1BQWMsQ0FBQyxLQUFLLElBQUksZUFBZSxDQUFDO0NBQ3pDO0tBQU07SUFDTixRQUFRLEdBQUcsSUFBSSxDQUFDO0NBQ2hCO0FBRUQ7OztHQUdHO0FBRUgsSUFBcUIsdUJBQXVCLCtCQUE1QyxNQUFxQix1QkFBd0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUxwRTs7O09BR0c7SUFDSDs7UUFHQyxlQUFVLEdBQVksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR3hDLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBR3ZCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBNkN0QixDQUFDO0lBM0NBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU87YUFDUDtZQUVELElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQscUJBQXFCLENBQUMsTUFBZTtRQUNwQyxJQUFJLFFBQVEsS0FBSyxJQUFJLEVBQUU7WUFDdEIsT0FBTztTQUNQO1FBRUQsSUFBSSxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO2dCQUN2QixPQUFPLEVBQUUsQ0FBQztnQkFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7YUFDcEIsQ0FBQyxDQUFDO1NBQ0g7YUFBTTtZQUNOLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtnQkFDdkIsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQ3BCLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVELG1CQUFtQixDQUFDLE1BQWU7UUFDbEMsSUFBSSxNQUFNLEVBQUU7WUFDWCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDL0IsQ0FBQyxFQUFFLElBQUk7Z0JBQ1AsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPO2FBQ3BCLENBQUMsQ0FBQztTQUNIO2FBQU07WUFDTixTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtnQkFDL0IsQ0FBQyxFQUFFLE9BQU87Z0JBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNO2FBQ25CLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztDQUNELENBQUE7QUFuREE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDOzJEQUNaO0FBR3hDO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUseUJBQXVCLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFDLENBQUM7K0RBQ3RFO0FBR3ZCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUseUJBQXVCLENBQUMsU0FBUyxDQUFDLG1CQUFtQixFQUFDLENBQUM7NkRBQ3RFO0FBUkQsdUJBQXVCO0lBRDNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztHQUNmLHVCQUF1QixDQXFEM0M7ZUFyRG9CLHVCQUF1QiJ9