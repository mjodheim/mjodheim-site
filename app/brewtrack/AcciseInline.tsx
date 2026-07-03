"use client";

import { useMemo, useState } from "react";

const GOLD = "#C9A84C", HONEY = "#F5A623", CREAM = "#F5E6CC", INK = "#0A0604", INK2 = "#130D08";
const DIM = "rgba(245,230,204,0.66)", LINE = "rgba(201,168,76,0.22)";

const LEAD_LANGUAGES = [
  { code: "fr", label: "Francais" },
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Espanol" },
  { code: "it", label: "Italiano" },
  { code: "pt", label: "Portugues" },
  { code: "pl", label: "Polski" },
  { code: "cs", label: "Cestina" },
  { code: "da", label: "Dansk" },
  { code: "sv", label: "Svenska" },
  { code: "no", label: "Norsk" },
];

const PRESETS: { label: string; rate: number | "custom" }[] = [
  { label: "Belgique - taux standard", rate: 2.00043 },
  { label: "Belgique - petite brasserie", rate: 0.3966 },
  { label: "Allemagne - standard", rate: 0.787 },
  { label: "Allemagne - petite brasserie", rate: 0.3935 },
  { label: "Autriche - standard", rate: 2.0 },
  { label: "Personnalise", rate: "custom" },
];

function platoFromGravity(sg: number): number {
  if (!(sg > 1)) return 0;
  const p = -616.868 + 1111.14 * sg - 630.272 * sg * sg + 135.997 * sg * sg * sg;
  return p < 0 ? 0 : Math.round(p * 100) / 100;
}
const numOf = (s: string) => { const v = parseFloat(s.replace(",", ".")); return isFinite(v) ? v : NaN; };
const fmt = (n: number, d: number) => (isFinite(n) ? n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d }) : "-");

const inputStyle: React.CSSProperties = {
  width: "100%", background: INK, color: CREAM, border: `1px solid ${LINE}`,
  borderRadius: 8, padding: "11px 12px", fontSize: 15, fontFamily: "inherit",
};
const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
  color: "rgba(245,230,204,0.5)", marginBottom: 8, fontWeight: 700,
};

function Seg({ options, value, onChange }: { options: [string, string][]; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: "inline-flex", border: `1px solid ${LINE}`, borderRadius: 8, overflow: "hidden" }}>
      {options.map(([v, lbl]) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          style={{ background: value === v ? HONEY : INK, color: value === v ? "#1a1206" : DIM,
            border: "none", padding: "0 13px", cursor: "pointer", fontWeight: value === v ? 700 : 500, fontSize: 14 }}>
          {lbl}
        </button>
      ))}
    </div>
  );
}

