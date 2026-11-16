import type { MetadataRoute } from "next";
import { EST_DEMO, URL_SITE } from "@/lib/site";

/** En mode prototype, tout le site est fermé aux moteurs de recherche. */
export default function robots(): MetadataRoute.Robots {
  if (EST_DEMO) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${URL_SITE}/sitemap.xml`,
  };
}
