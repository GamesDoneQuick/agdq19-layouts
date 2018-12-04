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
    _moveItemUpPressed(event) {
        this._sendItemAction('moveItemUp', event);
    }
    _moveItemDownPressed(event) {
        this._sendItemAction('moveItemDown', event);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc29ydGFibGUtbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVpLXNvcnRhYmxlLWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sWUFBWSxNQUFNLGdDQUFnQyxDQUFDO0FBRzFELE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUVyRDs7Ozs7R0FLRztBQUVILElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFQckc7Ozs7O09BS0c7SUFDSDs7UUFNQyxvQkFBZSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFHcEMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFNakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQVNYLGlCQUFZLEdBQUcsS0FBSyxDQUFDO0lBK0U5QixDQUFDO0lBN0VBLE1BQU0sS0FBSyxTQUFTO1FBQ25CLE9BQU87WUFDTiw4Q0FBOEM7U0FDOUMsQ0FBQztJQUNILENBQUM7SUFFRCxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFO1lBQ3ZELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQWlCLENBQUMsS0FBSyxDQUFDO2FBQ25EO2lCQUFNO2dCQUNOLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO2FBQ3hCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsbUJBQW1C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