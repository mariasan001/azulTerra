// app/layout.tsx
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400","700"] });

export const metadata = {
  title: "AzulTerra",
  description: "Terrenos listos para construir",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}
