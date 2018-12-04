import {TimelineLite} from 'gsap';
import {Tweet} from '../../../../src/types/index';
import {Interview3AquestionTweets} from '../../../../src/types/schemas/interview%3AquestionTweets';
import {Interview3AquestionSortMap} from '../../../../src/types/schemas/interview%3AquestionSortMap';
import {Interview3AquestionShowing} from '../../../../src/types/schemas/interview%3AquestionShowing';
import GDQTweetElement from '../gdq-tweet/gdq-tweet';

const {customElement, property} = Polymer.decorators;

const questions = nodecg.Replicant<Interview3AquestionTweets>('interview:questionTweets');
const questionSortMap = nodecg.Replicant<Interview3AquestionSortMap>('interview:questionSortMap');
const questionShowing = nodecg.Replicant<Interview3AquestionShowing>('interview:questionShowing');

@customElement('gdq-interview-question')
export default class GDQInterviewQuestionElement extends Polymer.Element {
	@property({type: Object, computed: 'calcOnScreenTweet(_questionsVal, _sortMapVal)'})
	onScreenTweet: Tweet | null = null;

	_timeline = new TimelineLite({autoRemoveChildren: true});
	_questionsVal?: Interview3AquestionTweets;
	_sortMapVal?: Interview3AquestionSortMap;
	_initialized = false;

	ready() {
		super.ready();

		questions.on('change', newVal => {
			this._questionsVal = newVal.slice(0);
		});

		questionSortMap.on('change', newVal => {
			this._sortMapVal = newVal.slice(0);
		});

		questionShowing.on('change', newVal => {
			if (newVal) {
				this.show();
			} else {
				this.hide();
			}
			this._initialized = true;
		});
	}

	show() {
		if (!this.onScreenTweet) {
			return;
		}
		const tweetEl = this.$.tweet as GDQTweetElement;

		this._timeline.call(() => {
			tweetEl._addReset();
			tweetEl._createEntranceAnim(this.onScreenTweet!);
		}, undefined, null, '+=0.5');
	}

	hide() {
		if (!this._initialized) {
			return;
		}

		this._timeline.call(() => {
			(this.$.tweet as GDQTweetElement)._createExitAnim();
		}, undefined, null, '+=0.5');
	}

	calcOnScreenTweet(_questionsVal?: Interview3AquestionTweets, _sortMapVal?: Interview3AquestionSortMap) {
		if (!_questionsVal || !_sortMapVal) {
			return;
		}

		return _questionsVal.find(reply => {
			return _sortMapVal.indexOf(reply.id_str) === 0;
		});
	}
}
