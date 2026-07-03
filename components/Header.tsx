"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

/* ── Canvas braises ── */
interface Ember { x: number; y: number; size: number; vx: number; vy: number; alpha: number; fade: number; color: string; pulse: number; pulseSpeed: number }
const EMBER_COLORS = ["rgba(224,90,0,","rgba(245,166,35,","rgba(255,122,32,","rgba(255,200,80,"];

function NavEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const embers: Ember[] = [];
    let wind = 0, windTarget = 0, windTimer = 0;

    const spawn = (): Ember => ({
      x: Math.random() * cv.width,
      y: cv.height + 2,
      size: Math.random() * 1.0 + 0.3,
      vx: (Math.random() - 0.5) * 0.5 + wind * 0.2,
      vy: -(Math.random() * 1.0 + 0.3),
      alpha: Math.random() * 0.45 + 0.15,
      fade: Math.random() * 0.004 + 0.001,
      color: EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.015,
    });

    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);

      windTimer--;
      if (windTimer <= 0) { windTarget = (Math.random() - 0.5) * 1.6; windTimer = 80 + Math.floor(Math.random() * 100); }
      wind += (windTarget - wind) * 0.01;

      if (Math.random() < 0.007) {
        const count = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < count; i++) embers.push(spawn());
      } else if (embers.length < 14 && Math.random() < 0.14) {
        embers.push(spawn());
      }

      for (let i = embers.length - 1; i >= 0; i--) {
        const e = embers[i];
        e.vx += wind * 0.01 + (Math.random() - 0.5) * 0.03;
        e.x += e.vx; e.y += e.vy; e.alpha -= e.fade;
        e.pulse += e.pulseSpeed;
        if (e.alpha <= 0) { embers.splice(i, 1); continue; }

        const pa = e.alpha * (0.8 + 0.2 * Math.sin(e.pulse));
        const ps = e.size * (0.92 + 0.1 * Math.sin(e.pulse * 1.3));

        const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, ps * 3.5);
        g.addColorStop(0, `${e.color}${(pa * 0.5).toFixed(3)})`);
        g.addColorStop(1, `${e.color}0)`);
        ctx.beginPath(); ctx.arc(e.x, e.y, ps * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();

        ctx.beginPath(); ctx.arc(e.x, e.y, ps * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,235,180,${(pa * 0.65).toFixed(3)})`; ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "60px", pointerEvents: "none", zIndex: 0 }}
    />
  );
}

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/notre-saga", label: "Notre saga" },
  { href: "/nos-hydromels", label: "Nos hydromels" },
  { href: "/nos-bieres", label: "Nos bières" },
  { href: "/evenements", label: "Événements" },
  { href: "/chroniques", label: "Chroniques" },
  { href: "/outils/accises", label: "Calculateur" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "https://brewtrack.mjodheim.be", label: "BrewTrack" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith("/keystatic") || pathname?.startsWith("/admin-login")) return null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.4s ease",
        backgroundColor: scrolled ? "rgba(10,6,4,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: "none",
        overflow: "visible",
      }}
    >
      {/* Ligne dorée + braises en bas du header */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: scrolled ? "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), rgba(224,90,0,0.4), rgba(201,168,76,0.2), transparent)" : "transparent", transition: "all 0.4s ease", zIndex: 1 }} />
      <NavEmbers />
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? "70px" : "90px",
          transition: "height 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <div
            style={{
              position: "relative",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(201,168,76,0.5)",
              boxShadow: "0 0 12px rgba(201,168,76,0.25)",
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/logo-header.png"
              alt="Mjödheim"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.6rem",
              fontWeight: 600,
              color: "#C9A84C",
              letterSpacing: "0.05em",
              textShadow: "0 0 20px rgba(201,168,76,0.4)",
            }}
          >
            Mjödheim
          </span>
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden-mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1rem",
                fontWeight: 500,
                color: "#F5E6CC",
                textDecoration: "none",
                letterSpacing: "0.08em",
                transition: "color 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#C9A84C";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#F5E6CC";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Burger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{
            background: "none",
            border: "none",
            color: "#C9A84C",
            cursor: "pointer",
            padding: "0.5rem",
          }}
          aria-label="Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div
          style={{
            backgroundColor: "rgba(10,6,4,0.98)",
            borderTop: "1px solid rgba(201,168,76,0.2)",
            padding: "1.5rem 2rem",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.3rem",
                fontWeight: 500,
                color: "#F5E6CC",
                textDecoration: "none",
                padding: "0.75rem 0",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                letterSpacing: "0.08em",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </header>
  );
}
