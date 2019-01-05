'use strict';

// Native
import * as fs from 'fs';
import * as path from 'path';

// Packages
import * as clone from 'clone';
import debounce = require('lodash.debounce');
import schemaDefaults = require('json-schema-defaults');

// Ours
import * as caspar from './caspar';
import * as nodecgApiContext from './util/nodecg-api-context';
import * as obs from './obs';
import * as mixer from './mixer';
import * as TimeUtils from './lib/time';
import * as GDQTypes from '../types';
import {CurrentIntermission} from '../types/schemas/currentIntermission';
import {CanSeekSchedule} from '../types/schemas/canSeekSchedule';
import {Stopwatch} from '../types/schemas/stopwatch';
import {CasparMissingFiles} from '../types/schemas/caspar_missingFiles';

const AD_LOG_PATH = 'logs/ad_log.csv';

let currentAdBreak: GDQTypes.AdBreak | null = null;
let currentlyPlayingAd: GDQTypes.Ad | null = null;
let nextAd: GDQTypes.Ad | null = null;
let cancelledAdBreak = false;
const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:intermission`);
const currentIntermission = nodecg.Replicant<CurrentIntermission>('currentIntermission');
const canSeekSchedule = nodecg.Replicant<CanSeekSchedule>('canSeekSchedule');
const currentRun = nodecg.Replicant<GDQTypes.Run>('currentRun');
const schedule = nodecg.Replicant<GDQTypes.ScheduleItem[]>('schedule');
const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');
const missingFilesRep = nodecg.Replicant<CasparMissingFiles>('caspar_missingFiles', {persistent: false});
const schemasPath = path.resolve(__dirname, '../../schemas/');
const adBreakSchema = JSON.parse(fs.readFileSync(path.join(schemasPath, 'types/adBreak.json'), 'utf8'));
const adSchema = JSON.parse(fs.readFileSync(path.join(schemasPath, 'types/ad.json'), 'utf8'));
const debouncedUpdateCurrentIntermissionContent = debounce(_updateCurrentIntermissionContent, 33);
const debouncedUpdateCurrentIntermissionState = debounce(_updateCurrentIntermissionState, 33);
const debounceWarnForMissingFiles = debounce(_warnForMissingFiles, 1000);
const clearableTimeouts = new Set();
const clearableIntervals = new Set();

currentRun.on('change', (newVal, oldVal) => {
	if (!newVal) {
		return;
	}

	if (!oldVal || newVal.order !== oldVal.order) {
		debouncedUpdateCurrentIntermissionContent();
	}
});

schedule.on('change', () => {
	debouncedUpdateCurrentIntermissionContent();
	debounceWarnForMissingFiles();
});

stopwatch.on('change', (newVal, oldVal) => {
	checkCanSeek();

	if (!oldVal || (hasRunStarted() ? 'post' : 'pre') !== currentIntermission.value.preOrPost) {
		return debouncedUpdateCurrentIntermissionContent();
	}

	if (newVal.state !== oldVal.state) {
		debouncedUpdateCurrentIntermissionState();
	}
});

caspar.replicants.files.on('change', () => {
	debouncedUpdateCurrentIntermissionState();
	debounceWarnForMissingFiles();
});

mixer.replicants.adsChannel.on('change', () => {
	debouncedUpdateCurrentIntermissionState();
});

nodecg.listenFor('intermissions:startAdBreak', async (adBreakId: number) => {
	const adBreak = currentIntermission.value.content.find((item: GDQTypes.IntermissionContentItem) => {
		return item.type === 'adBreak' && item.id === adBreakId;
	});

	if (!adBreak) {
		log.error(`Failed to start ad break: Could not find adBreak ID #${adBreakId} in currentIntermission.`);
		return;
	}

	if (adBreak.type !== 'adBreak') {
		log.error('Impossible');
		return;
	}

	cancelledAdBreak = false;
	currentAdBreak = adBreak;

	try {
		checkCanSeek();

		await caspar.clear(false);
		await obs.setCurrentScene('Advertisements');
		await sleep(2000);
		await playAd(adBreak.ads[0]);

		adBreak.state.canStart = false;
		adBreak.state.cantStartReason = GDQTypes.CantStartReasonsEnum.ALREADY_STARTED;
		adBreak.state.started = true;
	} catch (error) {
		log.error('Failed to start ad break:', error);
	}
});

