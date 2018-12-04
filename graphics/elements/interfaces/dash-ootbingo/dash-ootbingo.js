import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const boardRep = nodecg.Replicant('ootBingo:board');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashOotbingoElement = class DashOotbingoElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     */
    constructor() {
        super(...arguments);
        this._submitting = false;
    }
    ready() {
        super.ready();
        this._$lineSelectors = Array.from(this.shadowRoot.querySelectorAll('.lineSelector'));
        this._$lineSelectors.forEach(button => {
            button.addEventListener('click', (event) => {
                nodecg.sendMessage('ootBingo:selectLine', event.target.innerText.toLowerCase());
            });
        });
        boardRep.on('change', newVal => {
            if (!newVal) {
                return;
            }
            this._$lineSelectors.forEach(button => {
                if (button.innerText.toLowerCase() === newVal.selectedLine) {
                    button.setAttribute('selected', 'true');
                }
                else {
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
            siteUrl: this.$.siteUrl.value,
            socketUrl: this.$.socketUrl.value,
            playerName: this.$.playerName.value,
            roomCode: this.$.roomCode.value,
            passphrase: this.$.passphrase.value
        });
        this._submitting = false;
    }
    defaults() {
        this.$.siteUrl.value = 'https://bingosync.com';
        this.$.socketUrl.value = 'wss://sockets.bingosync.com';
        this.$.playerName.value = 'NodeCG';
    }
    _computeStatus(socket) {
        if (!socket) {
            return 'disconnected';
        }
        return socket.status;
    }
    _calcToggleClass(cardHidden) {
        return cardHidden ? 'green' : 'red';
    }
    _calcFocusToggleText(lineFocused) {
        return lineFocused ?
            'See whole board' :
            'Focus on selected group';
    }
    _calcToggleCardText(cardHidden) {
        return cardHidden ? 'Show Card' : 'Hide Card';
    }
    _calcToggleEmbiggenText(embiggen) {
        return embiggen ? 'Debiggen Card' : 'Embiggen Card';
    }
};
tslib_1.__decorate([
    property({ type: String })
], DashOotbingoElement.prototype, "socket", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, computed: '_computeStatus(socket)' })
], DashOotbingoElement.prototype, "status", void 0);
DashOotbingoElement = tslib_1.__decorate([
    customElement('dash-ootbingo')
], DashOotbingoElement);
export default DashOotbingoElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1vb3RiaW5nby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRhc2gtb290YmluZ28udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFrQixnQkFBZ0IsQ0FBQyxDQUFDO0FBRXJFOzs7O0dBSUc7QUFFSCxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW9CLFNBQVEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBTnJGOzs7O09BSUc7SUFDSDs7UUFRVyxnQkFBVyxHQUFHLEtBQUssQ0FBQztJQWtGL0IsQ0FBQztJQS9FQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQXlCLENBQUM7UUFDOUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQVksRUFBRSxFQUFFO2dCQUNqRCxNQUFNLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFHLEtBQUssQ0FBQyxNQUE2QixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO1lBQ3pHLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7UUFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNaLE9BQU87YUFDUDtZQUVELElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxF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