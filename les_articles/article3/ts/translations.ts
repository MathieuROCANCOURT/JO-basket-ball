import type { TranslationData } from './translation-loader.js'
import { loadTranslations, getCountryTranslation } from './translation-loader.js';

let translations: TranslationData | null = null;

export async function initializeTranslations(lang: string = 'fr'): Promise<void> {
    translations = await loadTranslations(lang);
}

export function translateCountry(countryName: string): string {
    if (!translations) {
        console.warn('Translations not initialized yet');
        return countryName;
    }
    return getCountryTranslation(countryName, translations);
}

export function normalizeCountry(name: string): string {
    if (!translations) {
        return name.trim();
    }
    const t = name.trim();
    return translations.aliases[t] || t;
}