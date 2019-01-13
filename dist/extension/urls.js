'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const EVENT_ID = nodecg.bundleConfig.tracker.eventId;
const MOCK_URLS = {
    ads: 'https://www.dropbox.com/s/p04aoahtx6hv10i/ads.json?dl=1',
    allBids: 'https://www.dropbox.com/s/1gysv511t97sab5/allBids.json?dl=1',
    allPrizes: 'https://www.dropbox.com/s/rpiisscgszwhguc/allPrizes.json?dl=1',
    currentBids: 'https://www.dropbox.com/s/87n9tdh4qp72yps/currentBids.json?dl=1',
    currentPrizes: 'https://www.dropbox.com/s/rpiisscgszwhguc/currentPrizes.json?dl=1',
    interviews: 'https://www.dropbox.com/s/kr8279xxnrzsyp4/interviews.json?dl=1',
    runners: 'https://www.dropbox.com/s/lmhh2tctyrvipdr/runners.json?dl=1',
    runs: 'https://www.dropbox.com/s/7njvyl80m34b46s/schedule.json?dl=1',
    total: 'https://www.dropbox.com/s/h7qivvpn4izmbi5/total.json?dl=1',
    login: trackerUrlFactory('/admin/login/')
};
const PRODUCTION_URLS = {
    ads: trackerUrlFactory(`/gdq/ads/${EVENT_ID}/`),
    allBids: trackerUrlFactory(`/search/?type=allbids&event=${EVENT_ID}`),
    allPrizes: trackerUrlFactory(`/search/?type=prize&event=${EVENT_ID}`),
    currentBids: trackerUrlFactory(`/search/?type=allbids&feed=current&event=${EVENT_ID}`),
    currentPrizes: trackerUrlFactory(`/search/?type=prize&feed=current&event=${EVENT_ID}`),
    interviews: trackerUrlFactory(`/gdq/interviews/${EVENT_ID}/`),
    runners: trackerUrlFactory(`/search?type=runner&event=${EVENT_ID}`),
    runs: trackerUrlFactory(`/search?type=run&event=${EVENT_ID}`),
    total: trackerUrlFactory(`/${EVENT_ID}?json`),
    login: trackerUrlFactory('/admin/login/')
};
function trackerUrlFactory(route) {
    return nodecg.bundleConfig.tracker.baseUrl + route;
}
let urlsDict = PRODUCTION_URLS;
if (nodecg.bundleConfig.useMockData) {
    urlsDict = MOCK_URLS;
}
exports.GDQUrls = urlsDict; // tslint:disable-line:variable-name
//# sourceMappingURL=urls.js.map