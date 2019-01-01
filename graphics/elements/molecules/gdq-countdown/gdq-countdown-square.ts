import {Countdown} from '../../../../src/types/schemas/countdown';
import {TimelineLite} from 'gsap';

const {customElement, property} = Polymer.decorators;

const countdownTime = nodecg.Replicant<Countdown>('countdown');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-countdown-square')
export default class GDQCountdownSquare extends Polymer.Element {
	@property({type: String})
	cast: String;

	@property({type: String})
	caption: String;

	@property({type: Number})
	index: number;

	@property({type: Boolean})
	revealed: Boolean;

	@property({type: Number})
	active: number;

	@property({type: Object})
	private readonly squareTimeline: TimelineLite = new TimelineLite({autoRemoveChildren: true});

	ready() {
		super.ready();
		this.revealed = false;
		const tl = this.squareTimeline;
		countdownTime.on('change', newVal => {
			if (newVal.raw <= 61000 && this.revealed === false && this.index === 5) {
				nodecg.playSound('wily');
				tl.add(this.centerFlash());
				this.caption = 'Mike Uyama';
				this.revealed = true;
			} else if (newVal.raw > 61000 && this.index === 5) {
				tl.set(this.$['main-face'], {opacity: 1});
				this.caption = 'GDQ';
				this.revealed = false;
			}
		});
	}

	_computeFrame(active: number) {
		if (active === this.index) {
			return 'frame frame_blink';
		}

		return 'frame';
	}

	centerFlash() {
		const tl = new TimelineLite();
		tl.addLabel('start', 0.03);

		tl.to(this.$.white, 0.75, {opacity: 1}, 'start');
		tl.to(this.$['main-face'], 0.03, {opacity: 0}, 'start+=0.75');
		tl.to(this.$.white, 0.75, {opacity: 0}, 'start+=0.8');
		return tl;
	}

	// am I active? if so, blink the frame on and off
	// if not, don't blink

	// am I Uyama?
	// if so, how much time is left?
	// if less than five minutes, animate a flash and turn into Uyama
	// animate Uyama face
}
