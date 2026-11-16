"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ECHEANCES,
  PROJETS,
  TYPES_BIEN,
  valider,
  type Erreurs,
  type TypeDemande,
} from "@/lib/demandes";

type Etat = "repos" | "envoi" | "recu" | "non-configure" | "erreur" | "frequence";

const TITRES_BOUTON: Record<TypeDemande, string> = {
  contact: "Envoyer ma demande",
  estimation: "Demander une estimation",
  recherche: "Confier ma recherche",
};

/**
 * Formulaire unique, décliné en trois variantes.
 * - validation dans le navigateur ET sur le serveur (mêmes règles) ;
 * - erreurs reliées aux champs et annoncées aux lecteurs d'écran ;
 * - confirmation affichée uniquement si le serveur a transmis la demande.
 */
export function FormulaireDemande({ type }: { type: TypeDemande }) {
  const formulaire = useRef<HTMLFormElement>(null);
  const debut = useRef(0);
  const [etat, setEtat] = useState<Etat>("repos");
  const [erreurs, setErreurs] = useState<Erreurs>({});

  // Pré-remplissage depuis l'URL (?projet=…&avec=…&bien=…), sans état React.
  useEffect(() => {
    debut.current = Date.now();
    const f = formulaire.current;
    if (!f) return;
    const p = new URLSearchParams(window.location.search);
    const projet = p.get("projet");
    if (projet) {
      const radio = f.querySelector<HTMLInputElement>(
        `input[name="projet"][value="${CSS.escape(projet)}"]`,
      );
      if (radio) radio.checked = true;
    }
    for (const cle of ["avec", "bien"] as const) {
      const champ = f.elements.namedItem(cle);
      const v = p.get(cle);
      if (champ instanceof HTMLInputElement && v) champ.value = v.slice(0, 80);
    }
  }, []);

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const brut = Object.fromEntries(new FormData(f).entries());
    const { erreurs: err } = valider({ ...brut, type });
    setErreurs(err);
    const premiere = Object.keys(err)[0];
    if (premiere) {
      setEtat("repos");
      (f.elements.namedItem(premiere) as HTMLElement | null)?.focus();
      return;
    }
    setEtat("envoi");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...brut, type, duree: Date.now() - debut.current }),
      });
      const corps = (await r.json().catch(() => ({}))) as {
        ok?: boolean;
        raison?: string;
        erreurs?: Erreurs;
      };
      if (r.ok && corps.ok) {
        f.reset();
        setEtat("recu");
      } else if (corps.raison === "non-configure") {
        setEtat("non-configure");
      } else if (corps.raison === "validation" && corps.erreurs) {
        setErreurs(corps.erreurs);
        setEtat("repos");
      } else if (corps.raison === "frequence") {
        setEtat("frequence");
      } else {
        setEtat("erreur");
      }
    } catch {
      setEtat("erreur");
    }
  }

  const champ = (nom: keyof Erreurs) => ({
    name: nom,
    id: `${type}-${nom}`,
    "aria-invalid": erreurs[nom] ? true : undefined,
    "aria-describedby": erreurs[nom] ? `${type}-${nom}-erreur` : undefined,
  });
  const erreur = (nom: keyof Erreurs) =>
    erreurs[nom] ? (
      <p id={`${type}-${nom}-erreur`} className="mt-1.5 text-[0.9rem] font-medium text-erreur">
        {erreurs[nom]}
      </p>
    ) : null;

  if (etat === "recu") {
    return (
      <div role="status" className="rounded-carte border border-succes/40 bg-craie p-8">
        <h3 className="titre-s text-succes">Votre demande nous est bien parvenue.</h3>
        <p className="mt-3 text-encre-2">
          Nous vous répondrons personnellement. Si votre demande est urgente,
          vous pouvez aussi nous appeler.
        </p>
        <button type="button" className="btn btn-ligne mt-6" onClick={() => setEtat("repos")}>
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form ref={formulaire} onSubmit={envoyer} noValidate className="space-y-6">
      <input type="hidden" name="avec" />
      <input type="hidden" name="bien" />
      {/* Pot de miel anti-robots : invisible et hors tabulation */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Ne pas remplir
          <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {type === "contact" && (
        <fieldset>
          <legend className="etiquette mb-3">Votre projet</legend>
          <div className="flex flex-wrap gap-2.5">
            {PROJETS.map((p, i) => (
              <label key={p.valeur} className="pastille">
                <input
                  type="radio"
                  name="projet"
                  value={p.valeur}
                  defaultChecked={i === PROJETS.length - 1}
                  className="sr-only"
                />
                {p.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {type !== "contact" && (
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="etiquette" htmlFor={`${type}-ville`}>
              {type === "estimation" ? "Commune du bien" : "Commune(s) recherchée(s)"}
            </label>
            <input
              type="text"
              className="champ"
              placeholder={type === "estimation" ? "Biot" : "Biot, Valbonne…"}
              autoComplete="address-level2"
              required
              {...champ("ville")}
            />
            {erreur("ville")}
          </div>
          <div>
            <label className="etiquette" htmlFor={`${type}-typeBien`}>
              Type de bien
            </label>
            <select className="champ" defaultValue={TYPES_BIEN[0]} {...champ("typeBien")}>
              {TYPES_BIEN.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          {type === "estimation" ? (
            <div>
              <label className="etiquette" htmlFor={`${type}-surface`}>
                Surface approximative <span className="font-normal text-encre-2">(m², facultatif)</span>
              </label>
              <input type="text" inputMode="numeric" className="champ" {...champ("surface")} />
              {erreur("surface")}
            </div>
          ) : (
            <div>
              <label className="etiquette" htmlFor={`${type}-budget`}>
                Budget indicatif <span className="font-normal text-encre-2">(facultatif)</span>
              </label>
              <input type="text" inputMode="numeric" className="champ" placeholder="en euros" {...champ("budget")} />
            </div>
          )}
          <div className="sm:col-span-2">
            <label className="etiquette" htmlFor={`${type}-echeance`}>
              {type === "estimation" ? "Échéance de votre projet" : "Votre calendrier"}
            </label>
            <select className="champ" defaultValue={ECHEANCES[3]} {...champ("echeance")}>
              {ECHEANCES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="etiquette" htmlFor={`${type}-nom`}>
            Votre nom
          </label>
          <input type="text" className="champ" autoComplete="name" required {...champ("nom")} />
          {erreur("nom")}
        </div>
        <div>
          <label className="etiquette" htmlFor={`${type}-email`}>
            E-mail
          </label>
          <input type="email" className="champ" autoComplete="email" inputMode="email" {...champ("email")} />
          {erreur("email")}
        </div>
        <div>
          <label className="etiquette" htmlFor={`${type}-telephone`}>
            Téléphone
          </label>
          <input type="tel" className="champ" autoComplete="tel" inputMode="tel" {...champ("telephone")} />
          {erreur("telephone")}
        </div>
        <p className="-mt-3 text-[0.88rem] text-encre-2 sm:col-span-2">
          Un seul des deux suffit : celui par lequel vous préférez être recontacté.
        </p>
        <div className="sm:col-span-2">
          <label className="etiquette" htmlFor={`${type}-message`}>
            Votre message{" "}
            {type !== "contact" && <span className="font-normal text-encre-2">(facultatif)</span>}
          </label>
          <textarea className="champ min-h-32 resize-y" rows={4} {...champ("message")} />
          {erreur("message")}
        </div>
      </div>

      <p className="text-[0.88rem] leading-relaxed text-encre-2">
        Ces informations servent uniquement à répondre à votre demande. Elles ne
        sont ni revendues ni utilisées pour de la prospection.{" "}
        <Link href="/confidentialite" className="underline underline-offset-4">
          En savoir plus sur vos données
        </Link>
        .
      </p>

      <div aria-live="polite">
        {etat === "non-configure" && (
          <p role="alert" className="rounded-champ border border-dashed border-ocre bg-ocre/10 p-4 text-[0.95rem] text-ocre-texte">
            <strong>Votre demande n’a pas été transmise.</strong> Ce formulaire
            n’est pas encore relié à la messagerie de l’agence (version de
            travail du site). Aucune donnée n’a été enregistrée.
          </p>
        )}
        {etat === "erreur" && (
          <p role="alert" className="rounded-champ border border-erreur/50 bg-craie p-4 text-[0.95rem] text-erreur">
            <strong>L’envoi n’a pas abouti.</strong> Votre message n’est pas
            perdu : vérifiez votre connexion et réessayez, ou contactez-nous par
            téléphone.
          </p>
        )}
        {etat === "frequence" && (
          <p role="alert" className="rounded-champ border border-erreur/50 bg-craie p-4 text-[0.95rem] text-erreur">
            Plusieurs demandes viennent d’être envoyées depuis votre connexion.
            Merci de patienter quelques minutes avant de réessayer.
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-plein w-full sm:w-auto" disabled={etat === "envoi"}>
        {etat === "envoi" ? "Envoi en cours…" : TITRES_BOUTON[type]}
      </button>
    </form>
  );
}
