import type { UITranslations } from "./types";
export interface TranslationData {
    countries: Record<string, string>;
    cities: Record<string, string>;
    aliases: Record<string, string>;
    ui: UITranslations;
}
export declare function loadTranslations(lang: string): Promise<TranslationData | null>;
export declare function getCountryTranslation(countryName: string, translations: TranslationData): string;
export declare function getCityTranslation(cityName: string, translations: TranslationData): string;
