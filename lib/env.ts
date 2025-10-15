// lib/env.ts
type Env = {
  BRAND: string;
  WA: string;                // solo dígitos para wa.me
  USE_GTM: boolean;
  GTM_ID: string;
  GA4_ID: string;
  GADS_ID?: string;
  META_PIXEL_ID?: string;

  // opcionales de contacto/redes
  PHONE?: string;
  EMAIL?: string;
  HOURS?: string;
  VERIFY_URL?: string;
  FB_URL?: string;
  IG_URL?: string;
  AUREAN_URL?: string;
};

const rawWa =
  process.env.NEXT_PUBLIC_WA_NUMBER ??
  process.env.NEXT_PUBLIC_WA ??
  "";

export const ENV: Env = {
  BRAND: process.env.NEXT_PUBLIC_BRAND ?? "TERRENOSENTOLUCA.COM",
  WA: rawWa.replace(/\D+/g, ""), // normaliza a dígitos
  USE_GTM: (process.env.NEXT_PUBLIC_USE_GTM ?? "false") === "true",
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  GA4_ID: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  GADS_ID: process.env.NEXT_PUBLIC_GADS_ID,
  META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,

  PHONE: process.env.NEXT_PUBLIC_PHONE,
  EMAIL: process.env.NEXT_PUBLIC_EMAIL,
  HOURS: process.env.NEXT_PUBLIC_HOURS,
  VERIFY_URL: process.env.NEXT_PUBLIC_VERIFY_URL,
  FB_URL: process.env.NEXT_PUBLIC_FB_URL,
  IG_URL: process.env.NEXT_PUBLIC_IG_URL,
  AUREAN_URL: process.env.NEXT_PUBLIC_AUREAN_URL,
} as const;
