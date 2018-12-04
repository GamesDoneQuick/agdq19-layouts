import * as tslib_1 from "tslib";
var DashIncidentsCreatorElement_1;
const { customElement, property } = Polymer.decorators;
const log = new nodecg.Logger(`${nodecg.bundleName}:victorOps`);
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashIncidentsCreatorElement = DashIncidentsCreatorElement_1 = class DashIncidentsCreatorElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this._requestStatus = 'ready';
    }
    async send() {
        const detailsElem = this.$.details;
        log.info('Sending incident creation request...');
        this._requestStatus = 'sending';
        try {
            await nodecg.sendMessage('victorOps:createIncident', {
                routingKey: this._routingKey,
                subject: this._subject,
                details: detailsElem.value
            });
            log.info('Incident successfully created.');
            this._requestStatus = 'success';
            this._routingKey = '';
            this._subject = '';
            detailsElem.value = '';
        }
        catch (error) {
            log.warn('Failed to create incident:', error);
            this._requestStatus = 'failure';
        }
    }
    _computeSending(_requestStatus) {
        return _requestStatus === 'sending';
    }
    _requestStatusChanged(requestStatus) {
        clearTimeout(this._statusFadeTimeout);
        this.$.status.classList.remove('fade-out');
        if (requestStatus === 'success' || requestStatus === 'failure') {
            this._statusFadeTimeout = window.setTimeout(() => {
                this._statusFadeTimeout = undefined;
                this.$.status.classList.add('fade-out');
            }, 5000);
        }
    }
    _calcSendDisabled(sending, routingKey, subject) {
        return sending || !routingKey || !subject;
    }
};
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true, computed: '_computeSending(_requestStatus)' })
], DashIncidentsCreatorElement.prototype, "sending", void 0);
tslib_1.__decorate([
    property({ type: String, observer: DashIncidentsCreatorElement_1.prototype._requestStatusChanged })
], DashIncidentsCreatorElement.prototype, "_requestStatus", void 0);
DashIncidentsCreatorElement = DashIncidentsCreatorElement_1 = tslib_1.__decorate([
    customElement('dash-incidents-creator')
], DashIncidentsCreatorElement);
export default DashIncidentsCreatorElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbmNpZGVudHMtY3JlYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaW5jaWRlbnRzLWNyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsWUFBWSxDQUFDLENBQUM7QUFFaEU7Ozs7R0FJRztBQUVILElBQXFCLDJCQUEyQixtQ0FBaEQsTUFBcUIsMkJBQTRCLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTjdGOzs7O09BSUc7SUFDSDs7UUFNQyxtQkFBYyxHQUFHLE9BQU8sQ0FBQztJQWdEMUIsQ0FBQztJQTFDQSxLQUFLLENBQUMsSUFBSTtRQUNULE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBOEIsQ0FBQztRQUMxRCxHQUFHLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7UUFFaEMsSUFBSTtZQUNILE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQywwQkFBMEIsRUFBRTtnQkFDcEQsVUFBVSxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUM1QixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVE7Z0JBQ3RCLE9BQU8sRUFBRSxXQUFXLENBQUMsS0FBSzthQUMxQixDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7WUFFaEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDdkI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUM7U0FDaEM7SUFDRixDQUFDO0lBRUQsZUFBZSxDQUFDLGNBQXNCO1FBQ3JDLE9BQU8sY0FBYyxLQUFLLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0lBRUQscUJBQXFCLENBQUMsYUFBcUI7UUFDMUMsWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0MsSUFBSSxhQUFhLEtBQUssU0FBUyxJQUFJLGFBQWEsS0FBSyxTQUFTLEVBQUU7WUFDL0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNoRCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNUO0lBQ0YsQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQWdCLEVBQUUsVUFBa0IsRUFBRSxPQUFlO1FBQ3RFLE9BQU8sT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQzNDLENBQUM7Q0FDRCxDQUFBO0FBbkRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLGlDQUFpQyxFQUFDLENBQUM7NERBQ2hGO0FBR2pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsNkJBQTJCLENBQUMsU0FBUyxDQUFDLHFCQUFxQixFQUFDLENBQUM7bUVBQ3ZFO0FBTEwsMkJBQTJCO0lBRC9DLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztHQUNuQiwyQkFBMkIsQ0FxRC9DO2VBckRvQiwyQkFBMkIifQ==