import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const allPrizesRep = nodecg.Replicant('allPrizes');
const prizePlaylistRep = nodecg.Replicant('interview:prizePlaylist');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashInterviewPrizesElement = class DashInterviewPrizesElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this.searchString = '';
    }
    ready() {
        super.ready();
        allPrizesRep.on('change', newVal => {
            this.allPrizes = newVal;
        });
        prizePlaylistRep.on('change', newVal => {
            this.prizePlaylist = newVal;
        });
    }
    clearFilter() {
        this.searchString = '';
    }
    addPrizeToPlayList(prizeOrPrizeId) {
        const prizeId = disambiguatePrizeId(prizeOrPrizeId);
        nodecg.sendMessage('interview:addPrizeToPlaylist', prizeId);
    }
    removePrizeFromPlaylist(prizeOrPrizeId) {
        const prizeId = disambiguatePrizeId(prizeOrPrizeId);
        nodecg.sendMessage('interview:removePrizeFromPlaylist', prizeId);
    }
    clearPlaylist() {
        nodecg.sendMessage('interview:clearPrizePlaylist');
    }
    _calcClearIconHidden(searchString) {
        return !searchString || searchString.length <= 0;
    }
    _calcPrizesToList(allPrizes, searchString) {
        if (!allPrizes || allPrizes.length <= 0) {
            return [];
        }
        if (!searchString || searchString.trim().length === 0) {
            return allPrizes;
        }
        return allPrizes.filter(prize => {
            return prize.description.toLowerCase().includes(searchString.toLowerCase());
        });
    }
    _isPrizeInPlaylist(prizeOrPrizeId, prizePlaylist) {
        if (!prizePlaylist) {
            return false;
        }
        const prizeId = disambiguatePrizeId(prizeOrPrizeId);
        return prizePlaylist.findIndex(({ id }) => id === prizeId) >= 0;
    }
    _calcClearPlaylistDisabled(prizePlaylist) {
        return !prizePlaylist || prizePlaylist.length <= 0;
    }
    _handlePrizeListingAddTap(e) {
        this.addPrizeToPlayList(e.model.prize);
    }
    _handlePrizeListingRemoveTap(e) {
        this.removePrizeFromPlaylist(e.model.prize);
    }
    _calcPrizesInPlaylist(allPrizes, prizePlaylist) {
        if (!allPrizes || allPrizes.length === 0 ||
            !prizePlaylist || prizePlaylist.length === 0) {
            return [];
        }
        return prizePlaylist.map(playlistEntry => {
            return allPrizes.find(prize => {
                return prize.id === playlistEntry.id;
            });
        });
    }
    _calcPlaylistPrizeChecked(prize, prizePlaylist) {
        if (!prize || !prizePlaylist || prizePlaylist.length <= 0) {
            return false;
        }
        console.log(prize, prizePlaylist);
        const playlistEntry = prizePlaylist.find(pe => pe.id === prize.id);
        if (!playlistEntry) {
            return false;
        }
        return playlistEntry.complete;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewPrizesElement.prototype, "allPrizes", void 0);
tslib_1.__decorate([
    property({ type: Array })
], DashInterviewPrizesElement.prototype, "prizePlaylist", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashInterviewPrizesElement.prototype, "searchString", void 0);
DashInterviewPrizesElement = tslib_1.__decorate([
    customElement('dash-interview-prizes')
], DashInterviewPrizesElement);
export default DashInterviewPrizesElement;
/**
 * Given a prize Object or prize ID Number, will always return a prize ID Number.
 * @param prizeOrPrizeId - Either a prize Object or a prize ID Number.
 * @returns A prize ID Number.
 */
function disambiguatePrizeId(prizeOrPrizeId) {
    return typeof prizeOrPrizeId === 'object' ?
        prizeOrPrizeId.id :
        prizeOrPrizeId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbnRlcnZpZXctcHJpemVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGFzaC1pbnRlcnZpZXctcHJpemVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxXQUFXLENBQUMsQ0FBQztBQUM1RCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTJCLHlCQUF5QixDQUFDLENBQUM7QUFFL0Y7Ozs7R0FJRztBQUVILElBQXFCLDBCQUEwQixHQUEvQyxNQUFxQiwwQkFBMkIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFONUY7Ozs7T0FJRztJQUNIOztRQVNDLGlCQUFZLEdBQUcsRUFBRSxDQUFDO0lBa0duQixDQUFDO0lBaEdBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFZCxZQUFZLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxjQUE4QjtRQUNoRCxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsV0FBVyxDQUFDLDhCQUE4QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxjQUE4QjtRQUNyRCxNQUFNLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxNQUFNLENBQUMsV0FBVyxDQUFDLG1DQUFtQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxhQUFhO1FBQ1osTUFBTSxDQUFDLFdBQVcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxZQUFvQjtRQUN4QyxPQUFPLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxTQUFtQixFQUFFLFlBQXFCO1FBQzNELElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDeEMsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUVELElBQUksQ0FBQyxZQUFZLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdEQsT0FBTyxTQUFTLENBQUM7U0FDakI7UUFFRCxPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxjQUE4QixFQUFFLGFBQXVDO1FBQ3pGLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbkIsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELE1BQU0sT0FBTyxHQUFHLG1CQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELDBCQUEwQixDQUFDLGFBQXVDO1FBQ2pFLE9BQU8sQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHlCQUF5QixDQUFDLENBQU07UUFDL0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELDRCQUE0QixDQUFDLENBQU07UUFDbEMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELHFCQUFxQixDQUFDLFNBQW1CLEVBQUUsYUFBd0M7UUFDbEYsSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDdkMsQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDOUMsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUVELE9BQU8sYUFBYSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUN4QyxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLE9BQU8sS0FBSyxDQUFDLEVBQUUsS0FBSyxhQUFhLENBQUMsRUFBRSxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQseUJBQXlCLENBQUMsS0FBYSxFQUFFLGFBQXdDO1FBQ2hGLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxhQUFhLElBQUksYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDMUQsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRWxDLE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ25CLE9BQU8sS0FBSyxDQUFDO1NBQ2I7UUFFRCxPQUFPLGFBQWEsQ0FBQyxRQUFRLENBQUM7SUFDL0IsQ0FBQztDQUNELENBQUE7QUF4R0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7NkRBQ0w7QUFHbkI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7aUVBQ2dCO0FBR3hDO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2dFQUNQO0FBUkUsMEJBQTBCO0lBRDlDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztHQUNsQiwwQkFBMEIsQ0EwRzlDO2VBMUdvQiwwQkFBMEI7QUE0Ry9DOzs7O0dBSUc7QUFDSCxTQUFTLG1CQUFtQixDQUFDLGNBQStCO0lBQzNELE9BQU8sT0FBTyxjQUFjLEtBQUssUUFBUSxDQUFDLENBQUM7UUFDMUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25CLGNBQWMsQ0FBQztBQUNqQixDQUFDIn0=