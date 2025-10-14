"use client";
import css from "./FaqForum.module.css";
import { track, EVENTS } from "@/lib/track";

const faqs = [
  { q:"¿Puedo financiar a 24 meses?", a:"Sí. Las condiciones varían según el lote." },
  { q:"¿Cuál es el mínimo de enganche?", a:"Desde 30%." },
  { q:"¿Hay visitas entre semana?", a:"Sí, con cita previa." },
  { q:"¿Se puede construir de inmediato?", a:"Depende del lote y servicios." },
];

export default function FaqForum(){
  return (
    <div id="faq" className="container">
      <h2 className="h2">Preguntas frecuentes</h2>
      <div className={css.list}>
        {faqs.map((f,i)=>(
          <details key={i} className={css.item} onToggle={(e)=> e.currentTarget.open && track(EVENTS.FAQ_OPEN, { question_id:i+1, question_text:f.q })}>
            <summary>{f.q}</summary>
            <p className="p">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
