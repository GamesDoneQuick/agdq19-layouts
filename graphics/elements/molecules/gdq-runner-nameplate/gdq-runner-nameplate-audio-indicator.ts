import {TweenLite, Power3} from 'gsap';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-runner-nameplate-audio-indicator')
export default class GDQNameplateAudioIndicatorElement extends Polymer.Element {
	@property({type: Boolean, observer: '_showingChanged'})
	showing: boolean;

	@property({type: String, reflectToAttribute: true})
	vertPos: 'top' | 'bottom' = 'top';

	@property({type: String, reflectToAttribute: true})
	horizPos: 'left' | 'right' | 'center' = 'left';

	@property({type: Number})
	animationDuration = 0.25;

	@property({type: Array})
	private readonly _maskProxy = [-10, -10, 0];

	ready() {
		super.ready();
		(this.$.body as any).style.webkitMaskImage = `linear-gradient(
			to right,
			rgba(0,0,0,1) ${this._maskProxy[0]}%,
			rgba(0,0,0,1) ${this._maskProxy[1]}%,
			rgba(0,0,0,0) ${this._maskProxy[2]}%
		)`;
	}

	show() {
		return this._animateMask(100, 100, 110);
	}

	hide() {
		return this._animateMask(-10, -10, 0);
	}

	_animateMask(stopOne: number, stopTwo: number, stopThree: number) {
		return TweenLite.to(this._maskProxy, this.animationDuration, {
			0: stopOne,
			1: stopTwo,
			2: stopThree,
			ease: Power3.easeOut,
			callbackScope: this,
			onUpdate() {
				this.$.body.style.webkitMaskImage = `linear-gradient(
					to right,
					rgba(0,0,0,1) ${this._maskProxy[0]}%,
					rgba(0,0,0,1) ${this._maskProxy[1]}%,
					rgba(0,0,0,0) ${this._maskProxy[2]}%
				)`;
			}
		});
	}

	_showingChanged(newVal: boolean) {
		if (newVal) {
			return this.show();
		}

		return this.hide();
	}
}
