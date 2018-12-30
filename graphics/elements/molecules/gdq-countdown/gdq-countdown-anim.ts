const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-countdown-anim')
export default class GDQCountdownAnim extends Polymer.Element {
	@property({type: Number, notify: true})
	active: number;

	ready() {
		super.ready();
		this.activeLoop();
	}

	activeLoop() {
		this.active = Math.floor(Math.random() * 8) + 1;
		setTimeout(this.activeLoop.bind(this), 3000);
	}

	// track and determine which square is 'active'
	// every few seconds (within a random range), the active square changes
	// this change should result in an adjacent square being picked
}
