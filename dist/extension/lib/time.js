'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const events_1 = require("events");
// Packages
const parseMsToObj = require("parse-ms");
const convertUnitToMs = require("milliseconds");
/**
 * Constructs a new TimeStruct with the provided number of milliseconds.
 * @param milliseconds - The value to instantiate this TimeObject with, in milliseconds.
 * @returns A populated TimeStruct object.
 */
function createTimeStruct(milliseconds = 0) {
    const parsedTime = parseMilliseconds(milliseconds);
    // Can't use object spread because of https://github.com/Polymer/polymer-cli/issues/888
    // tslint:disable-next-line:prefer-object-spread
    return Object.assign({}, parsedTime, {
        formatted: formatMilliseconds(milliseconds),
        raw: milliseconds,
        timestamp: Date.now()
    });
}
exports.createTimeStruct = createTimeStruct;
/**
 * Formats a number of milliseconds into a string ([hh:]mm:ss).
 * @param inputMs - The number of milliseconds to format.
 * @returns  The formatted time sting.
 */
function formatMilliseconds(inputMs) {
    const { days, hours, minutes, seconds, milliseconds } = parseMilliseconds(inputMs);
    let str = '';
    if (days) {
        str += `${days}d `;
    }
    if (hours) {
        str += `${hours}:`;
    }
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');
    const tenths = milliseconds < 100 ? 0 : String(milliseconds).charAt(0);
    str += `${paddedMinutes}:${paddedSeconds}.${tenths}`;
    return str;
}
exports.formatMilliseconds = formatMilliseconds;
/**
 * Parses a number of milliseconds into a ParsedTime object.
 * @param milliseconds - A number of milliseconds.
 * @returns An object representing each dimension of the time.
 */
function parseMilliseconds(milliseconds) {
    return parseMsToObj(milliseconds);
}
exports.parseMilliseconds = parseMilliseconds;
/**
 * Parses a number of seconds into a ParsedTime object.
 * @param seconds - A number of seconds.
 * @returns An object representing each dimension of the time.
 */
function parseSeconds(seconds) {
    return parseMilliseconds(seconds * 1000);
}
exports.parseSeconds = parseSeconds;
/**
 * Parses a formatted time string into an integer of milliseconds.
 * @param timeString - The formatted time string to parse.
 * Accepts the following: hh:mm:ss.sss, hh:mm:ss, hh:mm, hh
 * @returns The parsed time string represented as milliseconds.
 */
function parseTimeString(timeString) {
    let ms = 0;
    const timeParts = timeString.split(':').filter(part => part.trim());
    if (timeParts.length === 3) {
        ms += convertUnitToMs.hours(parseInt(timeParts[0], 10));
        ms += convertUnitToMs.minutes(parseInt(timeParts[1], 10));
        ms += convertUnitToMs.seconds(parseFloat(timeParts[2]));
        return ms;
    }
    if (timeParts.length === 2) {
        ms += convertUnitToMs.minutes(parseInt(timeParts[0], 10));
        ms += convertUnitToMs.seconds(parseFloat(timeParts[1]));
        return ms;
    }
    if (timeParts.length === 1) {
        ms += convertUnitToMs.seconds(parseFloat(timeParts[0]));
        return ms;
    }
    throw new Error(`Unexpected format of timeString argument: ${timeString}`);
}
exports.parseTimeString = parseTimeString;
/**
 * A timer which counts down to a specified end time.
 */
class CountdownTimer extends events_1.EventEmitter {
    constructor(endTime, { tickRate = 100 } = {}) {
        super();
        this.interval = setInterval(() => {
            const currentTime = Date.now();
            const timeRemaining = Math.max(endTime - currentTime, 0);
            this.emit('tick', createTimeStruct(timeRemaining));
            if (timeRemaining <= 0) {
                this.emit('done');
            }
        }, tickRate);
    }
    stop() {
        clearInterval(this.interval);
    }
}
exports.CountdownTimer = CountdownTimer;
/**
 * A timer which counts up, with no specified end time.
 */
class CountupTimer extends events_1.EventEmitter {
    constructor({ tickRate = 100, offset = 0 } = {}) {
        super();
        const startTime = Date.now() - offset;
        this.interval = setInterval(() => {
            const currentTime = Date.now();
            const timeElapsed = currentTime - startTime;
            this.emit('tick', createTimeStruct(timeElapsed));
            if (timeElapsed <= 0) {
                this.emit('done');
            }
        }, tickRate);
    }
    stop() {
        clearInterval(this.interval);
    }
}
exports.CountupTimer = CountupTimer;
//# sourceMappingURL=time.js.map