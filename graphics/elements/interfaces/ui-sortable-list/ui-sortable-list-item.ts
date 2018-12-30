import UiSortableListElement from './ui-sortable-list';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('ui-sortable-list-item')
export default class UiSortableListItemElement extends Polymer.MutableData(Polymer.Element) {
	/**
	 * The index of the item
	 */
	@property({type: Number})
	index: number;

	/**
	 * The item to render
	 */
	@property({type: Object})
	item: string | object;

	/**
	 * The array of all items
	 */
	@property({type: Array})
	items: (string | object)[];

	/**
	 * The template instance corresponding to the item
	 */
	_itemTemplateInstance: TemplateInstanceBase;

	static get observers() {
		return [
			'_updateTemplateInstanceVariable("index", index, _itemTemplateInstance)',
			'_updateTemplateInstanceVariable("item", item, _itemTemplateInstance)'
		];
	}

	connectedCallback() {
		super.connectedCallback();
		if (!this._itemTemplateInstance) {
			const sortableList = (this.parentNode as any).host as UiSortableListElement;
			sortableList._ensureTemplatized();
			if (sortableList._itemTemplateClass) {
				this._itemTemplateInstance = new sortableList._itemTemplateClass();
				this.$.body.appendChild((this._itemTemplateInstance as any).root);
			}
		}
	}

	_updateTemplateInstanceVariable(variable?: string, value?: any, _itemTemplateInstance?: TemplateInstanceBase) {
		if (variable === undefined || value === undefined || _itemTemplateInstance === undefined) {
			return;
		}
		(_itemTemplateInstance as any)[variable] = value;
	}

	_calcUpDisabled(index: number) {
		return index === 0;
	}

	_calcDownDisabled(index: number, items: any[]) {
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
}
