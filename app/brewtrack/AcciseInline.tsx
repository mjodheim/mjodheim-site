"use client";

import { useMemo, useState } from "react";
import exciseRates from "../../data/excise-rates.json";

const GOLD = "#C9A84C", HONEY = "#F5A623", CREAM = "#F5E6CC", INK = "#0A0604", INK2 = "#130D08";
const DIM = "rgba(245,230,204,0.66)", LINE = "rgba(201,168,76,0.22)";

const DEFAULT_RATE = exciseRates.rates[0];
const DEFAULT_RATE_VALUE = String(DEFAULT_RATE.beerRateEurPerHlPlato);
const SUPPORTED = ["fr", "en", "nl", "de", "es", "it", "pt", "pl", "cs", "da", "sv", "no"] as const;
type Lang = typeof SUPPORTED[number];

type CalcCopy = {
  eyebrow: string; title: string; intro: string; rate: string; rateHelp: string; volume: string; gravity: string; duty: string;
  rateRow: string; plato: string; hectoliters: string; perLiter: string; perBottle: string; note1: string; noteLink: string; note2: string;
};

const COPY: Record<Lang, CalcCopy> = {
  fr: { eyebrow: "{copy.eyebrow}", title: "Calculateur d'accises intégré", intro: "Le taux belge standard est pré-rempli et modifiable. BrewTrack applique : taux x hectolitres x degrés Plato.", rate: "{copy.rate}", rateHelp: "Belgique - taux standard par défaut. Modifiez ce taux si votre régime ou votre pays applique un autre barème.", volume: "{copy.volume}", gravity: "Densité initiale", duty: "Droit estimé", rateRow: "{copy.rateRow}", plato: "Degrés Plato", hectoliters: "{copy.hectoliters}", perLiter: "{copy.perLiter}", perBottle: "{copy.perBottle}", note1: "Estimation indicative. {copy.rateRow} pré-rempli", noteLink: "sources officielles", note2: "Les réductions petite brasserie dépendent du volume annuel et des conditions officielles." },
  en: { eyebrow: "Try a piece of BrewTrack", title: "Built-in excise calculator", intro: "The Belgian standard rate is pre-filled and editable. BrewTrack applies: rate x hectolitres x Plato degrees.", rate: "Official rate", rateHelp: "Belgium - standard rate by default. Change it if your regime or country uses another rate.", volume: "Produced volume", gravity: "Original gravity", duty: "Estimated duty", rateRow: "Rate", plato: "Plato degrees", hectoliters: "{copy.hectoliters}", perLiter: "Per litre", perBottle: "Per 33 cl bottle", note1: "Indicative estimate. Pre-filled rate", noteLink: "official sources", note2: "Small brewery reductions depend on annual volume and official conditions." },
  nl: { eyebrow: "Probeer een stukje BrewTrack", title: "Ingebouwde accijnscalculator", intro: "Het Belgische standaardtarief is vooraf ingevuld en aanpasbaar. BrewTrack past toe: tarief x hectoliters x graden Plato.", rate: "Officieel tarief", rateHelp: "België - standaardtarief. Pas dit aan als je regime of land een ander tarief gebruikt.", volume: "Geproduceerd volume", gravity: "Begindichtheid", duty: "Geschatte accijns", rateRow: "Tarief", plato: "Graden Plato", hectoliters: "Hectoliters", perLiter: "Per liter", perBottle: "Per fles 33 cl", note1: "Indicatieve schatting. Vooraf ingevuld tarief", noteLink: "officiële bronnen", note2: "Kortingen voor kleine brouwerijen hangen af van jaarvolume en officiële voorwaarden." },
  de: { eyebrow: "Ein Stück BrewTrack ausprobieren", title: "Integrierter Verbrauchsteuerrechner", intro: "Der belgische Standardsatz ist vorausgefüllt und änderbar. BrewTrack rechnet: Satz x Hektoliter x Grad Plato.", rate: "Offizieller Satz", rateHelp: "Belgien - Standardsatz. Ändere ihn, wenn dein Regime oder Land einen anderen Satz nutzt.", volume: "Produziertes Volumen", gravity: "Stammwürze", duty: "Geschätzte Steuer", rateRow: "Satz", plato: "Grad Plato", hectoliters: "Hektoliter", perLiter: "Pro Liter", perBottle: "Pro 33-cl-Flasche", note1: "Unverbindliche Schätzung. Vorausgefüllter Satz", noteLink: "offizielle Quellen", note2: "Ermäßigungen für kleine Brauereien hängen von Jahresvolumen und offiziellen Bedingungen ab." },
  es: { eyebrow: "Prueba una parte de BrewTrack", title: "Calculadora de impuestos especiales", intro: "El tipo belga estándar está prellenado y se puede modificar. BrewTrack aplica: tipo x hectolitros x grados Plato.", rate: "Tipo oficial", rateHelp: "Bélgica - tipo estándar por defecto. Cámbialo si tu régimen o país aplica otro tipo.", volume: "Volumen producido", gravity: "Densidad inicial", duty: "Impuesto estimado", rateRow: "Tipo", plato: "Grados Plato", hectoliters: "Hectolitros", perLiter: "Por litro", perBottle: "Por botella 33 cl", note1: "Estimación indicativa. Tipo prellenado", noteLink: "fuentes oficiales", note2: "Las reducciones para pequeñas cervecerías dependen del volumen anual y de las condiciones oficiales." },
  it: { eyebrow: "Prova un pezzo di BrewTrack", title: "Calcolatore accise integrato", intro: "L'aliquota belga standard è precompilata e modificabile. BrewTrack applica: aliquota x ettolitri x gradi Plato.", rate: "Aliquota ufficiale", rateHelp: "Belgio - aliquota standard predefinita. Modificala se il tuo regime o paese applica un'altra aliquota.", volume: "Volume prodotto", gravity: "Densità iniziale", duty: "Accisa stimata", rateRow: "Aliquota", plato: "Gradi Plato", hectoliters: "Ettolitri", perLiter: "Per litro", perBottle: "Per bottiglia 33 cl", note1: "Stima indicativa. Aliquota precompilata", noteLink: "fonti ufficiali", note2: "Le riduzioni per piccoli birrifici dipendono dal volume annuo e dalle condizioni ufficiali." },
  pt: { eyebrow: "Experimente uma parte do BrewTrack", title: "Calculadora de impostos integrada", intro: "A taxa belga padrão está preenchida e é editável. O BrewTrack aplica: taxa x hectolitros x graus Plato.", rate: "Taxa oficial", rateHelp: "Bélgica - taxa padrão por defeito. Altere se o seu regime ou país aplicar outra taxa.", volume: "Volume produzido", gravity: "Densidade inicial", duty: "Imposto estimado", rateRow: "Taxa", plato: "Graus Plato", hectoliters: "Hectolitros", perLiter: "Por litro", perBottle: "Por garrafa 33 cl", note1: "Estimativa indicativa. Taxa preenchida", noteLink: "fontes oficiais", note2: "As reduções para pequenas cervejarias dependem do volume anual e das condições oficiais." },
  pl: { eyebrow: "Wypróbuj część BrewTrack", title: "Wbudowany kalkulator akcyzy", intro: "Belgijska stawka standardowa jest wpisana domyślnie i można ją zmienić. BrewTrack liczy: stawka x hektolitry x stopnie Plato.", rate: "Stawka oficjalna", rateHelp: "Belgia - domyślna stawka standardowa. Zmień ją, jeśli Twój system lub kraj stosuje inną stawkę.", volume: "Wyprodukowana objętość", gravity: "Gęstość początkowa", duty: "Szacowana akcyza", rateRow: "Stawka", plato: "Stopnie Plato", hectoliters: "Hektolitry", perLiter: "Na litr", perBottle: "Na butelkę 33 cl", note1: "Szacunek orientacyjny. Wpisana stawka", noteLink: "źródła oficjalne", note2: "Ulgi dla małych browarów zależą od rocznego wolumenu i warunków oficjalnych." },
  cs: { eyebrow: "Vyzkoušejte část BrewTrack", title: "Vestavěná kalkulačka spotřební daně", intro: "Belgická standardní sazba je předvyplněná a upravitelná. BrewTrack počítá: sazba x hektolitry x stupně Plato.", rate: "Oficiální sazba", rateHelp: "Belgie - výchozí standardní sazba. Změňte ji, pokud váš režim nebo země používá jinou sazbu.", volume: "Vyrobený objem", gravity: "Počáteční hustota", duty: "Odhad daně", rateRow: "Sazba", plato: "Stupně Plato", hectoliters: "Hektolitry", perLiter: "Na litr", perBottle: "Na láhev 33 cl", note1: "Orientační odhad. Předvyplněná sazba", noteLink: "oficiální zdroje", note2: "Snížení pro malé pivovary závisí na ročním objemu a oficiálních podmínkách." },
  da: { eyebrow: "Prøv en del af BrewTrack", title: "Indbygget afgiftsberegner", intro: "Den belgiske standardsats er udfyldt og kan ændres. BrewTrack anvender: sats x hektoliter x Plato-grader.", rate: "Officiel sats", rateHelp: "Belgien - standardsats som standard. Ret den, hvis dit regime eller land bruger en anden sats.", volume: "Produceret volumen", gravity: "Oprindelig densitet", duty: "Anslået afgift", rateRow: "Sats", plato: "Plato-grader", hectoliters: "Hektoliter", perLiter: "Per liter", perBottle: "Per 33 cl flaske", note1: "Vejledende estimat. Forudfyldt sats", noteLink: "officielle kilder", note2: "Nedsættelser for små bryggerier afhænger af årlig volumen og officielle betingelser." },
  sv: { eyebrow: "Testa en del av BrewTrack", title: "Inbyggd punktskattekalkylator", intro: "Den belgiska standardsatsen är förifylld och kan ändras. BrewTrack använder: sats x hektoliter x Plato-grader.", rate: "Officiell sats", rateHelp: "Belgien - standardsats som standard. Ändra den om ditt system eller land använder en annan sats.", volume: "Producerad volym", gravity: "Ursprunglig densitet", duty: "Beräknad skatt", rateRow: "Sats", plato: "Plato-grader", hectoliters: "Hektoliter", perLiter: "Per liter", perBottle: "Per 33 cl flaska", note1: "Vägledande uppskattning. Förifylld sats", noteLink: "officiella källor", note2: "Nedsättningar för små bryggerier beror på årsvolym och officiella villkor." },
  no: { eyebrow: "Prøv en del av BrewTrack", title: "Innebygd avgiftskalkulator", intro: "Den belgiske standardsatsen er forhåndsutfylt og kan endres. BrewTrack bruker: sats x hektoliter x Plato-grader.", rate: "Offisiell sats", rateHelp: "Belgia - standardsats som standard. Endre den hvis ditt regime eller land bruker en annen sats.", volume: "Produsert volum", gravity: "Startdensitet", duty: "Estimert avgift", rateRow: "Sats", plato: "Plato-grader", hectoliters: "Hektoliter", perLiter: "Per liter", perBottle: "Per 33 cl flaske", note1: "Veiledende estimat. Forhåndsutfylt sats", noteLink: "offisielle kilder", note2: "Reduksjoner for små bryggerier avhenger av årsvolum og offisielle vilkår." },
};

