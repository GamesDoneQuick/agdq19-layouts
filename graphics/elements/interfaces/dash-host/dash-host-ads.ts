import {IntermissionContentItem} from '../../../../src/types';
import {CurrentIntermission} from '../../../../src/types/schemas/currentIntermission';
import {WebsocketStatus} from '../../../../src/types/nodecg-obs';

const {customElement, property} = Polymer.decorators;
const currentIntermission = nodecg.Replicant<CurrentIntermission>('currentIntermission');
const casparConnected = nodecg.Replicant<boolean>('caspar:connected');
const compositingOBSWebsocket = nodecg.Replicant<WebsocketStatus>('compositingOBS:websocket');

@customElement('dash-host-ads')
export default class DashHostAdsElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	content: IntermissionContentItem[];

	@property({type: Boolean})
	private _connectedToNodeCG = true;
	private _adBreakIdBeingConfirmed: number;

	ready() {
		super.ready();
		this._checkCover = this._checkCover.bind(this);
		currentIntermission.on('change', newVal => {
			this.content = newVal ? newVal.content : [];
		});
		casparConnected.on('change', this._checkCover);
		compositingOBSWebsocket.on('change', this._checkCover);

		(window as any).socket.on('disconnect', () => {
			this._connectedToNodeCG = false;
			this._checkCover();
		});

		(window as any).socket.on('reconnect', () => {
			this._connectedToNodeCG = true;
			this._checkCover();
		});
	}

	startAdBreak(adBreakId: number) {
		nodecg.sendMessage('intermissions:startAdBreak', adBreakId);
	}

	cancelAdBreak(adBreakId: number) {
		nodecg.sendMessage('intermissions:cancelAdBreak', adBreakId);
	}

	completeAdBreak(event: any) {
		nodecg.sendMessage('intermissions:completeAdBreak', event.detail.adBreakId);
	}

	equal(a: any, b: any) {
		return a === b;
	}

	_confirmStartAdBreak(e: any) {
		this._adBreakIdBeingConfirmed = e.detail.adBreakId;
		(this.$.confirmStartDialog as PaperDialogElement).open();
	}

	_confirmCancelAdBreak(e: any) {
		this._adBreakIdBeingConfirmed = e.detail.adBreakId;
		(this.$.confirmCancelDialog as PaperDialogElement).open();
	}

	_handleConfirmStartDialogClosed(e: any) {
		if (e.detail.confirmed === true) {
			this.startAdBreak(this._adBreakIdBeingConfirmed);
		}
	}

	_handleConfirmCancelDialogClosed(e: any) {
		if (e.detail.confirmed === true) {
			this.cancelAdBreak(this._adBreakIdBeingConfirmed);
		}
	}

	_checkCover() {
		if (casparConnected.status !== 'declared' || compositingOBSWebsocket.status !== 'declared') {
			return;
		}

		(this.$.cover as HTMLDivElement).hidden = false;

		const casparIsConnected = casparConnected.value;
		const compositingOBSWebsocketIsConnected = compositingOBSWebsocket.value!.status === 'connected';
		if (!this._connectedToNodeCG) {
			this.$.cover.innerHTML = 'Disconnected from NodeCG!<br/>' +
				'Ads cannot be played until we reconnect.' +
				'<br/><br/>Tell the producer immediately!';
		} else if (!casparIsConnected && !compositingOBSWebsocketIsConnected) {
			this.$.cover.innerHTML = 'CasparCG and the compositing OBS are both disconnected!<br/>' +
				'Ads cannot be played until both of them are connected.' +
				'<br/><br/>Tell the producer immediately!';
		} else if (!casparIsConnected) {
			this.$.cover.innerHTML = 'CasparCG is disconnected!<br/>' +
				'Ads cannot be played until it is connected.' +
				'<br/><br/>Tell the producer immediately!';
		} else if (!compositingOBSWebsocketIsConnected) { // eslint-disable-line no-negated-condition
			this.$.cover.innerHTML = 'The compositing OBS is disconnected!<br/>' +
				'Ads cannot be played until it is connected.' +
				'<br/><br/>Tell the producer immediately!';
		} else {
			(this.$.cover as HTMLDivElement).hidden = true;
		}
	}
}
