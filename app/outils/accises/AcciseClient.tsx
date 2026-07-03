"use client";

import { useMemo, useState } from "react";

const GOLD = "#C9A84C", HONEY = "#F5A623", CREAM = "#F5E6CC", INK = "#0A0604", INK2 = "#140D08";
const DIM = "rgba(245,230,204,0.66)", LINE = "rgba(201,168,76,0.22)";

const PRESETS: { label: string; rate: number | "custom" }[] = [
  { label: "Belgique — taux standard", rate: 2.00043 },
  { label: "Belgique — petite brasserie (réduit)", rate: 0.3966 },
  { label: "Allemagne — standard", rate: 0.787 },
  { label: "Allemagne — petite brasserie", rate: 0.3935 },
  { label: "Autriche — standard", rate: 2.0 },
  { label: "Personnalisé…", rate: "custom" },
];

function platoFromGravity(sg: number): number {
  if (!(sg > 1)) return 0;
  const g = sg;
  const p = -616.868 + 1111.14 * g - 630.272 * g * g + 135.997 * g * g * g;
  return p < 0 ? 0 : Math.round(p * 100) / 100;
}
const numOf = (s: string) => { const v = parseFloat(s.replace(",", ".")); return isFinite(v) ? v : NaN; };
const fmt = (n: number, d: number) => (isFinite(n) ? n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) : "—");

const inputStyle: React.CSSProperties = {
  width: "100%", background: INK, color: CREAM, border: `1px solid ${LINE}`,
  borderRadius: 8, padding: "11px 12px", fontSize: 16, fontFamily: "inherit",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  color: "rgba(245,230,204,0.5)", marginBottom: 8, fontWeight: 600,
};

function Seg({ options, value, onChange }: { options: [string, string][]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "inline-flex", border: `1px solid ${LINE}`, borderRadius: 8, overflow: "hidden" }}>
      {options.map(([v, lbl]) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          style={{ background: value === v ? HONEY : INK, color: value === v ? "#1a1206" : DIM,
            border: "none", padding: "0 14px", cursor: "pointer", fontWeight: value === v ? 700 : 400, fontSize: 14 }}>
          {lbl}
        </button>
      ))}
    </div>
  );
}

