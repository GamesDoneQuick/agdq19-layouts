import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
const smalttpData = nodecg.Replicant('smalttpData');
/**
 * @customElement
 * @polymer
 */
let GDQSmalttpTrackerElement = class GDQSmalttpTrackerElement extends Polymer.MutableData(Polymer.Element) {
    ready() {
        super.ready();
        smalttpData.on('change', newVal => {
            this.items = newVal;
        });
    }
    _advance(e) {
        const updated = e.model.item;
        if (updated.state === updated.maxState) {
            updated.state = 0;
        }
        else {
            updated.state++;
        }
    }
    _highlight(e) {
        e.model.item.highlight = !e.model.item.highlight;
    }
    _calcCellClass(itemOrPrize) {
        const classes = new Set(['cell']);
        if (itemOrPrize.state === 0) {
            classes.add('cell--dimmed');
        }
        if (itemOrPrize.highlight === true) {
            classes.add('cell--highlight');
        }
        return Array.from(classes).join(' ');
    }
    _calcToggleClass(itemOrPrize) {
        const classes = new Set(['cell']);
        if (itemOrPrize.highlight === true) {
            classes.add('cell--highlight');
        }
        return Array.from(classes).join(' ');
    }
    _calcCellSrc(itemOrPrize) {
        let src = itemOrPrize.name;
        if (itemOrPrize.state > 1) {
            src += itemOrPrize.state;
        }
        return src ? src : 'blank-pixel';
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQSmalttpTrackerElement.prototype, "items", void 0);
GDQSmalttpTrackerElement = tslib_1.__decorate([
    customElement('gdq-smalttp-tracker')
], GDQSmalttpTrackerElement);
export default GDQSmalttpTrackerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNtYWx0dHAtdHJhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1zbWFsdHRwLXRyYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFjLGFBQWEsQ0FBQyxDQUFDO0FBRWpFOzs7R0FHRztBQUVILElBQXFCLHdCQUF3QixHQUE3QyxNQUFxQix3QkFBeUIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFJekYsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFNO1FBQ2QsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxPQUFPLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDdkMsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDbEI7YUFBTTtZQUNOLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQjtJQUNGLENBQUM7SUFFRCxVQUFVLENBQUMsQ0FBTTtRQUNoQixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDbEQsQ0FBQztJQUVELGNBQWMsQ0FBQyxXQUFnQjtRQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFbEMsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxXQUFnQjtRQUNoQyxNQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFFbEMsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxZQUFZLENBQUMsV0FBZ0I7UUFDNUIsSUFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztRQUMzQixJQUFJLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0lBQ2xDLENBQUM7Q0FDRCxDQUFBO0FBckRBO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxDQUFDO3VEQUNYO0FBRk8sd0JBQXdCO0lBRDVDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztHQUNoQix3QkFBd0IsQ0F1RDVDO2VBdkRvQix3QkFBd0IifQ==