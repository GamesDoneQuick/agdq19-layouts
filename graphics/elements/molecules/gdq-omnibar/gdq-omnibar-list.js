import * as tslib_1 from "tslib";
var GDQOmnibarListElement_1;
import { TimelineLite, TweenLite, Sine, Power2 } from 'gsap';
const { customElement, property } = Polymer.decorators;
/* Minimum amount of content overflow, in pixels, required before the scrolling behavior kicks in.
 * We have this because if the content just scrolls a few pixels, it looks kinda bad.
 * We've found it's better to just not scroll it at all in those cases, and let it
 * cut off those few pixels. */
const MIN_CONTENT_SCROLL_DISTANCE = 3;
// How much time, in seconds, to spend scrolling on a single pixel.
const CONTENT_SCROLL_TIME_PER_PIXEL = 0.002;
// The opacity to set on list items which are partially occluded by the total.
const OCCLUDED_OPACITY = 0.25;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarListElement = GDQOmnibarListElement_1 = class GDQOmnibarListElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        /**
         * How much space, in pixels, to put between items in the list.
         */
        this.marginSize = 6;
    }
    enter(displayDuration, scrollHoldDuration) {
        const listWidth = this.clientWidth;
        const contentWidth = this.$.content.clientWidth;
        const contentOverflowWidth = contentWidth - listWidth;
        const tl = new TimelineLite();
        const elements = this.getListItems();
        elements.forEach((element, index) => {
            tl.add(element.enter(), index * 0.1134);
        });
        if (contentOverflowWidth < MIN_CONTENT_SCROLL_DISTANCE) {
            tl.to({}, displayDuration, {});
        }
        else {
            // Display the content cards long enough for people to read.
            // Scroll the list of cards if necessary to show them all.
            const occludedElements = new Set();
            const observerMap = new Map();
            const observers = elements.map(element => {
                const observer = new IntersectionObserver(entries => {
                    if (!entries || entries.length < 1) {
                        return;
                    }
                    const entry = entries[0];
                    const occluded = entry.intersectionRatio < 1;
                    if (occluded) {
                        occludedElements.add(element);
                    }
                    else {
                        occludedElements.delete(element);
                    }
                    TweenLite.to(element, 0.224, {
                        opacity: occluded ? OCCLUDED_OPACITY : 1,
                        ease: Sine.easeInOut
                    });
                }, {
                    root: this,
                    rootMargin: '0px',
                    threshold: [0, 1]
                });
                observer.observe(element);
                observerMap.set(element, observer);
                return observer;
            });
            // Figure out how many items we need to exit before all items are visible.
            let recoveredWidth = 0;
            const leadingElementsToExit = [];
            while (recoveredWidth < (contentOverflowWidth - MIN_CONTENT_SCROLL_DISTANCE)) {
                const leadingElement = elements[leadingElementsToExit.length];
                leadingElementsToExit.push(leadingElement);
                recoveredWidth += this.getPreciseElementWidth(leadingElement);
            }
            leadingElementsToExit.forEach(leadingElement => {
                const leadingElementWidth = this.getPreciseElementWidth(leadingElement);
                const trailingElements = elements.slice(elements.indexOf(leadingElement) + 1);
                tl.add(leadingElement.exit(), `+=${scrollHoldDuration}`);
                tl.to(trailingElements, leadingElementWidth * CONTENT_SCROLL_TIME_PER_PIXEL, {
                    x: -leadingElementWidth - this.marginSize,
                    ease: Power2.easeInOut
                });
                tl.call(() => {
                    leadingElement.remove();
                    observerMap.get(leadingElement).disconnect();
                    TweenLite.set(trailingElements, { x: 0 });
                    occludedElements.delete(leadingElement);
                });
            });
            tl.call(() => {
                observers.forEach(observer => observer.disconnect());
            }, undefined, null, `+=${scrollHoldDuration}`);
        }
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        const elements = this.getListItems();
        elements.slice(0).reverse().forEach((element, index) => {
            tl.add(element.exit(), index * 0.3134);
        });
        return tl;
    }
    getListItems() {
        return Array.from(this.$.contentSlot.assignedElements());
    }
    getPreciseElementWidth(element) {
        return element.getBoundingClientRect().width;
    }
    _marginSizeChanged(newVal) {
        this.updateStyles({
            '--gdq-omnibar-list-margin-size': `${newVal}px`
        });
    }
};
tslib_1.__decorate([
    property({ type: Number, observer: GDQOmnibarListElement_1.prototype._marginSizeChanged })
], GDQOmnibarListElement.prototype, "marginSize", void 0);
GDQOmnibarListElement = GDQOmnibarListElement_1 = tslib_1.__decorate([
    customElement('gdq-omnibar-list')
], GDQOmnibarListElement);
export default GDQOmnibarListElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1vbW5pYmFyLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLEVBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRzNELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7OytCQUcrQjtBQUMvQixNQUFNLDJCQUEyQixHQUFHLENBQUMsQ0FBQztBQUV0QyxtRUFBbUU7QUFDbkUsTUFBTSw2QkFBNkIsR0FBRyxLQUFLLENBQUM7QUFFNUMsOEVBQThFO0FBQzlFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBRTlCOzs7R0FHRztBQUVILElBQXFCLHFCQUFxQiw2QkFBMUMsTUFBcUIscUJBQXNCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFMbEU7OztPQUdHO0lBQ0g7O1FBRUM7O1dBRUc7UUFFSCxlQUFVLEdBQUcsQ0FBQyxDQUFDO0lBeUdoQixDQUFDO0lBdkdBLEtBQUssQ0FBQyxlQUF1QixFQUFFLGtCQUEwQjtRQUN4RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ25DLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztRQUNoRCxNQUFNLG9CQUFvQixHQUFHLFlBQVksR0FBRyxTQUFTLENBQUM7UUFDdEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFckMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNuQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxL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