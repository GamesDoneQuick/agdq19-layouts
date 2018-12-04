import * as tslib_1 from "tslib";
import { TimelineLite, Sine } from 'gsap';
const { customElement, property } = Polymer.decorators;
const currentRun = nodecg.Replicant('currentRun');
const schedule = nodecg.Replicant('schedule');
/**
 * @customElement
 * @polymer
 */
let GDQBreakScheduleElement = class GDQBreakScheduleElement extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        currentRun.on('change', () => {
            this.update();
        });
        schedule.on('change', () => {
            this.update();
        });
        this._$runs = this.shadowRoot.querySelectorAll('gdq-break-schedule-run');
    }
    update() {
        this._updateDebouncer = Polymer.Debouncer.debounce(this._updateDebouncer, Polymer.Async.timeOut.after(16), this._update.bind(this));
    }
    _update() {
        const tl = new TimelineLite();
        if (schedule.status !== 'declared' ||
            currentRun.status !== 'declared' ||
            !schedule.value ||
            !currentRun.value) {
            return tl;
        }
        tl.set(this._$runs, { willChange: 'opacity' });
        tl.to(this._$runs, 0.5, {
            opacity: 0,
            ease: Sine.easeInOut
        }, '+=0.25');
        tl.call(() => {
            this.upNext = currentRun.value;
            const onDeckRuns = [];
            schedule.value.some(item => {
                if (item.type !== 'run') {
                    return false;
                }
                if (item.order <= currentRun.value.order) {
                    return false;
                }
                onDeckRuns.push(item);
                return onDeckRuns.length >= 3;
            });
            this.onDeck = onDeckRuns;
        });
        tl.to(this._$runs, 0.5, {
            opacity: 1,
            ease: Sine.easeInOut
        }, '+=0.1');
        tl.set(this._$runs, { clearProps: 'will-change' });
        return tl;
    }
    _getArrayItem(array, index) {
        if (!array) {
            return null;
        }
        return array[index];
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQBreakScheduleElement.prototype, "upNext", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQBreakScheduleElement.prototype, "onDeck", void 0);
GDQBreakScheduleElement = tslib_1.__decorate([
    customElement('gdq-break-schedule')
], GDQBreakScheduleElement);
export default GDQBreakScheduleElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXNjaGVkdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWJyZWFrLXNjaGVkdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUl4QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTSxZQUFZLENBQUMsQ0FBQztBQUN2RCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFpQixVQUFVLENBQUMsQ0FBQztBQUU5RDs7O0dBR0c7QUFFSCxJQUFxQix1QkFBdUIsR0FBNUMsTUFBcUIsdUJBQXdCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBVXhGLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQTJDLENBQUM7SUFDckgsQ0FBQztJQUVELE1BQU07UUFDTCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ2pELElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxF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