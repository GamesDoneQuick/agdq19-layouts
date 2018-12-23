import {BingosyncBoard} from '../../../../src/types/schemas/bingosync_board';
import {BingosyncSocket} from '../../../../src/types/schemas/bingosync_socket';

const {customElement, property} = Polymer.decorators;
const boardRep = nodecg.Replicant<BingosyncBoard>('bingosync_board');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('dash-bingosync')
export default class DashBingosyncElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: String})
	socket: BingosyncSocket;

	@property({type: String, reflectToAttribute: true, computed: '_computeStatus(socket)'})
	status: string;

	protected _submitting = false;
	private _$lineSelectors: PaperButtonElement[];

	ready() {
		super.ready();
		this._$lineSelectors = Array.from(this.shadowRoot!.querySelectorAll('.lineSelector')) as PaperButtonElement[];
		this._$lineSelectors.forEach(button => {
			button.addEventListener('click', (event: Event) => {
				nodecg.sendMessage('bingosync:selectLine', (event.target as PaperButtonElement).innerText.toLowerCase());
			});
		});

		boardRep.on('change', newVal => {
			if (!newVal) {
				return;
			}

			this._$lineSelectors.forEach(button => {
				if (button.innerText.toLowerCase() === newVal.selectedLine) {
					button.setAttribute('selected', 'true');
				} else {
					button.removeAttribute('selected');
				}
			});
		});
	}

	toggleLineFocus() {
		nodecg.sendMessage('bingosync:toggleLineFocus');
	}

	toggleCard() {
		nodecg.sendMessage('bingosync:toggleCard');
	}

	toggleEmbiggen() {
		nodecg.sendMessage('bingosync:toggleEmbiggen');
	}

	async submit() {
		this._submitting = true;
		await nodecg.sendMessage('bingosync:joinRoom', {
			siteUrl: (this.$.siteUrl as PaperInputElement).value,
			socketUrl: (this.$.socketUrl as PaperInputElement).value,
			playerName: (this.$.playerName as PaperInputElement).value,
			roomCode: (this.$.roomCode as PaperInputElement).value,
			passphrase: (this.$.passphrase as PaperInputElement).value
		});
		this._submitting = false;
	}

	defaults() {
		(this.$.siteUrl as PaperInputElement).value = 'https://bingosync.com';
		(this.$.socketUrl as PaperInputElement).value = 'wss://sockets.bingosync.com';
		(this.$.playerName as PaperInputElement).value = 'NodeCG';
	}

	_computeStatus(socket?: BingosyncSocket) {
		if (!socket) {
			return 'disconnected';
		}

		return socket.status;
	}

	_calcToggleClass(cardHidden: boolean) {
		return cardHidden ? 'green' : 'red';
	}

	_calcFocusToggleText(lineFocused: boolean) {
		return lineFocused ?
			'See whole board' :
			'Focus on selected group';
	}

	_calcToggleCardText(cardHidden: boolean) {
		return cardHidden ? 'Show Card' : 'Hide Card';
	}

	_calcToggleEmbiggenText(embiggen: boolean) {
		return embiggen ? 'Debiggen Card' : 'Embiggen Card';
	}
}
