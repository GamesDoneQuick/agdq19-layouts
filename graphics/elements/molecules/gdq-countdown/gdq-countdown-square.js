import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const countdownTime = nodecg.Replicant('countdown');
/**
 * @customElement
 * @polymer
 */
let GDQCountdownSquare = class GDQCountdownSquare extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.squareTimeline = new TimelineLite({ autoRemoveChildren: true });
        // am I active? if so, blink the frame on and off
        // if not, don't blink
        // am I Uyama?
        // if so, how much time is left?
        // if less than five minutes, animate a flash and turn into Uyama
        // animate Uyama face
    }
    ready() {
        super.ready();
        this.revealed = false;
        const tl = this.squareTimeline;
        countdownTime.on('change', newVal => {
            if (newVal.raw <= 61000 && this.revealed === false && this.index === 5) {
                nodecg.playSound('wily');
                tl.add(this.centerFlash());
                this.caption = 'Mike Uyama';
                this.revealed = true;
            }
            else if (newVal.raw > 61000 && this.index === 5) {
                tl.set(this.$['main-face'], { opacity: 1 });
                this.caption = 'GDQ';
                this.revealed = false;
            }
        });
    }
    _computeFrame(active) {
        if (active === this.index) {
            return 'frame frame_blink';
        }
        return 'frame';
    }
    centerFlash() {
        const tl = new TimelineLite();
        tl.addLabel('start', 0.03);
        tl.to(this.$.white, 0.75, { opacity: 1 }, 'start');
        tl.to(this.$['main-face'], 0.03, { opacity: 0 }, 'start+=0.75');
        tl.to(this.$.white, 0.75, { opacity: 0 }, 'start+=0.8');
        return tl;
    }
};
tslib_1.__decorate([
    property({ type: String })
], GDQCountdownSquare.prototype, "cast", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQCountdownSquare.prototype, "caption", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQCountdownSquare.prototype, "index", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], GDQCountdownSquare.prototype, "revealed", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQCountdownSquare.prototype, "active", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQCountdownSquare.prototype, "squareTimeline", void 0);
GDQCountdownSquare = tslib_1.__decorate([
    customElement('gdq-countdown-square')
], GDQCountdownSquare);
export default GDQCountdownSquare;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi1zcXVhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtY291bnRkb3duLXNxdWFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUUvRDs7O0dBR0c7QUFFSCxJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFML0Q7OztPQUdHO0lBQ0g7O1FBa0JrQixtQkFBYyxHQUFpQixJQUFJLFlBQVksQ0FBQyxFQUFDLGtCQUFrQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFzQzdGLGlEQUFpRDtRQUNqRCxzQkFBc0I7UUFFdEIsY0FBYztRQUNkLGdDQUFnQztRQUNoQyxpRUFBaUU7UUFDakUscUJBQXFCO0lBQ3RCLENBQUM7SUEzQ0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDL0IsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkMsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDdkUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDekIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ3JCO2lCQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2xELEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7YUFDdEI7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBYztRQUMzQixJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzFCLE9BQU8sbUJBQW1CLENBQUM7U0FDM0I7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNoQixDQUFDO0lBRUQsV0FBVztRQUNWLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFM0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDakQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUM5RCxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN0RCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7Q0FTRCxDQUFBO0FBNURBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2dEQUNaO0FBR2I7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7bURBQ1Q7QUFHaEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7aURBQ1g7QUFHZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztvREFDUjtBQUdsQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztrREFDVjtBQUdmO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzBEQUNvRTtBQWpCekUsa0JBQWtCO0lBRHRDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztHQUNqQixrQkFBa0IsQ0E4RHRDO2VBOURvQixrQkFBa0IifQ==