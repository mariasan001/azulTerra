// lib/wa.ts
import { ENV } from "./env";

/** Obtiene UTMs de la URL actual (client-side). */
function readUTMsFromLocation(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const u = new URL(window.location.href);
  const keys = ["utm_source","utm_medium","utm_campaign","utm_content","gclid","fbclid"] as const;
  const out: Record<string, string> = {};
  keys.forEach(k => {
    const v = u.searchParams.get(k);
    if (v) out[k] = v;
  });
  return out;
}

/** Para mostrar el número bonito en UI (opcional). */
export function waDisplay(): string {
  const d = ENV.WA;
  if (!d) return "";
  // +52 722 161 5138
  return `+${d.slice(0,2)} ${d.slice(2,5)} ${d.slice(5,8)} ${d.slice(8)}`;
}

/** Link simple a WhatsApp (sin mensaje). */
export function waHref(): string {
  return `https://wa.me/${ENV.WA}`;
}

/** Link a WhatsApp con mensaje prellenado. */
export function waLink(message: string): string {
  return `https://wa.me/${ENV.WA}?text=${encodeURIComponent(message)}`;
}

/** (Opcional) Anexar UTMs como query params a wa.me (no recomendado para analytics). */
export function waLinkWithQueryUTMs(message: string): string {
  const utms = readUTMsFromLocation();
  const sp = new URLSearchParams({ text: message });
  Object.entries(utms).forEach(([k, v]) => sp.append(k, v));
  return `https://wa.me/${ENV.WA}?${sp.toString()}`;
}

export type LeadPayload = {
  name: string;
  phone: string;
  goal: "vivienda" | "inversion";
  size: string;
  financing: "si" | "no";
  visitDate?: string;
};

/** Construye el mensaje para WhatsApp (UTMs incluidas al final del texto). */
export function buildLeadMessage(p: LeadPayload) {
  const utms = readUTMsFromLocation();
  const utmLines = Object.keys(utms).length
    ? [
        "",
        "—",
        "UTMs",
        ...Object.entries(utms).map(([k, v]) => `• ${k}: ${v}`),
      ]
    : [];

  const lines = [
    `Hola, me interesa ${ENV.BRAND}.`,
    `• Nombre: ${p.name}`,
    `• Tel: ${p.phone}`,
    `• Objetivo: ${p.goal}`,
    `• Metraje: ${p.size}`,
    `• Financiamiento: ${p.financing}`,
    p.visitDate ? `• Visita: ${p.visitDate}` : "",
    `• Origen: sitio web`,
    ...utmLines,
  ].filter(Boolean);

  return lines.join("\n");
}
