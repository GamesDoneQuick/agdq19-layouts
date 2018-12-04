import {Run} from '../../../../src/types';
import GDQRuninfoCategoryElement from './gdq-runinfo-category';
import GDQRuninfoMiscElement from './gdq-runinfo-misc';

const {customElement, property} = Polymer.decorators;
const currentRun = nodecg.Replicant<Run>('currentRun');

@customElement('gdq-runinfo')
export default class GDQRuninfoElement extends Polymer.Element {
	@property({type: Number})
	maxNameSize = 45;

	@property({type: Boolean, reflectToAttribute: true})
	forceSingleLineName = false;

	@property({type: String})
	estimate: string;

	@property({type: String})
	releaseYear: string;

	@property({type: String})
	console: string;

	@property({type: String})
	category: string;

	@property({type: String})
	name = '?';

	private initialized = false;

	ready() {
		super.ready();
		Polymer.RenderStatus.afterNextRender(this, () => {
			currentRun.on('change', this.currentRunChanged.bind(this));
		});
	}

	currentRunChanged(newVal: Run) {
		this.name = newVal.name;
		this.category = newVal.category;
		this.console = newVal.console;
		this.releaseYear = String(newVal.releaseYear) || '20XX';
		this.estimate = newVal.estimate;

		// Avoids some issues that can arise on the first time that fitText is run.
		// Currently unsure why these issues happen.
		if (this.initialized) {
			this.fitText();
		} else {
			Polymer.RenderStatus.afterNextRender(this, this.fitText);
			this.initialized = true;
		}
	}

	fitText() {
		Polymer.flush();
		(window as any).textFit(this.$.name, {maxFontSize: this.maxNameSize});
		(this.$.category as GDQRuninfoCategoryElement).maxTextWidth = this.clientWidth - 76;
		(this.$.misc as GDQRuninfoMiscElement).maxTextWidth = (this.clientWidth - 124) / 3;
	}

	_processName(name?: string) {
		if (!name) {
			return '&nbsp;';
		}

		if (this.forceSingleLineName) {
			return `<div class="name-line">${name.replace('\\n', ' ')}</div>`;
		}

		return name.split('\\n')
			.map(lineText => `<div class="name-line">${lineText}</div>`)
			.join('\n');
	}
}
