// Limiteur de débit en mémoire, best-effort. Sur serverless (Vercel), l'état
// n'est ni partagé entre instances ni durable : ça freine les rafales sur une
// instance chaude mais ce n'est pas un quota strict. Pour du robuste (multi-
// instances), brancher un store partagé (Vercel KV / Upstash Redis).

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 10_000; // garde-fou mémoire

/** Renvoie true si la requête est autorisée, false si la limite est atteinte. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  // Purge opportuniste des fenêtres expirées si la map grossit trop.
  if (buckets.size > MAX_KEYS) {
    for (const [k, b] of buckets) if (now > b.resetAt) buckets.delete(k);
  }

  const bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= limit) return false;
  bucket.count++;
  return true;
}

/** Extrait l'IP client (Vercel/derrière proxy renseigne x-forwarded-for). */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}
