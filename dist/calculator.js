import { normalizeCountry } from "./translations.js";
export function buildMedalDict(rows) {
    const dict = {};
    for (const row of rows) {
        if (row.length < 6)
            continue;
        const gold = row[3];
        const silver = row[4];
        const bronze = row[5];
        const add = (rawCountry, type) => {
            const country = normalizeCountry(rawCountry);
            if (!dict[country]) {
                dict[country] = {
                    Country: country,
                    Gold: 0,
                    Silver: 0,
                    Bronze: 0,
                    Total: 0,
                };
            }
            dict[country][type]++;
            dict[country].Total++;
        };
        add(gold, "Gold");
        add(silver, "Silver");
        add(bronze, "Bronze");
    }
    return dict;
}
export function mergeDicts(a, b) {
    const result = { ...a };
    for (const [c, cnt] of Object.entries(b)) {
        if (!result[c]) {
            result[c] = { ...cnt };
        }
        else {
            result[c].Gold += cnt.Gold;
            result[c].Silver += cnt.Silver;
            result[c].Bronze += cnt.Bronze;
            result[c].Total += cnt.Total;
        }
    }
    return result;
}
export function medalComparator(a, b) {
    return (b.Gold - a.Gold ||
        b.Silver - a.Silver ||
        b.Bronze - a.Bronze ||
        b.Total - a.Total ||
        a.Country.localeCompare(b.Country));
}
export function equal(a, b) {
    return a.Gold === b.Gold && a.Silver === b.Silver && a.Bronze === b.Bronze;
}
