import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const boardRep = nodecg.Replicant('bingosync:board');
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 */
let DashBingosyncElement = class DashBingosyncElement extends Polymer.MutableData(Polymer.Element) {
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
                nodecg.sendMessage('bingosync:selectLine', event.target.innerText.toLowerCase());
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
], DashBingosyncElement.prototype, "socket", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, computed: '_computeStatus(socket)' })
], DashBingosyncElement.prototype, "status", void 0);
DashBingosyncElement = tslib_1.__decorate([
    customElement('dash-bingosync')
], DashBingosyncElement);
export default DashBingosyncElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1iaW5nb3N5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWJpbmdvc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQW1CLGlCQUFpQixDQUFDLENBQUM7QUFFdkU7Ozs7R0FJRztBQUVILElBQXFCLG9CQUFvQixHQUF6QyxNQUFxQixvQkFBcUIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFOdEY7Ozs7T0FJRztJQUNIOztRQVFXLGdCQUFXLEdBQUcsS0FBSyxDQUFDO0lBa0YvQixDQUFDO0lBL0VBLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBeUIsQ0FBQztRQUM5RyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBWSxFQUFFLEVBQUU7Z0JBQ2pELE1BQU0sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUcsS0FBSyxDQUFDLE1BQTZCLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7WUFDMUcsQ0FBQyxDQUFDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1osT0FBTzthQUNQO1lBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFD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