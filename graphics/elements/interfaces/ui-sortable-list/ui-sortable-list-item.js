import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let UiSortableListItemElement = class UiSortableListItemElement extends Polymer.MutableData(Polymer.Element) {
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
                this.shadowRoot.appendChild(this._itemTemplateInstance.root);
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
    _moveItemUpPressed() {
        this.dispatchEvent(new CustomEvent('move-item-up'));
    }
    _moveItemDownPressed() {
        this.dispatchEvent(new CustomEvent('move-item-down'));
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
UiSortableListItemElement = tslib_1.__decorate([
    customElement('ui-sortable-list-item')
], UiSortableListItemElement);
export default UiSortableListItemElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc29ydGFibGUtbGlzdC1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktc29ydGFibGUtbGlzdC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQXdCMUYsTUFBTSxLQUFLLFNBQVM7UUFDbkIsT0FBTztZQUNOLHdFQUF3RTtZQUN4RSxzRUFBc0U7U0FDdEUsQ0FBQztJQUNILENBQUM7SUFFRCxpQkFBaUI7UUFDaEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNoQyxNQUFNLFlBQVksR0FBSSxJQUFJLENBQUMsVUFBa0IsQ0FBQyxJQUE2QixDQUFDO1lBQzVFLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ2xDLElBQUksWUFBWSxDQUFDLGtCQUFrQixFQUFFO2dCQUNwQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDbkUsSUFBSSxDQUFDLFVBQVcsQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFDLHFCQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZFO1NBQ0Q7SUFDRixDQUFDO0lBRUQsK0JBQStCLENBQUMsUUFBaUIsRUFBRSxLQUFXLEVBQUUscUJBQTRDO1FBQzNHLElBQUksUUFBUSxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLHFCQUFxQixLQUFLLFNBQVMsRUFBRTtZQUN6RixPQUFPO1NBQ1A7UUFDQSxxQkFBNkIsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDbEQsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFhO1FBQzVCLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBRUQsaUJBQWlCLENBQUMsS0FBYSxFQUFFLEtBQVk7UUFDNUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFFRCxPQUFPLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELG9CQUFvQjtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0QsQ0FBQTtBQWhFQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzt3REFDWDtBQU1kO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3VEQUNIO0FBTXRCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO3dEQUNHO0FBakJQLHlCQUF5QjtJQUQ3QyxhQUFhLENBQUMsdUJBQXVCLENBQUM7R0FDbEIseUJBQXlCLENBcUU3QztlQXJFb0IseUJBQXlCIn0=