import {ParentBid} from '../../../../src/types';
import {TimelineLite} from 'gsap';
import GDQOmnibarContentLabelElement from './gdq-omnibar-content-label';
import GDQOmnibarChallengeElement from './gdq-omnibar-challenge';

const {customElement, property} = Polymer.decorators;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-omnibar-challenges')
export default class GDQOmnibarChallengesElement extends Polymer.Element {
	@property({type: Array})
	challenges: ParentBid[];

	enter(displayDuration: number) {
		const tl = new TimelineLite();

		this.challenges.forEach((challenge, index) => {
			const challengeElement = document.createElement('gdq-omnibar-challenge') as GDQOmnibarChallengeElement;
			challengeElement.classList.add('challenge');
			challengeElement.bid = challenge;
			this.$.challenges.appendChild(challengeElement);

			tl.call(() => {
				(this.$.challenges as IronSelectorElement).select(index);
			}, undefined, null, '+=0.03');

			if (index === 0) {
				tl.add((this.$.label as GDQOmnibarContentLabelElement).enter(challenge.description));
			} else {
				tl.add((this.$.label as GDQOmnibarContentLabelElement).change(challenge.description));
			}

			tl.call(() => {
				tl.pause();
				challengeElement.render();
				const tempTl = challengeElement.enter();
				tempTl.call(tl.resume, undefined, tl);
			});

			tl.call(() => {
				tl.pause();
				const tempTl = challengeElement.exit();
				tempTl.call(tl.resume, undefined, tl);
			}, undefined, null, `+=${displayDuration}`);
		});

		return tl;
	}

	exit() {
		const tl = new TimelineLite();
		tl.add((this.$.label as GDQOmnibarContentLabelElement).exit());
		return tl;
	}
}
