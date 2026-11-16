"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CarteBien } from "@/components/CarteBien";
import { LIBELLE_TYPE, type Bien, type TypeBien } from "@/content/biens";

type Filtres = {
  commune: string;
  type: "" | TypeBien;
  budget: string;
  surface: string;
  pieces: string;
  jardin: boolean;
  terrasse: boolean;
  stationnement: boolean;
  tri: "recent" | "prix-asc" | "prix-desc" | "surface";
};
const VIDE: Filtres = {
  commune: "",
  type: "",
  budget: "",
  surface: "",
  pieces: "",
  jardin: false,
  terrasse: false,
  stationnement: false,
  tri: "recent",
};

const BUDGETS = [200000, 300000, 400000, 500000, 750000, 1000000];
const SURFACES = [30, 50, 80, 100, 150];

function depuisUrl(): Filtres {
  const p = new URLSearchParams(window.location.search);
  const type = p.get("type");
  const tri = p.get("tri");
  return {
    commune: p.get("commune") ?? "",
    type: type === "maison" || type === "appartement" || type === "terrain" ? type : "",
    budget: p.get("budget") ?? "",
    surface: p.get("surface") ?? "",
    pieces: p.get("pieces") ?? "",
    jardin: p.has("jardin"),
    terrasse: p.has("terrasse"),
    stationnement: p.has("stationnement"),
    tri: tri === "prix-asc" || tri === "prix-desc" || tri === "surface" ? tri : "recent",
  };
}
function versUrl(f: Filtres) {
  const p = new URLSearchParams();
  for (const [cle, v] of Object.entries(f)) {
    if (v === true) p.set(cle, "1");
    else if (typeof v === "string" && v && !(cle === "tri" && v === "recent")) p.set(cle, v);
  }
  const q = p.toString();
  return q ? `?${q}` : window.location.pathname;
}

/**
 * Grille de biens filtrable.
 * - Le serveur rend TOUS les biens dans le HTML (indexable, lisible sans script).
 * - Les filtres s'appliquent dans le navigateur et se reflètent dans l'URL
 *   (partage, retour arrière). L'adresse canonique reste /biens : les
 *   combinaisons de filtres ne créent pas de pages indexables (brief §8).
 */
