"use client";
import css from "./Hero.module.css";
import Button from "@/ui/Button";
import { waLink } from "@/lib/wa";
import { track, EVENTS } from "@/lib/track";
import { ENV } from "@/lib/env";
import { Calendar } from "lucide-react";

export default function Hero(){
  const waMsg = `Hola, me interesa ${ENV.BRAND}. ¿Me compartes opciones?`;
  const onWA = () => track(EVENTS.WA_CLICK_HERO, { placement:"hero" });
  const onVisit = () => track("cta_visit_click", { placement:"hero" });

  return (
    <section className={css.wrap} aria-label="Hero principal">
      <div className="container">
        <div className={css.card}>
          {/* Capa de medios */}
          <div className={css.media} aria-hidden>
            <img
              className={css.poster}
              src="/images/placeholder-hero.jpg"
              alt=""
              loading="eager"
              decoding="sync"
            />
            <video
              className={css.video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/placeholder-hero.jpg"
            >
              <source src="/video/VIDEO_FONDO.mp4" type="video/mp4" />
            </video>
            <div className={css.vignette} />
          </div>

          {/* Contenido */}
          <div className={css.overlay}>
            <h1 className={css.title}>
              <span className={css.titleDim}>Terrenos listos para</span>{" "}
              <span className={css.accent}>construir</span>
            </h1>

            <p className={css.kicker}>
              Financiamiento claro y atención personalizada
            </p>

            <p className={css.blurb}>
              Ubicación estratégica, servicios listos y acompañamiento en cada
              paso para que empieces hoy tu patrimonio.
            </p>

            <div className={css.ctas}>
              <Button href={waLink(waMsg)} onClick={onWA} size="lg">
                Cotizar por WhatsApp
              </Button>
              <Button
                href={waLink("Quiero agendar visita a " + ENV.BRAND)}
                onClick={onVisit}
                variant="ghost"
                size="lg"
              >
                <Calendar size={18} /> Agendar visita
              </Button>
            </div>

            <ul className={css.badges} aria-label="Diferenciales clave">
              <li>+ Plusvalía en la zona</li>
              <li>Visita guiada sin costo</li>
              <li>Planes hasta 24 meses</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
