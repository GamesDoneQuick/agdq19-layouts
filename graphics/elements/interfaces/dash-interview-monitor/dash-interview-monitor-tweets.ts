import {Tweet} from '../../../../src/types';
import MapSortMixin from '../../../mixins/map-sort-mixin';
import {Interview3AquestionSortMap} from '../../../../src/types/schemas/interview%3AquestionSortMap';
import DashInterviewMonitorTweetElement from './dash-interview-monitor-tweet';

const {customElement, property} = Polymer.decorators;
const questionTweetsRep = nodecg.Replicant<Tweet[]>('interview:questionTweets');
const questionSortMapRep = nodecg.Replicant<Interview3AquestionSortMap>('interview:questionSortMap');

/**
 * @customElement
 * @polymer
 * @appliesMixin window.MapSortMixin
 */
@customElement('dash-interview-monitor-tweets')
export default class DashInterviewMonitorTweetsElement extends MapSortMixin(Polymer.MutableData(Polymer.Element)) {
	@property({type: Array})
	questionTweets: Tweet[];

	@property({type: Boolean, computed: '_computeNoQuestionTweets(questionTweets)'})
	noQuestionTweets: boolean;

	@property({
		type: Object,
		computed: '_calcPgmTweet(questionTweets, _sortMapVal)',
		observer: '_pgmTweetChanged'
	})
	pgmTweet: Tweet | null = null;

	ready() {
		super.ready();

		// Fades new question nodes from purple to white when added.
		this._flashAddedNodes(this.shadowRoot!, 'dash-interview-monitor-tweet', node => {
			const firstChild = this.shadowRoot!.querySelector('dash-interview-monitor-tweet');
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
			(this.$.repeat as Polymer.DomRepeat).render();

			if (newVal.length > 0 && this._shouldFlash(operations)) {
				this._flashElementBackground(this);
			}
		});
	}

	_computeNoQuestionTweets(questionTweets?: Tweet[]) {
		return !questionTweets || questionTweets.length <= 0;
	}

	_calcPgmTweet(questionTweets?: Tweet[], _sortMapVal?: Interview3AquestionSortMap) {
		if (!questionTweets || !_sortMapVal) {
			return;
		}

		return questionTweets.find(tweet => {
			return _sortMapVal.indexOf(tweet.id_str) === 0;
		});
	}

	_pgmTweetChanged(newVal: Tweet | null, oldVal: Tweet | null) {
		if (!newVal) {
			return;
		}

		if (newVal && oldVal && newVal.id_str === oldVal.id_str) {
			return;
		}

		(this.$.repeat as Polymer.DomRepeat).render();
		Polymer.flush();

		const firstMonitorTweet = this.shadowRoot!.querySelector('dash-interview-monitor-tweet') as DashInterviewMonitorTweetElement;
		if (!firstMonitorTweet) {
			return;
		}

		this._flashElementBackground(firstMonitorTweet.$.material as HTMLElement, {endColor: '#DDFEDF'});
	}
}
