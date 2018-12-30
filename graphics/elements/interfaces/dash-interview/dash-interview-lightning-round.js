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
    _handleItemRemoval(event) {
        event.preventDefault();
        console.log(event);
        const tweet = event.detail.model.item;
        if (!tweet) {
            return;
        }
        const button = event.detail.listItemElement.$.removeButton;
        button.disabled = true;
        nodecg.sendMessage('interview:markQuestionAsDone', tweet.id_str, error => {
            button.disabled = false;
            if (error) {
                this.dispatchEvent(new CustomEvent('error-toast', {
                    detail: {
                        text: 'Failed to reject interview question.'
                    },
                    bubbles: true,
                    composed: true
                }));
            }
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwwQkFBMEIsQ0FBQyxDQUFDO0FBQ3hFLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsMkJBQTJCLENBQUMsQ0FBQztBQUUvRTs7OztHQUlHO0FBRUgsSUFBcUIsa0NBQWtDLEdBQXZELE1BQXFCLGtDQUFtQyxTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQU5wRzs7OztPQUlHO0lBQ0g7O1FBR0Msb0JBQWUsR0FBRyxLQUFLLENBQUM7SUFvRHpCLENBQUM7SUE1Q0EsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQXlDLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELFlBQVk7UUFDWCxNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFZO1FBQzlCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5CLE1BQU0sS0FBSyxHQUFJLEtBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUMvQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1gsT0FBTztTQUNQO1FBRUQsTUFBTSxNQUFNLEdBQUksS0FBYSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFlBQWtDLENBQUM7UUFDMUYsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDdkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3hFLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLElBQUksS0FBSyxFQUFFO2dCQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFO29CQUNqRCxNQUFNLEVBQUU7d0JBQ1AsSUFBSSxFQUFFLHNDQUFzQztxQkFDNUM7b0JBQ0QsT0FBTyxFQUFFLElBQUk7b0JBQ2IsUUFBUSxFQUFFLElBQUk7aUJBQ2QsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFwREE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQzsyRUFDaEI7QUFHeEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7bUVBQ1I7QUFHakI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUM7cUZBQ1M7QUFSZixrQ0FBa0M7SUFEdEQsYUFBYSxDQUFDLGdDQUFnQyxDQUFDO0dBQzNCLGtDQUFrQyxDQXNEdEQ7ZUF0RG9CLGtDQUFrQyJ9