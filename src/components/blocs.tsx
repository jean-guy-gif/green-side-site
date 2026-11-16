import Link from "next/link";
import type { ReactNode } from "react";
import { FilAriane, type Miette } from "@/lib/seo";

/** Tête des pages intérieures : fil d'Ariane, sourcil, H1 unique, chapô. */
export function TetePage({
  miettes,
  sourcil,
  titre,
  children,
  apres,
}: {
  miettes: Miette[];
  sourcil?: string;
  titre: ReactNode;
  children?: ReactNode;
  apres?: ReactNode;
}) {
  return (
    <header className="page pt-8 pb-12 sm:pt-10 sm:pb-16">
      <FilAriane miettes={miettes} />
      <div className="mt-10 max-w-4xl sm:mt-14">
        {sourcil && <p className="sourcil entree mb-5">{sourcil}</p>}
        <h1 className="titre-xl entree entree-2">{titre}</h1>
        {children && <div className="chapo entree entree-3 mt-7 max-w-2xl space-y-4">{children}</div>}
        {apres && <div className="entree entree-4 mt-9">{apres}</div>}
      </div>
    </header>
  );
}

/** Bandeau d'appel en bas de page : un seul geste, parler de son projet. */
export function AppelProjet({
  titre = (
    <>
      Parlons de votre <em className="italique">projet.</em>
    </>
  ),
  texte = "Un premier échange ne vous engage à rien. Il nous permet de comprendre votre situation, et à vous de voir si notre façon de travailler vous convient.",
  href = "/contact",
  bouton = "Parlons de votre projet",
  secondaire,
}: {
  titre?: ReactNode;
  texte?: string;
  href?: string;
  bouton?: string;
  secondaire?: { href: string; label: string };
}) {
  return (
    <section className="sur-sombre bg-foret text-ivoire">
      <div className="page flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
        <div className="max-w-2xl">
          <h2 className="titre-l">{titre}</h2>
          <p className="chapo mt-5">{texte}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={href} className="btn btn-clair">
            {bouton}
          </Link>
          {secondaire && (
            <Link href={secondaire.href} className="btn btn-ligne-clair">
              {secondaire.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/** Liste d'étapes numérotées (méthode de vente, d'achat). */
export function Etapes({ etapes }: { etapes: { titre: string; texte: string }[] }) {
  return (
    <ol className="border-t border-encre/15">
      {etapes.map((e, i) => (
        <li key={e.titre} className="grid gap-x-8 gap-y-2 border-b border-encre/15 py-7 sm:grid-cols-[4rem_1fr_1.4fr] sm:items-baseline">
          <span className="font-display text-[1.6rem] leading-none text-ocre-texte italic" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="titre-s">{e.titre}</h3>
          <p className="text-encre-2">{e.texte}</p>
        </li>
      ))}
    </ol>
  );
}
