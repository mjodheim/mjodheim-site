import type { Metadata } from "next";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ – Vos questions sur l'hydromel – Mjödheim",
  description:
    "Tout ce que vous voulez savoir sur l'hydromel : conservation, taux d'alcool, accords, livraison et bien plus. Réponses de Mjödheim.",
  openGraph: {
    title: "FAQ – Mjödheim",
    description:
      "Hydromel sucré ou sec ? Comment le conserver ? Où l'acheter ? Toutes les réponses de la brasserie Mjödheim.",
    url: "https://www.mjodheim.be/faq",
  },
};

export default function FaqPage() {
  return <FaqClient />;
}
