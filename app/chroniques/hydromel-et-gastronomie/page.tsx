"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Fruits de mer et hydromel nature",
    content: `C'est l'accord le moins attendu et pourtant l'un des plus réussis. La minéralité et la sécheresse d'un hydromel nature — comme notre Brume d'Yggdrasil — se marient avec une précision étonnante aux huîtres, aux crevettes grises et aux plateaux de fruits de mer.

L'hydromel joue ici le rôle qu'aurait un Muscadet ou un Chablis, mais avec une complexité florale que le vin ne peut pas offrir. La finale sèche et nerveuse nettoie le palais entre chaque bouchée.`,
  },
  {
    title: "Gibier et hydromel épicé",
    content: `Le gibier rôti — sanglier, chevreuil, faisan — appelle des boissons qui tiennent tête à la puissance de la viande. Chaleur d'Asgard, avec ses épices chaleureuses et son caractère affirmé, est fait pour ça.

La cannelle et le clou de girofle font écho aux marinades et aux sauces au genièvre. L'orange apporte une touche d'acidité qui tranche la richesse du gibier. Un accord qui aurait parfaitement sa place à la table d'un banquet viking.`,
  },
  {
    title: "Fromages : des accords surprenants",
    content: `L'hydromel et le fromage partagent une origine commune : le travail artisanal, la patience, la transformation d'un produit brut en quelque chose de complexe.

Avec un fromage de chèvre frais, la Brume d'Yggdrasil est parfaite — ses notes florales répondent à l'acidité lactique. Avec un comté affiné ou un beaufort, Chaleur d'Asgard et ses épices créent un dialogue savoureux. Le Sang de Freya, fruité et généreux, s'épanouit aux côtés d'un brie coulant ou d'un époisses.`,
  },
  {
    title: "Desserts et cuisine : l'hydromel comme ingrédient",
    content: `L'hydromel ne se limite pas au verre. En cuisine, il apporte une dimension unique aux marinades (filets de porc ou de bœuf au Sang de Freya), aux sauces de réduction (Chaleur d'Asgard réduit avec du beurre sur une volaille), et même aux desserts.

Un gâteau au miel arrosé de Brume d'Yggdrasil, une panna cotta avec une réduction de Sang de Freya aux fruits rouges — les possibilités sont nombreuses. L'hydromel cuit perd son alcool mais conserve ses arômes, révélant une profondeur que peu d'ingrédients peuvent apporter.`,
  },
];

export default function ArticleGastronomiePage() {
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
            src="/images/chronique-gastronomie.png"
            alt="Hydromel et gastronomie"
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,6,4,0.5) 0%, rgba(10,6,4,0.85) 70%, rgba(10,6,4,1) 100%)" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1, padding: "0 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "0.25rem 0.75rem" }}>
              Gastronomie
            </span>
            <span style={{ fontSize: "0.75rem", color: "rgba(245,230,204,0.4)" }}>Novembre 2025 · 5 min de lecture</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#F5E6CC", lineHeight: 1.15 }}>
            Hydromel et gastronomie :{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>des accords inattendus</em>
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
            L'hydromel mérite une place à table, pas seulement dans la corne du guerrier. Sa polyvalence aromatique en fait un compagnon gastronomique aussi surprenant qu'efficace.
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
              À vous de composer votre accord parfait.
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
