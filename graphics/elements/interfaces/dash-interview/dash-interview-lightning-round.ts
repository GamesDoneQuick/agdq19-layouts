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

	_handleItemRemoval(event: Event) {
		event.preventDefault();
		console.log(event);

		const tweet = (event as any).detail.model.item;
		if (!tweet) {
			return;
		}

		const button = (event as any).detail.listItemElement.$.removeButton as PaperButtonElement;
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
}
