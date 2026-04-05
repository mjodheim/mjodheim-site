"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const products = [
  {
    name: "Ferosol",
    subtitle: "Bière blonde au miel",
    type: "Blonde – Miel",
    abv: "~6 % vol.",
    format: "33 cl",
    service: "4-6°C, très frais",
    conservation: "À l'abri de la chaleur et de la lumière. À consommer avant la date indiquée.",
    accords: "Fromages doux, volaille rôtie, cuisine asiatique.",
    aroma: "Malt léger, miel floral, légère douceur en bouche, finale ronde et persistante.",
    description:
      "Ferosol est né de la même passion que nos hydromels : mettre le miel au cœur de la création. Cette blonde artisanale brassée au miel de qualité supérieure offre une rondeur et un caractère uniques. Dorée comme l'ambre, elle réconcilie la tradition brassicole belge avec le savoir-faire de l'hydromelier.",
    image: "/images/ferosol.png",
    accent: "#C9A84C",
    bgAccent: "rgba(201,168,76,0.05)",
  },
  {
    name: "Calarwen",
    subtitle: "Bière blonde à la sauge et au citron vert",
    type: "Blonde – Herbes & agrumes",
    abv: "~5,5 % vol.",
    format: "33 cl",
    service: "4-6°C, très frais",
    conservation: "À l'abri de la chaleur et de la lumière. À consommer avant la date indiquée.",
    accords: "Poissons grillés, salades fraîches, tapas, mezze.",
    aroma: "Sauge fraîche, zeste de citron vert, malt délicat, finale herbacée et vive.",
    description:
      "Calarwen — nom d'inspiration celtique évoquant la clarté et la lumière — est une blonde singulière et rafraîchissante. La sauge apporte une note herbeuse et élégante, le citron vert une vivacité qui éveille les sens. Une bière pensée pour ceux qui cherchent à sortir des sentiers battus.",
    image: "/images/calarwen.png",
    accent: "#5A8A3C",
    bgAccent: "rgba(90,138,60,0.05)",
  },
];

function BeerCard({ product, index }: { product: typeof products[0]; index: number }) {
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
      className="beer-card-grid"
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          minHeight: "500px",
          overflow: "hidden",
          order: isEven ? 0 : 1,
        }}
        className="beer-image-col"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(10,6,4,0.2) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
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
        className="beer-info-col"
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

        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: product.accent, textTransform: "uppercase", marginBottom: "0.4rem" }}>
            Profil aromatique
          </p>
          <p style={{ color: "rgba(245,230,204,0.6)", fontStyle: "italic", fontSize: "0.9rem" }}>
            {product.aroma}
          </p>
        </div>

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
              <p style={{ fontSize: "0.85rem", color: product.accent, fontFamily: "var(--font-cormorant), Georgia, serif" }}>{item.value}</p>
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

export default function NossBieresPage() {
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
              bières
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.6)",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Après les hydromels, la brasserie s'est naturellement tournée vers la bière — en gardant la même exigence : des ingrédients nobles, des recettes sincères.
          </p>
        </motion.div>
      </section>

      {/* Intro narrative */}
      <section style={{ backgroundColor: "#0A0604", padding: "0 2rem 4rem" }}>
        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            borderLeft: "2px solid rgba(201,168,76,0.3)",
            paddingLeft: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.15rem",
              color: "rgba(245,230,204,0.65)",
              lineHeight: 1.9,
              fontStyle: "italic",
            }}
          >
            L'hydromel fut le point de départ. Mais la passion du brassage ne s'arrête pas là. Mjödheim a étendu sa gamme avec deux bières artisanales qui portent le même ADN : authenticité, caractère, et un lien profond avec la nature. Chaque recette est pensée pour compléter la gamme sans la trahir.
          </p>
        </div>
      </section>

      {/* Produits */}
      <section style={{ backgroundColor: "#0A0604", padding: "2rem 2rem 4rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {products.map((product, i) => (
            <BeerCard key={product.name} product={product} index={i} />
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
            Nos bières sont disponibles à l'atelier à Beaumont et sur les marchés médiévaux.
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .beer-card-grid { grid-template-columns: 1fr !important; }
          .beer-image-col { min-height: 300px !important; order: 0 !important; }
          .beer-info-col { padding: 2rem !important; order: 1 !important; }
        }
      `}</style>
    </>
  );
}
