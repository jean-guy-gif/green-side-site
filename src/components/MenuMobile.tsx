"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CTA_NAV, navigation } from "@/lib/site";

/**
 * Menu mobile : <dialog> natif (piège le focus, se ferme avec Échap).
 * Sans JavaScript, la navigation complète reste disponible dans le pied de page.
 */
export function MenuMobile() {
  const ref = useRef<HTMLDialogElement>(null);
  const [ouvert, setOuvert] = useState(false);
  const chemin = usePathname();

  // Ferme le menu à chaque changement de page.
  useEffect(() => {
    ref.current?.close();
  }, [chemin]);

  const liens = navigation.flatMap((n) => n.enfants ?? [n]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="btn btn-ligne !min-h-11 !px-4 !text-[0.95rem]"
        aria-haspopup="dialog"
        aria-expanded={ouvert}
        onClick={() => {
          ref.current?.showModal();
          setOuvert(true);
        }}
      >
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <path d="M1 1.5h16M1 10.5h16" />
        </svg>
        Menu
      </button>

      <dialog
        ref={ref}
        aria-label="Menu"
        onClose={() => setOuvert(false)}
        className="sur-sombre m-0 h-dvh max-h-none w-screen max-w-none bg-nuit p-0 text-ivoire backdrop:bg-nuit/60 open:flex open:flex-col"
      >
        <div className="page flex h-[4.75rem] shrink-0 items-center justify-between">
          <span className="font-display text-xl" aria-hidden="true">
            Green Side
          </span>
          <button
            type="button"
            className="btn btn-ligne-clair !min-h-11 !px-4 !text-[0.95rem]"
            onClick={() => ref.current?.close()}
          >
            Fermer
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="m1 1 10 10M11 1 1 11" />
            </svg>
          </button>
        </div>
        <nav aria-label="Navigation mobile" className="page flex-1 overflow-y-auto pt-4 pb-10">
          <ul>
            {liens.map((l) => (
              <li key={l.href} className="border-b border-ivoire/15">
                <Link
                  href={l.href}
                  aria-current={chemin === l.href ? "page" : undefined}
                  className="flex min-h-16 items-center justify-between py-3 font-display text-[1.9rem] leading-tight aria-[current=page]:text-sauge aria-[current=page]:italic"
                  onClick={() => ref.current?.close()}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={CTA_NAV.href}
            className="btn btn-clair mt-8 w-full"
            onClick={() => ref.current?.close()}
          >
            {CTA_NAV.label}
          </Link>
        </nav>
      </dialog>
    </div>
  );
}
