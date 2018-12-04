import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentLayout = nodecg.Replicant('gdq:currentLayout');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWZhbmFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1mYW5hcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFxQixtQkFBbUIsQ0FBQyxDQUFDO0FBQ2hGLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWUsY0FBYyxDQUFDLENBQUM7QUFFdkU7Ozs7R0FJRztBQUVILElBQXFCLGdCQUFnQixHQUFyQyxNQUFxQixnQkFBaUIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFJakYsaUJBQWlCO1FBQ2hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtZQUNoRCxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDbkMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFvQixDQUFDO2dCQUMxQyxRQUFRLE1BQU0sRUFBRTtvQkFDZixLQUFLLE9BQU87d0JBQ1gsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO3dCQUM3QixNQUFNO29CQUNQO3dCQUNDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztpQkFDOUI7WUFDRixDQUFDLENBQUMsQ0FBQztZQUVILGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUNyQyxJQUFJLENBQUMsTUFBTSxFQUFFO29CQUNaLE9BQU87aUJBQ1A7Z0JBRUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFxQixDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUNsRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxDQUFRLEVBQUUsQ0FBUTtRQUM3QixhQUFhO1FBQ2IsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxLQUFZO1FBQy9CLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBd0MsQ0FBQztRQUN0RSxhQUFhLENBQUMsSUFBSSxDQUFFLEtBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNELENBQUE7QUFyQ0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7Z0RBQ0g7QUFGRCxnQkFBZ0I7SUFEcEMsYUFBYSxDQUFDLFlBQVksQ0FBQztHQUNQLGdCQUFnQixDQXVDcEM7ZUF2Q29CLGdCQUFnQiJ9