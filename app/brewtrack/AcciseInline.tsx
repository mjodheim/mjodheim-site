"use client";

import { useMemo, useState } from "react";
import exciseRates from "../../data/excise-rates.json";

const GOLD = "#C9A84C", HONEY = "#F5A623", CREAM = "#F5E6CC", INK = "#0A0604", INK2 = "#130D08";
const DIM = "rgba(245,230,204,0.66)", LINE = "rgba(201,168,76,0.22)";

const DEFAULT_RATE = exciseRates.rates[0];
const DEFAULT_RATE_VALUE = String(DEFAULT_RATE.beerRateEurPerHlPlato);

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
  const [rate, setRate] = useState(DEFAULT_RATE_VALUE);
  const [volume, setVolume] = useState("1000");
  const [volumeUnit, setVolumeUnit] = useState<"L" | "hL">("L");
  const [gravity, setGravity] = useState("1.050");
  const [gravityMode, setGravityMode] = useState<"OG" | "P">("OG");

  const calc = useMemo(() => {
    const rateValue = numOf(rate);
    const volIn = numOf(volume);
    const liters = volumeUnit === "hL" ? volIn * 100 : volIn;
    const gIn = numOf(gravity);
    const plato = gravityMode === "P" ? (gIn >= 0 ? gIn : NaN) : platoFromGravity(gIn);
    const valid = isFinite(rateValue) && rateValue >= 0 && isFinite(liters) && liters >= 0 && isFinite(plato) && plato >= 0;
    if (!valid) return { valid: false as const, rate: rateValue, plato };
    const hl = liters / 100;
    const duty = Math.round(hl * plato * rateValue * 100) / 100;
    return { valid: true as const, rate: rateValue, liters, plato, hl, duty, perL: liters > 0 ? duty / liters : 0, perBottle: liters > 0 ? (duty / liters) * 0.33 : 0 };
  }, [rate, volume, volumeUnit, gravity, gravityMode]);

  return (
    <section id="calculateur-accises" style={{ margin: "0 0 44px" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ color: GOLD, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>Essayez un morceau de BrewTrack</div>
        <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(1.8rem,4vw,2.5rem)", margin: 0 }}>Calculateur d'accises integre</h2>
        <p style={{ color: DIM, maxWidth: 620, margin: "10px auto 0", lineHeight: 1.55 }}>
          Le taux belge standard est pre-rempli et modifiable. BrewTrack applique : taux x hectolitres x degres Plato.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${LINE}`, borderRadius: 12, overflow: "hidden", background: INK2 }} className="bt-calc-grid">
        <div style={{ padding: 22, borderRight: `1px solid ${LINE}` }} className="bt-calc-pane">
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>Taux officiel</label>
            <input style={inputStyle} inputMode="decimal" placeholder="EUR/hL/deg. Plato" value={rate} onChange={(e) => setRate(e.target.value)} />
            <div style={{ marginTop: 8, color: "rgba(245,230,204,0.46)", fontSize: 12, lineHeight: 1.45 }}>
              {DEFAULT_RATE.label} par defaut. Modifiez ce taux si votre regime ou votre pays applique un autre bareme.
            </div>
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
            <Row k="Taux" v={calc.valid ? `${fmt(calc.rate, 5)} EUR/hL/deg. P` : "-"} />
            <Row k="Degres Plato" v={calc.valid ? `${fmt(calc.plato, 2)} deg. P` : "-"} />
            <Row k="Hectolitres" v={calc.valid ? `${fmt(calc.hl, 2)} hL` : "-"} />
            <Row k="Par litre" v={calc.valid ? `${fmt(calc.perL, 4)} EUR` : "-"} />
            <Row k="Par bouteille 33 cl" v={calc.valid ? `${fmt(calc.perBottle, 4)} EUR` : "-"} />
          </div>
        </div>
      </div>

      <p style={{ margin: "14px 0 0", fontSize: 12, color: "rgba(245,230,204,0.46)", lineHeight: 1.55 }}>
        Estimation indicative. Taux pre-rempli : {DEFAULT_RATE_VALUE} EUR/hL/deg. Plato ({DEFAULT_RATE.sourceName}, verifie le {DEFAULT_RATE.lastCheckedAt}).
        Les taux actuels doivent etre verifies sur <a href={DEFAULT_RATE.sourceUrl} target="_blank" rel="noopener" style={{ color: GOLD, textDecoration: "none" }}>les sources officielles</a>.
        Les reductions petite brasserie dependent du volume annuel et des conditions officielles.
      </p>
      <style>{`@media (max-width: 700px) { .bt-calc-grid { grid-template-columns: 1fr !important; } .bt-calc-pane { border-right: 0 !important; border-bottom: 1px solid ${LINE}; } }`}</style>
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
