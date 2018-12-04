import * as tslib_1 from "tslib";
var UiTweetElement_1;
const { customElement, property } = Polymer.decorators;
let UiTweetElement = UiTweetElement_1 = class UiTweetElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.noAvatar = false;
    }
    computeProfileUrl(tweet) {
        if (!tweet || !tweet.user) {
            return;
        }
        return `https://twitter.com/${tweet.user.screen_name}`;
    }
    computeTweetUrl(profileUrl, tweet) {
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
};
tslib_1.__decorate([
    property({ type: Object, observer: UiTweetElement_1.prototype.populateBody })
], UiTweetElement.prototype, "tweet", void 0);
tslib_1.__decorate([
    property({ type: String, computed: 'computeProfileUrl(tweet)' })
], UiTweetElement.prototype, "profileUrl", void 0);
tslib_1.__decorate([
    property({ type: String, computed: 'computeTweetUrl(profileUrl, tweet)' })
], UiTweetElement.prototype, "tweetUrl", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiTweetElement.prototype, "noAvatar", void 0);
UiTweetElement = UiTweetElement_1 = tslib_1.__decorate([
    customElement('ui-tweet')
], UiTweetElement);
export default UiTweetElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktdHdlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1aS10d2VldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUdyRCxJQUFxQixjQUFjLHNCQUFuQyxNQUFxQixjQUFlLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFEM0Q7O1FBWUMsYUFBUSxHQUFHLEtBQUssQ0FBQztJQXlCbEIsQ0FBQztJQXZCQSxpQkFBaUIsQ0FBQyxLQUFhO1FBQzlCLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQzFCLE9BQU87U0FDUDtRQUVELE9BQU8sdUJBQXVCLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEQsQ0FBQztJQUVELGVBQWUsQ0FBQyxVQUFtQixFQUFFLEtBQWE7UUFDakQsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUMxQixPQUFPO1NBQ1A7UUFFRCxPQUFPLEdBQUcsVUFBVSxXQUFXLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsWUFBWTtRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2hCLE9BQU87U0FDUDtRQUVELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztJQUN6QyxDQUFDO0NBQ0QsQ0FBQTtBQWxDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGdCQUFjLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBQyxDQUFDOzZDQUM3RDtBQUdiO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUMsQ0FBQztrREFDNUM7QUFHbkI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxvQ0FBb0MsRUFBQyxDQUFDO2dEQUN4RDtBQUdqQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0RBQ25DO0FBWEcsY0FBYztJQURsQyxhQUFhLENBQUMsVUFBVSxDQUFDO0dBQ0wsY0FBYyxDQW9DbEM7ZUFwQ29CLGNBQWMifQ==