import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ACompleter, Valeur } from "@/components/ui";
import { secteursCoeur, secteursVoisins } from "@/content/secteurs";
import { site } from "@/lib/site";

const colonnes = [
  {
    titre: "L’agence",
    liens: [
      { href: "/notre-agence", label: "Notre histoire" },
      { href: "/equipe", label: "L’équipe" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    titre: "Votre projet",
    liens: [
      { href: "/vendre", label: "Vendre" },
      { href: "/acheter", label: "Acheter" },
      { href: "/vendre#estimation", label: "Faire estimer mon bien" },
      { href: "/biens", label: "Nos biens" },
    ],
  },
];

export function PiedDePage() {
  return (
    <footer className="sur-sombre bg-nuit text-sauge-2">
      <div className="page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Link href="/" className="inline-block rounded-lg" aria-label="Agence Green Side — accueil">
            <Logo clair taille="grand" />
          </Link>
          <p className="mt-6 max-w-xs font-display text-xl leading-snug text-ivoire italic">
            {site.signature}
          </p>
          <address className="mt-6 space-y-1.5 text-[0.95rem] not-italic">
            <p>
              {site.adresse ? (
                <>
                  {site.adresse.rue}, {site.adresse.codePostal} {site.adresse.ville}
                </>
              ) : (
                <ACompleter quoi="adresse et statut du bureau" />
              )}
            </p>
            <p>
              {site.telephone ? (
                <a className="hover:text-ivoire" href={`tel:${site.telephone.replace(/\s/g, "")}`}>
                  {site.telephone}
                </a>
              ) : (
                <ACompleter quoi="téléphone" />
              )}
            </p>
            <p>
              {site.email ? (
                <a className="hover:text-ivoire" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              ) : (
                <ACompleter quoi="e-mail" />
              )}
            </p>
          </address>
        </div>

        {colonnes.map((c) => (
          <nav key={c.titre} aria-label={c.titre}>
            <h2 className="sourcil mb-5">{c.titre}</h2>
            <ul>
              {c.liens.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-ivoire">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Nos secteurs">
          <h2 className="sourcil mb-5">Nos secteurs</h2>
          <ul>
            {secteursCoeur.map((s) => (
              <li key={s.slug}>
                <Link href={`/secteurs/${s.slug}`} className="inline-flex min-h-11 items-center hover:text-ivoire">
                  Immobilier {s.nature === "technopole" ? "autour de" : "à"} {s.nom}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/secteurs" className="inline-flex min-h-11 items-center hover:text-ivoire">
                {secteursVoisins.length} autres communes
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-ivoire/15">
        <div className="page flex flex-col gap-4 py-6 text-[0.85rem] md:flex-row md:items-center md:justify-between">
          <p>
            © <Valeur valeur={site.legal.raisonSociale} quoi="raison sociale" /> — {site.nom}.{" "}
            <Valeur valeur={site.legal.carteProfessionnelle} quoi="carte professionnelle (n° et CCI)" />
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            <li>
              <Link href="/honoraires" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-ivoire">
                Honoraires
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-ivoire">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-ivoire">
                Confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
