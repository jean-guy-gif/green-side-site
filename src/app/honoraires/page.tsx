import Link from "next/link";
import { TetePage } from "@/components/blocs";
import { ACompleter } from "@/components/ui";
import { meta } from "@/lib/seo";
import { EST_DEMO } from "@/lib/site";

export const metadata = meta({
  titre: "Honoraires de l’Agence Green Side",
  description:
    "Barème des honoraires de l’Agence Green Side pour la vente de biens immobiliers, prix toutes taxes comprises.",
  chemin: "/honoraires",
});

/**
 * Barème — À COMPLÉTER par l'agence. Rien n'est inventé ici : tant que
 * `bareme` est vide, la page l'indique clairement.
 * Chaque ligne : { tranche: "Jusqu'à 200 000 €", honoraires: "x % TTC", charge: "vendeur" }
 */
const bareme: { tranche: string; honoraires: string; charge: string }[] = [];
const dateBareme: string | null = null;

export default function Honoraires() {
  return (
    <>
      <TetePage
        miettes={[{ href: "/honoraires", label: "Honoraires" }]}
        sourcil="Informations tarifaires"
        titre="Nos honoraires"
      >
        <p>
          Nos honoraires sont exprimés toutes taxes comprises. Ils sont précisés
          dans chaque mandat et rappelés sur chaque annonce, avec l’indication
          de qui les paie.
        </p>
      </TetePage>

      <section className="page max-w-4xl pb-20 lg:pb-28">
        <h2 className="titre-m">Barème — transaction</h2>
        {bareme.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-t border-encre/15 text-left">
              <caption className="sr-only">Barème des honoraires de transaction, prix TTC</caption>
              <thead>
                <tr className="border-b border-encre/15 text-[0.9rem] text-encre-2">
                  <th scope="col" className="py-3 pr-4 font-medium">Prix de vente</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Honoraires TTC</th>
                  <th scope="col" className="py-3 font-medium">À la charge de</th>
                </tr>
              </thead>
              <tbody>
                {bareme.map((l) => (
                  <tr key={l.tranche} className="border-b border-encre/15">
                    <th scope="row" className="py-4 pr-4 font-medium">{l.tranche}</th>
                    <td className="py-4 pr-4">{l.honoraires}</td>
                    <td className="py-4">{l.charge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-6 rounded-carte bg-ivoire-2 p-7">
            {EST_DEMO ? (
              <ACompleter quoi="barème d’honoraires TTC de l’agence (tranches de prix, taux ou montants, charge vendeur ou acquéreur, date d’application)" />
            ) : (
              <>Notre barème est en cours de mise à jour. Il vous est communiqué sur simple demande.</>
            )}
          </p>
        )}
        {dateBareme && <p className="mt-4 text-[0.92rem] text-encre-2">Barème en vigueur au {dateBareme}.</p>}

        <div className="prose-gs mt-12 max-w-2xl text-encre-2">
          <h2 className="!text-encre">Ce que vous devez savoir</h2>
          <ul>
            <li>Aucun honoraire n’est dû tant que la vente n’est pas effectivement conclue.</li>
            <li>Chaque annonce précise si les honoraires sont à la charge du vendeur ou de l’acquéreur.</li>
            <li>Lorsqu’ils sont à la charge de l’acquéreur, l’annonce indique aussi le prix hors honoraires et leur montant en pourcentage.</li>
            <li>L’estimation de votre bien dans le cadre d’un projet de vente : <ACompleter quoi="conditions (gratuite ou non) à confirmer" /></li>
          </ul>
          <p>
            Une question sur nos honoraires ?{" "}
            <Link href="/contact">Écrivez-nous</Link>, nous vous répondons
            clairement.
          </p>
          {EST_DEMO && (
            <p className="a-completer !block">
              À faire valider : formulation de cette page par l’agence ou son conseil (affichage des prix des professionnels de l’immobilier — arrêté du 10 janvier 2017).
            </p>
          )}
        </div>
      </section>
    </>
  );
}
