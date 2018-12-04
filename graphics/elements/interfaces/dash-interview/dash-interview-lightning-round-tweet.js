import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const questionSortMapRep = nodecg.Replicant('interview:questionSortMap');
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
    promote() {
        if (!this.tweet) {
            return;
        }
        const button = this.$.promote;
        button.disabled = true;
        nodecg.sendMessage('interview:promoteQuestionToTop', this.tweet.id_str, error => {
            button.disabled = false;
            if (error) {
                this.dispatchEvent(new CustomEvent('error-toast', {
                    detail: {
                        text: 'Failed to promote interview question.'
                    },
                    bubbles: true,
                    composed: true
                }));
            }
        });
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
        this.parentNode.host.style.backgroundColor = newVal ? '#BDE7C4' : '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLXR3ZWV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1pbnRlcnZpZXctbGlnaHRuaW5nLXJvdW5kLXR3ZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUE2QiwyQkFBMkIsQ0FBQyxDQUFDO0FBRXJHOzs7O0dBSUc7QUFFSCxJQUFxQix1Q0FBdUMsR0FBNUQsTUFBcUIsdUNBQXdDLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTnpHOzs7O09BSUc7SUFDSDs7UUFtQlMsaUJBQVksR0FBRyxLQUFLLENBQUM7SUF1RTlCLENBQUM7SUFyRUEsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7U0FDSDtJQUNGLENBQUM7SUFFRCxPQUFPO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDaEIsT0FBTztTQUNQO1FBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUE2QixDQUFDO1FBQ3BELE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxD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