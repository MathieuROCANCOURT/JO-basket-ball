export function parseCsv(csv: string): string[][] {
	return csv
		.split(/\r?\n/)
		.filter((l): string => l.trim())
		.map((l): string[] => l.split(",").map((c): string => c.trim()));
}
