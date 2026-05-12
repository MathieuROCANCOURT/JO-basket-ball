import { translateCountry, translateCity, getUITranslation } from "./translations.js";
import { equal } from "./calculator.js";
export function renderRankingTable(countries, container, gender) {
    const maxGold = Math.max(...countries.map((c) => c.Gold));
    const maxSilver = Math.max(...countries.map((c) => c.Silver));
    const maxBronze = Math.max(...countries.map((c) => c.Bronze));
    const maxTotal = Math.max(...countries.map((c) => c.Total));
    const maybeBold = (val, max) => (val === max ? `<b>${val}</b>` : `${val}`);
    const table = document.createElement("table");
    table.innerHTML = `
        <caption>${getUITranslation("palmares")} ${getUITranslation(gender)}</caption>
        <thead>
            <tr>
                <th>${getUITranslation("pos")}</th>
                <th>${getUITranslation("country")}</th>
                <th>${getUITranslation("gold")}</th>
                <th>${getUITranslation("silver")}</th>
                <th>${getUITranslation("bronze")}</th>
                <th>${getUITranslation("total")}</th>
            </tr>
        </thead>
    `;
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let rank = 1;
    for (let i = 0; i < countries.length; i++) {
        const cur = countries[i];
        let tieCount = 1;
        while (i + tieCount < countries.length && equal(cur, countries[i + tieCount])) {
            tieCount++;
        }
        const first = document.createElement("tr");
        const translatedCountry = translateCountry(cur.Country);
        first.innerHTML = `
            <td rowspan="${tieCount}">${rank}</td>
            <td>${translatedCountry}</td>
            <td rowspan="${tieCount}">${maybeBold(cur.Gold, maxGold)}</td>
            <td rowspan="${tieCount}">${maybeBold(cur.Silver, maxSilver)}</td>
            <td rowspan="${tieCount}">${maybeBold(cur.Bronze, maxBronze)}</td>
            <td rowspan="${tieCount}">${maybeBold(cur.Total, maxTotal)}</td>
        `;
        tbody.appendChild(first);
        for (let j = 1; j < tieCount; j++) {
            const tied = countries[i + j];
            const tieRow = document.createElement("tr");
            tieRow.innerHTML = `<td>${translateCountry(tied.Country)}</td>`;
            tbody.appendChild(tieRow);
        }
        i += tieCount - 1;
        rank += tieCount;
    }
    container.appendChild(table);
}
export function renderEditionTable(rows, container, gender) {
    const table = document.createElement("table");
    table.innerHTML = `
        <caption>${getUITranslation("tableau_medailles")} ${getUITranslation(gender)}</caption>
        <thead>
            <tr>
                <th>${getUITranslation("year")}</th>
                <th>${getUITranslation("city")}</th>
                <th>${getUITranslation("gold_medal")}</th>
                <th>${getUITranslation("silver_medal")}</th>
                <th>${getUITranslation("bronze_medal")}</th>
            </tr>
        </thead>
    `;
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    for (const r of rows) {
        if (r.length < 6)
            continue;
        const [year, city, , gold, silver, bronze] = r;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${year}</td>
            <td>${translateCity(city)}</td>
            <td>${translateCountry(gold)}</td>
            <td>${translateCountry(silver)}</td>
            <td>${translateCountry(bronze)}</td>
        `;
        tbody.appendChild(tr);
    }
    container.appendChild(table);
}
export function renderTotalTable(sortedCountries, container) {
    const maxGold = Math.max(...sortedCountries.map((c) => c.Gold));
    const maxSilver = Math.max(...sortedCountries.map((c) => c.Silver));
    const maxBronze = Math.max(...sortedCountries.map((c) => c.Bronze));
    const maxTotal = Math.max(...sortedCountries.map((c) => c.Total));
    const maybeBold = (val, max) => (val === max ? `<b>${val}</b>` : `${val}`);
    const table = document.createElement("table");
    table.innerHTML = `
        <caption>${getUITranslation("total_medals")}</caption>
        <thead>
            <tr>
                <th>${getUITranslation("rank")}</th>
                <th>${getUITranslation("nation")}</th>
                <th>${getUITranslation("gold")}</th>
                <th>${getUITranslation("silver")}</th>
                <th>${getUITranslation("bronze")}</th>
                <th>${getUITranslation("total")}</th>
            </tr>
        </thead>
    `;
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let rank = 1;
    for (let i = 0; i < sortedCountries.length; i++) {
        const cur = sortedCountries[i];
        let tieCount = 1;
        while (i + tieCount < sortedCountries.length && equal(cur, sortedCountries[i + tieCount])) {
            tieCount++;
        }
        const first = document.createElement("tr");
        const translatedCountry = translateCountry(cur.Country);
        first.innerHTML = `
            <td rowspan="${tieCount}">${rank}</td>
            <td>${translatedCountry}</td>
            <td rowspan="${tieCount}">${maybeBold(cur.Gold, maxGold)}</td>
            <td rowspan="${tieCount}">${maybeBold(cur.Silver, maxSilver)}</td>
            <td rowspan="${tieCount}">${maybeBold(cur.Bronze, maxBronze)}</td>
            <td rowspan="${tieCount}">${maybeBold(cur.Total, maxTotal)}</td>
        `;
        tbody.appendChild(first);
        for (let j = 1; j < tieCount; j++) {
            const tied = sortedCountries[i + j];
            const tieRow = document.createElement("tr");
            tieRow.innerHTML = `<td>${translateCountry(tied.Country)}</td>`;
            tbody.appendChild(tieRow);
        }
        i += tieCount - 1;
        rank += tieCount;
    }
    container.appendChild(table);
}
