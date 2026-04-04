"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function CtaSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "10rem 2rem",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Fond */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/La-foret-norvegienne-pendant-lautomne.jpg"
          alt="Forêt norvégienne"
          fill
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,6,4,0.85) 0%, rgba(10,6,4,0.75) 50%, rgba(10,6,4,0.9) 100%)",
          }}
        />
        {/* Lueur feu centrale */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(224,90,0,0.12) 0%, transparent 60%)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "700px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Symbole décoratif */}
          <div
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "3rem",
              color: "#C9A84C",
              marginBottom: "1.5rem",
              textShadow: "0 0 30px rgba(201,168,76,0.6)",
              opacity: 0.7,
            }}
          >
            ᚠ
          </div>

          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "#F5E6CC",
              lineHeight: 1.2,
              marginBottom: "1.5rem",
            }}
          >
            Prêt à forger{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "#C9A84C",
                textShadow: "0 0 30px rgba(201,168,76,0.5)",
              }}
            >
              votre légende ?
            </em>
          </h2>

          <p
            style={{
              color: "rgba(245,230,204,0.7)",
              lineHeight: 1.75,
              marginBottom: "3rem",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.3rem",
            }}
          >
            Retrouvez-nous sur les marchés médiévaux et événements. Une table en bois brut,
            des bouteilles au reflet ambré, et des conversations qui s'éternisent.
          </p>

          <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/evenements" className="btn-gold">
              Nos prochains événements
            </Link>
            <Link href="/contact" className="btn-outline">
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
