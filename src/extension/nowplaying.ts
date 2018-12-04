'use strict';

// Packages
import * as express from 'express';
import * as bodyParser from 'body-parser';
import debounce = require('lodash.debounce');

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';
import {NowPlaying} from '../types/schemas/nowPlaying';

const app = express();
const nodecg = nodecgApiContext.get();
const pulsing = nodecg.Replicant<boolean>('nowPlayingPulsing', {defaultValue: false, persistent: false});
const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying', {persistent: false});
let pulseTimeout: NodeJS.Timer;

nodecg.listenFor('pulseNowPlaying', pulse);

const changeSong = debounce(newSong => {
	nowPlaying.value = {
		game: newSong.game,
		title: newSong.title
	};

	// If the graphic is already showing, end it prematurely and show the new song
	if (pulsing.value) {
		clearTimeout(pulseTimeout);
		pulsing.value = false;
	}

	// Show the graphic
	pulse();
}, 2000);

app.use(bodyParser.json());
app.post(`/${nodecg.bundleName}/song`, (req, res, next) => {
	if (typeof req.body !== 'object') {
		res.sendStatus(400);
		return next();
	}

	if (nodecg.bundleConfig.nowPlayingKey && req.body.key !== nodecg.bundleConfig.nowPlayingKey) {
		return res.sendStatus(401);
	}

	changeSong(req.body);
	res.sendStatus(200);
});

nodecg.mount(app);

/**
 * Shows the nowPlaying graphic for 12 seconds.
 */
function pulse() {
	// Don't stack pulses
	if (pulsing.value) {
		return;
	}

	pulsing.value = true;

	// Hard-coded 12 second duration
	pulseTimeout = setTimeout(() => {
		pulsing.value = false;
	}, 12 * 1000);
}
