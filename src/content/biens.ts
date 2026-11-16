import { EST_DEMO } from "@/lib/site";

/**
 * Biens — modèle de données et source.
 *
 * ⚠️ AUCUNE ANNONCE RÉELLE n'est encore branchée. `biensDemo` contient des
 * exemples FICTIFS, affichés uniquement en mode prototype et marqués comme
 * tels à l'écran. En production, seule la liste `biensReels` est publiée
 * (vide tant que le flux du logiciel métier n'est pas raccordé).
 *
 * Pour raccorder un flux (passerelle du logiciel de transaction, CMS, API) :
 * remplacer le contenu de `getBiens()` par l'appel correspondant et renvoyer
 * des objets `Bien`. Aucun composant n'a besoin d'être modifié.
 */
export type TypeBien = "maison" | "appartement" | "terrain";
export type ClasseEnergie = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type Bien = {
  id: string;
  slug: string;
  /** true = exemple fictif, jamais publié en production. */
  demo: boolean;
  statut: "disponible" | "sous-offre" | "vendu";
  titre: string;
  type: TypeBien;
  /** Localisation publique uniquement : commune et, au plus, quartier. Jamais l'adresse. */
  commune: string;
  secteurSlug?: string;
  quartier?: string;
  description: string[];
  prix: number;
  /** Honoraires : à la charge de qui, et taux/montant si à la charge de l'acquéreur. */
  honoraires: {
    charge: "vendeur" | "acquereur";
    /** Prix hors honoraires et taux TTC, obligatoires si charge acquéreur. */
    prixHorsHonoraires?: number;
    tauxTtc?: number;
  };
  surface: number;
  surfaceTerrain?: number;
  pieces: number;
  chambres: number;
  exterieurs: ("jardin" | "terrasse" | "balcon" | "piscine")[];
  stationnement: boolean;
  photos: { src: string; alt: string }[];
  energie?: {
    dpe: ClasseEnergie;
    ges: ClasseEnergie;
    /** Estimation des coûts annuels d'énergie (€) et année de référence des prix. */
    coutMin?: number;
    coutMax?: number;
    anneeReference?: number;
  };
  copropriete?: {
    nombreLots: number;
    chargesAnnuelles: number;
    procedureEnCours: boolean;
  };
  conseillereSlug: string;
  datePublication: string; // AAAA-MM-JJ
};

/** Annonces réelles, sous mandat, validées. Vide tant qu'aucun flux n'est raccordé. */
const biensReels: Bien[] = [];

