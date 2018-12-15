import { AbstractRando } from './abstract-rando';
export class AbstractLocalRando extends AbstractRando {
    _advance(e) {
        const updated = e.model.goal;
        if (updated.state === updated.maxState) {
            updated.state = 0;
        }
        else {
            updated.state++;
        }
    }
    _highlight(e) {
        console.log('_highlight:', e.model.goal);
        e.model.goal.highlight = !e.model.goal.highlight;
    }
    _calcCellClass(goal) {
        const classes = new Set(['cell']);
        if (goal.state === 0) {
            classes.add('cell--dimmed');
        }
        if (goal.highlight === true) {
            classes.add('cell--highlight');
        }
        return Array.from(classes).join(' ');
    }
    _calcToggleClass(goal) {
        const classes = new Set(['cell']);
        if (goal.highlight === true) {
            classes.add('cell--highlight');
        }
        return Array.from(classes).join(' ');
    }
    _calcCellSrc(goal) {
        let src = goal.name;
        if (goal.state > 1) {
            src += goal.state;
        }
        return src ? src : 'blank-pixel';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtbG9jYWwtcmFuZG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhYnN0cmFjdC1sb2NhbC1yYW5kby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFTL0MsTUFBTSxPQUFnQixrQkFBOEMsU0FBUSxhQUFtQjtJQUNwRixRQUFRLENBQUMsQ0FBTTtRQUN4QixNQUFNLE9BQU8sR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM3QixJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUN2QyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUNsQjthQUFNO1lBQ04sT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hCO0lBQ0YsQ0FBQztJQUVTLFVBQVUsQ0FBQyxDQUFNO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ2xELENBQUM7SUFFUyxjQUFjLENBQUMsSUFBVTtRQUNsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFbEMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFUyxnQkFBZ0IsQ0FBQyxJQUFVO1FBQ3BDLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUVsQyxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztTQUMvQjtRQUVELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVTLFlBQVksQ0FBQyxJQUFVO1FBQ2hDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDcEIsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtZQUNuQixHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNsQjtRQUNELE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUNsQyxDQUFDO0NBQ0QifQ==