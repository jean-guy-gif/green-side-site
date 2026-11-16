/**
 * Engagements, récits et méthode — textes proposés à partir de l'atelier,
 * À VALIDER par les fondatrices avant publication.
 * Aucun chiffre, aucun fait client identifiable.
 */

export const engagements = [
  {
    titre: "Une stratégie de vente personnalisée",
    texte:
      "Chaque bien et chaque situation appellent leur propre plan. Nous le construisons avec vous, nous vous l’expliquons et nous l’ajustons si le marché répond autrement.",
    concretement:
      "si le prix que vous souhaitez dépasse notre estimation, nous pouvons convenir d’une période de test encadrée, avec des points de suivi et une réévaluation prévus par écrit. Nous ne promettons jamais de vendre à n’importe quel prix.",
    aPreciser: null as string | null,
  },
  {
    titre: "Un suivi régulier et transparent",
    texte:
      "Visites, retours des acquéreurs, réactions du marché : vous savez où en est votre vente. La vérité, même quand elle dérange, vous est plus utile qu’un silence poli.",
    concretement:
      "vous recevez des points de suivi réguliers, que le bien ait été visité ou non.",
    aPreciser: "rythme et forme des points de suivi" as string | null,
  },
  {
    titre: "Un véritable travail d’équipe à trois",
    texte:
      "Vous avez une interlocutrice, et derrière elle une équipe. Sylvie, Laurence et Caroline se connaissent depuis longtemps : elles croisent leurs regards sur chaque projet.",
    concretement:
      "votre dossier ne dépend pas de la disponibilité d’une seule personne, et une question difficile est toujours examinée à plusieurs.",
    aPreciser: null as string | null,
  },
];

export const recits = [
  {
    verbe: "Coordonner",
    situation: "Une succession, de nombreux interlocuteurs",
    texte:
      "Plusieurs héritiers, plusieurs notaires, des attentes qui ne se ressemblent pas : avant de vendre, il faut que chacun comprenne les enjeux et que le dossier avance au même rythme pour tous. Notre rôle est alors d’expliquer, de relier et de tenir le fil.",
  },
  {
    verbe: "Adapter",
    situation: "Un logement qui doit répondre à des besoins précis",
    texte:
      "Certains projets ne se résument pas à une surface et à un budget. Quand le quotidien impose des critères très concrets, nous cherchons critère après critère, visite après visite, jusqu’au lieu qui convient vraiment.",
  },
  {
    verbe: "Protéger",
    situation: "Une vente à un moment fragile de la vie",
    texte:
      "Vendre le logement d’une vie, parfois seul, parfois dans l’urgence : il arrive que notre premier travail soit de sécuriser et d’organiser la suite — jusqu’au nouveau logement et à la transition.",
  },
];

export const etapesVente = [
  {
    titre: "Comprendre",
    texte: "Votre situation, votre calendrier, ce qui compte pour vous dans cette vente — avant de parler de prix.",
  },
  {
    titre: "Analyser",
    texte: "Le bien, ses atouts, ses points faibles et sa place sur le marché local au moment où vous vendez.",
  },
  {
    titre: "Définir une stratégie",
    texte: "Un prix de mise en vente argumenté et un plan écrit : présentation, diffusion, calendrier, points de suivi.",
  },
  {
    titre: "Présenter le bien",
    texte: "Une annonce sobre et exacte, des visuels soignés, toutes les informations obligatoires.",
  },
  {
    titre: "Qualifier",
    texte: "Nous échangeons avec chaque acquéreur potentiel sur son projet et son financement avant d’organiser une visite.",
  },
  {
    titre: "Accompagner visites et négociation",
    texte: "Nous menons les visites, vous rapportons les retours tels qu’ils sont et vous conseillons face à chaque offre.",
  },
  {
    titre: "Suivre jusqu’à la signature",
    texte: "Du compromis à l’acte, nous suivons le dossier avec le notaire et restons votre interlocutrice.",
  },
];

export const etapesAchat = [
  {
    titre: "Écouter votre projet de vie",
    texte: "Qui va vivre là, comment, pour combien de temps : ce premier échange oriente toute la recherche.",
  },
  {
    titre: "Cadrer les critères",
    texte: "Distinguer l’indispensable du souhaitable, et vérifier que le budget et le secteur sont cohérents.",
  },
  {
    titre: "Cibler les visites",
    texte: "Peu de visites, mais utiles : nous vous proposons les biens qui correspondent réellement à vos priorités.",
  },
  {
    titre: "Vous conseiller sincèrement",
    texte: "Nous vous disons ce que nous pensons d’un bien, y compris quand cela revient à vous déconseiller de l’acheter.",
  },
  {
    titre: "Vous accompagner jusqu’à l’acte",
    texte: "Offre, compromis, financement, signature : nous restons à vos côtés à chaque étape.",
  },
];

export const valeurs = [
  { nom: "L’écoute", effet: "Nous commençons par comprendre votre situation avant de proposer quoi que ce soit." },
  { nom: "La sincérité", effet: "Nous vous disons ce que nous pensons d’un prix ou d’un bien, même si ce n’est pas ce que vous espériez entendre." },
  { nom: "L’éthique", effet: "Nous ne poussons jamais à vendre ni à acheter. Une décision prise sous pression est rarement la bonne." },
  { nom: "La transparence", effet: "Vous savez à tout moment où en est votre dossier, et pourquoi." },
  { nom: "Le respect des projets de vie", effet: "Derrière une vente ou un achat, il y a une famille, une étape, parfois une épreuve. Nous en tenons compte." },
];
