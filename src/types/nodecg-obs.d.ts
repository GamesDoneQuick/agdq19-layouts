export const enum CONNECTION_STATUS {
	CONNECTED = 'connected',
	CONNECTING = 'connecting',
	DISCONNECTED = 'disconnected',
	ERROR = 'error'
}

export interface WebsocketStatus {
	ip: string;
	port: number;
	password: string;
	status: CONNECTION_STATUS;
}

export interface Scene {
	name: string;
	sources: Source[];
}

export interface Source {
	cx: number;
	cy: number;
	name: string;
	render: boolean;
	source_cx: number;
	source_cy: number;
	type: string;
	volume: number;
	x: number;
	y: number;
}
