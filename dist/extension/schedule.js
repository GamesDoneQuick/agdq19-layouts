'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const assign = require("lodash.assign");
const clone = require("clone");
const deepEqual = require("deep-equal");
const events_1 = require("events");
const RequestPromise = require("request-promise-native");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const timer = require("./timekeeping");
const checklist = require("./checklist");
const urls_1 = require("./urls");
const diff_run_1 = require("./lib/diff-run");
const nodecg = nodecgApiContext.get();
const request = RequestPromise.defaults({ jar: true }); // <= Automatically saves and re-uses cookies.
const canSeekScheduleRep = nodecg.Replicant('canSeekSchedule');
const currentRunRep = nodecg.Replicant('currentRun');
const nextRunRep = nodecg.Replicant('nextRun');
const runnersRep = nodecg.Replicant('runners', { defaultValue: [], persistent: false });
const runOrderMap = nodecg.Replicant('runOrderMap', { defaultValue: {}, persistent: false });
const scheduleRep = nodecg.Replicant('schedule');
const emitter = new events_1.EventEmitter();
module.exports = emitter;
module.exports.update = update;
const TRACKER_CREDENTIALS_CONFIGURED = nodecg.bundleConfig.tracker.username &&
    nodecg.bundleConfig.tracker.password &&
    !nodecg.bundleConfig.useMockData;
const POLL_INTERVAL = 60 * 1000;
let updateInterval;
update();
// Get latest schedule data every POLL_INTERVAL milliseconds
updateInterval = setInterval(update, POLL_INTERVAL);
// Dashboard can invoke manual updates
nodecg.listenFor('updateSchedule', (_data, cb) => {
    nodecg.log.info('Manual schedule update button pressed, invoking update...');
    clearInterval(updateInterval);
    updateInterval = setInterval(update, POLL_INTERVAL);
    update().then(updated => {
        if (updated) {
            nodecg.log.info('Schedule successfully updated');
        }
        else {
            nodecg.log.info('Schedule unchanged, not updated');
        }
        if (cb && !cb.handled) {
            cb(null, updated);
        }
    }, error => {
        if (cb && !cb.handled) {
            cb(error);
        }
    });
});
nodecg.listenFor('nextRun', (_data, cb) => {
    if (!canSeekScheduleRep.value) {
        nodecg.log.error('Attempted to seek to nextRun while seeking was forbidden.');
        if (cb && !cb.handled) {
            cb();
        }
        return;
    }
    _seekToNextRun();
    if (cb && !cb.handled) {
        cb();
    }
});
nodecg.listenFor('previousRun', (_data, cb) => {
    if (!canSeekScheduleRep.value) {
        nodecg.log.error('Attempted to seek to previousRun while seeking was forbidden.');
        if (cb && !cb.handled) {
            cb();
        }
        return;
    }
    _seekToPreviousRun();
    if (cb && !cb.handled) {
        cb();
    }
});
nodecg.listenFor('setCurrentRunByOrder', (order, cb) => {
    if (typeof order !== 'number') {
        nodecg.log.error('Attempted to seek to a non-numeric order:', order);
        if (cb && !cb.handled) {
            cb();
        }
        return;
    }
    if (!canSeekScheduleRep.value) {
        nodecg.log.error('Attempted to seek to arbitrary run order %s while seeking was forbidden.', order);
        if (cb && !cb.handled) {
            cb();
        }
        return;
    }
    try {
        _seekToArbitraryRun(order);
    }
    catch (e) {
        nodecg.log.error(e);
        if (cb && !cb.handled) {
            cb(e);
        }
        return;
    }
    if (cb && !cb.handled) {
        cb();
    }
    return;
});
nodecg.listenFor('modifyRun', (data, cb) => {
    // We lose any properties that have an explicit value of `undefined` in the serialization process.
    // We need those properties to still exist so our diffing code can work as expected.
    // A property not existing is not the same thing as a property existing but having a value of undefined.
    data.runners = (data.runners || []).map(runner => {
        if (!runner || typeof runner !== 'object') {
            runner = {}; // tslint:disable-line:no-parameter-reassignment
        }
        if (!{}.hasOwnProperty.call(runner, 'name')) {
            runner.name = undefined;
        }
        if (!{}.hasOwnProperty.call(runner, 'stream')) {
            runner.stream = undefined;
        }
        return runner;
    });
    let run;
    if (currentRunRep.value && currentRunRep.value.pk === data.pk) {
        run = currentRunRep.value;
    }
    else if (nextRunRep.value && nextRunRep.value.pk === data.pk) {
        run = nextRunRep.value;
    }
    if (run) {
        const original = findRunByPk(run.pk);
        if (original) {
            if (run === original) {
                nodecg.log.error('[schedule:modifyRun] run and original are same object!');
                return;
            }
            assign(run, data);
            run.originalValues = diff_run_1.calcOriginalValues(run, original);
        }
        else {
            nodecg.log.error('[modifyRun] Found current/next run, but couldn\'t find original in schedule. Aborting.');
        }
    }
    else {
        console.warn('[modifyRun] run not found:', data);
    }
    if (typeof cb === 'function') {
        cb();
    }
});
nodecg.listenFor('resetRun', (pk, cb) => {
    if (typeof pk !== 'number') {
        nodecg.log.error('Attempted to reset a run by a non-number pk:', pk);
        if (cb && !cb.handled) {
            cb();
        }
        return;
    }
    let runRep;
    if (currentRunRep.value && currentRunRep.value.pk === pk) {
        runRep = currentRunRep;
    }
    else if (nextRunRep.value && nextRunRep.value.pk === pk) {
        runRep = nextRunRep;
    }
    if (runRep) {
        runRep.value = clone(findRunByPk(pk));
        if (runRep.value && {}.hasOwnProperty.call(runRep.value, 'originalValues')) {
            nodecg.log.error('%s had an `originalValues` property after being reset! This is bad! Deleting it...', runRep.value.name);
            delete runRep.value.originalValues;
        }
    }
    if (typeof cb === 'function') {
        cb();
    }
});
/**
 * Gets the latest schedule info from the GDQ tracker.
 * @returns A a promise resolved with "true" if the schedule was updated, "false" if unchanged.
 */
