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
        this._coldOpenStarted = true;
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
            if (newVal.raw <= 60000 && newVal.raw > 0) {
                const currentSecond = Math.floor(newVal.raw / 1000);
                if (currentSecond !== this._soundTick) {
                    nodecg.playSound('tally');
                    this._soundTick = currentSecond;
                }
            }
            if (newVal.raw === 0 && this._coldOpenStarted === false) {
                this._coldOpenStarted = true;
                this.playOpen();
            }
            if (newVal.raw > 0 && this._coldOpenStarted === true) {
                this._coldOpenStarted = false;
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
        this.$.coldopen.addEventListener('ended', () => {
            TweenLite.to(this.$.coldopen, 1, {
                delay: 2,
                opacity: 0,
                onComplete: () => {
                    this.$.coldopen.currentTime = 0;
                    TweenLite.set(this.$.coldopen, { opacity: 1 });
                }
            });
        });
    }
    playOpen() {
        this.$.coldopen.play();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUluRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDM0QsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFFM0UsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBbUIsa0JBQWtCLENBQUMsQ0FBQztBQUNoRixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBQy9ELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQWEsWUFBWSxDQUFDLENBQUM7QUFFOUQ7OztHQUdHO0FBRUgsSUFBcUIsbUJBQW1CLEdBQXhDLE1BQXFCLG1CQUFvQixTQUFRLE9BQU8sQ0FBQyxPQUFPO0lBTGhFOzs7T0FHRztJQUNIOztRQUdrQixzQkFBaUIsR0FBaUIsSUFBSSxZQUFZLENBQUMsRUFBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBTXhGLGtCQUFhLEdBQTZCLElBQUksQ0FBQztRQUMvQyxxQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUE0SmpDLENBQUM7SUF6SkEsS0FBSztRQUNKLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNkLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztRQUU5QyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxF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