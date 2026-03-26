import type { MedalStats } from './types.js';
import { translateCountry } from './translations.js';
import { equal } from './calculator.js';

export function renderRankingTable(
    countries: MedalStats[],
    container: HTMLElement,
    genderLabel: string
): void {
    const maxGold = Math.max(...countries.map(c => c.Gold));
    const maxSilver = Math.max(...countries.map(c => c.Silver));
    const maxBronze = Math.max(...countries.map(c => c.Bronze));
    const maxTotal = Math.max(...countries.map(c => c.Total));

    const maybeBold = (val: number, max: number): string => val === max ? `<b>${val}</b>` : `${val}`;

    const table = document.createElement('table');
    table.innerHTML = `
        <caption>Palmarès ${genderLabel}</caption>
        <thead>
            <tr>
                <th>Pos.</th>
                <th>Pays</th>
                <th>Or</th>
                <th>Argent</th>
                <th>Bronze</th>
                <th>Total</th>
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

export function renderEditionTable(
    rows: string[][],
    container: HTMLElement,
    genderLabel: string
): void {
    const table = document.createElement("table");
    table.innerHTML = `
        <caption>Tableau des médailles ${genderLabel}</caption>
        <thead>
            <tr>
                <th>Année</th>
                <th>Ville</th>
                <th>Médaille d'or</th>
                <th>Médaille d'argent</th>
                <th>Médaille de bronze</th>
            </tr>
        </thead>
    `;
    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    for (const r of rows) {
        if (r.length < 6) continue;
        const [year, city, , gold, silver, bronze] = r;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${year}</td>
            <td>${city}</td>
            <td>${translateCountry(gold)}</td>
            <td>${translateCountry(silver)}</td>
            <td>${translateCountry(bronze)}</td>
        `;
        tbody.appendChild(tr);
    }
    container.appendChild(table);
}

export function renderTotalTable(sortedCountries: MedalStats[], container: HTMLElement): void {
    const maxGold = Math.max(...sortedCountries.map(c => c.Gold));
    const maxSilver = Math.max(...sortedCountries.map(c => c.Silver));
    const maxBronze = Math.max(...sortedCountries.map(c => c.Bronze));
    const maxTotal = Math.max(...sortedCountries.map(c => c.Total));

    const maybeBold = (val: number, max: number): string => val === max ? `<b>${val}</b>` : `${val}`;

    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Rang</th>
                <th>Nation</th>
                <th>Or</th>
                <th>Argent</th>
                <th>Bronze</th>
                <th>Total</th>
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
            const tieRow = document.createElement('tr');
            tieRow.innerHTML = `<td>${translateCountry(tied.Country)}</td>`;
            tbody.appendChild(tieRow);
        }

        i += tieCount - 1;
        rank += tieCount;
    }
    container.appendChild(table);
}