'use strict';

// Packages
import * as request from 'request-promise-native';
import equals = require('deep-equal');

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import {VictorOpsIncidents} from '../types/schemas/victorOps_incidents';
import {VictorOpsRoutingKeys} from '../types/schemas/victorOps_routingKeys';

const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:victorOps`);
const incidentsReplicant = nodecg.Replicant<VictorOpsIncidents>('victorOps_incidents');
const routingKeysReplicant = nodecg.Replicant<VictorOpsRoutingKeys>('victorOps_routingKeys');

log.info('VictorOps integration enabled.');

nodecg.listenFor('victorOps:createIncident', (body, cb) => {
	log.info('Creating incident:', body);

	createIncident({
		restEndpoint: nodecg.bundleConfig.victorOps.restEndpoint,
		routingKey: body.routingKey,
		body: {
			message_type: 'CRITICAL',
			entity_display_name: body.subject,
			state_message: body.details
		}
	}).then(() => {
		log.info('Incident successfully created.');
		if (cb && !cb.handled) {
			cb();
		}
	}).catch(error => {
		log.error('Failed to create incident:', error);
		if (cb && !cb.handled) {
			cb(error);
		}
	});
});

// Initialize.
updateIncidentsReplicant();
updateRoutingKeysReplicant();

// Update incidents three times a minute.
setInterval(() => {
	updateIncidentsReplicant();
}, 20 * 1000);

// Update routing keys once every 5 minutes.
setInterval(() => {
	updateRoutingKeysReplicant();
}, 5 * 60 * 1000);

async function updateIncidentsReplicant() {
	let incidents;
	try {
		incidents = await fetchIncidents(nodecg.bundleConfig.victorOps);
	} catch (e) {
		log.error('Failed to fetch incidents:', e);
	}

	try {
		if (!equals(incidentsReplicant.value, incidents)) {
			incidentsReplicant.value = incidents;
		}
	} catch (e) {
		log.error('Failed to update incidents replicant:', e);
	}
}

async function updateRoutingKeysReplicant() {
	let teams;
	try {
		teams = await fetchRoutingKeys(nodecg.bundleConfig.victorOps);
	} catch (e) {
		log.error('Failed to fetch teams:', e);
	}

	try {
		if (!equals(routingKeysReplicant.value, teams)) {
			routingKeysReplicant.value = teams;
		}
	} catch (e) {
		log.error('Failed to update teams replicant:', e);
	}
}

async function fetchIncidents({apiId, apiKey}: {apiId: string; apiKey: string}) {
	const result = await request({
		uri: 'https://api.victorops.com/api-public/v1/incidents',
		headers: {
			Accept: 'application/json',
			'X-VO-Api-Id': apiId,
			'X-VO-Api-Key': apiKey
		},
		json: true
	});

	return result ? result.incidents : [];
}

async function fetchRoutingKeys({apiId, apiKey}: {apiId: string; apiKey: string}) {
	const result = await request({
		uri: 'https://api.victorops.com/api-public/v1/org/routing-keys',
		headers: {
			Accept: 'application/json',
			'X-VO-Api-Id': apiId,
			'X-VO-Api-Key': apiKey
		},
		json: true
	});

	return (result ? result.routingKeys : []).filter((routingKey: any) => {
		if (!routingKey) {
			return false;
		}

		// Filter out the default routing key.
		return routingKey.routingKey !== '.+';
	});
}

function createIncident({restEndpoint, routingKey, body}: {restEndpoint: string; routingKey: string; body: any}) {
	return request({
		method: 'POST',
		uri: restEndpoint.replace(/\$routing_key$/, routingKey),
		headers: {
			Accept: 'application/json'
		},
		body,
		json: true
	});
}
