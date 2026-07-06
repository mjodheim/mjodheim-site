# Mjödheim site

Site vitrine de Mjödheim, brasserie artisanale nordique a Beaumont, Belgique.
Le site présente la brasserie, les hydromels, les bières, les événements, les chroniques, un formulaire de contact et une page BrewTrack avec capture de leads.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Keystatic pour le contenu éditorial local ou GitHub-backed
- Resend pour le formulaire de contact
- Vercel Speed Insights

Le projet est prive et ne doit pas contenir de secrets commites.

## Routes principales

- `/` - page d'accueil
- `/notre-saga` - histoire de la brasserie
- `/nos-creations`, `/nos-hydromels`, `/nos-bières` - produits
- `/événements` - calendrier basé sur le contenu local
- `/chroniques` et `/chroniques/[slug]` - articles Markdoc
- `/outils/accises` - estimateur indicatif des accises
- `/brewtrack` - présentation BrewTrack et capture de leads
- `/faq`, `/contact`, `/confidentialite`
- `/api/contact` - envoi d'email via Resend
- `/api/brewtrack-lead` - transmission serveur-vers-serveur vers BrewTrack

## Contenu editable

Keystatic est configure dans `keystatic.config.ts`.

- Articles: `content/articles/*.mdoc`
- Evenements: `content/events/*.yaml`
- Donnees statiques: `data/events.json`, `data/excise-rates.json`
- Assets publics: `public/`

Sans configuration GitHub Keystatic, le stockage reste local. Avec les variables GitHub ci-dessous, Keystatic peut ecrire dans le depot configure.

## Variables d'environnement

Créer un `.env.local` si necessaire. Ne pas le committer.

```bash
RESEND_API_KEY=...
CONTACT_EMAIL=contact@mjodheim.be

BREWTRACK_API_URL=https://brewtrack.mjodheim.be
GROWTH_INGEST_KEY=...

KEYSTATIC_GITHUB_CLIENT_ID=...
NEXT_PUBLIC_GITHUB_OWNER=mjodheim
NEXT_PUBLIC_GITHUB_REPO=mjodheim-site
```

Notes:

- `RESEND_API_KEY` est requis pour que `/api/contact` envoie les emails.
- `CONTACT_EMAIL` est optionnel; par défaut les messages partent vers `contact@mjodheim.be`.
- `GROWTH_INGEST_KEY` est requis pour activer la capture de leads BrewTrack.
- `BREWTRACK_API_URL` vaut `https://brewtrack.mjodheim.be` par défaut.
- Les variables Keystatic GitHub sont optionnelles.

## Développement local

```bash
npm ci
npm run dev
```

Ouvrir `http://localhost:3000`.

## Vérification

```bash
npm run lint
npm run build
```

Pour mettre a jour les taux d'accises depuis le script dédié:

```bash
npm run update:excise-rates
```

## Sécurité

- En-têtes de sécurité globaux dans `next.config.ts`: `nosniff`, `DENY`, referrer policy, permissions policy et `frame-ancestors 'none'`.
- Formulaire de contact: validation des champs, échappement HTML avant email, rate limit par IP.
- Capture de leads BrewTrack: rate limit par IP, validation email/longueurs, cle d'ingestion uniquement côté serveur.
- Metadata, Open Graph, robots et sitemap sont gérés dans `app/layout.tsx`, `app/robots.ts` et `app/sitemap.ts`.

## Déploiement

Le projet peut etre déployé comme application Next.js standard.

```bash
npm ci
npm run build
npm run start
```

Vérifier apres deploiement:

- `https://mjodheim.be`
- `https://mjodheim.be/sitemap.xml`
- `https://mjodheim.be/robots.txt`
- formulaire `/contact`
- formulaire lead sur `/brewtrack` si `GROWTH_INGEST_KEY` est configure
