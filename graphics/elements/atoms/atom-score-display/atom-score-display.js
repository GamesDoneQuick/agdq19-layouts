import * as tslib_1 from "tslib";
import { Power1, TweenLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const SCORE_FADE_IN_EASE = Power1.easeOut;
const SCORE_FADE_OUT_EASE = Power1.easeIn;
const scoresRep = nodecg.Replicant('scores');
let AtomScoreDisplayElement = class AtomScoreDisplayElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        /**
         * How long, in seconds, to fade scores in/out.
         *
         * For example, a value of 0.33 means that the fade out will take 0.33
         * seconds, and then the subsequent fade in will take another 0.33 seconds.
         */
        this.scoreFadeDuration = 0.33;
    }
    ready() {
        super.ready();
        // Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880
        this.shadowRoot.querySelectorAll('sc-fitted-text').forEach((node) => {
            node.$.fittedContent.style.webkitBackgroundClip = 'text';
        });
        Polymer.RenderStatus.afterNextRender(this, () => {
            scoresRep.on('change', this.updateScore.bind(this));
        });
    }
    updateScore(newScores) {
        if (!newScores || typeof newScores[this.teamIndex] !== 'number') {
            return;
        }
        if (newScores[this.teamIndex] === this.score) {
            return;
        }
        TweenLite.to(this.$.scoreText, this.scoreFadeDuration, {
            opacity: 0,
            ease: SCORE_FADE_OUT_EASE,
            callbackScope: this,
            onComplete() {
                this.score = newScores[this.teamIndex];
                TweenLite.to(this.$.scoreText, this.scoreFadeDuration, { opacity: 1, ease: SCORE_FADE_IN_EASE });
            }
        });
    }
};
tslib_1.__decorate([
    property({ type: Number })
], AtomScoreDisplayElement.prototype, "score", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomScoreDisplayElement.prototype, "teamIndex", void 0);
tslib_1.__decorate([
    property({ type: Number })
], AtomScoreDisplayElement.prototype, "scoreFadeDuration", void 0);
AtomScoreDisplayElement = tslib_1.__decorate([
    customElement('atom-score-display')
], AtomScoreDisplayElement);
export default AtomScoreDisplayElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1zY29yZS1kaXNwbGF5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRvbS1zY29yZS1kaXNwbGF5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFFLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUd2QyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQzFDLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMxQyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFTLFFBQVEsQ0FBQyxDQUFDO0FBR3JELElBQXFCLHVCQUF1QixHQUE1QyxNQUFxQix1QkFBd0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQURwRTs7UUFRQzs7Ozs7V0FLRztRQUVILHNCQUFpQixHQUFHLElBQUksQ0FBQztJQWtDMUIsQ0FBQztJQWhDQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWQsK0VBQStFO1FBQy9FLElBQUksQ0FBQyxVQUFXLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFxQixFQUFFLEVBQUU7WUFDcEYsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFxQixDQUFDLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxNQUFNLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQy9DLFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVyxDQUFDLFNBQWtCO1FBQzdCLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUNoRSxPQUFPO1NBQ1A7UUFFRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRTtZQUM3QyxPQUFPO1NBQ1A7UUFFRCxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0RCxPQUFPLEVBQUUsQ0FBQztZQUNWLElBQUksRUFBRSxtQkFBbUI7WUFDekIsYUFBYSxFQUFFLElBQUk7WUFDbkIsVUFBVTtnQkFDVCxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1lBQ2hHLENBQUM7U0FDRCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQ0QsQ0FBQTtBQTlDQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztzREFDWDtBQUdkO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDOzBEQUNQO0FBU2xCO0lBREMsUUFBUSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQyxDQUFDO2tFQUNBO0FBZEwsdUJBQXVCO0lBRDNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztHQUNmLHVCQUF1QixDQWdEM0M7ZUFoRG9CLHVCQUF1QiJ9