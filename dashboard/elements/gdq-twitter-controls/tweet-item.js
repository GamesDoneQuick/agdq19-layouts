import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let TweetItemElement = class TweetItemElement extends Polymer.MutableData(Polymer.Element) {
    accept() {
        nodecg.sendMessage('acceptTweet', this.value);
    }
    reject() {
        nodecg.sendMessage('rejectTweet', this.value.id_str);
    }
};
tslib_1.__decorate([
    property({ type: Object })
], TweetItemElement.prototype, "value", void 0);
TweetItemElement = tslib_1.__decorate([
    customElement('tweet-item')
], TweetItemElement);
export default TweetItemElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHdlZXQtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInR3ZWV0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7OztHQUlHO0FBRUgsSUFBcUIsZ0JBQWdCLEdBQXJDLE1BQXFCLGdCQUFpQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUlqRixNQUFNO1FBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxNQUFNO1FBQ0wsTUFBTSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0RCxDQUFDO0NBQ0QsQ0FBQTtBQVRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOytDQUNaO0FBRk8sZ0JBQWdCO0lBRHBDLGFBQWEsQ0FBQyxZQUFZLENBQUM7R0FDUCxnQkFBZ0IsQ0FXcEM7ZUFYb0IsZ0JBQWdCIn0=