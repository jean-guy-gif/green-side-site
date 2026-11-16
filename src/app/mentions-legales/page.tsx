import { TetePage } from "@/components/blocs";
import { Valeur } from "@/components/ui";
import { meta } from "@/lib/seo";
import { EST_DEMO, site } from "@/lib/site";

export const metadata = meta({
  titre: "Mentions légales",
  description: "Mentions légales du site de l’Agence Green Side, conseil en immobilier à Biot.",
  chemin: "/mentions-legales",
});

export default function MentionsLegales() {
  const l = site.legal;
  const lignes: [string, string | null, string][] = [
    ["Dénomination sociale", l.raisonSociale, "raison sociale"],
    ["Forme juridique", l.formeJuridique, "forme juridique"],
    ["Capital social", l.capital, "capital social, le cas échéant"],
    ["Siège social", l.siege, "adresse du siège"],
    ["SIREN / RCS", l.siren && l.rcs ? `${l.siren} — ${l.rcs}` : null, "numéro SIREN et ville du RCS"],
    ["TVA intracommunautaire", l.tva, "numéro de TVA"],
    ["Téléphone", site.telephone, "téléphone"],
    ["E-mail", site.email, "e-mail"],
    ["Responsable de la publication", l.responsablePublication, "nom du responsable de la publication"],
  ];
  const activite: [string, string | null, string][] = [
    ["Carte professionnelle", l.carteProfessionnelle, "numéro de carte « Transactions sur immeubles et fonds de commerce » et CCI de délivrance"],
    ["Garantie financière", l.garantieFinanciere, "garant et montant, ou mention d’absence de garantie"],
    ["Maniement de fonds", l.maniementDeFonds, "« L’agence ne reçoit ni ne détient aucun fonds », ou détail"],
    ["Assurance responsabilité civile professionnelle", l.assuranceRcp, "assureur, adresse et zone de couverture"],
    ["Médiateur de la consommation", l.mediateur, "nom, adresse et site du médiateur"],
  ];

  return (
    <>
      <TetePage miettes={[{ href: "/mentions-legales", label: "Mentions légales" }]} titre="Mentions légales" />
      <section className="page max-w-4xl pb-20 lg:pb-28">
        {EST_DEMO && (
          <p className="a-completer mb-10 !block p-4">
            Page à compléter avec les informations réelles de l’agence, puis à faire valider par l’agence ou son conseil avant mise en ligne. Rien n’est inventé : chaque marqueur correspond à une information attendue.
          </p>
        )}

        <div className="prose-gs">
          <h2 className="!mt-0">Éditeur du site</h2>
          <Tableau lignes={lignes} />

          <h2>Activité réglementée</h2>
          <p className="text-encre-2">
            L’activité d’agent immobilier est encadrée par la loi n° 70-9 du 2
            janvier 1970 (dite loi Hoguet) et son décret d’application n° 72-678
            du 20 juillet 1972.
          </p>
          <Tableau lignes={activite} />

          <h2>Hébergement</h2>
          <p className="text-encre-2">{l.hebergeur}</p>

          <h2>Propriété intellectuelle</h2>
          <p className="text-encre-2">
            Les textes, photographies et éléments graphiques de ce site sont la
            propriété de l’agence ou de leurs auteurs. Toute reproduction sans
            autorisation est interdite.
          </p>

          <h2>Annonces immobilières</h2>
          <p className="text-encre-2">
            Les annonces sont publiées sous la responsabilité de l’agence, pour
            des biens faisant l’objet d’un mandat. Les informations (surfaces,
            diagnostics, charges) sont données à titre indicatif et précisées
            lors de la visite et dans les documents remis avant tout engagement.
          </p>
        </div>
      </section>
    </>
  );
}

function Tableau({ lignes }: { lignes: [string, string | null, string][] }) {
  return (
    <dl className="mt-6 border-t border-encre/15">
      {lignes.map(([k, v, quoi]) => (
        <div key={k} className="grid gap-1 border-b border-encre/15 py-4 sm:grid-cols-[1fr_1.6fr] sm:gap-8">
          <dt className="text-encre-2">{k}</dt>
          <dd className="font-medium">
            <Valeur valeur={v} quoi={quoi} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
