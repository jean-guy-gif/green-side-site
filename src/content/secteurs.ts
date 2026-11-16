/**
 * Secteurs d'intervention.
 *
 * Coordonnées : centres approximatifs des communes, utilisés uniquement pour
 * la carte schématique (pas d'adresse d'agence — brief §1).
 *
 * Contenu : chaque fait cité est rattaché à une source listée en bas de page.
 * Aucun prix au m² ni statistique de marché (brief §7). Les paragraphes
 * « notre regard » restent à écrire avec les fondatrices.
 */
export type Source = { label: string; url: string };

export type Secteur = {
  slug: string;
  nom: string;
  /** "coeur" = territoire prioritaire avec page dédiée ; "voisin" = zone d'intervention (page en phase 2). */
  rang: "coeur" | "voisin";
  /** Sophia Antipolis est un bassin, pas une commune. */
  nature: "commune" | "technopole";
  codePostal?: string;
  lat: number;
  lon: number;
  accroche?: string;
  seo?: { titre: string; description: string };
  intro?: string[];
  reperes?: { titre: string; texte: string }[];
  projets?: string[];
  sources?: Source[];
};

export const secteurs: Secteur[] = [
  {
    slug: "biot",
    nom: "Biot",
    rang: "coeur",
    nature: "commune",
    codePostal: "06410",
    lat: 43.628,
    lon: 7.096,
    accroche: "Le village d’où tout est parti.",
    seo: {
      titre: "Immobilier à Biot : acheter, vendre, estimer",
      description:
        "Vendre, acheter ou faire estimer un bien à Biot avec Sylvie, Laurence et Caroline, originaires de la commune. Un accompagnement sincère, à trois.",
    },
    intro: [
      "Biot est notre point de départ : Sylvie, Laurence et Caroline sont originaires d’un quartier de la commune, celui auquel le nom Green Side fait référence.",
      "C’est un village perché des Alpes-Maritimes, à quelques kilomètres de la mer, entre Nice et Cannes. Autour du centre ancien, la commune s’étend vers des quartiers résidentiels et vers une partie de la technopole de Sophia Antipolis.",
    ],
    reperes: [
      {
        titre: "Un village ancien",
        texte:
          "Le cœur historique s’organise autour de la place des Arcades et de l’église. Ruelles, calades et passages voûtés en font un centre où l’on se déplace à pied.",
      },
      {
        titre: "Le verre et les métiers d’art",
        texte:
          "La Verrerie de Biot, fondée en 1956 par Éloi Monod, a fait connaître le verre bullé. La commune reste identifiée aux métiers d’art.",
      },
      {
        titre: "Entre mer et technopole",
        texte:
          "Biot fait partie des cinq communes sur lesquelles s’étend Sophia Antipolis, et de la communauté d’agglomération du même nom.",
      },
    ],
    projets: [
      "Vendre une maison familiale ou un bien reçu en succession",
      "Acheter pour s’installer près de Sophia Antipolis",
      "Changer de logement en restant dans la commune",
      "Faire estimer un bien avant de décider",
    ],
    sources: [
      {
        label: "Office de tourisme de Biot — histoire du village",
        url: "https://www.biot-tourisme.com/?p=6950",
      },
      {
        label: "Paris ZigZag — Biot et ses artisans du verre",
        url: "https://www.pariszigzag.fr/france/village-biot-france/",
      },
      {
        label: "Côte d’Azur France — Biot",
        url: "https://cotedazurfrance.fr/decouvrir/villages/biot/",
      },
      {
        label: "INA — La technopole Sophia Antipolis fête ses 50 ans",
        url: "https://fresques.ina.fr/sudorama/fiche-media/00000000534/la-technopole-sophia-antipolis-fete-ses-50-ans.html",
      },
    ],
  },
  {
    slug: "valbonne",
    nom: "Valbonne",
    rang: "coeur",
    nature: "commune",
    codePostal: "06560",
    lat: 43.641,
    lon: 7.009,
    accroche: "Un village en damier, aux portes de la technopole.",
    seo: {
      titre: "Immobilier à Valbonne : vendre, acheter, estimer",
      description:
        "Estimation, vente et achat à Valbonne : l’Agence Green Side vous accompagne avec une stratégie personnalisée et un suivi transparent.",
    },
    intro: [
      "Valbonne a une particularité rare dans la région : son village a été créé en 1519 sur un plan en damier, avec des rues qui se coupent à angle droit autour d’une place centrale.",
      "La commune accueille une grande partie de la technopole de Sophia Antipolis. On y vient autant pour la vie de village que pour la proximité des entreprises et des établissements d’enseignement.",
    ],
    reperes: [
      {
        titre: "La place des Arcades",
        texte:
          "Au centre du village, la place et ses maisons à arcades sont inscrites au titre des monuments historiques. Le marché s’y tient le vendredi matin.",
      },
      {
        titre: "Un plan pensé dès l’origine",
        texte:
          "Pas de ruelles en escalier ici : des rues droites, larges pour un village ancien, et des maisons de périphérie qui formaient rempart.",
      },
      {
        titre: "Village et technopole",
        texte:
          "Le vieux village et les quartiers de Sophia Antipolis appartiennent à la même commune, avec des modes de vie et des logements très différents.",
      },
    ],
    projets: [
      "Vendre une maison ou un appartement au village ou dans ses environs",
      "Trouver un logement familial proche des écoles et de Sophia Antipolis",
      "Faire estimer un bien et définir une stratégie de prix",
      "Préparer un investissement locatif",
    ],
    sources: [
      {
        label: "Région Sud — Village de Valbonne",
        url: "https://provence-alpes-cotedazur.com/que-faire/culture-et-patrimoine/lieux/village-de-valbonne-valbonne-fr-5398648/",
      },
      {
        label: "Ministère de la Culture, base Mérimée — Place des Arcades",
        url: "https://pop.culture.gouv.fr/notice/merimee/PA00080966",
      },
    ],
  },
  {
    slug: "sophia-antipolis",
    nom: "Sophia Antipolis",
    rang: "coeur",
    nature: "technopole",
    lat: 43.616,
    lon: 7.055,
    accroche: "Un bassin de vie autant qu’un lieu de travail.",
    seo: {
      titre: "Immobilier autour de Sophia Antipolis : acheter, vendre",
      description:
        "Acheter ou vendre autour de Sophia Antipolis (Biot, Valbonne, Antibes, Mougins) : un accompagnement local, sincère et à trois regards.",
    },
    intro: [
      "Sophia Antipolis n’est pas une commune : c’est une technopole, lancée en 1969 à l’initiative de Pierre Laffitte, qui s’étend sur cinq communes — Antibes, Biot, Mougins, Valbonne et Vallauris.",
      "Chercher « à Sophia », c’est donc choisir entre plusieurs communes et plusieurs cadres de vie. Notre travail commence souvent par là : comprendre votre quotidien pour savoir où chercher.",
    ],
    reperes: [
      {
        titre: "Un parc plus qu’une ville",
        texte:
          "La technopole occupe environ 2 400 hectares, dont une large part d’espaces verts, bordés par les parcs départementaux de la Valmasque et de la Brague.",
      },
      {
        titre: "Cinq communes, des ambiances différentes",
        texte:
          "Village ancien, quartier résidentiel, proximité de la mer : selon la commune, le logement et le rythme de vie ne sont pas les mêmes.",
      },
      {
        titre: "Travailler ici, vivre autour",
        texte:
          "Beaucoup de projets que nous accompagnons partent d’un emploi sur la technopole et d’une question simple : où s’installer pour bien vivre autour ?",
      },
    ],
    projets: [
      "S’installer à proximité de son lieu de travail",
      "Acheter un premier logement",
      "Vendre pour changer de commune ou de surface",
      "Investir dans un bien destiné à la location",
    ],
    sources: [
      {
        label: "Sophia Antipolis — histoire de la technopole",
        url: "https://www.sophia-antipolis.fr/en/history/",
      },
      {
        label: "INA — La technopole Sophia Antipolis fête ses 50 ans",
        url: "https://fresques.ina.fr/sudorama/fiche-media/00000000534/la-technopole-sophia-antipolis-fete-ses-50-ans.html",
      },
      {
        label: "Insee — Communauté d’agglomération Sophia Antipolis",
        url: "https://www.insee.fr/fr/statistiques/1521257",
      },
    ],
  },
  // ── Zones d'intervention : pages en phase 2, uniquement avec un contenu local distinct ──
  { slug: "antibes", nom: "Antibes", rang: "voisin", nature: "commune", lat: 43.581, lon: 7.125 },
  { slug: "villeneuve-loubet", nom: "Villeneuve-Loubet", rang: "voisin", nature: "commune", lat: 43.659, lon: 7.122 },
  { slug: "cagnes-sur-mer", nom: "Cagnes-sur-Mer", rang: "voisin", nature: "commune", lat: 43.664, lon: 7.149 },
  { slug: "mougins", nom: "Mougins", rang: "voisin", nature: "commune", lat: 43.6, lon: 6.995 },
  { slug: "roquefort-les-pins", nom: "Roquefort-les-Pins", rang: "voisin", nature: "commune", lat: 43.665, lon: 7.05 },
  { slug: "opio", nom: "Opio", rang: "voisin", nature: "commune", lat: 43.668, lon: 6.982 },
];

export const secteursCoeur = secteurs.filter((s) => s.rang === "coeur");
export const secteursVoisins = secteurs.filter((s) => s.rang === "voisin");
export const getSecteur = (slug: string) =>
  secteursCoeur.find((s) => s.slug === slug);
