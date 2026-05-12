import type { UITranslations } from "./types.js";
export declare function initializeTranslations(lang: string): Promise<void>;
export declare function translateCountry(countryName: string): string;
export declare function translateCity(cityName: string): string;
export declare function normalizeCountry(name: string): string;
export declare function getUITranslation(key: keyof UITranslations): string;
export declare function getGenderLabel(gender: "men" | "women"): "men" | "women";
