import {Tweet} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;
const questions = nodecg.Replicant<Tweet[]>('interview_questionTweets');
const questionShowing = nodecg.Replicant<boolean>('interview_questionShowing');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('dash-interview-lightning-round')
export default class DashInterviewLightningRoundElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Boolean, notify: true})
	questionShowing = false;

	@property({type: Object})
	replies: Tweet[];

	@property({type: Boolean})
	_markingTopQuestionAsDone: boolean;

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
		(this.$.endInterviewDialog as PaperDialogElement).open();
	}

	endInterview() {
		nodecg.sendMessage('interview:end');
	}
}
