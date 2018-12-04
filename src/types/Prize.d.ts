export interface Prize {
	id: number;
	name: string;
	provided: string;
	description: string;
	image: string;
	minimumbid: string;
	grand: boolean;
	sumdonations: boolean;
	startrun: {
		id: number;
		name: string;
		longName: string;
		order: number;
	};
	endrun: {
		id: number;
		name: string;
		longName: string;
		order: number;
	};
	type: 'prize';
}