/** Exemples FICTIFS pour tester la grille, les filtres et la fiche. Non publiables. */
const biensDemo: Bien[] = [
  {
    id: "DEMO-01",
    slug: "exemple-maison-familiale-biot",
    demo: true,
    statut: "disponible",
    titre: "Maison familiale avec jardin",
    type: "maison",
    commune: "Biot",
    secteurSlug: "biot",
    description: [
      "Texte d’exemple. Une vraie annonce décrira ici le bien sobrement : son organisation, sa lumière, son environnement, ce qui le distingue.",
      "Les annonces réelles seront alimentées depuis le logiciel de l’agence, uniquement pour des biens sous mandat.",
    ],
    prix: 780000,
    honoraires: { charge: "vendeur" },
    surface: 135,
    surfaceTerrain: 900,
    pieces: 5,
    chambres: 4,
    exterieurs: ["jardin", "terrasse"],
    stationnement: true,
    photos: [],
    energie: { dpe: "C", ges: "C", coutMin: 1400, coutMax: 1950, anneeReference: 2023 },
    conseillereSlug: "sylvie",
    datePublication: "2026-11-10",
  },
  {
    id: "DEMO-02",
    slug: "exemple-appartement-valbonne",
    demo: true,
    statut: "disponible",
    titre: "Appartement trois pièces avec terrasse",
    type: "appartement",
    commune: "Valbonne",
    secteurSlug: "valbonne",
    description: [
      "Texte d’exemple. Pour un appartement en copropriété, la fiche affiche aussi le nombre de lots, les charges annuelles et l’existence éventuelle d’une procédure.",
    ],
    prix: 395000,
    honoraires: { charge: "acquereur", prixHorsHonoraires: 377000, tauxTtc: 4.77 },
    surface: 68,
    pieces: 3,
    chambres: 2,
    exterieurs: ["terrasse"],
    stationnement: true,
    photos: [],
    energie: { dpe: "D", ges: "B", coutMin: 950, coutMax: 1320, anneeReference: 2023 },
    copropriete: { nombreLots: 48, chargesAnnuelles: 2160, procedureEnCours: false },
    conseillereSlug: "laurence",
    datePublication: "2026-11-06",
  },
  {
    id: "DEMO-03",
    slug: "exemple-villa-sophia-antipolis",
    demo: true,
    statut: "sous-offre",
    titre: "Villa de plain-pied proche de la technopole",
    type: "maison",
    commune: "Valbonne",
    secteurSlug: "sophia-antipolis",
    quartier: "Sophia Antipolis",
    description: [
      "Texte d’exemple. Le statut « sous offre » montre comment un bien reste visible pendant la vente.",
    ],
    prix: 920000,
    honoraires: { charge: "vendeur" },
    surface: 160,
    surfaceTerrain: 1200,
    pieces: 6,
    chambres: 4,
    exterieurs: ["jardin", "terrasse", "piscine"],
    stationnement: true,
    photos: [],
    energie: { dpe: "B", ges: "A", coutMin: 1100, coutMax: 1500, anneeReference: 2023 },
    conseillereSlug: "caroline",
    datePublication: "2026-10-28",
  },
  {
    id: "DEMO-04",
    slug: "exemple-studio-antibes",
    demo: true,
    statut: "disponible",
    titre: "Studio pour un investissement locatif",
    type: "appartement",
    commune: "Antibes",
    description: [
      "Texte d’exemple. Une étiquette énergie F ou G déclenche l’affichage de la mention réglementaire sur la fiche.",
    ],
    prix: 168000,
    honoraires: { charge: "vendeur" },
    surface: 27,
    pieces: 1,
    chambres: 0,
    exterieurs: ["balcon"],
    stationnement: false,
    photos: [],
    energie: { dpe: "F", ges: "C", coutMin: 780, coutMax: 1090, anneeReference: 2023 },
    copropriete: { nombreLots: 120, chargesAnnuelles: 840, procedureEnCours: false },
    conseillereSlug: "laurence",
    datePublication: "2026-10-20",
  },
  {
    id: "DEMO-05",
    slug: "exemple-terrain-roquefort-les-pins",
    demo: true,
    statut: "disponible",
    titre: "Terrain constructible au calme",
    type: "terrain",
    commune: "Roquefort-les-Pins",
    description: [
      "Texte d’exemple. Pour un terrain, la fiche n’affiche ni pièces ni diagnostic de performance énergétique.",
    ],
    prix: 340000,
    honoraires: { charge: "vendeur" },
    surface: 1500,
    pieces: 0,
    chambres: 0,
    exterieurs: [],
    stationnement: false,
    photos: [],
    conseillereSlug: "sylvie",
    datePublication: "2026-10-15",
  },
  {
    id: "DEMO-06",
    slug: "exemple-maison-de-village-biot",
    demo: true,
    statut: "disponible",
    titre: "Maison de village à rénover",
    type: "maison",
    commune: "Biot",
    secteurSlug: "biot",
    quartier: "Village",
    description: [
      "Texte d’exemple. La localisation publique s’arrête à la commune et, au plus, au quartier : jamais l’adresse.",
    ],
    prix: 465000,
    honoraires: { charge: "vendeur" },
    surface: 92,
    pieces: 4,
    chambres: 3,
    exterieurs: ["terrasse"],
    stationnement: false,
    photos: [],
    energie: { dpe: "E", ges: "D", coutMin: 1800, coutMax: 2450, anneeReference: 2023 },
    conseillereSlug: "caroline",
    datePublication: "2026-10-02",
  },
];

/** Source unique des biens pour tout le site. */
export function getBiens(): Bien[] {
  return EST_DEMO ? [...biensReels, ...biensDemo] : biensReels;
}
export const getBien = (slug: string) => getBiens().find((b) => b.slug === slug);

export const LIBELLE_TYPE: Record<TypeBien, string> = {
  maison: "Maison",
  appartement: "Appartement",
  terrain: "Terrain",
};
export const LIBELLE_STATUT: Record<Bien["statut"], string> = {
  disponible: "Disponible",
  "sous-offre": "Sous offre",
  vendu: "Vendu",
};

const formatEuro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
export const euros = (n: number) => formatEuro.format(n);
export const nombre = (n: number) => new Intl.NumberFormat("fr-FR").format(n);
