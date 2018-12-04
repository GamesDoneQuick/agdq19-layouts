import * as tslib_1 from "tslib";
var GDQTimerElement_1;
import { TimelineLite, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
const stopwatch = nodecg.Replicant('stopwatch');
let GDQTimerElement = GDQTimerElement_1 = class GDQTimerElement extends Polymer.Element {
    ready() {
        super.ready();
        const timerTL = new TimelineLite({ autoRemoveChildren: true });
        stopwatch.on('change', (newVal, oldVal) => {
            this.hours = newVal.time.hours;
            this.minutes = newVal.time.minutes;
            this.seconds = newVal.time.seconds;
            this.milliseconds = newVal.time.milliseconds;
            if (oldVal) {
                if (newVal.state === 'running' && oldVal.state !== 'running') {
                    timerTL.from(this.$.startFlash, 1, {
                        opacity: 0.5,
                        ease: Power2.easeIn
                    });
                }
                else if (newVal.state !== 'running' && newVal.state !== oldVal.state) {
                    timerTL.clear();
                    this.$.startFlash.style.opacity = '0';
                }
                if (newVal.state === 'finished' && oldVal.state !== 'finished') {
                    timerTL.from(this.$.startFlash, 1, {
                        opacity: 0.5,
                        ease: Power2.easeIn
                    });
                }
            }
            this.notStarted = newVal.state === 'not_started';
            this.paused = newVal.state === 'paused';
            this.finished = newVal.state === 'finished';
        });
    }
    pausedChanged(newVal) {
        if (newVal && this.finished) {
            this.finished = false;
        }
    }
    finishedChanged(newVal) {
        if (newVal && this.paused) {
            this.paused = false;
        }
    }
    _lessThanEqZero(num) {
        return num <= 0;
    }
    _padTime(num) {
        return String(num).padStart(2, '0');
    }
    _formatMilliseconds(milliseconds) {
        return Math.floor(milliseconds / 100);
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQTimerElement.prototype, "notStarted", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: GDQTimerElement_1.prototype.pausedChanged })
], GDQTimerElement.prototype, "paused", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, observer: GDQTimerElement_1.prototype.finishedChanged })
], GDQTimerElement.prototype, "finished", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimerElement.prototype, "hours", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimerElement.prototype, "minutes", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimerElement.prototype, "seconds", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQTimerElement.prototype, "milliseconds", void 0);
GDQTimerElement = GDQTimerElement_1 = tslib_1.__decorate([
    customElement('gdq-timer')
], GDQTimerElement);
export default GDQTimerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXRpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHMUMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFHM0QsSUFBcUIsZUFBZSx1QkFBcEMsTUFBcUIsZUFBZ0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQXNCM0QsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLE1BQU0sT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUU3RCxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRTdDLElBQUksTUFBTSxFQUFFO2dCQUNYLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQzdELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFO3dCQUNsQyxPQUFP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