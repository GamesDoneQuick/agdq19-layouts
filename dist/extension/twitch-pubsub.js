"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const TwitchPubSub = require("twitchps");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const DEBUG = nodecg.bundleConfig.twitch.debug;
const BITS_TOTAL_UPDATE_INTERVAL = 10 * 1000;
const log = new nodecg.Logger(`${nodecg.bundleName}:twitch-pubsub`);
const autoUpdateTotal = nodecg.Replicant('autoUpdateTotal');
const bitsTotal = nodecg.Replicant('bits:total');
autoUpdateTotal.on('change', (newVal) => {
    if (newVal) {
        updateBitsTotal();
    }
});
// Optional reconnect, debug options (Defaults: reconnect: true, debug: false)
// var ps = new TwitchPS({init_topics: init_topics});
const pubsub = new TwitchPubSub({
    init_topics: [{
            topic: `channel-bits-events-v1.${nodecg.bundleConfig.twitch.channelId}`,
            token: nodecg.bundleConfig.twitch.oauthToken
        }, {
            topic: `channel-subscribe-events-v1.${nodecg.bundleConfig.twitch.channelId}`,
            token: nodecg.bundleConfig.twitch.oauthToken
        }],
    reconnect: true,
    debug: DEBUG
});
pubsub.on('connected', () => {
    log.info('Connected to PubSub.');
});
pubsub.on('disconnected', () => {
    log.warn('Disconnected from PubSub.');
});
pubsub.on('reconnect', () => {
    log.info('Reconnecting to PubSub...');
});
pubsub.on('bits', (cheer) => {
    if (DEBUG) {
        log.info('Received cheer:', cheer);
    }
    nodecg.sendMessage('cheer', cheer);
});
pubsub.on('subscribe', (subscription) => {
    if (DEBUG) {
        log.info('Received subscription:', subscription);
    }
    nodecg.sendMessage('subscription', subscription);
});
updateBitsTotal();
setInterval(updateBitsTotal, BITS_TOTAL_UPDATE_INTERVAL);
function updateBitsTotal() {
    bitsTotal.value = 0;
}
//# sourceMappingURL=twitch-pubsub.js.map