import {Tweet} from '../../../src/types/Twitter';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('tweet-item')
export default class TweetItemElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	value: Tweet;

	accept() {
		nodecg.sendMessage('acceptTweet', this.value);
	}

	reject() {
		nodecg.sendMessage('rejectTweet', this.value.id_str);
	}
}
