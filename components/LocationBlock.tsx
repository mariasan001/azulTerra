"use client";
import css from "./LocationBlock.module.css";
import { MapPin, Ruler, Landmark, ShieldCheck, Trees } from "lucide-react";
import { useEffect, useRef } from "react";
import { track } from "@/lib/track";

const DATA = {
  estado: "Estado de México",
  proyecto: "MEZTLI RESIDENCIAL",
  metraje: "Desde 200 m² a 430 m²",
  amenidades: ["Áreas verdes"],
  estatusLegal: "Propiedad privada",
};

export default function ProjectOverview(){
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ el.classList.add(css.in); io.disconnect(); track("project_overview_view"); }
    },{ threshold:.25 });
    io.observe(el);
    return ()=> io.disconnect();
  }, []);

  return (
    <section className="container">
      <div className={css.wrap} ref={ref}>
        {/* Media: elige Video o Google Maps */}
        <div className={css.media} aria-label="Mapa y ubicación">
          {/* Opción A: Video en movimiento (recomendado para estética) */}
          <img className={css.poster} src="/images/placeholder-location.jpg" alt="" />
          <video
            className={css.video}
            autoPlay muted loop playsInline preload="metadata"
            poster="/images/placeholder-location.jpg"
          >
            <source src="/video/map_meztli.mp4" type="video/mp4" />
          </video>
          <div className={css.glow} />
          {/* ----- Opción B: Google Maps (si prefieres en vivo) -----
          <iframe
            className={css.map}
            src="https://www.google.com/maps?q=Estado%20de%20M%C3%A9xico&output=embed"
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
          --------------------------------------------------------- */}
        </div>

        {/* Info panel */}
        <div className={css.panel}>
          <header className={css.header}>
            <div className={css.tag}><MapPin size={16}/> Operamos en</div>
            <h2 className={css.title}>{DATA.estado}</h2>
            <div className={css.proyecto}>{DATA.proyecto}</div>
          </header>

          <div className={css.grid}>
            <div className={css.card}>
              <Ruler className={css.icon} size={18}/>
              <div className={css.label}>Metraje típico</div>
              <div className={css.value}>{DATA.metraje}</div>
            </div>

            <div className={css.card}>
              <Trees className={css.icon} size={18}/>
              <div className={css.label}>Amenidades</div>
              <div className={css.chips}>
                {DATA.amenidades.map((a,i)=>(<span key={i} className={css.chip}>{a}</span>))}
              </div>
            </div>

            <div className={css.card}>
              <ShieldCheck className={css.icon} size={18}/>
              <div className={css.label}>Estatus legal</div>
              <div className={css.value}>{DATA.estatusLegal}</div>
            </div>

            <div className={css.card}>
              <Landmark className={css.icon} size={18}/>
              <div className={css.label}>Desarrollo</div>
              <div className={css.value}>{DATA.proyecto}</div>
            </div>
          </div>

          <p className={css.note}>
            * Confirma disponibilidad por lote. Imágenes y mapa con fines ilustrativos.
          </p>
        </div>
      </div>
    </section>
  );
}
