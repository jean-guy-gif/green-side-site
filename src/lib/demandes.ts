/**
 * Définition partagée (navigateur + serveur) des formulaires de contact.
 * Minimisation des données (brief §11) : seuls les champs utiles sont demandés.
 */
export type TypeDemande = "contact" | "estimation" | "recherche";

export const PROJETS = [
  { valeur: "vendre", label: "Vendre un bien" },
  { valeur: "estimer", label: "Faire estimer" },
  { valeur: "acheter", label: "Acheter" },
  { valeur: "succession", label: "Une succession" },
  { valeur: "logement-adapte", label: "Changer pour un logement adapté" },
  { valeur: "investir", label: "Investir" },
  { valeur: "autre", label: "Autre demande" },
] as const;

export const TYPES_BIEN = ["Maison ou villa", "Appartement", "Terrain", "Autre"] as const;
export const ECHEANCES = [
  "Dès que possible",
  "Dans les 3 à 6 mois",
  "Dans l’année",
  "Je me renseigne",
] as const;

export type Demande = {
  type: TypeDemande;
  nom: string;
  email: string;
  telephone: string;
  message: string;
  projet: string;
  ville: string;
  typeBien: string;
  surface: string;
  budget: string;
  echeance: string;
  /** Contexte transmis par l'URL : conseillère souhaitée, référence du bien. */
  avec: string;
  bien: string;
};

export type Erreurs = Partial<Record<keyof Demande, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TEL = /^[+0-9][0-9 .()-]{7,}$/;

const propre = (v: unknown, max: number) =>
  (typeof v === "string" ? v : "").trim().slice(0, max);

/** Normalise une saisie brute et renvoie la demande + les erreurs éventuelles. */
export function valider(brut: Record<string, unknown>): { demande: Demande; erreurs: Erreurs } {
  const type: TypeDemande =
    brut.type === "estimation" || brut.type === "recherche" ? brut.type : "contact";
  const demande: Demande = {
    type,
    nom: propre(brut.nom, 120),
    email: propre(brut.email, 160),
    telephone: propre(brut.telephone, 30),
    message: propre(brut.message, 3000),
    projet: propre(brut.projet, 40),
    ville: propre(brut.ville, 80),
    typeBien: propre(brut.typeBien, 40),
    surface: propre(brut.surface, 10),
    budget: propre(brut.budget, 20),
    echeance: propre(brut.echeance, 40),
    avec: propre(brut.avec, 20),
    bien: propre(brut.bien, 80),
  };
  const erreurs: Erreurs = {};

  if (demande.nom.length < 2) erreurs.nom = "Indiquez votre nom.";
  if (!demande.email && !demande.telephone) {
    erreurs.email = "Indiquez un e-mail ou un téléphone pour que nous puissions vous répondre.";
  } else {
    if (demande.email && !EMAIL.test(demande.email))
      erreurs.email = "Cette adresse e-mail semble incomplète (exemple : prenom@domaine.fr).";
    if (demande.telephone && !TEL.test(demande.telephone))
      erreurs.telephone = "Ce numéro semble incomplet (exemple : 06 12 34 56 78).";
  }
  if (type !== "contact" && demande.ville.length < 2)
    erreurs.ville =
      type === "estimation"
        ? "Indiquez la commune du bien."
        : "Indiquez la ou les communes recherchées.";
  if (type === "contact" && demande.message.length < 10)
    erreurs.message = "Dites-nous en quelques mots ce qui vous amène.";
  if (demande.surface && !/^\d{1,5}$/.test(demande.surface))
    erreurs.surface = "Indiquez la surface en m², en chiffres.";

  return { demande, erreurs };
}
