import * as GDQTypes from '../../types';
/**
 * Calculates the original values for a modified run.
 * @param run - The modified run (currentRun or nextRun).
 * @param original - The original run as it exists in the schedule.
 * @returns The original values of any modified properties.
 */
export declare function calcOriginalValues(run: GDQTypes.Run, original: GDQTypes.Run): Partial<GDQTypes.Run> | undefined;
/**
 * Given an active run (currentRun or nextRun) and that same unmodified (but formatted) from the schedule,
 * returns a new run object with new changes from the tracker incorporated.
 * @param run - An active run (currentRun or nextRun)
 * @param unmodifiedRun - An unmodified (but formatted) run from the schedule.
 * @returns The merged run.
 */
export declare function mergeChangesFromTracker(run: GDQTypes.Run, unmodifiedRun: GDQTypes.Run): GDQTypes.Run;
//# sourceMappingURL=diff-run.d.ts.map