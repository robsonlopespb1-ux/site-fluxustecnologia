import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Obrigatório para deploy em container no Railway (docs/ARQUITETURA.md §20.1)
  output: "standalone",
  images: {
    // Sem hosts remotos na v1 — imagens servidas de public/. Adicionar aqui se surgir origem externa.
    remotePatterns: [],
  },
};

export default nextConfig;
