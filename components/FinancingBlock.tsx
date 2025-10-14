"use client";
import { useMemo, useState } from "react";
import css from "./FinancingBlock.module.css";
import { track, EVENTS } from "@/lib/track";
import { waLink } from "@/lib/wa";
import Button from "@/ui/Button";
import { Percent } from "lucide-react";

type Plan = {
  id: string;
  enganchePct: 30 | 40 | 50;
  months: 12 | 18 | 24;
  rate: string;       // mostrado
  note?: string;      // pie de fila
  recommended?: boolean;
};

const PLANS: Plan[] = [
  { id: "p12-30", enganchePct: 30, months: 12, rate: "0%*", note: "Cuotas bajas" },
  { id: "p18-40", enganchePct: 40, months: 18, rate: "0%*", note: "Equilibrado" },
  { id: "p24-50", enganchePct: 50, months: 24, rate: "0%*", note: "Mejor precio", recommended: true },
];

export default function FinancingBlock(){
  const [sel, setSel] = useState<string>(PLANS.find(p=>p.recommended)?.id || PLANS[0].id);
  const chosen = useMemo(()=> PLANS.find(p=>p.id===sel)!, [sel]);

  const onView = () => track(EVENTS.FINANCING_VIEW, { months: chosen.months, enganche_pct: chosen.enganchePct });
  const onPick = (id:string) => {
    setSel(id);
    const p = PLANS.find(x=>x.id===id)!;
    track("financing_plan_select", { months: p.months, enganche_pct: p.enganchePct });
  };

  const msg = useMemo(()=>(
    [
      "Hola, quiero mi cálculo de financiamiento.",
      `• Enganche: ${chosen.enganchePct}%`,
      `• Plazo: ${chosen.months} meses`,
      `• Interés: ${chosen.rate}`,
      "¿Me compartes mensualidades y requisitos?"
    ].join("\n")
  ),[chosen]);

  return (
    <section id="financiamiento" className="container">
      <div className={css.wrap} onMouseEnter={onView}>
        <header className={css.head}>
          <div className={css.tag}><Percent size={14}/> Financiamiento a tu medida</div>
          <h2 className="h2">Elige el plan que te convenga</h2>
          <p className="p">Desde 12 hasta 24 meses. Enganche flexible (30%, 40% o 50%).</p>
        </header>

        {/* Tabla responsiva (tabla en desktop, cards en móvil) */}
        <div className={css.tableWrap} role="region" aria-label="Planes de financiamiento">
          <table className={css.table}>
            <thead>
              <tr>
                <th className={css.thFirst}>Plan</th>
                <th>Enganche</th>
                <th>Plazo</th>
                <th>Interés</th>
                <th className={css.thPick}>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {PLANS.map(p=>(
                <tr key={p.id} className={`${css.row} ${sel===p.id?css.active:""}`}>
                  <td data-label="Plan" className={css.colPlan}>
                    <div className={css.planName}>
                      {p.months}m / {p.enganchePct}% {p.recommended && <span className={css.badgeReco}>Recomendado</span>}
                    </div>
                    {p.note && <div className={css.planNote}>{p.note}</div>}
                  </td>
                  <td data-label="Enganche" className={css.tdNum}>{p.enganchePct}%</td>
                  <td data-label="Plazo" className={css.tdNum}>{p.months} meses</td>
                  <td data-label="Interés" className={css.tdNum}>{p.rate}</td>
                  <td className={css.tdPick}>
                    <label className={css.radio}>
                      <input
                        type="radio"
                        name="plan"
                        checked={sel===p.id}
                        onChange={()=>onPick(p.id)}
                        aria-label={`Seleccionar plan ${p.enganchePct}% a ${p.months} meses`}
                      />
                      <span>Elegir</span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className={css.actions}>
          <Button href={waLink(msg)} size="lg">Quiero mi cálculo en WhatsApp</Button>
        </div>

        <p className={css.legal}>*Condiciones pueden variar según tipo de lote y perfil. Consulta términos.</p>
      </div>
    </section>
  );
}
