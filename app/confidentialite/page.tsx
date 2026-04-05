import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confidentialité",
  description: "Politique de confidentialité de Mjödheim.",
};

export default function ConfidentialitePage() {
  return (
    <section
      style={{
        backgroundColor: "#0A0604",
        paddingTop: "160px",
        paddingBottom: "8rem",
        padding: "160px 2rem 8rem",
      }}
    >
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "#F5E6CC",
            marginBottom: "0.5rem",
          }}
        >
          Politique de{" "}
          <em style={{ color: "#C9A84C", fontStyle: "italic" }}>confidentialité</em>
        </h1>
        <p style={{ color: "rgba(245,230,204,0.4)", fontSize: "0.85rem", marginBottom: "3rem" }}>
          Dernière mise à jour : avril 2025
        </p>

        {[
          {
            title: "Qui sommes-nous ?",
            content:
              "Mjödheim est une brasserie artisanale d'hydromel et de bières, basée à Beaumont, Belgique. Le site mjodheim.be est édité par Anthony Mets. Contact : contact@mjodheim.be",
          },
          {
            title: "Données collectées",
            content:
              "Le seul formulaire collectant des données personnelles est le formulaire de contact. Les informations saisies (nom, adresse e-mail, téléphone optionnel, message) sont utilisées uniquement pour répondre à votre demande. Elles ne sont pas conservées dans une base de données et ne sont pas transmises à des tiers.",
          },
          {
            title: "Cookies",
            content:
              "Ce site utilise un cookie de session pour la vérification de l'âge (sessionStorage) et un cookie sécurisé pour l'accès à l'espace d'administration. Aucun cookie publicitaire ou de tracking n'est utilisé.",
          },
          {
            title: "Hébergement",
            content:
              "Le site est hébergé sur Vercel (San Francisco, USA). Les données transitant par le formulaire de contact sont traitées via Resend, service d'envoi d'e-mails. Ces prestataires disposent de leurs propres politiques de confidentialité conformes au RGPD.",
          },
          {
            title: "Vos droits",
            content:
              "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à contact@mjodheim.be.",
          },
        ].map((section) => (
          <div key={section.title} style={{ marginBottom: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "#C9A84C",
                marginBottom: "0.75rem",
              }}
            >
              {section.title}
            </h2>
            <p
              style={{
                color: "rgba(245,230,204,0.7)",
                lineHeight: 1.85,
                fontSize: "0.95rem",
              }}
            >
              {section.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