export function ExplorateurBiens({ biens }: { biens: Bien[] }) {
  const [f, setF] = useState<Filtres>(VIDE);
  const [pret, setPret] = useState(false);

  useEffect(() => {
    // Lecture unique de l'URL au chargement (état externe au rendu serveur).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setF(depuisUrl());
    setPret(true);
  }, []);
  useEffect(() => {
    if (pret) window.history.replaceState(null, "", versUrl(f));
  }, [f, pret]);

  const communes = useMemo(() => [...new Set(biens.map((b) => b.commune))].sort(), [biens]);

  const resultats = useMemo(() => {
    const liste = biens.filter(
      (b) =>
        (!f.commune || b.commune === f.commune) &&
        (!f.type || b.type === f.type) &&
        (!f.budget || b.prix <= Number(f.budget)) &&
        (!f.surface || b.surface >= Number(f.surface)) &&
        (!f.pieces || b.pieces >= Number(f.pieces)) &&
        (!f.jardin || b.exterieurs.includes("jardin")) &&
        (!f.terrasse || b.exterieurs.includes("terrasse") || b.exterieurs.includes("balcon")) &&
        (!f.stationnement || b.stationnement),
    );
    const tris: Record<Filtres["tri"], (a: Bien, b: Bien) => number> = {
      recent: (a, b) => b.datePublication.localeCompare(a.datePublication),
      "prix-asc": (a, b) => a.prix - b.prix,
      "prix-desc": (a, b) => b.prix - a.prix,
      surface: (a, b) => b.surface - a.surface,
    };
    return liste.sort(tris[f.tri]);
  }, [biens, f]);

  const actifs = Object.entries(f).filter(([c, v]) => c !== "tri" && v).length;
  const maj = <K extends keyof Filtres>(cle: K, v: Filtres[K]) => setF((x) => ({ ...x, [cle]: v }));

  return (
    <div>
      <form
        aria-label="Filtrer les biens"
        className="rounded-carte border border-sauge/60 bg-craie p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className="etiquette" htmlFor="f-commune">Commune</label>
            <select id="f-commune" className="champ" value={f.commune} onChange={(e) => maj("commune", e.target.value)}>
              <option value="">Toutes</option>
              {communes.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="etiquette" htmlFor="f-type">Type de bien</label>
            <select id="f-type" className="champ" value={f.type} onChange={(e) => maj("type", e.target.value as Filtres["type"])}>
              <option value="">Tous</option>
              {(Object.keys(LIBELLE_TYPE) as TypeBien[]).map((t) => (
                <option key={t} value={t}>{LIBELLE_TYPE[t]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="etiquette" htmlFor="f-budget">Budget maximum</label>
            <select id="f-budget" className="champ" value={f.budget} onChange={(e) => maj("budget", e.target.value)}>
              <option value="">Indifférent</option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>{new Intl.NumberFormat("fr-FR").format(b)} €</option>
              ))}
            </select>
          </div>
          <div>
            <label className="etiquette" htmlFor="f-surface">Surface minimum</label>
            <select id="f-surface" className="champ" value={f.surface} onChange={(e) => maj("surface", e.target.value)}>
              <option value="">Indifférente</option>
              {SURFACES.map((s) => <option key={s} value={s}>{s} m²</option>)}
            </select>
          </div>
          <div>
            <label className="etiquette" htmlFor="f-pieces">Pièces minimum</label>
            <select id="f-pieces" className="champ" value={f.pieces} onChange={(e) => maj("pieces", e.target.value)}>
              <option value="">Indifférent</option>
              {[2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} pièces et plus</option>)}
            </select>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {(["jardin", "terrasse", "stationnement"] as const).map((c) => (
            <label key={c} className="pastille">
              <input type="checkbox" className="sr-only" checked={f[c]} onChange={(e) => maj(c, e.target.checked)} />
              {c === "jardin" ? "Jardin" : c === "terrasse" ? "Terrasse ou balcon" : "Stationnement"}
            </label>
          ))}
          {actifs > 0 && (
            <button type="button" className="lien ml-auto min-h-11" onClick={() => setF({ ...VIDE, tri: f.tri })}>
              Effacer les filtres ({actifs})
            </button>
          )}
        </div>
      </form>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p role="status" aria-live="polite" className="font-medium">
          {resultats.length === 0
            ? "Aucun bien ne correspond"
            : `${resultats.length} bien${resultats.length > 1 ? "s" : ""}`}
        </p>
        <div className="flex items-center gap-3">
          <label htmlFor="f-tri" className="text-[0.92rem] text-encre-2">Trier par</label>
          <select id="f-tri" className="champ !min-h-11 !w-auto" value={f.tri} onChange={(e) => maj("tri", e.target.value as Filtres["tri"])}>
            <option value="recent">Plus récents</option>
            <option value="prix-asc">Prix croissant</option>
            <option value="prix-desc">Prix décroissant</option>
            <option value="surface">Surface</option>
          </select>
        </div>
      </div>

      {resultats.length > 0 ? (
        <ul className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {resultats.map((b) => (
            <li key={b.id}><CarteBien bien={b} /></li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-carte bg-ivoire-2 p-8 sm:p-12">
          <h2 className="titre-m">Aucun bien ne correspond à ces critères pour le moment.</h2>
          <p className="mt-3 max-w-xl text-encre-2">
            Élargissez la recherche, ou confiez-nous vos critères : nous
            reviendrons vers vous dès qu’un bien correspond.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" className="btn btn-ligne" onClick={() => setF(VIDE)}>
              Effacer les filtres
            </button>
            <Link href="/acheter#recherche" className="btn btn-plein">Nous confier votre recherche</Link>
          </div>
        </div>
      )}
    </div>
  );
}
