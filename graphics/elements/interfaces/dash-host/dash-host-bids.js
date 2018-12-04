import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const allBids = nodecg.Replicant('allBids');
const currentRun = nodecg.Replicant('currentRun');
const runOrderMap = nodecg.Replicant('runOrderMap');
let DashHostBidsElement = class DashHostBidsElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this.bidTypes = ['choice-many', 'choice-binary'];
    }
    ready() {
        super.ready();
        allBids.on('change', () => {
            this.recalcRelevantBids();
        });
        currentRun.on('change', () => {
            this.recalcRelevantBids();
        });
        runOrderMap.on('change', () => {
            this.recalcRelevantBids();
        });
        nodecg.listenFor('bids:updating', () => {
            this.$.cooldown.indeterminate = true;
        });
        nodecg.listenFor('bids:updated', () => {
            this.$.cooldown.startCountdown(60);
        });
    }
    closeDialog() {
        this.$.dialog.close();
    }
    computeBidsFilter(str) {
        if (str) {
            // Return a filter function for the current search string.
            const regexp = new RegExp(escapeRegExp(str), 'ig');
            return (bid) => {
                return regexp.test(bid.description);
            };
        }
        // Set filter to null to disable filtering.
        return null;
    }
    recalcRelevantBids() {
        if (allBids.status !== 'declared' ||
            currentRun.status !== 'declared' ||
            runOrderMap.status !== 'declared' ||
            !allBids.value ||
            !runOrderMap.value ||
            !currentRun.value) {
            return;
        }
        this.relevantBids = allBids.value.filter(bid => {
            if (!this.bidTypes.includes(bid.type)) {
                return false;
            }
            if (bid.speedrun in runOrderMap.value) {
                return runOrderMap.value[bid.speedrun] >= currentRun.value.order;
            }
            return true;
        }).sort((a, b) => {
            return runOrderMap.value[a.speedrun] - runOrderMap.value[b.speedrun];
        });
    }
    calcBidName(description) {
        return description.replace('||', ' -- ');
    }
    _handleBidTap(e) {
        if (e.target.bid.type !== 'choice-many') {
            return;
        }
        this.dialogBid = e.target.bid;
        this.$.dialog.open();
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashHostBidsElement.prototype, "relevantBids", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashHostBidsElement.prototype, "bidFilterString", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashHostBidsElement.prototype, "dialogBid", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashHostBidsElement.prototype, "bidTypes", void 0);
DashHostBidsElement = tslib_1.__decorate([
    customElement('dash-host-bids')
], DashHostBidsElement);
export default DashHostBidsElement;
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWJpZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtYmlkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWMsU0FBUyxDQUFDLENBQUM7QUFDekQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBTSxZQUFZLENBQUMsQ0FBQztBQUN2RCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFXLGFBQWEsQ0FBQyxDQUFDO0FBRzlELElBQXFCLG1CQUFtQixHQUF4QyxNQUFxQixtQkFBb0IsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFEckY7O1FBWUMsYUFBUSxHQUFHLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBK0U3QyxDQUFDO0lBN0VBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDekIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDNUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxXQUFXLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxHQUFHLEVBQUU7WUFDckMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUF3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