import type { NextConfig } from "next";

/*
 * Next.js (App Router) usa scripts/estilos inline internamente —
 * 'unsafe-inline'/'unsafe-eval' são necessários sem arquitetura de nonce.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://api.whatsapp.com https://wa.me",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
];

/* Alvos comuns de scanners automatizados: redirecionar para a home real
 * (em vez de 404) polui o resultado da enumeração. */
const SCANNER_PATHS = [
  "/.env",
  "/.env.local",
  "/package.json",
  "/admin",
  "/wp-admin",
  "/wp-login.php",
  "/xmlrpc.php",
];

const nextConfig: NextConfig = {
  // Obrigatório para deploy em container no Railway (docs/ARQUITETURA.md §20.1)
  output: "standalone",
  images: {
    // Sem hosts remotos na v1 — imagens servidas de public/. Adicionar aqui se surgir origem externa.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return SCANNER_PATHS.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
};

export default nextConfig;
