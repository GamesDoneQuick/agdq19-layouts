'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const events_1 = require("events");
// Packages
const equals = require("deep-equal");
const osc = require("osc");
const CasparCG = require("casparcg-connection");
const debounce = require("lodash.debounce");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
let foregroundFileName = '';
let currentFrame = 0;
let durationFrames = 0;
let fileMayHaveRestarted = false;
let updateFilesInterval;
let ignoreForegroundUntilNextPlay = false;
const nodecg = nodecgApiContext.get();
const log = new nodecg.Logger(`${nodecg.bundleName}:caspar`);
const currentRun = nodecg.Replicant('currentRun');
const files = nodecg.Replicant('caspar_files', { persistent: false });
const connected = nodecg.Replicant('caspar_connected');
const connection = new CasparCG.CasparCG({
    host: nodecg.bundleConfig.casparcg.host,
    port: nodecg.bundleConfig.casparcg.port,
    onConnected() {
        connected.value = true;
        log.info('Connected.');
        clearInterval(updateFilesInterval);
        updateFiles();
        updateFilesInterval = setInterval(updateFiles, 30000);
        if (nodecg.bundleConfig.casparcg.lockSecret) {
            connection.lock(1, CasparCG.Enum.Lock.ACQUIRE, nodecg.bundleConfig.casparcg.lockSecret).then(() => {
                log.info('Lock acquired.');
            }).catch(e => {
                log.error('Failed to acquire lock:', e);
                connected.value = false;
            });
        }
    },
    onDisconnected() {
        connected.value = false;
        log.warn('Disconnected.');
    },
    onLog(str) {
        if (nodecg.bundleConfig.casparcg.debug) {
            log.info(str);
        }
    },
    onError(error) {
        log.error(error);
    }
});
connection.clear(1);
function play(filename) {
    log.info('Attempting to play %s...', filename);
    return connection.play(1, 0, filename).then(() => {
        ignoreForegroundUntilNextPlay = false;
    });
}
exports.play = play;
async function info() {
    return connection.info(1);
}
exports.info = info;
async function loadbgAuto(filename) {
    return connection.loadbgAuto(1, undefined, filename, false, CasparCG.Enum.Transition.CUT);
}
exports.loadbgAuto = loadbgAuto;
async function clear(doResetState = true) {
    await connection.clear(1);
    if (doResetState) {
        resetState();
    }
}
exports.clear = clear;
async function stop() {
    return connection.stop(1).then(resetState);
}
exports.stop = stop;
function resetState() {
    foregroundFileName = '';
    currentFrame = 0;
    durationFrames = 0;
    fileMayHaveRestarted = false;
    ignoreForegroundUntilNextPlay = true;
}
exports.resetState = resetState;
exports.replicants = {
    files
};
exports.oscEvents = new events_1.EventEmitter();
nodecg.listenFor('caspar:play', module.exports.play);
const udpPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: nodecg.bundleConfig.casparcg.localOscPort,
    metadata: true
});
const emitForegroundChanged = debounce(() => {
    log.info('Media began playing: %s, %s, %s', new Date().toISOString(), foregroundFileName, currentRun.value ? currentRun.value.name : 'Unknown Run');
    exports.oscEvents.emit('foregroundChanged', foregroundFileName);
}, 250);
udpPort.on('message', message => {
    const args = message.args;
    if (message.address === '/channel/1/stage/layer/0/file/frame') {
        const newCurrentFrame = args[0].value.low;
        const newDurationFrames = args[1].value.low;
        if (currentFrame !== newCurrentFrame || durationFrames !== newDurationFrames) {
            if (newCurrentFrame < currentFrame) {
                process.nextTick(() => {
                    fileMayHaveRestarted = true;
                });
            }
            currentFrame = newCurrentFrame;
            durationFrames = newDurationFrames;
            exports.oscEvents.emit('frameChanged', currentFrame, durationFrames);
        }
    }
    else if (message.address === '/channel/1/stage/layer/0/file/path') {
        const fileChanged = args[0].value !== foregroundFileName;
        if ((fileChanged || fileMayHaveRestarted) && !ignoreForegroundUntilNextPlay) {
            foregroundFileName = args[0].value;
            emitForegroundChanged();
        }
        fileMayHaveRestarted = false;
    }
});
udpPort.on('error', error => {
    log.warn('[osc] Error:', error.stack);
});
udpPort.on('open', () => {
    log.info('[osc] Port open, can now receive events from CasparCG.');
});
udpPort.on('close', () => {
    log.warn('[osc] Port closed.');
});
// Open the socket.
udpPort.open();
let isFirstFilesUpdate = true;
/**
 * Updates the caspar_files replicant.
 */
function updateFiles() {
    if (!connected.value) {
        return;
    }
    connection.cls().then(reply => {
        // Filter out invalid responses.
        const remapped = reply.response.data.filter((data) => {
            if (typeof data !== 'object' || data === null) {
                return false;
            }
            return data.hasOwnProperty('name');
        });
        // Don't update the replicant if nothing has changed.
        if (equals(remapped, files.value)) {
            return;
        }
        // Update the replicant.
        files.value = remapped;
        if (isFirstFilesUpdate) {
            exports.oscEvents.emit('initialized');
            isFirstFilesUpdate = false;
        }
    }).catch(e => {
        log.error('Error updating files:', e);
    });
}
//# sourceMappingURL=caspar.js.map