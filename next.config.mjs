const isDev = process.env.NODE_ENV === "development";

// Politique de sécurité du contenu (CSP). Le site est statique, sans cookie ni
// donnée envoyée au serveur : 'unsafe-inline' reste nécessaire pour les scripts
// en ligne de Next.js (pas de nonce possible sur une page statique, cf. la doc
// node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
// Tout le reste est verrouillé : aucune ressource externe, pas d'iframe, pas de plugin.
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  media-src 'self';
  connect-src 'self' https://api.web3forms.com${isDev ? " ws:" : ""};
  object-src 'none';
  base-uri 'self';
  form-action 'self' mailto:;
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, " ")
  .trim();

const securityHeaders = [
  // Force HTTPS pendant 2 ans (y compris sous-domaines)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Empêche d'afficher le site dans une iframe (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  // Empêche le navigateur de deviner le type des fichiers
  { key: "X-Content-Type-Options", value: "nosniff" },
  // N'envoie que le domaine (pas l'URL complète) aux sites externes
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Coupe les API sensibles dont le site n'a pas besoin
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  // ne pas annoncer la techno du serveur
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      // CSP sur les pages, mais pas sur les PDF : elle bloquerait le lecteur PDF du navigateur
      { source: "/((?!.*\\.pdf$).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
    ];
  },
};

export default nextConfig;
