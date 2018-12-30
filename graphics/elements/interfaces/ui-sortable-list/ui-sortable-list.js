import * as tslib_1 from "tslib";
import MapSortMixin from '../../../mixins/map-sort-mixin';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 * @appliesMixin MapSortMixin
 */
let UiSortableListElement = class UiSortableListElement extends MapSortMixin(Polymer.MutableData(Polymer.Element)) {
    /**
     * @customElement
     * @polymer
     * @appliesMixin Polymer.MutableData
     * @appliesMixin MapSortMixin
     */
    constructor() {
        super(...arguments);
        this.replicantBundle = nodecg.bundleName;
        this.itemIdField = '';
        this.useSortMap = false;
        this._templatized = false;
    }
    static get observers() {
        return [
            '_updateSortFunction(useSortMap, itemIdField)'
        ];
    }
    ready() {
        super.ready();
        this._flashAddedNodes(this.shadowRoot, 'ui-sortable-list-item');
        this.$.replicant.addEventListener('value-changed', () => {
            if (this.useSortMap) {
                this._sortMapVal = this.$.replicant.value;
            }
            else {
                this._sortMapVal = null;
            }
        });
    }
    _computeActualItems(items, _itemsReplicantValue) {
        if (Array.isArray(items)) {
            return items;
        }
        return _itemsReplicantValue;
    }
    _ensureTemplatized() {
        if (!this._templatized) {
            this._templatized = true;
            const templateElement = this.querySelector('template[slot="item-body"]');
            if (templateElement) {
                this._itemTemplateClass = Polymer.Templatize.templatize(templateElement, this, {
                    forwardHostProp(prop, value) {
                        if (prop === 'item' || prop === 'index') {
                            return;
                        }
                        const items = Array.from(this.shadowRoot.querySelectorAll('ui-sortable-list-item'));
                        items.forEach(item => {
                            if (item._itemTemplateInstance) {
                                item._itemTemplateInstance.set(prop, value);
                            }
                        });
                    },
                    parentModel: true
                });
            }
        }
    }
    _removeItemPressed(event) {
        const forwardedEvent = new CustomEvent('remove-item', {
            detail: {
                model: event.model,
                listItemElement: event.target
            },
            cancelable: true
        });
        const cancelled = !this.dispatchEvent(forwardedEvent);
        if (!cancelled) {
            this._sendItemAction('removeItem', event);
        }
    }
    _moveItemToTopPressed(event) {
        this._sendItemAction('moveItemToTop', event);
    }
    _moveItemUpPressed(event) {
        this._sendItemAction('moveItemUp', event);
    }
    _moveItemDownPressed(event) {
        this._sendItemAction('moveItemDown', event);
    }
    _moveItemToBottomPressed(event) {
        this._sendItemAction('moveItemToBottom', event);
    }
    _sendItemAction(actionName, event) {
        nodecg.sendMessage(`sortable-list:${actionName}`, {
            replicantName: this.replicantName,
            replicantBundle: this.replicantBundle,
            itemIndex: event.model.index,
            itemId: this.itemIdField && event.model.item[this.itemIdField],
            itemIdField: this.itemIdField,
            useSortMap: this.useSortMap
        });
    }
    _updateSortFunction(useSortMap, itemIdField) {
        const repeat = this.$.repeat;
        if (useSortMap && itemIdField) {
            repeat.sort = this._createMapSort(itemIdField);
        }
        else {
            repeat.sort = null;
        }
    }
};
tslib_1.__decorate([
    property({ type: String })
], UiSortableListElement.prototype, "replicantName", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiSortableListElement.prototype, "replicantBundle", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiSortableListElement.prototype, "itemIdField", void 0);
tslib_1.__decorate([
    property({ type: Array })
], UiSortableListElement.prototype, "items", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiSortableListElement.prototype, "useSortMap", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], UiSortableListElement.prototype, "showRemoveButton", void 0);
tslib_1.__decorate([
    property({ type: String })
], UiSortableListElement.prototype, "removeButtonIcon", void 0);
tslib_1.__decorate([
    property({ type: Boolean })
], UiSortableListElement.prototype, "preventRemoveItemBehavior", void 0);
tslib_1.__decorate([
    property({ type: Array, computed: '_computeActualItems(items, _itemsReplicantValue)' })
], UiSortableListElement.prototype, "_actualItems", void 0);
UiSortableListElement = tslib_1.__decorate([
    customElement('ui-sortable-list')
], UiSortableListElement);
export default UiSortableListElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc29ydGFibGUtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXNvcnRhYmxlLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBRzFELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7Ozs7R0FLRztBQUVILElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFQckc7Ozs7O09BS0c7SUFDSDs7UUFNQyxvQkFBZSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFHcEMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFNakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWtCWCxpQkFBWSxHQUFHLEtBQUssQ0FBQztJQXFHOUIsQ0FBQztJQW5HQSxNQUFNLEtBQUssU0FBUztRQUNuQixPQUFPO1lBQ04sOENBQThDO1NBQzlDLENBQUM7SUFDSCxDQUFDO0lBRUQsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVyxFQUFFLHVCQUF1QixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtZQUN2RCxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFpQixDQUFDLEtBQUssQ0FBQzthQUNuRDtpQkFBTTtnQkFDTixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzthQUN4QjtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFt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