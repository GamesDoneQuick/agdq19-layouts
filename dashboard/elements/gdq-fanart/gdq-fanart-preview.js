import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQFanartPreviewElement = class GDQFanartPreviewElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.opened = false;
        this._currentImageIndex = 0;
    }
    ready() {
        super.ready();
        // Close when the background is clicked on.
        this.addEventListener('click', event => {
            if (event.composedPath()[0] === this) {
                this.close();
            }
        });
    }
    open(tweet) {
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
        }
        else {
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
        }
        else {
            this._currentImageIndex++;
        }
    }
    _calcImageSrc(tweet, currentImageIndex) {
        if (!this._tweetHasMedia(tweet)) {
            return;
        }
        const media = tweet.gdqMedia;
        if (!media) {
            return;
        }
        return media[currentImageIndex].media_url_https;
    }
    _tweetHasMedia(tweet) {
        return tweet && tweet.gdqMedia;
    }
    _calcPreviousDisabled(currentImageIndex) {
        return currentImageIndex <= 0;
    }
    _calcNextDisabled(tweet, currentImageIndex) {
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
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQFanartPreviewElement.prototype, "opened", void 0);
tslib_1.__decorate([
    property({ type: Object })
], GDQFanartPreviewElement.prototype, "_tweet", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQFanartPreviewElement.prototype, "_currentImageIndex", void 0);
GDQFanartPreviewElement = tslib_1.__decorate([
    customElement('gdq-fanart-preview')
], GDQFanartPreviewElement);
export default GDQFanartPreviewElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWZhbmFydC1wcmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLWZhbmFydC1wcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIsdUJBQXVCLEdBQTVDLE1BQXFCLHVCQUF3QixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTHBFOzs7T0FHRztJQUNIOztRQUdDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFNZix1QkFBa0IsR0FBRyxDQUFDLENBQUM7SUFxRnhCLENBQUM7SUFuRkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLDJDQUEyQztRQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLElBQUksS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDckMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQ2I7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLENBQUMsS0FBWTtRQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDekMsQ0FBQztJQUVELEtBQUs7UUFDSixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxRQUFRO1FBQ1AsSUFBSSxJQUFJLENBQUMsa0JBQWtCLElBQUksQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNOLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzFCO0lBQ0YsQ0FBQztJQUVELElBQUk7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RELE9BQU87U0FDUDtRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ25DLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCxPQUFPO1NBQ1A7UUFFRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNsQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxRQUFRLEVBQUU7WUFDeEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQztTQUNuQzthQUFNO1lBQ04sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDMUI7SUFDRixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQVksRUFBRSxpQkFBeUI7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDaEMsT0FBTztTQUNQO1FBRUQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1gsT0FBTztTQUNQO1FBRUQsT0FBTyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxlQUFlLENBQUM7SUFDakQsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFZO1FBQzFCLE9BQU8sS0FBSyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUM7SUFDaEMsQ0FBQztJQUVELHFCQUFxQixDQUFDLGlCQUF5QjtRQUM5QyxPQUFPLGlCQUFpQixJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBWSxFQUFFLGlCQUF5QjtRQUN4RCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLE9BQU87U0FDUDtRQUVELE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8saUJBQWlCLElBQUksUUFBUSxDQUFDO0lBQ3RDLENBQUM7Q0FDRCxDQUFBO0FBM0ZBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzt1REFDckM7QUFHZjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt1REFDWDtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21FQUNGO0FBUkgsdUJBQXVCO0lBRDNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztHQUNmLHVCQUF1QixDQTZGM0M7ZUE3Rm9CLHVCQUF1QiJ9