import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const scoresRep = nodecg.Replicant('scores');
let GDQMarioScoresElement = class GDQMarioScoresElement extends Polymer.Element {
    ready() {
        super.ready();
        scoresRep.on('change', newVal => {
            if (newVal) {
                this.scores = newVal;
            }
        });
    }
    _scoreInputChanged(e) {
        if (!scoresRep.value || !e.target) {
            return;
        }
        const target = e.target;
        const teamIndex = parseInt(String(target.getAttribute('data-team-index')), 10);
        const val = parseInt(String(target.value), 10);
        if (typeof val === 'number' && !isNaN(val)) {
            scoresRep.value[teamIndex] = val;
        }
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQMarioScoresElement.prototype, "scores", void 0);
GDQMarioScoresElement = tslib_1.__decorate([
    customElement('gdq-marioscores')
], GDQMarioScoresElement);
export default GDQMarioScoresElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW1hcmlvc2NvcmVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW1hcmlvc2NvcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDckQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBUyxRQUFRLENBQUMsQ0FBQztBQUdyRCxJQUFxQixxQkFBcUIsR0FBMUMsTUFBcUIscUJBQXNCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFJakUsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksTUFBTSxFQUFFO2dCQUNYLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2FBQ3JCO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsa0JBQWtCLENBQUMsQ0FBUTtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDbEMsT0FBTztTQUNQO1FBRUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQTJCLENBQUM7UUFDN0MsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvRSxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUNqQztJQUNGLENBQUM7Q0FDRCxDQUFBO0FBdkJBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO3FEQUNWO0FBRksscUJBQXFCO0lBRHpDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztHQUNaLHFCQUFxQixDQXlCekM7ZUF6Qm9CLHFCQUFxQiJ9