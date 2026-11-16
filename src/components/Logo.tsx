import Image from "next/image";
import embleme from "@/assets/logo/embleme-provisoire.png";
import { site } from "@/lib/site";

/**
 * Logo interchangeable (brief §4).
 *
 * L'emblème affiché est celui du logo historique fourni par l'agence, détouré
 * depuis une image basse définition : il est PROVISOIRE. Quand le logo final
 * vectoriel sera validé, remplacer le fichier
 * `src/assets/logo/embleme-provisoire.png` (ou importer un SVG) : aucun autre
 * fichier n'est à modifier. `EMBLEME = false` bascule sur la version texte seule.
 */
const EMBLEME = true;

export function Logo({
  clair = false,
  taille = "normal",
}: {
  clair?: boolean;
  taille?: "normal" | "grand";
}) {
  const h = taille === "grand" ? 84 : 46;
  return (
    <span className="inline-flex items-center gap-3">
      {EMBLEME && (
        <Image
          src={embleme}
          alt=""
          height={h}
          width={Math.round((h * embleme.width) / embleme.height)}
          className={clair ? "rounded-[40%_40%_46%_46%] bg-ivoire p-1.5" : ""}
          style={{ height: h, width: "auto" }}
          priority={taille === "normal"}
        />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={`font-display tracking-[0.02em] ${
            taille === "grand" ? "text-[1.9rem]" : "text-[1.35rem]"
          } ${clair ? "text-ivoire" : "text-nuit"}`}
          style={{ fontVariationSettings: '"SOFT" 100, "WONK" 0', fontWeight: 420 }}
        >
          {site.nomCourt}
        </span>
        <span
          className={`mt-1.5 text-[0.6rem] font-semibold tracking-[0.2em] uppercase ${
            clair ? "text-sauge" : "text-encre-2"
          }`}
        >
          {site.baseline}
        </span>
      </span>
      <span className="sr-only">— {site.nom}, accueil</span>
    </span>
  );
}
