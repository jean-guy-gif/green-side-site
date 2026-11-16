import Link from "next/link";
import { secteurs } from "@/content/secteurs";

/**
 * Carte schématique du territoire : les points sont placés à partir des
 * coordonnées réelles des communes (positions relatives justes), sans fond de
 * carte ni adresse d'agence. Les trois secteurs cœur sont des liens.
 */
const L = 640;
const H = 400;
const MARGE = { x: 110, y: 60 };

const lons = secteurs.map((s) => s.lon);
const lats = secteurs.map((s) => s.lat);
const [lonMin, lonMax] = [Math.min(...lons), Math.max(...lons)];
const [latMin, latMax] = [Math.min(...lats), Math.max(...lats)];
// Correction de longitude à cette latitude pour garder les proportions.
const K = Math.cos((43.63 * Math.PI) / 180);
const echelle = Math.min(
  (L - 2 * MARGE.x) / ((lonMax - lonMin) * K),
  (H - 2 * MARGE.y) / (latMax - latMin),
);
const largeurUtile = (lonMax - lonMin) * K * echelle;
const hauteurUtile = (latMax - latMin) * echelle;
const x = (lon: number) => (L - largeurUtile) / 2 + (lon - lonMin) * K * echelle;
const y = (lat: number) => (H - hauteurUtile) / 2 + (latMax - lat) * echelle;

/** Côté d'ancrage des étiquettes pour éviter les chevauchements. */
const ANCRAGE: Record<string, "g" | "d" | "h" | "b"> = {
  biot: "d",
  valbonne: "g",
  "sophia-antipolis": "b",
  antibes: "d",
  "villeneuve-loubet": "b",
  "cagnes-sur-mer": "d",
  mougins: "g",
  "roquefort-les-pins": "h",
  opio: "g",
};

export function CarteTerritoire({ sombre = false }: { sombre?: boolean }) {
  const trait = sombre ? "#B4BEAE" : "#35584B";
  const texte = sombre ? "#F6F3ED" : "#283831";
  const coeur = secteurs.filter((s) => s.rang === "coeur");
  const polygone = coeur.map((s) => `${x(s.lon)},${y(s.lat)}`).join(" ");

  return (
    <figure>
      <svg
        viewBox={`0 0 ${L} ${H}`}
        className="h-auto w-full"
        role="group"
        aria-labelledby="carte-titre"
        aria-describedby="carte-desc"
      >
        <title id="carte-titre">Carte schématique de notre territoire</title>
        <desc id="carte-desc">
          Biot, Valbonne et Sophia Antipolis au centre ; autour : Antibes,
          Villeneuve-Loubet, Cagnes-sur-Mer, Mougins, Roquefort-les-Pins et Opio.
        </desc>

        {/* Trame de courbes : évoque le relief, sans prétendre à l'exactitude */}
        <g fill="none" stroke={trait} strokeOpacity="0.14" strokeWidth="1">
          <path d="M0 70c120-30 210 20 330 0s200-40 310-10" />
          <path d="M0 150c140-40 230 30 350 5s190-35 290-5" />
          <path d="M0 240c130-25 240 25 360 0s180-30 280-10" />
          <path d="M0 325c150-30 250 20 370 0s170-25 270-5" />
        </g>
        <text x={L - 18} y={H - 16} textAnchor="end" fontSize="12" letterSpacing="3" fill={trait} fillOpacity="0.7" fontStyle="italic">
          MÉDITERRANÉE
        </text>

        {/* Le cœur de territoire */}
        <polygon points={polygone} fill={trait} fillOpacity="0.1" stroke={trait} strokeOpacity="0.5" strokeDasharray="3 5" />

        {secteurs.map((s) => {
          const cx = x(s.lon);
          const cy = y(s.lat);
          const estCoeur = s.rang === "coeur";
          const a = ANCRAGE[s.slug] ?? "d";
          const dx = a === "d" ? 14 : a === "g" ? -14 : 0;
          const dy = a === "h" ? -16 : a === "b" ? 26 : 5;
          const anchor = a === "d" ? "start" : a === "g" ? "end" : "middle";
          const etiquette = (
            <>
              {estCoeur && <circle cx={cx} cy={cy} r="13" fill="#B5873F" fillOpacity="0.22" />}
              <circle cx={cx} cy={cy} r={estCoeur ? 6 : 4} fill={estCoeur ? "#B5873F" : trait} />
              <text
                x={cx + dx}
                y={cy + dy}
                textAnchor={anchor}
                fill={texte}
                fontSize={estCoeur ? 21 : 14}
                fontFamily={estCoeur ? "var(--font-display)" : "var(--font-sans)"}
                fontWeight={estCoeur ? 400 : 500}
                fillOpacity={estCoeur ? 1 : 0.85}
                textDecoration={estCoeur ? "underline" : undefined}
              >
                {s.nom}
              </text>
            </>
          );
          return estCoeur ? (
            <Link key={s.slug} href={`/secteurs/${s.slug}`} aria-label={`${s.nom} : voir la page du secteur`}>
              {etiquette}
            </Link>
          ) : (
            <g key={s.slug}>{etiquette}</g>
          );
        })}
      </svg>
      <figcaption className={`mt-3 text-[0.82rem] ${sombre ? "text-sauge" : "text-encre-2"}`}>
        Carte schématique : positions relatives des communes, sans échelle ni
        localisation de bureau.
      </figcaption>
    </figure>
  );
}
