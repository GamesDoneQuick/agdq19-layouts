import {NextRun} from '../../../src/types/schemas/nextRun';
import {ScheduleItem} from '../../../src/types/Schedule';
import {Run} from '../../../src/types/Run';
import GDQScheduleRuninfoElement from './gdq-schedule-runinfo';
import GDQRunEditorElement from '../gdq-run-editor/gdq-run-editor';
import {CurrentRun} from '../../../src/types/schemas/currentRun';

const {customElement, property} = Polymer.decorators;
const canSeekSchedule = nodecg.Replicant<boolean>('canSeekSchedule');
const currentRun = nodecg.Replicant<CurrentRun>('currentRun');
const nextRun = nodecg.Replicant<NextRun>('nextRun');
const schedule = nodecg.Replicant<ScheduleItem[]>('schedule');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-schedule')
export default class GDQScheduleElement extends Polymer.Element {
	@property({type: Boolean})
	_pendingSetCurrentRunByOrderMessageResponse: boolean;

	@property({type: Boolean})
	_pendingNextRunMessageResponse: boolean;

	@property({type: Boolean})
	_pendingPreviousRunMessageResponse: boolean;

	connectedCallback() {
		super.connectedCallback();
		Polymer.RenderStatus.beforeNextRender(this, () => {
			canSeekSchedule.on('change', () => {
				this._checkButtons();
			});

			schedule.on('change', newVal => {
				if (!newVal) {
					return;
				}

				// We don't have typings for vaadin-combo-box@^2.0.0
				(this.$.typeahead as any).items = newVal
					.filter(item => item.type === 'run')
					.map(speedrun => (speedrun as Run).name);
				this._checkButtons();
			});

			nextRun.on('change', newVal => {
				if (!newVal) {
					return;
				}

				// Disable "next" button if at end of schedule
				const nextRunEl = this.$.nextRun as GDQScheduleRuninfoElement;
				if (newVal) {
					nextRunEl.setRun(newVal as Run);
					this.$.editNext.removeAttribute('disabled');
				} else {
					nextRunEl.setRun({} as Run);
					this.$.editNext.setAttribute('disabled', 'true');
				}

				this._checkButtons();
			});

			currentRun.on('change', newVal => {
				if (!newVal) {
					return;
				}

				const currentRunEl = this.$.currentRun as GDQScheduleRuninfoElement;
				currentRunEl.setRun(newVal as Run);
				this._checkButtons();
			});
		});
	}

	/**
	 * Takes the current value of the typeahead and loads that as the current speedrun.
	 * Shows a helpful error toast if no matching speedrun could be found.
	 */
	takeTypeahead() {
		// We don't have typings for vaadin-combo-box@^2.0.0
		const typeahead = this.$.typeahead as any;
		if (!typeahead.value || !schedule.value) {
			return;
		}

		const nameToFind = typeahead.value;

		// Find the run based on the name.
		const matched = schedule.value.some(run => {
			if (run.type !== 'run') {
				return false;
			}

			if (run.name.toLowerCase() === nameToFind.toLowerCase()) {
				this._pendingSetCurrentRunByOrderMessageResponse = true;
				this._checkButtons();
				nodecg.sendMessage('setCurrentRunByOrder', run.order, () => {
					this._pendingSetCurrentRunByOrderMessageResponse = false;
					typeahead.value = '';
					typeahead._suggestions = [];
					this._checkButtons();
				});
				return true;
			}

			return false;
		});

		if (!matched) {
			(this.$.toast as PaperToastElement).show(`Could not find speedrun with name "${nameToFind}".`);
		}
	}

	fetchLatestSchedule() {
		const toast = this.$.toast as PaperToastElement;
		this.$.fetchLatestSchedule.setAttribute('disabled', 'true');
		nodecg.sendMessage('updateSchedule', (err, updated) => {
			this.$.fetchLatestSchedule.removeAttribute('disabled');

			if (err) {
				nodecg.log.warn(err.message);
				toast.show('Error updating schedule. Check console.');
				return;
			}

			if (updated) {
				nodecg.log.info('Schedule successfully updated');
				toast.show('Successfully updated schedule.');
			} else {
				nodecg.log.info('Schedule unchanged, not updated');
				toast.show('Schedule unchanged, not updated.');
			}
		});
	}

	next() {
		this._pendingNextRunMessageResponse = true;
		this._checkButtons();
		nodecg.sendMessage('nextRun', () => {
			this._pendingNextRunMessageResponse = false;
			this._checkButtons();
		});
	}

	previous() {
		this._pendingPreviousRunMessageResponse = true;
		this._checkButtons();
		nodecg.sendMessage('previousRun', () => {
			this._pendingPreviousRunMessageResponse = false;
			this._checkButtons();
		});
	}

	editCurrent() {
		if (!currentRun.value) {
			return;
		}

		const editor = this.$.editor as GDQRunEditorElement;
		const editDialog = this.$.editDialog as PaperDialogElement;
		editor.title = `Edit Current Run (#${currentRun.value.order})`;
		editor.loadRun(currentRun.value as Run);
		editDialog.open();
	}

	editNext() {
		if (!nextRun.value) {
			return;
		}

		const editor = this.$.editor as GDQRunEditorElement;
		const editDialog = this.$.editDialog as PaperDialogElement;
		editor.title = `Edit Next Run (#${nextRun.value.order})`;
		editor.loadRun(nextRun.value as Run);
		editDialog.open();
	}

	_checkButtons() {
		if (canSeekSchedule.status !== 'declared' ||
			schedule.status !== 'declared' ||
			currentRun.status !== 'declared' ||
			nextRun.status !== 'declared' ||
			!schedule.value) {
			return;
		}

		let shouldDisableNext = false;
		let shouldDisablePrev = false;
		let shouldDisableTake = false;
		if (!canSeekSchedule.value ||
			this._pendingSetCurrentRunByOrderMessageResponse ||
			this._pendingPreviousRunMessageResponse ||
			this._pendingNextRunMessageResponse) {
			shouldDisableNext = true;
			shouldDisablePrev = true;
			shouldDisableTake = true;
		}

		// Disable nextRun button if there is no next run.
		if (!nextRun.value) {
			shouldDisableNext = true;
		}

		// Disable prevRun button if there is no prev run, or if there is no currentRun.
		if (currentRun.value) {
			// If there is any run in the schedule with an earlier order than currentRun,
			// then there must be a prevRun.
			const prevRunExists = schedule.value.find(run => {
				if (run.type !== 'run' || !currentRun.value) {
					return false;
				}
				return run.order < currentRun.value.order;
			});
			if (!prevRunExists) {
				shouldDisablePrev = true;
			}
		} else {
			shouldDisablePrev = true;
		}

		// Disable take button if there's no takeTypeahead value.
		if (!(this.$.typeahead as any).value) {
			shouldDisableTake = true;
		}

		if (shouldDisableNext) {
			this.$.next.setAttribute('disabled', 'true');
		} else {
			this.$.next.removeAttribute('disabled');
		}

		if (shouldDisablePrev) {
			this.$.previous.setAttribute('disabled', 'true');
		} else {
			this.$.previous.removeAttribute('disabled');
		}

		if (shouldDisableTake) {
			this.$.take.setAttribute('disabled', 'true');
		} else {
			this.$.take.removeAttribute('disabled');
		}
	}

	_typeaheadKeyup(e: KeyboardEvent) {
		if (e.key === 'Enter' && (this.$.typeahead as any).inputValue) {
			this.takeTypeahead();
		}
	}
}
