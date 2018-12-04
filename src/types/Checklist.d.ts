export interface Task {
	name: string;
	shortName: string;
	complete: boolean;
}

export interface List {
	[key: string]: Task[];
}
