const GAME_SCENE_NAME_REGEX = /^(Standard|Widescreen|GBA|Gameboy|3DS|DS|LttP|OoT|Mario|SM\/ALttP)/;
const preloadedImages = new Set();
const preloaderPromises = new Map();
/**
 * Preloads an image.
 * @param src - The URL of the new image to load.
 * @returns - A promise that is resolved if the load succeeds, and rejected it the load fails.
 */
export function preloadImage(src) {
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
export function isGameScene(sceneName) {
    if (!sceneName) {
        return false;
    }
    return Boolean(sceneName.match(GAME_SCENE_NAME_REGEX));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2RxLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0scUJBQXFCLEdBQUcsb0VBQW9FLENBQUM7QUFFbkcsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNsQyxNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFFcEM7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsR0FBVztJQUN2QyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDN0IsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDekI7SUFFRCxJQUFJLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMvQixPQUFPLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNsQztJQUVELE1BQU0sY0FBYyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3RELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDVCxPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU87U0FDUDtRQUVELE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEQsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUM3QixTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7UUFDM0IsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzlCLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMvQixTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFakMsTUFBTSxTQUFTLEdBR1g7WUFDSCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxJQUFJO1NBQ1gsQ0FBQztRQUVGLFNBQVMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQUU7WUFDeEIsS0FBSyxDQUFDLE1BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVELEtBQUssQ0FBQyxNQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRCxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDO1FBRUYsU0FBUyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsRUFBRTtZQUN6QixLQUFLLENBQUMsTUFBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUQsS0FBSyxDQUFDLE1BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFELE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQztRQUVGLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25ELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXJELFNBQVMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3JCLENBQUMsQ0FBQyxDQUFDO0lBRUgsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMzQyxPQUFPLGNBQWMsQ0FBQztBQUN2QixDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxTQUFpQjtJQUM1QyxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2YsT0FBTyxLQUFLLENBQUM7S0FDYjtJQUVELE9BQU8sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUMifQ==