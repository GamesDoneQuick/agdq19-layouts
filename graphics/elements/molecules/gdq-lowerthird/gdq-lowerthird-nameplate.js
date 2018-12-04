import * as tslib_1 from "tslib";
var GDQLowerthirdNameplateElement_1;
import { Power2, TimelineLite, TweenLite } from 'gsap';
const ENTRANCE_ANIM_DURATION = 0.5;
const ENTRANCE_ANIM_EASE = Power2.easeInOut;
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQLowerthirdNameplateElement = GDQLowerthirdNameplateElement_1 = class GDQLowerthirdNameplateElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.header = false;
    }
    enter() {
        const tl = new TimelineLite();
        tl.to(this.$.occluder, ENTRANCE_ANIM_DURATION, {
            x: '250%',
            ease: ENTRANCE_ANIM_EASE
        }, 0);
        tl.to(this.$.clipped, ENTRANCE_ANIM_DURATION, {
            clipPath: 'inset(0 0% 0 0)',
            ease: ENTRANCE_ANIM_EASE
        }, 0);
        tl.to(this.$.title, 0.4, {
            y: '0%',
            ease: Power2.easeOut,
            onStart: () => {
                this.$.title.style.opacity = '1';
                this.$['title-text'].maxWidth = this.$.title.clientWidth - 60;
            }
        }, '-=0.1');
        return tl;
    }
    reset() {
        TweenLite.set(this.$.occluder, { x: '-100%' });
        TweenLite.set(this.$.clipped, { clipPath: 'inset(0 100% 0 0)' });
        TweenLite.set(this.$.title, { y: '-100%', opacity: 0 });
    }
    _nameChanged(newVal) {
        return this.$.nameplate.updateName({ alias: newVal, rotate: false });
    }
    _computeHasTitle(title) {
        return Boolean(title && title.trim().length > 0);
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQLowerthirdNameplateElement.prototype, "header", void 0);
tslib_1.__decorate([
    property({ type: String, observer: GDQLowerthirdNameplateElement_1.prototype._nameChanged })
], GDQLowerthirdNameplateElement.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQLowerthirdNameplateElement.prototype, "title", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, computed: '_computeHasTitle(title)' })
], GDQLowerthirdNameplateElement.prototype, "hasTitle", void 0);
GDQLowerthirdNameplateElement = GDQLowerthirdNameplateElement_1 = tslib_1.__decorate([
    customElement('gdq-lowerthird-nameplate')
], GDQLowerthirdNameplateElement);
export default GDQLowerthirdNameplateElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWxvd2VydGhpcmQtbmFtZXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWxvd2VydGhpcmQtbmFtZXBsYXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR3JELE1BQU0sc0JBQXNCLEdBQUcsR0FBRyxDQUFDO0FBQ25DLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUM1QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsNkJBQTZCLHFDQUFsRCxNQUFxQiw2QkFBOEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUwxRTs7O09BR0c7SUFDSDs7UUFHQyxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBaURoQixDQUFDO0lBdENBLEtBQUs7UUFDSixNQUFNLEVBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsc0JBQXNCLEVBQUU7WUFDOUMsQ0FBQyxFQUFFLE1BQU07WUFDVCxJQUFJLEVBQUUsa0JBQWtCO1NBQ3hCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFO1lBQzdDLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsSUFBSSxFQUFFLGtCQUFrQjtTQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7WUFDeEIsQ0FBQyxFQUFFLElBQUk7WUFDUCxJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU87WUFDcEIsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQXdCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDeEUsQ0FBQztTQUNELEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFWixPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxLQUFLO1FBQ0osU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFDLENBQUMsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBQzdDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUMsQ0FBQyxDQUFDO1FBQy9ELFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxZQUFZLENBQUMsTUFBYztRQUMxQixPQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBa0MsQ0FBQyxVQUFVLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhO1FBQzdCLE9BQU8sT0FBTyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRCxDQUFBO0FBakRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzs2REFDckM7QUFHZjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLCtCQUE2QixDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUMsQ0FBQzsyREFDNUU7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs0REFDWDtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLHlCQUF5QixFQUFDLENBQUM7K0RBQ3ZFO0FBWEUsNkJBQTZCO0lBRGpELGFBQWEsQ0FBQywwQkFBMEIsQ0FBQztHQUNyQiw2QkFBNkIsQ0FtRGpEO2VBbkRvQiw2QkFBNkIifQ==