nodecg.listenFor('intermissions:cancelAdBreak', (adBreakId: number) => {
	const adBreak = currentIntermission.value.content.find((item: GDQTypes.IntermissionContentItem) => {
		return item.type === 'adBreak' && item.id === adBreakId;
	});

	if (!adBreak) {
		log.error(`Failed to cancel ad break: Could not find adBreak ID #${adBreakId} in currentIntermission.`);
		return;
	}

	log.warn(`Cancelling adBreak ID #${adBreakId}!`);
	cancelledAdBreak = true;
	currentAdBreak = null;
	currentlyPlayingAd = null;
	clearableTimeouts.forEach(timeout => clearTimeout(timeout));
	clearableTimeouts.clear();
	clearableIntervals.forEach(interval => clearInterval(interval));
	clearableIntervals.clear();
	caspar.clear().then(() => {
		_updateCurrentIntermissionContent();
	}).catch(err => {
		log.error('Failed to clear Caspar:', err);
	});
	obs.setCurrentScene('Break').catch((e: Error) => {
		log.error('Failed to set scene back to "Break" after cancelling ad break:', e);
	});
});

nodecg.listenFor('intermissions:completeAdBreak', (adBreakId: number) => {
	const adBreak = currentIntermission.value.content.find((item: GDQTypes.IntermissionContentItem) => {
		return item.type === 'adBreak' && item.id === adBreakId;
	});

	if (!adBreak) {
		log.error(`Failed to complete ad break: Could not find adBreak ID #${adBreakId} in currentIntermission.`);
		return;
	}

	if (adBreak.type !== 'adBreak') {
		log.error('Impossible');
		return;
	}

	if (adBreak === currentAdBreak) {
		finishCurrentAdBreak();
	} else {
		finishAdBreak(adBreak);
	}
});

nodecg.listenFor('intermissions:completeImageAd', (adId: number) => {
	if (!currentlyPlayingAd) {
		log.error(`Tried to mark image ad ID #${adId} as complete, but no ad is currently playing.`);
		return;
	}

	if (adId !== currentlyPlayingAd.id) {
		log.error(`Tried to mark image ad ID #${adId} as complete, but it wasn't the currentlyPlayingAd.`);
		return;
	}

	finishAd(currentlyPlayingAd);

	if (nextAd) {
		playAd(nextAd).catch((e: Error) => {
			log.error('Failed to play ad:', e);
		});
	} else {
		log.error(`Marked image ad ID #${adId} as complete, but there was no nextAd!`);
	}
});

caspar.oscEvents.on('foregroundChanged', filename => {
	if (cancelledAdBreak) {
		return;
	}

	if (!currentAdBreak) {
		// There will be some cases where this is *not* an error, such as
		// if we play another outro video like the one Bestban made for AGDQ2017.
		// However, this is rare enough that I'm comfortable leaving this as an error log,
		// which will ping me in Slack. - Lange 2017/06/20
		log.error(
			`"${filename}" started playing in CasparCG, but no adBreak is active.`,
			'Letting it play, no action will be taken.'
		);
		return;
	}

	// Images include the media folder name in the path, but videos don't... dumb.
	if (filename.startsWith('media/')) {
		filename = filename.replace('media/', ''); // tslint:disable-line:no-parameter-reassignment
	}

	let indexOfAdThatJustStarted = -1;
	const adThatJustStarted = currentAdBreak.ads.find((ad, index) => {
		const filenameNoExt = filename.split('.').slice(0, -1).join('.');
		const regexp = new RegExp(`^${filenameNoExt}`, 'i');
		const match = regexp.test(ad.filename);
		if (match && ad.state.completed === false) {
			indexOfAdThatJustStarted = index;
			return true;
		}
		return false;
	});
	if (!adThatJustStarted) {
		currentlyPlayingAd = null;
		currentAdBreak = null;
		log.error(
			`"${filename}" started playing in CasparCG, but it did not correspond to any ad in the current adBreak.`,
			'Caspar will now be cleared to get us back into a predictable state.',
		);
		caspar.clear().then(() => {
			checkCanSeek();
		}).catch(err => {
			log.error('Failed to clear Caspar:', err);
		});
		return;
	}

	if (adThatJustStarted.state.started) {
		return;
	}

	currentlyPlayingAd = adThatJustStarted;
	adThatJustStarted.state.started = true;
	adThatJustStarted.state.canStart = false;

	const adThatJustCompleted = indexOfAdThatJustStarted > 0 ?
		currentAdBreak.ads[indexOfAdThatJustStarted - 1] :
		null;
	if (adThatJustCompleted && !adThatJustCompleted.state.completed) {
		finishAd(adThatJustCompleted);
	}

	nextAd = currentAdBreak.ads[indexOfAdThatJustStarted + 1];
	let nextAdFilenameNoExt;
	if (nextAd) {
		nextAdFilenameNoExt = path.parse(nextAd.filename).name;
		caspar.loadbgAuto(nextAdFilenameNoExt).catch(e => {
			log.error('Failed to play ad:', e);
		});
	} else if (currentlyPlayingAd.adType.toLowerCase() === 'video') {
		const frameTime = 1000 / adThatJustStarted.state.fps;
		const timeout = setTimeout(() => {
			if (!currentlyPlayingAd) {
				log.warn('Had no currentlyPlayingAd after the timeout, that\'s weird.');
				caspar.clear().catch(err => {
					log.error('Failed to clear Caspar:', err);
				});
				return;
			}

			if (currentlyPlayingAd.adType.toLowerCase() === 'video') {
				finishCurrentAdBreak();
			}
		}, frameTime * adThatJustStarted.state.durationFrames);
		clearableTimeouts.add(timeout);
	}

	if (adThatJustStarted.adType.toLowerCase() === 'image') {
		const MS_PER_FRAME = 1000 / 60;
		const startTime = Date.now();
		const interval = setInterval(() => {
			adThatJustStarted.state.frameNumber = Math.min(
				(Date.now() - startTime) / MS_PER_FRAME,
				adThatJustStarted.state.durationFrames
			);

			adThatJustStarted.state.framesLeft =
				adThatJustStarted.state.durationFrames - adThatJustStarted.state.frameNumber;

			if (adThatJustStarted.state.framesLeft <= 0) {
				clearInterval(interval);
				adThatJustStarted.state.canComplete = true;
				if (!nextAd && currentAdBreak) {
					currentAdBreak.state.canComplete = true;
				}
			}
		}, MS_PER_FRAME);
		clearableIntervals.add(interval);
	}
});

function finishAd(ad: GDQTypes.Ad) {
	try {
		writeAdToLog(ad);
	} catch (error) {
		nodecg.log.error('writeAdToLog failed:', error);
	}

	ad.state.started = true;
	ad.state.canStart = false;
	ad.state.completed = true;
	ad.state.canComplete = false;
	ad.state.framesLeft = 0;
	ad.state.frameNumber = ad.state.durationFrames;
}

function finishAdBreak(adBreak: GDQTypes.AdBreak) {
	adBreak.state.started = true;
	adBreak.state.canStart = false;
	adBreak.state.cantStartReason = GDQTypes.CantStartReasonsEnum.ALREADY_COMPLETED;
	adBreak.state.completed = true;
	adBreak.state.canComplete = false;
}

function finishCurrentAdBreak() {
	caspar.clear().catch(err => {
		log.error('Failed to clear Caspar:', err);
	});

	if (currentlyPlayingAd) {
		finishAd(currentlyPlayingAd);
	}

	if (currentAdBreak) {
		finishAdBreak(currentAdBreak);
	}

	currentAdBreak = null;
	currentlyPlayingAd = null;
	obs.setCurrentScene('Break').catch((e: Error) => {
		log.error('Failed to set scene back to "Break" after completing ad break:', e);
	});
	checkCanSeek();
}

