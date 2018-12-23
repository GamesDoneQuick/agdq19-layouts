import {Tweet} from '../../../../src/types';
import {InterviewQuestionSortMap} from '../../../../src/types/schemas/interview_questionSortMap';

const {customElement, property} = Polymer.decorators;
const questionSortMapRep = nodecg.Replicant<InterviewQuestionSortMap>('interview_questionSortMap');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('dash-interview-lightning-round-tweet')
export default class DashInterviewLightningRoundTweetElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	tweet: Tweet;

	@property({type: String, reflectToAttribute: true, computed: '_computeTweetId(tweet.id_str)'})
	tweetId: string;

	@property({
		type: Boolean,
		reflectToAttribute: true,
		computed: '_computeFirst(tweet, _questionSortMap)',
		observer: '_firstChanged'
	})
	first: boolean;

	@property({type: Array})
	_questionSortMap: InterviewQuestionSortMap;

	private _initialized = false;

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

		const button = this.$.promote as PaperButtonElement;
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

		const button = this.$.reject as PaperButtonElement;
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

	_computeTweetId(prizeId: number) {
		return prizeId;
	}

	_computeFirst(tweet?: Tweet, questionSortMap?: InterviewQuestionSortMap) {
		if (!tweet || !Array.isArray(questionSortMap)) {
			return;
		}

		const sortMapIndex = questionSortMap.findIndex(entry => entry === this.tweet.id_str);
		return sortMapIndex === 0;
	}

	_firstChanged(newVal: boolean) {
		(this as any).parentNode.host.style.backgroundColor = newVal ? '#BDE7C4' : '';
	}
}
