export const ENV = {
  BRAND: process.env.NEXT_PUBLIC_BRAND || "TERRENOSENTOLUCA.COM",
  WA: (process.env.NEXT_PUBLIC_WA_NUMBER || "").replace(/\D+/g, ""),
  USE_GTM: process.env.NEXT_PUBLIC_USE_GTM === "true",
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || "",
  GA4_ID: process.env.NEXT_PUBLIC_GA4_ID || "",
  GADS_ID: process.env.NEXT_PUBLIC_GADS_ID || "",
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
};
