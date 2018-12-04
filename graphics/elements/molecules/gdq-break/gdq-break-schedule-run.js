import * as tslib_1 from "tslib";
var GDQBreakScheduleRunElement_1;
import { TweenLite, TimelineMax, Sine } from 'gsap';
const { customElement, property } = Polymer.decorators;
const DISPALY_DURATION = nodecg.bundleConfig.displayDuration;
/**
 * @customElement
 * @polymer
 */
let GDQBreakScheduleRunElement = GDQBreakScheduleRunElement_1 = class GDQBreakScheduleRunElement extends Polymer.MutableData(Polymer.Element) {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.upNext = false;
        this._currentRunnerIndex = 0;
    }
    ready() {
        super.ready();
        this.hidden = true;
    }
    _runChanged(newVal) {
        this.hidden = !newVal;
        if (!newVal) {
            return;
        }
        const WIDTH_ADDED_BY_BORDERS = 2;
        const PADDING_OF_INFO_RUNNER = 48;
        const infoRunnerElem = this.$['info-runner'];
        this._killRunnerLoopTimeline();
        infoRunnerElem.maxWidth = 0;
        infoRunnerElem.text = this._getLongestName(newVal.runners);
        TweenLite.set(infoRunnerElem, { opacity: 1, width: 'auto' });
        TweenLite.set(infoRunnerElem.$.fittedContent, { scaleX: 1 });
        Polymer.RenderStatus.beforeNextRender(this, () => {
            infoRunnerElem.maxWidth =
                this.$.info.clientWidth -
                    WIDTH_ADDED_BY_BORDERS -
                    PADDING_OF_INFO_RUNNER -
                    this.$['info-category'].clientWidth;
            infoRunnerElem.style.width = `${this.$['info-runner'].clientWidth - PADDING_OF_INFO_RUNNER}px`;
            infoRunnerElem.text = newVal.runners[0].name;
            if (newVal.runners.length > 1) {
                this._killRunnerLoopTimeline();
                this._runnerTimeline = this._createRunnerLoopTimeline(newVal.runners);
            }
        });
    }
    _createRunnerLoopTimeline(runners) {
        const tl = new TimelineMax({ repeat: -1 });
        runners.slice(1).concat([runners[0]]).forEach(runner => {
            tl.to(this.$['info-runner'], 0.5, {
                opacity: 0,
                ease: Sine.easeInOut
            }, `+=${DISPALY_DURATION}`);
            tl.call(() => {
                this.$['info-runner'].text = runner.name;
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
    _formatRunName(runName) {
        if (!runName || typeof runName !== 'string') {
            return '?';
        }
        return runName.replace(/\\n/g, ' ');
    }
    _getLongestName(runners) {
        return runners.reduce((accumulator, currentValue) => {
            if (!currentValue || !currentValue.name) {
                return accumulator;
            }
            return currentValue.name.length > accumulator.length ? currentValue.name : accumulator;
        }, '');
    }
};
tslib_1.__decorate([
    property({ type: Object, observer: GDQBreakScheduleRunElement_1.prototype._runChanged })
], GDQBreakScheduleRunElement.prototype, "run", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQBreakScheduleRunElement.prototype, "upNext", void 0);
tslib_1.__decorate([
    property({ type: Number })
], GDQBreakScheduleRunElement.prototype, "_currentRunnerIndex", void 0);
GDQBreakScheduleRunElement = GDQBreakScheduleRunElement_1 = tslib_1.__decorate([
    customElement('gdq-break-schedule-run')
], GDQBreakScheduleRunElement);
export default GDQBreakScheduleRunElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWJyZWFrLXNjaGVkdWxlLXJ1bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1icmVhay1zY2hlZHVsZS1ydW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFbEQsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQ3JELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFFN0Q7OztHQUdHO0FBRUgsSUFBcUIsMEJBQTBCLGtDQUEvQyxNQUFxQiwwQkFBMkIsU0FBUSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFMNUY7OztPQUdHO0lBQ0g7O1FBTUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUdmLHdCQUFtQixHQUFHLENBQUMsQ0FBQztJQXdGekIsQ0FBQztJQXBGQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFXO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNaLE9BQU87U0FDUDtRQUVELE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sc0JBQXNCLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFvQixDQUFDO1FBRWhFLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBRTlCLGNBQXNCLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNwQyxjQUFzQixDQUFDLElBQUksR0FBRyxJQUFJLENBQUMs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