import Link from "next/link";
import { AppelProjet, TetePage } from "@/components/blocs";
import { CarteTerritoire } from "@/components/CarteTerritoire";
import { Fleche } from "@/components/ui";
import { secteursCoeur, secteursVoisins } from "@/content/secteurs";
import { meta } from "@/lib/seo";

export const metadata = meta({
  titre: "Nos secteurs : Biot, Valbonne, Sophia Antipolis et alentours",
  description:
    "L’Agence Green Side intervient à Biot, Valbonne et Sophia Antipolis, ainsi qu’à Antibes, Villeneuve-Loubet, Cagnes-sur-Mer, Mougins, Roquefort-les-Pins et Opio.",
  chemin: "/secteurs",
});

export default function Secteurs() {
  return (
    <>
      <TetePage
        miettes={[{ href: "/secteurs", label: "Nos secteurs" }]}
        sourcil="Notre territoire"
        titre={
          <>
            D’ici. À vos <em className="italique">côtés.</em>
          </>
        }
      >
        <p>
          Notre cœur de territoire : Biot, Valbonne et Sophia Antipolis. Nous
          intervenons aussi dans les communes voisines, là où nos clients
          vivent, vendent et s’installent.
        </p>
      </TetePage>

      <section className="page grid items-start gap-12 pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-28">
        <div className="rounded-carte bg-sauge-2/70 p-5 sm:p-8">
          <CarteTerritoire />
        </div>
        <div>
          <h2 className="sourcil mb-2">Cœur de territoire</h2>
          <ul className="border-t border-encre/15">
            {secteursCoeur.map((s) => (
              <li key={s.slug} className="border-b border-encre/15">
                <Link href={`/secteurs/${s.slug}`} className="group flex items-center justify-between gap-4 py-6">
                  <span>
                    <span className="block font-display text-[2rem] leading-tight sm:text-[2.4rem]">{s.nom}</span>
                    <span className="mt-1 block text-encre-2">{s.accroche}</span>
                  </span>
                  <Fleche className="text-foret transition-transform duration-300 ease-doux group-hover:translate-x-1.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-ivoire-2" aria-labelledby="titre-voisins">
        <div className="page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <h2 id="titre-voisins" className="titre-l">
              Et dans les communes <em className="italique">voisines.</em>
            </h2>
            <p className="chapo mt-6">
              Nous accompagnons aussi des ventes et des recherches dans ces
              communes. Parlez-nous de votre projet : nous vous dirons
              franchement si nous sommes les bonnes personnes pour le mener.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-x-8 self-center border-t border-encre/15 sm:grid-cols-3">
            {secteursVoisins.map((s) => (
              <li key={s.slug} className="border-b border-encre/15 py-4 font-display text-[1.25rem]">
                {s.nom}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AppelProjet secondaire={{ href: "/vendre#estimation", label: "Faire estimer mon bien" }} />
    </>
  );
}
