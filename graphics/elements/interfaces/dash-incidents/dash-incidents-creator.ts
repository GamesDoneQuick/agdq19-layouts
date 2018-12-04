const {customElement, property} = Polymer.decorators;
const log = new nodecg.Logger(`${nodecg.bundleName}:victorOps`);

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('dash-incidents-creator')
export default class DashIncidentsCreatorElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Boolean, reflectToAttribute: true, computed: '_computeSending(_requestStatus)'})
	sending: boolean;

	@property({type: String, observer: DashIncidentsCreatorElement.prototype._requestStatusChanged})
	_requestStatus = 'ready';

	private _routingKey: string;
	private _subject: string;
	private _statusFadeTimeout?: number;

	async send() {
		const detailsElem = this.$.details as HTMLTextAreaElement;
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
		} catch (error) {
			log.warn('Failed to create incident:', error);
			this._requestStatus = 'failure';
		}
	}

	_computeSending(_requestStatus: string) {
		return _requestStatus === 'sending';
	}

	_requestStatusChanged(requestStatus: string) {
		clearTimeout(this._statusFadeTimeout);
		this.$.status.classList.remove('fade-out');

		if (requestStatus === 'success' || requestStatus === 'failure') {
			this._statusFadeTimeout = window.setTimeout(() => {
				this._statusFadeTimeout = undefined;
				this.$.status.classList.add('fade-out');
			}, 5000);
		}
	}

	_calcSendDisabled(sending: boolean, routingKey: string, subject: string) {
		return sending || !routingKey || !subject;
	}
}
