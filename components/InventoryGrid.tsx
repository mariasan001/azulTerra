"use client";
import { useState } from "react";
import css from "./LotSelector.module.css";
import { waLink } from "@/lib/wa";
import { track } from "@/lib/track";
import Button from "@/ui/Button";
import { Ruler, Percent, MapPin } from "lucide-react";

type Tipo = "esquina" | "calle" | "carretera";

export default function LotSelector(){
  const [minSize, setMinSize] = useState(200);       // >= 200
  const [maxSize, setMaxSize] = useState(430);       // <= 430
  const [enganche, setEnganche] = useState<"30%"|"40%"|"50%">("30%");
  const [dispones, setDispones] = useState("");      // monto libre
  const [tipos, setTipos] = useState<Record<Tipo, boolean>>({
    esquina: false, calle: false, carretera: false
  });
  const [coment, setComent] = useState(
    "Me interesa un lote cerca de acceso principal, orientación poniente."
  );

  const toggleTipo = (t: Tipo) =>
    setTipos(prev => ({ ...prev, [t]: !prev[t] }));

  const buildMsg = () => {
    const tiposSel = (Object.entries(tipos)
      .filter(([,v]) => v)
      .map(([k]) => k === "calle" ? "frente a calle/camino" : k === "carretera" ? "a pie de carretera" : "esquina"));
    const tiposTxt = tiposSel.length ? tiposSel.join(", ") : "cualquiera";

    return [
      "Hola, quiero una propuesta de lotes.",
      `• Metraje deseado: ${minSize}–${maxSize} m²`,
      `• Enganche estimado: ${enganche}`,
      `• ¿Con cuánto dispongo hoy?: ${dispones ? `$${dispones}` : "a definir"}`,
      `• Tipo(s) que me interesan: ${tiposTxt}`,
      coment ? `• Comentarios: ${coment}` : "",
      "¿Me compartes opciones y precios?"
    ].filter(Boolean).join("\n");
  };

  const onSubmit = () => {
    track("lot_selector_submit", { minSize, maxSize, enganche, dispones, tipos, hasComment: !!coment });
    window.location.href = waLink(buildMsg());
  };

  // Guardrails
  const onMin = (v:number) => setMinSize(Math.max(200, Math.min(v, maxSize)));
  const onMax = (v:number) => setMaxSize(Math.max(minSize, Math.min(v, 430)));

// ...
return (
  <section id="lotes" className="container">
    <div className={css.split}>
      {/* 👉 FORM primero */}
      <div className={css.panel}>
        <header className={css.head}>
          <h2 className="h2">Arma tu lote ideal</h2>
          <p className="p">Cuéntanos qué buscas y te cotizamos por WhatsApp.</p>
        </header>

        <form className={css.form} onSubmit={(e)=>{e.preventDefault(); onSubmit();}}>
          {/* Metraje */}
          <div className={css.card}>
            <div className={css.cardHead}>Metraje</div>
            <div className={css.grid2}>
              <div className={css.field}>
                <label>Mínimo (≥ 200 m²)</label>
                <input type="number" inputMode="numeric" min={200} max={430}
                  value={minSize} onChange={(e)=> onMin(parseInt(e.target.value||"200",10))} placeholder="Ej. 200" />
              </div>
              <div className={css.field}>
                <label>Máximo (≤ 430 m²)</label>
                <input type="number" inputMode="numeric" min={200} max={430}
                  value={maxSize} onChange={(e)=> onMax(parseInt(e.target.value||"430",10))} placeholder="Ej. 320" />
              </div>
            </div>
            <p className={css.hint}>Si te es indiferente el tope, deja 430 m².</p>
          </div>

          {/* Enganche */}
          <div className={css.card}>
            <div className={css.cardHead}>Enganche preferido</div>
            <div className={css.pills}>
              {(["30%","40%","50%"] as const).map(opt=>(
                <button key={opt} type="button"
                  className={`${css.pill} ${enganche===opt?css.active:""}`}
                  onClick={()=>setEnganche(opt)} aria-pressed={enganche===opt}>{opt}</button>
              ))}
            </div>
            <div className={css.field}>
              <label>¿Con cuánto dispones hoy? (opcional)</label>
              <input type="text" inputMode="numeric" placeholder="Ej. 120,000"
                value={dispones} onChange={(e)=>setDispones(e.target.value)} />
            </div>
          </div>

          {/* Tipo de lote */}
          <div className={css.card}>
            <div className={css.cardHead}>Tipo de frente</div>
            <div className={css.chkRow}>
              <label className={css.chk}><input type="checkbox" checked={tipos.esquina} onChange={()=>toggleTipo("esquina")} /><span>Esquina</span></label>
              <label className={css.chk}><input type="checkbox" checked={tipos.calle} onChange={()=>toggleTipo("calle")} /><span>Frente a calle / camino</span></label>
              <label className={css.chk}><input type="checkbox" checked={tipos.carretera} onChange={()=>toggleTipo("carretera")} /><span>A pie de carretera</span></label>
            </div>
          </div>

          {/* Comentarios */}
          <div className={css.card}>
            <div className={css.cardHead}>Comentarios (opcional)</div>
            <textarea rows={3} value={coment} onChange={(e)=>setComent(e.target.value)}
              placeholder="Ej.: esquina cerca de acceso • que no quede frente a parque • orientación poniente"
              className={css.textarea}/>
          </div>

          {/* CTA */}
          <div className={css.actions}>
            <Button size="lg" onClick={onSubmit}>Armar propuesta en WhatsApp</Button>
          </div>
        </form>
      </div>

      {/* 👉 IMAGEN después */}
      <aside className={`${css.media} ${css.compact}`}>
        <img className={css.photo} src="/images/IMG_1.webp" alt="Lotes desde 200 m²" loading="lazy" decoding="async" />
        <div className={css.vignette} />
        <div className={css.glow} aria-hidden />
        <div className={css.chips}>
          <span className={css.chip}><Ruler size={14}/> Desde 200 m²</span>
          <span className={css.chip}><MapPin size={14}/> Estado de México</span>
        </div>
      </aside>
    </div>
  </section>
);

}

