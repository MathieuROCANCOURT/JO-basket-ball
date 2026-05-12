let cachedTranslations = null;
export async function loadTranslations(lang) {
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
    }
    catch (error) {
        console.error("Error loading translations:", error);
        throw error;
    }
}
export function getCountryTranslation(countryName, translations) {
    const normalized = normalizeCountry(countryName, translations.aliases);
    return translations.countries[normalized] || countryName;
}
export function getCityTranslation(cityName, translations) {
    // On normalise d'abord (trim) mais sans alias pour les villes
    const normalized = cityName.trim();
    return translations.cities[normalized] || cityName;
}
function normalizeCountry(name, aliases) {
    const t = name.trim();
    return aliases[t] || t;
}
