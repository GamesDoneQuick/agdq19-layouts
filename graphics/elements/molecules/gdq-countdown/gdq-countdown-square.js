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
        this.revealed = true;
    }
    ready() {
        super.ready();
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
    property({ type: Number })
], GDQCountdownSquare.prototype, "active", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQCountdownSquare.prototype, "squareTimeline", void 0);
GDQCountdownSquare = tslib_1.__decorate([
    customElement('gdq-countdown-square')
], GDQCountdownSquare);
export default GDQCountdownSquare;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi1zcXVhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtY291bnRkb3duLXNxdWFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBWSxXQUFXLENBQUMsQ0FBQztBQUUvRDs7O0dBR0c7QUFFSCxJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFML0Q7OztPQUdHO0lBQ0g7O1FBZWtCLG1CQUFjLEdBQWlCLElBQUksWUFBWSxDQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUVyRixhQUFRLEdBQUcsSUFBSSxDQUFDO0lBb0N6QixDQUFDO0lBbENBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLElBQUksTUFBTSxDQUFDLEdBQUcsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZFLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3pCLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO2dCQUM1QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQzthQUNyQjtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNsRCxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ3JCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBQ3RCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWM7UUFDM0IsSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMxQixPQUFPLG1CQUFtQixDQUFDO1NBQzNCO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUVELFdBQVc7UUFDVixNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTNCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDOUQsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDdEQsT0FBTyxFQUFFLENBQUM7SUFDWCxDQUFDO0NBQ0QsQ0FBQTtBQWxEQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztnREFDWjtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21EQUNUO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2lEQUNYO0FBR2Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7a0RBQ1Y7QUFHZjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzswREFDb0U7QUFkekUsa0JBQWtCO0lBRHRDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztHQUNqQixrQkFBa0IsQ0FvRHRDO2VBcERvQixrQkFBa0IifQ==