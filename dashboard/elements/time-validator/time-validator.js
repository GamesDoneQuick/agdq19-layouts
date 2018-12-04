import * as tslib_1 from "tslib";
const { customElement } = Polymer.decorators;
let TimeValidatorElement = class TimeValidatorElement extends Polymer.mixinBehaviors([Polymer.IronValidatorBehavior], Polymer.Element) {
    validate(value) {
        // This regex validates incomplete times (by design)
        return !value || value.match(/^[0-9]{0,2}:[0-9]{0,2}$/);
    }
};
TimeValidatorElement = tslib_1.__decorate([
    customElement('time-validator')
], TimeValidatorElement);
export default TimeValidatorElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS12YWxpZGF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aW1lLXZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBTSxFQUFDLGFBQWEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFHM0MsSUFBcUIsb0JBQW9CLEdBQXpDLE1BQXFCLG9CQUFxQixTQUFRLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ3pILFFBQVEsQ0FBQyxLQUFhO1FBQ3JCLG9EQUFvRDtRQUNwRCxPQUFPLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN6RCxDQUFDO0NBQ0QsQ0FBQTtBQUxvQixvQkFBb0I7SUFEeEMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO0dBQ1gsb0JBQW9CLENBS3hDO2VBTG9CLG9CQUFvQiJ9