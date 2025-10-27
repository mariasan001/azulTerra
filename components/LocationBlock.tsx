"use client";
import css from "./LocationBlock.module.css";
import {
  MapPin, Ruler, Landmark, ShieldCheck, Trees,
  ExternalLink, Send
} from "lucide-react";
import { useEffect, useRef } from "react";
import { track } from "@/lib/track";
import Button from "@/ui/Button";
import { waLink } from "@/lib/wa";

const DATA = {
  estado: "Estado de México",
  proyecto: "MEZTLI RESIDENCIAL",
  metraje: "Desde 200 m² a 430 m²",
  amenidades: ["Áreas verdes"],
  estatusLegal: "Propiedad privada",
};

// ⚠️ Sustituye por tus coordenadas reales o Place ID
const mapsUrl =
  "https://www.google.com/maps?q=MEZTLI+RESIDENCIAL,+Estado+de+M%C3%A9xico";

export default function LocationBlock(){
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

  const onMaps = () => track("map_open_click", { source:"panel" });
  const onMapsFloat = () => track("map_open_click", { source:"media_fab" });
  const onWA = () => track("map_whatsapp_request", { project: DATA.proyecto });

  return (
    <section className="container">
      <div className={css.wrap} ref={ref}>
        {/* Media: video + botón flotante de Maps */}
        <div className={css.media} aria-label="Mapa y ubicación">
          <img className={css.poster} src="/images/placeholder-location.webp" alt="" />
          <video
            className={css.video}
            autoPlay muted loop playsInline preload="metadata"
            poster="/images/placeholder-location.webp"
          >
            <source src="/video/VIDEO_TERRENOS.mp4" type="video/mp4" />
          </video>
          <div className={css.glow} />
          <a
            className={css.mediaCta}
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            onClick={onMapsFloat}
            aria-label="Abrir ubicación en Google Maps"
          >
            <ExternalLink size={16}/> Ver en Maps
          </a>
        </div>

        {/* Info panel */}
        <div className={css.panel}>
          <header className={css.header}>
            <div className={css.tag}><MapPin size={16}/> Operamos en</div>
            <h2 className={css.title}>{DATA.estado}</h2>

            {/* Logo del desarrollo */}
            <div className={css.brand}>
              <img
                className={css.logo}
                src="/images/logo_meztli.webp"
                alt="MEZTLI RESIDENCIAL"
                decoding="async"
                loading="lazy"
              />
            </div>
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
              <div className={css.amenities}>
                {DATA.amenidades.map((a,i)=>(<span key={i} className={css.amenity}>{a}</span>))}
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

          {/* CTAs de ubicación */}
          <div className={css.ctas}>
            <Button href={mapsUrl} onClick={onMaps} size="md">
              <ExternalLink size={16}/> Ver ubicación exacta
            </Button>
            <Button
              href={waLink(`Hola, ¿me compartes la ubicación exacta de ${DATA.proyecto} en ${DATA.estado}?`)}
              onClick={onWA}
              variant="ghost"
              size="md"
            >
              <Send size={16}/> Recibir por WhatsApp
            </Button>
          </div>

          <p className={css.note}>
            * Confirma disponibilidad por lote. Imágenes y mapa con fines ilustrativos.
          </p>
        </div>
      </div>
    </section>
  );
}
