import Link from "next/link";

export const metadata = { title: "Page introuvable", robots: { index: false } };

export default function Introuvable() {
  return (
    <section className="page flex min-h-[60vh] flex-col justify-center py-20">
      <p className="sourcil">Erreur 404</p>
      <h1 className="titre-xl mt-5 max-w-3xl">
        Cette adresse ne mène <em className="italique">nulle part.</em>
      </h1>
      <p className="chapo mt-6 max-w-xl">
        La page a peut-être été déplacée, ou le bien n’est plus à la vente.
        Voici où reprendre.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-plein">
          Retour à l’accueil
        </Link>
        <Link href="/biens" className="btn btn-ligne">
          Voir nos biens
        </Link>
        <Link href="/contact" className="btn btn-ligne">
          Nous contacter
        </Link>
      </div>
    </section>
  );
}