function normalizeLang(value: string | undefined): Lang {
  const lang = (value ?? "fr").slice(0, 2).toLowerCase();
  return SUPPORTED.includes(lang as Lang) ? (lang as Lang) : "fr";
}

function platoFromGravity(sg: number): number {
  if (!(sg > 1)) return 0;
  const p = -616.868 + 1111.14 * sg - 630.272 * sg * sg + 135.997 * sg * sg * sg;
  return p < 0 ? 0 : Math.round(p * 100) / 100;
}

const numOf = (s: string) => { const v = parseFloat(s.replace(",", ".")); return isFinite(v) ? v : NaN; };
const fmt = (n: number, d: number, locale: string) => (isFinite(n) ? n.toLocaleString(locale, { minimumFractionDigits: d, maximumFractionDigits: d }) : "-");

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

export default function AcciseInline({ lang: rawLang = "fr" }: { lang?: string }) {
  const lang = normalizeLang(rawLang);
  const copy = COPY[lang];
  const locale = lang === "en" ? "en-US" : lang === "nl" ? "nl-BE" : lang === "de" ? "de-DE" : lang === "es" ? "es-ES" : lang === "it" ? "it-IT" : lang === "pt" ? "pt-PT" : lang === "pl" ? "pl-PL" : lang === "cs" ? "cs-CZ" : lang === "da" ? "da-DK" : lang === "sv" ? "sv-SE" : lang === "no" ? "nb-NO" : "fr-FR";
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
        <div style={{ color: GOLD, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 10 }}>{copy.eyebrow}</div>
        <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(1.8rem,4vw,2.5rem)", margin: 0 }}>{copy.title}</h2>
        <p style={{ color: DIM, maxWidth: 620, margin: "10px auto 0", lineHeight: 1.55 }}>
          {copy.intro}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", border: `1px solid ${LINE}`, borderRadius: 12, overflow: "hidden", background: INK2 }} className="bt-calc-grid">
        <div style={{ padding: 22, borderRight: `1px solid ${LINE}` }} className="bt-calc-pane">
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>{copy.rate}</label>
            <input style={inputStyle} inputMode="decimal" placeholder="EUR/hL/deg. Plato" value={rate} onChange={(e) => setRate(e.target.value)} />
            <div style={{ marginTop: 8, color: "rgba(245,230,204,0.46)", fontSize: 12, lineHeight: 1.45 }}>
              {copy.rateHelp}
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle}>{copy.volume}</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
              <input style={inputStyle} inputMode="decimal" value={volume} onChange={(e) => setVolume(e.target.value)} />
              <Seg options={[["L", "L"], ["hL", "hL"]]} value={volumeUnit} onChange={(v) => setVolumeUnit(v as "L" | "hL")} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>{copy.gravity}</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
              <input style={inputStyle} inputMode="decimal" value={gravity} onChange={(e) => setGravity(e.target.value)} />
              <Seg options={[["OG", "OG"], ["P", "Plato"]]} value={gravityMode} onChange={(v) => setGravityMode(v as "OG" | "P")} />
            </div>
          </div>
        </div>
        <div style={{ padding: 22, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: HONEY, fontWeight: 700 }}>{copy.duty}</div>
          <div style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2.6rem,9vw,3.5rem)", color: GOLD, lineHeight: 1, margin: "12px 0 20px", fontVariantNumeric: "tabular-nums" }}>
            {calc.valid ? `${fmt(calc.duty, 2, locale)} EUR` : "-"}
          </div>
          <div style={{ marginTop: "auto", borderTop: `1px solid ${LINE}`, paddingTop: 14, display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
            <Row k="{copy.rateRow}" v={calc.valid ? `${fmt(calc.rate, 5, locale)} EUR/hL/deg. P` : "-"} />
            <Row k="{copy.plato}" v={calc.valid ? `${fmt(calc.plato, 2, locale)} deg. P` : "-"} />
            <Row k="{copy.hectoliters}" v={calc.valid ? `${fmt(calc.hl, 2, locale)} hL` : "-"} />
            <Row k="{copy.perLiter}" v={calc.valid ? `${fmt(calc.perL, 4, locale)} EUR` : "-"} />
            <Row k="{copy.perBottle}" v={calc.valid ? `${fmt(calc.perBottle, 4, locale)} EUR` : "-"} />
          </div>
        </div>
      </div>

      <p style={{ margin: "14px 0 0", fontSize: 12, color: "rgba(245,230,204,0.46)", lineHeight: 1.55 }}>
        Estimation indicative. {copy.rateRow} pre-rempli : {DEFAULT_RATE_VALUE} EUR/hL/deg. Plato ({DEFAULT_RATE.sourceName}, verifie le {DEFAULT_RATE.lastCheckedAt}).
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
