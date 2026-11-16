/**
 * Configuration centrale du site.
 *
 * RÈGLE : aucune information ici n'est inventée. Tant qu'une donnée n'a pas été
 * fournie et validée par l'agence, elle vaut `null` et le site affiche un
 * marqueur « à compléter » (mode prototype) ou masque le bloc (mode production).
 */

/** "demo" tant que NEXT_PUBLIC_SITE_MODE n'est pas réglé sur "production". */
export const MODE: "demo" | "production" =
  process.env.NEXT_PUBLIC_SITE_MODE === "production" ? "production" : "demo";
export const EST_DEMO = MODE === "demo";

export const URL_SITE = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
).replace(/\/$/, "");

export const site = {
  nom: "Agence Green Side",
  nomCourt: "Green Side",
  baseline: "Conseil en immobilier",
  /** Signature de travail, non validée (brief §3). */
  signature: "Derrière chaque adresse, il y a une histoire.",
  description:
    "Sylvie, Laurence et Caroline vous accompagnent dans vos projets immobiliers à Biot, Valbonne et Sophia Antipolis : vendre, acheter, estimer, avec sincérité et méthode.",

  // ── Coordonnées : À COMPLÉTER par l'agence ────────────────────────────────
  telephone: null as string | null, // ex. "04 93 00 00 00"
  email: null as string | null,
  adresse: null as null | {
    rue: string;
    codePostal: string;
    ville: string;
    /** true uniquement si l'agence reçoit du public à cette adresse */
    accueilPublic: boolean;
  },
  horaires: null as string | null,
  reseaux: [] as { nom: string; url: string }[],

  // ── Mentions légales : À COMPLÉTER et à faire valider ─────────────────────
  legal: {
    raisonSociale: null as string | null,
    formeJuridique: null as string | null,
    capital: null as string | null,
    siren: null as string | null,
    rcs: null as string | null,
    tva: null as string | null,
    siege: null as string | null,
    responsablePublication: null as string | null,
    carteProfessionnelle: null as string | null, // n° + CCI de délivrance
    garantieFinanciere: null as string | null,
    maniementDeFonds: null as string | null, // "Sans maniement de fonds" ou détail
    assuranceRcp: null as string | null,
    mediateur: null as string | null,
    hebergeur: "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  },
} as const;

export type LienNav = { href: string; label: string; enfants?: LienNav[] };

/** Navigation principale : 5 entrées avant le bouton (brief §5). */
export const navigation: LienNav[] = [
  { href: "/notre-agence", label: "L’agence" },
  { href: "/equipe", label: "L’équipe" },
  { href: "/biens", label: "Nos biens" },
  {
    href: "/vendre",
    label: "Vendre · Acheter",
    enfants: [
      { href: "/vendre", label: "Vendre" },
      { href: "/acheter", label: "Acheter" },
    ],
  },
  { href: "/secteurs", label: "Nos secteurs" },
];

export const CTA_NAV = { href: "/contact", label: "Parlons de votre projet" };
