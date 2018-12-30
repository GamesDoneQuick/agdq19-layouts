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
    property({ type: Array, computed: '_computeActualItems(items, _itemsReplicantValue)' })
], UiSortableListElement.prototype, "_actualItems", void 0);
UiSortableListElement = tslib_1.__decorate([
    customElement('ui-sortable-list')
], UiSortableListElement);
export default UiSortableListElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc29ydGFibGUtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXNvcnRhYmxlLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBRzFELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7Ozs7R0FLRztBQUVILElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFQckc7Ozs7O09BS0c7SUFDSDs7UUFNQyxvQkFBZSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFHcEMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFNakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVNYLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBdUY5QixDQUFDO0lBckZBLE1BQU0sS0FBSyxTQUFTO1FBQ25CLE9BQU87WUFDTiw4Q0FBOEM7U0FDOUMsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1lBQ3ZELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQWlCLENBQUMsS0FBSyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsbUJBQW1C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