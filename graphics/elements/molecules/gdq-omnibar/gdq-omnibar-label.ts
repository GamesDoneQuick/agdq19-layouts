import {TimelineLite, Sine, SlowMo} from 'gsap';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';

const {customElement} = Polymer.decorators;

/**
 * The options argument for the `show` and `change` methods in gdq-omnibar-label.
 * avatarIconName - The name of the icon to use for the avatar. Must be present in gdq-omnibar-icons.
 * flagHoldDuration - How long, in seconds, to display the flag before hiding it.
 * ringColor - The color to apply to the ring around the label icon.
 * flagColor - The color to apply to the expanded rect that sometimes shows around the label.
 */
export interface LabelShowAndChangeOptions {
	avatarIconName: string;
	flagHoldDuration: number;
	ringColor: string;
	flagColor: string;
}

const FLAG_ENTRANCE_DURATION = 0.334;

@customElement('gdq-omnibar-label')
export default class GDQOmnibarLabelElement extends Polymer.Element {
	_showing: boolean;

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
	show(text: string, {avatarIconName, flagHoldDuration, ringColor, flagColor}: LabelShowAndChangeOptions) {
		const showTL = new TimelineLite();

		showTL.set(this, {
			'--gdq-omnibar-label-ring-color': ringColor,
			'--gdq-omnibar-label-flag-color': flagColor
		});

		showTL.set(this.$['avatar-icon'], {icon: `omnibar:${avatarIconName}`});
		showTL.set(this.$['flag-text'], {textContent: text});

		showTL.add(createMaybeRandomTween({
			target: (this.$.avatar as HTMLDivElement).style,
			propName: 'opacity',
			duration: 0.465,
			start: {probability: 1, normalValue: 1},
			end: {probability: 0, normalValue: 1}
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
	change(text: string, {avatarIconName, flagHoldDuration, ringColor, flagColor}: LabelShowAndChangeOptions) {
		const changeTL = new TimelineLite();

		changeTL.add(this.playFlag(flagHoldDuration), 0);

		changeTL.to(this.$['avatar-icon'], 0.182, {
			opacity: 0,
			ease: Sine.easeIn,
			onComplete: () => {
				(this.$['avatar-icon'] as IronIconElement).icon = `omnibar:${avatarIconName}`;
				(this.$['flag-text'] as HTMLDivElement).textContent = text;
				createMaybeRandomTween({
					target: (this.$['avatar-icon'] as IronIconElement).style,
					propName: 'opacity',
					duration: 0.465,
					start: {probability: 1, normalValue: 1},
					end: {probability: 0, normalValue: 1}
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
		changeTL.set(this.$['avatar-icon'], {opacity: 1});

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
	playFlag(holdDuration: number) {
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
}
