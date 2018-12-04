'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const request = require("request-promise-native");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const TimeUtils = require("./lib/time");
const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:twitch`);
const timeSince = nodecg.Replicant('twitch:timeSinceLastAd', { defaultValue: TimeUtils.createTimeStruct() });
const timeLeft = nodecg.Replicant('twitch:timeLeftInAd', { defaultValue: TimeUtils.createTimeStruct() });
const canPlayTwitchAd = nodecg.Replicant('twitch:canPlayAd');
const stopwatch = nodecg.Replicant('stopwatch');
const CANT_PLAY_REASONS = {
    AD_IN_PROGRESS: 'ad in progress',
    RUN_IN_PROGRESS: 'run in progress',
    ON_COOLDOWN: 'on cooldown',
    NONE: ''
};
let timeSinceTimer;
let timeLeftTimer;
// Load the existing timeSince and timeLeft and resume at the appropriate time.
if (timeSince.value.raw > 0) {
    const missedMilliseconds = Date.now() - timeSince.value.timestamp;
    resetTimeSinceTicker(timeSince.value.raw + missedMilliseconds);
}
if (timeLeft.value.raw > 0) {
    const missedMilliseconds = Date.now() - timeLeft.value.timestamp;
    resetTimeLeftTicker(timeLeft.value.raw - missedMilliseconds);
}
[timeLeft, timeSince, stopwatch].forEach(replicant => {
    replicant.on('change', () => {
        updateCanPlay();
    });
});
nodecg.listenFor('twitch:playAd', (durationSeconds) => {
    if (!canPlayTwitchAd.value.canPlay) {
        log.error('Requested Twitch ad when it was not allowed (%s)', canPlayTwitchAd.value.reason);
        return;
    }
    log.info('Requesting %d second Twitch ad...', durationSeconds);
    request({
        method: 'post',
        uri: `https://api.twitch.tv/kraken/channels/${nodecg.bundleConfig.twitch.channelId}/commercial`,
        headers: {
            Accept: 'application/vnd.twitchtv.v5+json',
            Authorization: `OAuth ${nodecg.bundleConfig.twitch.oauthToken}`,
            'Client-ID': nodecg.bundleConfig.twitch.clientId,
            'Content-Type': 'application/json'
        },
        body: { length: durationSeconds },
        json: true
    }).then(res => {
        resetTimeSinceTicker();
        resetTimeLeftTicker((durationSeconds + 15) * 1000);
        if (res.Length === durationSeconds) {
            log.info('Successfully started %d second Twitch Ad.', res.Length);
        }
        else {
            log.info('Successfully started %d second Twitch Ad, but we requested %d seconds.', res.Length, durationSeconds);
        }
    }).catch(err => {
        log.error('Failed to start %d second Twitch Ad:\n\t', durationSeconds, err);
    });
});
function resetTimeSinceTicker(startingMilliseconds = 0) {
    if (timeSinceTimer) {
        timeSinceTimer.stop();
        timeSinceTimer.removeAllListeners();
    }
    timeSince.value = TimeUtils.createTimeStruct(startingMilliseconds);
    timeSinceTimer = new TimeUtils.CountupTimer({ offset: startingMilliseconds });
    timeSinceTimer.on('tick', elapsedTimeStruct => {
        timeSince.value = elapsedTimeStruct;
    });
}
function resetTimeLeftTicker(durationMilliseconds) {
    if (timeLeftTimer) {
        timeLeftTimer.stop();
        timeLeftTimer.removeAllListeners();
    }
    if (durationMilliseconds < 0) {
        timeLeft.value = TimeUtils.createTimeStruct(0);
        return;
    }
    timeLeft.value = TimeUtils.createTimeStruct(durationMilliseconds);
    timeLeftTimer = new TimeUtils.CountdownTimer(Date.now() + durationMilliseconds);
    timeLeftTimer.on('tick', elapsedTimeStruct => {
        timeLeft.value = elapsedTimeStruct;
    });
}
/**
 * Updates the value of the canPlayTwitchAd replicant, based on the state of
 * the timeLeft, timeSince, and stopwatch Replicants.
 */
function updateCanPlay() {
    if (timeLeft.value.raw > 0) {
        canPlayTwitchAd.value.canPlay = false;
        canPlayTwitchAd.value.reason = CANT_PLAY_REASONS.AD_IN_PROGRESS;
        return;
    }
    if (timeSince.value.raw > 0 && timeSince.value.raw < 480 * 1000) {
        canPlayTwitchAd.value.canPlay = false;
        canPlayTwitchAd.value.reason = CANT_PLAY_REASONS.ON_COOLDOWN;
        return;
    }
    if (stopwatch.value.state !== "not_started" /* NOT_STARTED */ &&
        stopwatch.value.state !== "finished" /* FINISHED */) {
        canPlayTwitchAd.value.canPlay = false;
        canPlayTwitchAd.value.reason = CANT_PLAY_REASONS.RUN_IN_PROGRESS;
        return;
    }
    canPlayTwitchAd.value.canPlay = true;
    canPlayTwitchAd.value.reason = CANT_PLAY_REASONS.NONE;
}
//# sourceMappingURL=twitch-ads.js.map