import "@/styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ENV } from "@/lib/env";

const poppins = Poppins({ subsets: ["latin"], weight: ["400","600","700","800"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: `${ENV.BRAND} • Terrenos con financiamiento claro`,
  description: "Terrenos listos para construir. Ubicación estratégica, servicios listos y atención personalizada.",
  openGraph: { title: `${ENV.BRAND} • Terrenos con financiamiento`, type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={poppins.variable}>
        {children}
      </body>
    </html>
  );
}
