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
        schedule.value.some(item => {
            if (item.type !== 'run') {
                return false;
            }
            if (item.order <= upNextRun.order) {
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