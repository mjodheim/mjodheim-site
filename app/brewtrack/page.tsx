import type { Metadata } from "next";
import AcciseInline from "./AcciseInline";

export const metadata: Metadata = {
  title: { absolute: "BrewTrack – le logiciel de gestion fait par un brasseur" },
  description:
    "BrewTrack : le logiciel tout-en-un pour brasseries et meaderies, créé par le brasseur de Mjödheim. De la recette à la facture, conforme Belgique/UE (accises, facturation électronique, Bancontact). Essai gratuit.",
  openGraph: {
    title: "BrewTrack – fait par un brasseur, pour les brasseurs",
    description:
      "De la recette à la facture, en un seul outil. Conforme UE. Essayez gratuitement.",
    url: "https://www.mjodheim.be/brewtrack",
  },
  alternates: { canonical: "https://www.mjodheim.be/brewtrack" },
};

const APP = "https://brewtrack.mjodheim.be";
const GOLD = "#C9A84C", HONEY = "#F5A623", CREAM = "#F5E6CC", DIM = "rgba(245,230,204,0.7)", LINE = "rgba(201,168,76,0.22)";

const features: { t: string; d: string }[] = [
  { t: "Fait par un brasseur", d: "Créé et utilisé au quotidien par la brasserie Mjödheim. Pas une usine à logiciels — un outil pensé par quelqu'un qui brasse vraiment." },
  { t: "De la recette à la facture", d: "Recettes, brassins, stock, ventes, clients, factures et accises — tout au même endroit, fini les tableurs éparpillés." },
  { t: "Conforme Belgique & UE", d: "Accises sur la bière, facturation électronique, TVA, Bancontact. Le terrain que les outils américains ignorent." },
  { t: "Sur le téléphone aussi", d: "Une appli mobile pour suivre sa production, vendre au marché et facturer depuis la cave. (Actuellement en test — on cherche des testeurs.)" },
];

export default function BrewTrackPage() {
  return (
    <main style={{ background: "#0A0604", color: CREAM, minHeight: "100vh", paddingTop: 150, paddingBottom: 90 }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 22px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div style={{ color: GOLD, fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 16 }}>
            Le logiciel de la maison
          </div>
          <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(2.4rem,6vw,4rem)", lineHeight: 1.1, margin: "0 0 18px" }}>
            BrewTrack
          </h1>
          <p style={{ color: DIM, fontSize: "1.15rem", maxWidth: "48ch", margin: "0 auto 28px", lineHeight: 1.6 }}>
            Le logiciel de gestion <strong style={{ color: CREAM }}>tout-en-un pour brasseries et meaderies</strong>, né dans la brasserie Mjödheim parce qu'aucun outil ne faisait vraiment le job. De la recette à la facture, pensé pour la Belgique et l'Europe.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`${APP}/register`} target="_blank" rel="noopener"
              style={{ background: HONEY, color: "#1a1206", fontWeight: 700, textDecoration: "none", padding: "14px 28px", borderRadius: 8, fontSize: 16 }}>
              Essayer gratuitement →
            </a>
            <a href={APP} target="_blank" rel="noopener"
              style={{ background: "transparent", color: GOLD, fontWeight: 600, textDecoration: "none", padding: "14px 24px", borderRadius: 8, fontSize: 16, border: `1px solid ${LINE}` }}>
              Voir l'application
            </a>
          </div>
          <p style={{ color: "rgba(245,230,204,0.4)", fontSize: 13, marginTop: 14 }}>
            Palier gratuit pour démarrer · s'ouvre dans un nouvel onglet
          </p>
        </div>

        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 44 }} className="bt-grid">
          {features.map((f) => (
            <div key={f.t} style={{ border: `1px solid ${LINE}`, borderRadius: 10, padding: "22px 24px", background: "#130D08" }}>
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.35rem", fontWeight: 400, color: HONEY, margin: "0 0 8px" }}>{f.t}</h2>
              <p style={{ color: DIM, fontSize: 15, margin: 0, lineHeight: 1.55 }}>{f.d}</p>
            </div>
          ))}
        </div>

        <AcciseInline />

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", border: `1px solid rgba(245,166,35,0.35)`, borderRadius: 12, padding: "32px 26px", background: "linear-gradient(135deg, rgba(245,166,35,0.08), rgba(224,90,0,0.05))" }}>
          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "1.8rem", margin: "0 0 8px" }}>
            Vous brassez ? Essayez-le.
          </h2>
          <p style={{ color: DIM, margin: "0 0 20px", maxWidth: "44ch", marginLeft: "auto", marginRight: "auto" }}>
            Gratuit pour commencer. Et si vous voulez tester l'appli mobile avant sa sortie, on cherche justement des testeurs.
          </p>
          <a href={`${APP}/register`} target="_blank" rel="noopener"
            style={{ background: HONEY, color: "#1a1206", fontWeight: 700, textDecoration: "none", padding: "14px 30px", borderRadius: 8, fontSize: 16, display: "inline-block" }}>
            Ouvrir BrewTrack →
          </a>
        </div>
      </div>

      <style>{`@media (max-width: 640px) { .bt-grid { grid-template-columns: 1fr !important; } }`}</style>
    </main>
  );
}
