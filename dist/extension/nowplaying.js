'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express = require("express");
const bodyParser = require("body-parser");
const debounce = require("lodash.debounce");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const app = express();
const nodecg = nodecgApiContext.get();
const pulsing = nodecg.Replicant('nowPlayingPulsing', { defaultValue: false, persistent: false });
const nowPlaying = nodecg.Replicant('nowPlaying', { persistent: false });
let pulseTimeout;
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
//# sourceMappingURL=nowplaying.js.map