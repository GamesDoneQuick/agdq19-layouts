/**
 * @mixinFunction
 * @polymer
 */
export default Polymer.dedupingMixin((base) => {
    class MapSortMixin extends base {
        constructor() {
            super(...arguments);
            this._sortMapVal = null;
        }
        ready() {
            this._createMapSort = this._createMapSort.bind(this);
            super.ready();
        }
        _createMapSort(idKey) {
            return (a, b) => {
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
        _shouldFlash(replicantChangeOperations) {
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
        _flashElementBackground(element, { flashColor = '#9966cc', endColor = window.getComputedStyle(element).backgroundColor, duration = 1600, easing = 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' } = {}) {
            return element.animate([
                { backgroundColor: flashColor },
                { backgroundColor: endColor }
            ], {
                duration,
                easing
            });
        }
        _flashAddedNodes(container, selector, condition) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (!mutation.addedNodes) {
                        return;
                    }
                    Array.from(mutation.addedNodes).filter(node => {
                        return node && 'matches' in node && node.matches(selector);
                    }).forEach(node => {
                        if (condition && !condition(node)) {
                            return;
                        }
                        this._flashElementBackground(node);
                    });
                });
            });
            observer.observe(container, { childList: true, subtree: true });
            return observer;
        }
    }
    return MapSortMixin;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLXNvcnQtbWl4aW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXAtc29ydC1taXhpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxlQUFlLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFpQyxFQUFFLEVBQUU7SUFDMUUsTUFBTSxZQUFhLFNBQVEsSUFBSTtRQUEvQjs7WUFDQyxnQkFBVyxHQUFvQixJQUFJLENBQUM7UUF5RnJDLENBQUM7UUF2RkEsS0FBSztZQUNKLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUVELGNBQWMsQ0FBQyxLQUFhO1lBQzNCLE9BQU8sQ0FBQyxDQUFNLEVBQUUsQ0FBTSxFQUFFLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUN0QixPQUFPLENBQUMsQ0FBQztpQkFDVDtnQkFFRCxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlELElBQUksU0FBUyxJQUFJLENBQUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFO29CQUNwQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2lCQUNWO2dCQUVELElBQUksU0FBUyxHQUFHLENBQUMsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFO29CQUNwQyxPQUFPLENBQUMs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