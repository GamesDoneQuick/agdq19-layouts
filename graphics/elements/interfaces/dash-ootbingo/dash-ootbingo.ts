import {OotBingo3Aboard} from '../../../../src/types/schemas/ootBingo%3Aboard';
import {OotBingo3Asocket} from '../../../../src/types/schemas/ootBingo%3Asocket';

const {customElement, property} = Polymer.decorators;
const boardRep = nodecg.Replicant<OotBingo3Aboard>('ootBingo:board');

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
@customElement('dash-ootbingo')
export default class DashOotbingoElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: String})
	socket: OotBingo3Asocket;

	@property({type: String, reflectToAttribute: true, computed: '_computeStatus(socket)'})
	status: string;

	protected _submitting = false;
	private _$lineSelectors: PaperButtonElement[];

	ready() {
		super.ready();
		this._$lineSelectors = Array.from(this.shadowRoot!.querySelectorAll('.lineSelector')) as PaperButtonElement[];
		this._$lineSelectors.forEach(button => {
			button.addEventListener('click', (event: Event) => {
				nodecg.sendMessage('ootBingo:selectLine', (event.target as PaperButtonElement).innerText.toLowerCase());
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
		nodecg.sendMessage('ootBingo:toggleLineFocus');
	}

	toggleCard() {
		nodecg.sendMessage('ootBingo:toggleCard');
	}

	toggleEmbiggen() {
		nodecg.sendMessage('ootBingo:toggleEmbiggen');
	}

	async submit() {
		this._submitting = true;
		await nodecg.sendMessage('ootBingo:joinRoom', {
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

	_computeStatus(socket?: OotBingo3Asocket) {
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
