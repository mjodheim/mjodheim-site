import type { Metadata } from "next";
import NosBieresClient from "./NosBieresClient";

export const metadata: Metadata = {
  title: "Nos bières artisanales – Mjödheim",
  description:
    "Ferosol et Calarwen : deux bières artisanales brassées avec la même exigence que nos hydromels, à Beaumont en Belgique.",
  openGraph: {
    title: "Nos bières artisanales – Mjödheim",
    description:
      "Blonde au miel ou blonde à la sauge et citron vert, deux bières singulières brassées à Beaumont.",
    url: "https://www.mjodheim.be/nos-bieres",
    images: [
      {
        url: "/images/ferosol.png",
        alt: "Ferosol – Bière blonde au miel Mjödheim",
      },
    ],
  },
};

export default function NosBieresPage() {
  return <NosBieresClient />;
}
