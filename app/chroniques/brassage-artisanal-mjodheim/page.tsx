"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "Tout commence avec le miel",
    content: `L'hydromel, c'est 90 % la qualité du miel. C'est pourquoi chez Mjödheim, le choix du miel n'est pas une formalité : c'est le fondement de chaque cuvée.

Un miel floral, léger et délicat donnera un hydromel élégant et nerveux — c'est le profil de notre Brume d'Yggdrasil. Un miel plus intense, aux notes caramélisées, apportera de la rondeur et de la profondeur. Nous ne travaillons qu'avec des miels de qualité supérieure, sélectionnés pour leur pureté et leur caractère.`,
  },
  {
    title: "La préparation du moût",
    content: `Le miel est dilué dans de l'eau pour former ce qu'on appelle le moût — le liquide sucré qui sera fermenté. Le ratio miel/eau détermine en grande partie le taux d'alcool final et la structure de l'hydromel.

Chez Mjödheim, nous travaillons en petites cuvées, ce qui nous permet d'ajuster chaque paramètre avec précision : concentration, température, équilibre. Rien n'est laissé au hasard, rien n'est confié à une machine.`,
  },
  {
    title: "La fermentation : le temps fait son œuvre",
    content: `Une fois les levures ajoutées au moût, la fermentation démarre. Les levures consomment les sucres du miel et produisent de l'alcool et du CO₂. C'est un processus vivant, qui demande surveillance et patience.

La fermentation peut durer plusieurs semaines. La température ambiante, la qualité des levures, la composition du miel — tout influence le résultat. C'est ici que le savoir-faire de l'artisan fait la différence : observer, ajuster, décider du bon moment pour arrêter.`,
  },
  {
    title: "La maturation et l'embouteillage",
    content: `Après la fermentation, l'hydromel repose. Cette phase de maturation permet aux arômes de s'affiner, aux saveurs de se fondre. Selon le style visé, cette période peut aller de quelques semaines à plusieurs mois.

Vient ensuite l'embouteillage — une étape critique. Nous ajoutons une petite quantité de conservateurs naturels (E202 et E224, couramment utilisés en œnologie) pour stabiliser l'hydromel et garantir sa qualité dans le temps. Chaque bouteille est remplie, bouchée et étiquetée à la main.

De la ruche à votre verre, chaque geste compte.`,
  },
];

export default function ArticleBrassagePage() {
  return (
    <>
      <section
        style={{
          position: "relative",
          height: "60vh",
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "4rem",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/chronique-brassage.png"
            alt="Brassage artisanal Mjödheim"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,6,4,0.3) 0%, rgba(10,6,4,0.75) 70%, rgba(10,6,4,1) 100%)" }} />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", zIndex: 1, padding: "0 2rem", maxWidth: "900px", margin: "0 auto", width: "100%" }}
        >
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "0.25rem 0.75rem" }}>
              Savoir-faire
            </span>
            <span style={{ fontSize: "0.75rem", color: "rgba(245,230,204,0.4)" }}>Octobre 2025 · 6 min de lecture</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 400, color: "#F5E6CC", lineHeight: 1.15 }}>
            De la ruche à la bouteille :{" "}
            <em style={{ color: "#C9A84C", fontStyle: "italic" }}>le brassage chez Mjödheim</em>
          </h1>
        </motion.div>
      </section>

      <section style={{ backgroundColor: "#0A0604", padding: "4rem 2rem 8rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.35rem", fontStyle: "italic", color: "rgba(245,230,204,0.8)", lineHeight: 1.8, marginBottom: "3rem", paddingBottom: "2.5rem", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
          >
            Comment naît un hydromel artisanal ? Derrière chaque bouteille Mjödheim se cache un processus réfléchi, manuel, et exigeant. Voici les coulisses de notre brassage.
          </motion.p>

          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ marginBottom: "3rem" }}
            >
              <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.8rem", fontWeight: 500, color: "#C9A84C", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                {section.title}
              </h2>
              {section.content.split("\n\n").map((para, j) => (
                <p key={j} style={{ color: "rgba(245,230,204,0.75)", lineHeight: 1.9, fontSize: "1rem", marginBottom: "1rem" }}>
                  {para}
                </p>
              ))}
            </motion.div>
          ))}

          <div style={{ marginTop: "4rem", padding: "2.5rem", border: "1px solid rgba(201,168,76,0.2)", backgroundColor: "#0D0806", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.25rem", fontStyle: "italic", color: "rgba(245,230,204,0.7)", marginBottom: "1.5rem", lineHeight: 1.6 }}>
              Curiosité satisfaite ? Découvrez le résultat dans nos bouteilles.
            </p>
            <Link href="/nos-hydromels" className="btn-gold">Voir nos hydromels</Link>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Link href="/chroniques" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(245,230,204,0.5)", textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.1em" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#C9A84C")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(245,230,204,0.5)")}>
              <ArrowLeft size={16} />
              Retour aux chroniques
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
