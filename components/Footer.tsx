"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#080402",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        padding: "4rem 2rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "3rem",
          marginBottom: "3rem",
        }}
      >
        {/* Logo + tagline */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{ position: "relative", width: "42px", height: "42px" }}>
              <Image
                src="/images/logo-header.png"
                alt="Mjödheim"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#C9A84C",
              }}
            >
              Mjödheim
            </span>
          </div>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.6)",
              lineHeight: 1.7,
            }}
          >
            Forgez votre légende,<br />une gorgée à la fois.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#C9A84C",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Navigation
          </h4>
          {[
            { href: "/notre-saga", label: "Notre saga" },
            { href: "/nos-creations", label: "Nos créations" },
            { href: "/evenements", label: "Événements" },
            { href: "/chroniques", label: "Chroniques" },
            { href: "/faq", label: "FAQ" },
            { href: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                color: "rgba(245,230,204,0.7)",
                textDecoration: "none",
                marginBottom: "0.6rem",
                fontSize: "0.9rem",
                transition: "color 0.2s",
                letterSpacing: "0.05em",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9A84C")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(245,230,204,0.7)")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#C9A84C",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            L'atelier
          </h4>
          <p style={{ color: "rgba(245,230,204,0.7)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            Beaumont, Belgique
          </p>
          <a
            href="tel:+32470404191"
            style={{ display: "block", color: "rgba(245,230,204,0.7)", textDecoration: "none", fontSize: "0.9rem", marginBottom: "0.5rem" }}
          >
            +32 470 40 41 91
          </a>
          <a
            href="mailto:contact@mjodheim.be"
            style={{ display: "block", color: "rgba(245,230,204,0.7)", textDecoration: "none", fontSize: "0.9rem" }}
          >
            contact@mjodheim.be
          </a>
        </div>

        {/* Suivre */}
        <div>
          <h4
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#C9A84C",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            Rejoindre le clan
          </h4>
          <p style={{ color: "rgba(245,230,204,0.7)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1rem" }}>
            Marchés, nouvelles recettes et récits légendaires sur nos réseaux.
          </p>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "#C9A84C",
              padding: "0.5rem 1.25rem",
              fontSize: "0.9rem",
              textDecoration: "none",
              transition: "all 0.3s ease",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              letterSpacing: "0.08em",
            }}
          >
            Facebook
          </a>
        </div>
      </div>

      {/* Séparateur */}
      <div
        style={{
          borderTop: "1px solid rgba(201,168,76,0.1)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <p style={{ color: "rgba(245,230,204,0.4)", fontSize: "0.8rem" }}>
          © 2025 Mjödheim. Tous droits réservés. — L'abus d'alcool est dangereux pour la santé.
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link
            href="/confidentialite"
            style={{ color: "rgba(245,230,204,0.4)", fontSize: "0.8rem", textDecoration: "none" }}
          >
            Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
