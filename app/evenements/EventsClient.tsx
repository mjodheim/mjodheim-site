"use client";

import { motion } from "framer-motion";

type Event = {
  slug: string;
  title: string;
  dateDisplay: string;
  date: string;
  location: string;
  type: string;
  description: string;
};

const typeIcon: Record<string, string> = {
  "marché": "🏰",
  "événement": "🎪",
  "dégustation": "🍯",
};

export default function EventsClient({ events }: { events: Event[] }) {
  return (
    <>
      {/* Hero sobre */}
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
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", padding: "0 2rem" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", color: "#C9A84C", marginBottom: "1.5rem" }}>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A84C)" }} />
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Sur les routes de Mjödheim</span>
            <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, #C9A84C, transparent)" }} />
          </div>
          <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 300, color: "#F5E6CC", marginBottom: "1.25rem" }}>
            Là où résonne{" "}
            <em style={{ fontStyle: "italic", color: "#C9A84C", textShadow: "0 0 40px rgba(201,168,76,0.4)" }}>notre corne</em>
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
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.4rem", fontStyle: "italic", color: "rgba(245,230,204,0.75)", lineHeight: 1.8, textAlign: "center", marginBottom: "4rem" }}
          >
            Des marchés médiévaux aux fêtes de village, Mjödheim voyage avec ses bouteilles et son savoir-faire.
          </motion.p>

          <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2rem", color: "#C9A84C", marginBottom: "2rem", textAlign: "center" }}>
            Prochains rendez-vous
          </h2>

          {events.length === 0 ? (
            <div style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "3rem", textAlign: "center", backgroundColor: "#0D0806" }}>
              <p style={{ color: "rgba(245,230,204,0.55)", lineHeight: 1.7 }}>
                Aucun événement programmé pour le moment. Suivez-nous sur Facebook pour les prochaines annonces.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
              {events.map((event, i) => (
                <motion.div
                  key={event.slug}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "1.5rem", backgroundColor: "#0D0806", border: "1px solid rgba(201,168,76,0.15)", padding: "1.75rem 2rem", alignItems: "center" }}
                >
                  <div style={{ textAlign: "center", fontSize: "2rem" }}>{typeIcon[event.type] ?? "⚔"}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                      <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.4rem", color: "#F5E6CC", fontWeight: 500 }}>
                        {event.title}
                      </h3>
                      <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "0.2rem 0.6rem", textTransform: "uppercase" }}>
                        {event.type}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "#C9A84C", marginBottom: "0.4rem" }}>
                      📅 {event.dateDisplay} — {event.location}
                    </p>
                    <p style={{ color: "rgba(245,230,204,0.6)", fontSize: "0.9rem", lineHeight: 1.6 }}>{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <a href="https://www.facebook.com/profile.php?id=61579288641616" target="_blank" rel="noopener noreferrer" className="btn-outline">
              Suivre sur Facebook
            </a>
          </div>

          {/* Grille types */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginTop: "5rem" }} className="events-grid">
            {[
              { icon: "🏰", title: "Marchés médiévaux", desc: "Notre terrain de prédilection. Ambiance authentique, costumes d'époque." },
              { icon: "🎪", title: "Fêtes & événements", desc: "Fêtes de village, brocantes — Mjödheim apporte son hydromel partout." },
              { icon: "🏠", title: "Atelier à Beaumont", desc: "Achetez directement ou sur rendez-vous. Dégustation sur demande." },
              { icon: "🤝", title: "Partenariats", desc: "Organisateur ou revendeur ? Contactez-nous pour collaborer." },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: "#0D0806", border: "1px solid rgba(201,168,76,0.12)", padding: "2rem" }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "0.875rem" }}>{item.icon}</div>
                <h3 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", color: "#C9A84C", marginBottom: "0.6rem" }}>{item.title}</h3>
                <p style={{ color: "rgba(245,230,204,0.6)", fontSize: "0.88rem", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 640px) { .events-grid { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
