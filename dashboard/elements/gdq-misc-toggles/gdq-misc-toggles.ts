const {customElement} = Polymer.decorators;
const recordTrackerEnabled = nodecg.Replicant<boolean>('recordTrackerEnabled');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-misc-toggles')
export default class GDQMiscTogglesElement extends Polymer.Element {
	ready() {
		super.ready();
		Polymer.RenderStatus.beforeNextRender(this, () => {
			recordTrackerEnabled.on('change', newVal => {
				if (newVal) {
					(this.$.milestoneToggle as PaperToggleButtonElement).checked = newVal;
				}
			});
		});
	}

	_handleMiletoneTrackerToggleChange(e: Event) {
		if (!e.target) {
			return;
		}
		recordTrackerEnabled.value = Boolean((e.target as PaperToggleButtonElement).checked);
	}
}
