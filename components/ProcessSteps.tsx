"use client";
import css from "./ProcessSteps.module.css";
import { track, EVENTS } from "@/lib/track";
import { CalendarCheck, BookmarkPlus, FileCheck2, Wallet } from "lucide-react";

type Step = { t: string; d: string; icon: JSX.Element };

const steps: Step[] = [
  { t: "Agenda visita",     d: "Conoce el desarrollo y resuelve dudas.",            icon: <CalendarCheck size={16}/> },
  { t: "Aparta tu lote",    d: "Resérvalo con una cantidad accesible.",             icon: <BookmarkPlus size={16}/> },
  { t: "Firma y enganche",  d: "Formaliza con transparencia.",                      icon: <FileCheck2 size={16}/> },
  { t: "Mensualidades",     d: "Administra pagos sin estrés.",                      icon: <Wallet size={16}/> },
];

export default function ProcessSteps(){
  return (
    <section id="proceso" className="container">
      <header className={css.head}>
        <div className={css.tag}>Proceso</div>
        <h2 className="h2">Tu compra en 4 pasos</h2>
        <p className="p">Acompañamiento desde la visita hasta tu última mensualidad.</p>
      </header>

      <ol className={css.grid}>
        {steps.map((s, i)=>(
          <li
            key={i}
            className={css.item}
            onMouseEnter={()=>track(EVENTS.PROCESS_STEP_VIEW, { step_index: i+1 })}
          >
            <div className={css.badge} aria-hidden>
              <span className={css.badgeIcon}>{s.icon}</span>
              <span className={css.badgeNum}>{i+1}</span>
            </div>
            <div className={css.copy}>
              <h3 className={css.title}>{s.t}</h3>
              <p className={`${css.desc} p`}>{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
