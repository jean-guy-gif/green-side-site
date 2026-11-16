import Link from "next/link";
import { AppelProjet, TetePage } from "@/components/blocs";
import { ExplorateurBiens } from "@/components/ExplorateurBiens";
import { getBiens } from "@/content/biens";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Biens à vendre à Biot, Valbonne et Sophia Antipolis",
  description:
    "Maisons, villas, appartements et terrains à vendre à Biot, Valbonne, autour de Sophia Antipolis et dans les communes voisines, présentés par l’Agence Green Side.",
  chemin: "/biens",
});

export default function Biens() {
  const biens = getBiens();
  const demo = biens.some((b) => b.demo);

  return (
    <>
      <TetePage
        miettes={[{ href: "/biens", label: "Nos biens" }]}
        sourcil="Nos biens"
        titre={
          <>
            Des lieux de vie, à Biot et <em className="italique">autour.</em>
          </>
        }
      >
        <p>
          Maisons et villas, appartements, terrains, biens destinés à
          l’investissement locatif : chaque annonce est présentée avec ses
          informations complètes.
        </p>
      </TetePage>

      <section className="page pb-20 lg:pb-28">
        {demo && (
          <p className="mb-8 rounded-carte border border-dashed border-ocre bg-ocre/10 p-5 text-[0.95rem] text-ocre-texte">
            <strong>Mode démonstration.</strong> Les biens ci-dessous sont des
            exemples fictifs, destinés à tester la recherche et la présentation.
            Ils ne sont pas à vendre et disparaîtront à la mise en production.
          </p>
        )}
        {biens.length > 0 ? (
          <ExplorateurBiens biens={biens} />
        ) : (
          <div className="rounded-carte bg-ivoire-2 p-8 sm:p-14">
            <h2 className="titre-m">Nos annonces arrivent ici très bientôt.</h2>
            <p className="mt-4 max-w-xl text-encre-2">
              En attendant, parlez-nous de ce que vous cherchez : nous vous
              répondrons personnellement.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/acheter#recherche" className="btn btn-plein">
                Nous confier votre recherche
              </Link>
              <Link href="/vendre" className="btn btn-ligne">
                Vendre avec Green Side
              </Link>
            </div>
          </div>
        )}
      </section>

      <AppelProjet
        titre={
          <>
            Vous ne trouvez pas ce que vous <em className="italique">cherchez ?</em>
          </>
        }
        texte="Décrivez-nous votre projet : nous reviendrons vers vous dès qu’un bien correspond."
        href="/acheter#recherche"
        bouton="Nous confier votre recherche"
      />
    </>
  );
}
