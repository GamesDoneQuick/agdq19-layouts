const {customElement} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('ui-element-tester')
export default class UiElementTesterElement extends Polymer.Element {
	protected _elementSlotObserver: Polymer.FlattenedNodesObserver;

	static calcPropertyInputType(propertyType: any) {
		switch (propertyType) {
			case String:
				return 'text';
			case Number:
				return 'number';
			case Boolean:
				return 'checkbox';
			default:
				return 'text';
		}
	}

	static createPropertyInput(element: Polymer.Element, propertyName: string, property: any) {
		let input: PaperInputElement | PaperDropdownMenuElement;
		let valuePrefix: HTMLDivElement;

		const elementTesterOpts = property.elementTester || {};
		if (elementTesterOpts.enum) {
			input = document.createElement('paper-dropdown-menu') as PaperDropdownMenuElement;

			const listBox = document.createElement('paper-listbox') as PaperListboxElement;
			listBox.slot = 'dropdown-content';
			listBox.selected = 0;

			property.elementTester.enum.forEach((allowedValue: any) => {
				const item = document.createElement('paper-item') as PaperItemElement;
				(item as any).value = allowedValue;
				item.innerText = allowedValue;
				listBox.appendChild(item);
			});

			input.appendChild(listBox);
		} else {
			input = document.createElement('paper-input') as PaperInputElement;
			input.type = UiElementTesterElement.calcPropertyInputType(property.type);

			if (elementTesterOpts.type) {
				input.type = property.elementTester.type;
			}

			if (input.type === 'color' || input.type === 'checkbox') {
				valuePrefix = document.createElement('div') as HTMLDivElement;
				valuePrefix.classList.add('prefix');
				valuePrefix.classList.add(`prefix-${input.type}`);
				valuePrefix.slot = 'prefix';
				valuePrefix.setAttribute('prefix', 'true');
				valuePrefix.innerText = property.value;
				input.appendChild(valuePrefix);
			}

			if (input.type === 'checkbox') {
				input.alwaysFloatLabel = true;
				input.addEventListener('click', () => {
					(input as any).value = !input.value;
				});
			}

			input.setAttribute('type', (input as any).type);
		}

		input.label = propertyName;
		input.value = property.value;
		input.classList.add('control');

		input.addEventListener('value-changed', e => {
			const detail = (e as any).detail;
			const target = e.target! as any;
			let newValue = detail.value;
			if (target.type === 'number') {
				newValue = parseFloat(newValue);
			} else if (target.type === 'checkbox') {
				if (newValue === 'false') {
					newValue = false;
				} else if (newValue === 'true') {
					newValue = true;
				}
				newValue = Boolean(newValue);
			}

			if (valuePrefix) {
				valuePrefix.innerText = newValue;
			}

			(element as any)[propertyName] = newValue;
		});

		return input;
	}

	ready() {
		super.ready();
		this._elementSlotObserver = new Polymer.FlattenedNodesObserver(this.$.elementSlot, (_target, info) => {
			this._removeInputs();
			const firstElementNode = info.addedNodes.find(addedNode => addedNode.nodeName !== '#text');
			if (firstElementNode) {
				Polymer.RenderStatus.beforeNextRender(this, () => {
					this._attachToElement(firstElementNode as Polymer.Element);
				});
			}
		});
	}

	_attachToElement(element: Polymer.Element) {
		const props = Object.entries((element.constructor as any).properties)
			.filter(arr => {
				const propDecl = arr[1] as any;
				return !propDecl.readOnly &&
					!propDecl.computed &&
					typeof propDecl.value !== 'function';
			});
		props.forEach(([propName, propDecl]) => {
			const input = UiElementTesterElement.createPropertyInput(element, propName, propDecl);
			this.$.controls.appendChild(input);
		});
	}

	_removeInputs() {
		this.$.controls.innerHTML = '';
	}
}
