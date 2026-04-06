"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const products = [
  {
    name: "Brume d'Yggdrasil",
    subtitle: "Hydromel traditionnel",
    type: "Sec – Nature",
    abv: "~13 % vol.",
    format: "75 cl",
    service: "8-10°C, bien frais",
    conservation: "À l'abri de la lumière. À consommer de préférence dans les 3 ans.",
    accords: "Plateau de fruits de mer, fromage frais de chèvre, tarte aux fruits jaunes.",
    aroma: "Miel floral pur, notes minérales, finale sèche et nerveuse.",
    description:
      "Inspiré par l'arbre-monde qui relie les neuf royaumes, cet hydromel exprime la quintessence du miel, sans artifice. Brume d'Yggdrasil est une invitation à la méditation : limpide, sobre, et d'une intensité brute qui évoque les matins calmes des fjords. Sa bouche sèche et franche révèle toute la noblesse de la fermentation artisanale.",
    image: "/images/brume-d-yggdrasil.png",
    accent: "#C9A84C",
    bgAccent: "rgba(201,168,76,0.05)",
  },
  {
    name: "Chaleur d'Asgard",
    subtitle: "Hydromel épicé à l'orange",
    type: "Sec – Épicé",
    abv: "~13 % vol.",
    format: "50 cl",
    service: "10-12°C, légèrement rafraîchi",
    conservation: "À l'abri de la lumière. À consommer de préférence dans les 3 ans.",
    accords: "Gibier rôti, fromage à pâte dure, dessert au chocolat noir.",
    aroma: "Orange amère, vanille bourbon, gingembre frais, cannelle de Ceylan, clou de girofle.",
    description:
      "Une boisson forgée dans les flammes du foyer viking. L'orange apporte une vivacité solaire, adoucie par la vanille et portée par la chaleur des épices. Gingembre et cannelle s'embrasent, tandis que le clou de girofle apporte une profondeur presque mystique. Chaleur d'Asgard est un voyage sensoriel vers les banquets du Valhalla, là où chaque gorgée raconte la légende.",
    image: "/images/chaleur-d-asgard.png",
    accent: "#E05A00",
    bgAccent: "rgba(224,90,0,0.05)",
  },
  {
    name: "Sang de Freya",
    subtitle: "Hydromel aux fruits rouges",
    type: "Demi-sec – Fruité",
    abv: "~12 % vol.",
    format: "75 cl",
    service: "8-10°C, bien frais",
    conservation: "À l'abri de la lumière. À consommer de préférence dans les 3 ans.",
    accords: "Desserts aux fruits rouges, fromages frais, charcuteries fines.",
    aroma: "Cassis, framboise, miel doux, légère acidité en finale.",
    description:
      "Dédié à Freya, déesse de l'amour et de la fertilité, cet hydromel aux fruits rouges est généreux et profond. Les baies sauvages — cassis, framboise — s'entremêlent au miel pour un résultat charnu et séduisant, rouge comme le sang des aurores boréales. Un hydromel qui s'assume, intense et sincère.",
    image: "/images/sang-de-freya.png",
    accent: "#9B1B30",
    bgAccent: "rgba(155,27,48,0.05)",
  },
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        marginBottom: "6rem",
        backgroundColor: "#0D0806",
        border: "1px solid rgba(201,168,76,0.1)",
        overflow: "hidden",
      }}
      className="product-card-grid"
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          minHeight: "500px",
          backgroundColor: "#1A1008",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          order: isEven ? 0 : 1,
        }}
        className="product-image-col"
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            style={{ objectFit: "contain", padding: "3rem" }}
          />
          {/* Lueur */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              height: "40%",
              background: `radial-gradient(ellipse at bottom, ${product.accent}25 0%, transparent 80%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </motion.div>

      {/* Infos */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          padding: "4rem",
          backgroundColor: product.bgAccent,
          order: isEven ? 1 : 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        className="product-info-col"
      >
        <div style={{ marginBottom: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: product.accent,
              textTransform: "uppercase",
              border: `1px solid ${product.accent}44`,
              padding: "0.3rem 0.75rem",
            }}
          >
            {product.type}
          </span>
        </div>

        <p style={{ fontSize: "0.8rem", letterSpacing: "0.15em", color: "rgba(245,230,204,0.5)", marginTop: "1.25rem", marginBottom: "0.4rem", textTransform: "uppercase" }}>
          {product.subtitle}
        </p>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 3vw, 2.8rem)",
            fontWeight: 500,
            color: "#F5E6CC",
            lineHeight: 1.15,
            marginBottom: "1.5rem",
          }}
        >
          {product.name}
        </h2>

        <p style={{ color: "rgba(245,230,204,0.7)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "2rem" }}>
          {product.description}
        </p>

        {/* Profil aromatique */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: product.accent, textTransform: "uppercase", marginBottom: "0.4rem" }}>
            Profil aromatique
          </p>
          <p style={{ color: "rgba(245,230,204,0.6)", fontStyle: "italic", fontSize: "0.9rem" }}>
            {product.aroma}
          </p>
        </div>

        {/* Grille détails */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
            padding: "1.5rem",
            backgroundColor: "rgba(10,6,4,0.4)",
            border: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          {[
            { label: "Alcool", value: product.abv },
            { label: "Format", value: product.format },
            { label: "Service", value: product.service },
            { label: "Accords", value: product.accords },
          ].map((item) => (
            <div key={item.label}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(245,230,204,0.4)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{item.label}</p>
              <p style={{ fontSize: "0.85rem", color: "#C9A84C", fontFamily: "var(--font-cormorant), Georgia, serif" }}>{item.value}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: "0.8rem", color: "rgba(245,230,204,0.4)", fontStyle: "italic" }}>
          {product.conservation}
        </p>
      </motion.div>
    </div>
  );
}

export default function NosHydromelsClient() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          paddingTop: "160px",
          paddingBottom: "5rem",
          textAlign: "center",
          backgroundColor: "#0A0604",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
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
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>La gamme</span>
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
              hydromels
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.6)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Chaque cuvée est une saga. Brassées en petites quantités, sans compromis sur l'authenticité.
          </p>
        </motion.div>
      </section>

      {/* Produits */}
      <section style={{ backgroundColor: "#0A0604", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {products.map((product, i) => (
            <ProductCard key={product.name} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Note de bas de page */}
      <section style={{ backgroundColor: "#0A0604", padding: "0 2rem 6rem", textAlign: "center" }}>
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            borderTop: "1px solid rgba(201,168,76,0.15)",
            paddingTop: "3rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.4rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.6)",
              lineHeight: 1.7,
            }}
          >
            Nos hydromels sont disponibles à l'atelier à Beaumont et sur les marchés médiévaux.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .product-card-grid { grid-template-columns: 1fr !important; }
          .product-image-col { min-height: 300px !important; order: 0 !important; }
          .product-info-col { padding: 2rem !important; order: 1 !important; }
        }
      `}</style>
    </>
  );
}
