import * as tslib_1 from "tslib";
import GDQBreakLoopMixin from '../../../mixins/gdq-break-loop-mixin';
import { TimelineLite, Power1, TweenLite } from 'gsap';
const { customElement } = Polymer.decorators;
const DISPLAY_DURATION = 20;
const EMPTY_OBJ = {};
let GDQSponsorsElement = class GDQSponsorsElement extends GDQBreakLoopMixin(Polymer.Element) {
    ready() {
        this.itemIdField = 'sum';
        this.noAutoLoop = true;
        super.ready();
        let sponsors = nodecg.Replicant('assets:sponsors-standard_1');
        const layoutName = window.location.pathname.split('/').pop();
        switch (layoutName) {
            case ('widescreen_1.html'):
            case ('gba_1.html'):
                sponsors = nodecg.Replicant('assets:sponsors-widescreen_1');
                break;
            default:
            // Do nothing.
        }
        Polymer.RenderStatus.beforeNextRender(this, () => {
            sponsors.on('change', newVal => {
                this.availableItems = newVal;
                // If no sponsor is showing yet, show the first sponsor immediately
                if (!this.currentItem && newVal.length > 0) {
                    this.currentItem = newVal[0];
                    this.$.image.$svg.image.load(newVal[0].url);
                }
            });
            this._loop();
        });
    }
    show() {
        const tl = new TimelineLite();
        tl.call(() => {
            // Clear all content.
            this.$.image.$svg.image.load('');
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
        const imageElem = this.$.image;
        tl.call(() => {
            tl.pause();
            if (imageElem.exiting) {
                imageElem.addEventListener('exited', () => {
                    this._killLoop();
                    tl.resume();
                }, { once: true, passive: true });
            }
            else if (imageElem.entering) {
                imageElem.addEventListener('entered', () => {
                    this._killLoop();
                    imageElem.exit({
                        onComplete: () => {
                            tl.resume();
                        }
                    });
                }, { once: true, passive: true });
            }
            else {
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
        this.$.image.resize();
    }
    _showItem(sponsorAsset) {
        const tl = new TimelineLite();
        const imageElem = this.$.image;
        tl.addLabel('exit', '+=0');
        tl.add(imageElem.exit({
            onComplete: () => {
                const newSrc = sponsorAsset.url;
                tl.pause();
                imageElem.$svg.image.load(newSrc).loaded(() => {
                    tl.resume();
                }).error(error => {
                    nodecg.log.error('Failed to load sponsor image:', error);
                    TweenLite.set(imageElem, { opacity: 0 });
                    tl.clear();
                    this._loop();
                });
            }
        }), 'exit');
        tl.addLabel('enter', '+=0');
        tl.set(imageElem, { opacity: 1 });
        tl.add(imageElem.enter(), 'enter+=0.1');
        // Give the prize some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
};
GDQSponsorsElement = tslib_1.__decorate([
    customElement('gdq-sponsors')
], GDQSponsorsElement);
export default GDQSponsorsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNwb25zb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXNwb25zb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLGlCQUFpQixNQUFNLHNDQUFzQyxDQUFDO0FBQ3JFLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUdyRCxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQVczQyxNQUFNLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztBQUM1QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFHckIsSUFBcUIsa0JBQWtCLEdBQXZDLE1BQXFCLGtCQUFtQixTQUFRLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQVE7SUFDeEYsS0FBSztRQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsNEJBQTRCLENBQUMsQ0FBQztRQUN2RSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0QsUUFBUSxVQUFVLEVBQUU7WUFDbkIsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDM0IsS0FBSyxDQUFDLFlBQVksQ0FBQztnQkFDbEIsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQVUsOEJBQThCLENBQUMsQ0FBQztnQkFDckUsTUFBTTtZQUNQLFFBQVE7WUFDUCxjQUFjO1NBQ2Y7UUFFRCxPQUFPLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDaEQsUUFBUSxDQUFDLEVB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