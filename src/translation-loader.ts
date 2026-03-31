import type { UITranslations } from "./types";

export interface TranslationData {
    countries: Record<string, string>;
    cities: Record<string, string>;
    aliases: Record<string, string>;
    ui: UITranslations;
}

let cachedTranslations: TranslationData | null = null;

export async function loadTranslations(lang: string): Promise<TranslationData | null> {
    if (cachedTranslations) {
        return cachedTranslations;
    }

    try {
        const response = await fetch(`./../../dist/translations/${lang}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load translations: ${response.status}`);
        }
        cachedTranslations = await response.json();
        return cachedTranslations;
    } catch (error) {
        console.error('Error loading translations:', error);
        throw error;
    }
}

export function getCountryTranslation(
    countryName: string,
    translations: TranslationData
): string {
    const normalized = normalizeCountry(countryName, translations.aliases);
    return translations.countries[normalized] || countryName;
}

export function getCityTranslation(
    cityName: string,
    translations: TranslationData
): string {
    // On normalise d'abord (trim) mais sans alias pour les villes
    const normalized = cityName.trim();
    return translations.cities[normalized] || cityName;
}

function normalizeCountry(name: string, aliases: Record<string, string>): string {
    const t = name.trim();
    return aliases[t] || t;
}