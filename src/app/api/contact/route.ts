import { NextResponse } from "next/server";
import { valider } from "@/lib/demandes";

/**
 * Réception des demandes (contact, estimation, recherche).
 *
 * - Validation côté serveur, pot de miel et délai minimal anti-robots,
 *   limite de fréquence par adresse IP.
 * - Transmission : si LEADS_WEBHOOK_URL est défini, la demande est envoyée à
 *   cette URL (service d'e-mail, CRM, automatisation). Le visiteur ne voit
 *   « bien reçu » que si ce service a répondu avec succès.
 * - Sans LEADS_WEBHOOK_URL : la route répond 503 « non configuré ». Le
 *   formulaire l'annonce clairement — on ne simule jamais un envoi réussi.
 * - Aucune donnée personnelle n'est écrite dans les journaux.
 */

const FENETRE_MS = 10 * 60 * 1000;
const MAX_PAR_FENETRE = 5;
// Mémoire de l'instance : suffisant pour freiner un robot, pas une garantie
// en environnement serverless (voir README, « Avant la mise en production »).
const compteurs = new Map<string, { n: number; debut: number }>();

function tropDeDemandes(ip: string) {
  const maintenant = Date.now();
  const c = compteurs.get(ip);
  if (!c || maintenant - c.debut > FENETRE_MS) {
    compteurs.set(ip, { n: 1, debut: maintenant });
    return false;
  }
  c.n += 1;
  return c.n > MAX_PAR_FENETRE;
}

export async function POST(requete: Request) {
  let brut: Record<string, unknown>;
  try {
    brut = await requete.json();
  } catch {
    return NextResponse.json({ ok: false, raison: "format" }, { status: 400 });
  }

  // Pot de miel : champ invisible que seul un robot remplit.
  // Délai : un humain met plus de 3 secondes à remplir le formulaire.
  const duree = Number(brut.duree);
  if (brut.site_web || !Number.isFinite(duree) || duree < 3000) {
    return NextResponse.json({ ok: false, raison: "refuse" }, { status: 400 });
  }

  const ip = (requete.headers.get("x-forwarded-for") ?? "inconnue").split(",")[0].trim();
  if (tropDeDemandes(ip)) {
    return NextResponse.json({ ok: false, raison: "frequence" }, { status: 429 });
  }

  const { demande, erreurs } = valider(brut);
  if (Object.keys(erreurs).length > 0) {
    return NextResponse.json({ ok: false, raison: "validation", erreurs }, { status: 422 });
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: false, raison: "non-configure" }, { status: 503 });
  }

  try {
    const reponse = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.LEADS_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.LEADS_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({ ...demande, recuLe: new Date().toISOString() }),
      signal: AbortSignal.timeout(8000),
    });
    if (!reponse.ok) throw new Error(`statut ${reponse.status}`);
  } catch {
    console.error("[contact] transmission impossible"); // sans donnée personnelle
    return NextResponse.json({ ok: false, raison: "transmission" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
