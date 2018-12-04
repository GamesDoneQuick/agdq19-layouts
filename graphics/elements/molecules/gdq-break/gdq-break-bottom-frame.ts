import {TweenLite, Power1, TimelineMax} from 'gsap';
import {CurrentHost} from '../../../../src/types/schemas/currentHost';
import {NowPlaying} from '../../../../src/types/schemas/nowPlaying';

const {customElement} = Polymer.decorators;

const FADE_DURATION = 0.334;
const FADE_OUT_EASE = Power1.easeIn;
const FADE_IN_EASE = Power1.easeOut;

const currentHost = nodecg.Replicant<CurrentHost>('currentHost');
const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying');

const LOGO_FADE_INTERVAL = 20;
const LOGO_FADE_DURATION = 1;
const LOGO_FADE_OUT_EASE = Power1.easeIn;
const LOGO_FADE_IN_EASE = Power1.easeOut;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-bottom-frame')
export default class GDQBreakBottomFrameElement extends Polymer.Element {
	ready() {
		super.ready();

		currentHost.on('change', newVal => {
			this._changeText(this.$['host-text'] as HTMLElement, newVal);
		});

		nowPlaying.on('change', newVal => {
			this._changeText(this.$['music-text'] as HTMLElement, `${newVal.game || '?'} - ${newVal.title || '?'}`);
		});

		// Logo anim
		const logoTL = new TimelineMax({repeat: -1});

		logoTL.to(this.$.gdqLogo, LOGO_FADE_DURATION, {
			opacity: 1,
			ease: LOGO_FADE_IN_EASE
		});

		logoTL.to(this.$.gdqLogo, LOGO_FADE_DURATION, {
			opacity: 0,
			ease: LOGO_FADE_OUT_EASE
		}, `+=${LOGO_FADE_INTERVAL}`);

		logoTL.to(this.$.charityLogo, LOGO_FADE_DURATION, {
			opacity: 1,
			ease: LOGO_FADE_IN_EASE
		});

		logoTL.to(this.$.charityLogo, LOGO_FADE_DURATION, {
			opacity: 0,
			ease: LOGO_FADE_OUT_EASE
		}, `+=${LOGO_FADE_INTERVAL}`);
	}

	_changeText(element: HTMLElement, newText: string) {
		TweenLite.to(element, FADE_DURATION, {
			opacity: 0,
			ease: FADE_OUT_EASE,
			callbackScope: this,
			onComplete() {
				(element as any).text = newText;
				TweenLite.to(element, FADE_DURATION, {
					opacity: 1,
					ease: FADE_IN_EASE,
					delay: 0.05
				});
			}
		});
	}
}
