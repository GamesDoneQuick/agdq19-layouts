import {TimelineLite} from 'gsap';
import GDQOmnibarLabelElement from './gdq-omnibar-label';
import GDQOmnibarCtaElement from './gdq-omnibar-cta';
import {ParentBid, Prize, Run, ScheduleItem} from '../../../../src/types';
import {Gdq3AcurrentLayout} from '../../../../src/types/schemas/gdq%3AcurrentLayout';
import {RecordTrackerEnabled} from '../../../../src/types/schemas/recordTrackerEnabled';
import {Total} from '../../../../src/types/schemas/total';
import GDQOmnibarRunElement from './gdq-omnibar-run';
import GDQOmnibarListElement from './gdq-omnibar-list';
import GDQOmnibarChallengesElement from './gdq-omnibar-challenges';
import GDQOmnibarBidwarsElement from './gdq-omnibar-bidwars';
import GDQOmnibarPrizeElement from './gdq-omnibar-prize';
import GDQOmnibarMilestoneTrackerElement from './gdq-omnibar-milestone-tracker';

const {customElement, property} = Polymer.decorators;

const MILESTONES = [
	{name: 'AGDQ 2014', total: 1031665.5},
	{name: 'AGDQ 2015', total: 1576085},
	{name: 'AGDQ 2016', total: 1216309.02},
	{name: 'SGDQ 2016', total: 1294139.5},
	{name: 'AGDQ 2017', total: 2222790.52},
	{name: 'SGDQ 2017', total: 1792342.37},
	{name: 'AGDQ 2018', total: 2295190.66},
	{name: 'SGDQ 2018', total: 2168913.51}
].sort((a, b) => {
	return a.total - b.total;
}).map((milestone, index, array) => {
	const precedingMilestone = index > 0 ?
		array[index - 1] :
		{name: 'none', total: 1000000};

	const succeedingMilestone = array[index + 1];
	const modifiedMilestone = {
		...milestone,
		precedingMilestone,
		succeedingMilestone
	};

	Object.freeze(modifiedMilestone);
	return modifiedMilestone;
});
Object.freeze(MILESTONES);

// Configuration consts.
const DISPLAY_DURATION = nodecg.bundleConfig.displayDuration;
const SCROLL_HOLD_DURATION = nodecg.bundleConfig.omnibar.scrollHoldDuration;

// Replicants.
const currentBids = nodecg.Replicant<ParentBid[]>('currentBids');
const currentLayout = nodecg.Replicant<Gdq3AcurrentLayout>('gdq:currentLayout');
const currentPrizes = nodecg.Replicant<Prize[]>('currentPrizes');
const currentRun = nodecg.Replicant<Run>('currentRun');
const nextRun = nodecg.Replicant<Run>('nextRun');
const recordTrackerEnabled = nodecg.Replicant<RecordTrackerEnabled>('recordTrackerEnabled');
const schedule = nodecg.Replicant<ScheduleItem[]>('schedule');
const total = nodecg.Replicant<Total>('total');

@customElement('gdq-omnibar')
export default class GDQOmnibarElement extends Polymer.Element {
	@property({type: Array})
	readonly milestones = MILESTONES;

	@property({type: Boolean, reflectToAttribute: true})
	noAutoLoop = false;

