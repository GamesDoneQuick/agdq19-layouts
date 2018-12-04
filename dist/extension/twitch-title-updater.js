"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const request = require("request-promise-native");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:twitch`);
const currentRun = nodecg.Replicant('currentRun');
let lastLongName;
currentRun.on('change', (newVal) => {
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
//# sourceMappingURL=twitch-title-updater.js.map