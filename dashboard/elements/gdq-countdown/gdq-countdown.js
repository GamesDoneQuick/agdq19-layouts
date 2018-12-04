import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
const countdownRunning = nodecg.Replicant('countdownRunning');
const countdown = nodecg.Replicant('countdown');
let GDQCountdownElement = class GDQCountdownElement extends Polymer.Element {
    connectedCallback() {
        super.connectedCallback();
        Polymer.RenderStatus.beforeNextRender(this, () => {
            countdown.on('change', newVal => {
                if (newVal) {
                    const timeInput = this.$.timeInput;
                    timeInput.setMS(newVal.minutes, newVal.seconds);
                }
            });
            countdownRunning.on('change', newVal => {
                if (newVal) {
                    this.$.countdownContainer.setAttribute('disabled', 'true');
                    this.$.start.setAttribute('disabled-running', 'true');
                    this.$.stop.removeAttribute('disabled');
                }
                else {
                    this.$.countdownContainer.removeAttribute('disabled');
                    this.$.start.removeAttribute('disabled-running');
                    this.$.stop.setAttribute('disabled', 'true');
                }
                this.checkStartButton();
            });
        });
    }
    start() {
        nodecg.sendMessage('startCountdown', this.$.timeInput.value);
    }
    stop() {
        nodecg.sendMessage('stopCountdown');
    }
    _handleTimeInvalidChanged(e) {
        if (e.detail && e.detail.value) {
            this.$.start.setAttribute('disabled-invalid', 'true');
        }
        else {
            this.$.start.removeAttribute('disabled-invalid');
        }
        this.checkStartButton();
    }
    /**
     * Enables or disables the timer start button based on some criteria.
     */
    checkStartButton() {
        if (this.$.start.hasAttribute('disabled-invalid') || this.$.start.hasAttribute('disabled-running')) {
            this.$.start.setAttribute('disabled', 'true');
        }
        else {
            this.$.start.removeAttribute('disabled');
        }
    }
};
GDQCountdownElement = tslib_1.__decorate([
    customElement('gdq-countdown')
], GDQCountdownElement);
export default GDQCountdownElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLWNvdW50ZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdkcS1jb3VudGRvd24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBQzNDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBbUIsa0JBQWtCLENBQUMsQ0FBQztBQUNoRixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFZLFdBQVcsQ0FBQyxDQUFDO0FBRzNELElBQXFCLG1CQUFtQixHQUF4QyxNQUFxQixtQkFBb0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUMvRCxpQkFBaUI7UUFDaEIsS0FBSyxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFFMUIsT0FBTyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQ2hELFNBQVMsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUMvQixJQUFJLE1BQU0sRUFBRTtvQkFDWCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQTZCLENBQUM7b0JBQ3ZELFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ2hEO1lBQ0YsQ0FBQyxDQUFDLENBQUM7WUFFSCxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2dCQUN0QyxJQUFJLE1BQU0sRUFBRTtvQkFDWCxJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzNELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUN4QztxQkFBTTtvQkFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdEQsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzdDO2dCQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSztRQUNKLE1BQU0sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRCxJQUFJO1FBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQseUJBQXlCLENBQUMsQ0FBUTtRQUNqQyxJQUFLLENBQVMsQ0FBQyxNQUFNLElBQUssQ0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDakQsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztTQUNqRDtRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILGdCQUFnQjtRQUNmLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDLEVBQUU7WUFDbkcsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ04sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQ3pDO0lBQ0YsQ0FBQztDQUNELENBQUE7QUF4RG9CLG1CQUFtQjtJQUR2QyxhQUFhLENBQUMsZUFBZSxDQUFDO0dBQ1YsbUJBQW1CLENBd0R2QztlQXhEb0IsbUJBQW1CIn0=