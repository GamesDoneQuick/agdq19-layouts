interface ChannelObject {
    muted: boolean;
    fadedBelowThreshold: boolean;
}
export declare const replicants: {
    gameAudioChannels: import("../../../../types/lib/replicant").ReplicantServer<import("../types/schemas/mixer_gameAudioChannels").RunnerAudioObject[]>;
    adsChannel: import("../../../../types/lib/replicant").ReplicantServer<ChannelObject>;
};
export {};
//# sourceMappingURL=mixer.d.ts.map