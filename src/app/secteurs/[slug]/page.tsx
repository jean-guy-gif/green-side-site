import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppelProjet, TetePage } from "@/components/blocs";
import { CarteBien } from "@/components/CarteBien";
import { Portrait } from "@/components/Portrait";
import { ACompleter, EmplacementPhoto, LienFleche, NoteValidation } from "@/components/ui";
import { getBiens } from "@/content/biens";
import { equipe } from "@/content/equipe";
import { getSecteur, secteursCoeur } from "@/content/secteurs";
import { meta } from "@/lib/seo";

export function generateStaticParams() {
  return secteursCoeur.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/secteurs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getSecteur(slug);
  if (!s?.seo) return {};
  return meta({ titre: s.seo.titre, description: s.seo.description, chemin: `/secteurs/${s.slug}` });
}

export default async function PageSecteur({ params }: PageProps<"/secteurs/[slug]">) {
  const { slug } = await params;
  const s = getSecteur(slug);
  if (!s) notFound();
  const a = s.nature === "technopole" ? "autour de" : "à";
  const biens = getBiens()
    .filter((b) => b.secteurSlug === s.slug)
    .slice(0, 3);
  const autres = secteursCoeur.filter((x) => x.slug !== s.slug);

  return (
    <>
      <TetePage
        miettes={[
          { href: "/secteurs", label: "Nos secteurs" },
          { href: `/secteurs/${s.slug}`, label: s.nom },
        ]}
        sourcil={`Immobilier ${a} ${s.nom}${s.codePostal ? ` (${s.codePostal})` : ""}`}
        titre={
          <>
            {s.nom}. <em className="italique">{s.accroche}</em>
          </>
        }
        apres={
          <div className="flex flex-wrap gap-3">
            <Link href="/vendre#estimation" className="btn btn-plein">
              Faire estimer mon bien {a} {s.nom}
            </Link>
            <Link href="/acheter#recherche" className="btn btn-ligne">
              Acheter {a} {s.nom}
            </Link>
          </div>
        }
      >
        {s.intro?.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </TetePage>

      <section className="section bg-ivoire-2" aria-labelledby="titre-reperes">
        <div className="page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="sourcil mb-4">Repères</p>
            <h2 id="titre-reperes" className="titre-l">
              Vivre {a} <em className="italique">{s.nom}.</em>
            </h2>
            <EmplacementPhoto legende={`une vue de ${s.nom} (photo de l’agence, libre de droits)`} className="mt-10 aspect-[4/5] w-full max-w-xs" ton="sauge" />
          </div>
          <div>
            <dl className="border-t border-encre/15">
              {s.reperes?.map((r) => (
                <div key={r.titre} className="border-b border-encre/15 py-7">
                  <dt className="titre-s">{r.titre}</dt>
                  <dd className="mt-3 text-encre-2">{r.texte}</dd>
                </div>
              ))}
            </dl>
            <NoteValidation>
              Faits vérifiés (sources en bas de page), à relire par l’agence. Ajouter le regard des fondatrices : quartiers, types de logements observés, raisons de s’y installer.
            </NoteValidation>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-projets">
        <div className="page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="sourcil mb-4">Vos projets</p>
            <h2 id="titre-projets" className="titre-l">
              Ce que nous accompagnons <em className="italique">ici.</em>
            </h2>
            <ul className="prose-gs mt-8 text-[1.1rem]">
              {s.projets?.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="mt-6">
              <ACompleter quoi={`le regard des fondatrices sur le marché ${a} ${s.nom} (sans prix au m² ni statistique non sourcée)`} />
            </p>
          </div>
          <div className="rounded-carte bg-sauge-2/70 p-7 sm:p-10">
            <h3 className="titre-m">Vos interlocutrices</h3>
            <ul className="mt-7 grid grid-cols-3 gap-4">
              {equipe.map((m) => (
                <li key={m.slug}>
                  <Link href={`/equipe/${m.slug}`} className="group block rounded-carte">
                    <Portrait membre={m} sizes="(min-width: 1024px) 12vw, 28vw" />
                    <span className="mt-3 block font-display text-[1.2rem] sm:text-[1.45rem]">{m.prenom}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <LienFleche href="/equipe" className="mt-7">
              Rencontrer l’équipe
            </LienFleche>
          </div>
        </div>
      </section>

      {biens.length > 0 && (
        <section className="section bg-ivoire-2" aria-labelledby="titre-biens-secteur">
          <div className="page">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="titre-biens-secteur" className="titre-l">
                Biens à vendre {a} {s.nom}
              </h2>
              <LienFleche href="/biens">Voir tous les biens</LienFleche>
            </div>
            <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {biens.map((b) => (
                <li key={b.id}>
                  <CarteBien bien={b} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="page py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="sourcil mb-4">Autres secteurs</h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {autres.map((x) => (
                <li key={x.slug}>
                  <LienFleche href={`/secteurs/${x.slug}`}>
                    Immobilier {x.nature === "technopole" ? "autour de" : "à"} {x.nom}
                  </LienFleche>
                </li>
              ))}
            </ul>
          </div>
          {s.sources && (
            <div>
              <h2 className="sourcil mb-4">Sources</h2>
              <ul className="space-y-1.5 text-[0.9rem] text-encre-2">
                {s.sources.map((src) => (
                  <li key={src.url}>
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-encre">
                      {src.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <AppelProjet
        titre={
          <>
            Un projet {a} <em className="italique">{s.nom} ?</em>
          </>
        }
        secondaire={{ href: "/vendre#estimation", label: "Faire estimer mon bien" }}
      />
    </>
  );
}
