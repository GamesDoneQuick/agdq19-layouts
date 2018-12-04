import * as tslib_1 from "tslib";
import MapSortMixin from '../../../mixins/map-sort-mixin';
const { customElement, property } = Polymer.decorators;
const questionTweetsRep = nodecg.Replicant('interview:questionTweets');
const questionSortMapRep = nodecg.Replicant('interview:questionSortMap');
/**
 * @customElement
 * @polymer
 * @appliesMixin window.MapSortMixin
 */
let DashInterviewMonitorTweetsElement = class DashInterviewMonitorTweetsElement extends MapSortMixin(Polymer.MutableData(Polymer.Element)) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin window.MapSortMixin
     */
    constructor() {
        super(...arguments);
        this.pgmTweet = null;
    }
    ready() {
        super.ready();
        // Fades new question nodes from purple to white when added.
        this._flashAddedNodes(this.shadowRoot, 'dash-interview-monitor-tweet', node => {
            const firstChild = this.shadowRoot.querySelector('dash-interview-monitor-tweet');
            const isFirstChild = node === firstChild;
            return !isFirstChild;
        });
        questionTweetsRep.on('change', newVal => {
            if (!newVal || newVal.length === 0) {
                this.questionTweets = [];
                return;
            }
            this.questionTweets = newVal;
        });
        questionSortMapRep.on('change', (newVal, _oldVal, operations) => {
            this._sortMapVal = newVal;
            this.$.repeat.render();
            if (newVal.length > 0 && this._shouldFlash(operations)) {
                this._flashElementBackground(this);
            }
        });
    }
    _computeNoQuestionTweets(questionTweets) {
        return !questionTweets || questionTweets.length <= 0;
    }
    _calcPgmTweet(questionTweets, _sortMapVal) {
        if (!questionTweets || !_sortMapVal) {
            return;
        }
        return questionTweets.find(tweet => {
            return _sortMapVal.indexOf(tweet.id_str) === 0;
        });
    }
    _pgmTweetChanged(newVal, oldVal) {
        if (!newVal) {
            return;
        }
        if (newVal && oldVal && newVal.id_str === oldVal.id_str) {
            return;
        }
        this.$.repeat.render();
        Polymer.flush();
        const firstMonitorTweet = this.shadowRoot.querySelector('dash-interview-monitor-tweet');
        if (!firstMonitorTweet) {
            return;
        }
        this._flashElementBackground(firstMonitorTweet.$.material, { endColor: '#DDFEDF' });
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewMonitorTweetsElement.prototype, "questionTweets", void 0);
tslib_1.__decorate([
    property({ type: Boolean, computed: '_computeNoQuestionTweets(questionTweets)' })
], DashInterviewMonitorTweetsElement.prototype, "noQuestionTweets", void 0);
tslib_1.__decorate([
    property({
        type: Object,
        computed: '_calcPgmTweet(questionTweets, _sortMapVal)',
        observer: '_pgmTweetChanged'
    })
], DashInterviewMonitorTweetsElement.prototype, "pgmTweet", void 0);
DashInterviewMonitorTweetsElement = tslib_1.__decorate([
    customElement('dash-interview-monitor-tweets')
], DashInterviewMonitorTweetsElement);
export default DashInterviewMonitorTweetsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctbW9uaXRvci10d2VldHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWludGVydmlldy1tb25pdG9yLXR3ZWV0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxZQUFZLE1BQU0sZ0NBQWdDLENBQUM7QUFJMUQsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0saUJBQWlCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSwwQkFBMEIsQ0FBQyxDQUFDO0FBQ2hGLE1BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBNkIsMkJBQTJCLENBQUMsQ0FBQztBQUVyRzs7OztHQUlHO0FBRUgsSUFBcUIsaUNBQWlDLEdBQXRELE1BQXFCLGlDQUFrQyxTQUFRLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQU5qSDs7OztPQUlHO0lBQ0g7O1FBYUMsYUFBUSxHQUFpQixJQUFJLENBQUM7SUFnRS9CLENBQUM7SUE5REEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLDREQUE0RDtRQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVcsRUFBRSw4QkFBOEIsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUM5RSxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVyxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1lBQ2xGLE1BQU0sWUFBWSxHQUFHLElBQUksS0FBSyxVQUFVLENBQUM7WUFDekMsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFB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