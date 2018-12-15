export abstract class AbstractRando<Goal> extends Polymer.MutableData(Polymer.Element) {
	abstract goals: Goal[];
	protected abstract _calcCellClass(goal: Goal, index: number): string;
	protected abstract _calcCellSrc(goal: Goal): string;
}
