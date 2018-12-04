import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const prizePlaylistRep = nodecg.Replicant('interview:prizePlaylist');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashInterviewPrizePlaylistItemElement = class DashInterviewPrizePlaylistItemElement extends Polymer.MutableData(Polymer.Element) {
    connectedCallback() {
        super.connectedCallback();
        if (!this._initialized) {
            this._initialized = true;
            prizePlaylistRep.on('change', newVal => {
                this._prizePlaylist = newVal;
            });
        }
    }
    markAsDone() {
        if (!this.prize) {
            return;
        }
        nodecg.sendMessage('interview:markPrizeAsDone', this.prize.id);
    }
    markAsNotDone() {
        if (!this.prize) {
            return;
        }
        nodecg.sendMessage('interview:markPrizeAsNotDone', this.prize.id);
    }
    removeFromPlaylist() {
        if (!this.prize) {
            return;
        }
        nodecg.sendMessage('interview:removePrizeFromPlaylist', this.prize.id);
    }
    _computePrizeId(prizeId) {
        return prizeId;
    }
    _computeComplete(prize, prizePlaylist) {
        if (!prize || !Array.isArray(prizePlaylist)) {
            return;
        }
        const playlistEntry = prizePlaylist.find(entry => entry.id === this.prize.id);
        return Boolean(playlistEntry && playlistEntry.complete);
    }
    _completeChanged(newVal) {
        this.parentNode.host.style.backgroundColor = newVal ? '#C2C2C2' : '';
    }
    _handleCheckboxChanged(e) {
        if (!this._handledFirstCheckboxChange) {
            this._handledFirstCheckboxChange = true;
            if (e.detail.value === false) {
                return;
            }
        }
        if (e.detail.value) {
            this.markAsDone();
        }
        else {
            this.markAsNotDone();
        }
    }
};
tslib_1.__decorate([
    property({ type: Object })
], DashInterviewPrizePlaylistItemElement.prototype, "prize", void 0);
tslib_1.__decorate([
    property({ type: String,
        reflectToAttribute: true,
        computed: '_computePrizeId(prize.id)'
    })
], DashInterviewPrizePlaylistItemElement.prototype, "prizeId", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        reflectToAttribute: true,
        computed: '_computeComplete(prize, _prizePlaylist)',
        observer: '_completeChanged'
    })
], DashInterviewPrizePlaylistItemElement.prototype, "complete", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewPrizePlaylistItemElement.prototype, "_prizePlaylist", void 0);
DashInterviewPrizePlaylistItemElement = tslib_1.__decorate([
    customElement('dash-interview-prize-playlist-item')
], DashInterviewPrizePlaylistItemElement);
export default DashInterviewPrizePlaylistItemElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctcHJpemUtcGxheWxpc3QtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW50ZXJ2aWV3LXByaXplLXBsYXlsaXN0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTJCLHlCQUF5QixDQUFDLENBQUM7QUFFL0Y7Ozs7R0FJRztBQUVILElBQXFCLHFDQUFxQyxHQUExRCxNQUFxQixxQ0FBc0MsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUF3QnRHLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVELFVBQVU7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQixPQUFPO1NBQ1A7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGFBQWE7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQixPQUFPO1NBQ1A7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQixPQUFPO1NBQ1A7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLG1DQUFtQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFlO1FBQzlCLE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsYUFBd0M7UUFDdkUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUMsT0FBTztTQUNQO1FBRUQsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RSxPQUFPLE9BQU8sQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFlO1FBQzlCLElBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMvRSxDQUFDO0lBRUQsc0JBQXNCLENBQUMsQ0FBTTtRQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFO1lBQ3RDLElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUM7WUFDeEMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7Z0JBQzdCLE9BQU87YUFDUDtTQUNEO1FBRUQsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDbEI7YUFBTTtZQUNOLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNyQjtJQUNGLENBQUM7Q0FDRCxDQUFBO0FBckZBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO29FQUNaO0FBTWI7SUFKQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTTtRQUN0QixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFFBQVEsRUFBRSwyQkFBMkI7S0FDckMsQ0FBQztzRUFDYztBQVFoQjtJQU5DLFFBQVEsQ0FBQztRQUNULElBQUksRUFBRSxPQUFPO1FBQ2Isa0JBQWtCLEVBQUUsSUFBSTtRQUN4QixRQUFRLEVBQUUseUNBQXlDO1FBQ25ELFFBQVEsRUFBRSxrQkFBa0I7S0FDNUIsQ0FBQzt1RUFDZ0I7QUFHbEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7NkVBQ2lCO0FBbkJyQixxQ0FBcUM7SUFEekQsYUFBYSxDQUFDLG9DQUFvQyxDQUFDO0dBQy9CLHFDQUFxQyxDQXVGekQ7ZUF2Rm9CLHFDQUFxQyJ9