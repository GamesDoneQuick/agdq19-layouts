import AtomTweeningNumberElement from '../../atoms/atom-tweening-number/atom-tweening-number';
import {InterviewStopwatch} from '../../../../src/types/schemas/interview_stopwatch';
import {CurrentLayout} from '../../../../src/types/schemas/currentLayout';
import {Run} from '../../../../src/types';
import {Total} from '../../../../src/types/schemas/total';

const {customElement, property} = Polymer.decorators;
const total = nodecg.Replicant<Total>('total');
const currentRun = nodecg.Replicant<Run>('currentRun');
const nextRun = nodecg.Replicant<Run>('nextRun');
const currentLayout = nodecg.Replicant<CurrentLayout>('currentLayout');
const throwIncoming = nodecg.Replicant<boolean>('interview_throwIncoming');
const interviewStopwatch = nodecg.Replicant<InterviewStopwatch>('interview_stopwatch');
const checklistComplete = nodecg.Replicant<boolean>('checklistComplete');
const prizeModeRep = nodecg.Replicant<boolean>('interview_showPrizesOnMonitor');

@customElement('dash-interview-monitor')
export default class DashInterviewMonitorElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Boolean, reflectToAttribute: true})
	throwIncoming = false;

	@property({type: String})
	timeElapsed: string;

	@property({type: String})
	upNextRunName: string;

	@property({type: Boolean, reflectToAttribute: true})
	prizeMode = false;

	ready() {
		super.ready();
		const totalAmountElem = this.$['total-amount'] as AtomTweeningNumberElement;

		totalAmountElem.displayValueTransform = displayValue => {
			return displayValue.toLocaleString('en-US', {
				maximumFractionDigits: 0
			});
		};
		total.on('change', newVal => {
			totalAmountElem.value = newVal.raw;
		});

		this.updateUpNextDisplay = this.updateUpNextDisplay.bind(this);
		currentLayout.on('change', this.updateUpNextDisplay);
		currentRun.on('change', this.updateUpNextDisplay);
		nextRun.on('change', this.updateUpNextDisplay);

		throwIncoming.on('change', newVal => {
			this.throwIncoming = newVal;
		});

		interviewStopwatch.on('change', newVal => {
			this.timeElapsed = newVal.time.formatted.split('.')[0];
		});

		checklistComplete.on('change', newVal => {
			const checklistStatusDiv = this.$.checklistStatus as HTMLDivElement;
			if (newVal) {
				checklistStatusDiv.style.backgroundColor = '#cfffcf';
				checklistStatusDiv.innerText = 'DONE WITH SETUP';
			} else {
				checklistStatusDiv.style.backgroundColor = '#ffe2e2';
				checklistStatusDiv.innerText = 'STILL DOING SETUP';
			}
		});

		prizeModeRep.on('change', newVal => {
			this.prizeMode = newVal;
		});
	}

	updateUpNextDisplay() {
		let upNextRun = nextRun.value;

		if (currentLayout.value === 'break' || currentLayout.value === 'interview') {
			upNextRun = currentRun.value;
		}

		if (!upNextRun) {
			return;
		}

		this.upNextRunName = upNextRun.name.replace('\\n', ' ').trim();

		let concatenatedRunners;
		if (upNextRun.runners.length === 1) {
			concatenatedRunners = upNextRun.runners[0].name;
		} else {
			concatenatedRunners = upNextRun.runners.slice(1).reduce((prev, curr, index, array) => {
				if (!curr) {
					return prev || '';
				}

				if (index === array.length - 1) {
					return `${prev} &<br/>${curr.name}`;
				}

				return `${prev},<br/>${curr.name}`;
			}, upNextRun.runners[0].name);
		}
		(this.$.nextRunners as HTMLDivElement).innerHTML = String(concatenatedRunners);
	}

	_calcSelectedPage(prizeMode: boolean) {
		return prizeMode ? 1 : 0;
	}
}
