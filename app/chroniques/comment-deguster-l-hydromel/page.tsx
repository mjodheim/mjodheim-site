"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "La température : tout commence là",
    content: `Servir un hydromel trop froid tue ses arômes. Trop chaud, et l'alcool prend le dessus. La bonne température dépend du style :

Les hydromels secs et nature comme notre Brume d'Yggdrasil s'épanouissent entre 8 et 10°C — frais, comme un blanc de Bourgogne. Nos hydromels épicés comme Chaleur d'Asgard gagnent à être servis un peu plus chambré, entre 10 et 12°C, pour laisser les épices se déployer. Le Sang de Freya, fruité et généreux, apprécie également 8 à 10°C pour que les baies ressortent avec netteté.

Sortez votre bouteille du frigo 10 à 15 minutes avant de servir — ce petit geste change tout.`,
  },
  {
    title: "Le verre : misez sur la forme",
    content: `Oubliez la corne en résine du marché médiéval pour la dégustation sérieuse. Un bon hydromel mérite un verre à vin blanc tulipe — ni trop large, ni trop étroit — qui concentre les arômes vers le nez.

Un verre à vin rouge peut convenir pour les hydromels plus corsés et épicés. L'essentiel : un verre propre, sans résidu de détergent qui briserait l'expérience aromatique.`,
  },
  {
    title: "La dégustation : nez, bouche, finale",
    content: `Comme pour le vin, la dégustation se fait en trois temps.

Au nez : faites tourner légèrement le verre pour libérer les arômes. Avec un hydromel nature, vous percevrez le miel floral, des notes minérales. Avec un hydromel épicé, la cannelle et l'orange s'imposent d'emblée.

En bouche : laissez l'hydromel enrober le palais. Notez si la bouche est sèche, ronde, fraîche ou persistante. Nos hydromels sont secs — vous ne trouverez pas la douceur sirupeuse des versions industrielles.

En finale : combien de temps les arômes restent-ils ? Une longue finale est le signe d'un hydromel bien travaillé.`,
  },
  {
    title: "L'hydromel chaud : une option méconnue",
    content: `Par temps froid, l'hydromel se révèle également excellent chaud — comme un vin chaud nordique. Chauffez-le doucement (sans le faire bouillir) avec une bâton de cannelle, un clou de girofle et un zeste d'orange.

Chaleur d'Asgard se prête particulièrement bien à cet exercice : ses épices se déploient encore davantage avec la chaleur, pour une boisson réconfortante et profonde.`,
  },
];

export default function ArticleDegustationPage() {
  return (
    <>
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "4rem",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/chronique-degustation.png"
            alt="Dégustation hydromel"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(10,6,4,0.5) 0%, rgba(10,6,4,0.8) 70%, rgba(10,6,4,1) 100%)",
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1, padding: "0 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "0.25rem 0.75rem" }}>
              Dégustation
            </span>
            <span style={{ fontSize: "0.75rem", color: "rgba(245,230,204,0.4)" }}>Septembre 2025 · 4 min de lecture</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#F5E6CC", lineHeight: 1.15 }}>
            Comment déguster{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>l'hydromel ?</em>
          </h1>
        </motion.div>
      </section>

      <section style={{ backgroundColor: "#0A0604", padding: "4rem 2rem 8rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.35rem", fontStyle: "italic", color: "rgba(245,230,204,0.8)", lineHeight: 1.8, marginBottom: "3rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
          >
            Température, verre adapté, accords gastronomiques… L'hydromel mérite la même attention qu'un grand vin. Voici quelques clés pour en tirer le meilleur — et éviter les erreurs qui gâchent l'expérience.
          </motion.p>

          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ marginBottom: "3rem" }}
            >
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.8rem", fontWeight: 500, color: "#C9A84C", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                {section.title}
              </h2>
              {section.content.split("\n\n").map((para, j) => (
                <p key={j} style={{ color: "rgba(245,230,204,0.75)", lineHeight: 1.9, fontSize: "1rem", marginBottom: "1rem" }}>
                  {para}
                </p>
              ))}
            </motion.div>
          ))}

          <div style={{ marginTop: "4rem", padding: "2.5rem", border: "1px solid rgba(201,168,76,0.2)", backgroundColor: "#0D0806", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.25rem", fontStyle: "italic", color: "rgba(245,230,204,0.7)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Prêt à passer à la pratique ?
            </p>
            <Link href="/nos-hydromels" className="btn-gold">Découvrir nos hydromels</Link>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Link href="/chroniques" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,230,204,0.5)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9A84C")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(245,230,204,0.5)")}>
              <ArrowLeft size={16} />
              Retour aux chroniques
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
