import Link from "next/link";
import type { ReactNode } from "react";
import { EST_DEMO } from "@/lib/site";

/** Flèche fine utilisée dans les liens et boutons. */
export function Fleche({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`fleche shrink-0 ${className}`}
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 6h15M11.5 1.5 16 6l-4.5 4.5" />
    </svg>
  );
}

export function LienFleche({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`lien ${className}`}>
      <span>{children}</span>
      <Fleche />
    </Link>
  );
}

/**
 * Marqueur d'information manquante.
 * - mode prototype : étiquette visible « À compléter : … »
 * - mode production : rien n'est affiché (le bloc parent doit rester cohérent).
 */
export function ACompleter({ quoi }: { quoi: string }) {
  if (!EST_DEMO) return null;
  return <span className="a-completer">À compléter : {quoi}</span>;
}

/** Affiche la valeur si elle existe, sinon le marqueur. */
export function Valeur({
  valeur,
  quoi,
}: {
  valeur: string | null | undefined;
  quoi: string;
}) {
  return valeur ? <>{valeur}</> : <ACompleter quoi={quoi} />;
}

/** Note de validation, visible en mode prototype uniquement. */
export function NoteValidation({ children }: { children: ReactNode }) {
  if (!EST_DEMO) return null;
  return (
    <p className="a-completer mt-6 block w-fit max-w-full text-[0.82rem]">
      {children}
    </p>
  );
}

/** En-tête de section : sourcil + titre + chapô optionnel. */
export function TeteSection({
  sourcil,
  titre,
  children,
  niveau = "h2",
  className = "",
}: {
  sourcil?: string;
  titre: ReactNode;
  children?: ReactNode;
  niveau?: "h1" | "h2";
  className?: string;
}) {
  const Titre = niveau;
  return (
    <div className={`max-w-3xl ${className}`}>
      {sourcil && <p className="sourcil mb-4">{sourcil}</p>}
      <Titre className={niveau === "h1" ? "titre-xl" : "titre-l"}>{titre}</Titre>
      {children && <div className="chapo mt-6 max-w-2xl">{children}</div>}
    </div>
  );
}

/**
 * Emplacement photo en attente d'un vrai visuel (brief §4 : pas de banque
 * d'images). Forme en arche, légende visible en mode prototype.
 */
export function EmplacementPhoto({
  legende,
  ton = "sauge",
  className = "",
}: {
  legende: string;
  ton?: "sauge" | "rose" | "ivoire";
  className?: string;
}) {
  const fond =
    ton === "rose" ? "bg-rose-2" : ton === "ivoire" ? "bg-ivoire-2" : "bg-sauge-2";
  return (
    <div
      className={`arche relative flex items-end justify-center ${fond} ${className}`}
      role="img"
      aria-label={`Emplacement réservé : ${legende}`}
    >
      <svg
        className="absolute inset-0 h-full w-full text-foret/15"
        viewBox="0 0 200 260"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        <path d="M-10 215c40-22 70-22 105-6s70 14 115-10" />
        <path d="M-10 235c45-18 80-16 110-4s65 10 110-8" />
        <path d="M100 205V120m0 30c-12-4-20-14-22-26m22 12c10-5 18-14 20-25m-20 62c-9-3-15-9-18-17" />
      </svg>
      {EST_DEMO && (
        <span className="a-completer relative m-4 bg-craie/80 text-center">
          Photo à fournir : {legende}
        </span>
      )}
    </div>
  );
}
