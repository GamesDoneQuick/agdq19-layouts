import * as tslib_1 from "tslib";
import GDQBreakLoopMixin from '../../../mixins/gdq-break-loop-mixin';
import { TimelineLite, Power2, Sine, TweenLite } from 'gsap';
import { typeAnim } from '../../../../shared/lib/type-anims';
import { preloadImage } from '../../../../shared/lib/gdq-utils';
const { customElement } = Polymer.decorators;
const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const currentPrizes = nodecg.Replicant('currentPrizes');
/**
 * @customElement
 * @polymer
 */
let GDQBreakPrizesElement = class GDQBreakPrizesElement extends GDQBreakLoopMixin(Polymer.Element) {
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
        const photoElem = this.$['photo-actual'];
        tl.call(() => {
            // Clear all content.
            this.$['info-description-text'].innerText = '';
            this.$['info-minimumBid-text'].innerText = '';
            this.$.provider.innerText = '';
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
        const photoElem = this.$['photo-actual'];
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
                }, { once: true, passive: true });
            }
            else if (photoElem.entering) {
                photoElem.addEventListener('entered', () => {
                    this._killLoop();
                    photoElem.exit({
                        onComplete: () => {
                            tl.resume();
                        }
                    });
                }, { once: true, passive: true });
            }
            else {
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
    _showItem(prize) {
        let useFallbackImage = !prize.image || !prize.image.trim();
        let changingProvider = true;
        let changingMinimumBid = true;
        const tl = new TimelineLite();
        const photoElem = this.$['photo-actual'];
        const providerTextElem = this.$.provider;
        const descriptionTextElem = this.$['info-description-text'];
        const minimumBidTextElem = this.$['info-minimumBid-text'];
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
                TweenLite.to(minimumBidTextElem, 0.5, { opacity: 0, ease: Sine.easeInOut });
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
            TweenLite.set(providerTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.03');
        tl.add(photoElem.enter(), 'enter+=0.1');
        tl.call(() => {
            descriptionTextElem.innerText = prize.description;
            typeAnim(descriptionTextElem);
            TweenLite.set(descriptionTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.2');
        tl.call(() => {
            if (!changingMinimumBid) {
                return;
            }
            minimumBidTextElem.innerText = minimumBidText;
            typeAnim(minimumBidTextElem);
            TweenLite.set(minimumBidTextElem, { opacity: 1 });
        }, undefined, null, 'enter+=0.3');
        // Give the prize some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
    _resetState() {
        this.$['photo-actual'].exiting = false;
    }
};
GDQBreakPrizesElement = tslib_1.__decorate([
    customElement('gdq-break-prizes')
], GDQBreakPrizesElement);
export default GDQBreakPrizesElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXByaXplcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1wcml6ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8saUJBQWlCLE1BQU0sc0NBQXNDLENBQUM7QUFFckUsT0FBTyxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFFM0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBRTlELE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDO0FBRTdELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsZUFBZSxDQUFDLENBQUM7QUFFakU7OztHQUdHO0FBRUgsSUFBcUIscUJBQXFCLEdBQTFDLE1BQXFCLHFCQUFzQixTQUFRLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQVE7SUFDM0YsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJO1FBQ0gsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBNkIsQ0FBQztRQUVyRSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZ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