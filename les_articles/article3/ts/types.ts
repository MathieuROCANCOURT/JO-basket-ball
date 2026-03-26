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