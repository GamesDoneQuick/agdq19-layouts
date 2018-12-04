import * as tslib_1 from "tslib";
var UiRundownItemElement_1;
const { customElement, property } = Polymer.decorators;
let UiRundownItemElement = UiRundownItemElement_1 = class UiRundownItemElement extends Polymer.Element {
    _itemChanged(item) {
        this.itemType = (item ? item.type : '');
        this.$.topRight.innerHTML = '';
        this.$.bottomLeft.innerHTML = '';
        this.$.bottomRight.innerHTML = '';
        switch (item.type) {
            case 'run':
                this.name = item.name.replace(/\\n/g, ' ');
                this.$.topRight.innerHTML = item.category;
                this.$.bottomRight.textContent = `${item.console} - ${item.estimate}`;
                item.runners.forEach(runner => {
                    const span = document.createElement('span');
                    span.textContent = `${runner.name}, `;
                    this.$.bottomLeft.appendChild(span);
                });
                if (this.$.bottomLeft.lastChild && this.$.bottomLeft.lastChild.textContent) {
                    this.$.bottomLeft.lastChild.textContent =
                        this.$.bottomLeft.lastChild.textContent.substr(0, this.$.bottomLeft.lastChild.textContent.length - 2);
                }
                break;
            case 'adBreak':
                this.name = 'Ad Break';
                item.ads.forEach(ad => {
                    const span = document.createElement('span');
                    span.textContent = `${ad.adType} - ${ad.filename}`;
                    this.$.topRight.appendChild(span);
                });
                break;
            case 'interview':
                this.name = `INTERVIEW - ${item.subject}`;
                item.interviewers.forEach(interviewer => {
                    const span = document.createElement('span');
                    span.textContent = `${interviewer}, `;
                    span.classList.add('interviewer');
                    this.$.topRight.appendChild(span);
                });
                item.interviewees.forEach(interviewees => {
                    const span = document.createElement('span');
                    span.textContent = `${interviewees}, `;
                    this.$.topRight.appendChild(span);
                });
                if (this.$.topRight.lastChild && this.$.topRight.lastChild.textContent) {
                    this.$.topRight.lastChild.textContent =
                        this.$.topRight.lastChild.textContent.substr(0, this.$.topRight.lastChild.textContent.length - 2);
                }
                break;
            default:
                throw new Error(`'Unexpected content type "${this.itemType}" in item: ${JSON.stringify(item)}`);
        }
    }
    _itemHasNotes(item) {
        return item && 'notes' in item && item.notes.trim().length > 0;
    }
};
tslib_1.__decorate([
    property({ type: Object, observer: UiRundownItemElement_1.prototype._itemChanged })
], UiRundownItemElement.prototype, "item", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiRundownItemElement.prototype, "current", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiRundownItemElement.prototype, "name", void 0);
tslib_1.__decorate([
    property({ type: Object, reflectToAttribute: true })
], UiRundownItemElement.prototype, "itemType", void 0);
UiRundownItemElement = UiRundownItemElement_1 = tslib_1.__decorate([
    customElement('ui-rundown-item')
], UiRundownItemElement);
export default UiRundownItemElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktcnVuZG93bi1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktcnVuZG93bi1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBR3JELElBQXFCLG9CQUFvQiw0QkFBekMsTUFBcUIsb0JBQXFCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFhaEUsWUFBWSxDQUFDLElBQWtCO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRWxDLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQixLQUFLLEtBQUs7Z0JBQ1QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUUxQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFdEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQzdCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFh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