import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
let DashHostAdbreakAdElement = class DashHostAdbreakAdElement extends Polymer.MutableData(Polymer.Element) {
    static get observers() {
        return [
            '_updateProgressBar(ad.state.*)'
        ];
    }
    frameNumberToTimeString(fps, frameNumber) {
        if (typeof fps !== 'number' || Number.isNaN(fps) ||
            typeof frameNumber !== 'number' || Number.isNaN(frameNumber)) {
            return ':??';
        }
        return this.formatSeconds(frameNumber / fps);
    }
    completeImageAd() {
        nodecg.sendMessage('intermissions:completeImageAd', this.ad.id);
    }
    _booleanReflect(bool) {
        return bool;
    }
    _updateProgressBar() {
        const progressFillElem = this.$['progress-fill'];
        if (!this.ad) {
            progressFillElem.style.transform = 'scaleX(0)';
            return;
        }
        let percent = this.ad.state.frameNumber / this.ad.state.durationFrames;
        percent = Math.max(percent, 0); // Clamp to minimum 0.
        percent = Math.min(percent, 1); // Clamp to maximum 1.
        progressFillElem.style.transform = `scaleX(${percent})`;
    }
    _calcAdvanceHidden(ad, adBreak) {
        if (!ad || !adBreak) {
            return true;
        }
        const lastAd = adBreak.ads[adBreak.ads.length - 1];
        return ad.adType.toLowerCase() !== 'image' || ad === lastAd;
    }
    /**
     * Formats a number of seconds into a string ([hh:]mm:ss).
     * @param seconds - The number of seconds to format.
     * @returns The formatted time sting.
     */
    formatSeconds(seconds) {
        const hms = {
            h: Math.floor(seconds / 3600),
            m: Math.floor(seconds % 3600 / 60),
            s: Math.floor(seconds % 3600 % 60)
        };
        let str = '';
        if (hms.h) {
            str += `${hms.h}:`;
        }
        str += `${(hms.m < 10 ? `0${hms.m}` : hms.m)}:${(hms.s < 10 ? `0${hms.s}` : hms.s)}`;
        return str;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], DashHostAdbreakAdElement.prototype, "adBreak", void 0);
tslib_1.__decorate([
    property({ type: Object })
], DashHostAdbreakAdElement.prototype, "ad", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        reflectToAttribute: true,
        computed: '_booleanReflect(ad.state.completed)'
    })
], DashHostAdbreakAdElement.prototype, "completed", void 0);
tslib_1.__decorate([
    property({
        type: Boolean,
        reflectToAttribute: true,
        computed: '_booleanReflect(ad.state.hasFile)'
    })
], DashHostAdbreakAdElement.prototype, "hasFile", void 0);
DashHostAdbreakAdElement = tslib_1.__decorate([
    customElement('dash-host-adbreak-ad')
], DashHostAdbreakAdElement);
export default DashHostAdbreakAdElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWFkYnJlYWstYWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWhvc3QtYWRicmVhay1hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBR3JELElBQXFCLHdCQUF3QixHQUE3QyxNQUFxQix3QkFBeUIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFxQnpGLE1BQU0sS0FBSyxTQUFTO1FBQ25CLE9BQU87WUFDTixnQ0FBZ0M7U0FDaEMsQ0FBQztJQUNILENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxHQUFZLEVBQUUsV0FBb0I7UUFDekQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDL0MsT0FBTyxXQUFXLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDOUQsT0FBTyxLQUFLLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELGVBQWU7UUFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELGVBQWUsQ0FBQyxJQUFhO1FBQzVCLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFtQixDQUFDO1FBRW5FLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFO1lBQ2IsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7WUFDL0MsT0FBTztTQUNQO1FBRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztRQUN2RSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFDdEQsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsc0JBQXNCO1FBQ3RELGdCQUFnQixDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsVUFBVSxPQUFPLEdBQUcsQ0FBQztJQUN6RCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsRUFBTyxFQUFFLE9BQWlCO1FBQzVDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUM7U0FDWjtRQUVELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkQsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sSUFBSSxFQUFFLEtBQUssTUFBTSxDQUFDO0lBQzdELENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsYUFBYSxDQUFDLE9BQWU7UUFDNUIsTUFBTSxHQUFHLEdBQUc7WUFDWCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQzdCLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2xDLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1NBQ2xDLENBQUM7UUFFRixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDVixHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7U0FDbkI7UUFFRCxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyRixPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7Q0FDRCxDQUFBO0FBcEZBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3lEQUNSO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO29EQUNsQjtBQU9QO0lBTEMsUUFBUSxDQUFDO1FBQ1QsSUFBSSxFQUFFLE9BQU87UUFDYixrQkFBa0IsRUFBRSxJQUFJO1FBQ3hCLFFBQVEsRUFBRSxxQ0FBcUM7S0FDL0MsQ0FBQzsyREFDaUI7QUFPbkI7SUFMQyxRQUFRLENBQUM7UUFDVCxJQUFJLEVBQUUsT0FBTztRQUNiLGtCQUFrQixFQUFFLElBQUk7UUFDeEIsUUFBUSxFQUFFLG1DQUFtQztLQUM3QyxDQUFDO3lEQUNlO0FBbkJHLHdCQUF3QjtJQUQ1QyxhQUFhLENBQUMsc0JBQXNCLENBQUM7R0FDakIsd0JBQXdCLENBc0Y1QztlQXRGb0Isd0JBQXdCIn0=