export default function AcciseClient() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [customRate, setCustomRate] = useState("");
  const [volume, setVolume] = useState("1000");
  const [volumeUnit, setVolumeUnit] = useState<"L" | "hL">("L");
  const [gravity, setGravity] = useState("1.050");
  const [gravityMode, setGravityMode] = useState<"OG" | "P">("OG");

  const calc = useMemo(() => {
    const rate = PRESETS[presetIdx].rate === "custom" ? numOf(customRate) : (PRESETS[presetIdx].rate as number);
    const volIn = numOf(volume);
    const liters = volumeUnit === "hL" ? volIn * 100 : volIn;
    const gIn = numOf(gravity);
    const plato = gravityMode === "P" ? (gIn >= 0 ? gIn : NaN) : platoFromGravity(gIn);
    const valid = isFinite(rate) && rate >= 0 && isFinite(liters) && liters >= 0 && isFinite(plato) && plato >= 0;
    if (!valid) return { valid: false as const, rate, plato };
    const hl = liters / 100;
    const duty = Math.round(hl * plato * rate * 100) / 100;
    return { valid: true as const, rate, liters, plato, hl, duty, perL: liters > 0 ? duty / liters : 0, perBottle: liters > 0 ? (duty / liters) * 0.33 : 0 };
  }, [presetIdx, customRate, volume, volumeUnit, gravity, gravityMode]);

  // Lead capture
  const [brewery, setBrewery] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr(null);
    try {
      const res = await fetch("/api/brewtrack-lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breweryName: brewery, email, contactName: contact, source: "Calculator" }),
      });
      if (res.ok) setSent(true);
      else setErr("Une erreur s'est produite. Réessayez plus tard.");
    } catch { setErr("Service indisponible."); }
    finally { setLoading(false); }
  }

  return (
    <main style={{ background: INK, color: CREAM, minHeight: "100vh", paddingTop: 150, paddingBottom: 90 }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", color: GOLD, fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 14 }}>
          Outil gratuit · BrewTrack
        </div>
        <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(2.2rem,5vw,3.4rem)", textAlign: "center", margin: "0 0 12px" }}>
          Calculateur d'accises sur la bière
        </h1>
        <p style={{ textAlign: "center", color: DIM, maxWidth: 560, margin: "0 auto 36px" }}>
          Estimez le droit d'accise dû, au barème belge et européen : <strong style={{ color: CREAM }}>taux × hectolitres × degrés Plato</strong>. Calcul en direct.
        </p>

        {/* Calculateur */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${LINE}`, borderRadius: 12, overflow: "hidden", background: INK2 }}>
          <div style={{ padding: 24, borderRight: `1px solid ${LINE}` }}>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Barème (pays &amp; taille)</label>
              <select style={inputStyle} value={presetIdx} onChange={(e) => setPresetIdx(Number(e.target.value))}>
                {PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
              </select>
              {PRESETS[presetIdx].rate === "custom" && (
                <input style={{ ...inputStyle, marginTop: 8 }} inputMode="decimal" placeholder="Taux €/hL/°Plato"
                  value={customRate} onChange={(e) => setCustomRate(e.target.value)} />
              )}
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Volume produit</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                <input style={inputStyle} inputMode="decimal" value={volume} onChange={(e) => setVolume(e.target.value)} />
                <Seg options={[["L", "L"], ["hL", "hL"]]} value={volumeUnit} onChange={(v) => setVolumeUnit(v as "L" | "hL")} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Densité initiale (moût)</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                <input style={inputStyle} inputMode="decimal" value={gravity} onChange={(e) => setGravity(e.target.value)} />
                <Seg options={[["OG", "OG"], ["P", "°P"]]} value={gravityMode} onChange={(v) => setGravityMode(v as "OG" | "P")} />
              </div>
            </div>
          </div>
          <div style={{ padding: 24, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: HONEY, fontWeight: 600 }}>Droit d'accise estimé</div>
            <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.6rem,9vw,3.6rem)", color: GOLD, lineHeight: 1, margin: "12px 0 20px", fontVariantNumeric: "tabular-nums" }}>
              {calc.valid ? `${fmt(calc.duty, 2)} €` : "—"}
            </div>
            <div style={{ marginTop: "auto", borderTop: `1px solid ${LINE}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <Row k="Degrés Plato" v={calc.valid ? `${fmt(calc.plato, 2)} °P` : "—"} />
              <Row k="Hectolitres" v={calc.valid ? `${fmt(calc.hl, 2)} hL` : "—"} />
              <Row k="Par litre" v={calc.valid ? `${fmt(calc.perL, 4)} €` : "—"} />
              <Row k="Par bouteille 33 cl" v={calc.valid ? `${fmt(calc.perBottle, 4)} €` : "—"} />
            </div>
          </div>
        </div>

        {/* Lead capture */}
        <div style={{ marginTop: 26, border: `1px solid rgba(245,166,35,0.35)`, borderRadius: 12, padding: 26, background: "linear-gradient(135deg, rgba(245,166,35,0.08), rgba(224,90,0,0.05))" }}>
          {sent ? (
            <div style={{ textAlign: "center" }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 20 }}>Merci ! 🐝</h3>
              <p style={{ margin: 0, color: DIM }}>On revient vers vous très vite pour vous faire tester BrewTrack gratuitement.</p>
            </div>
          ) : (
            <form onSubmit={submit}>
              <h3 style={{ margin: "0 0 4px", fontSize: 20 }}>Fatigué de calculer vos accises à la main ?</h3>
              <p style={{ margin: "0 0 16px", color: DIM, fontSize: 15 }}>
                BrewTrack le fait automatiquement sur tous vos brassins — et gère recettes, stock, ventes et factures.
                Laissez-nous vos coordonnées : on vous fait tester <strong style={{ color: CREAM }}>gratuitement</strong> (outil web + appli mobile en test).
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <input style={inputStyle} placeholder="Nom de la brasserie *" value={brewery} onChange={(e) => setBrewery(e.target.value)} required />
                <input style={inputStyle} type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <input style={{ ...inputStyle, marginBottom: 12 }} placeholder="Votre prénom (facultatif)" value={contact} onChange={(e) => setContact(e.target.value)} />
              <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: DIM, marginBottom: 16, cursor: "pointer" }}>
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required style={{ marginTop: 3 }} />
                <span>J'accepte d'être recontacté par BrewTrack au sujet de l'essai. Désinscription à tout moment.</span>
              </label>
              {err && <p style={{ color: "#E05A00", fontSize: 14 }}>{err}</p>}
              <button type="submit" disabled={loading || !brewery || !email || !consent}
                style={{ background: HONEY, color: "#1a1206", border: "none", fontWeight: 700, padding: "13px 26px", borderRadius: 8, fontSize: 15, cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
                {loading ? "Envoi…" : "Je veux tester BrewTrack gratuitement →"}
              </button>
              <div style={{ marginTop: 14, fontSize: 14 }}>
                <span style={{ color: DIM }}>Ou allez-y directement : </span>
                <a href="https://brewtrack.mjodheim.be" target="_blank" rel="noopener"
                  style={{ color: GOLD, fontWeight: 600, textDecoration: "none" }}>
                  découvrir BrewTrack →
                </a>
              </div>
            </form>
          )}
        </div>

        <p style={{ marginTop: 20, fontSize: 12, color: "rgba(245,230,204,0.4)", lineHeight: 1.55 }}>
          <strong style={{ color: DIM }}>Estimation.</strong> Barème litre-hectolitre par degré Plato (Belgique et plusieurs pays UE). Les taux réduits « petite brasserie » dépendent de la production annuelle et des seuils officiels — vérifiez auprès des Douanes &amp; Accises. Ne remplace pas une déclaration officielle.
        </p>
      </div>
    </main>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: "rgba(245,230,204,0.5)" }}>{k}</span>
      <span style={{ color: CREAM, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{v}</span>
    </div>
  );
}
