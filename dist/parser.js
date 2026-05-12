export function parseCsv(csv) {
    return csv
        .split(/\r?\n/)
        .filter((l) => l.trim())
        .map((l) => l.split(",").map((c) => c.trim()));
}
