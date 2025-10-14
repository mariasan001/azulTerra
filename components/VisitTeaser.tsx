import css from "./VisitTeaser.module.css";
import { waLink } from "@/lib/wa";
import Button from "@/ui/Button";

export default function VisitTeaser(){
  return (
    <div className="container">
      <div className={css.box}>
        <div>
          <h2 className="h2">Agenda tu visita sin costo</h2>
          <p className="p">Te acompañamos en recorrido para resolver todo en sitio.</p>
        </div>
        <Button href={waLink("Quiero agendar visita")} variant="primary">Agendar ahora</Button>
      </div>
    </div>
  );
}
