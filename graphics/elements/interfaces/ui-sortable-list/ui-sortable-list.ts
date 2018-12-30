import MapSortMixin from '../../../mixins/map-sort-mixin';
import UiSortableListItemElement from './ui-sortable-list-item';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 * @appliesMixin MapSortMixin
 */
@customElement('ui-sortable-list')
export default class UiSortableListElement extends MapSortMixin(Polymer.MutableData(Polymer.Element)) {
	@property({type: String})
	replicantName: string;

	@property({type: String})
	replicantBundle = nodecg.bundleName;

	@property({type: String})
	itemIdField = '';

	@property({type: Array})
	items: any[];

	@property({type: Boolean, reflectToAttribute: true})
	useSortMap = false;

	@property({type: Boolean, reflectToAttribute: true})
	showRemoveButton: boolean;

	@property({type: String})
	removeButtonIcon: string;

	@property({type: Boolean})
	preventRemoveItemBehavior: boolean;

	sort: Function;
	_itemTemplateClass: (new() => TemplateInstanceBase);

	@property({type: Array, computed: '_computeActualItems(items, _itemsReplicantValue)'})
	protected _actualItems: any[];

	protected _itemsReplicantValue: any[];
	private _templatized = false;

	static get observers() {
		return [
			'_updateSortFunction(useSortMap, itemIdField)'
		];
	}

	ready() {
		super.ready();
		this._flashAddedNodes(this.shadowRoot!, 'ui-sortable-list-item');
		this.$.replicant.addEventListener('value-changed', () => {
			if (this.useSortMap) {
				this._sortMapVal = (this.$.replicant as any).value;
			} else {
				this._sortMapVal = null;
			}
		});
	}

	_computeActualItems(items: any[], _itemsReplicantValue: any[]) {
		if (Array.isArray(items)) {
			return items;
		}

		return _itemsReplicantValue;
	}

	_ensureTemplatized() {
		if (!this._templatized) {
			this._templatized = true;
			const templateElement = this.querySelector('template[slot="item-body"]') as HTMLTemplateElement;
			if (templateElement) {
				this._itemTemplateClass = Polymer.Templatize.templatize(templateElement, this, {
					forwardHostProp(prop: string, value: any) {
						if (prop === 'item' || prop === 'index') {
							return;
						}

						const items = Array.from((this as any).shadowRoot.querySelectorAll('ui-sortable-list-item')) as UiSortableListItemElement[];
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

	_removeItemPressed(event: MouseEvent) {
		const forwardedEvent = new CustomEvent('remove-item', {
			detail: {
				model: (event as any).model,
				listItemElement: event.target
			},
			cancelable: true
		});
		const cancelled = !this.dispatchEvent(forwardedEvent);
		if (!cancelled) {
			this._sendItemAction('removeItem', event);
		}
	}

	_moveItemToTopPressed(event: MouseEvent) {
		this._sendItemAction('moveItemToTop', event);
	}

	_moveItemUpPressed(event: MouseEvent) {
		this._sendItemAction('moveItemUp', event);
	}

	_moveItemDownPressed(event: MouseEvent) {
		this._sendItemAction('moveItemDown', event);
	}

	_moveItemToBottomPressed(event: MouseEvent) {
		this._sendItemAction('moveItemToBottom', event);
	}

	_sendItemAction(actionName: string, event: MouseEvent) {
		nodecg.sendMessage(`sortable-list:${actionName}`, {
			replicantName: this.replicantName,
			replicantBundle: this.replicantBundle,
			itemIndex: (event as any).model.index,
			itemId: this.itemIdField && (event as any).model.item[this.itemIdField],
			itemIdField: this.itemIdField,
			useSortMap: this.useSortMap
		});
	}

	_updateSortFunction(useSortMap: boolean, itemIdField: string) {
		const repeat = this.$.repeat as Polymer.DomRepeat;
		if (useSortMap && itemIdField) {
			repeat.sort = this._createMapSort(itemIdField);
		} else {
			repeat.sort = null;
		}
	}
}
