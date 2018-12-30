'use strict';

// Packages
import {OBSUtility} from 'nodecg-utility-obs';
import * as ObsWebsocketJs from 'obs-websocket-js'; // tslint:disable-line:no-implicit-dependencies

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import {CurrentLayout} from '../types/schemas/currentLayout';
import {ObsCyclingRecordings} from '../types/schemas/obs_cyclingRecordings';
import * as gdqUtils from '../../dist/shared/lib/gdq-utils';
import {StreamStatus} from '../types/schemas/streamStatus';

const nodecg = nodecgApiContext.get();

// We track what _layout_ is active, not necessarily what _scene_ is active.
// A given layout can be on multiple scenes.
const currentLayout = nodecg.Replicant<CurrentLayout>('currentLayout');
const cyclingRecordingsRep = nodecg.Replicant<ObsCyclingRecordings>('obs_cyclingRecordings', {persistent: false});
const compositingOBS = new OBSUtility(nodecg, {namespace: 'compositingOBS'});
const recordingOBS = new OBSUtility(nodecg, {namespace: 'recordingOBS'});
const encodingOBS = new OBSUtility(nodecg, {namespace: 'encodingOBS'});

compositingOBS.replicants.programScene.on('change', (newVal: ObsWebsocketJs.Scene) => {
	if (!newVal) {
		return;
	}

	newVal.sources.some(source => {
		if (!source.name) {
			return false;
		}

		const lowercaseSourceName = source.name.toLowerCase();
		if (lowercaseSourceName.indexOf('layout') === 0) {
			currentLayout.value = lowercaseSourceName.replace(/ /g, '_').replace('layout_', '');
			return true;
		}

		return false;
	});
});

// This should probably be in nodecg-utility-obs.
// For now, leaving it here.
// Come back and refactor this eventually.
[compositingOBS, recordingOBS, encodingOBS].forEach(obs => {
	const replicant = nodecg.Replicant<StreamStatus>(`${obs.namespace}:streamStatus`, {persistent: false});
	obs.on('StreamStatus', data => {
		replicant.value = {
			'bytes-per-sec': data['bytes-per-sec'],
			'encode-skipped': (data as any)['encode-skipped'] as number,
			'encode-total': (data as any)['encode-total'] as number,
			fps: data.fps,
			'kbits-per-sec': data['kbits-per-sec'],
			'num-dropped-frames': data['num-dropped-frames'],
			'num-total-frames': data['num-total-frames'],
			recording: data.recording,
			'render-skipped': (data as any)['render-skipped'] as number,
			'render-total': (data as any)['render-total'] as number,
			strain: data.strain,
			'stream-timecode': (data as any)['stream-timecode'] as string,
			streaming: data.streaming,
			'total-stream-time': data['total-stream-time']
		};
	});
});

compositingOBS.replicants.previewScene.on('change', (newVal: any) => {
	if (!newVal || !newVal.name) {
		return;
	}

	// Hide the transition graphic on gameplay scenes when they are in preview.
	if (gdqUtils.isGameScene(newVal.name)) {
		// Abort if the PVW scene is also the PGM scene.
		if (newVal.name === compositingOBS.replicants.programScene.value.name) {
			return;
		}

		compositingOBS.send('SetSceneItemRender', {
			'scene-name': newVal.name,
			source: 'Transition Graphic',
			render: false
		}).catch((error: Error) => {
			nodecg.log.error(`Failed to hide Transition Graphic on scene "${newVal.name}":`, error);
		});
	}
});

compositingOBS.on('TransitionBegin', data => {
	if (data.name !== 'Blank Stinger') {
		return;
	}

	if (data['to-scene']) {
		// Show the Transition Graphic on the scene which is being transitioned to.
		compositingOBS.send('SetSceneItemRender', {
			'scene-name': data['to-scene'],
			source: 'Transition Graphic',
			render: true
		}).catch((error: Error) => {
			nodecg.log.error(`Failed to show Transition Graphic on scene "${data['to-scene']}":`, error);
		});
	}
});

