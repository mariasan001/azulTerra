"use client";
import css from "./LotShowcase.module.css";
import { useMemo } from "react";

type Lot = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  status?: "disp" | "vend" | "apto";
  label?: string;
};

// Generamos una cuadrícula base (8x5) con pequeñas variaciones para que no se vea rígido
function buildLots(cols = 8, rows = 5): Lot[] {
  const gap = 6;               // espacio entre lotes
  const baseW = 90;            // ancho base
  const baseH = 60;            // alto base
  const jitter = 4;            // pequeña variación

  const lots: Lot[] = [];
  let id = 1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = 40 + c * (baseW + gap) + (r % 2 === 0 ? 0 : 3); // “offset” suave en filas pares
      const y = 40 + r * (baseH + gap);
      const w = baseW + ((c % 3) - 1) * jitter;
      const h = baseH + ((r % 3) - 1) * jitter;

      // Asignamos un status para variar el color
      const statuses: Lot["status"][] = ["disp", "apto", "vend"];
      const status = statuses[(r * cols + c) % statuses.length];

      lots.push({
        id: `L${id++}`,
        x, y, w, h,
        status,
        label: status === "vend" ? "Vendido" : status === "apto" ? "Apartado" : "Disponible"
      });
    }
  }
  return lots;
}

export default function LotShowcase() {
  const lots = useMemo(() => buildLots(8, 5), []);

  return (
    <section className={css.wrap} aria-label="Mapa ilustrado de lotes">
      {/* Panel de info / leyenda */}
      <aside className={css.panel}>
        <div className={css.badge}>Operamos en</div>
        <h3 className={css.title}>Estado de México</h3>
        <div className={css.project}>MEZTLI RESIDENCIAL</div>

        <ul className={css.meta}>
          <li><strong>Metraje típico:</strong> 200–430 m²</li>
          <li><strong>Estatus legal:</strong> Propiedad privada</li>
          <li><strong>Amenidades:</strong> Áreas Verdes</li>
        </ul>

        <div className={css.legend}>
          <span className={`${css.dot} ${css.disp}`} /> Disponible
          <span className={`${css.dot} ${css.apto}`} /> Apartado
          <span className={`${css.dot} ${css.vend}`} /> Vendido
        </div>
      </aside>

      {/* Lienzo con movimiento */}
      <div className={css.canvas}>
        {/* fondo con gradiente animado sutil */}
        <div className={css.bgGlow} aria-hidden />

        <svg
          className={css.svg}
          viewBox="0 0 900 500"
          role="img"
          aria-label="Distribución ilustrativa de lotes"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* “Cámara” que hace pan+zoom: animamos el <g> */}
          <g className={css.camera}>
            {/* sendero/avenida decorativa */}
            <path
              className={css.avenue}
              d="M 10 60 C 220 40, 380 120, 600 90 S 880 120, 900 80"
              vectorEffect="non-scaling-stroke"
            />
            {/* lotes */}
            {lots.map((lot, i) => (
              <g key={lot.id} className={css.lot} style={{ ["--i" as any]: i }}>
                <rect
                  className={`${css.plot} ${css[lot.status || "disp"]}`}
                  x={lot.x}
                  y={lot.y}
                  rx="10"
                  ry="10"
                  width={lot.w}
                  height={lot.h}
                  data-tip={`${lot.id} • ${lot.label}`}
                />
                {/* línea de “trazo” animada para efecto de dibujo */}
                <rect
                  className={css.stroke}
                  x={lot.x}
                  y={lot.y}
                  rx="10"
                  ry="10"
                  width={lot.w}
                  height={lot.h}
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </section>
  );
}
