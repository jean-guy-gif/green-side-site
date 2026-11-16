import Link from "next/link";
import { AppelProjet, Etapes, TetePage } from "@/components/blocs";
import { FormulaireDemande } from "@/components/FormulaireDemande";
import { LienFleche, NoteValidation } from "@/components/ui";
import { etapesAchat } from "@/content/approche";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Acheter à Biot, Valbonne et Sophia Antipolis | Agence Green Side",
  description:
    "Acheter une maison ou un appartement à Biot, Valbonne ou autour de Sophia Antipolis : une recherche qui part de votre projet de vie, des visites ciblées, un conseil sincère.",
  chemin: "/acheter",
});

const situations = [
  {
    titre: "Une famille qui s’installe",
    texte: "Écoles, trajets, place pour chacun : nous partons de votre quotidien pour savoir où et quoi chercher.",
  },
  {
    titre: "Un premier achat",
    texte: "Nous prenons le temps d’expliquer chaque étape, du financement à la signature, sans jargon.",
  },
  {
    titre: "Un logement à adapter",
    texte: "Plain-pied, accès, circulation : quand le logement doit répondre à des besoins précis, chaque critère pratique compte.",
  },
  {
    titre: "Une nouvelle étape de vie",
    texte: "Plus petit, plus simple, plus proche : changer de logement à la retraite se prépare, souvent en lien avec une vente.",
  },
  {
    titre: "Un investissement",
    texte: "Nous regardons le bien comme un futur locataire le regarderait, et nous vous disons ce que nous en pensons.",
  },
];

export default function Acheter() {
  return (
    <>
      <TetePage
        miettes={[{ href: "/acheter", label: "Acheter" }]}
        sourcil="Acheter avec Green Side"
        titre={
          <>
            Acheter, en partant de votre <em className="italique">vie.</em>
          </>
        }
        apres={
          <div className="flex flex-wrap gap-3">
            <a href="#recherche" className="btn btn-plein">
              Nous confier votre recherche
            </a>
            <Link href="/biens" className="btn btn-ligne">
              Découvrir les biens
            </Link>
          </div>
        }
      >
        <p>
          Un bon achat n’est pas forcément le bien qui vous séduit à la première
          visite. C’est celui qui correspond à votre vie, aujourd’hui et dans
          quelques années. Notre rôle est de vous aider à le reconnaître.
        </p>
      </TetePage>

      <section className="section bg-ivoire-2" aria-labelledby="titre-situations">
        <div className="page">
          <p className="sourcil mb-4">Votre projet</p>
          <h2 id="titre-situations" className="titre-l max-w-3xl">
            Chaque recherche a sa <em className="italique">raison.</em>
          </h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-carte bg-encre/15 sm:grid-cols-2 lg:grid-cols-3">
            {situations.map((s) => (
              <li key={s.titre} className="bg-ivoire-2 p-7 sm:p-8">
                <h3 className="titre-s">{s.titre}</h3>
                <p className="mt-3 text-encre-2">{s.texte}</p>
              </li>
            ))}
            <li className="flex flex-col justify-between bg-foret p-7 text-ivoire sm:p-8">
              <p className="font-display text-[1.4rem] leading-snug italic">
                Votre situation n’est pas dans cette liste ? C’est souvent le
                cas.
              </p>
              <a href="#recherche" className="sur-sombre mt-6">
                <span className="lien">Racontez-nous</span>
              </a>
            </li>
          </ul>
          <NoteValidation>Textes à valider par les fondatrices.</NoteValidation>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-accompagnement">
        <div className="page">
          <p className="sourcil mb-4">Notre accompagnement</p>
          <h2 id="titre-accompagnement" className="titre-l max-w-3xl">
            De la première écoute à la remise des <em className="italique">clés.</em>
          </h2>
          <div className="mt-12">
            <Etapes etapes={etapesAchat} />
          </div>
        </div>
      </section>

      <section id="recherche" className="section bg-rose-2/60" aria-labelledby="titre-recherche">
        <div className="page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="sourcil mb-4">Votre recherche</p>
            <h2 id="titre-recherche" className="titre-l">
              Confiez-nous votre <em className="italique">recherche.</em>
            </h2>
            <p className="chapo mt-6">
              Quelques informations suffisent pour commencer. Nous vous
              rappelons pour comprendre votre projet avant de vous proposer quoi
              que ce soit.
            </p>
            <LienFleche href="/secteurs" className="mt-8">
              Découvrir nos secteurs
            </LienFleche>
          </div>
          <div className="rounded-carte bg-ivoire p-6 sm:p-10">
            <FormulaireDemande type="recherche" />
          </div>
        </div>
      </section>

      <AppelProjet secondaire={{ href: "/equipe", label: "Rencontrer l’équipe" }} />
    </>
  );
}
