import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentLayout = nodecg.Replicant('currentLayout');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXR3aXR0ZXItY29udHJvbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtdHdpdHRlci1jb250cm9scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWdCLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVMsUUFBUSxDQUFDLENBQUM7QUFFbEQ7Ozs7R0FJRztBQUVILElBQXFCLHlCQUF5QixHQUE5QyxNQUFxQix5QkFBMEIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFJMUYsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBb0IsQ0FBQztRQUUxQyxhQUFhLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQyxRQUFRLE1BQU0sRUFBRTtnQkFDZixLQUFLLFdBQVcsQ0FBQztnQkFDakIsS0FBSyxXQUFXLENBQUM7Z0JBQ2pCLEtBQUssWUFBWSxDQUFDO2dCQUNsQixLQUFLLGNBQWMsQ0FBQztnQkFDcEIsS0FBSyxXQUFXLENBQUM7Z0JBQ2pCLEtBQUssSUFBSTtvQkFDUixLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7b0JBQzdCLE1BQU07Z0JBQ1A7b0JBQ0MsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO2FBQzlCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQXFCLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDbEYsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUFDLENBQVEsRUFBRSxDQUFRO1FBQzdCLGFBQWE7UUFDYixPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNELENBQUE7QUEvQkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7eURBQ1Q7QUFGSyx5QkFBeUI7SUFEN0MsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0dBQ2pCLHlCQUF5QixDQWlDN0M7ZUFqQ29CLHlCQUF5QiJ9