import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const canPlayTwitchAd = nodecg.Replicant('twitch:canPlayAd');
const timeLeft = nodecg.Replicant('twitch:timeLeftInAd');
const timeSince = nodecg.Replicant('twitch:timeSinceLastAd');
let DashHostTwitchAdsElement = class DashHostTwitchAdsElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.canPlay = false;
        this.cantPlayReason = '';
        this.timeLeft = '8:88';
        this.timeSince = '8:88:88';
        this.hideControls = false;
    }
    ready() {
        super.ready();
        canPlayTwitchAd.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this.canPlay = newVal.canPlay;
            this.cantPlayReason = newVal.reason;
        });
        timeLeft.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this.timeLeft = newVal.formatted.split('.')[0];
        });
        timeSince.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this.timeSince = newVal.formatted.split('.')[0];
        });
    }
    play() {
        this.$.confirmDialog.open();
    }
    _handleConfirmDialogClosed(e) {
        if (e.detail.confirmed === true) {
            const listbox = this.$.listbox;
            const selectedItem = listbox.selectedItem;
            if (!selectedItem) {
                return;
            }
            const duration = parseInt(selectedItem.getAttribute('data-value'), 10);
            nodecg.sendMessage('twitch:playAd', duration);
        }
    }
    _calcPlayButtonLabel(canPlay, cantPlayReason) {
        if (canPlay) {
            return 'Play Twitch Ad';
        }
        return cantPlayReason;
    }
};
tslib_1.__decorate([
    property({ type: Boolean })
], DashHostTwitchAdsElement.prototype, "canPlay", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashHostTwitchAdsElement.prototype, "cantPlayReason", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashHostTwitchAdsElement.prototype, "timeLeft", void 0);
tslib_1.__decorate([
    property({ type: String })
], DashHostTwitchAdsElement.prototype, "timeSince", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], DashHostTwitchAdsElement.prototype, "hideControls", void 0);
DashHostTwitchAdsElement = tslib_1.__decorate([
    customElement('dash-host-twitch-ads')
], DashHostTwitchAdsElement);
export default DashHostTwitchAdsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LXR3aXRjaC1hZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtdHdpdGNoLWFkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQW9CLGtCQUFrQixDQUFDLENBQUM7QUFDaEYsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBYSxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3JFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsd0JBQXdCLENBQUMsQ0FBQztBQUd6RSxJQUFxQix3QkFBd0IsR0FBN0MsTUFBcUIsd0JBQXlCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFEckU7O1FBR0MsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUdoQixtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUdwQixhQUFRLEdBQUcsTUFBTSxDQUFDO1FBR2xCLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFHdEIsaUJBQVksR0FBRyxLQUFLLENBQUM7SUFtRHRCLENBQUM7SUFqREEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVkLGVBQWUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQzlCLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBQ0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFvQyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFRCwwQkFBMEIsQ0FBQyxDQUFNO1FBQ2hDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQ2hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBOEIsQ0FBQztZQUN0RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBMkIsQ0FBQztZQUN6RCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNsQixPQUFPO2FBQ1A7WUFDRCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqRixNQUFNLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUM5QztJQUNGLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxPQUFnQixFQUFFLGNBQXNCO1FBQzVELElBQUksT0FBTyxFQUFFO1lBQ1osT0FBTyxnQkFBZ0IsQ0FBQztTQUN4QjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRCxDQUFBO0FBL0RBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDO3lEQUNWO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2dFQUNMO0FBR3BCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzBEQUNQO0FBR2xCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzJEQUNIO0FBR3RCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQzs4REFDL0I7QUFkRCx3QkFBd0I7SUFENUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0dBQ2pCLHdCQUF3QixDQWlFNUM7ZUFqRW9CLHdCQUF3QiJ9