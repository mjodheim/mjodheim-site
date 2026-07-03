import { readFile, writeFile } from "node:fs/promises";

const DATA_FILE = new URL("../data/excise-rates.json", import.meta.url);
const OFFICIAL_HOSTS = new Set([
  "finances.belgium.be",
  "eservices.minfin.fgov.be",
  "taxation-customs.ec.europa.eu",
]);

const today = new Date().toISOString().slice(0, 10);

function assertOfficialUrl(url) {
  const host = new URL(url).hostname;
  if (!OFFICIAL_HOSTS.has(host)) {
    throw new Error(`Refusing non-official source: ${url}`);
  }
}

async function fetchOfficialText(url) {
  assertOfficialUrl(url);
  const response = await fetch(url, {
    headers: {
      "user-agent": "mjodheim-site excise-rate-checker/1.0 (+https://mjodheim.be)",
      "accept": "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
    },
  });
  if (!response.ok) throw new Error(`Official source returned ${response.status}: ${url}`);
  return response.text();
}

function normalizeNumber(value) {
  return Number.parseFloat(value.replace(/\s/g, "").replace(",", "."));
}

function extractBelgianBeerRateFromOfficialText(text) {
  const compact = text.replace(/\s+/g, " ");
  const contexts = [
    /bi[eè]re.{0,240}?(\d+[,.]\d{3,6}).{0,120}?(?:hl|hectolitre).{0,80}?(?:plato|degr[ée])/i,
    /(?:hl|hectolitre).{0,80}?(?:plato|degr[ée]).{0,240}?(\d+[,.]\d{3,6})/i,
  ];
  for (const pattern of contexts) {
    const match = compact.match(pattern);
    if (match) {
      const value = normalizeNumber(match[1]);
      if (Number.isFinite(value) && value > 0 && value < 20) return value;
    }
  }
  return null;
}

async function main() {
  const data = JSON.parse(await readFile(DATA_FILE, "utf8"));
  let changed = false;
  const notes = [];

  for (const rate of data.rates) {
    if (rate.countryCode !== "BE") continue;

    const text = await fetchOfficialText(rate.sourceUrl);
    const extracted = extractBelgianBeerRateFromOfficialText(text);

    if (extracted === null) {
      notes.push(`BE: official source read, but no deterministic beer rate was extracted from ${rate.sourceUrl}`);
      continue;
    }

    if (Math.abs(extracted - rate.beerRateEurPerHlPlato) > 0.000001) {
      notes.push(`BE: ${rate.beerRateEurPerHlPlato} -> ${extracted}`);
      rate.beerRateEurPerHlPlato = extracted;
      rate.verification = "automatic-official-source";
      rate.lastCheckedAt = today;
      changed = true;
    }
  }

  if (changed) {
    data.updatedAt = today;
    await writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`);
  }

  if (notes.length) {
    console.log(notes.join("\n"));
  } else {
    console.log("No excise rate changes detected from official sources.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
