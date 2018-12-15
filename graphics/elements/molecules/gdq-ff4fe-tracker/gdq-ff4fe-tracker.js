import * as tslib_1 from "tslib";
import { AbstractLocalRando } from '../../../classes/rando/abstract-local-rando';
const { customElement, property } = Polymer.decorators;
const boardsRep = nodecg.Replicant('ff4feRandoBoards');
/**
 * @customElement
 * @polymer
 */
let GDQFF4FETrackerElement = class GDQFF4FETrackerElement extends AbstractLocalRando {
    ready() {
        super.ready();
        boardsRep.on('change', newVal => {
            this.goals = newVal[this.index];
        });
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQFF4FETrackerElement.prototype, "goals", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQFF4FETrackerElement.prototype, "index", void 0);
GDQFF4FETrackerElement = tslib_1.__decorate([
    customElement('gdq-ff4fe-tracker')
], GDQFF4FETrackerElement);
export default GDQFF4FETrackerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWZmNGZlLXRyYWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtZmY0ZmUtdHJhY2tlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFFL0UsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQW1CLGtCQUFrQixDQUFDLENBQUM7QUFFekU7OztHQUdHO0FBRUgsSUFBcUIsc0JBQXNCLEdBQTNDLE1BQXFCLHNCQUF1QixTQUFRLGtCQUF3QjtJQU8zRSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFYQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQztxREFDVjtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FEQUNYO0FBTE0sc0JBQXNCO0lBRDFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztHQUNkLHNCQUFzQixDQWExQztlQWJvQixzQkFBc0IifQ==