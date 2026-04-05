"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const chapters = [
  {
    rune: "ᚨ",
    title: "L'appel du hall",
    text: "Dans les terres du sud de la Belgique, là où le vent porte encore l'écho des vieilles légendes, un artisan a choisi de raviver une tradition millénaire : l'hydromel. Ni boisson oubliée ni fantaisie sucrée, mais un breuvage fier, sec et puissant, tel que les guerriers et poètes l'auraient reconnu. C'est ici, à Beaumont, qu'a vu le jour Mjödheim.",
    image: "/images/appel-du-hall.png",
  },
  {
    rune: "ᚺ",
    title: "L'origine du nom",
    text: "En vieux norrois, Mjöðr signifie hydromel et heimr signifie maison ou foyer. Mjödheim, c'est donc la maison de l'hydromel — un lieu où le miel devient boisson, où le partage devient rite, et où chaque gorgée raconte une histoire. Le projet est né d'une passion : créer un hydromel authentique, fidèle à l'esprit des sagas, tout en apportant une touche d'artisan moderne.",
    image: "/images/origine-du-nom.png",
  },
  {
    rune: "ᚢ",
    title: "Notre engagement",
    text: "Ici, pas de production industrielle, pas de raccourcis. Chaque lot est brassé à la main, avec un miel sélectionné pour sa pureté, de l'eau claire, des levures de qualité, et un savoir-faire affiné par l'expérience. Nos hydromels sont secs et corsés, loin des versions doucereuses. Nous utilisons des conservateurs naturels et reconnus pour garantir la fraîcheur et la qualité de chaque bouteille.",
    image: "/images/notre-engagement.png",
  },
];

function ChapterBlock({ chapter, index }: { chapter: typeof chapters[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        alignItems: "center",
        marginBottom: "8rem",
        direction: isEven ? "ltr" : "rtl",
      }}
      className="saga-grid"
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1 }}
        style={{ position: "relative", direction: "ltr" }}
      >
        <div
          style={{
            position: "absolute",
            top: "-12px",
            [isEven ? "left" : "right"]: "-12px",
            [isEven ? "right" : "left"]: "12px",
            bottom: "12px",
            border: "1px solid rgba(201,168,76,0.2)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
          <Image
            src={chapter.image}
            alt={chapter.title}
            fill
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(10,6,4,0.2) 0%, transparent 60%)",
            }}
          />
        </div>
      </motion.div>

      {/* Texte */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ direction: "ltr" }}
      >
        <div
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "4rem",
            color: "rgba(201,168,76,0.3)",
            lineHeight: 1,
            marginBottom: "0.5rem",
            textShadow: "0 0 20px rgba(201,168,76,0.2)",
          }}
        >
          {chapter.rune}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 500,
            color: "#F5E6CC",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          {chapter.title}
        </h2>
        <p
          style={{
            color: "rgba(245,230,204,0.72)",
            lineHeight: 1.9,
            fontSize: "1rem",
          }}
        >
          {chapter.text}
        </p>
      </motion.div>
    </div>
  );
}

export default function SagaPageClient() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "70vh",
          minHeight: "500px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "hidden",
          paddingBottom: "5rem",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/hero.png"
            alt="Fjord"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(10,6,4,0.3) 0%, rgba(10,6,4,0.6) 60%, rgba(10,6,4,1) 100%)",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 2rem" }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#C9A84C",
              marginBottom: "1rem",
            }}
          >
            Mjödheim
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 300,
              color: "#F5E6CC",
              lineHeight: 1.1,
            }}
          >
            Notre{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "#C9A84C",
                textShadow: "0 0 40px rgba(201,168,76,0.5)",
              }}
            >
              saga
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.3rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.6)",
              marginTop: "1rem",
            }}
          >
            Quand le passé verse dans la coupe du présent
          </p>
        </motion.div>
      </section>

      {/* Chapitres */}
      <section
        style={{
          backgroundColor: "#0A0604",
          padding: "6rem 2rem",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          {chapters.map((chapter, i) => (
            <ChapterBlock key={chapter.title} chapter={chapter} index={i} />
          ))}

          {/* Citation finale */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{
              textAlign: "center",
              borderTop: "1px solid rgba(201,168,76,0.2)",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
              padding: "4rem 2rem",
              margin: "0 auto",
              maxWidth: "700px",
            }}
          >
            <div style={{ fontSize: "3rem", color: "rgba(201,168,76,0.4)", marginBottom: "1.5rem" }}>ᚦ</div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                fontStyle: "italic",
                color: "rgba(245,230,204,0.85)",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}
            >
              "Mjödheim vit sur les marchés médiévaux, au son des cornemuses et des marteaux
              sur l'enclume. C'est une table en bois brut, des bouteilles au reflet ambré,
              et des conversations qui s'éternisent."
            </p>
            <footer style={{ fontSize: "0.8rem", letterSpacing: "0.2em", color: "#C9A84C", textTransform: "uppercase" }}>
              — Anthony, fondateur
            </footer>
          </motion.blockquote>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .saga-grid { grid-template-columns: 1fr !important; gap: 2.5rem !important; direction: ltr !important; }
        }
      `}</style>
    </>
  );
}
