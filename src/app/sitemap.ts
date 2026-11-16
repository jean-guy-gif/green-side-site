import type { MetadataRoute } from "next";
import { getBiens } from "@/content/biens";
import { equipe } from "@/content/equipe";
import { secteursCoeur } from "@/content/secteurs";
import { URL_SITE } from "@/lib/site";

/**
 * Plan du site : uniquement les adresses indexables.
 * Les biens fictifs de démonstration et les filtres de /biens n'y figurent jamais.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const page = (chemin: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${URL_SITE}${chemin}`,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("", 1),
    page("/notre-agence", 0.8),
    page("/equipe", 0.9),
    ...equipe.map((m) => page(`/equipe/${m.slug}`, 0.7)),
    page("/vendre", 0.9),
    page("/acheter", 0.9),
    page("/biens", 0.9),
    ...getBiens()
      .filter((b) => !b.demo)
      .map((b) => ({ ...page(`/biens/${b.slug}`, 0.8), lastModified: b.datePublication })),
    page("/secteurs", 0.8),
    ...secteursCoeur.map((s) => page(`/secteurs/${s.slug}`, 0.9)),
    page("/contact", 0.7),
    page("/honoraires", 0.4),
    page("/mentions-legales", 0.2),
    page("/confidentialite", 0.2),
  ];
}
