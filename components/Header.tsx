"use client";
import css from "./Header.module.css";
import { ENV } from "@/lib/env";
import { waLink } from "@/lib/wa";
import { track, EVENTS } from "@/lib/track";
import Button from "@/ui/Button";
import { Phone } from "lucide-react";

export default function Header(){
  const onWA = () => track(EVENTS.WA_CLICK_HERO, { placement: "header" });
  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <div className={css.brand}>{ENV.BRAND}</div>
        <nav className={css.nav}>
          <a href="#ubicacion">Ubicación</a>
          <a href="#lotes">Lotes</a>
          <a href="#financiamiento">Financiamiento</a>
          <a href="#proceso">Proceso</a>
          <a href="#faq">FAQ</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <Button href={waLink("Hola, me interesa información de "+ENV.BRAND)} onClick={onWA} variant="primary" size="md">
          <Phone size={18}/> WhatsApp
        </Button>
      </div>
    </header>
  );
}
