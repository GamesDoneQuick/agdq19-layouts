import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const currentIntermission = nodecg.Replicant('currentIntermission');
const casparConnected = nodecg.Replicant('caspar:connected');
const compositingOBSWebsocket = nodecg.Replicant('compositingOBS:websocket');
let DashHostAdsElement = class DashHostAdsElement extends Polymer.MutableData(Polymer.Element) {
    constructor() {
        super(...arguments);
        this._connectedToNodeCG = true;
    }
    ready() {
        super.ready();
        this._checkCover = this._checkCover.bind(this);
        currentIntermission.on('change', newVal => {
            this.content = newVal ? newVal.content : [];
        });
        casparConnected.on('change', this._checkCover);
        compositingOBSWebsocket.on('change', this._checkCover);
        window.socket.on('disconnect', () => {
            this._connectedToNodeCG = false;
            this._checkCover();
        });
        window.socket.on('reconnect', () => {
            this._connectedToNodeCG = true;
            this._checkCover();
        });
    }
    startAdBreak(adBreakId) {
        nodecg.sendMessage('intermissions:startAdBreak', adBreakId);
    }
    cancelAdBreak(adBreakId) {
        nodecg.sendMessage('intermissions:cancelAdBreak', adBreakId);
    }
    completeAdBreak(event) {
        nodecg.sendMessage('intermissions:completeAdBreak', event.detail.adBreakId);
    }
    equal(a, b) {
        return a === b;
    }
    _confirmStartAdBreak(e) {
        this._adBreakIdBeingConfirmed = e.detail.adBreakId;
        this.$.confirmStartDialog.open();
    }
    _confirmCancelAdBreak(e) {
        this._adBreakIdBeingConfirmed = e.detail.adBreakId;
        this.$.confirmCancelDialog.open();
    }
    _handleConfirmStartDialogClosed(e) {
        if (e.detail.confirmed === true) {
            this.startAdBreak(this._adBreakIdBeingConfirmed);
        }
    }
    _handleConfirmCancelDialogClosed(e) {
        if (e.detail.confirmed === true) {
            this.cancelAdBreak(this._adBreakIdBeingConfirmed);
        }
    }
    _checkCover() {
        if (casparConnected.status !== 'declared' || compositingOBSWebsocket.status !== 'declared') {
            return;
        }
        this.$.cover.hidden = false;
        const casparIsConnected = casparConnected.value;
        const compositingOBSWebsocketIsConnected = compositingOBSWebsocket.value.status === 'connected';
        if (!this._connectedToNodeCG) {
            this.$.cover.innerHTML = 'Disconnected from NodeCG!<br/>' +
                'Ads cannot be played until we reconnect.' +
                '<br/><br/>Tell the producer immediately!';
        }
        else if (!casparIsConnected && !compositingOBSWebsocketIsConnected) {
            this.$.cover.innerHTML = 'CasparCG and the compositing OBS are both disconnected!<br/>' +
                'Ads cannot be played until both of them are connected.' +
                '<br/><br/>Tell the producer immediately!';
        }
        else if (!casparIsConnected) {
            this.$.cover.innerHTML = 'CasparCG is disconnected!<br/>' +
                'Ads cannot be played until it is connected.' +
                '<br/><br/>Tell the producer immediately!';
        }
        else if (!compositingOBSWebsocketIsConnected) { // eslint-disable-line no-negated-condition
            this.$.cover.innerHTML = 'The compositing OBS is disconnected!<br/>' +
                'Ads cannot be played until it is connected.' +
                '<br/><br/>Tell the producer immediately!';
        }
        else {
            this.$.cover.hidden = true;
        }
    }
};
tslib_1.__decorate([
    property({ type: Array })
], DashHostAdsElement.prototype, "content", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], DashHostAdsElement.prototype, "_connectedToNodeCG", void 0);
DashHostAdsElement = tslib_1.__decorate([
    customElement('dash-host-ads')
], DashHostAdsElement);
export default DashHostAdsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1ob3N0LWFkcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtaG9zdC1hZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQXNCLHFCQUFxQixDQUFDLENBQUM7QUFDekYsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBVSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3RFLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBa0IsMEJBQTBCLENBQUMsQ0FBQztBQUc5RixJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBRHBGOztRQU1TLHVCQUFrQixHQUFHLElBQUksQ0FBQztJQTBGbkMsQ0FBQztJQXZGQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxlQUFlLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0MsdUJBQXVCLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFdEQsTUFBYyxDQUFDLE1BQU0sQ0FBQyxF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