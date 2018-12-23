import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentLayout = nodecg.Replicant('currentLayout');
const fanartTweetsRep = nodecg.Replicant('fanartTweets');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let GDQFanartElement = class GDQFanartElement extends Polymer.MutableData(Polymer.Element) {
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            currentLayout.on('change', newVal => {
                const cover = this.$.cover;
                switch (newVal) {
                    case 'break':
                        cover.style.display = 'none';
                        break;
                    default:
                        cover.style.display = 'flex';
                }
            });
            fanartTweetsRep.on('change', newVal => {
                if (!newVal) {
                    return;
                }
                this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
                this.tweets = newVal;
            });
        });
    }
    _sortTweets(a, b) {
        // @ts-ignore
        return new Date(b.created_at) - new Date(a.created_at);
    }
    _handlePreviewEvent(event) {
        const previewDialog = this.$.previewDialog;
        previewDialog.open(event.model.tweet);
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQFanartElement.prototype, "tweets", void 0);
GDQFanartElement = tslib_1.__decorate([
    customElement('gdq-fanart')
], GDQFanartElement);
export default GDQFanartElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWZhbmFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFnQixlQUFlLENBQUMsQ0FBQztBQUN2RSxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFlLGNBQWMsQ0FBQyxDQUFDO0FBRXZFOzs7O0dBSUc7QUFFSCxJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWlCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBSWpGLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUUxQixPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDaEQsYUFBYSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7Z0JBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBb0IsQ0FBQztnQkFDMUMsUUFBUSxNQUFNLEVBQUU7b0JBQ2YsS0FBSyxPQUFPO3dCQUNYLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzt3QkFDN0IsTUFBTTtvQkFDUDt3QkFDQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7aUJBQzlCO1lBQ0YsQ0FBQyxDQUFDLENBQUM7WUFFSCxlQUFlLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDckMsSUFBSSxDQUFDLE1BQU0sRUFBRTtvQkFDWixPQUFPO2lCQUNQO2dCQUVBLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBcUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztnQkFDbEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUSxFQUFFLENBQVE7UUFDN0IsYUFBYTtRQUNiLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsbUJBQW1CLENBQUMsS0FBWTtRQUMvQixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQXdDLENBQUM7UUFDdEUsYUFBYSxDQUFDLElBQUksQ0FBRSxLQUFhLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7Q0FDRCxDQUFBO0FBckNBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO2dEQUNIO0FBRkQsZ0JBQWdCO0lBRHBDLGFBQWEsQ0FBQyxZQUFZLENBQUM7R0FDUCxnQkFBZ0IsQ0F1Q3BDO2VBdkNvQixnQkFBZ0IifQ==