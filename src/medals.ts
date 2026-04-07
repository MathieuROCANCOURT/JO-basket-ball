import { initializeTranslations, getGenderLabel } from "./translations.js";
import { parseCsv } from "./parser.js";
import { buildMedalDict, mergeDicts, medalComparator } from "./calculator.js";
import { renderRankingTable, renderEditionTable, renderTotalTable } from "./renderer.js";

import type { MedalStats, UITranslations } from "./types.js";

function detectLanguage(): "fr" | "en" {
	const path = window.location.pathname;
	if (path.includes("-en")) {
		return "en";
	}
	return "fr";
}

async function init(): Promise<void> {
	const lang: string = detectLanguage();

	try {
		// Charger les traductions AVANT de traiter les données
		await initializeTranslations(lang);

		const [menCsv, womenCsv] = await Promise.all([
			fetch("../../data/men_medals.csv").then((r) => r.text()),
			fetch("../../data/woman_medals.csv").then((r) => r.text()),
		]);

		const menRows: string[][] = parseCsv(menCsv);
		const womenRows: string[][] = parseCsv(womenCsv);

		menRows.shift();
		womenRows.shift();

		const menDict: Record<string, MedalStats> = buildMedalDict(menRows);
		const womenDict: Record<string, MedalStats> = buildMedalDict(womenRows);

		const menArray: MedalStats[] = Object.values(menDict).sort(medalComparator);
		const womenArray: MedalStats[] = Object.values(womenDict).sort(medalComparator);

		const menFieldset: HTMLElement = document.querySelector(".masculin") as HTMLElement;
		const womenFieldset: HTMLElement = document.querySelector(".feminin") as HTMLElement;

		const genderLabelMen: "men" | "women" = getGenderLabel("men");
		const genderLabelWomen: "men" | "women" = getGenderLabel("women");

		renderEditionTable(menRows, menFieldset, genderLabelMen);
		menFieldset.appendChild(document.createElement("p"));
		renderRankingTable(menArray, menFieldset, genderLabelMen);

		renderEditionTable(womenRows, womenFieldset, genderLabelWomen);
		womenFieldset.appendChild(document.createElement("p"));
		renderRankingTable(womenArray, womenFieldset, genderLabelWomen);

		const totalDict: Record<string, MedalStats> = mergeDicts(menDict, womenDict);
		const totalArray: MedalStats[] = Object.values(totalDict).sort(medalComparator);

		const totalFieldset: HTMLElement = document.querySelector("#totalMedalsContainer fieldset") as HTMLElement;
		renderTotalTable(totalArray, totalFieldset);
	} catch (error) {
		console.error("Erreur lors du chargement des données:", error);
	}
}

document.addEventListener("DOMContentLoaded", (): void => {
	init().catch((error) => {
		console.error("Erreur critique lors de l'initialisation :", error);
	});
});
