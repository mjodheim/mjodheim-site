import type { Metadata } from "next";
import AcciseClient from "./AcciseClient";

export const metadata: Metadata = {
  title: { absolute: "Calculateur d'accises sur la bière (Belgique/UE) – BrewTrack" },
  description:
    "Calculez gratuitement le droit d'accise sur votre bière au barème belge et européen (taux × hectolitres × degrés Plato). Un outil offert par BrewTrack, le logiciel de gestion fait par un brasseur.",
  openGraph: {
    title: "Calculateur d'accises sur la bière – gratuit",
    description:
      "Estimez vos accises en quelques secondes. Barèmes Belgique, Allemagne, Autriche. Offert par BrewTrack.",
    url: "https://www.mjodheim.be/outils/accises",
  },
  alternates: { canonical: "https://www.mjodheim.be/outils/accises" },
};

export default function AccisePage() {
  return <AcciseClient />;
}
