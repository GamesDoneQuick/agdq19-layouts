import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const prizePlaylistRep = nodecg.Replicant('interview_prizePlaylist');
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
        this.parentNode.style.backgroundColor = newVal ? '#C2C2C2' : '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctcHJpemUtcGxheWxpc3QtaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW50ZXJ2aWV3LXByaXplLXBsYXlsaXN0LWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXlCLHlCQUF5QixDQUFDLENBQUM7QUFFN0Y7Ozs7R0FJRztBQUVILElBQXFCLHFDQUFxQyxHQUExRCxNQUFxQixxQ0FBc0MsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUF3QnRHLGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztTQUNIO0lBQ0YsQ0FBQztJQUVELFVBQVU7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQixPQUFPO1NBQ1A7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGFBQWE7UUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQixPQUFPO1NBQ1A7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNoQixPQUFPO1NBQ1A7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDLG1DQUFtQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELGVBQWUsQ0FBQyxPQUFlO1FBQzlCLE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhLEVBQUUsYUFBc0M7UUFDckUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDNUMsT0FBTztTQUNQO1FBRUQsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RSxPQUFPLE9BQU8sQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxNQUFlO1FBQzlCLElBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQzFFLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxDQUFNO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUU7WUFDdEMsSUFBSSxDQUFDLDJCQUEyQixHQUFHLElBQUksQ0FBQztZQUN4QyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDN0IsT0FBTzthQUNQO1NBQ0Q7UUFFRCxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNsQjthQUFNO1lBQ04sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3JCO0lBQ0YsQ0FBQztDQUNELENBQUE7QUFyRkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7b0VBQ1o7QUFNYjtJQUpDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNO1FBQ3RCLGtCQUFrQixFQUFFLElBQUk7UUFDeEIsUUFBUSxFQUFFLDJCQUEyQjtLQUNyQyxDQUFDO3NFQUNjO0FBUWhCO0lBTkMsUUFBUSxDQUFDO1FBQ1QsSUFBSSxFQUFFLE9BQU87UUFDYixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFFBQVEsRUFBRSx5Q0FBeUM7UUFDbkQsUUFBUSxFQUFFLGtCQUFrQjtLQUM1QixDQUFDO3VFQUNnQjtBQUdsQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzs2RUFDZTtBQW5CbkIscUNBQXFDO0lBRHpELGFBQWEsQ0FBQyxvQ0FBb0MsQ0FBQztHQUMvQixxQ0FBcUMsQ0F1RnpEO2VBdkZvQixxQ0FBcUMifQ==