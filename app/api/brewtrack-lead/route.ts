import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const SUPPORTED_LANGUAGES = new Set(["fr", "en", "nl", "de", "es", "it", "pt", "pl", "cs", "da", "sv", "no"]);

function normalizeLanguage(value: unknown, fallback = "fr") {
  const code = typeof value === "string" ? value.trim().slice(0, 2).toLowerCase() : "";
  return SUPPORTED_LANGUAGES.has(code) ? code : fallback;
}

// Transmet un lead capté sur le site (calculateur / formulaire BrewTrack) vers la
// Console Croissance de BrewTrack. La clé d'ingestion reste côté serveur (jamais
// exposée au navigateur). Lead consenti (la personne a soumis son email volontairement).
export async function POST(req: NextRequest) {
  if (!rateLimit(`btlead:${clientIp(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Trop d'envois. Réessayez dans quelques minutes." }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const breweryName = str(body.breweryName);
  const email = str(body.email);
  const contactName = str(body.contactName);
  const country = str(body.country);
  const acceptLanguage = req.headers.get("accept-language")?.split(",")[0];
  const browserLanguage = normalizeLanguage(acceptLanguage);
  const language = normalizeLanguage(body.language, browserLanguage);

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!breweryName || !EMAIL_RE.test(email) || breweryName.length > 160 || email.length > 200) {
    return NextResponse.json({ error: "Nom de brasserie et email valides requis." }, { status: 400 });
  }

  const apiUrl = process.env.BREWTRACK_API_URL ?? "https://brewtrack.mjodheim.be";
  const key = process.env.GROWTH_INGEST_KEY;
  if (!key) {
    return NextResponse.json({ error: "Ingestion non configurée." }, { status: 503 });
  }

  try {
    const res = await fetch(`${apiUrl}/api/growth/lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Growth-Key": key },
      body: JSON.stringify({
        breweryName, email,
        contactName: contactName || null,
        country: country || null,
        language,
        source: typeof body.source === "string" ? body.source : "Website",
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Enregistrement impossible pour le moment." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Service indisponible." }, { status: 502 });
  }
}
