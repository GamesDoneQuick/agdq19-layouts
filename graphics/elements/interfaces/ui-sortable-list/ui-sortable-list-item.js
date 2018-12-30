import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let UiSortableListItemElement = class UiSortableListItemElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.showRemoveButton = false;
        this.removeButtonIcon = 'remove';
    }
    static get observers() {
        return [
            '_updateTemplateInstanceVariable("index", index, _itemTemplateInstance)',
            '_updateTemplateInstanceVariable("item", item, _itemTemplateInstance)'
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        if (!this._itemTemplateInstance) {
            const sortableList = this.parentNode.host;
            sortableList._ensureTemplatized();
            if (sortableList._itemTemplateClass) {
                this._itemTemplateInstance = new sortableList._itemTemplateClass();
                this.$.body.appendChild(this._itemTemplateInstance.root);
            }
        }
    }
    _updateTemplateInstanceVariable(variable, value, _itemTemplateInstance) {
        if (variable === undefined || value === undefined || _itemTemplateInstance === undefined) {
            return;
        }
        _itemTemplateInstance[variable] = value;
    }
    _calcUpDisabled(index) {
        return index === 0;
    }
    _calcDownDisabled(index, items) {
        if (!items) {
            return true;
        }
        return index === (items.length - 1);
    }
    _moveItemToTopPressed() {
        this.dispatchEvent(new CustomEvent('move-item-to-top'));
    }
    _moveItemUpPressed() {
        this.dispatchEvent(new CustomEvent('move-item-up'));
    }
    _moveItemDownPressed() {
        this.dispatchEvent(new CustomEvent('move-item-down'));
    }
    _moveItemToBottomPressed() {
        this.dispatchEvent(new CustomEvent('move-item-to-bottom'));
    }
    _removeItemPressed() {
        this.dispatchEvent(new CustomEvent('remove-item'));
    }
};
tslib_1.__decorate([
    property({ type: Number })
], UiSortableListItemElement.prototype, "index", void 0);
tslib_1.__decorate([
    property({ type: Object })
], UiSortableListItemElement.prototype, "item", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiSortableListItemElement.prototype, "items", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiSortableListItemElement.prototype, "showRemoveButton", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiSortableListItemElement.prototype, "removeButtonIcon", void 0);
UiSortableListItemElement = tslib_1.__decorate([
    customElement('ui-sortable-list-item')
], UiSortableListItemElement);
export default UiSortableListItemElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc29ydGFibGUtbGlzdC1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktc29ydGFibGUtbGlzdC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUwzRjs7O09BR0c7SUFDSDs7UUFxQkMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBR3pCLHFCQUFnQixHQUFHLFFBQVEsQ0FBQztJQWdFN0IsQ0FBQztJQXpEQSxNQUFNLEtBQUssU0FBUztRQUNuQixPQUFPO1lBQ04sd0VBQXdFO1lBQ3hFLHNFQUFzRTtTQUN0RSxDQUFDO0lBQ0gsQ0FBQztJQUVELGlCQUFpQjtRQUNoQixLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQ2hDLE1BQU0sWUFBWSxHQUFJLElBQUksQ0FBQyxVQUFrQixDQUFDLElBQTZCLENBQUM7WUFDNUUsWUFBWSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDbEMsSUFBSSxZQUFZLENBQUMsa0JBQWtCLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUNuRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFDLHFCQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2xFO1NBQ0Q7SUFDRixDQUFDO0lBRUQsK0JBQStCLENBQUMsUUFBaUIsRUFBRSxLQUFXLEVBQUUscUJBQTRDO1FBQzNHLElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLHFCQUFxQixLQUFLLFNBQVMsRUFBRTtZQUN6RixPQUFPO1NBQ1A7UUFDQSxxQkFBNkIsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFhO1FBQzVCLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBYSxFQUFFLEtBQVk7UUFDNUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxPQUFPLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELHFCQUFxQjtRQUNwQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsa0JBQWtCO1FBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsb0JBQW9CO1FBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCx3QkFBd0I7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNELENBQUE7QUFsRkE7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7d0RBQ1g7QUFNZDtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt1REFDSDtBQU10QjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt3REFDRztBQUczQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUM7bUVBQzNCO0FBR3pCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO21FQUNHO0FBdkJSLHlCQUF5QjtJQUQ3QyxhQUFhLENBQUMsdUJBQXVCLENBQUM7R0FDbEIseUJBQXlCLENBdUY3QztlQXZGb0IseUJBQXlCIn0=