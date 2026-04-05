"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Ember {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  fade: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = [
  "rgba(224,90,0,",
  "rgba(201,168,76,",
  "rgba(245,166,35,",
  "rgba(255,122,32,",
  "rgba(255,60,0,",
  "rgba(255,200,80,",
];

function HeroEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      cv.width = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const embers: Ember[] = [];
    let raf: number;

    const spawn = (): Ember => {
      const zone = Math.random();
      return {
        x: zone < 0.5
          ? Math.random() * cv.width * 0.4
          : cv.width * 0.6 + Math.random() * cv.width * 0.4,
        y: cv.height + 10,
        size: Math.random() * 4 + 0.8,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 2.5 + 0.8),
        alpha: Math.random() * 0.7 + 0.3,
        fade: Math.random() * 0.004 + 0.001,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.06 + 0.02,
      };
    };

    // Pré-remplir
    for (let i = 0; i < 120; i++) {
      const e = spawn();
      e.y = Math.random() * cv.height;
      e.alpha = Math.random() * 0.5;
      embers.push(e);
    }

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);

      // Spawn continu
      const spawnRate = cv.width < 768 ? 0.4 : 0.65;
      if (Math.random() < spawnRate) embers.push(spawn());
      // Gros flash aléatoire
      if (Math.random() < 0.015) {
        for (let i = 0; i < 8; i++) embers.push(spawn());
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.x += e.vx;
        e.y += e.vy;
        e.alpha -= e.fade;
        e.vx += (Math.random() - 0.5) * 0.08;
        e.pulse += e.pulseSpeed;

        if (e.alpha <= 0) { embers.splice(i, 1); continue; }

        const pulsedAlpha = e.alpha * (0.75 + 0.25 * Math.sin(e.pulse));
        const pulsedSize = e.size * (0.9 + 0.15 * Math.sin(e.pulse * 1.3));

        // Halo large
        const g1 = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, pulsedSize * 5);
        g1.addColorStop(0, `${e.color}${pulsedAlpha * 0.6})`);
        g1.addColorStop(1, `${e.color}0)`);
        ctx.beginPath();
        ctx.arc(e.x, e.y, pulsedSize * 5, 0, Math.PI * 2);
        ctx.fillStyle = g1;
        ctx.fill();

        // Corps de la braise
        const g2 = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, pulsedSize * 2);
        g2.addColorStop(0, `${e.color}${pulsedAlpha})`);
        g2.addColorStop(1, `${e.color}0)`);
        ctx.beginPath();
        ctx.arc(e.x, e.y, pulsedSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = g2;
        ctx.fill();

        // Cœur blanc chaud
        ctx.beginPath();
        ctx.arc(e.x, e.y, pulsedSize * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,180,${pulsedAlpha * 0.85})`;
        ctx.fill();
      }

      // Lueur de feu au sol — gauche et droite
      const glowY = cv.height;
      [cv.width * 0.18, cv.width * 0.82].forEach((gx) => {
        const gFire = ctx.createRadialGradient(gx, glowY, 0, gx, glowY, cv.width * 0.28);
        const flicker = 0.08 + 0.04 * Math.sin(Date.now() * 0.003);
        gFire.addColorStop(0, `rgba(224,90,0,${flicker})`);
        gFire.addColorStop(0.5, `rgba(181,60,0,${flicker * 0.5})`);
        gFire.addColorStop(1, "rgba(10,6,4,0)");
        ctx.beginPath();
        ctx.ellipse(gx, glowY, cv.width * 0.28, cv.height * 0.35, 0, 0, Math.PI * 2);
        ctx.fillStyle = gFire;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}

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
      {/* Image de fond avec Ken Burns */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <motion.div
          style={{ position: "absolute", inset: "-5%" }}
          animate={{ scale: [1, 1.06] }}
          transition={{ duration: 28, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <Image
            src="/images/hero.png"
            alt="Forêt nordique"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </motion.div>

        {/* Overlay multicouche */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(10,6,4,0.35) 0%, rgba(10,6,4,0.6) 50%, rgba(10,6,4,0.97) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,4,0.65) 100%)",
          }}
        />
      </div>

      {/* Braises hero */}
      <HeroEmbers />

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <Link href="/nos-hydromels" className="btn-gold">
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
