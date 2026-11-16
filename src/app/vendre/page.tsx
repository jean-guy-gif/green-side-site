import Link from "next/link";
import { AppelProjet, Etapes, TetePage } from "@/components/blocs";
import { FormulaireDemande } from "@/components/FormulaireDemande";
import { ACompleter, LienFleche, NoteValidation } from "@/components/ui";
import { etapesVente } from "@/content/approche";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Vendre votre bien à Biot et Valbonne | Agence Green Side",
  description:
    "Vendre à Biot, Valbonne ou autour de Sophia Antipolis : une estimation expliquée, une stratégie de vente écrite et un suivi transparent jusqu’à la signature.",
  chemin: "/vendre",
});

const testPrix = [
  {
    titre: "Nous vous donnons notre estimation",
    texte: "Argumentée, avec ce qui la justifie. Nous ne gonflons pas un prix pour obtenir un mandat.",
  },
  {
    titre: "Vous souhaitez tenter plus haut",
    texte: "C’est votre bien et votre décision. Nous pouvons convenir d’une période de test, à un prix et pour une durée fixés ensemble.",
  },
  {
    titre: "Des points de suivi sont prévus par écrit",
    texte: "Nombre de contacts, de visites, retours des acquéreurs : nous regardons ensemble ce que dit le marché.",
  },
  {
    titre: "Le prix est réévalué à la date convenue",
    texte: "Si le marché ne suit pas, nous ajustons comme prévu. Sans surprise, parce que c’était écrit dès le départ.",
  },
];

export default function Vendre() {
  return (
    <>
      <TetePage
        miettes={[{ href: "/vendre", label: "Vendre" }]}
        sourcil="Vendre avec Green Side"
        titre={
          <>
            Vendre, avec une stratégie <em className="italique">claire.</em>
          </>
        }
        apres={
          <div className="flex flex-wrap gap-3">
            <a href="#estimation" className="btn btn-plein">
              Faire estimer mon bien
            </a>
            <a href="#methode" className="btn btn-ligne">
              Voir notre méthode
            </a>
          </div>
        }
      >
        <p>
          Une vente réussie ne tient pas à une promesse de prix. Elle tient à
          une estimation juste, à un plan adapté à votre bien et à un suivi qui
          ne vous laisse jamais sans nouvelles.
        </p>
      </TetePage>

      <section id="methode" className="section bg-ivoire-2" aria-labelledby="titre-methode">
        <div className="page">
          <p className="sourcil mb-4">Notre méthode</p>
          <h2 id="titre-methode" className="titre-l max-w-3xl">
            Sept étapes, de la première rencontre à la <em className="italique">signature.</em>
          </h2>
          <div className="mt-12">
            <Etapes etapes={etapesVente} />
          </div>
          <NoteValidation>Descriptions des étapes à valider par les fondatrices.</NoteValidation>
        </div>
      </section>

      <section className="section" aria-labelledby="titre-prix">
        <div className="page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="sourcil mb-4">Le prix</p>
            <h2 id="titre-prix" className="titre-l">
              Et si votre prix n’est pas <em className="italique">le nôtre ?</em>
            </h2>
            <p className="chapo mt-6">
              Cela arrive souvent, et c’est normal : vous connaissez votre bien
              mieux que personne. Plutôt que de vous dire ce que vous voulez
              entendre, nous vous proposons un cadre.
            </p>
            <p className="mt-6 font-medium">
              Ce que nous ne ferons pas : promettre de vendre à n’importe quel
              prix.
            </p>
          </div>
          <ol className="space-y-4">
            {testPrix.map((e, i) => (
              <li key={e.titre} className="grid grid-cols-[3rem_1fr] gap-4 rounded-carte bg-craie p-6 sm:p-8">
                <span className="font-display text-[1.6rem] leading-none text-ocre-texte italic" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="titre-s">{e.titre}</h3>
                  <p className="mt-2 text-encre-2">{e.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sur-sombre section bg-nuit text-ivoire" aria-labelledby="titre-suivi">
        <div className="page grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="sourcil mb-4">Le suivi</p>
            <h2 id="titre-suivi" className="titre-l">
              Vous savez toujours où en est votre <em className="italique">vente.</em>
            </h2>
          </div>
          <div className="chapo space-y-5">
            <p>
              Un vendeur sans nouvelles imagine le pire. Nous vous tenons
              informé régulièrement, que le bien ait été visité ou non, avec les
              retours des acquéreurs tels qu’ils sont.
            </p>
            <p>
              La vérité, même quand elle dérange, vous permet de décider. C’est
              à cela que sert un suivi.
            </p>
            <p>
              <ACompleter quoi="rythme et forme des points de suivi (appel, e-mail, compte rendu écrit…)" />
            </p>
          </div>
        </div>
      </section>

      <section id="estimation" className="section" aria-labelledby="titre-estimation">
        <div className="page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="sourcil mb-4">Estimation</p>
            <h2 id="titre-estimation" className="titre-l">
              Faire estimer votre <em className="italique">bien.</em>
            </h2>
            <div className="chapo mt-6 space-y-4">
              <p>
                Pas d’estimation automatique ici : un chiffre calculé sans voir
                le bien ne vaut pas grand-chose. Dites-nous l’essentiel, nous
                vous recontactons pour convenir d’une visite.
              </p>
            </div>
            <p className="mt-6 text-[0.95rem] text-encre-2">
              Nos honoraires sont consultables à tout moment :{" "}
              <Link href="/honoraires" className="underline underline-offset-4">
                barème d’honoraires
              </Link>
              .
            </p>
            <LienFleche href="/secteurs" className="mt-6">
              Nos secteurs d’intervention
            </LienFleche>
          </div>
          <div className="rounded-carte bg-ivoire-2 p-6 sm:p-10">
            <FormulaireDemande type="estimation" />
          </div>
        </div>
      </section>

      <AppelProjet
        titre={
          <>
            Une question avant de vous <em className="italique">décider ?</em>
          </>
        }
        texte="Succession, séparation, déménagement, simple réflexion : chaque situation est différente. Parlons-en simplement."
        secondaire={{ href: "/equipe", label: "Rencontrer l’équipe" }}
      />
    </>
  );
}
