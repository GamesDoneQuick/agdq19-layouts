import {Incident} from '../../../../src/types/schemas/victorOps%3Aincidents';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('dash-incidents-incident')
export default class DashIncidentsIncidentElement extends Polymer.Element {
	@property({type: Object})
	incident: Incident;

	@property({type: String, reflectToAttribute: true, computed: '_computeCurrentPhase(incident.*)'})
	currentPhase: string;

	_computeCurrentPhase() {
		return this.incident ? this.incident.currentPhase.toLowerCase() : 'unknown';
	}

	_calcFormattedPageTarget(incident: Incident) {
		if (!incident) {
			return '';
		}

		let targetStr = this._parsePageTargets(incident);
		if (incident.currentPhase.toLowerCase() === 'unacked') {
			targetStr = `PAGING: ${targetStr}`;
		} else if (incident.currentPhase.toLowerCase() === 'acked') {
			targetStr = incident.transitions.filter(transition => {
				return transition.name.toLowerCase() === 'acked';
			}).map(transition => {
				return transition.by;
			}).join(', ');
		} else if (incident.currentPhase.toLowerCase() === 'resolved') {
			targetStr = incident.transitions.filter(transition => {
				return transition.name.toLowerCase() === 'resolved';
			}).map(transition => {
				return transition.by;
			}).join(', ');
		}

		return targetStr;
	}

	_parsePageTargets(incident: Incident) {
		if (!incident) {
			return '';
		}

		if (incident.pagedUsers && incident.pagedUsers.length > 0) {
			return incident.pagedUsers.join(', ');
		}

		return 'NOBODY - TRY SLACK';
	}

	_formatDate(dateString: string) {
		const date = new Date(dateString);
		return date.toLocaleString('en-US', {
			day: 'numeric',
			month: 'numeric',
			year: '2-digit',
			hour12: true,
			hour: 'numeric',
			minute: '2-digit'
		});
	}

	_calcStatusText(currentPhase: string) {
		if (currentPhase.toLowerCase() === 'acked') {
			return 'ACKED BY:';
		}

		if (currentPhase.toLowerCase() === 'resolved') {
			return 'RESOLVED BY:';
		}

		return currentPhase;
	}
}
