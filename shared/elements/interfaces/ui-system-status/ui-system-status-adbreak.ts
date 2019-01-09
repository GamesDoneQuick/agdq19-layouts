/// <reference lib="dom"/>

import {CurrentIntermission} from '../../../../src/types/schemas/currentIntermission';
import {AdBreak} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('ui-system-status-adbreak')
export default class UiSystemStatusCasparElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: String, computed: '_computeStatus(_currentIntermission)', reflectToAttribute: true})
	status: string;

	@property({type: Object})
	protected _currentIntermission: CurrentIntermission;

	_computeStatus() {
		const statusSpan = this.$.status as HTMLSpanElement;
		if (this._currentIntermission &&
			this._currentIntermission.content &&
			this._currentIntermission.content[0] &&
			this._currentIntermission.content[0].type === 'adBreak') {
			const state = (this._currentIntermission.content[0] as AdBreak).state;
			const cantStartReason = state.cantStartReason;
			if (cantStartReason) {
				statusSpan.style.color = 'var(--obs-system-status-error-color)';
				return cantStartReason;
			}

			statusSpan.style.color = 'var(--obs-system-status-nominal-color)';
			if (state.completed) {
				return 'COMPLETED';
			}

			if (state.started) {
				return 'PLAYING';
			}

			return 'READY';
		}

		statusSpan.style.color = 'var(--obs-system-status-nominal-color)';
		return 'NONE';
	}
}
