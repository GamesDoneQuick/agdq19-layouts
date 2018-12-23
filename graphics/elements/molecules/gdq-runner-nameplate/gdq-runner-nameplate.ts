import {Run, Runner} from '../../../../src/types';
import {Stopwatch} from '../../../../src/types/schemas/stopwatch';
import {MixerGameAudioChannels} from '../../../../src/types/schemas/mixer_gameAudioChannels';

import AtomNameplateElement from '../../atoms/atom-nameplate/atom-nameplate';

const {customElement, property} = Polymer.decorators;
const currentRun = nodecg.Replicant<Run>('currentRun');
const stopwatch = nodecg.Replicant<Stopwatch>('stopwatch');
const gameAudioChannels = nodecg.Replicant<MixerGameAudioChannels>('mixer:gameAudioChannels');

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-runner-nameplate')
export default class GDQRunnerNameplateElement extends Polymer.Element {
	@property({type: Boolean, reflectToAttribute: true})
	noLeftCap = false;

	@property({type: Boolean, reflectToAttribute: true})
	noRightCap = false;

	@property({type: Number})
	index: number;

	@property({type: String})
	audioVertPos: string;

	@property({type: String})
	audioHorizPos: string;

	@property({type: Boolean, reflectToAttribute: true})
	audio = false;

	@property({type: Boolean, reflectToAttribute: true})
	noAudio = false;

	@property({type: String})
	resultSide: string;

	@property({type: Boolean, reflectToAttribute: true})
	coop = false;

	@property({type: Boolean, reflectToAttribute: true})
	finished = false;

	@property({type: Boolean, reflectToAttribute: true})
	forfeit = false;

	@property({type: String})
	time: string;

	@property({type: Number})
	place: number;

	@property({type: Boolean, computed: '_computeFirstPlace(place)'})
	firstPlace: boolean;

	@property({type: Boolean, computed: '_computeLastPlace(place, _numRunners)'})
	lastPlace: boolean;

	@property({type: Number})
	_numRunners = 1;

	ready() {
		super.ready();

		this.currentRunChanged = this.currentRunChanged.bind(this);
		this.stopwatchChanged = this.stopwatchChanged.bind(this);
		this.gameAudioChannelsChanged = this.gameAudioChannelsChanged.bind(this);
	}

	connectedCallback() {
		super.connectedCallback();

		Polymer.RenderStatus.beforeNextRender(this, () => {
			// Attach replicant change listeners.
			currentRun.on('change', this.currentRunChanged);
			stopwatch.on('change', this.stopwatchChanged);
			gameAudioChannels.on('change', this.gameAudioChannelsChanged);
		});
	}

	/*
     * 1) For singleplayer, if both match (ignoring capitalization), show only twitch.
     * 2) For races, if everyone matches (ignoring capitalization), show only twitch, otherwise,
     *    if even one person needs to show both, everyone shows both.
     */
	currentRunChanged(newVal?: Run, oldVal?: Run) {
		if (!newVal || typeof newVal !== 'object') {
			return;
		}

		this.coop = newVal.coop;
		this._numRunners = newVal.runners.length;

		// Only invoke updateNames if the names could have changed.
		if (!oldVal || JSON.stringify(newVal.runners) !== JSON.stringify(oldVal.runners)) {
			this.updateNames(newVal.runners);
		}
	}

	updateNames(runners: Runner[]) {
		let canConflateAllRunners = true;
		runners.forEach(r => {
			if (r && (!r.stream || r.name!.toLowerCase() !== r.stream.toLowerCase())) {
				canConflateAllRunners = false;
			}
		});

		const runner = runners[this.index];
		let alias;
		let twitchAlias;
		if (runner) {
			alias = runner.name;

			if (runner.stream) {
				twitchAlias = runner.stream;
			} else {
				twitchAlias = '';
			}
		} else {
			alias = '?';
			twitchAlias = '?';
		}

		(this.$.nameplate as AtomNameplateElement).updateName({alias, twitchAlias, rotate: !canConflateAllRunners});
	}

	stopwatchChanged(newVal: Stopwatch) {
		if (newVal.results[this.index]) {
			this.forfeit = newVal.results[this.index]!.forfeit;
			this.place = newVal.results[this.index]!.place;
			this.time = newVal.results[this.index]!.time.formatted;
			this.finished = true;
		} else {
			this.forfeit = false;
			this.finished = false;
		}
	}

	gameAudioChannelsChanged(newVal: MixerGameAudioChannels) {
		if (this.noAudio) {
			return;
		}

		if (!newVal || newVal.length <= 0) {
			return;
		}

		const channels = newVal[this.index];
		const canHearSd = !channels.sd.muted && !channels.sd.fadedBelowThreshold;
		const canHearHd = !channels.hd.muted && !channels.hd.fadedBelowThreshold;
		this.audio = canHearSd || canHearHd;
	}

	_computeFirstPlace(place: number) {
		return place === 1;
	}

	_computeLastPlace(place: number, numRunners: number) {
		return place === numRunners;
	}

	_calcResultHidden(resultSide: string) {
		return !resultSide;
	}
}
