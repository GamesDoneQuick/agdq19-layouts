// Borrowed from:
// https://github.com/colinbdclark/osc.js/pull/105
// tslint:disable

import { EventEmitter } from 'events';

declare module "osc" {
	export const defaults: {
		metadata: boolean;
		unpackSingleArgs: boolean;
	};
	export type Argument = number | string | Uint8Array;
	export type MetaArgument =
		{ type: 'i' | 'f', value: number }
		| { type: 's', value: string }
		| { type: 'b', value: Uint8Array };

	export abstract class SLIPPort {}

	export interface OscMessage {
		address: string;
		args: Argument | Array<Argument> | MetaArgument | Array<MetaArgument>;
	}

	export interface OscBundle {}

	export interface SenderInfo {
		address: string;
		port: number;
		size: number;
		family: 'IPv4' | 'IPv6';
	}

	export interface UdpOptions {
		/**
		 * The port to listen on
		 */
		localPort?: number; // 57121

		/**
		 * The local address to bind to
		 */
		localAddress?: string; // '127.0.0.1'

		/**
		 * The remote port to send messages to
		 */
		remotePort?: number;

		/**
		 * The remote address to send messages to
		 */
		remoteAddress?: string;
		broadcast?: boolean; // false

		/**
		 * The time to live (number of hops) for a multicast connection
		 */
		multicastTTL?: number;

		/**
		 * An array of multicast addresses to join when listening for multicast messages
		 */
		multicastMembership?: string[];
		socket?: any;

		/**
		 * should message arguments be wrapped with type?
		 */
		metadata?: boolean;
		unpackSingleArgs?: boolean;
	}

	export interface OscSender {
		send(msg: OscMessage, address?: string, port?: number): void;
	}

	export abstract class Port extends EventEmitter implements OscSender {
		send(msg: OscMessage, address?: string, port?: number): void;

		// Events
		on(event: 'ready', listener: () => void): this;
		on(event: 'open', listener: () => void): this;
		on(event: 'close', listener: () => void): this;
		on(event: 'error', listener: (err: Error) => void): this;
		on(event: 'message', listener: (message: OscMessage, timeTag: number | undefined, info: SenderInfo) => void): this;
		on(event: 'bundle', listener: (bundle: OscBundle, timeTag: number, info: SenderInfo) => void): this;
		on(event: 'osc', listener: (packet: OscBundle | OscMessage, info: SenderInfo) => void): this;
		on(event: 'raw', listener: (data: Uint8Array, info: SenderInfo) => void): this;
		on(event: 'fii', listener: () => void): this;
		on(event: 'fii', listener: () => void): this;
		on(event: 'fii', listener: () => void): this;
		on(event: 'fii', listener: () => void): this;
	}

	export class SerialPort extends SLIPPort {
		open(): void;
		close(): void;
		listen(): void;
	}

	export class UDPPort extends Port {
		static setupMulticast(that: UDPPort): void;
		options: UdpOptions;
		constructor(options: UdpOptions);
		open(): void;
		close(): void;
		listen(): void;
	}
}
