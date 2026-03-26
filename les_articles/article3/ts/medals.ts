import { initializeTranslations } from './translations.js';
import { parseCsv } from './parser.js';
import { buildMedalDict, mergeDicts, medalComparator } from './calculator.js';
import { renderRankingTable, renderEditionTable, renderTotalTable } from './renderer.js';

async function init(): Promise<void> {
    try {
        // Charger les traductions AVANT de traiter les données
        await initializeTranslations('fr');

        const [menCsv, womenCsv] = await Promise.all([
            fetch('../../data/men_medals.csv').then(r => r.text()),
            fetch('../../data/woman_medals.csv').then(r => r.text())
        ]);

        const menRows = parseCsv(menCsv);
        const womenRows = parseCsv(womenCsv);

        menRows.shift();
        womenRows.shift();

        const menDict = buildMedalDict(menRows);
        const womenDict = buildMedalDict(womenRows);

        const menArray = Object.values(menDict).sort(medalComparator);
        const womenArray = Object.values(womenDict).sort(medalComparator);

        const menFieldset = document.querySelector('.masculin') as HTMLElement;
        const womenFieldset = document.querySelector('.feminin') as HTMLElement;

        renderEditionTable(menRows, menFieldset, 'Hommes');
        menFieldset.appendChild(document.createElement("p"));
        renderRankingTable(menArray, menFieldset, 'Hommes');

        renderEditionTable(womenRows, womenFieldset, 'Femmes');
        womenFieldset.appendChild(document.createElement("p"));
        renderRankingTable(womenArray, womenFieldset, 'Femmes');

        const totalDict = mergeDicts(menDict, womenDict);
        const totalArray = Object.values(totalDict).sort(medalComparator);

        const totalFieldset = document.querySelector('#totalMedalsContainer fieldset') as HTMLElement;
        renderTotalTable(totalArray, totalFieldset);

    } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
    }
}

document.addEventListener('DOMContentLoaded', (): void => {
    init().catch(error => {
        console.error("Erreur critique lors de l'initialisation :", error);
    });
});