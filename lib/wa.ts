import { ENV } from "./env";
function getUTMs() {
  if (typeof window === "undefined") return "";
  const u = new URL(window.location.href);
  const parts: string[] = [];
  ["utm_source","utm_medium","utm_campaign","utm_content","gclid","fbclid"].forEach(k=>{
    const v = u.searchParams.get(k);
    if (v) parts.push(`${k}=${encodeURIComponent(v)}`);
  });
  return parts.length ? "&" + parts.join("&") : "";
}
export function waLink(message: string) {
  const base = `https://wa.me/${ENV.WA}?text=${encodeURIComponent(message)}`;
  return base + getUTMs();
}
export type LeadPayload = {
  name: string; phone: string;
  goal: "vivienda" | "inversion";
  size: string; financing: "si"|"no"; visitDate?: string;
};
export function buildLeadMessage(p: LeadPayload) {
  const lines = [
    `Hola, me interesa ${ENV.BRAND}.`,
    `• Nombre: ${p.name}`,
    `• Tel: ${p.phone}`,
    `• Objetivo: ${p.goal}`,
    `• Metraje: ${p.size}`,
    `• Financiamiento: ${p.financing}`,
    p.visitDate ? `• Visita: ${p.visitDate}` : "",
    `• Origen: sitio web`,
  ].filter(Boolean);
  return lines.join("\n");
}
