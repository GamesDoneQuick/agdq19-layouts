import {TimelineLite, TweenLite, Power3, Sine} from 'gsap';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-runner-nameplate-result')
export default class GDQNameplateResultElement extends Polymer.Element {
	@property({type: Boolean, observer: '_showingChanged'})
	showing: boolean;

	@property({type: String, reflectToAttribute: true})
	side: string;

	@property({type: Number})
	place: number;

	@property({type: String})
	time: string;

	@property({type: Boolean, reflectToAttribute: true})
	firstPlace: boolean;

	@property({type: Boolean, reflectToAttribute: true})
	lastPlace: boolean;

	@property({type: Boolean, reflectToAttribute: true})
	forfeit: boolean;

	private readonly _tl = new TimelineLite({autoRemoveChildren: true});

	ready() {
		super.ready();
		TweenLite.set(this, {x: 0});
		TweenLite.set(this.$.cover, {scaleX: 1});
		TweenLite.set(this.$.place, {scaleX: 0});
	}

	show() {
		const anim = new TimelineLite();
		anim.to(this, 0.5, {
			x: this.side === 'left' ? '-100%' : '100%',
			ease: Power3.easeIn
		});

		anim.to(this.$.cover, 0.5, {
			scaleX: 0,
			ease: Power3.easeOut
		});

		anim.to(this.$.place, 0.182, {
			scaleX: 1,
			ease: Sine.easeOut
		});

		return anim;
	}

	hide() {
		const anim = new TimelineLite();
		anim.to(this.$.place, 0.182, {
			scaleX: 0,
			ease: Sine.easeIn
		});

		anim.to(this.$.cover, 0.5, {
			scaleX: 1,
			ease: Power3.easeIn
		});

		anim.to(this, 0.5, {
			x: '0%',
			ease: Power3.easeOut
		});

		return anim;
	}

	_showingChanged(newVal: boolean) {
		const anim = newVal ? this.show() : this.hide();
		this._tl.add(anim);
	}

	_calcPlaceText(place: number, forfeit: boolean) {
		return forfeit ? 'X' : place;
	}
}
