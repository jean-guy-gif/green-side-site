import type { Metadata } from "next";
import Link from "next/link";
import { CarteBien } from "@/components/CarteBien";
import { CarteTerritoire } from "@/components/CarteTerritoire";
import { FormulaireDemande } from "@/components/FormulaireDemande";
import { Portrait } from "@/components/Portrait";
import { ACompleter, Fleche, LienFleche, NoteValidation, TeteSection, Valeur } from "@/components/ui";
import { getBiens } from "@/content/biens";
import { equipe } from "@/content/equipe";
import { engagements, recits } from "@/content/approche";
import { secteursCoeur, secteursVoisins } from "@/content/secteurs";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...meta({
    titre: "Agence immobilière à Biot, Valbonne et Sophia Antipolis | Green Side",
    description: site.description,
    chemin: "/",
  }),
  title: { absolute: "Agence immobilière à Biot, Valbonne et Sophia Antipolis | Green Side" },
};

export default function Accueil() {
  const biens = getBiens().slice(0, 3);
  const decalages = ["mt-8 sm:mt-20", "mt-0", "mt-14 sm:mt-32"];

  return (
    <>
      {/* ── 1. HERO : la promesse et les trois visages ─────────────────────── */}
      <section className="relative overflow-hidden">
        <svg
          className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[70%] w-full text-ocre lg:block"
          viewBox="0 0 1440 520"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="chemin-trace"
            d="M-20 470C210 380 330 500 560 430s260-250 470-250 250 150 430 90"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeOpacity="0.55"
          />
        </svg>

        <div className="page relative grid gap-x-10 gap-y-9 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1fr_1.08fr] lg:grid-rows-[auto_1fr] lg:pt-20 lg:pb-28">
          <div className="lg:self-end">
            <p className="sourcil entree">Immobilier à Biot, Valbonne et Sophia Antipolis</p>
            <h1 className="titre-xl entree entree-2 mt-5 sm:mt-6">
              Derrière chaque adresse, il y a une <em className="italique">histoire.</em>
            </h1>
          </div>

          <ul
            className="grid grid-cols-3 items-start gap-3 sm:gap-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
            aria-label="Les trois fondatrices"
          >
            {equipe.map((m, i) => (
              <li key={m.slug} className={`entree ${decalages[i]}`} style={{ animationDelay: `${0.25 + i * 0.12}s` }}>
                <Link href={`/equipe/${m.slug}`} className="group block rounded-carte">
                  <Portrait
                    membre={m}
                    priorite
                    ratio={i === 1 ? "aspect-[4/6]" : "aspect-[4/5.4]"}
                    sizes="(min-width: 1024px) 17vw, 30vw"
                  />
                  <span className="mt-3 block font-display text-[1.25rem] leading-tight sm:text-[1.7rem]">
                    {m.prenom}
                  </span>
                  <span className="mt-0.5 block text-[0.8rem] text-encre-2 sm:text-[0.92rem]">
                    <span className="sr-only">Son regard : </span>
                    {m.verbe}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="lg:col-start-1 lg:row-start-2">
            <p className="chapo entree entree-3 max-w-xl">
              Sylvie, Laurence et Caroline vous accompagnent dans vos projets
              immobiliers avec sincérité, méthode et attention. Trois regards
              complémentaires, une même exigence : vous aider à prendre les
              bonnes décisions.
            </p>
            <div className="entree entree-4 mt-8 flex flex-wrap gap-3">
              <Link href="/equipe" className="btn btn-plein">
                Rencontrer l’équipe
              </Link>
              <Link href="/biens" className="btn btn-ligne">
                Découvrir les biens
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. IDENTITÉ : trois femmes, une même vision ────────────────────── */}
      <section className="section bg-ivoire-2" aria-labelledby="titre-trio">
        <div className="page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="sourcil mb-4">L’équipe</p>
            <h2 id="titre-trio" className="titre-l">
              Trois femmes, une même <em className="italique">vision.</em>
            </h2>
            <div className="chapo mt-6 space-y-4">
              <p>
                Elles sont originaires du même quartier de Biot — celui auquel le
                nom Green Side fait référence. Elles se connaissent depuis
                longtemps et travaillent réellement à trois.
              </p>
              <p>
                Pour vous, cela change une chose simple : vous avez une
                interlocutrice, et trois regards sur votre projet.
              </p>
            </div>
            <LienFleche href="/notre-agence" className="mt-8">
              L’histoire de l’agence
            </LienFleche>
          </div>

          <ul className="border-t border-encre/15">
            {equipe.map((m) => (
              <li key={m.slug} className="border-b border-encre/15">
                <Link
                  href={`/equipe/${m.slug}`}
                  className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-5 py-7 transition-colors hover:bg-ivoire/70 sm:grid-cols-[6.5rem_1fr_auto] sm:gap-8 sm:px-4"
                >
                  <Portrait membre={m} ratio="aspect-[4/5]" sizes="104px" />
                  <span>
                    <span className="block font-display text-[2rem] leading-none sm:text-[2.6rem]">
                      {m.prenom}
                    </span>
                    <span className="mt-2 block font-display text-[1.05rem] text-foret italic">
                      {m.verbe}
                    </span>
                    <span className="mt-1.5 block max-w-md text-[0.97rem] leading-snug text-encre-2">
                      {m.regard}
                    </span>
                  </span>
                  <span className="hidden text-foret sm:block">
                    <span className="sr-only">Découvrir {m.prenom}</span>
                    <Fleche className="transition-transform duration-300 ease-doux group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── 3. ENGAGEMENTS ─────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="titre-engagements">
        <div className="page">
          <TeteSection
            sourcil="Nos engagements"
            titre={
              <span id="titre-engagements">
                Votre projet, notre <em className="italique">attention.</em>
              </span>
            }
          >
            <p>Trois engagements, et ce qu’ils changent concrètement pour vous.</p>
          </TeteSection>
          <ol className="mt-14 grid gap-12 lg:grid-cols-3 lg:gap-10">
            {engagements.map((e, i) => (
              <li key={e.titre} className="border-t border-ocre/60 pt-7">
                <p className="font-display text-[2.6rem] leading-none text-ocre-texte italic" aria-hidden="true">
                  0{i + 1}
                </p>
                <h3 className="titre-m mt-5">{e.titre}</h3>
                <p className="mt-4 text-encre-2">{e.texte}</p>
                <p className="mt-5 text-[0.95rem]">
                  <span className="font-semibold">Concrètement : </span>
                  {e.concretement}
                  {e.aPreciser && (
                    <>
                      {" "}
                      <ACompleter quoi={e.aPreciser} />
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. RÉCITS : ce qui compte derrière une vente ───────────────────── */}
      <section className="sur-sombre section bg-nuit text-ivoire" aria-labelledby="titre-recits">
        <div className="page">
          <TeteSection
            sourcil="Ce qui compte derrière une vente"
            titre={
              <span id="titre-recits">
                Plus qu’une transaction, des situations <em className="italique">réelles.</em>
              </span>
            }
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-carte bg-ivoire/15 lg:grid-cols-3">
            {recits.map((r) => (
              <li key={r.verbe} className="bg-nuit p-7 sm:p-9">
                <h3 className="font-display text-[2.4rem] leading-none text-sauge italic sm:text-[3rem]">
                  {r.verbe}
                </h3>
                <p className="mt-2 text-[0.92rem] font-medium tracking-wide text-sauge-2">{r.situation}</p>
                <p className="mt-6 leading-relaxed text-sauge-2">{r.texte}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-[0.9rem] text-sauge">
            Ces situations illustrent notre façon de travailler. Ce ne sont ni
            des avis ni des témoignages de clients.
          </p>
          <NoteValidation>Textes à valider par les fondatrices avant publication.</NoteValidation>
        </div>
      </section>

      {/* ── 5. BIENS ───────────────────────────────────────────────────────── */}
      <section className="section" aria-labelledby="titre-biens">
        <div className="page">
          {biens.length > 0 ? (
            <>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <TeteSection sourcil="Nos biens" titre={<span id="titre-biens">À vendre en ce moment</span>} />
                <LienFleche href="/biens">Voir tous les biens</LienFleche>
              </div>
              <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {biens.map((b) => (
                  <li key={b.id}>
                    <CarteBien bien={b} />
                  </li>
                ))}
              </ul>
              {biens.some((b) => b.demo) && (
                <NoteValidation>
                  Exemples fictifs pour la démonstration : aucun bien réel n’est encore raccordé.
                </NoteValidation>
              )}
            </>
          ) : (
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <TeteSection sourcil="Nos biens" titre={<span id="titre-biens">Vos projets immobiliers</span>}>
                <p>
                  Maisons et villas, appartements, terrains, investissement
                  locatif : dites-nous ce que vous cherchez, nous vous
                  répondrons personnellement.
                </p>
              </TeteSection>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href="/acheter#recherche" className="btn btn-plein">
                  Nous confier votre recherche
                </Link>
                <Link href="/vendre" className="btn btn-ligne">
                  Vendre avec Green Side
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. TERRITOIRE ──────────────────────────────────────────────────── */}
      <section className="section bg-sauge-2/70" aria-labelledby="titre-territoire">
        <div className="page grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="sourcil mb-4">Notre territoire</p>
            <h2 id="titre-territoire" className="titre-l">
              D’ici. À vos <em className="italique">côtés.</em>
            </h2>
            <p className="chapo mt-6">
              Notre cœur de territoire tient en trois noms. Nous y connaissons
              les quartiers, les rythmes de vie et ce qui fait qu’on s’y installe
              — ou qu’on en part.
            </p>
            <ul className="mt-8 border-t border-encre/15">
              {secteursCoeur.map((s) => (
                <li key={s.slug} className="border-b border-encre/15">
                  <Link href={`/secteurs/${s.slug}`} className="group flex min-h-16 items-center justify-between gap-4 py-3">
                    <span>
                      <span className="font-display text-[1.6rem] leading-tight">{s.nom}</span>
                      <span className="block text-[0.92rem] text-encre-2">{s.accroche}</span>
                    </span>
                    <Fleche className="text-foret transition-transform duration-300 ease-doux group-hover:translate-x-1.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.97rem] text-encre-2">
              Nous intervenons aussi à {secteursVoisins.slice(0, -1).map((s) => s.nom).join(", ")} et{" "}
              {secteursVoisins.at(-1)?.nom}.
            </p>
          </div>
          <CarteTerritoire />
        </div>
      </section>

      {/* ── 7. VENDRE OU ACHETER ───────────────────────────────────────────── */}
      <section className="section" aria-labelledby="titre-parcours">
        <div className="page">
          <h2 id="titre-parcours" className="titre-l max-w-3xl">
            Vendre ou acheter : deux projets, la même <em className="italique">franchise.</em>
          </h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="sur-sombre arche flex flex-col bg-foret px-7 pt-28 pb-10 text-ivoire sm:px-14 sm:pt-40 sm:pb-14">
              <p className="sourcil">Vous vendez</p>
              <h3 className="titre-m mt-4">Une stratégie écrite, un suivi sans zone d’ombre.</h3>
              <ul className="mt-6 space-y-3 text-sauge-2">
                <li>Une estimation expliquée, pas un chiffre lancé pour vous plaire.</li>
                <li>Un plan de vente construit pour votre bien et votre calendrier.</li>
                <li>Des points de suivi réguliers, y compris quand les nouvelles dérangent.</li>
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/vendre#estimation" className="btn btn-clair">
                  Faire estimer mon bien
                </Link>
                <Link href="/vendre" className="btn btn-ligne-clair">
                  Notre méthode de vente
                </Link>
              </div>
            </article>
            <article className="arche flex flex-col bg-rose-2 px-7 pt-28 pb-10 sm:px-14 sm:pt-40 sm:pb-14">
              <p className="sourcil">Vous achetez</p>
              <h3 className="titre-m mt-4">Partir de votre vie, pas d’une liste d’annonces.</h3>
              <ul className="mt-6 space-y-3 text-encre-2">
                <li>Un premier échange pour comprendre votre projet et vos priorités.</li>
                <li>Des visites ciblées plutôt que nombreuses.</li>
                <li>Un avis sincère sur chaque bien, jusqu’à la signature.</li>
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/acheter#recherche" className="btn btn-plein">
                  Nous confier votre recherche
                </Link>
                <Link href="/acheter" className="btn btn-ligne">
                  Acheter avec nous
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── 8. CONTACT ─────────────────────────────────────────────────────── */}
      <section className="section bg-ivoire-2" aria-labelledby="titre-contact">
        <div className="page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="sourcil mb-4">Contact</p>
            <h2 id="titre-contact" className="titre-l">
              Parlons de votre <em className="italique">projet.</em>
            </h2>
            <p className="chapo mt-6">
              Un premier échange ne vous engage à rien. Il nous permet de
              comprendre votre situation, et à vous de voir si notre façon de
              travailler vous convient.
            </p>
            <dl className="mt-8 space-y-4 text-[0.97rem]">
              <div>
                <dt className="sourcil !text-[0.7rem]">Téléphone</dt>
                <dd className="mt-1 font-display text-[1.4rem]">
                  <Valeur valeur={site.telephone} quoi="téléphone" />
                </dd>
              </div>
              <div>
                <dt className="sourcil !text-[0.7rem]">E-mail</dt>
                <dd className="mt-1 font-display text-[1.4rem]">
                  <Valeur valeur={site.email} quoi="e-mail" />
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-carte bg-ivoire p-6 sm:p-10">
            <FormulaireDemande type="contact" />
          </div>
        </div>
      </section>
    </>
  );
}
