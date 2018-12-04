/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base) => {
    /**
     * @mixinClass
     * @polymer
     */
    class CSSReflectionMixin extends base {
        /**
         * Gets the value of a Custom CSS Property.
         * @param prop - The property name to get the value of.
         * @param [fallback] - An optional fallback value to use if the property is not defined.
         * @returns - The value of the Custom CSS Property, which is always a string.
         */
        readCSSCustomProperty(prop, fallback) {
            let value;
            if ('ShadyCSS' in window) {
                value = window.ShadyCSS.getComputedStyleValue(this, prop);
            }
            else {
                value = getComputedStyle(this, prop);
            }
            return value || fallback;
        }
    }
    return CSSReflectionMixin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzLXJlZmxlY3Rpb24tbWl4aW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjc3MtcmVmbGVjdGlvbi1taXhpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxlQUFlLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFpQyxFQUFFLEVBQUU7SUFDMUU7OztPQUdHO0lBQ0gsTUFBTSxrQkFBbUIsU0FBUSxJQUFJO1FBQ3BDOzs7OztXQUtHO1FBQ0gscUJBQXFCLENBQUMsSUFBWSxFQUFFLFFBQWM7WUFDakQsSUFBSSxLQUFLLENBQUM7WUFDVixJQUFJLFVBQVUsSUFBSSxNQUFNLEVBQUU7Z0JBQ3pCLEtBQUssR0FBSSxNQUFjLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuRTtpQkFBTTtnQkFDTixLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBVyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVDO1lBRUQsT0FBTyxLQUFLLElBQUksUUFBUSxDQUFDO1FBQzFCLENBQUM7S0FDRDtJQUVELE9BQU8sa0JBQWtCLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUMifQ==