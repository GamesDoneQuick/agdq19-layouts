'use strict';

const path = require('path');

const BUNDLE_NAME = require('../../package.json').name;
const MAX_LOWERTHIRD_NAMES = 5;
const STANDARD_DELAY = 375;
const FINISHED_DELAY = 2000;
const STANDARD_REPLICANT_PREFILLS = {
	allBids: undefined,
	allPrizes: undefined,
	currentBids: undefined,
	currentIntermission: undefined,
	currentPrizes: undefined,
	currentRun: undefined,
	'interview:names': undefined,
	recordTrackerEnabled: undefined,
	scores: undefined,
	stopwatch: undefined,
	total: undefined,
	tweets: undefined
};

const transitionBefore = function (page) {
	return page.evaluate(async () => {
		await document.querySelector('gdq-transition').waitForInit(); // eslint-disable-line no-undef
	});
};

module.exports = {
	BUNDLE_CONFIG: {},
	TEST_CASES: [{
		route: `bundles/${BUNDLE_NAME}/graphics/break.html`,
		additionalDelay: 1000,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/break.html`,
		nameAppendix: 'fanart',
		additionalDelay: 2000,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS,
		before: async page => {
			const tweet = require(path.resolve(__dirname, '../fixtures/arguments/tweet.json'));
			await page.evaluate(t => {
				return new Promise(resolve => {
					const tl = document.querySelector('gdq-break').$.fanart.playItem(t); // eslint-disable-line no-undef
					tl.call(() => {
						resolve();
					}, null, null, '+=0.03');
				});
			}, tweet);
		}
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/transition.html`,
		nameAppendix: 'initial',
		selector: 'gdq-transition',
		entranceMethodName: null,
		additionalDelay: STANDARD_DELAY,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS,
		before: transitionBefore
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/transition.html`,
		nameAppendix: 'fromOpenToClosed',
		selector: 'gdq-transition',
		entranceMethodName: 'fromOpenToClosed',
		additionalDelay: STANDARD_DELAY,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS,
		before: transitionBefore
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/transition.html`,
		nameAppendix: 'fromClosedToOpen',
		selector: 'gdq-transition',
		entranceMethodName: 'fromClosedToOpen',
		entranceMethodArgs: [{fadeOutVideos: true}],
		additionalDelay: STANDARD_DELAY,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS,
		before: transitionBefore
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/transition.html`,
		nameAppendix: 'fromPartialToClosed',
		selector: 'gdq-transition',
		entranceMethodName: 'fromPartialToClosed',
		additionalDelay: STANDARD_DELAY,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS,
		before: transitionBefore
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/transition.html`,
		nameAppendix: 'fromClosedToPartial',
		selector: 'gdq-transition',
		entranceMethodName: 'fromClosedToPartial',
		entranceMethodArgs: [{fadeOutVideos: true}],
		additionalDelay: STANDARD_DELAY,
		replicantPrefills: {
			...STANDARD_REPLICANT_PREFILLS,
			currentHost: undefined,
			nowPlaying: undefined
		},
		before: transitionBefore
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/interview.html`,
		nameAppendix: 'blank',
		additionalDelay: STANDARD_DELAY,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/lttp_tracker.html`,
		additionalDelay: 1500,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/omnibar.html`,
		additionalDelay: STANDARD_DELAY,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS
	}, {
		route: `bundles/${BUNDLE_NAME}/graphics/widescreen_2_mario.html`,
		additionalDelay: STANDARD_DELAY,
		replicantPrefills: STANDARD_REPLICANT_PREFILLS
	}]
};

const gameplayLayoutTestCases = [{
	route: `bundles/${BUNDLE_NAME}/graphics/3ds.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/ds.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/ds_vertical.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/gameboy_1.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/gameboy_2.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/gameboy_3.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/gameboy_4.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/gba_1.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/gba_2.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/gba_4.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/standard_1.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS,
	coopTests: [2, 4]
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/standard_1_smalttp.html`,
	replicantPrefills: {
		smalttpData: undefined
	}
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/standard_2_sms.html`,
	replicantPrefills: {
		'bingosync:board': undefined
	}
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/standard_4_ff4fe.html`,
	replicantPrefills: {
		ff4feRandoBoards: undefined
	}
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/standard_2.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/standard_3.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/standard_4.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/widescreen_1.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/widescreen_2.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/widescreen_4.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}, {
	route: `bundles/${BUNDLE_NAME}/graphics/widescreen_4_2.html`,
	additionalDelay: STANDARD_DELAY,
	replicantPrefills: STANDARD_REPLICANT_PREFILLS
}];

gameplayLayoutTestCases.forEach(testCase => {
	module.exports.TEST_CASES.push({
		...testCase,
		nameAppendix: 'not_started',
		replicantPrefills: {
			...STANDARD_REPLICANT_PREFILLS,
			...testCase.replicantPrefills,
			gameAudioChannels: [{
				sd: {muted: false, fadedBelowThreshold: false},
				hd: {muted: false, fadedBelowThreshold: false}
			}, {
				sd: {muted: false, fadedBelowThreshold: false},
				hd: {muted: false, fadedBelowThreshold: false}
			}, {
				sd: {muted: false, fadedBelowThreshold: false},
				hd: {muted: false, fadedBelowThreshold: false}
			}, {
				sd: {muted: false, fadedBelowThreshold: false},
				hd: {muted: false, fadedBelowThreshold: false}
			}]
		}
	}, {
		...testCase,
		nameAppendix: 'running',
		replicantPrefills: {
			...STANDARD_REPLICANT_PREFILLS,
			...testCase.replicantPrefills,
			stopwatch: {
				state: 'running',
				time: {
					days: 0,
					hours: 1,
					minutes: 2,
					seconds: 3,
					milliseconds: 400,
					formatted: '1:02:03.4',
					raw: 3723400,
					timestamp: 1526531543450
				},
				results: [
					null,
					null,
					null,
					null
				]
			}
		}
	}, {
		...testCase,
		nameAppendix: 'finished',
		additionalDelay: FINISHED_DELAY,
		replicantPrefills: {
			...STANDARD_REPLICANT_PREFILLS,
			...testCase.replicantPrefills,
			stopwatch: {
				state: 'finished',
				time: {
					days: 0,
					hours: 1,
					minutes: 2,
					seconds: 3,
					milliseconds: 400,
					formatted: '1:02:03.4',
					raw: 3723400,
					timestamp: 1526531543450
				},
				results: [{
					time: {
						days: 0,
						hours: 1,
						minutes: 2,
						seconds: 3,
						milliseconds: 400,
						formatted: '1:02:03.4',
						raw: 3723400,
						timestamp: 1526589137479
					},
					place: 1,
					forfeit: false
				}, {
					time: {
						days: 0,
						hours: 1,
						minutes: 2,
						seconds: 3,
						milliseconds: 400,
						formatted: '1:02:03.4',
						raw: 3723400,
						timestamp: 1526589137479
					},
					place: 2,
					forfeit: true
				}, {
					time: {
						days: 0,
						hours: 1,
						minutes: 2,
						seconds: 3,
						milliseconds: 400,
						formatted: '1:02:03.4',
						raw: 3723400,
						timestamp: 1526589137479
					},
					place: 3,
					forfeit: false
				}, {
					time: {
						days: 0,
						hours: 1,
						minutes: 2,
						seconds: 3,
						milliseconds: 400,
						formatted: '1:02:03.4',
						raw: 3723400,
						timestamp: 1526589137479
					},
					place: 4,
					forfeit: false
				}]
			}
		}
	});

	if (testCase.coopTests) {
		testCase.coopTests.forEach(numberOfRunners => {
			module.exports.TEST_CASES.push({
				...testCase,
				nameAppendix: `coop_${numberOfRunners}`,
				replicantPrefills: {
					...STANDARD_REPLICANT_PREFILLS,
					...testCase.replicantPrefills,
					currentRun: {
						name: 'Pre-Show',
						longName: 'Pre-Show',
						console: 'Unknown',
						commentators: 'Unknown',
						category: 'Hype',
						setupTime: '0',
						order: 1,
						estimate: '0:32:00',
						releaseYear: '',
						runners: [
							{name: 'SpikeVegeta', stream: 'spikevegeta'},
							{name: 'Blechy', stream: 'bellery_'},
							{name: 'Protomagicalgirl', stream: 'protomagicalgirl'},
							{name: 'JHobz', stream: 'jhobz296'}
						].slice(0, numberOfRunners),
						notes: '',
						coop: true,
						id: 2640,
						pk: 2640,
						type: 'run'
					}
				}
			});
		});
	}
});

// Interview lowerthird tests.
for (let i = 1; i <= MAX_LOWERTHIRD_NAMES; i++) {
	module.exports.TEST_CASES.push({
		route: `bundles/${BUNDLE_NAME}/graphics/interview.html`,
		nameAppendix: `lowerthird-${i}`,
		selector: 'gdq-lowerthird',
		entranceMethodName: 'show',
		entranceMethodArgs: [[
			{name: 'one wwwwwWWWWWwwwwwWWWWWwwwwwWWWWW', title: 'one title WWWWWwwwwwWWWWWwwwww'},
			{name: 'two', title: 'two title'},
			{name: 'three wwwwwWWWWWwwwwwWWWWWwwwwwWWWWW', title: 'three title WWWWWwwwwwWWWWWwwwww'},
			{name: 'four', title: ''},
			{name: 'five wwwwwWWWWWwwwwwWWWWWwwwwwWWWWW', title: 'five title WWWWWwwwwwWWWWWwwwww'}
		].slice(0, i)],
		additionalDelay: STANDARD_DELAY
	});
}
