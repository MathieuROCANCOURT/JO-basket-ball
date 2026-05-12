import type { MedalStats } from "./types.js";
export declare function renderRankingTable(countries: MedalStats[], container: HTMLElement, gender: "men" | "women"): void;
export declare function renderEditionTable(rows: string[][], container: HTMLElement, gender: "men" | "women"): void;
export declare function renderTotalTable(sortedCountries: MedalStats[], container: HTMLElement): void;
