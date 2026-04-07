export function parseCsv(csv: string): string[][] {
	return csv
		.split(/\r?\n/)
		.filter((l) => l.trim())
		.map((l) => l.split(",").map((c) => c.trim()));
}
