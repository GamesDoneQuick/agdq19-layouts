import * as tslib_1 from "tslib";
const { customElement, property } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let DashIncidentsIncidentElement = class DashIncidentsIncidentElement extends Polymer.Element {
    _computeCurrentPhase() {
        return this.incident ? this.incident.currentPhase.toLowerCase() : 'unknown';
    }
    _calcFormattedPageTarget(incident) {
        if (!incident) {
            return '';
        }
        let targetStr = this._parsePageTargets(incident);
        if (incident.currentPhase.toLowerCase() === 'unacked') {
            targetStr = `PAGING: ${targetStr}`;
        }
        else if (incident.currentPhase.toLowerCase() === 'acked') {
            targetStr = incident.transitions.filter(transition => {
                return transition.name.toLowerCase() === 'acked';
            }).map(transition => {
                return transition.by;
            }).join(', ');
        }
        else if (incident.currentPhase.toLowerCase() === 'resolved') {
            targetStr = incident.transitions.filter(transition => {
                return transition.name.toLowerCase() === 'resolved';
            }).map(transition => {
                return transition.by;
            }).join(', ');
        }
        return targetStr;
    }
    _parsePageTargets(incident) {
        if (!incident) {
            return '';
        }
        if (incident.pagedUsers && incident.pagedUsers.length > 0) {
            return incident.pagedUsers.join(', ');
        }
        return 'NOBODY - TRY SLACK';
    }
    _formatDate(dateString) {
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
    _calcStatusText(currentPhase) {
        if (currentPhase.toLowerCase() === 'acked') {
            return 'ACKED BY:';
        }
        if (currentPhase.toLowerCase() === 'resolved') {
            return 'RESOLVED BY:';
        }
        return currentPhase;
    }
};
tslib_1.__decorate([
    property({ type: Object })
], DashIncidentsIncidentElement.prototype, "incident", void 0);
tslib_1.__decorate([
    property({ type: String, reflectToAttribute: true, computed: '_computeCurrentPhase(incident.*)' })
], DashIncidentsIncidentElement.prototype, "currentPhase", void 0);
DashIncidentsIncidentElement = tslib_1.__decorate([
    customElement('dash-incidents-incident')
], DashIncidentsIncidentElement);
export default DashIncidentsIncidentElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaC1pbmNpZGVudHMtaW5jaWRlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXNoLWluY2lkZW50cy1pbmNpZGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBRUEsTUFBTSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRXJEOzs7R0FHRztBQUVILElBQXFCLDRCQUE0QixHQUFqRCxNQUFxQiw0QkFBNkIsU0FBUSxPQUFPLENBQUMsT0FBTztJQU94RSxvQkFBb0I7UUFDbkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQzdFLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxRQUFrQjtRQUMxQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUVELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqRCxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ3RELFNBQVMsR0FBRyxXQUFXLFNBQVMsRUFBRSxDQUFDO1NBQ25DO2FBQU0sSUFBSSxRQUFRLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLE9BQU8sRUFBRTtZQUMzRCxTQUFTLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3BELE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUNuQixPQUFPLFVBQVUsQ0FBQyxFQUFFLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2Q7YUFBTSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVSxFQUFFO1lBQzlELFNBQVMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDcEQsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLFVBQVUsQ0FBQztZQUNyRCxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ25CLE9BQU8sVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDZDtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxRQUFrQjtRQUNuQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2QsT0FBTyxFQUFFLENBQUM7U0FDVjtRQUVELElBQUksUUFBUSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUQsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0QztRQUVELE9BQU8sb0JBQW9CLENBQUM7SUFDN0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxVQUFrQjtRQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFO1lBQ25DLEdBQUcsRUFBRSxTQUFTO1lBQ2QsS0FBSyxFQUFFLFNBQVM7WUFDaEIsSUFBSSxFQUFFLFNBQVM7WUFDZixNQUFNLEVBQUUsSUFBSTtZQUNaLElBQUksRUFBRSxTQUFTO1lBQ2YsTUFBTSxFQUFFLFNBQVM7U0FDakIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGVBQWUsQ0FBQyxZQUFvQjtRQUNuQyxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7WUFDM0MsT0FBTyxXQUFXLENBQUM7U0FDbkI7UUFFRCxJQUFJLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLEVBQUU7WUFDOUMsT0FBTyxjQUFjLENBQUM7U0FDdEI7UUFFRCxPQUFPLFlBQVksQ0FBQztJQUNyQixDQUFDO0NBQ0QsQ0FBQTtBQXJFQTtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQzs4REFDTjtBQUduQjtJQURDLFFBQVEsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxrQ0FBa0MsRUFBQyxDQUFDO2tFQUM1RTtBQUxELDRCQUE0QjtJQURoRCxhQUFhLENBQUMseUJBQXlCLENBQUM7R0FDcEIsNEJBQTRCLENBdUVoRDtlQXZFb0IsNEJBQTRCIn0=