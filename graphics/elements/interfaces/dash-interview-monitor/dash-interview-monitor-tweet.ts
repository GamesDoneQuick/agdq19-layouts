import {Tweet} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

@customElement('dash-interview-monitor-tweet')
export default class DashInterviewMonitorTweetElement extends Polymer.Element {
	@property({type: Object, observer: DashInterviewMonitorTweetElement.prototype.populateBody})
	tweet: Tweet;

	populateBody() {
		if (!this.tweet) {
			return;
		}

		this.$.body.innerHTML = this.tweet.text;
	}
}
