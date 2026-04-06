import type { Metadata } from "next";
import NosHydromelsClient from "./NosHydromelsClient";

export const metadata: Metadata = {
  title: "Nos hydromels artisanaux – Mjödheim",
  description:
    "Découvrez Brume d'Yggdrasil, Chaleur d'Asgard et Sang de Freya. Hydromels artisanaux brassés à Beaumont, Belgique.",
  openGraph: {
    title: "Nos hydromels – Mjödheim",
    description:
      "3 hydromels artisanaux aux profils uniques, brassés en petites cuvées à Beaumont.",
    url: "https://www.mjodheim.be/nos-hydromels",
    images: [
      {
        url: "/images/brume-d-yggdrasil.png",
        alt: "Brume d'Yggdrasil – Hydromel artisanal Mjödheim",
      },
    ],
  },
};

export default function NosHydromelsPage() {
  return <NosHydromelsClient />;
}
