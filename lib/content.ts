import { createReader } from "@keystatic/core/reader";
import config from "../keystatic.config";
import path from "path";

const reader = createReader(path.join(process.cwd()), config);

export async function getEvents() {
  const slugs = await reader.collections.evenements.list();
  const events = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.evenements.read(slug);
      return entry ? { slug, ...entry } : null;
    })
  );
  return events
    .filter(Boolean)
    .sort((a, b) => (a!.date > b!.date ? 1 : -1)) as NonNullable<(typeof events)[0]>[];
}

export async function getArticles() {
  const slugs = await reader.collections.articles.list();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const entry = await reader.collections.articles.read(slug);
      return entry ? { slug, ...entry } : null;
    })
  );
  return articles.filter(Boolean) as NonNullable<(typeof articles)[0]>[];
}

export async function getArticle(slug: string) {
  return reader.collections.articles.read(slug);
}
