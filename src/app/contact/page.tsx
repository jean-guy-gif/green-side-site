import Link from "next/link";
import { TetePage } from "@/components/blocs";
import { FormulaireDemande } from "@/components/FormulaireDemande";
import { Portrait } from "@/components/Portrait";
import { ACompleter, Valeur } from "@/components/ui";
import { equipe } from "@/content/equipe";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({
  titre: "Contact : parlons de votre projet immobilier",
  description:
    "Contactez l’Agence Green Side pour vendre, acheter ou faire estimer un bien à Biot, Valbonne ou autour de Sophia Antipolis. Un premier échange sans engagement.",
  chemin: "/contact",
});

export default function Contact() {
  return (
    <>
      <TetePage
        miettes={[{ href: "/contact", label: "Contact" }]}
        sourcil="Contact"
        titre={
          <>
            Parlons de votre <em className="italique">projet.</em>
          </>
        }
      >
        <p>
          Dites-nous simplement ce qui vous amène. L’une de nous vous répond
          personnellement — et si nous ne sommes pas les bonnes personnes pour
          votre projet, nous vous le dirons.
        </p>
      </TetePage>

      <section className="page grid gap-12 pb-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:pb-28">
        <div className="rounded-carte bg-ivoire-2 p-6 sm:p-10">
          <h2 className="titre-m mb-8">Votre demande</h2>
          <FormulaireDemande type="contact" />
        </div>

        <aside className="space-y-10">
          <div>
            <h2 className="sourcil mb-4">Nous joindre</h2>
            <dl className="space-y-5">
              <div>
                <dt className="text-[0.9rem] text-encre-2">Téléphone</dt>
                <dd className="font-display text-[1.6rem]">
                  {site.telephone ? (
                    <a href={`tel:${site.telephone.replace(/\s/g, "")}`}>{site.telephone}</a>
                  ) : (
                    <ACompleter quoi="téléphone" />
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[0.9rem] text-encre-2">E-mail</dt>
                <dd className="font-display text-[1.6rem] break-words">
                  {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <ACompleter quoi="e-mail" />}
                </dd>
              </div>
              <div>
                <dt className="text-[0.9rem] text-encre-2">Adresse</dt>
                <dd className="mt-1">
                  {site.adresse ? (
                    <>
                      {site.adresse.rue}
                      <br />
                      {site.adresse.codePostal} {site.adresse.ville}
                    </>
                  ) : (
                    <ACompleter quoi="adresse et statut exact du bureau (accueil du public ou sur rendez-vous)" />
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[0.9rem] text-encre-2">Horaires</dt>
                <dd className="mt-1">
                  <Valeur valeur={site.horaires} quoi="horaires ou « sur rendez-vous »" />
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="sourcil mb-4">Vos interlocutrices</h2>
            <ul className="grid grid-cols-3 gap-4">
              {equipe.map((m) => (
                <li key={m.slug}>
                  <Link href={`/equipe/${m.slug}`} className="group block rounded-carte">
                    <Portrait membre={m} sizes="(min-width: 1024px) 10vw, 28vw" />
                    <span className="mt-2.5 block font-display text-[1.2rem]">{m.prenom}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-[0.92rem] text-encre-2">
            Vous souhaitez une estimation ?{" "}
            <Link href="/vendre#estimation" className="underline underline-offset-4">
              Le formulaire dédié
            </Link>{" "}
            nous donne l’essentiel pour préparer notre échange.
          </p>
        </aside>
      </section>
    </>
  );
}
