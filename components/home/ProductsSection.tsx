"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const products = [
  {
    name: "Brume d'Yggdrasil",
    subtitle: "Hydromel nature",
    type: "Hydromel sec – Nature",
    category: "hydromel",
    abv: "~13 % vol.",
    format: "75 cl",
    description:
      "Limpide, sobre, d'une intensité brute qui évoque les matins calmes des fjords. Sa bouche sèche et franche révèle toute la noblesse de la fermentation artisanale.",
    aroma: "Miel floral pur, notes minérales, finale sèche",
    image: "/images/brume-d-yggdrasil.png",
    accent: "#C9A84C",
    imageFit: "contain" as const,
    imagePadding: "2rem",
  },
  {
    name: "Chaleur d'Asgard",
    subtitle: "Hydromel épicé",
    type: "Hydromel sec – Épicé",
    category: "hydromel",
    abv: "~13 % vol.",
    format: "50 cl",
    description:
      "L'orange apporte une vivacité solaire, portée par la chaleur des épices. Un voyage sensoriel vers les banquets du Valhalla.",
    aroma: "Orange amère, vanille, gingembre, cannelle",
    image: "/images/chaleur-d-asgard.png",
    accent: "#E05A00",
    imageFit: "contain" as const,
    imagePadding: "2rem",
  },
  {
    name: "Sang de Freya",
    subtitle: "Hydromel fruits rouges",
    type: "Hydromel demi-sec – Fruité",
    category: "hydromel",
    abv: "~12 % vol.",
    format: "75 cl",
    description:
      "Les baies sauvages s'entremêlent au miel pour un résultat charnu et séduisant, rouge comme l'aurore boréale.",
    aroma: "Cassis, framboise, miel doux, légère acidité en finale",
    image: "/images/sang-de-freya.png",
    accent: "#9B1B30",
    imageFit: "contain" as const,
    imagePadding: "2rem",
  },
  {
    name: "Ferosol",
    subtitle: "Bière blonde au miel",
    type: "Bière blonde – Miel",
    category: "bière",
    abv: "~6 % vol.",
    format: "33 cl",
    description:
      "La rencontre entre la tradition brassicole et le savoir-faire de l'hydromelier. Le miel apporte rondeur et caractère à cette blonde artisanale, dorée comme l'ambre.",
    aroma: "Malt léger, miel floral, finale ronde et douce",
    image: "/images/ferosol.png",
    accent: "#C9A84C",
    imageFit: "cover" as const,
    imagePadding: "0",
  },
  {
    name: "Calarwen",
    subtitle: "Bière blonde sauge & citron vert",
    type: "Bière blonde – Herbes & agrumes",
    category: "bière",
    abv: "~5,5 % vol.",
    format: "33 cl",
    description:
      "Une blonde rafraîchissante et singulière. La sauge apporte une note herbeuse élégante, le citron vert une vivacité qui éveille les sens.",
    aroma: "Sauge fraîche, zeste de citron vert, malt délicat",
    image: "/images/calarwen.png",
    accent: "#5A8A3C",
    imageFit: "cover" as const,
    imagePadding: "0",
  },
];

const INTERVAL = 4000;

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % products.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const product = products[current];

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#0D0806",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at 20% 50%, rgba(181,101,29,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
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
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              La gamme
            </span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "#F5E6CC",
              marginBottom: "1rem",
            }}
          >
            Nos{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>produits</em>
          </h2>
          <p style={{ color: "rgba(245,230,204,0.6)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.7 }}>
            3 hydromels, 2 bières. Chaque création est une saga. Brassées en petites cuvées, sans compromis.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
              backgroundColor: "#120C07",
              border: "1px solid rgba(201,168,76,0.15)",
              overflow: "hidden",
              minHeight: "460px",
            }}
            className="carousel-grid"
          >
            {/* Image */}
            <div style={{ position: "relative", backgroundColor: "#1A1008", overflow: "hidden" }} className="carousel-image">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: product.imageFit, padding: product.imagePadding }}
                  />
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
                </motion.div>
              </AnimatePresence>
              {/* Badge type */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`badge-${current}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    backgroundColor: "rgba(10,6,4,0.85)",
                    border: `1px solid ${product.accent}66`,
                    padding: "0.4rem 0.85rem",
                    fontSize: "0.7rem",
                    letterSpacing: "0.15em",
                    color: product.accent,
                    textTransform: "uppercase",
                    zIndex: 2,
                  }}
                >
                  {product.type}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Infos */}
            <div style={{ padding: "3rem", display: "flex", flexDirection: "column", justifyContent: "center" }} className="carousel-info">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`info-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <p
                    style={{
                      fontSize: "0.75rem",
                      letterSpacing: "0.2em",
                      color: product.accent,
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {product.subtitle}
                  </p>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant), Georgia, serif",
                      fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                      fontWeight: 500,
                      color: "#F5E6CC",
                      marginBottom: "1.25rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      color: "rgba(245,230,204,0.65)",
                      fontSize: "0.95rem",
                      lineHeight: 1.8,
                      marginBottom: "1.75rem",
                    }}
                  >
                    {product.description}
                  </p>
                  <div
                    style={{
                      borderTop: "1px solid rgba(201,168,76,0.12)",
                      paddingTop: "1.25rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#C9A84C", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                      Profil aromatique
                    </p>
                    <p style={{ color: "rgba(245,230,204,0.55)", fontSize: "0.85rem", fontStyle: "italic" }}>
                      {product.aroma}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "1.5rem" }}>
                    <div>
                      <p style={{ fontSize: "0.65rem", color: "rgba(245,230,204,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Alcool</p>
                      <p style={{ fontSize: "1rem", color: product.accent, fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}>{product.abv}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "0.65rem", color: "rgba(245,230,204,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Format</p>
                      <p style={{ fontSize: "1rem", color: product.accent, fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}>{product.format}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Points de navigation */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "1.75rem" }}>
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: i === current ? products[i].accent : "rgba(201,168,76,0.25)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
                aria-label={`Produit ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ display: "flex", gap: "1.25rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}
        >
          <Link href="/nos-hydromels" className="btn-gold">
            Voir nos hydromels
          </Link>
          <Link href="/nos-bieres" className="btn-outline">
            Voir nos bières
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .carousel-grid { grid-template-columns: 1fr !important; }
          .carousel-image { min-height: 280px !important; }
          .carousel-info { padding: 2rem !important; }
        }
      `}</style>
    </section>
  );
}
