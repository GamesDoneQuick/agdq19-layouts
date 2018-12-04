import * as tslib_1 from "tslib";
import { TimelineLite, Sine, Power2 } from 'gsap';
import GDQBreakLoopMixin from '../../../mixins/gdq-break-loop-mixin';
import { typeAnim } from '../../../../shared/lib/type-anims';
const { customElement } = Polymer.decorators;
const EMPTY_OBJ = {};
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const currentBids = nodecg.Replicant('currentBids');
/**
 * @customElement
 * @polymer
 */
let GDQBreakBidsElement = class GDQBreakBidsElement extends GDQBreakLoopMixin(Polymer.Element) {
    ready() {
        super.ready();
        this.maxNoMoreItemsRetries = 30;
        currentBids.on('change', newVal => {
            this.availableItems = newVal;
        });
    }
    show() {
        const tl = new TimelineLite();
        tl.to(this, 0.333, {
            opacity: 1,
            ease: Sine.easeInOut
        }, 0);
        tl.to(this, 1, {
            x: '0%',
            ease: Power2.easeOut
        }, 0);
        return tl;
    }
    hide() {
        const tl = new TimelineLite();
        tl.to(this, 1, {
            x: '-100%',
            ease: Power2.easeIn
        });
        tl.to(this, 0.333, {
            opacity: 0,
            ease: Sine.easeInOut
        }, '-=0.333');
        return tl;
    }
    _showItem(bid) {
        let elementTagName;
        if (bid.type === 'choice-many') {
            elementTagName = 'gdq-break-bid-many';
        }
        else if (bid.type === 'choice-binary') {
            elementTagName = 'gdq-break-bid-binary';
        }
        else if (bid.type === 'challenge') {
            elementTagName = 'gdq-break-bid-challenge';
        }
        else {
            nodecg.log.error('Got bid of unexpected type (%s):', bid.type, JSON.stringify(bid, null, 2));
        }
        const tl = new TimelineLite();
        if (!elementTagName) {
            return tl;
        }
        const previousElement = this._previousBidElement;
        const element = document.createElement(elementTagName);
        element.bid = bid;
        this._previousBidElement = element;
        this.$.content.appendChild(element);
        if (previousElement) {
            tl.add(previousElement.exit());
            tl.call(() => {
                previousElement.remove();
            });
        }
        tl.call(() => {
            const contentElem = this.$.content;
            contentElem.selectIndex(contentElem.indexOf(element));
            this.$['description-actual'].innerHTML = bid.description.replace(/\\n/g, '</br>');
            typeAnim(this.$['description-actual']);
        }, undefined, null, '+=0.1');
        tl.add(element.enter());
        // Give the bid some time to show.
        tl.to(EMPTY_OBJ, DISPLAY_DURATION, EMPTY_OBJ);
        return tl;
    }
};
GDQBreakBidsElement = tslib_1.__decorate([
    customElement('gdq-break-bids')
], GDQBreakBidsElement);
export default GDQBreakBidsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLWJpZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtYnJlYWstYmlkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8saUJBQWlCLE1BQU0sc0NBQXNDLENBQUM7QUFFckUsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBRTNELE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBUTNDLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNyQixNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDO0FBQzdELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsYUFBYSxDQUFDLENBQUM7QUFFakU7OztHQUdHO0FBRUgsSUFBcUIsbUJBQW1CLEdBQXhDLE1BQXFCLG1CQUFvQixTQUFRLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQVk7SUFHN0YsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUM7UUFDaEMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSTtRQUNILE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFF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