import {TimelineLite} from 'gsap';

export interface ICompanionElement extends HTMLElement {
	show(): TimelineLite;
	hide(): TimelineLite;
}

export interface IInterruptMixin extends Polymer.Element {
	companionElement: ICompanionElement | ICompanionElement[] | null;
	timeline: TimelineLite;
	bindToMessage: string;
	itemDisplayDuration: number;
	canExtend: boolean;
	playItem(item: any): TimelineLite;
	_createEntranceAnim(item: any): TimelineLite;
	_createChangeAnim(item: any): TimelineLite;
	_createExitAnim(): TimelineLite;
	_addReset(): void;
}

const {property} = Polymer.decorators;
const EMPTY_OBJ = {};

/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base: (new () => Polymer.Element)) => { // tslint:disable-line:no-unnecessary-type-annotation
	/**
	 * @mixinClass
	 * @polymer
	 */
	abstract class InterruptMixin extends base implements IInterruptMixin {
		@property({type: Object})
		companionElement: ICompanionElement | ICompanionElement[] | null;

		@property({type: Object})
		timeline: TimelineLite = new TimelineLite({autoRemoveChildren: true});

		/**
		 * The message name to bind to.
		 */
		@property({type: String})
		bindToMessage: string;

		/**
		 * How long, in seconds, to hold items for after they have finished entering.
		 */
		@property({type: Number})
		itemDisplayDuration = 9;

		/**
		 * If true, it means that we're currently showing an item,
		 * and are at a point in the animation where we can show another one
		 * without performing a full exit/enter cycle again.
		 */
		@property({type: Boolean, notify: true, observer: InterruptMixin.prototype._canExtendChanged, readOnly: true})
		canExtend = false;

		abstract _createEntranceAnim(item: any): TimelineLite;
		abstract _createChangeAnim(item: any): TimelineLite;
		abstract _createExitAnim(): TimelineLite;
		abstract _addReset(): void;

		ready() {
			super.ready();

			if (this.bindToMessage && this.bindToMessage.length > 0 && this.bindToMessage !== 'false') {
				nodecg.listenFor(this.bindToMessage, this.playItem.bind(this));
			}
		}

		/**
		 * Plays the entrance animation for this element.
		 * Then, holds it for itemDisplayDuration seconds.
		 * Then, plays the exit animation for this element.
		 *
		 * If this.companionElement is defined, this method will run this.companionElement.hide()
		 * before playing the entrance animation for this element.
		 *
		 * @param item - The item to show.
		 * @returns - A GSAP TimelineLite instance.
		 */
		playItem(item: any) {
			const tl = this.timeline;

			if (!item) {
				return tl;
			}

			let companionElementsArray: ICompanionElement[];
			if (Array.isArray(this.companionElement)) {
				companionElementsArray = this.companionElement;
			} else {
				companionElementsArray = [this.companionElement as ICompanionElement];
			}

			companionElementsArray = companionElementsArray.filter(companionElement => {
				return companionElement && typeof (companionElement as any).hide === 'function';
			});

			if (this.canExtend) {
				const newAnim = new TimelineLite();
				newAnim.add(this._createChangeAnim(item));
				newAnim.add(this._createHold());
				tl.add(newAnim, 'exit-=0.01');
				tl.shiftChildren(newAnim.duration(), true, tl.getLabelTime('exit'));
			} else {
				this._addReset();

				// Wait for prizes to hide, if applicable.
				tl.call(() => {
					(this as any)._setCanExtend(true);
					if (companionElementsArray.length <= 0) {
						return;
					}

					tl.pause(null, false);

					const companionExitTl = new TimelineLite();
					companionElementsArray.forEach(companionElement => {
						companionExitTl.add(companionElement.hide(), 0);
					});

					companionExitTl.call(() => {
						tl.resume(null, false);
					});
				}, undefined, null, '+=0.03');

				if (companionElementsArray.length > 0) {
					tl.addPause();
				}

				tl.add(this._createEntranceAnim(item), '+=0.03');

				if ((window as any).__SCREENSHOT_TESTING__) {
					return tl;
				}

				tl.add(this._createHold());
				tl.addLabel('exit', '+=0');

				const exitAnim = new TimelineLite({
					onStart: () => {
						(this as any)._setCanExtend(false);
					}
				});
				exitAnim.add(this._createExitAnim());
				tl.add(exitAnim);

				if (companionElementsArray.length > 0) {
					tl.addLabel('companionEnter', '+=0');
					companionElementsArray.forEach(companionElement => {
						tl.add(companionElement.show(), 'companionEnter');
					});
				}

				// Padding
				tl.to(EMPTY_OBJ, 0.1, EMPTY_OBJ);
			}

			return tl;
		}

		/**
		 * Creates a dummy tween which can be used to hold something as-is
		 * for itemDisplayDuration seconds.
		 * @returns - A GSAP animation timeline.
		 */
		_createHold() {
			const tl = new TimelineLite();
			tl.to(EMPTY_OBJ, this.itemDisplayDuration, EMPTY_OBJ);
			return tl;
		}

		_canExtendChanged(newVal: boolean) {
			if (newVal) {
				this.dispatchEvent(new CustomEvent('can-extend'));
			}
		}
	}

	return InterruptMixin;
});
