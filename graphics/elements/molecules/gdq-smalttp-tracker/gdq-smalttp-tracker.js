import * as tslib_1 from "tslib";
import { AbstractLocalRando } from '../../../classes/rando/abstract-local-rando';
const { customElement, property } = Polymer.decorators;
const smalttpData = nodecg.Replicant('smalttpData');
/**
 * @customElement
 * @polymer
 */
let GDQSmalttpTrackerElement = class GDQSmalttpTrackerElement extends AbstractLocalRando {
    ready() {
        super.ready();
        smalttpData.on('change', newVal => {
            this.goals = newVal;
        });
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQSmalttpTrackerElement.prototype, "goals", void 0);
GDQSmalttpTrackerElement = tslib_1.__decorate([
    customElement('gdq-smalttp-tracker')
], GDQSmalttpTrackerElement);
export default GDQSmalttpTrackerElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXNtYWx0dHAtdHJhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1zbWFsdHRwLXRyYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBRS9FLE1BQU0sRUFBQyxhQUFhLEVBQUUsUUFBUSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUNyRCxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFjLGFBQWEsQ0FBQyxDQUFDO0FBRWpFOzs7R0FHRztBQUVILElBQXFCLHdCQUF3QixHQUE3QyxNQUFxQix3QkFBeUIsU0FBUSxrQkFBd0I7SUFJN0UsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFdBQVcsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUNELENBQUE7QUFSQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQzt1REFDVjtBQUZNLHdCQUF3QjtJQUQ1QyxhQUFhLENBQUMscUJBQXFCLENBQUM7R0FDaEIsd0JBQXdCLENBVTVDO2VBVm9CLHdCQUF3QiJ9