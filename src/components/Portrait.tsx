import Image from "next/image";
import type { Membre } from "@/content/equipe";

/**
 * Portrait en arche — le motif signature du site.
 * `sizes` est à ajuster selon la largeur réelle d'affichage pour que
 * next/image serve la bonne définition.
 */
export function Portrait({
  membre,
  sizes,
  priorite = false,
  className = "",
  ratio = "aspect-[4/5]",
}: {
  membre: Membre;
  sizes: string;
  priorite?: boolean;
  className?: string;
  ratio?: string;
}) {
  return (
    <div className={`arche relative bg-sauge-2 ${ratio} ${className}`}>
      <Image
        src={membre.photo}
        alt={`Portrait de ${membre.prenom}, cofondatrice de l’Agence Green Side`}
        fill
        sizes={sizes}
        priority={priorite}
        placeholder="blur"
        className="object-cover transition-transform duration-700 ease-doux group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        style={{ objectPosition: membre.cadrage }}
      />
    </div>
  );
}
