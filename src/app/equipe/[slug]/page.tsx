import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppelProjet } from "@/components/blocs";
import { Portrait } from "@/components/Portrait";
import { ACompleter, NoteValidation } from "@/components/ui";
import { equipe, getMembre } from "@/content/equipe";
import { FilAriane, meta } from "@/lib/seo";

export function generateStaticParams() {
  return equipe.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps<"/equipe/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const m = getMembre(slug);
  if (!m) return {};
  return meta({
    titre: `${m.prenom}, cofondatrice de l’Agence Green Side à Biot`,
    description: `${m.prenom} vous accompagne dans votre projet immobilier à Biot, Valbonne et Sophia Antipolis. ${m.regard}`,
    chemin: `/equipe/${m.slug}`,
  });
}

export default async function Profil({ params }: PageProps<"/equipe/[slug]">) {
  const { slug } = await params;
  const m = getMembre(slug);
  if (!m) notFound();
  const autres = equipe.filter((x) => x.slug !== m.slug);

  return (
    <>
      <div className="page pt-8 sm:pt-10">
        <FilAriane
          miettes={[
            { href: "/equipe", label: "L’équipe" },
            { href: `/equipe/${m.slug}`, label: m.prenom },
          ]}
        />
      </div>

      <section className="page grid items-start gap-10 pt-10 pb-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:pt-14 lg:pb-28">
        <div className="entree mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none">
          <Portrait membre={m} priorite ratio="aspect-[4/5.2]" sizes="(min-width: 1024px) 38vw, 92vw" />
        </div>

        <div>
          <p className="sourcil entree">{m.role} · Agence Green Side</p>
          <h1 className="entree entree-2 mt-4 font-display text-[4rem] leading-[0.95] tracking-tight sm:text-[6rem]">
            {m.prenom}
          </h1>
          <p className="entree entree-3 mt-6 font-display text-[1.7rem] leading-snug text-foret italic sm:text-[2.1rem]">
            {m.verbe}. <span className="text-encre not-italic">{m.regard}</span>
          </p>

          <div className="mt-12 border-t border-encre/15 pt-10">
            <h2 className="sourcil mb-5">Son approche</h2>
            <div className="chapo space-y-4">
              {m.approche.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <NoteValidation>Proposition tirée de l’atelier — à valider par {m.prenom}.</NoteValidation>
          </div>

          <div className="mt-12 border-t border-encre/15 pt-10">
            <h2 className="sourcil mb-5">À propos de {m.prenom}</h2>
            {m.bioLongue ? (
              <div className="space-y-4 text-encre-2">
                {m.bioLongue.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="text-encre-2">
                {m.prenom} est l’une des trois fondatrices de l’Agence Green
                Side, originaire — comme {autres.map((a) => a.prenom).join(" et ")} — du
                même quartier de Biot.{" "}
                <ACompleter quoi={`présentation de ${m.prenom}, 80 à 160 mots, rédigée avec elle`} />
              </p>
            )}
            {m.citationValidee ? (
              <blockquote className="mt-8 border-l-2 border-ocre pl-6 font-display text-[1.5rem] leading-snug italic">
                « {m.citationValidee} »
              </blockquote>
            ) : (
              <p className="mt-6">
                <ACompleter quoi={`une phrase personnelle de ${m.prenom}, validée par elle`} />
              </p>
            )}
            {m.specialitesConfirmees.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-2">
                {m.specialitesConfirmees.map((s) => (
                  <li key={s} className="rounded-full border border-sauge px-4 py-1.5 text-[0.92rem]">
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link href={`/contact?avec=${m.slug}`} className="btn btn-plein">
              Échanger avec {m.prenom}
            </Link>
            {m.contactProfessionnel?.telephone && (
              <a href={`tel:${m.contactProfessionnel.telephone.replace(/\s/g, "")}`} className="lien min-h-11">
                {m.contactProfessionnel.telephone}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="section bg-ivoire-2" aria-labelledby="titre-autres">
        <div className="page">
          <h2 id="titre-autres" className="titre-m">
            {m.prenom} travaille avec
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {autres.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/equipe/${a.slug}`}
                  className="group grid grid-cols-[6.5rem_1fr] items-center gap-6 rounded-carte sm:grid-cols-[9rem_1fr]"
                >
                  <Portrait membre={a} sizes="144px" />
                  <span>
                    <span className="block font-display text-[2.2rem] leading-none">{a.prenom}</span>
                    <span className="mt-2 block font-display text-foret italic">{a.verbe}</span>
                    <span className="mt-1 block text-[0.95rem] text-encre-2">{a.regard}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppelProjet bouton={`Échanger avec ${m.prenom}`} href={`/contact?avec=${m.slug}`} />
    </>
  );
}
