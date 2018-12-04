import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Power3, Sine } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQNameplateResultElement = class GDQNameplateResultElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this._tl = new TimelineLite({ autoRemoveChildren: true });
    }
    ready() {
        super.ready();
        TweenLite.set(this, { x: 0 });
        TweenLite.set(this.$.cover, { scaleX: 1 });
        TweenLite.set(this.$.place, { scaleX: 0 });
    }
    show() {
        const anim = new TimelineLite();
        anim.to(this, 0.5, {
            x: this.side === 'left' ? '-100%' : '100%',
            ease: Power3.easeIn
        });
        anim.to(this.$.cover, 0.5, {
            scaleX: 0,
            ease: Power3.easeOut
        });
        anim.to(this.$.place, 0.182, {
            scaleX: 1,
            ease: Sine.easeOut
        });
        return anim;
    }
    hide() {
        const anim = new TimelineLite();
        anim.to(this.$.place, 0.182, {
            scaleX: 0,
            ease: Sine.easeIn
        });
        anim.to(this.$.cover, 0.5, {
            scaleX: 1,
            ease: Power3.easeIn
        });
        anim.to(this, 0.5, {
            x: '0%',
            ease: Power3.easeOut
        });
        return anim;
    }
    _showingChanged(newVal) {
        const anim = newVal ? this.show() : this.hide();
        this._tl.add(anim);
    }
    _calcPlaceText(place, forfeit) {
        return forfeit ? 'X' : place;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, observer: '_showingChanged' })
], GDQNameplateResultElement.prototype, "showing", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "side", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQNameplateResultElement.prototype, "place", void 0);
tslib_1.__decorate([
    property({ type: String })
], GDQNameplateResultElement.prototype, "time", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "firstPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "lastPlace", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQNameplateResultElement.prototype, "forfeit", void 0);
GDQNameplateResultElement = tslib_1.__decorate([
    customElement('gdq-runner-nameplate-result')
], GDQNameplateResultElement);
export default GDQNameplateResultElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtcmVzdWx0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXJ1bm5lci1uYW1lcGxhdGUtcmVzdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRTNELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7O0dBR0c7QUFFSCxJQUFxQix5QkFBeUIsR0FBOUMsTUFBcUIseUJBQTBCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMdEU7OztPQUdHO0lBQ0g7O1FBdUJrQixRQUFHLEdBQUcsSUFBSSxZQUFZLENBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBeURyRSxDQUFDO0lBdkRBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQzVCLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUN6QyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUk7UUFDSCxNQUFNLElBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNsQixDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8s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