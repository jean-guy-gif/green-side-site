import type { Metadata } from "next";
import Link from "next/link";
import { EST_DEMO, URL_SITE, site } from "@/lib/site";

/** Métadonnées d'une page : titre et description uniques, canonique, Open Graph. */
export function meta({
  titre,
  description,
  chemin,
  indexable = true,
}: {
  titre: string;
  description: string;
  chemin: string;
  indexable?: boolean;
}): Metadata {
  return {
    // Un titre qui contient déjà la marque n'est pas suffixé une seconde fois.
    title: titre.includes("Green Side") ? { absolute: titre } : titre,
    description,
    alternates: { canonical: chemin },
    openGraph: {
      title: titre,
      description,
      url: chemin,
      siteName: site.nom,
      locale: "fr_FR",
      type: "website",
    },
    // En mode prototype, rien n'est indexable (voir aussi robots.ts).
    robots: EST_DEMO || !indexable ? { index: false, follow: false } : undefined,
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/**
 * Données structurées de l'agence.
 * `RealEstateAgent` n'est émis que si une adresse professionnelle authentifiée
 * est renseignée dans site.ts ; sinon un simple `Organization` (nom + URL).
 * Jamais de note ni d'avis fabriqués (brief §8).
 */
export function jsonLdAgence(): Record<string, unknown> {
  const base = {
    "@context": "https://schema.org",
    name: site.nom,
    url: URL_SITE,
    description: site.description,
    ...(site.telephone ? { telephone: site.telephone } : {}),
    ...(site.email ? { email: site.email } : {}),
    ...(site.reseaux.length ? { sameAs: site.reseaux.map((r) => r.url) } : {}),
  };
  if (site.adresse) {
    return {
      ...base,
      "@type": "RealEstateAgent",
      address: {
        "@type": "PostalAddress",
        streetAddress: site.adresse.rue,
        postalCode: site.adresse.codePostal,
        addressLocality: site.adresse.ville,
        addressCountry: "FR",
      },
      areaServed: ["Biot", "Valbonne", "Sophia Antipolis"],
    };
  }
  return { ...base, "@type": "Organization" };
}

export type Miette = { href: string; label: string };

/** Fil d'Ariane visible + données structurées BreadcrumbList. */
export function FilAriane({ miettes }: { miettes: Miette[] }) {
  const tout = [{ href: "/", label: "Accueil" }, ...miettes];
  return (
    <>
      <nav aria-label="Fil d’Ariane" className="text-[0.85rem] text-encre-2">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {tout.map((m, i) => (
            <li key={m.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true" className="text-ocre">/</span>}
              {i < tout.length - 1 ? (
                <Link href={m.href} className="inline-flex min-h-11 items-center underline decoration-sauge underline-offset-4 hover:decoration-foret">
                  {m.label}
                </Link>
              ) : (
                <span aria-current="page" className="py-1 font-medium text-encre">
                  {m.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: tout.map((m, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: m.label,
            item: `${URL_SITE}${m.href === "/" ? "" : m.href}`,
          })),
        }}
      />
    </>
  );
}
