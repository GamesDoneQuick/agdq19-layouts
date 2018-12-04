export interface Bid {
	description: string;
	id: number;
	name: string;
	rawTotal: number;
	total: string;
}

export interface ChildBid extends Bid {
	parent: number;
}

export interface ParentBid extends Bid {
	goal: string;
	isBitsChallenge: boolean;
	goalMet: boolean;
	options: ChildBid[];
	public: string;
	rawGoal: number;
	speedrun: string;
	speedrunEndtime: number;
	state: 'PENDING' | 'DENIED' | 'HIDDEN' | 'OPENED' | 'CLOSED';
	type: 'choice-binary' | 'choice-many' | 'challenge';
}
