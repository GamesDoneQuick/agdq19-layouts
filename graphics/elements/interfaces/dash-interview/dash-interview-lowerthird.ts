// Packages
import {TweenLite} from 'gsap';

import {CurrentIntermission} from '../../../../src/types/schemas/currentIntermission';
import {Interview, Run, Runner, ScheduleItem} from '../../../../src/types';
import {InterviewNames} from '../../../../src/types/schemas/interview_names';
import DashLowerthirdNameInputElement from './dash-lowerthird-name-input';
import GDQLowerthirdElement from '../../molecules/gdq-lowerthird/gdq-lowerthird';
import DashInterviewLowerthirdRefillOptionElement from './dash-interview-lowerthird-refill-option';

const {customElement, property} = Polymer.decorators;
const currentIntermissionRep = nodecg.Replicant<CurrentIntermission>('currentIntermission');
const currentRunRep = nodecg.Replicant<Run>('currentRun');
const interviewNamesRep = nodecg.Replicant<InterviewNames>('interview_names');
const lowerthirdShowingRep = nodecg.Replicant<boolean>('interview:lowerthirdShowing');
const runnersRep = nodecg.Replicant<Runner[]>('runners');
const scheduleRep = nodecg.Replicant<ScheduleItem[]>('schedule');

/**
 * @customElement
 * @polymer
 */
@customElement('dash-interview-lowerthird')
export default class DashInterviewLowerthirdElement extends Polymer.Element {
	@property({type: Boolean, notify: true})
	lowerthirdShowing = false;

	@property({type: Boolean})
	questionShowing: boolean;

	@property({type: Array})
	_typeaheadCandidates: string[] = [];

	private _updatePreviewDebouncer: Polymer.Debouncer;

	connectedCallback() {
		super.connectedCallback();
		Polymer.RenderStatus.beforeNextRender(this, () => {
			runnersRep.on('change', newVal => {
				if (newVal && newVal.length > 0) {
					this._typeaheadCandidates = newVal.filter(Boolean).map(runner => runner.name).map(String).sort();
				} else {
					this._typeaheadCandidates = [];
				}
			});

			interviewNamesRep.on('change', newVal => {
				this.setNames(newVal);
			});

			lowerthirdShowingRep.on('change', newVal => {
				this.lowerthirdShowing = newVal;
			});

			const ro = new (window as any).ResizeObserver((entries: any) => {
				const entry = entries[0];
				const cr = entry.contentRect;
				TweenLite.set(this.$.lowerthirdPreview, {
					scale: cr.width / 1920
				});
			});
			ro.observe(this.$.previewContainer);
		});
	}

	updatePreview() {
		this._updatePreviewDebouncer = Polymer.Debouncer.debounce(
			this._updatePreviewDebouncer,
			Polymer.Async.timeOut.after(16),
			this._updatePreview.bind(this)
		);
	}

	calcStartDisabled(lowerthirdShowing: boolean, questionShowing: boolean) {
		return lowerthirdShowing || questionShowing;
	}

	showLowerthird() {
		this.takeNames();
		lowerthirdShowingRep.value = true;
	}

	hideLowerthird() {
		lowerthirdShowingRep.value = false;
	}

	autoLowerthird() {
		this.takeNames();
		nodecg.sendMessage('pulseInterviewLowerthird', 10);
	}

	/**
	 * Takes the names currently entered into the inputs.
	 */
	takeNames() {
		interviewNamesRep.value = this.getNames();
	}

	/**
	 * Returns an array of the names currently entered into the inputs.
	 */
	getNames() {
		const inputs = this.getInputs();
		return inputs.map(input => {
			return {
				name: input.name,
				title: input.title
			};
		});
	}

	setNames(names: {name?: string; title?: string}[]) {
		const typeaheads = this.getInputs();

		if (!names || names.length <= 0) {
			typeaheads.forEach(input => {
				input.name = '';
				input.title = '';
			});
			return;
		}

		typeaheads.forEach((input, index) => {
			input.name = String((names[index] && names[index].name) || '');
			input.title = String((names[index] && names[index].title) || '');
		});
	}

	/**
	 * Retrieves the name inputs as an array of DOM elements.
	 */
	getInputs() {
		return Array.from(this.$.nameInputs.shadowRoot!.querySelectorAll('ui-sortable-list-item'))
			.map(uiSortableListItem => uiSortableListItem.shadowRoot!.querySelector('dash-lowerthird-name-input')) as DashLowerthirdNameInputElement[];
	}

	any(...args: any[]) {
		return args.find(arg => arg);
	}

	openRefillDialog() {
		if (!currentIntermissionRep.value ||
			!scheduleRep.value ||
			!currentRunRep.value) {
			return;
		}

		const currentInterview = currentIntermissionRep.value.content.find(item => item.type === 'interview') as Interview;
		const nextInterview = scheduleRep.value.find(scheduleItem => {
			// Ignore items which are not interviews.
			if (scheduleItem.type !== 'interview') {
				return false;
			}

			// If we have a currentInterview, return the first interview after it.
			if (currentInterview) {
				return scheduleItem.order > currentInterview.order;
			}

			// If we don't have a currentInterview, return the first interview after the currentRun.
			// Ignore items before the currentRun.
			return scheduleItem.order >= currentRunRep.value!.order;
		}) as (Interview | undefined);

		let currentInterviewNames: string[] = [];
		let nextInterviewNames: string[] = [];

		if (currentInterview) {
			currentInterviewNames = currentInterview.interviewers.concat(currentInterview.interviewees);
		}

		if (nextInterview) {
			nextInterviewNames = nextInterview.interviewers.concat(nextInterview.interviewees);
		}

		while (currentInterviewNames.length < 5) {
			currentInterviewNames.push('(none)');
		}

		while (nextInterviewNames.length < 5) {
			nextInterviewNames.push('(none)');
		}

		(this.$.currentLowerthirdRefillOption as DashInterviewLowerthirdRefillOptionElement).names = currentInterviewNames;
		(this.$.nextLowerthirdRefillOption as DashInterviewLowerthirdRefillOptionElement).names = nextInterviewNames;
		(this.$.lowerthirdRefillDialog as PaperDialogElement).open();

		nodecg.log.info('currentInterview:', currentInterview);
		nodecg.log.info('currentInterviewNames:', currentInterviewNames);
		nodecg.log.info('nextInterview:', nextInterview);
		nodecg.log.info('nextInterviewNames:', nextInterviewNames);
	}

	closeRefillDialog() {
		(this.$.lowerthirdRefillDialog as PaperDialogElement).close();
	}

	_handleRefillOptionAccepted(e: any) {
		this.setNames(e.detail.names);
		this.takeNames();
		this.closeRefillDialog();
	}

	_handleNameInputChange(event: any) {
		if (!interviewNamesRep.value) {
			return;
		}
		interviewNamesRep.value[event.model.index] = {
			name: event.target.name,
			title: event.target.title
		};
	}

	private _updatePreview() {
		(this.$.lowerthirdPreview as GDQLowerthirdElement).updatePreview(this.getNames());
	}
}
