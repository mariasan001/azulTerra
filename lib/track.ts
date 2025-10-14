declare global { interface Window { dataLayer?: any[]; } }
if (typeof window !== "undefined") window.dataLayer = window.dataLayer || [];
export function track(event: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...params });
}
export const EVENTS = {
  WA_CLICK_HERO: "wa_click_hero",
  WA_CLICK_STICKY: "wa_click_sticky",
  WA_FORM_OPEN: "wa_form_open",
  WA_FORM_SEND: "wa_form_send",
  FAQ_OPEN: "faq_open",
  FINANCING_VIEW: "financing_example_view",
  MAP_VIEW: "map_view",
  PROCESS_STEP_VIEW: "process_step_view",
};
