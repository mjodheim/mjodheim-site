import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: {
    absolute: "Contact – Mjödheim, Beaumont"
  },
  description:
    "Contactez la brasserie Mjödheim à Beaumont. Une question, une commande, ou simplement envie de parler hydromel ?",
  openGraph: {
    title: "Contact – Mjödheim",
    description:
      "Écrivez-nous, appelez-nous ou passez commande directement. On aime autant discuter que brasser.",
    url: "https://www.mjodheim.be/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
