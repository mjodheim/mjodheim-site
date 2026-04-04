"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/notre-saga", label: "Notre saga" },
  { href: "/nos-hydromels", label: "Nos hydromels" },
  { href: "/evenements", label: "Événements" },
  { href: "/chroniques", label: "Chroniques" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
      }}
    >
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
          <div style={{ position: "relative", width: "48px", height: "48px" }}>
            <Image
              src="/images/cropped-Mjodheim-logo-1.png"
              alt="Mjödheim"
              fill
              style={{ objectFit: "contain", filter: "brightness(1.1)" }}
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
