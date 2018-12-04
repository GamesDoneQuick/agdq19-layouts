import * as tslib_1 from "tslib";
import AtomTinyAlertsElement from '../atom-tiny-alerts/atom-tiny-alerts';
const { customElement } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomSubAlertsElement = class AtomSubAlertsElement extends AtomTinyAlertsElement {
    ready() {
        super.ready();
        nodecg.listenFor('subscription', this._handleSubscription.bind(this));
    }
    _handleSubscription(subscription) {
        let backgroundColor = 'white';
        let holdDuration = 0.067;
        let text = 'New';
        if (subscription.sub_plan && subscription.sub_plan.toLowerCase() === 'prime') {
            backgroundColor = '#6441a4';
            text = 'Prime';
        }
        else if (subscription.context && subscription.context.toLowerCase() === 'subgift') {
            backgroundColor = '#00ffff';
            text = 'Gift';
        }
        else if (subscription.sub_plan === '2000') {
            backgroundColor = '#ffba00';
            holdDuration *= 3;
            text = '$9.99';
        }
        else if (subscription.sub_plan === '3000') {
            backgroundColor = '#ff0099';
            holdDuration *= 6;
            text = '$24.99';
        }
        if (subscription.months <= 1) {
            text += ' Sub';
        }
        else {
            text += ` Resub x${subscription.months}`;
        }
        this.addAlert({
            text,
            backgroundColor,
            holdDuration
        });
    }
};
AtomSubAlertsElement = tslib_1.__decorate([
    customElement('atom-sub-alerts')
], AtomSubAlertsElement);
export default AtomSubAlertsElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS1zdWItYWxlcnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXRvbS1zdWItYWxlcnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLHFCQUFxQixNQUFNLHNDQUFzQyxDQUFDO0FBbUJ6RSxNQUFNLEVBQUMsYUFBYSxFQUFDLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztBQUUzQzs7O0dBR0c7QUFFSCxJQUFxQixvQkFBb0IsR0FBekMsTUFBcUIsb0JBQXFCLFNBQVEscUJBQXFCO0lBQ3RFLEtBQUs7UUFDSixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELG1CQUFtQixDQUFDLFlBQWdDO1FBQ25ELElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQztRQUM5QixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRWpCLElBQUksWUFBWSxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtZQUM3RSxlQUFlLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksR0FBRyxPQUFPLENBQUM7U0FDZjthQUFNLElBQUksWUFBWSxDQUFDLE9BQU8sSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFNBQVMsRUFBRTtZQUNwRixlQUFlLEdBQUcsU0FBUyxDQUFDO1lBQzVCLElBQUksR0FBRyxNQUFNLENBQUM7U0FDZDthQUFNLElBQUksWUFBWSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDNUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUM1QixZQUFZLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksR0FBRyxPQUFPLENBQUM7U0FDZjthQUFNLElBQUksWUFBWSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7WUFDNUMsZUFBZSxHQUFHLFNBQVMsQ0FBQztZQUM1QixZQUFZLElBQUksQ0FBQyxDQUFDO1lBQ2xCLElBQUksR0FBRyxRQUFRLENBQUM7U0FDaEI7UUFFRCxJQUFJLFlBQVksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQzdCLElBQUksSUFBSSxNQUFNLENBQUM7U0FDZjthQUFNO1lBQ04sSUFBSSxJQUFJLFdBQVcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNiLElBQUk7WUFDSixlQUFlO1lBQ2YsWUFBWTtTQUNaLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRCxDQUFBO0FBdkNvQixvQkFBb0I7SUFEeEMsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0dBQ1osb0JBQW9CLENBdUN4QztlQXZDb0Isb0JBQW9CIn0=