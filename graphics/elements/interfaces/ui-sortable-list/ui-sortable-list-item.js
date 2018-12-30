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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc29ydGFibGUtbGlzdC1pdGVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidWktc29ydGFibGUtbGlzdC1pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQ7OztHQUdHO0FBRUgsSUFBcUIseUJBQXlCLEdBQTlDLE1BQXFCLHlCQUEwQixTQUFRLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQXdCMUYsTUFBTSxLQUFLLFNBQVM7UUFDbkIsT0FBTztZQUNOLHdFQUF3RTtZQUN4RSxzRUFBc0U7U0FDdEUsQ0FBQztJQUNILENBQUM7SUFFRCxpQkFBaUI7UUFDaEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUNoQyxNQUFNLFlBQVksR0FBSSxJQUFJLENBQUMsVUFBa0IsQ0FBQyxJQUE2QixDQUFDO1lBQzVFLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQ2xDLElBQUksWUFBWSxDQUFDLGtCQUFrQixFQUFFO2dCQUNwQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxZQUFZLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztnQkFDbkUsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBQyxxQkFBNkIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsRTtTQUNEO0lBQ0YsQ0FBQztJQUVELCtCQUErQixDQUFDLFFBQWlCLEVBQUUsS0FBVyxFQUFFLHFCQUE0QztRQUMzRyxJQUFJLFFBQVEsS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxxQkFBcUIsS0FBSyxTQUFTLEVBQUU7WUFDekYsT0FBTztTQUNQO1FBQ0EscUJBQTZCLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ2xELENBQUM7SUFFRCxlQUFlLENBQUMsS0FBYTtRQUM1QixPQUFPLEtBQUssS0FBSyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEtBQWEsRUFBRSxLQUFZO1FBQzVDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQztTQUNaO1FBRUQsT0FBTyxLQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxxQkFBcUI7UUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGtCQUFrQjtRQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELG9CQUFvQjtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsd0JBQXdCO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxXQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDRCxDQUFBO0FBeEVBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3dEQUNYO0FBTWQ7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7dURBQ0g7QUFNdEI7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7d0RBQ0c7QUFqQlAseUJBQXlCO0lBRDdDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztHQUNsQix5QkFBeUIsQ0E2RTdDO2VBN0VvQix5QkFBeUIifQ==