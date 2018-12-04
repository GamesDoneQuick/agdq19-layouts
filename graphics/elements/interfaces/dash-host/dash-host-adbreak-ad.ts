import {Ad, AdBreak} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

@customElement('dash-host-adbreak-ad')
export default class DashHostAdbreakAdElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	adBreak: AdBreak;

	@property({type: Object})
	ad: Ad;

	@property({
		type: Boolean,
		reflectToAttribute: true,
		computed: '_booleanReflect(ad.state.completed)'
	})
	completed: boolean;

	@property({
		type: Boolean,
		reflectToAttribute: true,
		computed: '_booleanReflect(ad.state.hasFile)'
	})
	hasFile: boolean;

	static get observers() {
		return [
			'_updateProgressBar(ad.state.*)'
		];
	}

	frameNumberToTimeString(fps?: number, frameNumber?: number) {
		if (typeof fps !== 'number' || Number.isNaN(fps) ||
			typeof frameNumber !== 'number' || Number.isNaN(frameNumber)) {
			return ':??';
		}
		return this.formatSeconds(frameNumber / fps);
	}

	completeImageAd() {
		nodecg.sendMessage('intermissions:completeImageAd', this.ad.id);
	}

	_booleanReflect(bool: boolean) {
		return bool;
	}

	_updateProgressBar() {
		const progressFillElem = this.$['progress-fill'] as HTMLDivElement;

		if (!this.ad) {
			progressFillElem.style.transform = 'scaleX(0)';
			return;
		}

		let percent = this.ad.state.frameNumber / this.ad.state.durationFrames;
		percent = Math.max(percent, 0); // Clamp to minimum 0.
		percent = Math.min(percent, 1); // Clamp to maximum 1.
		progressFillElem.style.transform = `scaleX(${percent})`;
	}

	_calcAdvanceHidden(ad?: Ad, adBreak?: AdBreak) {
		if (!ad || !adBreak) {
			return true;
		}

		const lastAd = adBreak.ads[adBreak.ads.length - 1];
		return ad.adType.toLowerCase() !== 'image' || ad === lastAd;
	}

	/**
	 * Formats a number of seconds into a string ([hh:]mm:ss).
	 * @param seconds - The number of seconds to format.
	 * @returns The formatted time sting.
	 */
	formatSeconds(seconds: number) {
		const hms = {
			h: Math.floor(seconds / 3600),
			m: Math.floor(seconds % 3600 / 60),
			s: Math.floor(seconds % 3600 % 60)
		};

		let str = '';
		if (hms.h) {
			str += `${hms.h}:`;
		}

		str += `${(hms.m < 10 ? `0${hms.m}` : hms.m)}:${(hms.s < 10 ? `0${hms.s}` : hms.s)}`;
		return str;
	}
}
