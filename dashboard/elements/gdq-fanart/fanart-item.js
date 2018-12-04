import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let FanartItemElement = class FanartItemElement extends Polymer.MutableData(Polymer.Element) {
    preview() {
        this.dispatchEvent(new CustomEvent('preview'));
    }
    accept() {
        nodecg.sendMessage('acceptFanart', this.value);
    }
    reject() {
        nodecg.sendMessage('rejectTweet', this.value.id_str);
    }
    _calcIndicatorHidden(tweetMedia) {
        return !tweetMedia || !Array.isArray(tweetMedia) || tweetMedia.length <= 1;
    }
    _computeImageUrl(tweetMedia) {
        if (tweetMedia && tweetMedia[0]) {
            return tweetMedia[0].media_url_https;
        }
        return '';
    }
};
tslib_1.__decorate([
    property({ type: Object })
], FanartItemElement.prototype, "value", void 0);
FanartItemElement = tslib_1.__decorate([
    customElement('fanart-item')
], FanartItemElement);
export default FanartItemElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFuYXJ0LWl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYW5hcnQtaXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7O0dBSUc7QUFFSCxJQUFxQixpQkFBaUIsR0FBdEMsTUFBcUIsaUJBQWtCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBSWxGLE9BQU87UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE1BQU07UUFDTCxNQUFNLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELE1BQU07UUFDTCxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxVQUF1QjtRQUMzQyxPQUFPLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBdUI7UUFDdkMsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQztTQUNyQztRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNELENBQUE7QUF6QkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0RBQ1o7QUFGTyxpQkFBaUI7SUFEckMsYUFBYSxDQUFDLGFBQWEsQ0FBQztHQUNSLGlCQUFpQixDQTJCckM7ZUEzQm9CLGlCQUFpQiJ9