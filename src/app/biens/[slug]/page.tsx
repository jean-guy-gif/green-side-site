import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EtiquetteEnergie, VisuelBien, resumeBien } from "@/components/CarteBien";
import { Portrait } from "@/components/Portrait";
import { LienFleche } from "@/components/ui";
import { LIBELLE_STATUT, LIBELLE_TYPE, euros, getBien, getBiens, nombre } from "@/content/biens";
import { getMembre } from "@/content/equipe";
import { FilAriane, meta } from "@/lib/seo";

export function generateStaticParams() {
  const biens = getBiens();
  // Next exige au moins une entrée : sans bien publié, la route répond 404.
  return biens.length > 0 ? biens.map((b) => ({ slug: b.slug })) : [{ slug: "aucun-bien" }];
}

export async function generateMetadata({ params }: PageProps<"/biens/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const b = getBien(slug);
  if (!b) return {};
  return meta({
    titre: `${b.titre} à ${b.commune} — ${euros(b.prix)}`,
    description: `${LIBELLE_TYPE[b.type]} à vendre à ${b.commune} : ${resumeBien(b).join(", ")}. Présenté par l’Agence Green Side.`,
    chemin: `/biens/${b.slug}`,
    indexable: !b.demo,
  });
}

const EXTERIEURS: Record<string, string> = {
  jardin: "Jardin",
  terrasse: "Terrasse",
  balcon: "Balcon",
  piscine: "Piscine",
};

