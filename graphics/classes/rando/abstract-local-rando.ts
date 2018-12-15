import {AbstractRando} from './abstract-rando';

export interface AbstractGoal {
	name: string;
	state: number;
	maxState: number;
	highlight?: boolean;
}

export abstract class AbstractLocalRando<Goal extends AbstractGoal> extends AbstractRando<Goal> {
	protected _advance(e: any) {
		const updated = e.model.goal;
		if (updated.state === updated.maxState) {
			updated.state = 0;
		} else {
			updated.state++;
		}
	}

	protected _highlight(e: any) {
		console.log('_highlight:', e.model.goal);
		e.model.goal.highlight = !e.model.goal.highlight;
	}

	protected _calcCellClass(goal: Goal) {
		const classes = new Set(['cell']);

		if (goal.state === 0) {
			classes.add('cell--dimmed');
		}

		if (goal.highlight === true) {
			classes.add('cell--highlight');
		}

		return Array.from(classes).join(' ');
	}

	protected _calcToggleClass(goal: Goal) {
		const classes = new Set(['cell']);

		if (goal.highlight === true) {
			classes.add('cell--highlight');
		}

		return Array.from(classes).join(' ');
	}

	protected _calcCellSrc(goal: Goal) {
		let src = goal.name;
		if (goal.state > 1) {
			src += goal.state;
		}
		return src ? src : 'blank-pixel';
	}
}
