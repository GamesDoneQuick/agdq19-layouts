'use strict';

/*
 * NOTE: It is absolutely critical that the `args` param of any udpPort.send command not be null or undefined.
 * Doing so causes the osc lib to actually encode it as a null argument (,N). Instead, use an empty array ([]).
 */

// Packages
import osc = require('osc');

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import {MixerGameAudioChannels} from '../types/schemas/mixer_gameAudioChannels';
import {Configschema} from '../types/schemas/configschema';

interface GameAudioChannelConfig {
	sd: number | null;
	hd: number | null;
}

const nodecg = nodecgApiContext.get();
const X32_UDP_PORT = 10023;
const FADE_THRESHOLD = 0.1;

interface ChannelObject {
	muted: boolean;
	fadedBelowThreshold: boolean;
}

const gameAudioChannelsRep = nodecg.Replicant<MixerGameAudioChannels>('mixer_gameAudioChannels', {persistent: false});
const adsChannelRep = nodecg.Replicant<ChannelObject>('mixer_adsChannel', {persistent: false});

export const replicants = {
	gameAudioChannels: gameAudioChannelsRep,
	adsChannel: adsChannelRep
};

const channelToReplicantMap: {[key: number]: ChannelObject} = {};
const mixerConfig = (nodecg.bundleConfig as Configschema).mixer!;
mixerConfig.gameAudioChannels.forEach((item: GameAudioChannelConfig, index: number) => {
	if (!gameAudioChannelsRep.value[index]) {
		return;
	}

	if (typeof item.sd === 'number') {
		channelToReplicantMap[item.sd] = gameAudioChannelsRep.value[index].sd;
	}

	if (typeof item.hd === 'number') {
		channelToReplicantMap[item.hd] = gameAudioChannelsRep.value[index].hd;
	}
});
channelToReplicantMap[mixerConfig.adsChannel] = adsChannelRep.value;

const udpPort = new osc.UDPPort({
	localAddress: '0.0.0.0',
	localPort: 52361,
	remoteAddress: mixerConfig.address,
	remotePort: X32_UDP_PORT,
	metadata: true
});

udpPort.on('raw', (buf: Buffer) => {
	const str = buf.toString('ascii');
	let channelNumber = 0;
	let valueBytes;
	let replicantObject;

	if (str.indexOf('/chMutes') === 0) {
		// For this particular message, we know that the values start at byte 22 and stop 2 bytes from the end.
		valueBytes = buf.slice(22, -2);

		for (let i = 0; i < valueBytes.length; i += 4) {
			const muted = !valueBytes.readFloatBE(i);
			replicantObject = (channelToReplicantMap as any)[String(channelNumber + 1)];
			if (replicantObject) {
				replicantObject.muted = muted;
			}

			channelNumber++;
		}
	} else if (str.indexOf('/chFaders') === 0) {
		// For this particular message, we know that the values start at byte 24
		valueBytes = buf.slice(24);

		for (let i = 0; i < valueBytes.length; i += 4) {
			const fadedBelowThreshold = valueBytes.readFloatLE(i) < FADE_THRESHOLD;
			replicantObject = (channelToReplicantMap as any)[String(channelNumber + 1)];
			if (replicantObject) {
				replicantObject.fadedBelowThreshold = fadedBelowThreshold;
			}

			channelNumber++;
		}
	}
});

udpPort.on('error', error => {
	nodecg.log.warn('[osc] Error:', error.stack);
});

udpPort.on('open', () => {
	nodecg.log.info('[osc] Port open, can now communicate with a Behringer X32.');
});

udpPort.on('close', () => {
	nodecg.log.warn('[osc] Port closed.');
});

// Open the socket.
udpPort.open();

renewSubscriptions();
setInterval(renewSubscriptions, 10000);

/**
 * Renews subscriptions with the X32 (they expire every 10s).
 */
function renewSubscriptions() {
	udpPort.send({
		address: '/batchsubscribe',
		args: [
			// First defines the local endpoint that the X32 will send this subscription data to.
			{type: 's', value: '/chMutes'},
			{type: 's', value: '/mix/on'},
			{type: 'i', value: 0},
			{type: 'i', value: 63},
			{type: 'i', value: 10}
		]
	});

	udpPort.send({
		address: '/batchsubscribe',
		args: [
			// First defines the local endpoint that the X32 will send this subscription data to.
			{type: 's', value: '/chFaders'},
			{type: 's', value: '/mix/fader'},
			{type: 'i', value: 0},
			{type: 'i', value: 63},
			{type: 'i', value: 10}
		]
	});
}
