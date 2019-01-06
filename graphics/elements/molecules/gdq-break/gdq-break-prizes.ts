import GDQBreakLoopMixin from '../../../mixins/gdq-break-loop-mixin';
import {Prize} from '../../../../src/types/index';
import {TimelineLite, Power2, Sine, TweenLite} from 'gsap';
import {typeAnim} from '../../../../shared/lib/type-anims';
import AtomGridmaskImageElement from '../../atoms/atom-gridmask-image/atom-gridmask-image';
import {preloadImage} from '../../../../shared/lib/gdq-utils';

const {customElement} = Polymer.decorators;

const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;

const currentPrizes = nodecg.Replicant<Prize[]>('currentPrizes');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-prizes')
export default class GDQBreakPrizesElement extends GDQBreakLoopMixin(Polymer.Element)<Prize> {
	ready() {
		super.ready();

		currentPrizes.on('change', newVal => {
			this.availableItems = newVal;
		});
	}

	/**
	 * Plays the entrance animation and kicks off the infinite loop of
	 * showing all available prizes, one at a time.
	 * @returns - A GSAP TimelineLite instance.
	 */
	show() {
		const tl = new TimelineLite();
		const photoElem = this.$['photo-actual'] as AtomGridmaskImageElement;

		tl.call(() => {
			// Clear all content.
			(this.$['info-description-text'] as HTMLDivElement).innerText = '';
			(this.$['info-minimumBid-text'] as HTMLDivElement).innerText = '';
			(this.$.provider as HTMLDivElement).innerText = '';
			photoElem.$svg.image.load('');
		}, undefined, null, '+=0.03');

		tl.addLabel('start', '+=0');

		tl.to(photoElem.$svg.bgRect.node, 1.5, {
			drawSVG: '100%',
			ease: Power2.easeOut
		}, 'start');

		tl.to(this.$.info, 1, {
			x: '0%',
			ease: Power2.easeOut
		}, 'start+=0.5');

		tl.to(this.$['photo-label'], 0.5, {
			opacity: 1,
			x: 0,
			ease: Sine.easeOut
		}, 'start+=1');

		tl.to(photoElem.$svg.bgRect.node, 0.5, {
			'fill-opacity': 0.25,
			ease: Sine.easeOut
		}, 'start+=1');

		tl.call(() => {
			// Re-start the loop once we've finished entering.
			this._loop();
		});

		return tl;
	}

	/**
	 * Plays the exit animation and kills the current loop of prize displaying.
	 * This animation has a variable length due to it needing to wait for the current
	 * loop to be at a good stopping point before beginning the exit animation.
	 * @returns - A GSAP TimelineLite instance.
	 */
	hide() {
		const tl = new TimelineLite();
		const photoElem = this.$['photo-actual'] as AtomGridmaskImageElement;

		let handledCall = false; // GSAP likes to run .calls again when you .resume
		tl.call(() => {
			if (handledCall) {
				return;
			}
			handledCall = true;

			tl.pause();
			if (photoElem.exiting) {
				photoElem.addEventListener('exited', () => {
					this._killLoop();
					tl.resume();
				}, {once: true, passive: true});
			} else if (photoElem.entering) {
				photoElem.addEventListener('entered', () => {
					this._killLoop();
					photoElem.exit({
						onComplete: () => {
							tl.resume();
						}
					});
				}, {once: true, passive: true});
			} else {
				this._killLoop();
				photoElem.exit({
					onComplete: () => {
						tl.resume();
					}
				});
			}
		}, undefined, null, '+=0.1');

		tl.addLabel('start', '+=0.5');

		tl.call(() => {
			this.currentItem = null;
		}, undefined, null, 'start');

		tl.to(photoElem.$svg.bgRect.node, 0.5, {
			'fill-opacity': 0,
			ease: Sine.easeIn
		}, 'start');

		tl.to(this.$['photo-label'], 0.5, {
			opacity: 0,
			x: -50,
			ease: Sine.easeIn
		}, 'start');

		tl.to(this.$.info, 1, {
			x: '-100%',
			ease: Power2.easeIn
		}, 'start');

		tl.to(photoElem.$svg.bgRect.node, 1.5, {
			drawSVG: '0%',
			ease: Power2.easeIn
		}, 'start');

		return tl;
	}

	_showItem(prize: Prize) {
		let useFallbackImage = !prize.image || !prize.image.trim();
		let changingProvider = true;
		let changingMinimumBid = true;
		const tl = new TimelineLite();
		const photoElem = this.$['photo-actual'] as AtomGridmaskImageElement;
		const providerTextElem = this.$.provider as HTMLDivElement;
		const descriptionTextElem = this.$['info-description-text'] as HTMLDivElement;
		const minimumBidTextElem = this.$['info-minimumBid-text'] as HTMLDivElement;
		const minimumBidText = prize.sumdonations ?
			`${prize.minimumbid} in Total Donations` :
			`${prize.minimumbid} Single Donation`;

		tl.call(() => {
			tl.pause();
			preloadImage(prize.image).then(() => {
				tl.resume();
			}).catch(() => {
				nodecg.log.error(`Image "${prize.image}" failed to load for prize #${prize.id}.`);
				useFallbackImage = true;
				tl.resume();
			});
		}, undefined, null, '+=0.03');

		tl.addLabel('exit', '+=0');

		tl.add(photoElem.exit({
			onComplete: () => {
				const newSrc = useFallbackImage ? photoElem.fallbackSrc : prize.image;
				tl.pause();
				photoElem.$svg.image.load(newSrc).loaded(() => {
					tl.resume();
				}).error(error => {
					nodecg.log.error(error);
					photoElem.$svg.image.load(photoElem.fallbackSrc);
					tl.resume();
				});
			}
		}), 'exit');

		tl.call(() => {
			if (!providerTextElem.innerText && !descriptionTextElem.innerText) {
				return;
			}

			changingProvider = false;
			if (providerTextElem.innerText.trim() !== prize.provided) {
				changingProvider = true;
				TweenLite.to(this.$.provider, 0.5, {
					opacity: 0,
					ease: Sine.easeInOut
				});
			}

			changingMinimumBid = false;
			if (minimumBidTextElem.innerText.trim() !== minimumBidText) {
				changingMinimumBid = true;
				TweenLite.to(minimumBidTextElem, 0.5, {opacity: 0, ease: Sine.easeInOut});
			}

			TweenLite.to(this.$['info-description-text'], 0.5, {
				opacity: 0,
				ease: Sine.easeInOut
			});
		}, undefined, null, 'exit+=0.1');

		tl.addLabel('enter', '+=0');

		tl.call(() => {
			if (!changingProvider) {
				return;
			}

			providerTextElem.innerText = prize.provided;
			typeAnim(providerTextElem);
			TweenLite.set(providerTextElem, {opacity: 1});
		}, undefined, null, 'enter+=0.03');

		tl.add(photoElem.enter(), 'enter+=0.1');

		tl.call(() => {
			descriptionTextElem.innerText = prize.description;
			typeAnim(descriptionTextElem);
			TweenLite.set(descriptionTextElem, {opacity: 1});
		}, undefined, null, 'enter+=0.2');

		tl.call(() => {
			if (!changingMinimumBid) {
				return;
			}

			minimumBidTextElem.innerText = minimumBidText;
			typeAnim(minimumBidTextElem);
			TweenLite.set(minimumBidTextElem, {opacity: 1});
		}, undefined, null, 'enter+=0.3');

		// Give the prize some time to show.
		tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);

		return tl;
	}

	_resetState() {
		(this.$['photo-actual'] as AtomGridmaskImageElement).exiting = false;
	}
}
