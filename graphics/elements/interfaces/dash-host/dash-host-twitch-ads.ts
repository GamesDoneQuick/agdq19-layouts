import {TwitchCanPlayAd} from '../../../../src/types/schemas/twitch_canPlayAd';
import {TimeStruct} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;
const canPlayTwitchAd = nodecg.Replicant<TwitchCanPlayAd>('twitch_canPlayAd');
const timeLeft = nodecg.Replicant<TimeStruct>('twitch:timeLeftInAd');
const timeSince = nodecg.Replicant<TimeStruct>('twitch:timeSinceLastAd');

@customElement('dash-host-twitch-ads')
export default class DashHostTwitchAdsElement extends Polymer.Element {
	@property({type: Boolean})
	canPlay = false;

	@property({type: String})
	cantPlayReason = '';

	@property({type: String})
	timeLeft = '8:88';

	@property({type: String})
	timeSince = '8:88:88';

	@property({type: Boolean, reflectToAttribute: true})
	hideControls = false;

	ready() {
		super.ready();

		canPlayTwitchAd.on('change', newVal => {
			if (!newVal) {
				return;
			}
			this.canPlay = newVal.canPlay;
			this.cantPlayReason = newVal.reason;
		});

		timeLeft.on('change', newVal => {
			if (!newVal) {
				return;
			}
			this.timeLeft = newVal.formatted.split('.')[0];
		});

		timeSince.on('change', newVal => {
			if (!newVal) {
				return;
			}
			this.timeSince = newVal.formatted.split('.')[0];
		});
	}

	play() {
		(this.$.confirmDialog as PaperDialogElement).open();
	}

	_handleConfirmDialogClosed(e: any) {
		if (e.detail.confirmed === true) {
			const listbox = this.$.listbox as PaperListboxElement;
			const selectedItem = listbox.selectedItem as HTMLElement;
			if (!selectedItem) {
				return;
			}
			const duration = parseInt(selectedItem.getAttribute('data-value') as string, 10);
			nodecg.sendMessage('twitch:playAd', duration);
		}
	}

	_calcPlayButtonLabel(canPlay: boolean, cantPlayReason: string) {
		if (canPlay) {
			return 'Play Twitch Ad';
		}

		return cantPlayReason;
	}
}