export default function AcciseInline() {
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

  const [brewery, setBrewery] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [language, setLanguage] = useState("fr");
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
        body: JSON.stringify({ breweryName: brewery, email, contactName: contact, language, source: "BrewTrackPageCalculator" }),
      });
      if (res.ok) setSent(true);
      else setErr("Enregistrement impossible pour le moment.");
    } catch { setErr("Service indisponible."); }
    finally { setLoading(false); }
  }

  return (
    <section id="calculateur-accises" style={{ margin: "0 0 44px" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ color: GOLD, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>Essayez un morceau de BrewTrack</div>
        <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(1.8rem,4vw,2.5rem)", margin: 0 }}>Calculateur d'accises integre</h2>
        <p style={{ color: DIM, maxWidth: 560, margin: "10px auto 0", lineHeight: 1.55 }}>Le meme type de calcul que BrewTrack automatise sur vos brassins, ventes et documents.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${LINE}`, borderRadius: 12, overflow: "hidden", background: INK2 }} className="bt-calc-grid">
        <div style={{ padding: 22, borderRight: `1px solid ${LINE}` }} className="bt-calc-pane">
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Bareme</label>
            <select style={inputStyle} value={presetIdx} onChange={(e) => setPresetIdx(Number(e.target.value))}>
              {PRESETS.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>
            {PRESETS[presetIdx].rate === "custom" && (
              <input style={{ ...inputStyle, marginTop: 8 }} inputMode="decimal" placeholder="Taux EUR/hL/Plato" value={customRate} onChange={(e) => setCustomRate(e.target.value)} />
            )}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Volume produit</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
              <input style={inputStyle} inputMode="decimal" value={volume} onChange={(e) => setVolume(e.target.value)} />
              <Seg options={[["L", "L"], ["hL", "hL"]]} value={volumeUnit} onChange={(v) => setVolumeUnit(v as "L" | "hL")} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Densite initiale</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
              <input style={inputStyle} inputMode="decimal" value={gravity} onChange={(e) => setGravity(e.target.value)} />
              <Seg options={[["OG", "OG"], ["P", "Plato"]]} value={gravityMode} onChange={(v) => setGravityMode(v as "OG" | "P")} />
            </div>
          </div>
        </div>
        <div style={{ padding: 22, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: HONEY, fontWeight: 700 }}>Droit estime</div>
          <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.6rem,9vw,3.5rem)", color: GOLD, lineHeight: 1, margin: "12px 0 20px", fontVariantNumeric: "tabular-nums" }}>
            {calc.valid ? `${fmt(calc.duty, 2)} EUR` : "-"}
          </div>
          <div style={{ marginTop: "auto", borderTop: `1px solid ${LINE}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
            <Row k="Degres Plato" v={calc.valid ? `${fmt(calc.plato, 2)} P` : "-"} />
            <Row k="Hectolitres" v={calc.valid ? `${fmt(calc.hl, 2)} hL` : "-"} />
            <Row k="Par litre" v={calc.valid ? `${fmt(calc.perL, 4)} EUR` : "-"} />
            <Row k="Par bouteille 33 cl" v={calc.valid ? `${fmt(calc.perBottle, 4)} EUR` : "-"} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18, border: `1px solid rgba(245,166,35,0.35)`, borderRadius: 12, padding: 22, background: "linear-gradient(135deg, rgba(245,166,35,0.08), rgba(224,90,0,0.05))" }}>
        {sent ? (
          <p style={{ textAlign: "center", margin: 0, color: DIM }}>Merci. On vous recontacte pour vous faire tester BrewTrack gratuitement.</p>
        ) : (
          <form onSubmit={submit}>
            <h3 style={{ margin: "0 0 6px", fontSize: 19 }}>Vous voulez voir BrewTrack sur vos vrais brassins ?</h3>
            <p style={{ margin: "0 0 14px", color: DIM, fontSize: 15 }}>Laissez vos coordonnees : on vous ouvre un essai et on cherche aussi des testeurs pour l'app mobile.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }} className="bt-lead-grid">
              <input style={inputStyle} placeholder="Nom de la brasserie *" value={brewery} onChange={(e) => setBrewery(e.target.value)} required />
              <input style={inputStyle} type="email" placeholder="Email *" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input style={inputStyle} placeholder="Votre prenom" value={contact} onChange={(e) => setContact(e.target.value)} />
              <select style={inputStyle} value={language} onChange={(e) => setLanguage(e.target.value)} aria-label="Langue preferee">
                {LEAD_LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
              </select>
            </div>
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: DIM, marginBottom: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required style={{ marginTop: 3 }} />
              <span>J'accepte d'etre recontacte par BrewTrack au sujet de l'essai.</span>
            </label>
            {err && <p style={{ color: "#E05A00", fontSize: 14 }}>{err}</p>}
            <button type="submit" disabled={loading || !brewery || !email || !consent}
              style={{ background: HONEY, color: "#1a1206", border: "none", fontWeight: 700, padding: "13px 24px", borderRadius: 8, fontSize: 15, cursor: "pointer", opacity: loading ? 0.6 : 1 }}>
              {loading ? "Envoi..." : "Tester BrewTrack gratuitement"}
            </button>
          </form>
        )}
      </div>
      <style>{`@media (max-width: 700px) { .bt-calc-grid, .bt-lead-grid { grid-template-columns: 1fr !important; } .bt-calc-pane { border-right: 0 !important; border-bottom: 1px solid ${LINE}; } }`}</style>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span style={{ color: "rgba(245,230,204,0.5)" }}>{k}</span>
      <span style={{ color: CREAM, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{v}</span>
    </div>
  );
}
