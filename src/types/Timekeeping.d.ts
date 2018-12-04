/**
 * An object representing the individual dimensions of an amount of time.
 */
export interface ParsedTime {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

/**
 * An object representing the individual dimensions of an amount of time,
 * plus some alternate representations of that time and a timestamp of when this struct was created.
 */
export interface TimeStruct extends ParsedTime {
	formatted: string;
	raw: number;
	timestamp: number;
}

export interface Stopwatch {
	state: StopwatchStateEnum;
	time: {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
		milliseconds: number;
		formatted: string;
		raw: number;
		timestamp: number;
	};
	results: (StopwatchResult | null)[];
}

export interface StopwatchResult {
	time: TimeStruct;
	place: number;
	forfeit: boolean;
}

export const enum StopwatchStateEnum {
	NOT_STARTED = 'not_started',
	RUNNING = 'running',
	PAUSED = 'paused',
	FINISHED = 'finished'
}