async function update() {
    const runnersPromise = request({
        uri: urls_1.GDQUrls.runners,
        json: true
    });
    const runsPromise = request({
        uri: urls_1.GDQUrls.runs,
        json: true
    });
    const adsPromise = TRACKER_CREDENTIALS_CONFIGURED ?
        request({
            uri: urls_1.GDQUrls.ads,
            json: true
        }) : Promise.resolve([]);
    const interviewsPromise = TRACKER_CREDENTIALS_CONFIGURED ?
        request({
            uri: urls_1.GDQUrls.interviews,
            json: true
        }) : Promise.resolve([]);
    try {
        const [runnersJSON, runsJSON, adsJSON, interviewsJSON] = await Promise.all([
            runnersPromise, runsPromise, adsPromise, interviewsPromise
        ]);
        const formattedRunners = [];
        runnersJSON.forEach((obj) => {
            formattedRunners[obj.pk] = {
                stream: obj.fields.stream.split('/').filter(Boolean).pop(),
                name: obj.fields.name
            };
        });
        if (!deepEqual(formattedRunners, runnersRep.value)) {
            runnersRep.value = clone(formattedRunners);
        }
        const formattedSchedule = calcFormattedSchedule({
            rawRuns: runsJSON,
            formattedRunners,
            formattedAds: adsJSON.map(formatAd),
            formattedInterviews: interviewsJSON.map(formatInterview)
        });
        // If nothing has changed, return.
        if (deepEqual(formattedSchedule, scheduleRep.value)) {
            return false;
        }
        scheduleRep.value = formattedSchedule;
        const newRunOrderMap = {};
        runsJSON.forEach((run) => {
            newRunOrderMap[run.fields.name] = run.fields.order;
        });
        runOrderMap.value = newRunOrderMap;
        /* If no currentRun is set, set currentRun to the first run.
         * Else, update the currentRun by pk, merging with and local changes.
         */
        if (!currentRunRep.value || currentRunRep.value.order === undefined) {
            _seekToArbitraryRun(1);
        }
        else {
            const currentRunAsInSchedule = findRunByPk(currentRunRep.value.pk);
            // If our current nextRun replicant value not match the actual next run in the schedule anymore,
            // throw away our current nextRun and replace it with the new next run in the schedule.
            // This can only happen for two reasons:
            //     1) The nextRun was deleted from the schedule.
            //     2) A new run was added between currentRun and nextRun.
            const newNextRun = _findRunAfter(currentRunRep.value);
            if (!newNextRun || !nextRunRep.value || newNextRun.pk !== nextRunRep.value.pk) {
                nextRunRep.value = clone(newNextRun);
            }
            /* If currentRun was found in the schedule, merge any changes from the schedule into currentRun.
             * Else if currentRun has been removed from the schedule (determined by its `pk`),
             * set currentRun to whatever run now has currentRun's `order` value.
             * If that fails, set currentRun to the final run in the schedule.
             */
            if (currentRunAsInSchedule) {
                [currentRunRep, nextRunRep].forEach(activeRunReplicant => {
                    if (activeRunReplicant.value && activeRunReplicant.value.pk) {
                        const runFromSchedule = findRunByPk(activeRunReplicant.value.pk);
                        if (runFromSchedule) {
                            activeRunReplicant.value = diff_run_1.mergeChangesFromTracker(activeRunReplicant.value, runFromSchedule);
                        }
                    }
                });
            }
            else {
                try {
                    _seekToArbitraryRun(Math.max(currentRunRep.value.order - 1, 1));
                }
                catch (e) {
                    if (e.message === 'Could not find run at specified order.') {
                        const lastRunInSchedule = formattedSchedule.slice(0).reverse().find(item => item.type === 'run');
                        _seekToArbitraryRun(lastRunInSchedule);
                    }
                    else {
                        throw e;
                    }
                }
            }
        }
        return true;
    }
    catch (error) {
        const response = error.response;
        const actualError = error.error || error;
        if (response && response.statusCode === 403) {
            nodecg.log.warn('[schedule] Permission denied, refreshing session and trying again...');
            emitter.emit('permissionDenied');
        }
        else if (response) {
            nodecg.log.error('[schedule] Failed to update, got status code', response.statusCode);
        }
        else {
            nodecg.log.error('[schedule] Failed to update:', actualError);
        }
        return false;
    }
}
/**
 * Seeks to the previous run in the schedule, updating currentRun and nextRun accordingly.
 * Clones the value of currentRun into nextRun.
 * Sets currentRun to the predecessor run.
 */
