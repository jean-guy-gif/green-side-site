import type { StaticImageData } from "next/image";
import portrait1 from "@/assets/portraits/portrait-1.jpg";
import portrait2 from "@/assets/portraits/portrait-2.jpg";
import portrait3 from "@/assets/portraits/portrait-3.jpg";

/**
 * L'équipe — structure préparatoire (brief §7).
 *
 * ⚠️ ATTRIBUTION DES PORTRAITS À CONFIRMER : les trois photos ont été reçues
 * sans nom. Elles sont associées ici dans leur ordre d'envoi. Pour corriger,
 * il suffit d'échanger les valeurs de `photo` ci-dessous.
 *
 * Aucune biographie n'est inventée : `bioCourte`, `bioLongue` et
 * `citationValidee` restent à `null` tant que chaque fondatrice n'a pas validé
 * son texte. Les champs `verbe`, `regard` et `approche` sont des propositions
 * tirées de l'atelier, à valider avant publication.
 */
export type Membre = {
  slug: string;
  prenom: string;
  photo: StaticImageData;
  /** Position verticale du visage dans les cadrages serrés (object-position). */
  cadrage: string;
  role: string;
  /** Un verbe qui résume sa façon d'accompagner — proposition à valider. */
  verbe: string;
  /** Une phrase d'accroche — proposition à valider. */
  regard: string;
  /** Deux ou trois phrases sur son approche — proposition à valider. */
  approche: string[];
  bioCourte: string | null;
  bioLongue: string[] | null;
  citationValidee: string | null;
  specialitesConfirmees: string[];
  contactProfessionnel: { email?: string; telephone?: string } | null;
};

export const PORTRAITS_A_CONFIRMER = true;

export const equipe: Membre[] = [
  {
    slug: "sylvie",
    prenom: "Sylvie",
    photo: portrait1,
    cadrage: "50% 18%",
    role: "Cofondatrice",
    verbe: "Adapter",
    regard:
      "Chercher le lieu qui correspond vraiment à la vie de celles et ceux qui vont l’habiter.",
    approche: [
      "Un projet ne se résume pas à une surface et à un budget. Sylvie part du quotidien : qui va vivre là, comment, avec quelles contraintes très concrètes.",
      "Elle avance critère après critère, visite après visite, et dit sans détour quand un bien ne convient pas — même s’il plaît au premier regard.",
    ],
    bioCourte: null,
    bioLongue: null,
    citationValidee: null,
    specialitesConfirmees: [],
    contactProfessionnel: null,
  },
  {
    slug: "laurence",
    prenom: "Laurence",
    photo: portrait2,
    cadrage: "50% 16%",
    role: "Cofondatrice",
    verbe: "Coordonner",
    regard:
      "Faire avancer tout le monde au même rythme, en expliquant chaque étape.",
    approche: [
      "Quand un dossier réunit beaucoup d’interlocuteurs — plusieurs vendeurs, plusieurs notaires — rien n’avance sans quelqu’un qui tient le fil. C’est le rôle que Laurence prend naturellement.",
      "Elle explique les enjeux, relie les personnes et s’assure que chacun comprend où en est la vente, et pourquoi.",
    ],
    bioCourte: null,
    bioLongue: null,
    citationValidee: null,
    specialitesConfirmees: [],
    contactProfessionnel: null,
  },
  {
    slug: "caroline",
    prenom: "Caroline",
    photo: portrait3,
    cadrage: "50% 14%",
    role: "Cofondatrice",
    verbe: "Protéger",
    regard:
      "Sécuriser une vente difficile, et rester présente jusqu’à la suite.",
    approche: [
      "Certaines ventes arrivent à un moment fragile de la vie. Caroline commence alors par sécuriser : reprendre le dossier calmement, vérifier, protéger les intérêts de la personne.",
      "Elle reste présente après la signature de la vente, jusqu’au logement suivant et à l’organisation de la transition.",
    ],
    bioCourte: null,
    bioLongue: null,
    citationValidee: null,
    specialitesConfirmees: [],
    contactProfessionnel: null,
  },
];

export const getMembre = (slug: string) => equipe.find((m) => m.slug === slug);
