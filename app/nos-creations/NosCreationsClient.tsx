"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";

type Category = "tous" | "hydromel" | "bière";

const products = [
  // — HYDROMELS —
  {
    category: "hydromel" as const,
    name: "Brume d'Yggdrasil",
    subtitle: "Hydromel traditionnel",
    type: "Hydromel sec – Nature",
    abv: "~13 % vol.",
    format: "75 cl",
    service: "8-10°C",
    accords: "Fruits de mer, fromage de chèvre, tarte aux fruits jaunes",
    aroma: "Miel floral pur, notes minérales, finale sèche et nerveuse.",
    description:
      "Inspiré par l'arbre-monde qui relie les neuf royaumes, cet hydromel exprime la quintessence du miel, sans artifice. Limpide, sobre, d'une intensité brute qui évoque les matins calmes des fjords.",
    image: "/images/brume-d-yggdrasil.png",
    accent: "#C9A84C",
    imageFit: "contain" as const,
    imagePadding: "2rem",
  },
  {
    category: "hydromel" as const,
    name: "Chaleur d'Asgard",
    subtitle: "Hydromel épicé à l'orange",
    type: "Hydromel sec – Épicé",
    abv: "~13 % vol.",
    format: "50 cl",
    service: "10-12°C",
    accords: "Gibier rôti, chocolat noir, fromage à pâte dure",
    aroma: "Orange amère, vanille bourbon, gingembre, cannelle, clou de girofle.",
    description:
      "Une boisson forgée dans les flammes du foyer viking. L'orange apporte une vivacité solaire, portée par la chaleur des épices. Un voyage sensoriel vers les banquets du Valhalla.",
    image: "/images/chaleur-d-asgard.png",
    accent: "#E05A00",
    imageFit: "contain" as const,
    imagePadding: "2rem",
  },
  {
    category: "hydromel" as const,
    name: "Sang de Freya",
    subtitle: "Hydromel aux fruits rouges",
    type: "Hydromel demi-sec – Fruité",
    abv: "~12 % vol.",
    format: "75 cl",
    service: "8-10°C",
    accords: "Desserts, fromages frais, charcuteries fines",
    aroma: "Cassis, framboise, miel doux, légère acidité en finale.",
    description:
      "Dédié à Freya, déesse de l'amour et de la fertilité, cet hydromel aux fruits rouges est généreux et profond. Les baies sauvages s'entremêlent au miel pour un résultat charnu et séduisant.",
    image: "/images/sang-de-freya.png",
    accent: "#9B1B30",
    imageFit: "contain" as const,
    imagePadding: "2rem",
  },
  // — BIÈRES —
  {
    category: "bière" as const,
    name: "Ferosol",
    subtitle: "Bière blonde au miel",
    type: "Bière blonde – Miel",
    abv: "~6 % vol.",
    format: "33 cl",
    service: "4-6°C",
    accords: "Fromages doux, volaille rôtie, cuisine asiatique",
    aroma: "Malt léger, miel floral, légère douceur en bouche, finale ronde.",
    description:
      "Ferosol est le fruit de la rencontre entre la tradition brassicole et le savoir-faire de l'hydromelier. Le miel de qualité supérieure apporte rondeur et caractère à cette blonde artisanale, dorée comme l'ambre.",
    image: "/images/ferosol.png",
    accent: "#C9A84C",
    imageFit: "cover" as const,
    imagePadding: "0",
  },
  {
    category: "bière" as const,
    name: "Calarwen",
    subtitle: "Bière blonde à la sauge et au citron vert",
    type: "Bière blonde – Herbes & agrumes",
    abv: "~5,5 % vol.",
    format: "33 cl",
    service: "4-6°C",
    accords: "Poissons grillés, salades fraîches, tapas",
    aroma: "Sauge fraîche, zeste de citron vert, malt délicat, finale herbacée et vive.",
    description:
      "Calarwen — nom d'inspiration celtique évoquant la clarté et la lumière — est une blonde rafraîchissante et singulière. La sauge apporte une note herbeuse élégante, le citron vert une vivacité qui éveille les sens.",
    image: "/images/calarwen.png",
    accent: "#5A8A3C",
    imageFit: "cover" as const,
    imagePadding: "0",
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
      style={{
        backgroundColor: "#0D0806",
        border: "1px solid rgba(201,168,76,0.12)",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${product.accent}66`;
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${product.accent}15`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "320px", backgroundColor: "#1A1008" }}>
        <Image src={product.image} alt={product.name} fill style={{ objectFit: product.imageFit, padding: product.imagePadding }} />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "70%",
            height: "40%",
            background: `radial-gradient(ellipse at bottom, ${product.accent}22 0%, transparent 80%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            backgroundColor: "rgba(10,6,4,0.85)",
            border: `1px solid ${product.accent}55`,
            padding: "0.3rem 0.75rem",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: product.accent,
            textTransform: "uppercase",
          }}
        >
          {product.type}
        </div>
      </div>

      {/* Infos */}
      <div style={{ padding: "1.75rem" }}>
        <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: product.accent, textTransform: "uppercase", marginBottom: "0.4rem" }}>
          {product.subtitle}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.7rem",
            fontWeight: 500,
            color: "#F5E6CC",
            marginBottom: "0.875rem",
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </h3>
        <p style={{ color: "rgba(245,230,204,0.62)", fontSize: "0.88rem", lineHeight: 1.75, marginBottom: "1.25rem" }}>
          {product.description}
        </p>
        <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "1.1rem", marginBottom: "1.1rem" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: product.accent, marginBottom: "0.3rem", textTransform: "uppercase" }}>
            Profil aromatique
          </p>
          <p style={{ color: "rgba(245,230,204,0.5)", fontSize: "0.82rem", fontStyle: "italic" }}>{product.aroma}</p>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div>
            <p style={{ fontSize: "0.6rem", color: "rgba(245,230,204,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Alcool</p>
            <p style={{ fontSize: "0.9rem", color: product.accent, fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}>{product.abv}</p>
          </div>
          <div>
            <p style={{ fontSize: "0.6rem", color: "rgba(245,230,204,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Format</p>
            <p style={{ fontSize: "0.9rem", color: product.accent, fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}>{product.format}</p>
          </div>
          <div>
            <p style={{ fontSize: "0.6rem", color: "rgba(245,230,204,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Service</p>
            <p style={{ fontSize: "0.9rem", color: product.accent, fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}>{product.service}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function NosCreationsClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("tous");

  const filtered = activeCategory === "tous" ? products : products.filter((p) => p.category === activeCategory);

  const counts = {
    tous: products.length,
    hydromel: products.filter((p) => p.category === "hydromel").length,
    bière: products.filter((p) => p.category === "bière").length,
  };

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
          transition={{ duration: 0.9 }}
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
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Brasserie artisanale nordique</span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "#F5E6CC",
              marginBottom: "1.25rem",
            }}
          >
            Nos{" "}
            <em style={{ fontStyle: "italic", color: "#C9A84C", textShadow: "0 0 40px rgba(201,168,76,0.4)" }}>
              créations
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.55)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Hydromels et bières brassés à la main, en petites cuvées, sans compromis.
          </p>

          {/* Filtres */}
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}>
            {(["tous", "hydromel", "bière"] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.6rem 1.75rem",
                  border: `1px solid ${activeCategory === cat ? "#C9A84C" : "rgba(201,168,76,0.25)"}`,
                  backgroundColor: activeCategory === cat ? "rgba(201,168,76,0.1)" : "transparent",
                  color: activeCategory === cat ? "#C9A84C" : "rgba(245,230,204,0.55)",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1rem",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "capitalize",
                }}
              >
                {cat === "tous" ? "Tout voir" : cat === "hydromel" ? "Hydromels" : "Bières"}{" "}
                <span style={{ opacity: 0.5, fontSize: "0.8rem" }}>({counts[cat]})</span>
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Grille produits */}
      <section style={{ backgroundColor: "#0A0604", padding: "2rem 2rem 8rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: "4rem",
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "rgba(245,230,204,0.45)",
          }}
        >
          Disponibles à l'atelier à Beaumont et sur les marchés.
        </p>
      </section>
    </>
  );
}
