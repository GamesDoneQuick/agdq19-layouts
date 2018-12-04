import {Sine, TimelineLite} from 'gsap';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-list-item')
export default class GDQOmnibarListItemElement extends Polymer.Element {
	@property({type: String})
	firstLine: string;

	@property({type: String})
	secondLine: string;

	_$borderBodies: NodeListOf<HTMLDivElement>;
	_$leftBorderCaps: NodeListOf<HTMLDivElement>;
	_$rightBorderCaps: NodeListOf<HTMLDivElement>;

	ready() {
		super.ready();
		this._$borderBodies = this.shadowRoot!.querySelectorAll('.border-body');
		this._$leftBorderCaps = this.shadowRoot!.querySelectorAll('.border-cap:first-child');
		this._$rightBorderCaps = this.shadowRoot!.querySelectorAll('.border-cap:last-child');
	}

	enter() {
		const enterTL = new TimelineLite();

		enterTL.fromTo(this, 0.234, {
			x: 20,
			opacity: 0
		}, {
			x: 0,
			opacity: 1,
			ease: Sine.easeOut
		});

		return enterTL;
	}

	exit() {
		const exitTL = new TimelineLite();

		exitTL.to(this._$borderBodies, 0.465, {
			scaleX: 0,
			ease: Sine.easeInOut
		}, 0);

		exitTL.to(this._$rightBorderCaps, 0.465, {
			x: -this.clientWidth + 2,
			ease: Sine.easeInOut
		}, 0);

		exitTL.add(createMaybeRandomTween({
			target: (this.$.text as HTMLDivElement).style,
			propName: 'opacity',
			duration: 0.465,
			start: {probability: 1, normalValue: 0},
			end: {probability: 0, normalValue: 0}
		}), 0);

		exitTL.to([this._$leftBorderCaps, this._$rightBorderCaps], 0.165, {
			scaleX: 0,
			ease: Sine.easeInOut
		});

		return exitTL;
	}
}
