import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const questions = nodecg.Replicant('interview:questionTweets');
const questionSortMap = nodecg.Replicant('interview:questionSortMap');
const questionShowing = nodecg.Replicant('interview:questionShowing');
let GDQInterviewQuestionElement = class GDQInterviewQuestionElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.onScreenTweet = null;
        this._timeline = new TimelineLite({ autoRemoveChildren: true });
        this._initialized = false;
    }
    ready() {
        super.ready();
        questions.on('change', newVal => {
            this._questionsVal = newVal.slice(0);
        });
        questionSortMap.on('change', newVal => {
            this._sortMapVal = newVal.slice(0);
        });
        questionShowing.on('change', newVal => {
            if (newVal) {
                this.show();
            }
            else {
                this.hide();
            }
            this._initialized = true;
        });
    }
    show() {
        if (!this.onScreenTweet) {
            return;
        }
        const tweetEl = this.$.tweet;
        this._timeline.call(() => {
            tweetEl._addReset();
            tweetEl._createEntranceAnim(this.onScreenTweet);
        }, undefined, null, '+=0.5');
    }
    hide() {
        if (!this._initialized) {
            return;
        }
        this._timeline.call(() => {
            this.$.tweet._createExitAnim();
        }, undefined, null, '+=0.5');
    }
    calcOnScreenTweet(_questionsVal, _sortMapVal) {
        if (!_questionsVal || !_sortMapVal) {
            return;
        }
        return _questionsVal.find(reply => {
            return _sortMapVal.indexOf(reply.id_str) === 0;
        });
    }
};
tslib_1.__decorate([
    property({ type: Object, computed: 'calcOnScreenTweet(_questionsVal, _sortMapVal)' })
], GDQInterviewQuestionElement.prototype, "onScreenTweet", void 0);
GDQInterviewQuestionElement = tslib_1.__decorate([
    customElement('gdq-interview-question')
], GDQInterviewQuestionElement);
export default GDQInterviewQuestionElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWludGVydmlldy1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1pbnRlcnZpZXctcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFPbEMsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQTRCLDBCQUEwQixDQUFDLENBQUM7QUFDMUYsTUFBTSxlQUFlLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBNkIsMkJBQTJCLENBQUMsQ0FBQztBQUNsRyxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUE2QiwyQkFBMkIsQ0FBQyxDQUFDO0FBR2xHLElBQXFCLDJCQUEyQixHQUFoRCxNQUFxQiwyQkFBNEIsU0FBUSxPQUFPLENBQUMsT0FBTztJQUR4RTs7UUFHQyxrQkFBYSxHQUFpQixJQUFJLENBQUM7UUFFbkMsY0FBUyxHQUFHLElBQUksWUFBWSxDQUFDLEVBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUd6RCxpQkFBWSxHQUFHLEtBQUssQ0FBQztJQXNEdEIsQ0FBQztJQXBEQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO1FBRUgsZUFBZSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDckMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ1o7aUJBQU07Z0JBQ04sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ1o7WUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDeEIsT0FBTztTQUNQO1FBQ0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUF3QixDQUFDO1FBRWhELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN4QixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxhQUFjLENBQUMsQ0FBQztRQUNsRCxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSTtRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLE9BQU87U0FDUDtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQXlCLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDckQsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLGFBQXlDLEVBQUUsV0FBd0M7UUFDcEcsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNuQyxPQUFPO1NBQ1A7UUFFRCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDakMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QsQ0FBQTtBQTNEQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLCtDQUErQyxFQUFDLENBQUM7a0VBQ2pEO0FBRmYsMkJBQTJCO0lBRC9DLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztHQUNuQiwyQkFBMkIsQ0E2RC9DO2VBN0RvQiwyQkFBMkIifQ==