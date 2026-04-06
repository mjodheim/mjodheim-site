import type { Metadata } from "next";
import NosCreationsClient from "./NosCreationsClient";

export const metadata: Metadata = {
  title: "Nos créations – Hydromels & bières artisanales – Mjödheim",
  description:
    "Toute la gamme Mjödheim : hydromels et bières artisanales brassés à la main en petites cuvées à Beaumont, Belgique.",
  openGraph: {
    title: "Nos créations – Mjödheim",
    description:
      "5 créations artisanales : Brume d'Yggdrasil, Chaleur d'Asgard, Sang de Freya, Ferosol et Calarwen.",
    url: "https://www.mjodheim.be/nos-creations",
    images: [
      {
        url: "/images/brume-d-yggdrasil.png",
        alt: "Nos créations artisanales – Mjödheim",
      },
    ],
  },
};

export default function NosCreationsPage() {
  return <NosCreationsClient />;
}
