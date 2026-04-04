"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const values = [
  {
    icon: "⚒",
    title: "Artisanat authentique",
    desc: "Chaque lot est brassé à la main en respectant des méthodes ancestrales. Pas de production industrielle, pas de raccourcis.",
  },
  {
    icon: "🍯",
    title: "Ingrédients d'exception",
    desc: "Un miel de qualité supérieure et des épices soigneusement sélectionnées pour des saveurs uniques et intenses.",
  },
  {
    icon: "⚡",
    title: "Identité forte",
    desc: "Une marque ancrée dans l'univers mythologique nordique, pour une expérience sensorielle et historique à chaque gorgée.",
  },
  {
    icon: "🌿",
    title: "Production locale",
    desc: "Hydromel brassé et mis en bouteille à Beaumont, Belgique. Soutenir le local, valoriser le terroir.",
  },
];

export default function ValuesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "8rem 2rem",
        overflow: "hidden",
      }}
    >
      {/* Image de fond avec overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/Hydromel-tonneau.png"
          alt="Tonneaux d'hydromel"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(10,6,4,0.92) 0%, rgba(18,12,7,0.88) 100%)",
          }}
        />
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* En-tête */}
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
              Pourquoi Mjödheim
            </span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 400,
              color: "#F5E6CC",
            }}
          >
            Ce qui nous rend{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>différents</em>
          </h2>
        </motion.div>

        {/* Grille valeurs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{
                backgroundColor: "rgba(18,12,7,0.7)",
                border: "1px solid rgba(201,168,76,0.15)",
                padding: "2.5rem 2rem",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(201,168,76,0.35)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(26,16,8,0.85)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.border = "1px solid rgba(201,168,76,0.15)";
                (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(18,12,7,0.7)";
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "1.25rem",
                  filter: "drop-shadow(0 0 10px rgba(201,168,76,0.3))",
                }}
              >
                {value.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "#C9A84C",
                  marginBottom: "0.875rem",
                }}
              >
                {value.title}
              </h3>
              <p
                style={{
                  color: "rgba(245,230,204,0.65)",
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                }}
              >
                {value.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
