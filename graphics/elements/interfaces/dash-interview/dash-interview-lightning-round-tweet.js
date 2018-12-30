import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const questionSortMapRep = nodecg.Replicant('interview_questionSortMap');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashInterviewLightningRoundTweetElement = class DashInterviewLightningRoundTweetElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this._initialized = false;
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this._initialized) {
            this._initialized = true;
            questionSortMapRep.on('change', newVal => {
                this._questionSortMap = newVal;
            });
        }
    }
    reject() {
        if (!this.tweet) {
            return;
        }
        const button = this.$.reject;
        button.disabled = true;
        nodecg.sendMessage('interview:markQuestionAsDone', this.tweet.id_str, error => {
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
    _computeTweetId(prizeId) {
        return prizeId;
    }
    _computeFirst(tweet, questionSortMap) {
        if (!tweet || !Array.isArray(questionSortMap)) {
            return;
        }
        const sortMapIndex = questionSortMap.findIndex(entry => entry === this.tweet.id_str);
        return sortMapIndex === 0;
    }
    _firstChanged(newVal) {
        this.parentNode.parentNode.host.style.backgroundColor = newVal ? '#BDE7C4' : '';
    }
};
tslib_1.__decorate([
    property({ type: Object })
], DashInterviewLightningRoundTweetElement.prototype, "tweet", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, computed: '_computeTweetId(tweet.id_str)' })
], DashInterviewLightningRoundTweetElement.prototype, "tweetId", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        reflectToAttribute: true,
        computed: '_computeFirst(tweet, _questionSortMap)',
        observer: '_firstChanged'
    })
], DashInterviewLightningRoundTweetElement.prototype, "first", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewLightningRoundTweetElement.prototype, "_questionSortMap", void 0);
DashInterviewLightningRoundTweetElement = tslib_1.__decorate([
    customElement('dash-interview-lightning-round-tweet')
], DashInterviewLightningRoundTweetElement);
export default DashInterviewLightningRoundTweetElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLXR3ZWV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLXR3ZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUEyQiwyQkFBMkIsQ0FBQyxDQUFDO0FBRW5HOzs7O0dBSUc7QUFFSCxJQUFxQix1Q0FBdUMsR0FBNUQsTUFBcUIsdUNBQXdDLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTnpHOzs7O09BSUc7SUFDSDs7UUFtQlMsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFrRDlCLENBQUM7SUFoREEsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFFRCxNQUFNO1FBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTztTQUNQO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUE0QixDQUFDO1FBQ25ELE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDN0UsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUU7b0JBQ2pELE1BQU0sRUFBRTt3QkFDUCxJQUFJLEVBQUUsc0NBQXNDO3FCQUM1QztvQkFDRCxPQUFPLEVBQUUsSUFBSTtvQkFDYixRQUFRLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsZUFBZSxDQUFDLE9BQWU7UUFDOUIsT0FBTyxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFhLEVBQUUsZUFBMEM7UUFDdEUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDOUMsT0FBTztTQUNQO1FBRUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JGLE9BQU8sWUFBWSxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsYUFBYSxDQUFDLE1BQWU7UUFDM0IsSUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxRixDQUFDO0NBQ0QsQ0FBQTtBQWxFQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztzRUFDWjtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLCtCQUErQixFQUFDLENBQUM7d0VBQzlFO0FBUWhCO0lBTkMsUUFBUSxDQUFDO1FBQ1QsSUFBSSxFQUFFLE9BQU87UUFDYixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFFBQVEsRUFBRSx3Q0FBd0M7UUFDbEQsUUFBUSxFQUFFLGVBQWU7S0FDekIsQ0FBQztzRUFDYTtBQUdmO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO2lGQUNtQjtBQWhCdkIsdUNBQXVDO0lBRDNELGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQztHQUNqQyx1Q0FBdUMsQ0FvRTNEO2VBcEVvQix1Q0FBdUMifQ==