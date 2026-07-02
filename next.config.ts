import type { NextConfig } from "next";

// En-têtes de sécurité appliqués à toutes les routes.
// NB : la CSP se limite ici à `frame-ancestors 'none'` (anti-clickjacking) — sûre,
// elle n'affecte ni les scripts ni les styles. Une CSP `script-src` complète
// nécessiterait des nonces (hydratation Next + Speed Insights + Keystatic) : à
// faire dans un second temps pour ne pas casser le rendu.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