compositingOBS.on('SwitchScenes', (data: any) => {
	const actualPgmSceneName = data['scene-name'];
	const pvwSceneName = compositingOBS.replicants.previewScene.value && compositingOBS.replicants.previewScene.value.name;
	const pgmSceneName = compositingOBS.replicants.programScene.value && compositingOBS.replicants.programScene.value.name;
	const actualPvwSceneName = actualPgmSceneName === pvwSceneName ? pgmSceneName : pvwSceneName;

	if (actualPvwSceneName === 'Break') {
		return;
	}

	// Abort if the PVW scene is also the PGM scene.
	if (actualPvwSceneName === actualPgmSceneName) {
		return;
	}

	// Hide the transition graphic on gameplay scenes when they are in preview.
	if (gdqUtils.isGameScene(actualPvwSceneName)) {
		compositingOBS.send('SetSceneItemRender', {
			'scene-name': actualPvwSceneName,
			source: 'Transition Graphic',
			render: false
		}).catch((error: Error) => {
			nodecg.log.error(`Failed to hide Transition Graphic on scene "${actualPvwSceneName}":`, error);
		});
	}
});

async function cycleRecording(obs: OBSUtility) {
	return new Promise((resolve, reject) => {
		let rejected = false;
		const timeout = setTimeout(() => {
			rejected = true;
			reject(new Error(`Timed out waiting for ${obs.namespace} to stop recording.`));
		}, 30000);

		const recordingStoppedListener = () => {
			if (rejected) {
				return;
			}

			obs.log.info('Recording stopped.');
			clearTimeout(timeout);

			setTimeout(() => {
				resolve();
			}, 2500);
		};

		obs.once('RecordingStopped', recordingStoppedListener);
		obs.send('StopRecording').catch(error => {
			if (error.error === 'recording not active') {
				obs.removeListener('RecordingStopped', recordingStoppedListener);
				resolve();
			} else {
				obs.log.error(error);
				reject(error);
			}
		});
	}).then(async () => {
		return obs.send('StartRecording');
	});
}

export async function resetCropping() {
	return (compositingOBS as any).send('ResetCropping').catch((error: Error) => {
		nodecg.log.error('resetCropping error:', error);
	});
}

export async function setCurrentScene(sceneName: string) {
	return compositingOBS.send('SetCurrentScene', {
		'scene-name': sceneName
	});
}

export async function cycleRecordings() {
	nodecg.log.info('Cycling recordings...');
	cyclingRecordingsRep.value = true;

	try {
		const cycleRecordingPromises = [];
		if ((recordingOBS as any)._connected) {
			cycleRecordingPromises.push(cycleRecording(recordingOBS));
		} else {
			nodecg.log.error('Recording OBS is disconnected! Not cycling its recording.');
		}

		if ((compositingOBS as any)._connected) {
			cycleRecordingPromises.push(cycleRecording(compositingOBS));
		} else {
			nodecg.log.error('Compositing OBS is disconnected! Not cycling its recording.');
		}

		if ((encodingOBS as any)._connected) {
			cycleRecordingPromises.push(cycleRecording(encodingOBS));
		} else {
			nodecg.log.error('Encoding OBS is disconnected! Not cycling its recording.');
		}

		if (cycleRecordingPromises.length <= 0) {
			nodecg.log.warn('No instances of OBS are connected, aborting cycleRecordings.');
			return;
		}

		await Promise.all(cycleRecordingPromises);

		nodecg.log.info('Recordings successfully cycled.');
		cyclingRecordingsRep.value = false;
		nodecg.sendMessage('obs:recordingsCycled');
	} catch (error) {
		cyclingRecordingsRep.value = false;
		nodecg.sendMessage('obs:recordingsCycled', error);
		throw error;
	}
}

export function compositingOBSConnected() {
	return (compositingOBS as any)._connected;
}
