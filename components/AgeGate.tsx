"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const passed = sessionStorage.getItem("mjodheim_age_ok");
    if (!passed) setVisible(true);
  }, []);

  const confirm = () => {
    sessionStorage.setItem("mjodheim_age_ok", "1");
    setVisible(false);
  };

  const deny = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#080402",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          {/* Lueur ambrée */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse at center, rgba(181,101,29,0.1) 0%, transparent 65%)",
              pointerEvents: "none",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              position: "relative",
              maxWidth: "480px",
              width: "100%",
              textAlign: "center",
              border: "1px solid rgba(201,168,76,0.25)",
              padding: "4rem 3rem",
              backgroundColor: "#0D0806",
              boxShadow: "0 0 60px rgba(201,168,76,0.08)",
            }}
          >
            {/* Rune décorative */}
            <div
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "3rem",
                color: "rgba(201,168,76,0.5)",
                marginBottom: "1.5rem",
                textShadow: "0 0 20px rgba(201,168,76,0.3)",
              }}
            >
              ᚠ
            </div>

            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2rem",
                fontWeight: 500,
                color: "#F5E6CC",
                marginBottom: "0.75rem",
                lineHeight: 1.2,
              }}
            >
              Bienvenue à{" "}
              <em style={{ color: "#C9A84C", fontStyle: "italic" }}>Mjödheim</em>
            </h2>

            <p
              style={{
                color: "rgba(245,230,204,0.6)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
              }}
            >
              Notre hydromel est réservé aux personnes majeures.
              <br />
              Avez-vous{" "}
              <strong style={{ color: "#C9A84C" }}>18 ans ou plus</strong> ?
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={confirm} className="btn-gold">
                Oui, j'ai 18 ans ou plus
              </button>
              <button onClick={deny} className="btn-outline">
                Non
              </button>
            </div>

            <p
              style={{
                marginTop: "2rem",
                fontSize: "0.75rem",
                color: "rgba(245,230,204,0.3)",
                lineHeight: 1.6,
              }}
            >
              L'abus d'alcool est dangereux pour la santé.
              <br />À consommer avec modération.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
