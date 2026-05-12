export interface MedalStats {
    Country: string;
    Gold: number;
    Silver: number;
    Bronze: number;
    Total: number;
}
export interface MedalRow {
    year: string;
    city: string;
    gold: string;
    silver: string;
    bronze: string;
}
export interface CountryTranslationMap {
    [key: string]: string;
}
export interface CountryAliasMap {
    [key: string]: string;
}
export interface UITranslations {
    men: string;
    women: string;
    palmares: string;
    tableau_medailles: string;
    total_medals: string;
    pos: string;
    country: string;
    gold: string;
    silver: string;
    bronze: string;
    total: string;
    year: string;
    city: string;
    gold_medal: string;
    silver_medal: string;
    bronze_medal: string;
    rank: string;
    nation: string;
}
export interface TranslationData {
    countries: CountryTranslationMap;
    cities: CountryTranslationMap;
    aliases: CountryAliasMap;
    ui: UITranslations;
}
