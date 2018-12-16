import * as tslib_1 from "tslib";
import { TimelineLite } from 'gsap';
const { customElement, property } = Polymer.decorators;
const MILESTONES = [
    { name: 'AGDQ 2014', total: 1031665.5 },
    { name: 'AGDQ 2015', total: 1576085 },
    { name: 'AGDQ 2016', total: 1216309.02 },
    { name: 'SGDQ 2016', total: 1294139.5 },
    { name: 'AGDQ 2017', total: 2222790.52 },
    { name: 'SGDQ 2017', total: 1792342.37 },
    { name: 'AGDQ 2018', total: 2295190.66 },
    { name: 'SGDQ 2018', total: 2168913.51 }
].sort((a, b) => {
    return a.total - b.total;
}).map((milestone, index, array) => {
    const precedingMilestone = index > 0 ?
        array[index - 1] :
        { name: 'none', total: 1000000 };
    const succeedingMilestone = array[index + 1];
    const modifiedMilestone = Object.assign({}, milestone, { precedingMilestone,
        succeedingMilestone });
    Object.freeze(modifiedMilestone);
    return modifiedMilestone;
});
Object.freeze(MILESTONES);
// Configuration consts.
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const SCROLL_HOLD_DURATION = nodecg.bundleConfig.omnibar.scrollHoldDuration;
// Replicants.
const currentBids = nodecg.Replicant('currentBids');
const currentLayout = nodecg.Replicant('gdq:currentLayout');
const currentPrizes = nodecg.Replicant('currentPrizes');
const currentRun = nodecg.Replicant('currentRun');
const nextRun = nodecg.Replicant('nextRun');
const recordTrackerEnabled = nodecg.Replicant('recordTrackerEnabled');
const schedule = nodecg.Replicant('schedule');
const total = nodecg.Replicant('total');
let GDQOmnibarElement = class GDQOmnibarElement extends Polymer.Element {
    constructor() {
        super(...arguments);
        this.milestones = MILESTONES;
        this.noAutoLoop = false;
        this.skipLabelAnims = false;
    }
    ready() {
        super.ready();
        const replicants = [
            currentBids,
            currentLayout,
            currentPrizes,
            currentRun,
            nextRun,
            recordTrackerEnabled,
            schedule,
            total
        ];
        let numDeclared = 0;
        replicants.forEach(replicant => {
            replicant.once('change', () => {
                numDeclared++;
                // Start the loop once all replicants are declared;
                if (numDeclared >= replicants.length) {
                    Polymer.RenderStatus.beforeNextRender(this, () => {
                        setTimeout(() => {
                            this.run();
                        }, 500);
                    });
                }
            });
        });
    }
    run() {
        const self = this; // tslint:disable-line:no-this-assignment
        if (this.noAutoLoop) {
            return;
        }
        // For development, comment out whichever parts you don't want to see right now.
        const parts = [
            this.showCTA,
            this.showUpNext,
            this.showChallenges,
            this.showChoices,
            this.showCurrentPrizes,
            this.showMilestoneProgress
        ];
        function processNextPart() {
            if (parts.length > 0) {
                const part = parts.shift().bind(self);
                promisifyTimeline(part())
                    .then(processNextPart)
                    .catch(error => {
                    nodecg.log.error('Error when running main loop:', error);
                });
            }
            else {
                self.run();
            }
        }
        async function promisifyTimeline(tl) {
            return new Promise(resolve => {
                tl.call(resolve, undefined, null, '+=0.03');
            });
        }
        processNextPart();
    }
    /**
     * Creates an animation timeline for showing the label.
     * @param text - The text to show.
     * @param options - Options for this animation.
     * @returns An animation timeline.
     */
    showLabel(text, options) {
        const tl = new TimelineLite();
        const labelElem = this.$.label;
        const fullOptions = Object.assign({}, options, { flagHoldDuration: Math.max(DISPLAY_DURATION / 2, 5) });
        if (labelElem._showing) {
            tl.add(labelElem.change(text, fullOptions));
        }
        else {
            tl.add(labelElem.show(text, fullOptions));
        }
        if (this.skipLabelAnims) {
            tl.progress(1);
            return new TimelineLite();
        }
        return tl;
    }
    /**
     * Creates an animation timeline for hiding the label.
     * @returns An animation timeline.
     */
    hideLabel() {
        const hideAnim = this.$.label.hide();
        if (this.skipLabelAnims) {
            hideAnim.progress(1);
            return new TimelineLite();
        }
        return hideAnim;
    }
    setContent(tl, element) {
        tl.to({}, 0.03, {}); // Safety buffer to avoid issues where GSAP might skip our `call`.
        tl.call(() => {
            tl.pause();
            this.$.content.innerHTML = '';
            this.$.content.appendChild(element);
            Polymer.flush(); // Might not be necessary, but better safe than sorry.
            Polymer.RenderStatus.afterNextRender(this, () => {
                Polymer.flush(); // Might not be necessary, but better safe than sorry.
                requestAnimationFrame(() => {
                    tl.resume(null, false);
                });
            });
        });
    }
    showContent(tl, element) {
        tl.to({}, 0.03, {}); // Safety buffer to avoid issues where GSAP might skip our `call`.
        tl.call(() => {
            tl.pause();
            const elementEntranceAnim = element.enter(DISPLAY_DURATION, SCROLL_HOLD_DURATION);
            elementEntranceAnim.call(tl.resume, null, tl);
        });
    }
    hideContent(tl, element) {
        tl.to({}, 0.03, {}); // Safety buffer to avoid issues where GSAP might skip our `call`.
        tl.call(() => {
            tl.pause();
            const elementExitAnim = element.exit();
            elementExitAnim.call(tl.resume, null, tl);
        });
    }
    showCTA() {
        const tl = new TimelineLite();
        tl.add(this.hideLabel());
        tl.call(() => {
            this.$.content.innerHTML = '';
        });
        tl.add(this.$.cta.show(DISPLAY_DURATION));
        return tl;
    }
    showUpNext() {
        const tl = new TimelineLite();
        let upNextRun = nextRun.value;
        if (currentLayout.value === 'break' || currentLayout.value === 'interview') {
            upNextRun = currentRun.value;
        }
        // If we're at the final run, bail out and just skip straight to showing the next item in the rotation.
        if (!upNextRun || !schedule.value) {
            return tl;
        }
        const upcomingRuns = [upNextRun];
        // Use the nextRun replicant instead of just pulling the next run from the schedule replicant.
        // This ensures that any local edits will be shown.
        if (upNextRun === currentRun.value) {
            upcomingRuns.push(nextRun.value);
        }
        schedule.value.some(item => {
            if (item.type !== 'run') {
                return false;
            }
            if (item.order <= upcomingRuns[upcomingRuns.length - 1].order) {
                return false;
            }
            upcomingRuns.push(item);
            return upcomingRuns.length >= 4;
        });
        const listElement = document.createElement('gdq-omnibar-list');
        upcomingRuns.forEach((run, index) => {
            const element = document.createElement('gdq-omnibar-run');
            element.run = run;
            if (index === 0) {
                element.first = true;
            }
            listElement.appendChild(element);
        });
        this.setContent(tl, listElement);
        tl.add(this.showLabel('Up Next', {
            avatarIconName: 'upnext',
            flagColor: '#7EF860',
            ringColor: '#50A914'
        }), '+=0.03');
        this.showContent(tl, listElement);
        this.hideContent(tl, listElement);
        return tl;
    }
    showChallenges(overrideBids, { showClosed = false } = {}) {
        const bids = overrideBids || currentBids.value;
        const tl = new TimelineLite();
        // If there's no bids whatsoever, bail out.
        if (!bids || bids.length <= 0) {
            return tl;
        }
        // Figure out what bids to display in this batch
        const bidsToDisplay = [];
        bids.forEach(bid => {
            // Don't show closed bids in the automatic rotation.
            if (!showClosed && bid.state.toLowerCase() === 'closed') {
                return;
            }
            // Only show challenges.
            if (bid.type !== 'challenge') {
                return;
            }
            // If we have already have our three bids determined, we still need to check
            // if any of the remaining bids are for the same speedrun as the third bid.
            // This ensures that we are never displaying a partial list of bids for a given speedrun.
            if (bidsToDisplay.length < 3) {
                bidsToDisplay.push(bid);
            }
            else if (bid.speedrun === bidsToDisplay[bidsToDisplay.length - 1].speedrun) {
                bidsToDisplay.push(bid);
            }
        });
        // If there's no challenges to display, bail out.
        if (bidsToDisplay.length <= 0) {
            return tl;
        }
        const containerElement = document.createElement('gdq-omnibar-challenges');
        containerElement.challenges = bidsToDisplay;
        this.setContent(tl, containerElement);
        tl.add(this.showLabel('Challenges', {
            avatarIconName: 'challenges',
            flagColor: '#82EFFF',
            ringColor: '#FFFFFF'
        }), '+=0.03');
        this.showContent(tl, containerElement);
        this.hideContent(tl, containerElement);
        return tl;
    }
    showChoices(overrideBids, { showClosed = false } = {}) {
        const bids = overrideBids || currentBids.value;
        const tl = new TimelineLite();
        // If there's no bids whatsoever, bail out.
        if (bids.length <= 0) {
            return tl;
        }
        // Figure out what bids to display in this batch
        const bidsToDisplay = [];
        bids.forEach(bid => {
            // Don't show closed bids in the automatic rotation.
            if (!showClosed && bid.state.toLowerCase() === 'closed') {
                return;
            }
            // Only show choices.
            if (bid.type !== 'choice-binary' && bid.type !== 'choice-many') {
                return;
            }
            // If we have already have our three bids determined, we still need to check
            // if any of the remaining bids are for the same speedrun as the third bid.
            // This ensures that we are never displaying a partial list of bids for a given speedrun.
            if (bidsToDisplay.length < 3) {
                bidsToDisplay.push(bid);
            }
            else if (bid.speedrun === bidsToDisplay[bidsToDisplay.length - 1].speedrun) {
                bidsToDisplay.push(bid);
            }
        });
        // If there's no choices to display, bail out.
        if (bidsToDisplay.length <= 0) {
            return tl;
        }
        const containerElement = document.createElement('gdq-omnibar-bidwars');
        containerElement.bidWars = bidsToDisplay;
        this.setContent(tl, containerElement);
        tl.add(this.showLabel('Bid Wars', {
            avatarIconName: 'bidwars',
            flagColor: '#FF4D4A',
            ringColor: '#FF4D4D'
        }), '+=0.03');
        this.showContent(tl, containerElement);
        this.hideContent(tl, containerElement);
        return tl;
    }
    showCurrentPrizes(overridePrizes) {
        const prizes = overridePrizes || currentPrizes.value;
        const tl = new TimelineLite();
        // No prizes to show? Bail out.
        if (prizes.length <= 0) {
            return tl;
        }
        const specialPrizesToDisplayLast = [];
        const prizesToDisplay = prizes.filter(prize => {
            if (prize.id === 1892) {
                specialPrizesToDisplayLast.push(prize);
                return false;
            }
            return true;
        }).concat(specialPrizesToDisplayLast);
        const listElement = document.createElement('gdq-omnibar-list');
        prizesToDisplay.forEach(prize => {
            const element = document.createElement('gdq-omnibar-prize');
            element.prize = prize;
            listElement.appendChild(element);
        });
        this.setContent(tl, listElement);
        tl.add(this.showLabel('Prizes', {
            avatarIconName: 'prizes',
            flagColor: '#FF70C8',
            ringColor: '#EC0793'
        }), '+=0.03');
        this.showContent(tl, listElement);
        this.hideContent(tl, listElement);
        return tl;
    }
    showMilestoneProgress() {
        const tl = new TimelineLite();
        // If we have manually disabled this feature, return.
        if (!recordTrackerEnabled.value || !total.value) {
            return tl;
        }
        // If the current total is < $1M, return.
        if (total.value.raw < 1000000) {
            return tl;
        }
        const currentMilestone = MILESTONES.find(milestone => {
            return total.value.raw < milestone.total;
        });
        // If we are out of milestones to show, return.
        if (!currentMilestone) {
            return tl;
        }
        const milestoneTrackerElement = document.createElement('gdq-omnibar-milestone-tracker');
        milestoneTrackerElement.milestone = currentMilestone;
        milestoneTrackerElement.currentTotal = total.value.raw;
        this.setContent(tl, milestoneTrackerElement);
        tl.add(this.showLabel('Milestone Progress', {
            avatarIconName: 'milestones',
            flagColor: '#FFB800',
            ringColor: '#E7EC07'
        }), '+=0.03');
        this.showContent(tl, milestoneTrackerElement);
        this.hideContent(tl, milestoneTrackerElement);
        return tl;
    }
};
tslib_1.__decorate([
    property({ type: Array })
], GDQOmnibarElement.prototype, "milestones", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQOmnibarElement.prototype, "noAutoLoop", void 0);
tslib_1.__decorate([
    property({ type: Boolean, reflectToAttribute: true })
], GDQOmnibarElement.prototype, "skipLabelAnims", void 0);
GDQOmnibarElement = tslib_1.__decorate([
    customElement('gdq-omnibar')
], GDQOmnibarElement);
export default GDQOmnibarElement;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2RxLW9tbmliYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnZHEtb21uaWJhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQWNsQyxNQUFNLEVBQUMsYUFBYSxFQUFFLFFBQVEsRUFBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFFckQsTUFBTSxVQUFVLEdBQUc7SUFDbEIsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7SUFDckMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUM7SUFDbkMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUM7SUFDdEMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUM7SUFDckMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUM7SUFDdEMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUM7SUFDdEMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUM7SUFDdEMsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUM7Q0FDdEMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDZixPQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO0lBQ2xDLE1BQU0sa0JBQWtCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FB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