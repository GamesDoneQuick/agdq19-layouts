import {Tweet} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

@customElement('ui-tweet')
export default class UiTweetElement extends Polymer.Element {
	@property({type: Object, observer: UiTweetElement.prototype.populateBody})
	tweet: Tweet;

	@property({type: String, computed: 'computeProfileUrl(tweet)'})
	profileUrl: string;

	@property({type: String, computed: 'computeTweetUrl(profileUrl, tweet)'})
	tweetUrl: string;

	@property({type: Boolean, reflectToAttribute: true})
	noAvatar = false;

	computeProfileUrl(tweet?: Tweet) {
		if (!tweet || !tweet.user) {
			return;
		}

		return `https://twitter.com/${tweet.user.screen_name}`;
	}

	computeTweetUrl(profileUrl?: string, tweet?: Tweet) {
		if (!profileUrl || !tweet) {
			return;
		}

		return `${profileUrl}/status/${tweet.id_str}`;
	}

	populateBody() {
		if (!this.tweet) {
			return;
		}

		this.$.body.innerHTML = this.tweet.text;
	}
}
