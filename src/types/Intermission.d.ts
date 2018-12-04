export interface Ad {
	id: number;
	type: 'ad';
	name: string;
	adType: 'VIDEO' | 'IMAGE';
	filename: string;
	duration: string;
	order: number;
	suborder: number;
	sponsorName: string;
	state: {
		canStart: boolean;
		started: boolean;
		canComplete: boolean;
		completed: boolean;
		durationFrames: number;
		framesLeft: number;
		frameNumber: number;
		fps: number;
		hasFile: boolean;
	};
}

export interface AdBreak {
	id: number;
	type: 'adBreak';
	ads: Ad[];
	state: AdBreakState;
}

export interface AdBreakState {
	canStart: boolean;
	cantStartReason: string;
	started: boolean;
	canComplete: boolean;
	completed: boolean;
}

export interface Interview {
	id: number;
	interviewees: string[];
	interviewers: string[];
	duration: string;
	order: number;
	subject: string;
	suborder: number;
	type: 'interview';
}

export type IntermissionContentItem = Interview | AdBreak;

export const enum CantStartReasonsEnum {
	ALREADY_STARTED = 'already started',
	ALREADY_COMPLETED = 'already completed',
	RUN_ACTIVE = 'run in progress',
	PRIOR_BREAK_INCOMPLETE = 'a prior ad break is not complete',
	MUST_ADVANCE_SCHEDULE = 'stream tech must go to next run',
	MISSING_FILES = 'one or more ad files are missing'
}
