"use client";
import css from "./ProcessSteps.module.css";
import { track, EVENTS } from "@/lib/track";

const steps = [
  { t:"Agenda visita", d:"Conoce el desarrollo y resuelve dudas." },
  { t:"Aparta tu lote", d:"Resérvalo con una cantidad accesible." },
  { t:"Firma y enganche", d:"Formaliza con transparencia." },
  { t:"Mensualidades", d:"Administra pagos sin estrés." },
];

export default function ProcessSteps(){
  return (
    <div id="proceso" className="container">
      <h2 className="h2">Tu compra en 4 pasos</h2>
      <ol className={css.grid}>
        {steps.map((s, i)=>(
          <li key={i} className={css.item} onMouseEnter={()=>track(EVENTS.PROCESS_STEP_VIEW, { step_index:i+1 })}>
            <div className={css.badge}>{i+1}</div>
            <div><h3>{s.t}</h3><p className="p">{s.d}</p></div>
          </li>
        ))}
      </ol>
    </div>
  );
}
