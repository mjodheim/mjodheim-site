import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mjodheim.be";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/notre-saga`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${base}/nos-hydromels`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/nos-bieres`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/evenements`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/chroniques`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/chroniques/qu-est-ce-que-l-hydromel`, lastModified: new Date("2025-08-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/chroniques/comment-deguster-l-hydromel`, lastModified: new Date("2025-09-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/chroniques/brassage-artisanal-mjodheim`, lastModified: new Date("2025-10-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/chroniques/hydromel-et-gastronomie`, lastModified: new Date("2025-11-01"), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
