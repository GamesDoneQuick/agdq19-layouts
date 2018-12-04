import {ScheduleItem} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

@customElement('ui-rundown-item')
export default class UiRundownItemElement extends Polymer.Element {
	@property({type: Object, observer: UiRundownItemElement.prototype._itemChanged})
	item: ScheduleItem;

	@property({type: Boolean, reflectToAttribute: true})
	current: boolean;

	@property({type: String})
	name: string;

	@property({type: Object, reflectToAttribute: true})
	protected itemType: 'run' | 'adBreak' | 'interview' | '';

	_itemChanged(item: ScheduleItem) {
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

	_itemHasNotes(item?: ScheduleItem) {
		return item && 'notes' in item && item.notes.trim().length > 0;
	}
}