caspar.oscEvents.on('frameChanged', (currentFrame, durationFrames) => {
	if (currentlyPlayingAd && currentlyPlayingAd.adType.toLowerCase() === 'video') {
		currentlyPlayingAd.state.frameNumber = currentFrame;
		currentlyPlayingAd.state.framesLeft = durationFrames - currentFrame;
	}
});

function playAd(ad: GDQTypes.Ad) {
	const adFilenameNoExt = path.parse(ad.filename).name;
	caspar.resetState();
	return caspar.play(adFilenameNoExt);
}

/**
 * Sets the `preOrPost` and `content` properties of the currentIntermission replicant.
 */
function _updateCurrentIntermissionContent() {
	if (!currentRun.value || !stopwatch.value || !schedule.value) {
		return;
	}

	// If we're in an adBreak right now, bail out.
	if (currentAdBreak) {
		return;
	}

	// If the timer hasn't started yet, use the intermission between the previous run and currentRun.
	// Else, use the intermission between currentRun and nextRun.
	currentIntermission.value = {
		preOrPost: calcPreOrPost(),
		content: calcIntermissionContent()
	};
	console.log(currentIntermission.value);

	_updateCurrentIntermissionState();
	checkCanSeek();
}

/**
 * Updates the `state` property of individual content items within the currentIntermission replicant.
 */
function _updateCurrentIntermissionState() {
	if (!currentIntermission.value || !caspar.replicants.files.value) {
		return;
	}

	let allPriorAdBreaksAreComplete = true;
	currentIntermission.value.content.forEach((item: GDQTypes.IntermissionContentItem) => {
		if (item.type !== 'adBreak') {
			return;
		}

		item.state.canStart = true;
		item.state.cantStartReason = '';

		if (mixer.replicants.adsChannel.value.fadedBelowThreshold) {
			item.state.canStart = false;
			item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.MIXER_FADED;
		} else if (mixer.replicants.adsChannel.value.muted) {
			item.state.canStart = false;
			item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.MIXER_MUTED;
		}

		if (item.state.started) {
			item.state.canStart = false;
			item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.ALREADY_STARTED;
		}

		if (item.state.completed) {
			item.state.canStart = false;
			item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.ALREADY_COMPLETED;
		}

		if (!allPriorAdBreaksAreComplete) {
			item.state.canStart = false;
			item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.PRIOR_BREAK_INCOMPLETE;
		}

		if (hasRunFinished()) {
			item.state.canStart = false;
			item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.MUST_ADVANCE_SCHEDULE;
		} else if (hasRunStarted()) {
			item.state.canStart = false;
			item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.RUN_ACTIVE;
		}

		if (!item.state.completed) {
			allPriorAdBreaksAreComplete = false;
		}

		let oneOrMoreAdsMissingFile = false;
		item.ads.forEach(ad => {
			const casparFile = caspar.replicants.files.value.find(file => {
				const regexp = new RegExp(`^${file.name}`, 'i');
				return regexp.test(ad.filename);
			});

			if (!casparFile) {
				ad.state.hasFile = false;
				oneOrMoreAdsMissingFile = true;
				return;
			}

			ad.state.hasFile = true;

			if (casparFile.type.toLowerCase() === 'video') {
				ad.state.durationFrames = casparFile.frames;
				ad.state.fps = casparFile.frameRate;
			} else if (casparFile.type.toLowerCase() === 'image') {
				ad.state.durationFrames = (TimeUtils.parseTimeString(ad.duration) / 1000) * 60;
				ad.state.fps = 60;
			} else {
				log.error('Unexpected file type from CasparCG:', casparFile);
			}
		});

		if (oneOrMoreAdsMissingFile) {
			item.state.canStart = false;
			item.state.cantStartReason = GDQTypes.CantStartReasonsEnum.MISSING_FILES;
		}
	});
}

/**
 * Calculates what the contents of `currentIntermission` should be based on the values of
 * `currentRun`, `schedule`, and whether the currentRun has started or not.
 * @returns - The intermission content.
 */
