/**
 * Journal / conseils — NON OUVERT en V1 (brief §6.9 : pas de bloc ni de page
 * sans contenu original). Modèle prêt pour la suite.
 *
 * Sujets envisagés au brief, à rédiger avec les fondatrices et à faire relire
 * pour tout point réglementaire :
 *  - vendre une maison à Biot ;
 *  - préparer la vente d'un bien en succession ;
 *  - les questions à poser avant d'acheter autour de Sophia Antipolis ;
 *  - comment choisir une stratégie de prix de mise en vente.
 */
export type Article = {
  slug: string;
  titre: string;
  resume: string;
  datePublication: string; // AAAA-MM-JJ
  auteure: "sylvie" | "laurence" | "caroline";
  secteurSlug?: string;
  corps: string[];
};

export const articles: Article[] = [];
