import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQCountdownAnim = class GDQCountdownAnim extends Polymer.Element {
    ready() {
        super.ready();
        this.activeLoop();
    }
    activeLoop() {
        this.active = Math.floor(Math.random() * 8) + 1;
        console.log("loop " + this.active);
        setTimeout(this.activeLoop.bind(this), 3000);
    }
};
tslib_1.__decorate([
    property({ type: Number, notify: true })
], GDQCountdownAnim.prototype, "active", void 0);
GDQCountdownAnim = tslib_1.__decorate([
    customElement('gdq-countdown-anim')
], GDQCountdownAnim);
export default GDQCountdownAnim;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi1hbmltLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWNvdW50ZG93bi1hbmltLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsZ0JBQWdCLEdBQXJDLE1BQXFCLGdCQUFpQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBSTVELEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELFVBQVU7UUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FLRCxDQUFBO0FBaEJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0RBQ3hCO0FBRkssZ0JBQWdCO0lBRHBDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztHQUNmLGdCQUFnQixDQWtCcEM7ZUFsQm9CLGdCQUFnQiJ9