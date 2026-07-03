"use client";

import AcciseInline from "../../brewtrack/AcciseInline";

const CREAM = "#F5E6CC", INK = "#0A0604", GOLD = "#C9A84C", DIM = "rgba(245,230,204,0.66)";

export default function AcciseClient() {
  return (
    <main style={{ background: INK, color: CREAM, minHeight: "100vh", paddingTop: 150, paddingBottom: 90 }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ textAlign: "center", color: GOLD, fontSize: 12, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: 14 }}>
          Outil gratuit · BrewTrack
        </div>
        <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 300, fontSize: "clamp(2.2rem,5vw,3.4rem)", textAlign: "center", margin: "0 0 12px" }}>
          Calculateur d'accises sur la biere
        </h1>
        <p style={{ textAlign: "center", color: DIM, maxWidth: 560, margin: "0 auto 36px" }}>
          Estimez le droit d'accise avec le taux officiel applicable et la base de calcul hectolitres x degres Plato.
        </p>
        <AcciseInline />
      </div>
    </main>
  );
}
