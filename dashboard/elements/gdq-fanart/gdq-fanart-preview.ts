import {Tweet} from '../../../src/types/Twitter';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-fanart-preview')
export default class GDQFanartPreviewElement extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true})
	opened = false;

	@property({type: Object})
	_tweet: Tweet;

	@property({type: Number})
	_currentImageIndex = 0;

	ready() {
		super.ready();

		// Close when the background is clicked on.
		this.addEventListener('click', event => {
			if (event.composedPath()[0] === this) {
				this.close();
			}
		});
	}

	open(tweet: Tweet) {
		this.opened = true;
		this._currentImageIndex = 0;
		this._tweet = tweet;
		document.body.style.overflow = 'hidden';
	}

	close() {
		this.opened = false;
		document.body.style.overflow = '';
	}

	previous() {
		if (this._currentImageIndex <= 0) {
			this._currentImageIndex = 0;
		} else {
			this._currentImageIndex--;
		}
	}

	next() {
		if (!this._tweet || !this._tweetHasMedia(this._tweet)) {
			return;
		}

		const media = this._tweet.gdqMedia;
		if (!media) {
			return;
		}

		const maxIndex = media.length - 1;
		if (this._currentImageIndex >= maxIndex) {
			this._currentImageIndex = maxIndex;
		} else {
			this._currentImageIndex++;
		}
	}

	_calcImageSrc(tweet: Tweet, currentImageIndex: number) {
		if (!this._tweetHasMedia(tweet)) {
			return;
		}

		const media = tweet.gdqMedia;
		if (!media) {
			return;
		}

		return media[currentImageIndex].media_url_https;
	}

	_tweetHasMedia(tweet: Tweet) {
		return tweet && tweet.gdqMedia;
	}

	_calcPreviousDisabled(currentImageIndex: number) {
		return currentImageIndex <= 0;
	}

	_calcNextDisabled(tweet: Tweet, currentImageIndex: number) {
		if (!tweet || !this._tweetHasMedia(tweet)) {
			return true;
		}

		const media = this._tweet.gdqMedia;
		if (!media) {
			return;
		}

		const maxIndex = media.length - 1;
		return currentImageIndex >= maxIndex;
	}
}
