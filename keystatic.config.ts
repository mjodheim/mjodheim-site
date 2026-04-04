import { config, collection, fields } from "@keystatic/core";

const hasGithubConfig = !!(
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  process.env.NEXT_PUBLIC_GITHUB_OWNER &&
  process.env.NEXT_PUBLIC_GITHUB_REPO
);

export default config({
  storage: hasGithubConfig
    ? {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_GITHUB_OWNER!,
          name: process.env.NEXT_PUBLIC_GITHUB_REPO!,
        },
      }
    : { kind: "local" },

  ui: {
    brand: { name: "Mjödheim" },
  },

  collections: {
    evenements: collection({
      label: "Événements",
      slugField: "title",
      path: "content/events/*",
      format: { data: "yaml" },
      schema: {
        title: fields.slug({
          name: { label: "Titre de l'événement" },
        }),
        dateDisplay: fields.text({
          label: "Date affichée",
          description: "Ex : 10 mai 2025",
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: "Date (pour le tri)",
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: "Lieu",
          description: "Ex : Chimay, Belgique",
          validation: { isRequired: true },
        }),
        type: fields.select({
          label: "Type",
          options: [
            { label: "Marché médiéval", value: "marché" },
            { label: "Événement / fête", value: "événement" },
            { label: "Dégustation privée", value: "dégustation" },
          ],
          defaultValue: "marché",
        }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { isRequired: true },
        }),
      },
    }),

    articles: collection({
      label: "Chroniques du hall",
      slugField: "title",
      path: "content/articles/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "Titre de l'article" },
        }),
        excerpt: fields.text({
          label: "Résumé",
          multiline: true,
          validation: { isRequired: true },
        }),
        dateDisplay: fields.text({
          label: "Date affichée",
          description: "Ex : Août 2025",
          validation: { isRequired: true },
        }),
        readTime: fields.text({
          label: "Temps de lecture",
          description: "Ex : 5 min",
        }),
        category: fields.text({
          label: "Catégorie",
          description: "Ex : Histoire & culture",
        }),
        content: fields.markdoc({
          label: "Contenu de l'article",
        }),
      },
    }),
  },
});
