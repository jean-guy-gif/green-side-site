import Image from "next/image";
import Link from "next/link";
import {
  LIBELLE_STATUT,
  LIBELLE_TYPE,
  euros,
  nombre,
  type Bien,
  type ClasseEnergie,
} from "@/content/biens";

const TONS: Record<Bien["type"], { fond: string; trait: string }> = {
  maison: { fond: "#DCE1D6", trait: "#35584B" },
  appartement: { fond: "#ECE1DD", trait: "#7A5820" },
  terrain: { fond: "#EEE9DF", trait: "#35584B" },
};

/** Visuel de remplacement quand un bien n'a pas (encore) de photo autorisée. */
export function VisuelBien({ bien, className = "" }: { bien: Bien; className?: string }) {
  const photo = bien.photos[0];
  if (photo) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
    );
  }
  const t = TONS[bien.type];
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: t.fond }} aria-hidden="true">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" fill="none" stroke={t.trait} strokeWidth="1.2" strokeOpacity="0.45">
        <path d="M-10 240c70-30 130-26 200-6s130 18 220-14" />
        <path d="M-10 265c80-24 150-20 210-4s120 12 210-12" />
        {bien.type === "maison" && <path d="M150 215v-62l50-38 50 38v62M185 215v-34h30v34" />}
        {bien.type === "appartement" && (
          <path d="M160 215V100h80v115M178 122h14m16 0h14M178 150h14m16 0h14M178 178h14m16 0h14" />
        )}
        {bien.type === "terrain" && (
          <path d="M120 200h160M200 200v-70m0 26c-14-4-22-14-24-28m24 14c12-5 20-14 22-27" />
        )}
      </svg>
    </div>
  );
}

const COULEURS_ENERGIE: Record<ClasseEnergie, string> = {
  A: "#2E8B57",
  B: "#58A63C",
  C: "#A6C63A",
  D: "#EFD729",
  E: "#F0A72B",
  F: "#E5722A",
  G: "#D4302B",
};
const TEXTE_SOMBRE: ClasseEnergie[] = ["C", "D", "E"];

export function EtiquetteEnergie({ sigle, classe }: { sigle: "DPE" | "GES"; classe: ClasseEnergie }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.85rem] font-medium">
      <span className="text-encre-2">{sigle}</span>
      <span
        className="inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 font-bold"
        style={{
          background: COULEURS_ENERGIE[classe],
          color: TEXTE_SOMBRE.includes(classe) ? "#1F342C" : "#fff",
        }}
      >
        <span className="sr-only">classe </span>
        {classe}
      </span>
    </span>
  );
}

export function resumeBien(b: Bien) {
  return [
    b.type === "terrain" ? `${nombre(b.surface)} m² de terrain` : `${nombre(b.surface)} m²`,
    b.pieces > 0 ? `${b.pieces} pièce${b.pieces > 1 ? "s" : ""}` : null,
    b.chambres > 0 ? `${b.chambres} chambre${b.chambres > 1 ? "s" : ""}` : null,
  ].filter(Boolean) as string[];
}

export function CarteBien({ bien }: { bien: Bien }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative">
        <VisuelBien bien={bien} className="aspect-[4/3] rounded-carte" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {bien.demo && (
            <span className="rounded-full bg-nuit px-3 py-1 text-[0.72rem] font-semibold tracking-wide text-ivoire uppercase">
              Exemple fictif
            </span>
          )}
          {bien.statut !== "disponible" && (
            <span className="rounded-full bg-craie px-3 py-1 text-[0.78rem] font-semibold text-ocre-texte">
              {LIBELLE_STATUT[bien.statut]}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <p className="sourcil !tracking-[0.12em]">
          {LIBELLE_TYPE[bien.type]} · {bien.commune}
        </p>
        <h3 className="titre-s mt-2">
          <Link href={`/biens/${bien.slug}`} className="after:absolute after:inset-0 after:rounded-carte hover:text-foret">
            {bien.titre}
          </Link>
        </h3>
        <p className="mt-2 text-[0.95rem] text-encre-2">{resumeBien(bien).join(" · ")}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="font-display text-[1.45rem] leading-none">
            {euros(bien.prix)}
            <span className="mt-1.5 block font-sans text-[0.78rem] text-encre-2">
              Honoraires à la charge {bien.honoraires.charge === "vendeur" ? "du vendeur" : "de l’acquéreur"}
            </span>
          </p>
          {bien.energie && <EtiquetteEnergie sigle="DPE" classe={bien.energie.dpe} />}
        </div>
      </div>
    </article>
  );
}
