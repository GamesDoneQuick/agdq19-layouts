import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentLayout = nodecg.Replicant('gdq:currentLayout');
const tweets = nodecg.Replicant('tweets');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let GDQTwitterControlsElement = class GDQTwitterControlsElement extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        const cover = this.$.cover;
        currentLayout.on('change', newVal => {
            switch (newVal) {
                case 'countdown':
                case 'interview':
                case 'standard_4':
                case 'widescreen_4':
                case 'gameboy_4':
                case 'ds':
                    cover.style.display = 'flex';
                    break;
                default:
                    cover.style.display = 'none';
            }
        });
        tweets.on('change', newVal => {
            this.$.empty.style.display = newVal.length > 0 ? 'none' : 'flex';
            this.tweets = newVal;
        });
    }
    _sortTweets(a, b) {
        // @ts-ignore
        return new Date(b.created_at) - new Date(a.created_at);
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQTwitterControlsElement.prototype, "tweets", void 0);
GDQTwitterControlsElement = tslib_1.__decorate([
    customElement('gdq-twitter-controls')
], GDQTwitterControlsElement);
export default GDQTwitterControlsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXR3aXR0ZXItY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtdHdpdHRlci1jb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXFCLG1CQUFtQixDQUFDLENBQUM7QUFDaEYsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBUyxRQUFRLENBQUMsQ0FBQztBQUVsRDs7OztHQUlHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUkxRixLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFvQixDQUFDO1FBRTFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLFFBQVEsTUFBTSxFQUFFO2dCQUNmLEtBQUssV0FBVyxDQUFDO2dCQUNqQixLQUFLLFdBQVcsQ0FBQztnQkFDakIsS0FBSyxZQUFZLENBQUM7Z0JBQ2xCLEtBQUssY0FBYyxDQUFDO2dCQUNwQixLQUFLLFdBQVcsQ0FBQztnQkFDakIsS0FBSyxJQUFJO29CQUNSLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztvQkFDN0IsTUFBTTtnQkFDUDtvQkFDQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7YUFDOUI7UUFDRixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBcUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUNsRixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsQ0FBUSxFQUFFLENBQVE7UUFDN0IsYUFBYTtRQUNiLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBQ0QsQ0FBQTtBQS9CQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt5REFDVDtBQUZLLHlCQUF5QjtJQUQ3QyxhQUFhLENBQUMsc0JBQXNCLENBQUM7R0FDakIseUJBQXlCLENBaUM3QztlQWpDb0IseUJBQXlCIn0=