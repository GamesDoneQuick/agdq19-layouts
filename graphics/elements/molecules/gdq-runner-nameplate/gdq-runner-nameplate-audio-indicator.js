import * as tslib_1 from "tslib";
import { TweenLite, Power3 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQNameplateAudioIndicatorElement = class GDQNameplateAudioIndicatorElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.vertPos = 'top';
        this.horizPos = 'left';
        this.animationDuration = 0.25;
        this._maskProxy = [-10, -10, 0];
    }
    ready() {
        super.ready();
        this.$.body.style.webkitMaskImage = `linear-gradient(
			to right,
			rgba(0,0,0,1) ${this._maskProxy[0]}%,
			rgba(0,0,0,1) ${this._maskProxy[1]}%,
			rgba(0,0,0,0) ${this._maskProxy[2]}%
		)`;
    }
    show() {
        return this._animateMask(100, 100, 110);
    }
    hide() {
        return this._animateMask(-10, -10, 0);
    }
    _animateMask(stopOne, stopTwo, stopThree) {
        return TweenLite.to(this._maskProxy, this.animationDuration, {
            0: stopOne,
            1: stopTwo,
            2: stopThree,
            ease: Power3.easeOut,
            callbackScope: this,
            onUpdate() {
                this.$.body.style.webkitMaskImage = `linear-gradient(
					to right,
					rgba(0,0,0,1) ${this._maskProxy[0]}%,
					rgba(0,0,0,1) ${this._maskProxy[1]}%,
					rgba(0,0,0,0) ${this._maskProxy[2]}%
				)`;
            }
        });
    }
    _showingChanged(newVal) {
        if (newVal) {
            return this.show();
        }
        return this.hide();
    }
};
tslib_1.__decorate([
    property({ type: Boolean, observer: '_showingChanged' })
], GDQNameplateAudioIndicatorElement.prototype, "showing", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GDQNameplateAudioIndicatorElement.prototype, "vertPos", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GDQNameplateAudioIndicatorElement.prototype, "horizPos", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQNameplateAudioIndicatorElement.prototype, "animationDuration", void 0);
tslib_1.__decorate([
    property({ type: Array })
], GDQNameplateAudioIndicatorElement.prototype, "_maskProxy", void 0);
GDQNameplateAudioIndicatorElement = tslib_1.__decorate([
    customElement('gdq-runner-nameplate-audio-indicator')
], GDQNameplateAudioIndicatorElement);
export default GDQNameplateAudioIndicatorElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtYXVkaW8taW5kaWNhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtYXVkaW8taW5kaWNhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUV2QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsaUNBQWlDLEdBQXRELE1BQXFCLGlDQUFrQyxTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTDlFOzs7T0FHRztJQUNIOztRQU1DLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFHaEIsYUFBUSxHQUFHLE1BQU0sQ0FBQztRQUdsQixzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFHUixlQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQTZDN0MsQ0FBQztJQTNDQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFZLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRzs7bUJBRTVCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO21CQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzttQkFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0gsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELElBQUk7UUFDSCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELFlBQVksQ0FBQyxPQUFlLEVBQUUsT0FBZSxFQUFFLFNBQWlCO1FBQy9ELE9BQU8sU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUM1RCxDQUFDLEVBQUUsT0FBTztZQUNWLENBQUMsRUFBRSxPQUFPO1lBQ1YsQ0FBQyxFQUFFLFNBQVM7WUFDWixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsUUFBUTtnQkFDUCxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHOztxQkFFbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7cUJBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO3FCQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztNQUNqQyxDQUFDO1lBQ0osQ0FBQztTQUNELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxlQUFlLENBQUMsTUFBZTtRQUM5QixJQUFJLE1BQU0sRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO1FBRUQsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUNELENBQUE7QUF6REE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxDQUFDO2tFQUN0QztBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7a0VBQ25DO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzttRUFDakM7QUFHbEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7NEVBQ0E7QUFHekI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7cUVBQ29CO0FBZHhCLGlDQUFpQztJQURyRCxhQUFhLENBQUMsc0NBQXNDLENBQUM7R0FDakMsaUNBQWlDLENBMkRyRDtlQTNEb0IsaUNBQWlDIn0=