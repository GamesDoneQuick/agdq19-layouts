'use strict';

/**
 * Formats an amount as USD, cents optional.
 * @param amount - The amount to format.
 * @param cents - Whether or not to include cents in the formatted string.
 * @returns The formatted string.
 */
export function formatDollars(amount: number | string, {cents = true} = {}) {
	const fractionDigits = cents ? 2 : 0;
	const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
	return parsedAmount.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: fractionDigits,
		minimumFractionDigits: fractionDigits
	});
}
