import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const questions = nodecg.Replicant('interview_questionTweets');
const questionShowing = nodecg.Replicant('interview_questionShowing');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashInterviewLightningRoundElement = class DashInterviewLightningRoundElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this.questionShowing = false;
    }
    ready() {
        super.ready();
        questions.on('change', newVal => {
            this.set('replies', newVal);
        });
        questionShowing.on('change', newVal => {
            this.questionShowing = newVal;
        });
    }
    openEndInterviewDialog() {
        this.$.endInterviewDialog.open();
    }
    endInterview() {
        nodecg.sendMessage('interview:end');
    }
};
tslib_1.__decorate([
    property({ type: Boolean, notify: true })
], DashInterviewLightningRoundElement.prototype, "questionShowing", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashInterviewLightningRoundElement.prototype, "replies", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashInterviewLightningRoundElement.prototype, "_markingTopQuestionAsDone", void 0);
DashInterviewLightningRoundElement = tslib_1.__decorate([
    customElement('dash-interview-lightning-round')
], DashInterviewLightningRoundElement);
export default DashInterviewLightningRoundElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hFLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsMkJBQTJCLENBQUMsQ0FBQztBQUUvRTs7OztHQUlHO0FBRUgsSUFBcUIsa0NBQWtDLEdBQXZELE1BQXFCLGtDQUFtQyxTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQU5wRzs7OztPQUlHO0lBQ0g7O1FBR0Msb0JBQWUsR0FBRyxLQUFLLENBQUM7SUEyQnpCLENBQUM7SUFuQkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQXlDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELFlBQVk7UUFDWCxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7Q0FDRCxDQUFBO0FBM0JBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7MkVBQ2hCO0FBR3hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21FQUNSO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO3FGQUNTO0FBUmYsa0NBQWtDO0lBRHRELGFBQWEsQ0FBQyxnQ0FBZ0MsQ0FBQztHQUMzQixrQ0FBa0MsQ0E2QnREO2VBN0JvQixrQ0FBa0MifQ==