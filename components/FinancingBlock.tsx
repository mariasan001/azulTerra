"use client";
import css from "./FinancingBlock.module.css";
import { track, EVENTS } from "@/lib/track";
import { waLink } from "@/lib/wa";
import Button from "@/ui/Button";

export default function FinancingBlock(){
  const view = () => track(EVENTS.FINANCING_VIEW, { months:24, enganche_pct:30 });
  return (
    <div id="financiamiento" className="container">
      <div className={css.wrap}>
        <div className={css.media}/>
        <div className={css.copy}>
          <h2 className="h2">Financiamiento a tu medida</h2>
          <p className="p">Elige el plan que mejor se ajuste. Sin complicaciones.</p>
          <table className={css.table} onMouseEnter={view}>
            <thead><tr><th>Enganche</th><th>Plazo</th><th>Interés</th></tr></thead>
            <tbody>
              <tr><td>30%</td><td>12 meses</td><td>0%*</td></tr>
              <tr><td>30%</td><td>24 meses</td><td>0%*</td></tr>
            </tbody>
          </table>
          <Button href={waLink("Quiero mi cálculo de financiamiento")} variant="soft">Quiero mi cálculo en WhatsApp</Button>
          <p className="p">*Condiciones varían según tipo de lote.</p>
        </div>
      </div>
    </div>
  );
}
