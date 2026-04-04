"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "700px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Image de fond */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/naeroyfjord.jpg"
          alt="Fjord nordique"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {/* Overlay multicouche pour effet cinématique */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,6,4,0.4) 0%, rgba(10,6,4,0.65) 50%, rgba(10,6,4,0.95) 100%)",
          }}
        />
        {/* Vignette latérale */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,4,0.7) 100%)",
          }}
        />
        {/* Lueur ambrée en bas */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "40%",
            background:
              "radial-gradient(ellipse at bottom, rgba(181,101,29,0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Contenu centré */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "900px",
        }}
      >
        {/* Rune décorative */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            color: "#C9A84C",
          }}
        >
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
          <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.9 }}>
            Brasserie artisanale nordique — Beaumont, Belgique
          </span>
          <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3.5rem, 8vw, 7rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            color: "#F5E6CC",
            marginBottom: "1.5rem",
            textShadow: "0 2px 40px rgba(10,6,4,0.8)",
          }}
        >
          Forgez votre{" "}
          <em
            style={{
              fontStyle: "italic",
              color: "#C9A84C",
              textShadow: "0 0 40px rgba(201,168,76,0.5), 0 0 80px rgba(224,90,0,0.2)",
              display: "inline-block",
            }}
          >
            légende
          </em>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontStyle: "italic",
            color: "rgba(245,230,204,0.75)",
            marginBottom: "3rem",
            letterSpacing: "0.03em",
          }}
        >
          une gorgée à la fois
        </motion.p>

        {/* Boutons CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href="/nos-creations" className="btn-gold">
            Découvrir nos créations
          </Link>
          <Link href="/notre-saga" className="btn-outline">
            Notre saga
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          color: "rgba(201,168,76,0.6)",
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Défiler
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ width: "1px", height: "40px", background: "linear-gradient(180deg, #C9A84C, transparent)" }}
        />
      </motion.div>
    </section>
  );
}
