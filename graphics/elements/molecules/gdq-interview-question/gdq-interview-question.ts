import {TimelineLite} from 'gsap';
import {Tweet} from '../../../../src/types/index';
import {InterviewQuestionTweets} from '../../../../src/types/schemas/interview_questionTweets';
import {InterviewQuestionSortMap} from '../../../../src/types/schemas/interview_questionSortMap';
import {InterviewQuestionShowing} from '../../../../src/types/schemas/interview_questionShowing';
import GDQTweetElement from '../gdq-tweet/gdq-tweet';

const {customElement, property} = Polymer.decorators;

const questions = nodecg.Replicant<InterviewQuestionTweets>('interview_questionTweets');
const questionSortMap = nodecg.Replicant<InterviewQuestionSortMap>('interview_questionSortMap');
const questionShowing = nodecg.Replicant<InterviewQuestionShowing>('interview_questionShowing');

@customElement('gdq-interview-question')
export default class GDQInterviewQuestionElement extends Polymer.Element {
	@property({type: Object, computed: 'calcOnScreenTweet(_questionsVal, _sortMapVal)'})
	onScreenTweet: Tweet | null = null;

	_timeline = new TimelineLite({autoRemoveChildren: true});
	_questionsVal?: InterviewQuestionTweets;
	_sortMapVal?: InterviewQuestionSortMap;
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

	calcOnScreenTweet(_questionsVal?: InterviewQuestionTweets, _sortMapVal?: InterviewQuestionSortMap) {
		if (!_questionsVal || !_sortMapVal) {
			return;
		}

		return _questionsVal.find(reply => {
			return _sortMapVal.indexOf(reply.id_str) === 0;
		});
	}
}
