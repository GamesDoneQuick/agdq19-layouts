/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base: (new () => Polymer.Element)) => { // tslint:disable-line:no-unnecessary-type-annotation
	class MapSortMixin extends base {
		_sortMapVal: string[] | null = null;

		ready() {
			this._createMapSort = this._createMapSort.bind(this);
			super.ready();
		}

		_createMapSort(idKey: string) {
			return (a: any, b: any) => {
				if (!this._sortMapVal) {
					return 0;
				}

				const aMapIndex = a ? this._sortMapVal.indexOf(a[idKey]) : -1;
				const bMapIndex = b ? this._sortMapVal.indexOf(b[idKey]) : -1;

				if (aMapIndex >= 0 && bMapIndex < 0) {
					return -1;
				}

				if (aMapIndex < 0 && bMapIndex >= 0) {
					return 1;
				}

				// If neither of these replies are in the sort map, just leave them where they are.
				if (aMapIndex < 0 && bMapIndex < 0) {
					return 0;
				}

				return aMapIndex - bMapIndex;
			};
		}

		_shouldFlash(replicantChangeOperations?: any[]) {
			if (replicantChangeOperations && replicantChangeOperations.length === 1) {
				// Don't flash if the change was just the addition of a new question.
				if (replicantChangeOperations[0].method === 'push') {
					return false;
				}

				// Don't flash if the change was just caused by hitting "Show Next" on tier2.
				if (replicantChangeOperations[0].method === 'splice' &&
					replicantChangeOperations[0].args.length === 2 &&
					replicantChangeOperations[0].args[0] === 0 &&
					replicantChangeOperations[0].args[1] === 1) {
					return false;
				}
			}

			return true;
		}

		_flashElementBackground(element: HTMLElement, {
			flashColor = '#9966cc',
			endColor = window.getComputedStyle(element).backgroundColor,
			duration = 1600,
			easing = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)'
		} = {}) {
			return element.animate([
				{backgroundColor: flashColor},
				{backgroundColor: endColor}
			] as Keyframe[], {
				duration,
				easing
			});
		}

		_flashAddedNodes(container: HTMLElement | ShadowRoot, selector: string, condition?: (node: HTMLElement) => boolean) {
			const observer = new MutationObserver(mutations => {
				mutations.forEach(mutation => {
					if (!mutation.addedNodes) {
						return;
					}

					Array.from(mutation.addedNodes).filter(node => {
						return node && 'matches' in node && (node as HTMLElement).matches(selector);
					}).forEach(node => {
						if (condition && !condition(node as HTMLElement)) {
							return;
						}

						this._flashElementBackground(node as HTMLElement);
					});
				});
			});

			observer.observe(container, {childList: true, subtree: true});
			return observer;
		}
	}

	return MapSortMixin;
});