function _seekToPreviousRun() {
    if (!currentRunRep.value) {
        return;
    }
    const prevRun = scheduleRep.value.slice(0).reverse().find((item) => {
        if (item.type !== 'run') {
            return false;
        }
        return item.order < currentRunRep.value.order; // tslint:disable-line:no-non-null-assertion
    });
    nextRunRep.value = clone(currentRunRep.value);
    currentRunRep.value = (prevRun && prevRun.type === 'run') ? clone(prevRun) : null;
    checklist.reset();
    timer.reset();
}
/**
 * Seeks to the next run in the schedule, updating currentRun and nextRun accordingly.
 * Clones the value of nextRun into currentRun.
 * Sets nextRun to the new successor run.
 */
function _seekToNextRun() {
    if (!nextRunRep.value) {
        return;
    }
    const newNextRun = _findRunAfter(nextRunRep.value);
    currentRunRep.value = clone(nextRunRep.value);
    nextRunRep.value = clone(newNextRun);
    checklist.reset();
    timer.reset();
}
/**
 * Finds the first run that comes after a given run.
 * Will return undefined if this is the last run in the schedule.
 * @param runOrOrder - Either a run order or a run object to set as the new currentRun.
 * @returns The next run. If this is the last run, then undefined.
 */
function _findRunAfter(runOrOrder) {
    const run = _resolveRunOrOrder(runOrOrder);
    const foundRun = scheduleRep.value.find((item) => {
        if (item.type !== 'run') {
            return false;
        }
        return item.order > run.order;
    });
    if (foundRun && foundRun.type === 'run') {
        return foundRun;
    }
    return null;
}
/**
 * Sets the currentRun replicant to an arbitrary run, first checking if that run is previous or next,
 * relative to any existing currentRun.
 * If so, call _seekToPreviousRun or _seekToNextRun, accordingly. This preserves local changes.
 * Else, blow away currentRun and nextRun and replace them with the new run and its successor.
 * @param runOrOrder - Either a run order or a run object to set as the new currentRun.
 */
function _seekToArbitraryRun(runOrOrder) {
    const run = _resolveRunOrOrder(runOrOrder);
    if (nextRunRep.value && run.order === nextRunRep.value.order) {
        _seekToNextRun();
    }
    else {
        currentRunRep.value = clone(run);
        const newNextRun = _findRunAfter(run);
        nextRunRep.value = clone(newNextRun);
        checklist.reset();
        timer.reset();
    }
}
/**
 * Generates a formatted schedule.
 * @param formattedRunners - A pre-formatted array of hydrated runner objects.
 * @param scheduleJSON - The raw schedule array from the Tracker.
 * @returns A formatted schedule.
 */
function calcFormattedSchedule({ rawRuns, formattedRunners, formattedAds, formattedInterviews }) {
    const flatSchedule = [
        ...rawRuns.map(run => {
            return formatRun(run, formattedRunners);
        }),
        ...formattedAds,
        ...formattedInterviews
    ].sort(suborderSort);
    const schedule = [];
    let adBreak;
    flatSchedule.forEach((item, index) => {
        if (item.type === 'ad') {
            if (!adBreak) {
                adBreak = {
                    id: -1,
                    type: 'adBreak',
                    ads: []
                };
            }
            adBreak.ads.push(item);
            // Always make the ID of the entire break be equal to the ID of the last item in that break.
            adBreak.id = item.id;
            const nextItem = flatSchedule[index + 1];
            if (nextItem && nextItem.type === 'ad') {
                return;
            }
            schedule.push(adBreak);
            adBreak = null;
            return;
        }
        schedule.push(item);
    });
    return schedule;
}
/**
 * Formats a raw run object from the GDQ Tracker API into a slimmed-down and hydrated version for our use.
 * @param rawRun - A raw run object from the GDQ Tracker API.
 * @param formattedRunners - The formatted array of all runners, used to hydrate the run's runners.
 * @returns The formatted run object.
 */
function formatRun(rawRun, formattedRunners) {
    const runners = rawRun.fields.runners.slice(0, 4).map((runnerId) => {
        return {
            name: formattedRunners[runnerId].name,
            stream: formattedRunners[runnerId].stream
        };
    });
    return {
        name: rawRun.fields.display_name || 'Unknown',
        longName: rawRun.fields.name || 'Unknown',
        console: rawRun.fields.console || 'Unknown',
        commentators: rawRun.fields.commentators || 'Unknown',
        category: rawRun.fields.category || 'Any%',
        setupTime: rawRun.fields.setup_time,
        order: rawRun.fields.order,
        estimate: rawRun.fields.run_time || 'Unknown',
        releaseYear: rawRun.fields.release_year || '',
        runners,
        notes: rawRun.fields.tech_notes || '',
        coop: rawRun.fields.coop || false,
        id: rawRun.pk,
        pk: rawRun.pk,
        type: 'run'
    };
}
/**
 * Formats a raw ad object from the GDQ Tracker API into a slimmed-down version for our use.
 * @param rawAd - A raw ad object from the GDQ Tracker API.
 * @returns The formatted ad object.
 */
