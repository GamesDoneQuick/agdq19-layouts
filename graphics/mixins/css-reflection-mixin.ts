/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base: (new () => Polymer.Element)) => { // tslint:disable-line:no-unnecessary-type-annotation
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
		readCSSCustomProperty(prop: string, fallback?: any) {
			let value;
			if ('ShadyCSS' in window) {
				value = (window as any).ShadyCSS.getComputedStyleValue(this, prop);
			} else {
				value = getComputedStyle(this as any, prop);
			}

			return value || fallback;
		}
	}

	return CSSReflectionMixin;
});
