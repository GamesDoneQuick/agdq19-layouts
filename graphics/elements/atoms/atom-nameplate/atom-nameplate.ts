import {Power1, TimelineMax, TweenLite} from 'gsap';

const {customElement, property} = Polymer.decorators;
const NAME_FADE_IN_EASE = Power1.easeOut;
const NAME_FADE_OUT_EASE = Power1.easeIn;

@customElement('atom-nameplate')
export default class AtomNameplateElement extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true})
	noLeftCap = false;

	@property({type: Boolean, reflectToAttribute: true})
	noRightCap = false;

	@property({type: String})
	name = '';

	@property({type: String})
	twitch = '';

	/**
	 * How long, in seconds, to fade names in/out.
	 *
	 * For example, a value of 0.33 means that the fade out will take 0.33
	 * seconds, and then the subsequent fade in will take another 0.33 seconds.
	 */
	@property({type: Number})
	nameFadeDuration = 0.33;

	@property({type: Object})
	private readonly _nameTL = new TimelineMax({repeat: -1, paused: true});

	connectedCallback() {
		super.connectedCallback();
		Polymer.RenderStatus.beforeNextRender(this, () => {
			// Workaround for: https://bugs.chromium.org/p/chromium/issues/detail?id=844880
			this.shadowRoot!.querySelectorAll('sc-fitted-text').forEach((node: Polymer.Element) => {
				(node.$.fittedContent as any).style.webkitBackgroundClip = 'text';
			});

			// Create looping anim for main nameplate.
			this._nameTL.to(this.$.names, this.nameFadeDuration, {
				onStart: () => {
					this.$.namesTwitch.classList.remove('hidden');
					this.$.namesName.classList.add('hidden');
				},
				opacity: 1,
				ease: NAME_FADE_IN_EASE
			});
			this._nameTL.to(this.$.names, this.nameFadeDuration, {
				opacity: 0,
				ease: NAME_FADE_OUT_EASE
			}, '+=10');
			this._nameTL.to(this.$.names, this.nameFadeDuration, {
				onStart: () => {
					this.$.namesTwitch.classList.add('hidden');
					this.$.namesName.classList.remove('hidden');
				},
				opacity: 1,
				ease: NAME_FADE_IN_EASE
			});
			this._nameTL.to(this.$.names, this.nameFadeDuration, {
				opacity: 0,
				ease: NAME_FADE_OUT_EASE
			}, '+=80');
		});
	}

	updateName({alias = '?', twitchAlias = '', rotate = true} = {}) {
		const doTheDangThing = () => {
			this.name = alias;
			this.twitch = twitchAlias;

			this.$.namesName.classList.add('hidden');
			this.$.namesTwitch.classList.remove('hidden');

			if (!this.twitch) {
				this._nameTL.pause();
				this.$.namesName.classList.remove('hidden');
				this.$.namesTwitch.classList.add('hidden');
				TweenLite.to(this.$.names, this.nameFadeDuration, {opacity: 1, ease: NAME_FADE_IN_EASE});
			} else if (rotate) {
				this._nameTL.restart();
			} else {
				this._nameTL.pause();
				TweenLite.to(this.$.names, this.nameFadeDuration, {opacity: 1, ease: NAME_FADE_IN_EASE});
			}

			Polymer.RenderStatus.afterNextRender(this, this.fitName);
		};

		if ((window as any).__SCREENSHOT_TESTING__) {
			doTheDangThing();
			return;
		}

		TweenLite.to(this.$.names, this.nameFadeDuration, {
			opacity: 0,
			ease: NAME_FADE_OUT_EASE,
			callbackScope: this,
			onComplete: doTheDangThing
		});
	}

	fitName() {
		Polymer.flush();
		const MAX_NAME_WIDTH = this.$.names.clientWidth - 32;
		const MAX_TWITCH_WIDTH = MAX_NAME_WIDTH - 20;
		const twitchText = this.$.namesTwitch.querySelector('sc-fitted-text');
		(this.$.namesName as any).maxWidth = MAX_NAME_WIDTH;
		(twitchText as any).maxWidth = MAX_TWITCH_WIDTH;
	}
}
