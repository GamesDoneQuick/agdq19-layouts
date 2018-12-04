import * as tslib_1 from "tslib";
import { TimelineLite, TweenLite, Sine } from 'gsap';
import { typeAnim } from '../../../../shared/lib/type-anims';
import { createMaybeRandomTween } from '../../../../shared/lib/maybe-random';
const { customElement, property } = Polymer.decorators;
const countdownRunning = nodecg.Replicant('countdownRunning');
const countdownTime = nodecg.Replicant('countdown');
const nowPlaying = nodecg.Replicant('nowPlaying');
/**
 * @customElement
 * @polymer
 */
let GDQCountdownElement = class GDQCountdownElement extends Polymer.Element {
    /**
     * @customElement
     * @polymer
     */
    constructor() {
        super(...arguments);
        this.countdownTimeline = new TimelineLite({ autoRemoveChildren: true });
        this._fooDebouncer = null;
    }
    ready() {
        super.ready();
        TweenLite.set(this.$.countdown, { opacity: 0 });
        countdownRunning.on('change', newVal => {
            if (newVal) {
                this.showTimer();
            }
            else {
                this._debounceFoo();
            }
        });
        countdownTime.on('change', newVal => {
            this.$.countdownMinutesTens.innerText = String(Math.floor(newVal.minutes / 10));
            this.$.countdownMinutesOnes.innerText = String(newVal.minutes % 10);
            this.$.countdownSecondsTens.innerText = String(Math.floor(newVal.seconds / 10));
            this.$.countdownSecondsOnes.innerText = String(newVal.seconds % 10);
            if (newVal.raw <= 60000) {
                if (!this._didTweenRed) {
                    this._didTweenRed = true;
                    this._didTweenTeal = false;
                    TweenLite.to(this.$.countdown, 1, {
                        color: '#ED5A5A',
                        ease: Sine.easeInOut
                    });
                }
            }
            else if (!this._didTweenTeal) { // eslint-disable-line no-lonely-if
                this._didTweenRed = false;
                this._didTweenTeal = true;
                TweenLite.to(this.$.countdown, 1, {
                    color: '#00FFFF',
                    ease: Sine.easeInOut
                });
            }
            if (newVal.raw <= 0) {
                this.$.countdown.classList.add('blink');
                this._debounceFoo();
            }
            else {
                this.$.countdown.classList.remove('blink');
            }
        });
        nowPlaying.on('change', newVal => {
            this.$.nowPlaying.textContent = `${newVal.game || '?'} - ${newVal.title || '?'}`;
            typeAnim(this.$.nowPlaying);
        });
    }
    showTimer() {
        if (!this._initialized) {
            this._initialized = true;
        }
        clearTimeout(this._fooTimeout);
        const tl = this.countdownTimeline;
        tl.add(createMaybeRandomTween({
            target: this.$.pressStart.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }), 'flickerTotal');
        tl.set(this.$.countdown, { opacity: 1 });
        tl.staggerFromTo([
            this.$.countdownMinutesTens,
            this.$.countdownMinutesOnes,
            this.$.countdownColon,
            this.$.countdownSecondsTens,
            this.$.countdownSecondsOnes
        ], 0.001, {
            visibility: 'hidden'
        }, {
            visibility: 'visible'
        }, 0.03);
    }
    hideTimer() {
        if (!this._initialized) {
            this._initialized = true;
            return;
        }
        const tl = this.countdownTimeline;
        tl.add(createMaybeRandomTween({
            target: this.$.countdown.style,
            propName: 'opacity',
            duration: 0.465,
            start: { probability: 1, normalValue: 1 },
            end: { probability: 0, normalValue: 0 }
        }), 'flickerTotal');
        tl.set(this.$.pressStart, { opacity: 1 });
        tl.add(typeAnim(this.$.pressStart));
    }
    _debounceFoo() {
        this._fooDebouncer = Polymer.Debouncer.debounce(this._fooDebouncer, Polymer.Async.timeOut.after(300), this._foo.bind(this));
    }
    _foo() {
        clearTimeout(this._fooTimeout);
        if (countdownRunning.value === false) {
            if (countdownTime.value && countdownTime.value.raw <= 0) {
                this._fooTimeout = window.setTimeout(() => {
                    this.hideTimer();
                }, 120);
            }
            else {
                this.hideTimer();
            }
        }
    }
};
tslib_1.__decorate([
    property({ type: Object })
], GDQCountdownElement.prototype, "countdownTimeline", void 0);
GDQCountdownElement = tslib_1.__decorate([
    customElement('gdq-countdown')
], GDQCountdownElement);
export default GDQCountdownElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUluRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFFM0UsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBbUIsa0JBQWtCLENBQUMsQ0FBQztBQUNoRixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFFOUQ7OztHQUdHO0FBRUgsSUFBcUIsbUJBQW1CLEdBQXhDLE1BQXFCLG1CQUFvQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTGhFOzs7T0FHRztJQUNIOztRQUdrQixzQkFBaUIsR0FBaUIsSUFBSSxZQUFZLENBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBTXhGLGtCQUFhLEdBQTZCLElBQUksQ0FBQztJQTJIeEQsQ0FBQztJQXpIQSxLQUFLO1FBQ0osS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFDLE9BQU8sRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO1FBRTlDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDdEMsSUFBSSxNQUFNLEVBQUU7Z0JB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