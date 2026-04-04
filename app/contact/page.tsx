"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      telephone: (form.elements.namedItem("telephone") as HTMLInputElement).value,
      sujet: (form.elements.namedItem("sujet") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSent(true);
    } else {
      setError("Une erreur s'est produite. Réessayez ou contactez-nous directement par email.");
    }
  };

  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "160px",
          paddingBottom: "5rem",
          textAlign: "center",
          backgroundColor: "#0A0604",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", padding: "0 2rem" }}
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
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>La porte du hall est ouverte</span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 300,
              color: "#F5E6CC",
              marginBottom: "1rem",
            }}
          >
            Entrez en{" "}
            <em style={{ fontStyle: "italic", color: "#C9A84C", textShadow: "0 0 40px rgba(201,168,76,0.4)" }}>
              contact
            </em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.2rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.55)",
            }}
          >
            Parlons hydromel, artisanat et légendes
          </p>
        </motion.div>
      </section>

      {/* Contenu */}
      <section style={{ backgroundColor: "#0A0604", padding: "2rem 2rem 8rem" }}>
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "5rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p
              style={{
                color: "rgba(245,230,204,0.7)",
                lineHeight: 1.8,
                marginBottom: "3rem",
                fontSize: "1rem",
              }}
            >
              Vous avez une question sur nos hydromels, envie de passer commande, ou simplement
              partager un toast à distance ? Chez Mjödheim, on aime autant discuter que brasser.
            </p>

            {[
              { icon: MapPin, label: "Atelier", value: "Beaumont, Belgique" },
              { icon: Phone, label: "Téléphone", value: "+32 470 40 41 91", href: "tel:+32470404191" },
              { icon: Mail, label: "E-mail", value: "contact@mjodheim.be", href: "mailto:contact@mjodheim.be" },
            ].map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  marginBottom: "2rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    border: "1px solid rgba(201,168,76,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "#C9A84C",
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.25rem" }}>
                    {label}
                  </p>
                  {href ? (
                    <a href={href} style={{ color: "#F5E6CC", textDecoration: "none", fontSize: "1rem" }}>
                      {value}
                    </a>
                  ) : (
                    <p style={{ color: "#F5E6CC", fontSize: "1rem" }}>{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Séparateur */}
            <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "2rem", marginTop: "1rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: "rgba(245,230,204,0.5)",
                  lineHeight: 1.7,
                }}
              >
                "Écrivez-nous, appelez-nous ou envoyez un pigeon voyageur… mais on vous prévient, le pigeon met plus longtemps."
              </p>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {sent ? (
              <div
                style={{
                  border: "1px solid rgba(201,168,76,0.3)",
                  padding: "4rem",
                  textAlign: "center",
                  backgroundColor: "#0D0806",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>📜</div>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "2rem",
                    color: "#C9A84C",
                    marginBottom: "1rem",
                  }}
                >
                  Votre corbeau est parti !
                </h3>
                <p style={{ color: "rgba(245,230,204,0.7)", lineHeight: 1.7 }}>
                  Nous avons bien reçu votre message et vous répondrons dans les plus brefs délais. Skål !
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { name: "nom", label: "Votre nom", type: "text", required: true },
                  { name: "email", label: "Adresse mail", type: "email", required: true },
                  { name: "telephone", label: "Numéro de téléphone", type: "tel", required: false },
                  { name: "sujet", label: "Sujet", type: "text", required: false },
                ].map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={field.name}
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "rgba(245,230,204,0.5)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {field.label}
                      {field.required && <span style={{ color: "#C9A84C", marginLeft: "0.25rem" }}>*</span>}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      style={{
                        width: "100%",
                        padding: "0.875rem 1rem",
                        backgroundColor: "#120C07",
                        border: "1px solid rgba(201,168,76,0.2)",
                        color: "#F5E6CC",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                        fontFamily: "var(--font-inter), system-ui, sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: "block",
                      fontSize: "0.75rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "rgba(245,230,204,0.5)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Message <span style={{ color: "#C9A84C" }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "0.875rem 1rem",
                      backgroundColor: "#120C07",
                      border: "1px solid rgba(201,168,76,0.2)",
                      color: "#F5E6CC",
                      fontSize: "0.95rem",
                      outline: "none",
                      resize: "vertical",
                      transition: "border-color 0.2s",
                      fontFamily: "var(--font-inter), system-ui, sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.2)")}
                  />
                </div>

                {error && (
                  <p style={{ color: "#E05A00", fontSize: "0.9rem", padding: "0.75rem 1rem", border: "1px solid rgba(224,90,0,0.3)", backgroundColor: "rgba(224,90,0,0.05)" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-gold"
                  style={{ alignSelf: "flex-start", opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer" }}
                >
                  {loading ? "Envoi en cours…" : "Envoyer mon corbeau ✉"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </>
  );
}
