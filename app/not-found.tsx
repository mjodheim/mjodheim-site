"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A0604",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Lueur de fond */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ position: "relative", maxWidth: "600px" }}
      >
        <div
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "8rem",
            fontWeight: 300,
            color: "rgba(201,168,76,0.15)",
            lineHeight: 1,
            marginBottom: "0",
            letterSpacing: "-0.05em",
          }}
        >
          404
        </div>

        <div style={{ fontSize: "3rem", marginBottom: "1.5rem", marginTop: "-1rem" }}>ᚱ</div>

        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "#F5E6CC",
            marginBottom: "1.25rem",
            lineHeight: 1.2,
          }}
        >
          Cette page s'est{" "}
          <em style={{ color: "#C9A84C", fontStyle: "italic" }}>perdue dans les brumes</em>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.2rem",
            fontStyle: "italic",
            color: "rgba(245,230,204,0.55)",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Même Odin et ses corbeaux ne trouvent plus cette page. Elle a peut-être rejoint le Valhalla.
        </p>

        <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-gold">
            Retour à l'accueil
          </Link>
          <Link href="/contact" className="btn-outline">
            Nous contacter
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
