import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomGradientTextElement = class AtomGradientTextElement extends Polymer.Element {
    ready() {
        super.ready();
        // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880
        this.shadowRoot.querySelectorAll('sc-fitted-text').forEach(node => {
            node.$.fittedContent.style.webkitBackgroundClip = 'text';
        });
    }
};
tslib_1.__decorate([
    property({ type: String })
], AtomGradientTextElement.prototype, "text", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true })
], AtomGradientTextElement.prototype, "align", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomGradientTextElement.prototype, "maxWidth", void 0);
AtomGradientTextElement = tslib_1.__decorate([
    customElement('atom-gradient-text')
], AtomGradientTextElement);
export default AtomGradientTextElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1ncmFkaWVudC10ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRvbS1ncmFkaWVudC10ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsdUJBQXVCLEdBQTVDLE1BQXFCLHVCQUF3QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBVW5FLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCwrRUFBK0U7UUFDL0UsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNqRSxJQUFZLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsTUFBTSxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFoQkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7cURBQ1o7QUFHYjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7c0RBQ3JDO0FBR2Q7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7eURBQ1I7QUFSRyx1QkFBdUI7SUFEM0MsYUFBYSxDQUFDLG9CQUFvQixDQUFDO0dBQ2YsdUJBQXVCLENBa0IzQztlQWxCb0IsdUJBQXVCIn0=