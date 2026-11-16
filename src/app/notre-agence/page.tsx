import Link from "next/link";
import { AppelProjet, TetePage } from "@/components/blocs";
import { Portrait } from "@/components/Portrait";
import { EmplacementPhoto, LienFleche, NoteValidation } from "@/components/ui";
import { valeurs } from "@/content/approche";
import { equipe } from "@/content/equipe";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Notre agence : une histoire née à Biot",
  description:
    "Green Side, c’est le nom d’un quartier de Biot et l’histoire de trois femmes qui se connaissent depuis longtemps. Découvrez notre façon de travailler.",
  chemin: "/notre-agence",
});

export default function NotreAgence() {
  return (
    <>
      <TetePage
        miettes={[{ href: "/notre-agence", label: "L’agence" }]}
        sourcil="L’agence"
        titre={
          <>
            Une agence née d’un quartier de <em className="italique">Biot.</em>
          </>
        }
      >
        <p>
          Green Side, c’est d’abord un lieu : le quartier de Biot dont Sylvie,
          Laurence et Caroline sont originaires. C’est aussi une façon de voir
          notre métier — proche de la nature des lieux, et de celles et ceux qui
          y vivent.
        </p>
      </TetePage>

      <section className="page grid items-start gap-12 pb-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:pb-28">
        <EmplacementPhoto legende="le quartier de Biot, ou une photo de groupe des trois fondatrices" className="aspect-[4/5] w-full max-w-md" />
        <div className="prose-gs max-w-xl lg:pt-10">
          <h2>Un nom, un quartier</h2>
          <p>
            Le nom de l’agence fait référence au quartier de Biot où tout a
            commencé pour ses trois fondatrices. Il évoque aussi la nature et
            notre métier : aider des personnes à trouver, ou à transmettre, un
            lieu de vie.
          </p>
          <h2>Trois femmes qui se connaissent depuis longtemps</h2>
          <p>
            Sylvie, Laurence et Caroline partagent une longue histoire commune
            et une grande confiance réciproque. Elles fonctionnent en véritable
            équipe : les dossiers se discutent à trois, les décisions difficiles
            aussi.
          </p>
          <p>
            Cette complémentarité n’est pas un argument commercial : c’est
            leur manière habituelle de travailler.
          </p>
          <NoteValidation>
            Récit à compléter avec les fondatrices (origine exacte du nom, création de l’agence). Aucune date ni durée d’expérience n’est affichée tant qu’elle n’est pas confirmée.
          </NoteValidation>
        </div>
      </section>

      <section className="section bg-ivoire-2" aria-labelledby="titre-conviction">
        <div className="page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="sourcil mb-4">Notre conviction</p>
            <h2 id="titre-conviction" className="titre-l">
              Un agent immobilier doit être <em className="italique">utile.</em>
            </h2>
          </div>
          <div className="chapo space-y-5">
            <p>
              L’image des professionnels de l’immobilier n’est pas toujours
              bonne, et nous comprenons pourquoi. Notre ambition est simple :
              montrer, dossier après dossier, ce qu’un accompagnement honnête
              change réellement dans une vente ou un achat.
            </p>
            <p>
              Nous préférons être recommandées par des clients satisfaits plutôt
              que connues pour nos promesses.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-valeurs">
        <div className="page">
          <p className="sourcil mb-4">Nos valeurs</p>
          <h2 id="titre-valeurs" className="titre-l max-w-3xl">
            Ce que nos valeurs changent <em className="italique">pour vous.</em>
          </h2>
          <dl className="mt-12 border-t border-encre/15">
            {valeurs.map((v) => (
              <div key={v.nom} className="grid gap-2 border-b border-encre/15 py-7 sm:grid-cols-[1fr_1.6fr] sm:gap-10">
                <dt className="font-display text-[1.6rem] leading-tight">{v.nom}</dt>
                <dd className="text-encre-2 sm:pt-1.5">{v.effet}</dd>
              </div>
            ))}
          </dl>
          <NoteValidation>Formulations à valider par les fondatrices.</NoteValidation>
        </div>
      </section>

      <section className="section bg-sauge-2/70" aria-labelledby="titre-rencontre">
        <div className="page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="titre-rencontre" className="titre-l">
              Celles qui vous <em className="italique">accompagnent.</em>
            </h2>
            <LienFleche href="/equipe">Rencontrer l’équipe</LienFleche>
          </div>
          <ul className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
            {equipe.map((m) => (
              <li key={m.slug}>
                <Link href={`/equipe/${m.slug}`} className="group block rounded-carte">
                  <Portrait membre={m} sizes="(min-width: 1024px) 28vw, 30vw" />
                  <span className="mt-4 block font-display text-[1.3rem] sm:text-[2rem]">{m.prenom}</span>
                  <span className="block text-[0.85rem] text-encre-2 sm:text-base">{m.verbe}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppelProjet />
    </>
  );
}
