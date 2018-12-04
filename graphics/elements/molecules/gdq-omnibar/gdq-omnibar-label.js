import * as tslib_1 from "tslib";
import { TimelineLite, Sine, SlowMo } from 'gsap';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
const { customElement } = Polymer.decorators;
const FLAG_ENTRANCE_DURATION = 0.334;
let GDQOmnibarLabelElement = class GDQOmnibarLabelElement extends Polymer.Element {
    ready() {
        super.ready();
        this.show = this.show.bind(this);
        this.change = this.change.bind(this);
        this.playFlag = this.playFlag.bind(this);
        this.hide = this.hide.bind(this);
    }
    /**
     * Creates an animation timeline for showing the label.
     * @param text - The text to show.
     * @param options - Options for this animation.
     * @returns An animation timeline.
     */
    show(text, { avatarIconName, flagHoldDuration, ringColor, flagColor }) {
        const showTL = new TimelineLite();
        showTL.set(this, {
            '--gdq-omnibar-label-ring-color': ringColor,
            '--gdq-omnibar-label-flag-color': flagColor
        });
        showTL.set(this.$['avatar-icon'], { icon: `omnibar:${avatarIconName}` });
        showTL.set(this.$['flag-text'], { textContent: text });
        showTL.add(createMaybeRandomTween({
            target: this.$.avatar.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 1 }
        }));
        showTL.add(this.playFlag(flagHoldDuration));
        showTL.call(() => {
            this._showing = true;
        });
        return showTL;
    }
    /**
     * Creates an animation timeline for changing the label.
     * This should only be called after `.show()`.
     * @param text - The text to show.
     * @param options - Options for this animation.
     * @returns An animation timeline.
     */
    change(text, { avatarIconName, flagHoldDuration, ringColor, flagColor }) {
        const changeTL = new TimelineLite();
        changeTL.add(this.playFlag(flagHoldDuration), 0);
        changeTL.to(this.$['avatar-icon'], 0.182, {
            opacity: 0,
            ease: Sine.easeIn,
            onComplete: () => {
                this.$['avatar-icon'].icon = `omnibar:${avatarIconName}`;
                this.$['flag-text'].textContent = text;
                createMaybeRandomTween({
                    target: this.$['avatar-icon'].style,
                    propName: 'opacity',
                    duration: 0.465,
                    start: { probability: 1, normalValue: 1 },
                    end: { probability: 0, normalValue: 1 }
                });
            }
        }, 0);
        /* This is a bandaid fix for issues caused by all the time-traveling and
         * pausing we do in gdq-omnibar.
         *
         * It appears that when calling .resume(), GSAP sometimes wants to restore its last
         * known snapshot of the world. This normally is fine and doesn't cause any issues.
         * However, the `MaybeRandom` tween we create above doesn't update GSAP's knowledge
         * of the world state, due to it doing all of its work in the `onUpdate` callback.
         *
         * The fix here is to call .set to forcibly update GSAP's snapshot of the world.
         * This .set is never visible in the actual graphic, because the MaybeRandom tween
         * immediately overwrites the opacity that we are setting. But, it's enough to update
         * GSAP's snapshot, which prevents the opacity from reverting back to zero when we
         * later pause, edit, and resume the timeline in gdq-omnibar.
         */
        changeTL.set(this.$['avatar-icon'], { opacity: 1 });
        changeTL.to(this.$['avatar-ring'], FLAG_ENTRANCE_DURATION, {
            rotation: '+=360',
            ease: Sine.easeInOut
        }, 0);
        changeTL.to(this, FLAG_ENTRANCE_DURATION, {
            '--gdq-omnibar-label-ring-color': ringColor,
            '--gdq-omnibar-label-flag-color': flagColor,
            ease: Sine.easeInOut
        }, 0);
        return changeTL;
    }
    /**
     * Shows, holds, and hides the label flag.
     * @param  holdDuration - How long, in seconds, to display the flag before hiding it.
     * @returns n animation timeline.
     */
    playFlag(holdDuration) {
        const playFlagTL = new TimelineLite();
        playFlagTL.addLabel('enter', '+=0');
        playFlagTL.addLabel('exit', `enter+=${holdDuration}`);
        // Enter.
        playFlagTL.to(this.$.avatar, 0.232, {
            x: 5,
            ease: Sine.easeInOut
        }, 'enter');
        playFlagTL.fromTo(this.$.flag, FLAG_ENTRANCE_DURATION, {
            clipPath: 'inset(0 100% 0 0)'
        }, {
            clipPath: 'inset(0 0% 0 0)',
            immediateRender: false,
            ease: Sine.easeInOut
        }, 'enter');
        // Exit.
        playFlagTL.fromTo(this.$.flag, FLAG_ENTRANCE_DURATION, {
            clipPath: 'inset(0 0% 0 0)'
        }, {
            clipPath: 'inset(0 100% 0 0)',
            immediateRender: false,
            ease: Sine.easeInOut
        }, 'exit');
        playFlagTL.to(this.$.avatar, 0.232, {
            x: 0,
            ease: Sine.easeInOut
        }, `exit+=${FLAG_ENTRANCE_DURATION - 0.232}`);
        return playFlagTL;
    }
    /**
     * Creates an animation timeline for hiding the label.
     * @returns  An animation timeline.
     */
    hide() {
        const hideTL = new TimelineLite();
        hideTL.to(this.$.avatar, 0.434, {
            opacity: 0,
            ease: SlowMo.ease.config(0.5, 0.7, false)
        });
        hideTL.call(() => {
            this._showing = false;
        });
        return hideTL;
    }
};
GDQOmnibarLabelElement = tslib_1.__decorate([
    customElement('gdq-omnibar-label')
], GDQOmnibarLabelElement);
export default GDQOmnibarLabelElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXItbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRTNFLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBZ0IzQyxNQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUdyQyxJQUFxQixzQkFBc0IsR0FBM0MsTUFBcUIsc0JBQXVCLFNBQVEsT0FBTyxDQUFDLE9BQU87SUFHbEUsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBSSxDQUFDLElBQVksRUFBRSxFQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUE0QjtRQUNyRyxNQUFNLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO1lBQ2hCLGdDQUFnQyxFQUFFLFNBQVM7WUFDM0MsZ0NBQWdDLEVBQUUsU0FBUztTQUMzQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxjQUFjLEVBQUUsRUFBQyxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7UUFFckQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztZQUNqQyxNQUFNLEVBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUF5QixDQUFDLEtBQUs7WUFDL0MsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsRUFBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxDQUFDLEVBQUM7WUFDdkMsR0FBRyxFQUFFLEVBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFDO1NBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBRUosTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sTUFBTSxDQUFDO0lBQ2YsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxJQUFZLEVBQUUsRUFBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBNEI7UUFDdkcsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVwQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVqRCxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFO1lBQ3pDLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ2pCLFVBQVUsRUFBRSxHQUFHLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQXFCLENBQUMsSUFBSSxHQUFHLFdBQVcsY0FBYyxFQUFFLENBQUM7Z0JBQzdFLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFvQixDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQzNELHNCQUFzQixDQUFDO29CQUN0QixNQUFNLEVBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQXFCLENBQUMsS0FBSztvQkFDeEQsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFFBQVEsRUFBRSxLQUFLO29CQUNmLEtBQUssRUFBRSxFQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBQztvQkFDdkMsR0FBRyxFQUFFLEVBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxFQUFDO2lCQUNyQyxDQUFDLENBQUM7WUFDSixDQUFDO1NBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVOOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSCxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsc0JBQXNCLEVBQUU7WUFDMUQsUUFBUSxFQUFFLE9BQU87WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUN6QyxnQ0FBZ0MsRUFBRSxTQUFTO1lBQzNDLGdDQUFnQyxFQUFFLFNBQVM7WUFDM0MsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFTixPQUFPLFFBQVEsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxZQUFvQjtRQUM1QixNQUFNLFVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXRDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFVBQVUsWUFBWSxFQUFFLENBQUMsQ0FBQztRQUV0RCxTQUFTO1FBQ1QsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDbkMsQ0FBQyxFQUFFLENBQUM7WUFDSixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDcEIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNaLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDdEQsUUFBUSxFQUFFLG1CQUFtQjtTQUM3QixFQUFFO1lBQ0YsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixlQUFlLEVBQUUsS0FBSztZQUN0QixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVM7U0FDcEIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVaLFFBQVE7UUFDUixVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ3RELFFBQVEsRUFBRSxpQkFBaUI7U0FDM0IsRUFBRTtZQUNGLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsZUFBZSxFQUFFLEtBQUs7WUFDdEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQ3BCLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDWCxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUNuQyxDQUFDLEVBQUUsQ0FBQztZQUNKLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUztTQUNwQixFQUFFLFNBQVMsc0JBQXNCLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUU5QyxPQUFPLFVBQVUsQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSTtRQUNILE1BQU0sTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFbEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUU7WUFDL0IsT0FBTyxFQUFFLENBQUM7WUFDVixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FDekMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNmLENBQUM7Q0FDRCxDQUFBO0FBaEtvQixzQkFBc0I7SUFEMUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDO0dBQ2Qsc0JBQXNCLENBZ0sxQztlQWhLb0Isc0JBQXNCIn0=