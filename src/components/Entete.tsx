import Link from "next/link";
import { Logo } from "@/components/Logo";
import { MenuMobile } from "@/components/MenuMobile";
import { LienActif } from "@/components/LienActif";
import { CTA_NAV, EST_DEMO, navigation } from "@/lib/site";

export function Entete() {
  return (
    <>
      <a
        href="#contenu"
        className="btn btn-plein sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]"
      >
        Aller au contenu
      </a>
      {EST_DEMO && (
        <p className="bg-nuit px-4 py-2 text-center text-[0.8rem] leading-snug text-sauge-2">
          <strong className="font-semibold text-ivoire">Version de travail.</strong>{" "}
          Textes, visuels et informations légales en attente de validation — les
          biens affichés sont des exemples fictifs.
        </p>
      )}
      <header className="sticky top-0 z-50 border-b border-sauge/40 bg-ivoire/90 backdrop-blur-md">
        <div className="page flex h-[4.75rem] items-center justify-between gap-6">
          <Link href="/" className="shrink-0 rounded-lg" aria-label="Agence Green Side — accueil">
            <Logo />
          </Link>

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) =>
                item.enfants ? (
                  <li key={item.label} className="group relative">
                    <LienActif
                      href={item.href}
                      autres={item.enfants.map((e) => e.href)}
                      className="flex items-center gap-1.5"
                    >
                      {item.label}
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <path d="m1 1 4 4 4-4" />
                      </svg>
                    </LienActif>
                    <ul className="invisible absolute top-full left-0 min-w-44 translate-y-1 rounded-2xl border border-sauge/50 bg-craie p-2 opacity-0 shadow-[0_18px_40px_-18px_rgba(31,52,44,0.35)] transition-all duration-150 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.enfants.map((e) => (
                        <li key={e.href}>
                          <Link
                            href={e.href}
                            className="block rounded-xl px-4 py-2.5 font-medium hover:bg-sauge-2"
                          >
                            {e.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <LienActif href={item.href}>{item.label}</LienActif>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href={CTA_NAV.href} className="btn btn-plein hidden !min-h-11 !px-5 !text-[0.95rem] sm:inline-flex">
              {CTA_NAV.label}
            </Link>
            <MenuMobile />
          </div>
        </div>
      </header>
    </>
  );
}
