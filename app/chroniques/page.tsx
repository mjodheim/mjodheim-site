"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const articles = [
  {
    slug: "qu-est-ce-que-l-hydromel",
    title: "Qu'est-ce que l'hydromel ?",
    excerpt:
      "Boisson mythique des festins vikings, breuvage sacré des anciens druides, l'hydromel revient aujourd'hui sur nos tables après des siècles d'oubli. Mais au fond, qu'est-ce que l'hydromel ?",
    date: "Août 2025",
    readTime: "5 min",
    image: "/images/chronique-hydromel.png",
    category: "Histoire & culture",
  },
  {
    slug: "comment-deguster-l-hydromel",
    title: "Comment déguster l'hydromel ?",
    excerpt:
      "Température, verre adapté, accords gastronomiques… L'hydromel se déguste comme un grand vin. Quelques clés pour en tirer le meilleur.",
    date: "Septembre 2025",
    readTime: "4 min",
    image: "/images/chronique-degustation.png",
    category: "Dégustation",
  },
  {
    slug: "brassage-artisanal-mjodheim",
    title: "De la ruche à la bouteille : le brassage chez Mjödheim",
    excerpt:
      "Comment naît un hydromel artisanal ? Du choix du miel à l'embouteillage, découvrez les étapes qui font la différence entre l'ordinaire et l'exceptionnel.",
    date: "Octobre 2025",
    readTime: "6 min",
    image: "/images/chronique-brassage.png",
    category: "Savoir-faire",
  },
  {
    slug: "hydromel-et-gastronomie",
    title: "Hydromel et gastronomie : des accords inattendus",
    excerpt:
      "L'hydromel n'est pas qu'une boisson de marché médiéval. À table, il révèle une polyvalence surprenante. Fruits de mer, gibier, fromages affinés, desserts… découvrez comment le marier.",
    date: "Novembre 2025",
    readTime: "5 min",
    image: "/images/chronique-gastronomie.png",
    category: "Gastronomie",
  },
];

export default function ChroniquesPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "160px",
          paddingBottom: "5rem",
          textAlign: "center",
          backgroundColor: "#0A0604",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", padding: "0 2rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              color: "#C9A84C",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Récits & savoir</span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "#F5E6CC",
              marginBottom: "1rem",
            }}
          >
            Chroniques{" "}
            <em style={{ fontStyle: "italic", color: "#C9A84C", textShadow: "0 0 40px rgba(201,168,76,0.4)" }}>
              du hall
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.55)",
            }}
          >
            Histoires, savoir-faire et secrets de brassage
          </p>
        </motion.div>
      </section>

      {/* Articles */}
      <section style={{ backgroundColor: "#0A0604", padding: "2rem 2rem 8rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              style={{
                display: "grid",
                gridTemplateColumns: "300px 1fr",
                gap: "3rem",
                marginBottom: "3rem",
                backgroundColor: "#0D0806",
                border: "1px solid rgba(201,168,76,0.12)",
                overflow: "hidden",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)";
              }}
              className="article-card"
            >
              <div style={{ position: "relative", minHeight: "250px" }}>
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "2.5rem 2.5rem 2.5rem 0", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
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
                    {article.category}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "rgba(245,230,204,0.4)" }}>
                    {article.date} · {article.readTime} de lecture
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.8rem",
                    fontWeight: 500,
                    color: "#F5E6CC",
                    marginBottom: "1rem",
                    lineHeight: 1.25,
                  }}
                >
                  {article.title}
                </h2>
                <p style={{ color: "rgba(245,230,204,0.65)", fontSize: "0.9rem", lineHeight: 1.75, marginBottom: "1.5rem" }}>
                  {article.excerpt}
                </p>
                <Link
                  href={`/chroniques/${article.slug}`}
                  style={{
                    color: "#C9A84C",
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontWeight: 500,
                  }}
                >
                  Lire la chronique →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .article-card { grid-template-columns: 1fr !important; }
          .article-card > div:last-child { padding: 1.5rem !important; }
        }
      `}</style>
    </>
  );
}
