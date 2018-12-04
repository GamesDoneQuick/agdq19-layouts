import * as tslib_1 from "tslib";
import { TweenLite, TimelineLite, Sine, Linear, Power2, Power4 } from 'gsap';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
const { customElement, property } = Polymer.decorators;
const RIGHT_TIME_PER_PIXEL = 0.00107;
const LEFT_TIME_PER_PIXEL = 0.00107;
const PROGRESS_FILL_OFFSET = 10;
const TAIL_CHEVRON_WIDTH = 6;
const DIRECTION_CHANGE_DELAY = 0.1167;
/**
 * @customElement
 * @polymer
 */
let GDQOmnibarChallengeElement = class GDQOmnibarChallengeElement extends Polymer.Element {
    ready() {
        super.ready();
        TweenLite.set(this.$.tailChevron, { opacity: 0 });
        TweenLite.set(this.$.body, { opacity: 0 });
        TweenLite.set(this.$.total, { opacity: 0 });
        TweenLite.set(this.$.goal, { opacity: 0 });
    }
    enter() {
        const progressFillElem = this.$.progressFill;
        const progressBlockElem = this.$.progressBlock;
        const goalBlockElem = this.$.goalBlock;
        const tailChevronElem = this.$.tailChevron;
        const totalElem = this.$.total;
        let progressPercentage = this.bid.rawTotal / this.bid.rawGoal;
        progressPercentage = Math.min(progressPercentage, 1); // Clamp to 1 max.
        progressPercentage = Math.max(progressPercentage, 0); // Clamp to 0 min.
        const revealTweenWidth = this.$.body.clientWidth - tailChevronElem.clientWidth + PROGRESS_FILL_OFFSET;
        this._revealTweenWidth = revealTweenWidth;
        const progressBlockWidth = progressBlockElem.clientWidth;
        const tl = new TimelineLite();
        let didFlickerGoalBlock = false;
        /* This mess of bullshit is how we get the animated fill to be clipped how we want. */
        const progressFillGroup = progressFillElem.svgDoc.group();
        const progressFillClip = progressBlockElem.arrowBlock.clone();
        progressFillClip.attr({ filter: 'none' });
        TweenLite.set(progressFillElem.arrowBlock.node, { x: '-100%' });
        progressFillElem.arrowBlock.before(progressFillClip);
        progressFillElem.arrowBlock.before(progressFillGroup);
        progressFillElem.arrowBlock.addTo(progressFillGroup);
        progressFillGroup.clipWith(progressFillClip);
        /* End mess of bullshit. */
        tl.set(tailChevronElem, { opacity: 1 });
        tl.call(() => {
            goalBlockElem.arrowBlock.attr({ 'fill-opacity': 0 });
        });
        tl.fromTo(tailChevronElem.chevron.node, 0.334, {
            drawSVG: '0%'
        }, {
            drawSVG: '100%',
            ease: Linear.easeNone
        });
        tl.from(tailChevronElem.chevron.node, 0.2167, {
            fill: 'transparent'
        });
        tl.addLabel('slideRight', `-=${1 / 60}`);
        tl.to(tailChevronElem, revealTweenWidth * RIGHT_TIME_PER_PIXEL, {
            x: revealTweenWidth,
            ease: Sine.easeIn
        }, 'slideRight');
        tl.set(this.$.body, {
            clipPath: `inset(0 -13px 0 ${revealTweenWidth}px)`,
            opacity: 1
        });
        tl.addLabel('reveal', `+=${DIRECTION_CHANGE_DELAY}`);
        tl.to(tailChevronElem, revealTweenWidth * LEFT_TIME_PER_PIXEL, {
            x: 0,
            ease: 'BidwarOptionReveal',
            onUpdate: () => {
                // Flicker the goal block shortly after it has been fully revealed.
                if (!didFlickerGoalBlock && tailChevronElem._gsTransform.x <= progressBlockWidth) {
                    didFlickerGoalBlock = true;
                    createMaybeRandomTween({
                        target: {},
                        propName: 'placeholder',
                        duration: 0.465,
                        delay: 0.1,
                        ease: Power4.easeIn,
                        start: { probability: 1, normalValue: 0 },
                        end: { probability: 0, normalValue: 1 },
                        onUpdate: randomValue => {
                            this.$.goal.style.opacity = String(randomValue);
                            this.$.goalBlock.arrowBlock.attr({ 'fill-opacity': randomValue });
                        }
                    });
                }
            }
        }, 'reveal');
        tl.to(this.$.body, revealTweenWidth * LEFT_TIME_PER_PIXEL, {
            clipPath: 'inset(0 -13px 0 0px)',
            ease: 'BidwarOptionReveal',
            onComplete: () => {
                TweenLite.to(this.$.body, 0.18, {
                    clipPath: 'inset(0 -13px)'
                });
            }
        }, 'reveal');
        tl.set(tailChevronElem, { '--atom-chevron-background': 'transparent' });
        const progressFillWidth = progressFillElem.arrowBlock.node.getBoundingClientRect().width - PROGRESS_FILL_OFFSET;
        const tailChevronEndX = progressFillWidth * progressPercentage;
        this._progressTweenDuration = progressFillWidth * progressPercentage * RIGHT_TIME_PER_PIXEL;
        tl.addLabel('fillProgress', '+=0');
        tl.to(tailChevronElem, this._progressTweenDuration, {
            x: tailChevronEndX,
            ease: Power2.easeInOut,
            callbackScope: this,
            onUpdate() {
                if (tailChevronElem._gsTransform.x >= PROGRESS_FILL_OFFSET) {
                    TweenLite.set(progressFillElem.arrowBlock.node, {
                        x: tailChevronElem._gsTransform.x + PROGRESS_FILL_OFFSET
                    });
                }
            }
        }, 'fillProgress');
        const totalTextCanFitOnLeft = (tailChevronEndX - 7) >= (totalElem.$.gradientFill.clientWidth + 24);
        if (totalTextCanFitOnLeft) {
            totalElem.align = 'right';
            TweenLite.set(totalElem, { left: tailChevronEndX - 6 });
        }
        else {
            TweenLite.set(totalElem, { left: tailChevronEndX + totalElem.clientWidth + 25 });
        }
        tl.add(createMaybeRandomTween({
            target: totalElem.style,
            propName: 'opacity',
            duration: 0.465,
            ease: Power4.easeIn,
            start: { probability: 1, normalValue: 0 },
            end: { probability: 0, normalValue: 1 }
        }));
        return tl;
    }
    exit() {
        const tl = new TimelineLite();
        // Things seem to ignore the clip path when they have a will-change style.
        tl.set(this.$.goal, { willChange: 'unset' });
        tl.set(this.$.total, { willChange: 'unset' });
        tl.addLabel('concealFill', '+=0.1'); // Give the will-change sets above time to apply.
        tl.to(this.$.tailChevron, this._progressTweenDuration, {
            x: TAIL_CHEVRON_WIDTH,
            ease: Power2.easeInOut,
            onUpdate: () => {
                if (this.$.tailChevron._gsTransform.x >= PROGRESS_FILL_OFFSET) {
                    TweenLite.set(this.$.progressFill.arrowBlock.node, {
                        x: this.$.tailChevron._gsTransform.x + PROGRESS_FILL_OFFSET
                    });
                }
            }
        }, 'concealFill');
        tl.set(this.$.tailChevron, { clearProps: '--atom-chevron-background' });
        tl.set(this.$.body, { clipPath: 'inset(0 -13px 0 0px)' });
        tl.addLabel('concealAll', `+=${DIRECTION_CHANGE_DELAY}`);
        const concealTweenWidth = this._revealTweenWidth + TAIL_CHEVRON_WIDTH;
        tl.to(this.$.tailChevron, concealTweenWidth * RIGHT_TIME_PER_PIXEL, {
            x: concealTweenWidth,
            ease: Sine.easeInOut
        }, 'concealAll');
        tl.to(this.$.body, concealTweenWidth * RIGHT_TIME_PER_PIXEL, {
            clipPath: `inset(0 -13px 0 ${concealTweenWidth}px)`,
            ease: Sine.easeInOut
        }, 'concealAll');
        tl.add(createMaybeRandomTween({
            target: this.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }));
        return tl;
    }
    render() {
        const progressFillElem = this.$.progressFill;
        const progressBlockElem = this.$.progressBlock;
        this.$.goalBlock.render(); // Must be rendered before #progressBlock.
        this.$.tailChevron.render();
        progressBlockElem.render({ useContentWidth: false });
        this.$.separatorChevron.render();
        progressFillElem.render({ useContentWidth: false }); // Must be rendered after #progressBlock.
        // Set the progressFill svgDoc to be the same size as the progressBlock svgDoc.
        progressFillElem.svgDoc.size(progressBlockElem.svgDoc.width(), progressBlockElem.svgDoc.height());
        // Copy the points from the progressBlock shape to the progressFill shape.
        // This ensures that these shapes are identical.
        progressFillElem.arrowBlock.attr({
            points: progressBlockElem.arrowBlock.attr('points')
        });
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQOmnibarChallengeElement.prototype, "bid", void 0);
GDQOmnibarChallengeElement = tslib_1.__decorate([
    customElement('gdq-omnibar-challenge')
], GDQOmnibarChallengeElement);
export default GDQOmnibarChallengeElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItY2hhbGxlbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLW9tbmliYXItY2hhbGxlbmdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDM0UsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFNM0UsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sb0JBQW9CLEdBQUcsT0FBTyxDQUFDO0FBQ3JDLE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDO0FBQ3BDLE1BQU0sb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0FBQ2hDLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLE1BQU0sc0JBQXNCLEdBQUcsTUFBTSxDQUFDO0FBRXRDOzs7R0FHRztBQUVILElBQXFCLDBCQUEwQixHQUEvQyxNQUFxQiwwQkFBMkIsU0FBUSxPQUFPLENBQUMsT0FBTztJQU90RSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBQ2hELFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUN6QyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7UUFDMUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJ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