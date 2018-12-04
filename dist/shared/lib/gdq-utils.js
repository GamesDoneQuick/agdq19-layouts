"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GAME_SCENE_NAME_REGEX = /^(Standard|Widescreen|GBA|Gameboy|3DS|DS|LttP|OoT|Mario|SM\/ALttP)/;
const preloadedImages = new Set();
const preloaderPromises = new Map();
/**
 * Preloads an image.
 * @param src - The URL of the new image to load.
 * @returns - A promise that is resolved if the load succeeds, and rejected it the load fails.
 */
function preloadImage(src) {
    if (preloadedImages.has(src)) {
        return Promise.resolve();
    }
    if (preloaderPromises.has(src)) {
        return preloaderPromises.get(src);
    }
    const preloadPromise = new Promise((resolve, reject) => {
        if (!src) {
            resolve();
            return;
        }
        const preloader = document.createElement('img');
        preloader.style.position = 'absolute';
        preloader.style.bottom = '0';
        preloader.style.left = '0';
        preloader.style.width = '1px';
        preloader.style.height = '1px';
        preloader.style.opacity = '0.01';
        const listeners = {
            load: null,
            error: null
        };
        listeners.load = event => {
            event.target.removeEventListener('error', listeners.error);
            event.target.removeEventListener('load', listeners.load);
            preloadedImages.add(src);
            resolve();
        };
        listeners.error = event => {
            event.target.removeEventListener('error', listeners.error);
            event.target.removeEventListener('load', listeners.load);
            reject(new Error(`Image failed to load: ${src}`));
        };
        preloader.addEventListener('load', listeners.load);
        preloader.addEventListener('error', listeners.error);
        preloader.src = src;
    });
    preloaderPromises.set(src, preloadPromise);
    return preloadPromise;
}
exports.preloadImage = preloadImage;
function isGameScene(sceneName) {
    if (!sceneName) {
        return false;
    }
    return Boolean(sceneName.match(GAME_SCENE_NAME_REGEX));
}
exports.isGameScene = isGameScene;
//# sourceMappingURL=gdq-utils.js.map