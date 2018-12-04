import {Run, Runner} from '../../../../src/types/index';
import {TweenLite, TimelineMax, Sine} from 'gsap';

const {customElement, property} = Polymer.decorators;
const DISPALY_DURATION = nodecg.bundleConfig.displayDuration;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-schedule-run')
export default class GDQBreakScheduleRunElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object, observer: GDQBreakScheduleRunElement.prototype._runChanged})
	run: Run;

	@property({type: Boolean, reflectToAttribute: true})
	upNext = false;

	@property({type: Number})
	_currentRunnerIndex = 0;

	_runnerTimeline: TimelineMax | null;

	ready() {
		super.ready();
		this.hidden = true;
	}

	_runChanged(newVal: Run) {
		this.hidden = !newVal;
		if (!newVal) {
			return;
		}

		const WIDTH_ADDED_BY_BORDERS = 2;
		const PADDING_OF_INFO_RUNNER = 48;
		const infoRunnerElem = this.$['info-runner'] as Polymer.Element;

		this._killRunnerLoopTimeline();

		(infoRunnerElem as any).maxWidth = 0;
		(infoRunnerElem as any).text = this._getLongestName(newVal.runners);
		TweenLite.set(infoRunnerElem, {opacity: 1, width: 'auto'});
		TweenLite.set(infoRunnerElem.$.fittedContent, {scaleX: 1});

		Polymer.RenderStatus.beforeNextRender(this, () => {
			(infoRunnerElem as any).maxWidth =
				this.$.info.clientWidth -
				WIDTH_ADDED_BY_BORDERS -
				PADDING_OF_INFO_RUNNER -
				this.$['info-category'].clientWidth;

			infoRunnerElem.style.width = `${this.$['info-runner'].clientWidth - PADDING_OF_INFO_RUNNER}px`;
			(infoRunnerElem as any).text = newVal.runners[0].name;

			if (newVal.runners.length > 1) {
				this._killRunnerLoopTimeline();
				this._runnerTimeline = this._createRunnerLoopTimeline(newVal.runners);
			}
		});
	}

	_createRunnerLoopTimeline(runners: Runner[]) {
		const tl = new TimelineMax({repeat: -1});

		runners.slice(1).concat([runners[0]]).forEach(runner => {
			tl.to(this.$['info-runner'], 0.5, {
				opacity: 0,
				ease: Sine.easeInOut
			}, `+=${DISPALY_DURATION}`);

			tl.call(() => {
				(this.$['info-runner'] as any).text = runner.name;
			});

			tl.to(this.$['info-runner'], 0.5, {
				opacity: 1,
				ease: Sine.easeInOut
			}, '+=0.1');
		});

		return tl;
	}

	_killRunnerLoopTimeline() {
		if (this._runnerTimeline) {
			this._runnerTimeline.kill();
			this._runnerTimeline = null;
		}
	}

	_formatRunName(runName: unknown) {
		if (!runName || typeof runName !== 'string') {
			return '?';
		}

		return runName.replace(/\\n/g, ' ');
	}

	_getLongestName(runners: Runner[]) {
		return runners.reduce((accumulator, currentValue) => {
			if (!currentValue || !currentValue.name) {
				return accumulator;
			}
			return currentValue.name.length > accumulator.length ? currentValue.name : accumulator;
		}, '');
	}
}
