import type { TranslationData } from './translation-loader.js'
import type { UITranslations } from './types.js'
import { loadTranslations, getCountryTranslation, getCityTranslation } from './translation-loader.js';

let translations: TranslationData | null = null;

export async function initializeTranslations(lang: string): Promise<void> {
    translations = await loadTranslations(lang);
}

export function translateCountry(countryName: string): string {
    if (!translations) {
        console.warn('Translations not initialized yet');
        return countryName;
    }
    return getCountryTranslation(countryName, translations);
}

export function translateCity(cityName: string): string {
    if (!translations) {
        console.warn('Translations not initialized yet');
        return cityName;
    }
    return getCityTranslation(cityName, translations);
}

export function normalizeCountry(name: string): string {
    if (!translations) {
        return name.trim();
    }
    const t = name.trim();
    return translations.aliases[t] || t;
}

export function getUITranslation(key: keyof UITranslations): string {
    if (!translations?.ui) {
        console.warn('UI Translations not initialized yet');
        return key;
    }
    return translations.ui[key] || key;
}

export function getGenderLabel(gender: "men" | "women"): "men" | "women" {
    return gender === 'men' ? 'men' : 'women';
}