import GDQBreakLoopMixin from '../../../mixins/gdq-break-loop-mixin';
import {TimelineLite, Power1, TweenLite} from 'gsap';
import AtomGridmaskImageElement from '../../atoms/atom-gridmask-image/atom-gridmask-image';

const {customElement} = Polymer.decorators;
interface Asset {
	base: string;
	bundleName: string;
	category: string;
	ext: string;
	name: string;
	sum: string;
	url: string;
}

const DISPLAY_DURATION = 20;
const EMPTY_OBJ = {};

@customElement('gdq-sponsors')
export default class GDQSponsorsElement extends GDQBreakLoopMixin(Polymer.Element)<Asset> {
	ready() {
		this.itemIdField = 'sum';
		this.noAutoLoop = true;
		super.ready();
	}

	connectedCallback() {
		super.connectedCallback();

		let sponsors = nodecg.Replicant<Asset[]>('assets:sponsors-standard_1');
		const layoutName = window.location.pathname.split('/').pop();
		switch (layoutName) {
			case ('widescreen_1.html'):
			case ('gba_1.html'):
				sponsors = nodecg.Replicant<Asset[]>('assets:sponsors-widescreen_1');
				break;
			default:
				// Do nothing.
		}

		Polymer.RenderStatus.afterNextRender(this, () => {
			sponsors.on('change', newVal => {
				this.availableItems = newVal;

				// If no sponsor is showing yet, show the first sponsor immediately
				if (!this.currentItem && newVal.length > 0) {
					this.currentItem = newVal[0];
					(this.$.image as AtomGridmaskImageElement).$svg.image.load(newVal[0].url);
				}
			});

			this._loop();
		});
	}

	show() {
		const tl = new TimelineLite();

		tl.call(() => {
			// Clear all content.
			(this.$.image as AtomGridmaskImageElement).$svg.image.load('');
		}, undefined, null, '+=0.03');

		tl.to(this, 0.334, {
			opacity: 1,
			ease: Power1.easeIn
		});

		tl.call(() => {
			// Re-start the loop once we've finished entering.
			this._loop();
		});

		return tl;
	}

	hide() {
		const tl = new TimelineLite();
		const imageElem = this.$.image as AtomGridmaskImageElement;

		tl.call(() => {
			tl.pause();
			if (imageElem.exiting) {
				imageElem.addEventListener('exited', () => {
					this._killLoop();
					tl.resume();
				}, {once: true, passive: true});
			} else if (imageElem.entering) {
				imageElem.addEventListener('entered', () => {
					this._killLoop();
					imageElem.exit({
						onComplete: () => {
							tl.resume();
						}
					});
				}, {once: true, passive: true});
			} else {
				this._killLoop();
				imageElem.exit({
					onComplete: () => {
						tl.resume();
					}
				});
			}
		}, undefined, null, '+=0.1');

		tl.to(this, 0.334, {
			opacity: 0,
			ease: Power1.easeOut
		});

		return tl;
	}

	resize() {
		(this.$.image as AtomGridmaskImageElement).resize();
	}

	_showItem(sponsorAsset: Asset) {
		const tl = new TimelineLite();
		const imageElem = this.$.image as AtomGridmaskImageElement;

		tl.addLabel('exit', '+=0');

		tl.add(imageElem.exit({
			onComplete: () => {
				const newSrc = sponsorAsset.url;
				tl.pause();
				imageElem.$svg.image.load(newSrc).loaded(() => {
					tl.resume();
				}).error(error => {
					nodecg.log.error('Failed to load sponsor image:', error);
					TweenLite.set(imageElem, {opacity: 0});
					tl.clear();
					this._loop();
				});
			}
		}), 'exit');

		tl.addLabel('enter', '+=0');
		tl.set(imageElem, {opacity: 1});
		tl.add(imageElem.enter(), 'enter+=0.1');

		// Give the prize some time to show.
		tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);

		return tl;
	}
}
