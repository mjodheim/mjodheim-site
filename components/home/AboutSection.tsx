"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#0A0604",
        padding: "8rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lueur ambrée décorative */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(181,101,29,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ position: "relative" }}
        >
          {/* Cadre doré décoratif */}
          <div
            style={{
              position: "absolute",
              top: "-16px",
              left: "-16px",
              right: "16px",
              bottom: "16px",
              border: "1px solid rgba(201,168,76,0.25)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              aspectRatio: "3/4",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <Image
              src="/images/Hydromel-brasse.png"
              alt="Brassage artisanal Mjödheim"
              fill
              style={{ objectFit: "cover" }}
            />
            {/* Overlay chaud */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 60%, rgba(10,6,4,0.6) 100%)",
              }}
            />
          </div>
          {/* Badge flottant */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: "-1rem",
              right: "-1rem",
              backgroundColor: "#120C07",
              border: "1px solid rgba(201,168,76,0.4)",
              padding: "1.25rem 1.5rem",
              zIndex: 2,
              boxShadow: "0 0 30px rgba(201,168,76,0.1)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2.5rem",
                fontWeight: 700,
                color: "#C9A84C",
                lineHeight: 1,
                textShadow: "0 0 20px rgba(201,168,76,0.4)",
              }}
            >
              ~13°
            </div>
            <div style={{ fontSize: "0.75rem", color: "rgba(245,230,204,0.6)", letterSpacing: "0.1em" }}>
              VOL. ALCOOL
            </div>
          </motion.div>
        </motion.div>

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
              color: "#C9A84C",
            }}
          >
            <div style={{ width: "40px", height: "1px", background: "#C9A84C" }} />
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Notre histoire
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              color: "#F5E6CC",
              marginBottom: "2rem",
            }}
          >
            Un hydromel artisanal,{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>brassé en Belgique</em>
          </h2>

          <p
            style={{
              color: "rgba(245,230,204,0.75)",
              lineHeight: 1.85,
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          >
            Chez Mjödheim, chaque gorgée raconte une histoire. Fondé par Anthony, artisan
            hydromelier passionné, Mjödheim est né de l'envie de faire revivre une boisson
            millénaire avec audace et authenticité.
          </p>

          <p
            style={{
              color: "rgba(245,230,204,0.75)",
              lineHeight: 1.85,
              marginBottom: "2.5rem",
              fontSize: "1rem",
            }}
          >
            Nos hydromels sont brassés en petites quantités à Beaumont, avec un miel de
            qualité supérieure, des ingrédients rigoureusement sélectionnés et un savoir-faire
            artisanal. Pas de compromis : uniquement du goût, de la tradition et du caractère.
          </p>

          <Link href="/notre-saga" className="btn-outline">
            Lire notre saga
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
