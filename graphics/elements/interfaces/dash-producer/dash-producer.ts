const {customElement, property} = Polymer.decorators;

@customElement('dash-producer')
export default class DashProducerElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: String})
	currentTime: string;

	@property({type: Number})
	selectedContentTab = 0;

	@property({type: Number})
	selectedBidsAndPrizesTab = 0;

	@property({type: String})
	volunteerScheduleURL = nodecg.bundleConfig.volunteerScheduleURL;

	@property({type: String})
	volunteerEvaluationsURL = nodecg.bundleConfig.volunteerEvaluationsURL;

	@property({type: String})
	techNotesURL = nodecg.bundleConfig.techNotesURL;

	connectedCallback() {
		super.connectedCallback();
		this.updateCurrentTime = this.updateCurrentTime.bind(this);
		this.updateCurrentTime();
		setInterval(this.updateCurrentTime, 1000);
	}

	updateCurrentTime() {
		const date = new Date();
		this.currentTime = date.toLocaleTimeString('en-US', {hour12: true});
	}
}
