import {Stopwatch} from '../../../../src/types/schemas/stopwatch';
import {Interview3AquestionSortMap} from '../../../../src/types/schemas/interview%3AquestionSortMap';
import {Websocket as WebsocketStatus} from 'nodecg-utility-obs/types/schemas/websocket';
import UiToastElement from '../../../../shared/elements/interfaces/ui-toast/ui-toast';
import DashInterviewLowerthirdElement from './dash-interview-lowerthird';
import * as OBSWebSocket from 'obs-websocket-js'; // tslint:disable-line:no-implicit-dependencies

const {customElement, property} = Polymer.decorators;
const compositingOBSStatus = nodecg.Replicant<WebsocketStatus>('compositingOBS:websocket');
const compositingOBSTransitioning = nodecg.Replicant<boolean>('compositingOBS:transitioning');
const interviewStopwatch = nodecg.Replicant<Stopwatch>('interview:stopwatch');
const lowerthirdTimeRemaining = nodecg.Replicant<number>('interview:lowerthirdTimeRemaining');
const programScene = nodecg.Replicant<OBSWebSocket.Scene>('compositingOBS:programScene');
const questionShowing = nodecg.Replicant<boolean>('interview:questionShowing');
const questionSortMap = nodecg.Replicant<Interview3AquestionSortMap>('interview:questionSortMap');
const questionTimeRemaining = nodecg.Replicant<number>('interview:questionTimeRemaining');
const showPrizesOnMonitorRep = nodecg.Replicant<boolean>('interview:showPrizesOnMonitor');
const baseClass = (Polymer as any).SCDataBindingHelpers(Polymer.MutableData(Polymer.Element)) as (new() => Polymer.Element);

/**
 * @customElement
 * @polymer
 * @appliesMixin Polymer.MutableData
 * @appliesMixin Polymer.SCDataBindingHelpers
 */
@customElement('dash-interview')
export default class DashInterviewElement extends baseClass {
	@property({type: Boolean, reflectToAttribute: true})
	lowerthirdShowing: boolean;

	@property({type: Number})
	lowerthirdTimeRemaining: number;

	@property({type: Boolean, reflectToAttribute: true})
	questionShowing: boolean;

	@property({type: Number})
	questionTimeRemaining: number;

	@property({type: String})
	_programSceneName = '';

	@property({type: Boolean})
	_markingTopQuestionAsDone = false;

	@property({type: Boolean})
	_sendingTransitionCommand = false;

	@property({type: String})
	_errorToastText: string;

	@property({type: String})
	_successToastText: string;

	@property({type: Boolean})
	_transitioning: boolean;

	@property({type: Boolean})
	_disconnectedFromOBS: boolean;

	@property({
		type: Boolean,
		computed: '_computeTransitionToBreakDisabled(_sendingTransitionCommand, _transitioning, _disconnectedFromOBS, _programSceneName)'
	})
	_transitionToBreakDisabled: boolean;

	@property({type: String})
	_timeElapsed: string;

	@property({type: Boolean})
	_modeToggleChecked: boolean;

	ready() {
		super.ready();

		lowerthirdTimeRemaining.on('change', newVal => {
			this.lowerthirdTimeRemaining = newVal;
		});

		questionTimeRemaining.on('change', newVal => {
			this.questionTimeRemaining = newVal;
		});

		compositingOBSTransitioning.on('change', newVal => {
			this._transitioning = newVal;
		});

		programScene.on('change', newVal => {
			this._programSceneName = newVal ? newVal.name : '';
		});

		compositingOBSStatus.on('change', newVal => {
			this._disconnectedFromOBS = Boolean(!newVal || newVal.status !== 'connected');
		});

		interviewStopwatch.on('change', newVal => {
			this._timeElapsed = newVal.time.formatted.split('.')[0];
		});

		showPrizesOnMonitorRep.on('change', newVal => {
			this._modeToggleChecked = !newVal;
		});

		this.addEventListener('error-toast', (event: any) => {
			(this.$.toast as UiToastElement).showErrorToast(event.detail.text);
		});
	}

	showLowerthird() {
		(this.$.lowerthirdControls as DashInterviewLowerthirdElement).autoLowerthird();
	}

	hideLowerthird() {
		(this.$.lowerthirdControls as DashInterviewLowerthirdElement).hideLowerthird();
	}

	showQuestion() {
		if (!questionSortMap.value) {
			return;
		}

		this._markingTopQuestionAsDone = true;
		nodecg.sendMessage('pulseInterviewQuestion', questionSortMap.value[0], error => {
			this._markingTopQuestionAsDone = false;
			if (error) {
				(this.$.toast as UiToastElement).showErrorToast('Failed to load next interview question.');
				nodecg.log.error(error);
			}
		});
	}

	hideQuestion() {
		questionShowing.value = false;
		this._markingTopQuestionAsDone = false;
	}

	openInterviewTransitionConfirmation() {
		(this.$.interviewTransitionConfirmation as PaperDialogElement).open();
	}

	async transitionToInterview() {
		return this.transitionToScene('Interview');
	}

	async transitionToBreak() {
		return this.transitionToScene('Break');
	}

	async transitionToScene(sceneName: string, transitionName = 'Blank Stinger') {
		const toastElem = this.$.toast as UiToastElement;
		this._sendingTransitionCommand = true;

		try {
			await nodecg.sendMessage('compositingOBS:transition', {
				name: transitionName,
				sceneName
			});
			toastElem.showSuccessToast(`Successfully started transition to "${sceneName}".`);
		} catch (error) {
			let errorString = error;
			if (error.message) {
				errorString = error.message;
			} else if (error.error) {
				errorString = error.error;
			}
			toastElem.showErrorToast('Failed to transition: ' + errorString);
		}

		this._sendingTransitionCommand = false;
	}

	_computeTransitionToBreakDisabled(
		_sendingTransitionCommand: boolean,
		_transitioning: boolean,
		_disconnectedFromOBS: boolean,
		_programSceneName: string
	) {
		return _sendingTransitionCommand ||
			_transitioning ||
			_disconnectedFromOBS ||
			_programSceneName === 'Break';
	}

	_any(...args: any[]) {
		return args.find(arg => Boolean(arg));
	}

	_handleModeToggleChange(e: any) {
		showPrizesOnMonitorRep.value = !e.target.checked;
	}
}
