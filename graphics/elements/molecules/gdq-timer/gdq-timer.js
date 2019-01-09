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
                    this._flash(timerTL);
                }
                else if (newVal.state !== 'running' && newVal.state !== oldVal.state) {
                    timerTL.clear();
                    this.$.startFlash.style.opacity = '0';
                }
                if (newVal.state === 'finished' && oldVal.state !== 'finished') {
                    this._flash(timerTL);
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
    _flash(timeline) {
        return timeline.fromTo(this.$.startFlash, 1, {
            opacity: 0.5
        }, {
            opacity: 0,
            ease: Power2.easeIn
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXRpbWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXRpbWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHMUMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVksV0FBVyxDQUFDLENBQUM7QUFHM0QsSUFBcUIsZUFBZSx1QkFBcEMsTUFBcUIsZUFBZ0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQXNCM0QsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLE1BQU0sT0FBTyxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUM3RCxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNuQyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBRTdDLElBQUksTUFBTSxFQUFFO2dCQUNYLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7b0JBQzdELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ3JCO3FCQUFNLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUN2RSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUE2QixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO2lCQUMxRDtnQkFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssVUFBVSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO29CQUMvRCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNyQjthQUNEO1lBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsS0FBSyxLQUFLLGFBQWEsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDO1lBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxVQUFVLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWU7UUFDNUIsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN0QjtJQUNGLENBQUM7SUFFRCxlQUFlLENBQUMsTUFBZTtRQUM5QixJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3BCO0lBQ0YsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFXO1FBQzFCLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQVc7UUFDbkIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsbUJBQW1CLENBQUMsWUFBb0I7UUFDdkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQXNCO1FBQzVCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUU7WUFDNUMsT0FBTyxFQUFFLEdBQUc7U0FDWixFQUFFO1lBQ0YsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLE1BQU07U0FDbkIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFqRkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDO21EQUNoQztBQUdwQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxpQkFBZSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUMsQ0FBQzsrQ0FDdkY7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsaUJBQWUsQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFDLENBQUM7aURBQ3ZGO0FBR2xCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzhDQUNYO0FBR2Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0RBQ1Q7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0RBQ1Q7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7cURBQ0o7QUFwQkQsZUFBZTtJQURuQyxhQUFhLENBQUMsV0FBVyxDQUFDO0dBQ04sZUFBZSxDQW1GbkM7ZUFuRm9CLGVBQWUifQ==