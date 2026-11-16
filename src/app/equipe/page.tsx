import Link from "next/link";
import { AppelProjet, TetePage } from "@/components/blocs";
import { Portrait } from "@/components/Portrait";
import { Fleche, NoteValidation } from "@/components/ui";
import { PORTRAITS_A_CONFIRMER, equipe } from "@/content/equipe";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Sylvie, Laurence et Caroline | L’équipe Green Side",
  description:
    "Rencontrez Sylvie, Laurence et Caroline, les trois fondatrices de l’Agence Green Side à Biot : trois regards complémentaires sur votre projet immobilier.",
  chemin: "/equipe",
});

export default function Equipe() {
  return (
    <>
      <TetePage
        miettes={[{ href: "/equipe", label: "L’équipe" }]}
        sourcil="L’équipe"
        titre={
          <>
            Sylvie, Laurence et <em className="italique">Caroline.</em>
          </>
        }
      >
        <p>
          Trois fondatrices, originaires du même quartier de Biot. Vous
          choisissez celle avec qui vous souhaitez échanger ; toutes les trois
          connaîtront votre projet.
        </p>
      </TetePage>

      <section className="page pb-20 lg:pb-28">
        <ul className="grid gap-x-8 gap-y-16 md:grid-cols-3">
          {equipe.map((m, i) => (
            <li key={m.slug} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}>
              <article>
                <Link href={`/equipe/${m.slug}`} className="group block rounded-carte">
                  <Portrait
                    membre={m}
                    priorite
                    ratio="aspect-[4/5.2]"
                    sizes="(min-width: 768px) 30vw, 92vw"
                    className="mx-auto max-w-sm md:max-w-none"
                  />
                  <p className="sourcil mt-6">{m.role}</p>
                  <h2 className="mt-2 font-display text-[2.6rem] leading-none lg:text-[3.2rem]">{m.prenom}</h2>
                  <p className="mt-3 font-display text-[1.2rem] text-foret italic">{m.verbe}</p>
                  <p className="mt-2 text-encre-2">{m.regard}</p>
                  <span className="lien mt-5">
                    Découvrir {m.prenom} <Fleche />
                  </span>
                </Link>
              </article>
            </li>
          ))}
        </ul>
        {PORTRAITS_A_CONFIRMER && (
          <NoteValidation>
            Attribution des portraits à confirmer (photos reçues sans nom) — et séance photo homogène à prévoir : mêmes lumière, fond et cadrage pour les trois.
          </NoteValidation>
        )}
      </section>

      <section className="section bg-ivoire-2" aria-labelledby="titre-a-trois">
        <div className="page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <h2 id="titre-a-trois" className="titre-l">
            Travailler à trois, <em className="italique">vraiment.</em>
          </h2>
          <div className="chapo space-y-5">
            <p>
              Elles se connaissent depuis longtemps, se font confiance et
              partagent la même idée du service : écouter, dire les choses,
              suivre un dossier jusqu’au bout.
            </p>
            <p>
              Concrètement, vous avez une interlocutrice attitrée. Mais votre
              projet est connu des trois, et une question délicate — un prix,
              une offre, une situation familiale complexe — est toujours
              regardée à plusieurs.
            </p>
          </div>
        </div>
      </section>

      <AppelProjet />
    </>
  );
}
