import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarChallengesElement = class GDQOmnibarChallengesElement extends Polymer.Element {
    enter(displayDuration) {
        const tl = new TimelineLite();
        this.challenges.forEach((challenge, index) => {
            const challengeElement = document.createElement('gdq-omnibar-challenge');
            challengeElement.classList.add('challenge');
            challengeElement.bid = challenge;
            this.$.challenges.appendChild(challengeElement);
            tl.call(() => {
                this.$.challenges.select(index);
            }, undefined, null, '+=0.03');
            if (index === 0) {
                tl.add(this.$.label.enter(challenge.description));
            }
            else {
                tl.add(this.$.label.change(challenge.description));
            }
            tl.call(() => {
                tl.pause();
                challengeElement.render();
                const tempTl = challengeElement.enter();
                tempTl.call(tl.resume, undefined, tl);
            });
            tl.call(() => {
                tl.pause();
                const tempTl = challengeElement.exit();
                tempTl.call(tl.resume, undefined, tl);
            }, undefined, null, `+=${displayDuration}`);
        });
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        tl.add(this.$.label.exit());
        return tl;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQOmnibarChallengesElement.prototype, "challenges", void 0);
GDQOmnibarChallengesElement = tslib_1.__decorate([
    customElement('gdq-omnibar-challenges')
], GDQOmnibarChallengesElement);
export default GDQOmnibarChallengesElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItY2hhbGxlbmdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1vbW5pYmFyLWNoYWxsZW5nZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFJbEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLDJCQUEyQixHQUFoRCxNQUFxQiwyQkFBNEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUl2RSxLQUFLLENBQUMsZUFBdUI7UUFDNUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUM1QyxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQStCLENBQUM7WUFDdkcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QyxnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRWhELEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBa0MsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUQsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFOUIsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO2dCQUNoQixFQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBdUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7YUFDckY7aUJBQU07Z0JBQ04sRUFBRSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQXVDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO2FBQ3RGO1lBRUQsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNYLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMxQixNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUVILEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNaLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDWCxNQUFNLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2QyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxLQUFLLGVBQWUsRUFBRSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBdUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNELENBQUE7QUEzQ0E7SUFEQyxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQUM7K0RBQ0E7QUFGSiwyQkFBMkI7SUFEL0MsYUFBYSxDQUFDLHdCQUF3QixDQUFDO0dBQ25CLDJCQUEyQixDQTZDL0M7ZUE3Q29CLDJCQUEyQiJ9