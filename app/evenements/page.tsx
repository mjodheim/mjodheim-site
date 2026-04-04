"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import events from "@/data/events.json";

const typeIcon: Record<string, string> = {
  "marché": "🏰",
  "événement": "🎪",
};

export default function EvenementsPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: "450px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: "5rem",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/Banniere-2.png"
            alt="Événements Mjödheim"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(10,6,4,0.4) 0%, rgba(10,6,4,0.7) 60%, rgba(10,6,4,1) 100%)",
            }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 2rem" }}
        >
          <p style={{ fontSize: "0.8rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem" }}>
            Sur les routes de Mjödheim
          </p>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 300,
              color: "#F5E6CC",
            }}
          >
            Là où résonne{" "}
            <em style={{ fontStyle: "italic", color: "#C9A84C", textShadow: "0 0 40px rgba(201,168,76,0.5)" }}>
              notre corne
            </em>
          </h1>
        </motion.div>
      </section>

      {/* Contenu */}
      <section style={{ backgroundColor: "#0A0604", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.4rem",
              fontStyle: "italic",
              color: "rgba(245,230,204,0.75)",
              lineHeight: 1.8,
              textAlign: "center",
              marginBottom: "5rem",
            }}
          >
            Des marchés médiévaux aux fêtes de village, Mjödheim voyage avec ses bouteilles et son
            savoir-faire. Venez nous rencontrer, lever une corne et goûter nos hydromels là où les
            histoires se racontent.
          </motion.p>

          {/* Prochains événements depuis events.json */}
          <div style={{ marginBottom: "4rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2rem",
                color: "#C9A84C",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              Prochains rendez-vous
            </h2>

            {events.length === 0 ? (
              <div
                style={{
                  border: "1px solid rgba(201,168,76,0.2)",
                  padding: "3rem",
                  textAlign: "center",
                  backgroundColor: "#0D0806",
                }}
              >
                <p style={{ color: "rgba(245,230,204,0.55)", lineHeight: 1.7 }}>
                  Aucun événement programmé pour le moment. Suivez-nous sur Facebook pour les prochaines annonces.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {events.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr",
                      gap: "1.5rem",
                      backgroundColor: "#0D0806",
                      border: "1px solid rgba(201,168,76,0.15)",
                      padding: "1.75rem 2rem",
                      alignItems: "center",
                    }}
                    className="event-row"
                  >
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "2rem" }}>{typeIcon[event.type] ?? "⚔"}</div>
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                        <h3
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                            fontSize: "1.4rem",
                            color: "#F5E6CC",
                            fontWeight: 500,
                          }}
                        >
                          {event.title}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.7rem",
                            letterSpacing: "0.15em",
                            color: "#C9A84C",
                            border: "1px solid rgba(201,168,76,0.3)",
                            padding: "0.2rem 0.6rem",
                            textTransform: "uppercase",
                          }}
                        >
                          {event.type}
                        </span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#C9A84C", marginBottom: "0.4rem" }}>
                        📅 {event.dateDisplay} — {event.location}
                      </p>
                      <p style={{ color: "rgba(245,230,204,0.6)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                        {event.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn-outline">
                Suivre sur Facebook pour les mises à jour
              </a>
            </div>
          </div>

          {/* Carte / Localisation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
            }}
            className="events-grid"
          >
            <div
              style={{
                backgroundColor: "#0D0806",
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "2.5rem",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🏰</div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#C9A84C",
                  marginBottom: "0.75rem",
                }}
              >
                Marchés médiévaux
              </h3>
              <p style={{ color: "rgba(245,230,204,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Notre terrain de prédilection. Ambiance authentique, costumes d'époque, et l'hydromel qui coule à flots.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#0D0806",
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "2.5rem",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🎪</div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#C9A84C",
                  marginBottom: "0.75rem",
                }}
              >
                Fêtes & événements
              </h3>
              <p style={{ color: "rgba(245,230,204,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Fêtes de village, brocantes, événements culturels — Mjödheim apporte son hydromel et son univers partout où les gens se rassemblent.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#0D0806",
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "2.5rem",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🏠</div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#C9A84C",
                  marginBottom: "0.75rem",
                }}
              >
                L'atelier à Beaumont
              </h3>
              <p style={{ color: "rgba(245,230,204,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Achetez directement à l'atelier ou sur rendez-vous. Contactez-nous pour organiser une dégustation privée.
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#0D0806",
                border: "1px solid rgba(201,168,76,0.12)",
                padding: "2.5rem",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🤝</div>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#C9A84C",
                  marginBottom: "0.75rem",
                }}
              >
                Partenariats
              </h3>
              <p style={{ color: "rgba(245,230,204,0.6)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                Organisateur d'événement ? Revendeur ? Contactez-nous pour discuter d'une collaboration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
