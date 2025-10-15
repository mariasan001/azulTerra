// lib/track.ts
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// SSR-safe
if (typeof window !== "undefined") {
  window.dataLayer = window.dataLayer || [];
}

// ⚠️ OJO: mantenemos snake_case y añadimos los dos faltantes
export const EVENTS = {
  WA_CLICK_HERO: "wa_click_hero",
  WA_CLICK_STICKY: "wa_click_sticky",
  WA_FORM_OPEN: "wa_form_open",
  WA_FORM_SEND: "wa_form_send",
  FAQ_OPEN: "faq_open",
  FINANCING_VIEW: "financing_example_view",
  MAP_VIEW: "map_view",
  PROCESS_STEP_VIEW: "process_step_view",

  // ✅ nuevos para el formulario de lotes
  LOT_SELECTOR_VIEW: "lot_selector_view",
  LOT_SELECTOR_SUBMIT: "lot_selector_submit",
} as const;

export type EventName = typeof EVENTS[keyof typeof EVENTS];

// Tipamos track, pero dejamos puerta a strings libres
export function track(event: EventName | string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...params });
}
