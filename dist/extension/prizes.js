'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const equal = require("deep-equal");
const numeral = require("numeral");
const request = require("request-promise-native");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const urls_1 = require("./urls");
const nodecg = nodecgApiContext.get();
const POLL_INTERVAL = 60 * 1000;
const currentPrizesRep = nodecg.Replicant('currentPrizes', { defaultValue: [] });
const allPrizesRep = nodecg.Replicant('allPrizes', { defaultValue: [] });
// Get initial data
update();
// Get latest prize data every POLL_INTERVAL milliseconds
setInterval(() => {
    update();
}, POLL_INTERVAL);
/**
 * Grabs the latest prizes from the tracker.
 */
async function update() {
    nodecg.sendMessage('prizes:updating');
    const currentPromise = request({
        uri: urls_1.GDQUrls.currentPrizes,
        json: true
    }).then(prizes => {
        const formattedPrizes = prizes.map(formatPrize);
        if (!equal(formattedPrizes, currentPrizesRep.value)) {
            currentPrizesRep.value = formattedPrizes;
        }
    });
    const allPromise = request({
        uri: urls_1.GDQUrls.allPrizes,
        json: true
    }).then(prizes => {
        const formattedPrizes = prizes.map(formatPrize);
        if (!equal(formattedPrizes, allPrizesRep.value)) {
            allPrizesRep.value = formattedPrizes;
        }
    });
    try {
        await Promise.all([
            currentPromise,
            allPromise
        ]);
    }
    catch (_error) { // tslint:disable-line:no-unused
        // Disregard error.
    }
    nodecg.sendMessage('prizes:updated');
}
/**
 * Formats a raw prize object from the GDQ Tracker API into a slimmed-down version for our use.
 * @param rawPrize - A raw prize object from the GDQ Tracker API.
 * @returns The formatted prize object.
 */
function formatPrize(rawPrize) {
    return {
        id: rawPrize.pk,
        name: rawPrize.fields.name,
        provided: rawPrize.fields.provider || rawPrize.fields.provided || 'Anonymous',
        description: rawPrize.fields.shortdescription || rawPrize.fields.name,
        image: rawPrize.fields.altimage,
        minimumbid: numeral(rawPrize.fields.minimumbid).format('$0,0[.]00'),
        grand: rawPrize.fields.category__name === 'Grand',
        sumdonations: rawPrize.fields.sumdonations,
        startrun: {
            id: rawPrize.fields.startrun,
            name: rawPrize.fields.startrun__display_name || 'Unknown',
            longName: rawPrize.fields.startrun__name || 'Unknown',
            order: rawPrize.fields.startrun__order
        },
        endrun: {
            id: rawPrize.fields.endrun,
            name: rawPrize.fields.endrun__display_name || 'Unknown',
            longName: rawPrize.fields.endrun__name || 'Unknown',
            order: rawPrize.fields.endrun__order
        },
        type: 'prize'
    };
}
//# sourceMappingURL=prizes.js.map