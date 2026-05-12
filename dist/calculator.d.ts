import type { MedalStats } from "./types.js";
export declare function buildMedalDict(rows: string[][]): Record<string, MedalStats>;
export declare function mergeDicts(a: Record<string, MedalStats>, b: Record<string, MedalStats>): Record<string, MedalStats>;
export declare function medalComparator(a: MedalStats, b: MedalStats): number;
export declare function equal(a: MedalStats, b: MedalStats): boolean;
