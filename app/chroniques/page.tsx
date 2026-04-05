import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import ChroniquesClient from "./ChroniquesClient";

export const metadata: Metadata = {
  title: "Chroniques",
  description: "Histoires, savoir-faire et secrets de brassage — les chroniques du hall Mjödheim.",
};

export default async function ChroniquesPage() {
  const articles = await getArticles();
  const data = articles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    date: a.dateDisplay,
    readTime: a.readTime ?? "",
    image: a.image ?? "chronique-hydromel.png",
    category: a.category ?? "",
  }));

  return <ChroniquesClient articles={data} />;
}
