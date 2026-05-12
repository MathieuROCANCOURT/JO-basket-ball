import { loadTranslations, getCountryTranslation, getCityTranslation } from "./translation-loader.js";
let translations = null;
export async function initializeTranslations(lang) {
    translations = await loadTranslations(lang);
}
export function translateCountry(countryName) {
    if (!translations) {
        console.warn("Translations not initialized yet");
        return countryName;
    }
    return getCountryTranslation(countryName, translations);
}
export function translateCity(cityName) {
    if (!translations) {
        console.warn("Translations not initialized yet");
        return cityName;
    }
    return getCityTranslation(cityName, translations);
}
export function normalizeCountry(name) {
    if (!translations) {
        return name.trim();
    }
    const t = name.trim();
    return translations.aliases[t] || t;
}
export function getUITranslation(key) {
    if (!translations?.ui) {
        console.warn("UI Translations not initialized yet");
        return key;
    }
    return translations.ui[key] || key;
}
export function getGenderLabel(gender) {
    return gender === "men" ? "men" : "women";
}
