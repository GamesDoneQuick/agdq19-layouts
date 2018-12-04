import {Tweet, TweetMedia} from '../../../src/types/Twitter';
const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('fanart-item')
export default class FanartItemElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	value: Tweet;

	preview() {
		this.dispatchEvent(new CustomEvent('preview'));
	}

	accept() {
		nodecg.sendMessage('acceptFanart', this.value);
	}

	reject() {
		nodecg.sendMessage('rejectTweet', this.value.id_str);
	}

	_calcIndicatorHidden(tweetMedia?: TweetMedia) {
		return !tweetMedia || !Array.isArray(tweetMedia) || tweetMedia.length <= 1;
	}

	_computeImageUrl(tweetMedia?: TweetMedia) {
		if (tweetMedia && tweetMedia[0]) {
			return tweetMedia[0].media_url_https;
		}

		return '';
	}
}
