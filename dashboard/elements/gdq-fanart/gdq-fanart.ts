import {Tweet} from '../../../src/types/Twitter';
import {Gdq3AcurrentLayout} from '../../../src/types/schemas/gdq%3AcurrentLayout';
import {FanartTweets} from '../../../src/types/schemas/fanartTweets';
import GDQFanartPreviewElement from './gdq-fanart-preview';

const {customElement, property} = Polymer.decorators;
const currentLayout = nodecg.Replicant<Gdq3AcurrentLayout>('gdq:currentLayout');
const fanartTweetsRep = nodecg.Replicant<FanartTweets>('fanartTweets');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('gdq-fanart')
export default class GDQFanartElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	tweets: FanartTweets;

	connectedCallback() {
		super.connectedCallback();

		Polymer.RenderStatus.beforeNextRender(this, () => {
			currentLayout.on('change', newVal => {
				const cover = this.$.cover as HTMLElement;
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

				(this.$.empty as HTMLElement).style.display = newVal.length > 0 ? 'none' : 'flex';
				this.tweets = newVal;
			});
		});
	}

	_sortTweets(a: Tweet, b: Tweet) {
		// @ts-ignore
		return new Date(b.created_at) - new Date(a.created_at);
	}

	_handlePreviewEvent(event: Event) {
		const previewDialog = this.$.previewDialog as GDQFanartPreviewElement;
		previewDialog.open((event as any).model.tweet);
	}
}
