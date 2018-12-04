import {SmalttpData} from '../../../../src/types/schemas/smalttpData';

const {customElement, property} = Polymer.decorators;
const smalttpData = nodecg.Replicant<SmalttpData>('smalttpData');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-smalttp-tracker')
export default class GDQSmalttpTrackerElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Array})
	items: any[];

	ready() {
		super.ready();
		smalttpData.on('change', newVal => {
			this.items = newVal;
		});
	}

	_advance(e: any) {
		const updated = e.model.item;
		if (updated.state === updated.maxState) {
			updated.state = 0;
		} else {
			updated.state++;
		}
	}

	_highlight(e: any) {
		e.model.item.highlight = !e.model.item.highlight;
	}

	_calcCellClass(itemOrPrize: any) {
		const classes = new Set(['cell']);

		if (itemOrPrize.state === 0) {
			classes.add('cell--dimmed');
		}

		if (itemOrPrize.highlight === true) {
			classes.add('cell--highlight');
		}

		return Array.from(classes).join(' ');
	}

	_calcToggleClass(itemOrPrize: any) {
		const classes = new Set(['cell']);

		if (itemOrPrize.highlight === true) {
			classes.add('cell--highlight');
		}

		return Array.from(classes).join(' ');
	}

	_calcCellSrc(itemOrPrize: any) {
		let src = itemOrPrize.name;
		if (itemOrPrize.state > 1) {
			src += itemOrPrize.state;
		}
		return src ? src : 'blank-pixel';
	}
}