function formatAd(rawAd) {
    return {
        id: rawAd.pk,
        name: rawAd.fields.ad_name,
        adType: calcAdType(rawAd.fields.filename),
        filename: rawAd.fields.filename,
        duration: rawAd.fields.length,
        order: rawAd.fields.order,
        suborder: rawAd.fields.suborder,
        sponsorName: rawAd.fields.sponsor_name,
        type: 'ad'
    };
}
/**
 * We completely ignore the ad_type field from the tracker because it's been wrong
 * a few too many times. And when its wrong, everything explodes.
 * It's safer just to compute the type ourselves based on the filename.
 * @param filename - The name of the file, with extension included.
 * @returns The type of this ad.
 */
function calcAdType(filename) {
    if (filename.endsWith('.mp4') ||
        filename.endsWith('.webm') ||
        filename.endsWith('.mov') ||
        filename.endsWith('.avi')) {
        return 'VIDEO';
    }
    if (filename.endsWith('.png') ||
        filename.endsWith('.jpg') ||
        filename.endsWith('.jpeg')) {
        return 'IMAGE';
    }
    throw new Error(`Unexpected ad type! Filename: "${filename}"`);
}
/**
 * Formats a raw interview object from the GDQ Tracker API into a slimmed-down version for our use.
 * @param rawInterview - A raw interview object from the GDQ Tracker API.
 * @returns The formatted interview object.
 */
function formatInterview(rawInterview) {
    return {
        id: rawInterview.pk,
        interviewees: splitString(rawInterview.fields.interviewees),
        interviewers: splitString(rawInterview.fields.interviewers),
        duration: rawInterview.fields.length,
        order: rawInterview.fields.order,
        subject: rawInterview.fields.subject,
        suborder: rawInterview.fields.suborder,
        type: 'interview'
    };
}
/**
 * Splits a comma-separated string into an array of strings, trimming whitespace.
 * @param str - The string to split.
 * @return The split string.
 */
function splitString(str) {
    return str.split(',')
        .map(part => part.trim())
        .filter(part => part);
}
/**
 * Sorts objects by their `order` property, then by their `suborder` property.
 * @param a - The first item in the current sort operation.
 * @param b - The second item in the current sort operation.
 * @returns A number expressing which of these two items comes first in the sort.
 */
function suborderSort(a, b) {
    const orderDiff = a.order - b.order;
    if (orderDiff !== 0) {
        return orderDiff;
    }
    if ('suborder' in a && !('suborder' in b)) {
        return 1;
    }
    if (!('suborder' in a) && 'suborder' in b) {
        return -1;
    }
    return a.suborder - b.suborder;
}
/**
 * Disambiguates a variable that could either be a run object or a numeric run order.
 * @param runOrOrder - Either a run order or a run object to set as the new currentRun.
 * @returns The resolved run object.
 */
function _resolveRunOrOrder(runOrOrder) {
    let run;
    if (typeof runOrOrder === 'number') {
        run = findRunByOrder(runOrOrder);
    }
    else if (typeof runOrOrder === 'object') {
        run = runOrOrder;
    }
    if (!run) {
        throw new Error(`Could not find run at specified order "${runOrOrder}".`);
    }
    return run;
}
/**
 * Searches scheduleRep for a run with the given `order`.
 * @param order - The order of the run to find.
 * @returns The found run, or undefined if not found.
 */
function findRunByOrder(order) {
    const foundRun = scheduleRep.value.find((item) => {
        return item.type === 'run' && item.order === order;
    });
    if (foundRun && foundRun.type === 'run') {
        return foundRun;
    }
    return null;
}
/**
 * Searches scheduleRep for a run with the given `pk` (or `id`).
 * @param pk - The id or pk of the run to find.
 * @returns The found run, or undefined if not found.
 */
function findRunByPk(pk) {
    const foundRun = scheduleRep.value.find((item) => {
        return item.type === 'run' && item.id === pk;
    });
    if (foundRun && foundRun.type === 'run') {
        return foundRun;
    }
    return null;
}
//# sourceMappingURL=schedule.js.map