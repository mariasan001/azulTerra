"use client";
import { useState } from "react";
import Image from "next/image";
import css from "./Gallery.module.css";

type Slot = "square" | "tall" | "wide" | "poster";
type Item = { src: string; slot: Slot; alt?: string };

const ITEMS: Item[] = [
  { src: "/images/IMG_1.jpg", slot: "wide",   alt: "Vista general" },
  { src: "/images/IMG_2.jpg", slot: "poster", alt: "Área de lotes" },
  { src: "/images/IMG_3.jpg", slot: "square", alt: "Detalle vertical" },
  { src: "/images/IMG_4.jpg", slot: "square", alt: "Entorno" },
  { src: "/images/IMG_5.jpg", slot: "square", alt: "Poste/infraestructura" },
];

// Placeholder shimmer (no requiere imports estáticos)
const shimmer = (w:number, h:number) =>
  `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f2f4f8" offset="20%" />
          <stop stop-color="#e6eaf2" offset="50%" />
          <stop stop-color="#f2f4f8" offset="80%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f2f4f8"/>
      <rect id="r" width="${w}" height="${h}" fill="url(#g)"/>
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`
  ).toString("base64")}`;

export default function Gallery(){
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<number | null>(null);

  const openLightbox = (idx:number) => { setCurrent(idx); setOpen(true); };
  const closeLightbox = () => { setOpen(false); setCurrent(null); };
  const prev = () => setCurrent(c => (c===null?0:(c+ITEMS.length-1)%ITEMS.length));
  const next = () => setCurrent(c => (c===null?0:(c+1)%ITEMS.length));

  return (
    <section className="container" id="galeria">
      <header className={css.head}>
        <div className={css.tag}>Galería</div>
        <h2 className="h2">Collage curado</h2>
        <p className="p">Optimizada con <code>next/image</code> para cargar rápido.</p>
      </header>

      <div className={css.grid}>
        {ITEMS.map((it, i) => (
          <button
            key={it.src}
            className={`${css.card} ${css[it.slot]}`}
            onClick={() => openLightbox(i)}
            aria-label={`Abrir imagen ${i + 1}`}
            title="Ampliar"
          >
            {/* contenedor relativo con aspect-ratio ya dado por la clase */}
            <div className={css.frame}>
              <Image
                src={it.src}
                alt={it.alt || ""}
                fill
                sizes="(max-width:700px) 100vw, (max-width:1100px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={shimmer(32, 24)}
                priority={i === 0}         // precarga 1ª si quieres
                quality={80}
                className={css.img}
              />
            </div>
            <span className={css.fx} />
          </button>
        ))}
      </div>

      {open && current !== null && (
        <div className={css.lightbox} role="dialog" aria-modal="true" onClick={closeLightbox}>
          <div className={css.lightboxInner} onClick={e=>e.stopPropagation()}>
            <Image
              src={ITEMS[current].src}
              alt={ITEMS[current].alt || ""}
              width={1600}
              height={1200}
              sizes="100vw"
              placeholder="blur"
              blurDataURL={shimmer(16,12)}
              className={css.lbImg}
            />
            <div className={css.lbCtas}>
              <button onClick={prev} aria-label="Anterior" className={css.lbBtn}>‹</button>
              <button onClick={next} aria-label="Siguiente" className={css.lbBtn}>›</button>
              <button onClick={closeLightbox} aria-label="Cerrar" className={css.lbClose}>✕</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
