import { TetePage } from "@/components/blocs";
import { ACompleter, Valeur } from "@/components/ui";
import { meta } from "@/lib/seo";
import { EST_DEMO, site } from "@/lib/site";

export const metadata = meta({
  titre: "Confidentialité et données personnelles",
  description:
    "Comment l’Agence Green Side utilise les informations que vous lui confiez via ce site, et comment exercer vos droits.",
  chemin: "/confidentialite",
});

export default function Confidentialite() {
  return (
    <>
      <TetePage
        miettes={[{ href: "/confidentialite", label: "Confidentialité" }]}
        titre="Vos données personnelles"
      >
        <p>
          Nous ne vous demandons que les informations nécessaires pour vous
          répondre, et nous ne les utilisons que pour cela.
        </p>
      </TetePage>

      <section className="page max-w-4xl pb-20 lg:pb-28">
        {EST_DEMO && (
          <p className="a-completer mb-10 !block p-4">
            Politique à faire valider par l’agence ou son conseil avant mise en ligne (bases juridiques, durées de conservation, sous-traitants réellement utilisés).
          </p>
        )}
        <div className="prose-gs max-w-2xl text-encre-2">
          <h2 className="!mt-0 !text-encre">Qui est responsable de vos données ?</h2>
          <p>
            <Valeur valeur={site.legal.raisonSociale} quoi="raison sociale et adresse du responsable de traitement" />, qui édite ce site sous la marque {site.nom}.
          </p>

          <h2 className="!text-encre">Quelles informations recueillons-nous ?</h2>
          <ul>
            <li>Ce que vous saisissez dans nos formulaires : votre nom, votre e-mail ou votre téléphone, votre message.</li>
            <li>Pour une estimation ou une recherche : la commune, le type de bien, et si vous le souhaitez la surface, le budget et votre calendrier.</li>
          </ul>
          <p>
            Nous ne demandons aucune information sensible. Évitez d’en indiquer
            dans le champ « message ».
          </p>

          <h2 className="!text-encre">À quoi servent-elles ?</h2>
          <p>
            Uniquement à répondre à votre demande et à assurer le suivi de
            votre projet si vous décidez de nous le confier. Elles ne sont ni
            vendues ni cédées, et ne servent pas à de la prospection sans votre
            accord.
          </p>
          <p>
            Base juridique : <ACompleter quoi="à confirmer — mesures précontractuelles prises à votre demande (art. 6.1.b RGPD) ou intérêt légitime (art. 6.1.f)" />
          </p>

          <h2 className="!text-encre">Qui y a accès ?</h2>
          <p>
            Les trois fondatrices de l’agence, et nos prestataires techniques
            pour les seuls besoins de l’hébergement et de l’acheminement des
            messages : <ACompleter quoi="liste des sous-traitants réellement utilisés (hébergeur, messagerie, CRM) et pays de traitement" />
          </p>

          <h2 className="!text-encre">Combien de temps sont-elles conservées ?</h2>
          <p>
            <ACompleter quoi="durées de conservation (demandes sans suite, dossiers clients)" />
          </p>

          <h2 className="!text-encre">Quels sont vos droits ?</h2>
          <p>
            Vous pouvez demander l’accès à vos données, leur rectification, leur
            effacement, la limitation de leur traitement, vous y opposer ou en
            demander la portabilité. Écrivez-nous :{" "}
            <Valeur valeur={site.email} quoi="adresse e-mail de contact pour l’exercice des droits" />.
          </p>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            adresser une réclamation à la CNIL :{" "}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
              www.cnil.fr
            </a>
            .
          </p>

          <h2 className="!text-encre">Cookies et mesure d’audience</h2>
          <p>
            Ce site ne dépose aucun cookie publicitaire et n’utilise aucun
            traceur soumis à votre consentement. C’est pourquoi aucun bandeau
            ne vous est présenté. Les polices de caractères sont hébergées sur
            notre propre site : aucune requête n’est envoyée à un service tiers
            pour les afficher.
          </p>
          <p>
            Si un outil de mesure d’audience est ajouté plus tard, cette page
            sera mise à jour et votre accord vous sera demandé lorsque la
            réglementation l’exige.
          </p>
        </div>
      </section>
    </>
  );
}