export default async function FicheBien({ params }: PageProps<"/biens/[slug]">) {
  const { slug } = await params;
  const b = getBien(slug);
  if (!b) notFound();
  const conseillere = getMembre(b.conseillereSlug);
  const passoire = b.energie && (b.energie.dpe === "F" || b.energie.dpe === "G");

  const caracteristiques: [string, string][] = [
    ["Type", LIBELLE_TYPE[b.type]],
    ["Localisation", b.quartier ? `${b.commune} — ${b.quartier}` : b.commune],
    [b.type === "terrain" ? "Surface du terrain" : "Surface habitable", `${nombre(b.surface)} m²`],
    ...(b.surfaceTerrain ? ([["Terrain", `${nombre(b.surfaceTerrain)} m²`]] as [string, string][]) : []),
    ...(b.pieces ? ([["Pièces", String(b.pieces)]] as [string, string][]) : []),
    ...(b.chambres ? ([["Chambres", String(b.chambres)]] as [string, string][]) : []),
    ...(b.exterieurs.length
      ? ([["Extérieurs", b.exterieurs.map((e) => EXTERIEURS[e]).join(", ")]] as [string, string][])
      : []),
    ...(b.type !== "terrain" ? ([["Stationnement", b.stationnement ? "Oui" : "Non"]] as [string, string][]) : []),
    ["Référence", b.id],
  ];

  return (
    <>
      <div className="page pt-8 sm:pt-10">
        <FilAriane
          miettes={[
            { href: "/biens", label: "Nos biens" },
            { href: `/biens/${b.slug}`, label: b.titre },
          ]}
        />
      </div>

      <article className="page pt-8 pb-20 lg:pb-28">
        {b.demo && (
          <p className="mb-6 rounded-carte border border-dashed border-ocre bg-ocre/10 p-5 text-[0.95rem] text-ocre-texte">
            <strong>Exemple fictif.</strong> Cette fiche montre comment une
            annonce sera présentée. Ce bien n’existe pas et n’est pas à vendre ;
            prix, surfaces et diagnostics sont inventés pour la démonstration.
          </p>
        )}

        <VisuelBien bien={b} className="aspect-[16/10] w-full rounded-carte sm:aspect-[16/8]" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            <p className="sourcil">
              {LIBELLE_TYPE[b.type]} · {b.commune}
              {b.statut !== "disponible" && <> · {LIBELLE_STATUT[b.statut]}</>}
            </p>
            <h1 className="titre-l mt-4">{b.titre}</h1>
            <p className="mt-4 text-[1.1rem] text-encre-2">{resumeBien(b).join(" · ")}</p>

            <div className="prose-gs mt-10 max-w-2xl">
              {b.description.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <h2 className="titre-m mt-14">Caractéristiques</h2>
            <dl className="mt-6 grid border-t border-encre/15 sm:grid-cols-2 sm:gap-x-10">
              {caracteristiques.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-encre/15 py-3.5">
                  <dt className="text-encre-2">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>

            {b.energie && (
              <>
                <h2 className="titre-m mt-14">Performance énergétique</h2>
                <div className="mt-6 flex flex-wrap items-center gap-6">
                  <EtiquetteEnergie sigle="DPE" classe={b.energie.dpe} />
                  <EtiquetteEnergie sigle="GES" classe={b.energie.ges} />
                </div>
                {b.energie.coutMin && b.energie.coutMax && (
                  <p className="mt-5 max-w-2xl text-encre-2">
                    Montant estimé des dépenses annuelles d’énergie pour un
                    usage standard : entre {euros(b.energie.coutMin)} et{" "}
                    {euros(b.energie.coutMax)} par an. Prix moyens des énergies
                    indexés sur l’année {b.energie.anneeReference} (abonnements
                    compris).
                  </p>
                )}
                {passoire && (
                  <p className="mt-4 max-w-2xl rounded-champ border border-erreur/40 bg-craie p-4 font-medium text-erreur">
                    Logement à consommation énergétique excessive : classe {b.energie.dpe}.
                  </p>
                )}
              </>
            )}

            {b.copropriete && (
              <>
                <h2 className="titre-m mt-14">Copropriété</h2>
                <ul className="prose-gs mt-6 max-w-2xl text-encre-2">
                  <li>Bien soumis au statut de la copropriété.</li>
                  <li>Nombre de lots : {nombre(b.copropriete.nombreLots)}.</li>
                  <li>Charges annuelles (quote-part moyenne du budget prévisionnel) : {euros(b.copropriete.chargesAnnuelles)}.</li>
                  <li>
                    {b.copropriete.procedureEnCours
                      ? "Le syndicat des copropriétaires fait l’objet d’une procédure en cours."
                      : "Pas de procédure en cours concernant le syndicat des copropriétaires."}
                  </li>
                </ul>
              </>
            )}

            <h2 className="titre-m mt-14">Risques</h2>
            <p className="mt-6 max-w-2xl text-encre-2">
              Les informations sur les risques auxquels ce bien est exposé sont
              disponibles sur le site Géorisques :{" "}
              <a href="https://www.georisques.gouv.fr" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                www.georisques.gouv.fr
              </a>
              .
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-carte bg-ivoire-2 p-7 sm:p-9">
              <p className="font-display text-[2.6rem] leading-none">{euros(b.prix)}</p>
              <p className="mt-3 text-[0.95rem] text-encre-2">
                {b.honoraires.charge === "vendeur" ? (
                  <>Honoraires à la charge du vendeur.</>
                ) : (
                  <>
                    Honoraires inclus, à la charge de l’acquéreur
                    {b.honoraires.tauxTtc && <> : {String(b.honoraires.tauxTtc).replace(".", ",")} % TTC</>}
                    {b.honoraires.prixHorsHonoraires && (
                      <> — prix hors honoraires : {euros(b.honoraires.prixHorsHonoraires)}</>
                    )}
                    .
                  </>
                )}{" "}
                <Link href="/honoraires" className="underline underline-offset-4">
                  Consulter notre barème d’honoraires
                </Link>
                .
              </p>

              {conseillere && (
                <div className="mt-7 grid grid-cols-[4.5rem_1fr] items-center gap-4 border-t border-encre/15 pt-7">
                  <Portrait membre={conseillere} sizes="72px" />
                  <p>
                    <span className="block text-[0.85rem] text-encre-2">Votre interlocutrice</span>
                    <Link href={`/equipe/${conseillere.slug}`} className="font-display text-[1.5rem] underline decoration-sauge underline-offset-4">
                      {conseillere.prenom}
                    </Link>
                  </p>
                </div>
              )}

              <Link
                href={`/contact?projet=acheter&bien=${b.id}${conseillere ? `&avec=${conseillere.slug}` : ""}`}
                className="btn btn-plein mt-7 w-full"
              >
                Demander une visite
              </Link>
            </div>
            <LienFleche href="/biens" className="mt-6">
              Tous les biens
            </LienFleche>
          </aside>
        </div>
      </article>
    </>
  );
}
