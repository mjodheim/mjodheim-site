"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Qu'est-ce que l'hydromel ?",
    content: `L'hydromel est l'une des plus anciennes boissons alcoolisées du monde. Obtenu par la fermentation du miel et de l'eau, parfois agrémenté d'épices ou de fruits, il offre une palette de saveurs aussi large que le savoir-faire de ceux qui le produisent.

On le surnomme souvent le "nectar des dieux", et pour cause : avant même que la bière et le vin ne conquièrent l'Europe, l'hydromel était déjà célébré dans les banquets, les rituels et les mythes.`,
  },
  {
    title: "Les origines de l'hydromel",
    content: `Des traces d'hydromel ont été retrouvées en Chine (7 000 ans av. J.-C.), en Égypte antique, chez les Celtes et bien sûr chez les Vikings.

Dans les campagnes européennes, il était aussi offert lors des mariages… d'où l'expression "lune de miel".

Chez les Grecs, il était considéré comme un cadeau divin. Chez les Vikings, il était lié au Valhalla, la grande salle d'Odin, où les guerriers tombés au combat buvaient l'hydromel éternel.`,
  },
  {
    title: "Comment fabrique-t-on l'hydromel ?",
    content: `Le principe est simple : mélanger miel et eau, ajouter des levures qui déclenchent la fermentation, puis laisser le temps et le savoir-faire travailler.

Selon les choix du producteur, on peut obtenir un hydromel sec, vif et puissant ; un hydromel doux, rond et sucré ; ou encore un hydromel épicé, complexe et chaleureux.

Chez Mjödheim, nous travaillons nos hydromels de manière artisanale, en petites cuvées, pour garantir un goût unique et authentique.`,
  },
  {
    title: "Hydromel, bière ou vin : quelles différences ?",
    content: `La distinction est simple : la bière est obtenue par fermentation de céréales (orge, blé), le vin par fermentation du raisin, et l'hydromel par fermentation du miel.

L'hydromel est donc plus proche du vin par sa nature, mais avec un profil aromatique unique — floral, complexe, parfois épicé — qu'aucun autre alcool ne peut reproduire.`,
  },
];

export default function ArticleHydromelPage() {
  return (
    <>
      {/* Hero */}
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
            src="/images/miel_150321893_web-edited.webp"
            alt="Miel"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(10,6,4,0.3) 0%, rgba(10,6,4,0.75) 70%, rgba(10,6,4,1) 100%)",
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
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#C9A84C",
                border: "1px solid rgba(201,168,76,0.3)",
                padding: "0.25rem 0.75rem",
              }}
            >
              Histoire & culture
            </span>
            <span style={{ fontSize: "0.75rem", color: "rgba(245,230,204,0.4)" }}>Août 2025 · 5 min de lecture</span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              color: "#F5E6CC",
              lineHeight: 1.15,
            }}
          >
            Qu'est-ce que{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>l'hydromel ?</em>
          </h1>
        </motion.div>
      </section>

      {/* Contenu article */}
      <section style={{ backgroundColor: "#0A0604", padding: "4rem 2rem 8rem" }}>
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
          }}
        >
          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.35rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.8)",
              lineHeight: 1.8,
              marginBottom: "3rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid rgba(201,168,76,0.15)",
            }}
          >
            Boisson mythique des festins vikings, breuvage sacré des anciens druides, l'hydromel revient aujourd'hui sur nos tables après des siècles d'oubli. Mais au fond, qu'est-ce que l'hydromel ? Est-ce une bière ? Un vin ? Un élixir magique ?
          </motion.p>

          {/* Sections */}
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ marginBottom: "3rem" }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.8rem",
                  fontWeight: 500,
                  color: "#C9A84C",
                  marginBottom: "1.25rem",
                  lineHeight: 1.2,
                }}
              >
                {section.title}
              </h2>
              {section.content.split("\n\n").map((para, j) => (
                <p
                  key={j}
                  style={{
                    color: "rgba(245,230,204,0.75)",
                    lineHeight: 1.9,
                    fontSize: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {para}
                </p>
              ))}
            </motion.div>
          ))}

          {/* CTA Mjödheim */}
          <div
            style={{
              marginTop: "4rem",
              padding: "2.5rem",
              border: "1px solid rgba(201,168,76,0.2)",
              backgroundColor: "#0D0806",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.25rem",
                fontStyle: "italic",
                color: "rgba(245,230,204,0.7)",
                marginBottom: "1.5rem",
                lineHeight: 1.6,
              }}
            >
              Envie de découvrir ce breuvage millénaire par vous-même ?
            </p>
            <Link href="/nos-hydromels" className="btn-gold">
              Découvrir nos hydromels
            </Link>
          </div>

          {/* Retour */}
          <div style={{ marginTop: "3rem" }}>
            <Link
              href="/chroniques"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "rgba(245,230,204,0.5)",
                textDecoration: "none",
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9A84C")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(245,230,204,0.5)")}
            >
              <ArrowLeft size={16} />
              Retour aux chroniques
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
