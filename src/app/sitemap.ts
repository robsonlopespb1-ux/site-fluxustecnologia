import type { MetadataRoute } from "next";
import { cases } from "@/data/site";

const BASE_URL = "https://fluxustecnologia.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE_URL}/a-fluxus`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/solucoes`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/produtos`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/projetos`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contato`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE_URL}/politica-de-privacidade`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  /* Projetos gerados da mesma fonte de dados das páginas — impossível
     esquecer um slug novo (§13.3) */
  const projectRoutes: MetadataRoute.Sitemap = cases.map((item) => ({
    url: `${BASE_URL}/projetos/${item.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
