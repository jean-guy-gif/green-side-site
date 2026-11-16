"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Lien de navigation qui signale la page courante (aria-current). */
export function LienActif({
  href,
  autres = [],
  children,
  className = "",
}: {
  href: string;
  autres?: string[];
  children: ReactNode;
  className?: string;
}) {
  const chemin = usePathname();
  const actif = [href, ...autres].some(
    (h) => chemin === h || chemin.startsWith(`${h}/`),
  );
  return (
    <Link
      href={href}
      aria-current={actif ? "page" : undefined}
      className={`rounded-full px-3.5 py-2.5 text-[0.97rem] font-medium transition-colors hover:bg-sauge-2/70 aria-[current=page]:text-foret aria-[current=page]:underline aria-[current=page]:decoration-ocre aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8 ${className}`}
    >
      {children}
    </Link>
  );
}
