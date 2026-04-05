"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Qu'est-ce que l'hydromel ?",
    a: "L'hydromel est une boisson fermentée à base de miel et d'eau, parfois agrémentée d'épices ou de fruits. C'est l'une des plus anciennes boissons alcoolisées au monde, appréciée autant par les Vikings que par les druides celtes… et maintenant par vous.",
  },
  {
    q: "L'hydromel Mjödheim est-il sucré ?",
    a: "Non. Nos hydromels sont secs et puissants en bouche. On est loin des versions sirupeuses industrielles : ici, on parle d'authenticité et de caractère.",
  },
  {
    q: "Quel est le taux d'alcool ?",
    a: "Nos hydromels affichent environ 13-14 % vol., comme un bon vin corsé.",
  },
  {
    q: "Comment le conserver ?",
    a: "Bouteille fermée : dans un endroit frais, à l'abri de la lumière. Bouteille ouverte : au frais, bouchon refermé, à consommer idéalement dans les 7 jours.",
  },
  {
    q: "Faut-il le servir frais ?",
    a: "Oui, légèrement frais (8-12°C) pour révéler les arômes. Certains préfèrent à température ambiante pour un profil plus rond et chaleureux.",
  },
  {
    q: "Puis-je cuisiner avec ?",
    a: "Absolument. L'hydromel sublime les marinades, les sauces, les desserts flambés et même certains fromages.",
  },
  {
    q: "Où puis-je acheter vos créations ?",
    a: "Nos hydromels et bières se trouvent principalement sur les marchés médiévaux et événements auxquels nous participons. Consultez notre page Événements pour les prochaines dates. Vous pouvez également passer commande directement via la page Contact.",
  },
  {
    q: "Livrez-vous à domicile ?",
    a: "Nous ne passons par aucun intermédiaire de livraison — nos créations sont trop précieuses pour être confiées à un transporteur. En revanche, une livraison personnelle dans un rayon raisonnable autour de Beaumont est possible, à discuter directement avec nous. Contactez-nous pour en parler.",
  },
  {
    q: "Proposez-vous des dégustations ?",
    a: "Oui. Lors de marchés, événements ou sur rendez-vous. Contactez-nous pour organiser une dégustation.",
  },
  {
    q: "Puis-je devenir revendeur ?",
    a: "Avec plaisir. Contactez-nous via la page Contact pour discuter partenariat et conditions.",
  },
  {
    q: "Y a-t-il des additifs ou conservateurs ?",
    a: "Oui, nous utilisons de petites quantités de E202 (sorbate de potassium) et E224 (métabisulfite de potassium). Ces additifs alimentaires, couramment employés en œnologie, permettent de stabiliser l'hydromel, éviter une reprise de fermentation en bouteille et garantir sa qualité dans le temps.",
  },
];

function FaqItem({ item, index }: { item: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{
        borderBottom: "1px solid rgba(201,168,76,0.12)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.75rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.25rem",
            fontWeight: 500,
            color: open ? "#C9A84C" : "#F5E6CC",
            transition: "color 0.2s",
            lineHeight: 1.4,
          }}
        >
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ flexShrink: 0, color: "#C9A84C" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                paddingBottom: "1.75rem",
                color: "rgba(245,230,204,0.7)",
                lineHeight: 1.8,
                fontSize: "0.95rem",
              }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
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
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Savoir & comprendre</span>
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
            Questions{" "}
            <em style={{ fontStyle: "italic", color: "#C9A84C", textShadow: "0 0 40px rgba(201,168,76,0.4)" }}>
              fréquentes
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
            Tout ce que vous avez toujours voulu savoir sur l'hydromel
          </p>
        </motion.div>
      </section>

      {/* FAQ */}
      <section style={{ backgroundColor: "#0A0604", padding: "2rem 2rem 8rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {faqs.map((item, i) => (
            <FaqItem key={item.q} item={item} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
