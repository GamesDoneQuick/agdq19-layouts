// Packages
import * as request from 'request-promise-native';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import * as GDQTypes from '../types';
import {CurrentRun} from '../types/schemas/currentRun';

const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:twitch`);
const currentRun = nodecg.Replicant<CurrentRun>('currentRun');
let lastLongName: string;

currentRun.on('change', (newVal: GDQTypes.Run) => {
	if (newVal.longName === lastLongName) {
		return;
	}

	log.info('Updating Twitch title and game to', newVal.longName);
	lastLongName = newVal.longName;
	request({
		method: 'put',
		uri: `https://api.twitch.tv/kraken/channels/${nodecg.bundleConfig.twitch.channelId}`,
		headers: {
			Accept: 'application/vnd.twitchtv.v5+json',
			Authorization: `OAuth ${nodecg.bundleConfig.twitch.oauthToken}`,
			'Client-ID': nodecg.bundleConfig.twitch.clientId,
			'Content-Type': 'application/json'
		},
		body: {
			channel: {
				// tslint:disable-next-line:no-invalid-template-strings
				status: nodecg.bundleConfig.twitch.titleTemplate.replace('${gameName}', newVal.longName),
				game: newVal.longName
			}
		},
		json: true
	}).then(() => {
		log.info('Successfully updated Twitch title and game to', newVal.longName);
	}).catch(err => {
		log.error('Failed updating Twitch title and game:\n\t', err);
	});
});