function calcIntermissionContent() {
	const preOrPost = calcPreOrPost();
	const intermissionContent: GDQTypes.IntermissionContentItem[] = [];
	const scheduleContent = preOrPost === 'pre' ?
		schedule.value.slice(0).reverse() :
		schedule.value;

	let foundCurrentRun = false;
	scheduleContent.some((item: GDQTypes.ScheduleItem) => {
		if (currentRun.value && item.id === currentRun.value.id) {
			foundCurrentRun = true;
			return false;
		}

		if (foundCurrentRun) {
			if (item.type === 'run') {
				return true;
			}

			const clonedItem = clone(item);
			if (clonedItem.type === 'adBreak') {
				clonedItem.state = schemaDefaults(adBreakSchema.properties.state);
				clonedItem.ads.forEach((ad: GDQTypes.Ad) => {
					ad.state = schemaDefaults(adSchema.properties.state);
				});
			}
			intermissionContent.push(clonedItem);
		}

		return false;
	});

	return preOrPost === 'pre' ? intermissionContent.reverse() : intermissionContent;
}

/**
 * Returns true if the current run has begun, false otherwise.
 * @returns Whether or not the current run has started.
 */
function hasRunStarted() {
	return stopwatch.value.state !== 'not_started';
}

/**
 * Returns true if the current run has completed, false otherwise.
 * @returns Whether or not the current run has finished.
 */
function hasRunFinished() {
	return stopwatch.value.state === 'finished';
}

function checkCanSeek() {
	// If the timer is running, disallow seeking.
	if (stopwatch.value.state === 'running') {
		canSeekSchedule.value = false;
		return;
	}

	// If an ad break is in progress, disallow seeking.
	if (currentAdBreak) {
		canSeekSchedule.value = false;
		return;
	}

	// Else, allow seeking.
	canSeekSchedule.value = true;
}

/**
 * Writes detailed information about an ad to the ad log.
 * @param ad - The ad to log.
 */
function writeAdToLog(ad: GDQTypes.Ad) {
	const data = [
		ad.id,
		new Date().toISOString(),
		ad.adType,
		ad.sponsorName,
		ad.name,
		ad.filename,
		currentRun.value ? currentRun.value.name : 'Unknown Run'
	];

	const logStr = data.join(', ');
	log.info('Ad successfully completed:', logStr);

	// If the ad log does not exist yet, create it and add the header row.
	if (!fs.existsSync(AD_LOG_PATH)) {
		const headerRow = 'id, timestamp, type, sponsor_name, ad_name, file_name, current_run\n';
		fs.writeFileSync(AD_LOG_PATH, headerRow);
	}

	// Append this ad play to the ad log.
	fs.appendFile(AD_LOG_PATH, logStr + '\n', err => {
		if (err) {
			log.error('Error appending to log:', err.stack);
		}
	});
}

function _warnForMissingFiles() {
	if (!schedule.value || !caspar.replicants.files.value) {
		return;
	}

	const warnedFiles = new Set();

	// Log an error for every ad which is missing its corresponding file in CasparCG.
	schedule.value.forEach((item: GDQTypes.ScheduleItem) => {
		if (item.type !== 'adBreak') {
			return;
		}

		item.ads.forEach((ad: GDQTypes.Ad) => {
			const casparFile = caspar.replicants.files.value.find(file => {
				const regexp = new RegExp(`^${file.name}`, 'i');
				return regexp.test(ad.filename);
			});

			if (!casparFile && !warnedFiles.has(ad.filename)) {
				log.error(`Ad points to file that does not exist in CasparCG: ${ad.filename}`);
				warnedFiles.add(ad.filename);
			}
		});
	});

	missingFilesRep.value = Array.from(warnedFiles);
}

async function sleep(milliseconds: number) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, milliseconds);
	});
}

function isFinalRun() {
	const lastRun = schedule.value.slice(0).reverse().find(item => {
		return item.type === 'run';
	});
	if (!lastRun) {
		return false;
	}
	return currentRun.value.id === lastRun.id;
}

function calcPreOrPost() {
	let preOrPost: 'post' | 'pre';
	if (isFinalRun()) {
		console.log('is final run!');
		preOrPost = 'post';
	} else if (hasRunStarted()) {
		console.log('run has started!');
		preOrPost = 'post';
	} else {
		console.log('else!');
		preOrPost = 'pre';
	}
	return preOrPost;
}
