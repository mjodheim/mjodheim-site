"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const products = [
  {
    name: "Brume d'Yggdrasil",
    subtitle: "Hydromel traditionnel",
    type: "Sec – Nature",
    abv: "~13 % vol.",
    format: "75 cl",
    description:
      "Limpide, sobre, d'une intensité brute qui évoque les matins calmes des fjords. Sa bouche sèche et franche révèle toute la noblesse de la fermentation artisanale.",
    aroma: "Miel floral pur, notes minérales, finale sèche et nerveuse",
    image: "/images/Hydromel-classique.png",
    accent: "#C9A84C",
  },
  {
    name: "Chaleur d'Asgard",
    subtitle: "Hydromel épicé à l'orange",
    type: "Sec – Épicé",
    abv: "~13 % vol.",
    format: "50 cl",
    description:
      "Un voyage sensoriel vers les banquets du Valhalla. L'orange apporte une vivacité solaire, portée par la chaleur des épices. Chaque gorgée raconte la légende.",
    aroma: "Orange amère, vanille bourbon, gingembre, cannelle, clou de girofle",
    image: "/images/Hydromel-epice.png",
    accent: "#E05A00",
  },
];

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
      {/* Fond texturé */}
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
        {/* En-tête section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
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
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>hydromels</em>
          </h2>
          <p style={{ color: "rgba(245,230,204,0.6)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
            Chaque cuvée est une saga. Brassées en petites quantités, sans compromis sur l'authenticité.
          </p>
        </motion.div>

        {/* Grille produits */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2rem",
          }}
        >
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              style={{
                backgroundColor: "#120C07",
                border: "1px solid rgba(201,168,76,0.15)",
                overflow: "hidden",
                position: "relative",
                transition: "all 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.border = `1px solid rgba(201,168,76,0.4)`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px rgba(201,168,76,0.1)`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(201,168,76,0.15)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Image produit */}
              <div style={{ position: "relative", height: "380px", backgroundColor: "#1A1008" }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "contain", padding: "2rem" }}
                />
                {/* Lueur accent */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: "30%",
                    background: `radial-gradient(ellipse at bottom, ${product.accent}22 0%, transparent 80%)`,
                    pointerEvents: "none",
                  }}
                />
                {/* Badge type */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    backgroundColor: "rgba(10,6,4,0.85)",
                    border: `1px solid ${product.accent}66`,
                    padding: "0.4rem 0.85rem",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    color: product.accent,
                    textTransform: "uppercase",
                  }}
                >
                  {product.type}
                </div>
              </div>

              {/* Infos produit */}
              <div style={{ padding: "2rem" }}>
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
                    fontSize: "1.8rem",
                    fontWeight: 500,
                    color: "#F5E6CC",
                    marginBottom: "1rem",
                    lineHeight: 1.2,
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    color: "rgba(245,230,204,0.65)",
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    marginBottom: "1.5rem",
                  }}
                >
                  {product.description}
                </p>

                {/* Profil aromatique */}
                <div
                  style={{
                    borderTop: "1px solid rgba(201,168,76,0.12)",
                    paddingTop: "1.25rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#C9A84C", marginBottom: "0.4rem", textTransform: "uppercase" }}>
                    Profil aromatique
                  </p>
                  <p style={{ color: "rgba(245,230,204,0.55)", fontSize: "0.85rem", fontStyle: "italic" }}>
                    {product.aroma}
                  </p>
                </div>

                {/* Détails */}
                <div style={{ display: "flex", gap: "1.5rem" }}>
                  <div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(245,230,204,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Alcool</p>
                    <p style={{ fontSize: "0.95rem", color: "#C9A84C", fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}>{product.abv}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: "0.7rem", color: "rgba(245,230,204,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Format</p>
                    <p style={{ fontSize: "0.95rem", color: "#C9A84C", fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 600 }}>{product.format}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ textAlign: "center", marginTop: "3.5rem" }}
        >
          <Link href="/nos-hydromels" className="btn-gold">
            Voir tous nos hydromels
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
