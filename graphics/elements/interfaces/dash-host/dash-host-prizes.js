import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentPrizes = nodecg.Replicant('currentPrizes');
let DashHostPrizesElement = class DashHostPrizesElement extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        currentPrizes.on('change', newVal => {
            this.prizes = newVal;
        });
        nodecg.listenFor('prizes:updating', () => {
            this.$.cooldown.indeterminate = true;
        });
        nodecg.listenFor('prizes:updated', () => {
            this.$.cooldown.startCountdown(60);
        });
    }
    computePrizesFilter(str) {
        if (str) {
            // Return a filter function for the current search string.
            const regexp = new RegExp(str, 'ig');
            return (prize) => {
                return regexp.test(prize.description);
            };
        }
        // Set filter to null to disable filtering.
        return null;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashHostPrizesElement.prototype, "prizes", void 0);
tslib_1.__decorate([
    property({ type: String, notify: true })
], DashHostPrizesElement.prototype, "prizeFilterString", void 0);
DashHostPrizesElement = tslib_1.__decorate([
    customElement('dash-host-prizes')
], DashHostPrizesElement);
export default DashHostPrizesElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LXByaXplcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaG9zdC1wcml6ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFVLGVBQWUsQ0FBQyxDQUFDO0FBR2pFLElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFPdEYsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLGFBQWEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25DLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7WUFDdkMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUF3QyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtZQUN0QyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQXdDLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFtQixDQUFDLEdBQVc7UUFDOUIsSUFBSSxHQUFHLEVBQUU7WUFDUiwwREFBMEQ7WUFDMUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxLQUFZLEVBQUUsRUFBRTtnQkFDdkIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUM7U0FDRjtRQUVELDJDQUEyQztRQUMzQyxPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7Q0FDRCxDQUFBO0FBaENBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO3FEQUNSO0FBR2hCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0VBQ2I7QUFMTixxQkFBcUI7SUFEekMsYUFBYSxDQUFDLGtCQUFrQixDQUFDO0dBQ2IscUJBQXFCLENBa0N6QztlQWxDb0IscUJBQXFCIn0=