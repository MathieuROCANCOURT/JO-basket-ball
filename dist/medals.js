import { initializeTranslations, getGenderLabel } from "./translations.js";
import { parseCsv } from "./parser.js";
import { buildMedalDict, mergeDicts, medalComparator } from "./calculator.js";
import { renderRankingTable, renderEditionTable, renderTotalTable } from "./renderer.js";
function detectLanguage() {
    const path = window.location.pathname;
    if (path.includes("-en")) {
        return "en";
    }
    return "fr";
}
async function init() {
    const lang = detectLanguage();
    try {
        // Charger les traductions AVANT de traiter les données
        await initializeTranslations(lang);
        const [menCsv, womenCsv] = await Promise.all([
            fetch("../../data/men_medals.csv").then((r) => r.text()),
            fetch("../../data/woman_medals.csv").then((r) => r.text()),
        ]);
        const menRows = parseCsv(menCsv);
        const womenRows = parseCsv(womenCsv);
        menRows.shift();
        womenRows.shift();
        const menDict = buildMedalDict(menRows);
        const womenDict = buildMedalDict(womenRows);
        const menArray = Object.values(menDict).sort(medalComparator);
        const womenArray = Object.values(womenDict).sort(medalComparator);
        const menFieldset = document.querySelector(".masculin");
        const womenFieldset = document.querySelector(".feminin");
        const genderLabelMen = getGenderLabel("men");
        const genderLabelWomen = getGenderLabel("women");
        renderEditionTable(menRows, menFieldset, genderLabelMen);
        menFieldset.appendChild(document.createElement("p"));
        renderRankingTable(menArray, menFieldset, genderLabelMen);
        renderEditionTable(womenRows, womenFieldset, genderLabelWomen);
        womenFieldset.appendChild(document.createElement("p"));
        renderRankingTable(womenArray, womenFieldset, genderLabelWomen);
        const totalDict = mergeDicts(menDict, womenDict);
        const totalArray = Object.values(totalDict).sort(medalComparator);
        const totalFieldset = document.querySelector("#totalMedalsContainer fieldset");
        renderTotalTable(totalArray, totalFieldset);
    }
    catch (error) {
        console.error("Erreur lors du chargement des données:", error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    init().catch((error) => {
        console.error("Erreur critique lors de l'initialisation :", error);
    });
});
