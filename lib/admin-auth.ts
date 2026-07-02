// Authentification admin par cookie SIGNÉ (HMAC-SHA256), vérifiable côté serveur.
// Remplace l'ancien cookie statique "granted" (forgeable par n'importe qui).
// La clé de signature dérive d'ADMIN_PASSWORD → aucune nouvelle variable d'env à
// configurer. Web Crypto : fonctionne en runtime Edge (proxy.ts) comme Node (routes).

export const ADMIN_COOKIE_NAME = "mjodheim_admin_auth";

const encoder = new TextEncoder();

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD non configuré");
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function fromHex(hex: string): ArrayBuffer | null {
  if (hex.length === 0 || hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) return null;
  const buf = new ArrayBuffer(hex.length / 2);
  const view = new Uint8Array(buf);
  for (let i = 0; i < view.length; i++) view[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return buf;
}

/** Émet un jeton "<expMs>.<hmacHex>" — l'expiration fait partie du message signé. */
export async function issueAdminToken(ttlSeconds: number): Promise<string> {
  const payload = String(Date.now() + ttlSeconds * 1000);
  const sig = await crypto.subtle.sign("HMAC", await getKey(), encoder.encode(payload));
  return `${payload}.${toHex(sig)}`;
}

/** Vérifie signature ET non-expiration. Toute altération ou absence → false. */
export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const sig = fromHex(token.slice(dot + 1));
  if (!sig) return false;
  const exp = Number(payload);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  try {
    return await crypto.subtle.verify("HMAC", await getKey(), sig, encoder.encode(payload));
  } catch {
    return false;
  }
}