	@property({type: Boolean, reflectToAttribute: true})
	skipLabelAnims = false;

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
				const part = parts.shift()!.bind(self);
				promisifyTimeline(part())
					.then(processNextPart)
					.catch(error => {
						nodecg.log.error('Error when running main loop:', error);
					});
			} else {
				self.run();
			}
		}

		async function promisifyTimeline(tl: TimelineLite) {
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
	showLabel(text: string, options: {avatarIconName: string; ringColor: string; flagColor: string}) {
		const tl = new TimelineLite();
		const labelElem = this.$.label as GDQOmnibarLabelElement;
		const fullOptions = {
			...options,
			flagHoldDuration: Math.max(DISPLAY_DURATION / 2, 5)
		};

		if (labelElem._showing) {
			tl.add(labelElem.change(text, fullOptions));
		} else {
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
		const hideAnim = (this.$.label as GDQOmnibarLabelElement).hide();

		if (this.skipLabelAnims) {
			hideAnim.progress(1);
			return new TimelineLite();
		}

		return hideAnim;
	}

	setContent(tl: TimelineLite, element: HTMLElement) {
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

	showContent(tl: TimelineLite, element: HTMLElement) {
		tl.to({}, 0.03, {}); // Safety buffer to avoid issues where GSAP might skip our `call`.
		tl.call(() => {
			tl.pause();
			const elementEntranceAnim = (element as any).enter(DISPLAY_DURATION, SCROLL_HOLD_DURATION);
			elementEntranceAnim.call(tl.resume, null, tl);
		});
	}

	hideContent(tl: TimelineLite, element: HTMLElement) {
		tl.to({}, 0.03, {}); // Safety buffer to avoid issues where GSAP might skip our `call`.
		tl.call(() => {
			tl.pause();
			const elementExitAnim = (element as any).exit();
			elementExitAnim.call(tl.resume, null, tl);
		});
	}

	showCTA() {
		const tl = new TimelineLite();
		tl.add(this.hideLabel());
		tl.call(() => {
			this.$.content.innerHTML = '';
		});
		tl.add((this.$.cta as GDQOmnibarCtaElement).show(DISPLAY_DURATION));
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

			if (item.order <= upNextRun!.order) {
				return false;
			}

			upcomingRuns.push(item);
			return upcomingRuns.length >= 4;
		});

		const listElement = document.createElement('gdq-omnibar-list') as GDQOmnibarListElement;
		upcomingRuns.forEach((run, index) => {
			const element = document.createElement('gdq-omnibar-run') as GDQOmnibarRunElement;
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

	showChallenges(overrideBids: ParentBid[], {showClosed = false} = {}) {
		const bids = overrideBids || currentBids.value;
		const tl = new TimelineLite();

		// If there's no bids whatsoever, bail out.
		if (!bids || bids.length <= 0) {
			return tl;
		}

		// Figure out what bids to display in this batch
		const bidsToDisplay: ParentBid[] = [];
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
			} else if (bid.speedrun === bidsToDisplay[bidsToDisplay.length - 1].speedrun) {
				bidsToDisplay.push(bid);
			}
		});

		// If there's no challenges to display, bail out.
		if (bidsToDisplay.length <= 0) {
			return tl;
		}

		const containerElement = document.createElement('gdq-omnibar-challenges') as GDQOmnibarChallengesElement;
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

	showChoices(overrideBids: ParentBid[], {showClosed = false} = {}) {
		const bids = overrideBids || currentBids.value;
		const tl = new TimelineLite();

		// If there's no bids whatsoever, bail out.
		if (bids.length <= 0) {
			return tl;
		}

		// Figure out what bids to display in this batch
		const bidsToDisplay: ParentBid[] = [];

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
			} else if (bid.speedrun === bidsToDisplay[bidsToDisplay.length - 1].speedrun) {
				bidsToDisplay.push(bid);
			}
		});

		// If there's no choices to display, bail out.
		if (bidsToDisplay.length <= 0) {
			return tl;
		}

		const containerElement = document.createElement('gdq-omnibar-bidwars') as GDQOmnibarBidwarsElement;
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

	showCurrentPrizes(overridePrizes: Prize[]) {
		const prizes = overridePrizes || currentPrizes.value;
		const tl = new TimelineLite();

		// No prizes to show? Bail out.
		if (prizes.length <= 0) {
			return tl;
		}

		const specialPrizesToDisplayLast: Prize[] = [];
		const prizesToDisplay = prizes.filter(prize => {
			if (prize.id === 1892) {
				specialPrizesToDisplayLast.push(prize);
				return false;
			}

			return true;
		}).concat(specialPrizesToDisplayLast);

		const listElement = document.createElement('gdq-omnibar-list') as GDQOmnibarListElement;
		prizesToDisplay.forEach(prize => {
			const element = document.createElement('gdq-omnibar-prize') as GDQOmnibarPrizeElement;
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
			return total.value!.raw < milestone.total;
		});

		// If we are out of milestones to show, return.
		if (!currentMilestone) {
			return tl;
		}

		const milestoneTrackerElement = document.createElement('gdq-omnibar-milestone-tracker') as GDQOmnibarMilestoneTrackerElement;
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
}
