"use client";
import css from "./ServicesLegal.module.css";
import Reveal from "./Reveal";
import Button from "@/ui/Button";
import { waLink } from "@/lib/wa";
import { track } from "@/lib/track";
import {
  Droplets, PlugZap, Waves, MapPinned,
  ShieldCheck, Landmark, FileCheck2, ClipboardCheck
} from "lucide-react";

const SERVICES = [
  { icon: <Droplets size={18}/>,  label: "Agua" },
  { icon: <PlugZap size={18}/>,   label: "Luz" },
  { icon: <Waves size={18}/>,     label: "Drenaje" },
  { icon: <MapPinned size={18}/>, label: "Calles trazadas" },
];

const LEGAL = [
  { icon: <ShieldCheck size={18}/>, label: "Propiedad privada" },
  { icon: <Landmark size={18}/>,    label: "Uso de suelo H/Comercial*" },
  { icon: <FileCheck2 size={18}/>,  label: "Loteo y documentación" },
];

export default function ServicesLegal(){
  const onDocs = () => track("legal_docs_request");
  const onVisit = () => track("service_site_visit");

  return (
    <section className="container">
      <div className={css.panel}>
        <header className={css.head}>
          <div className={css.tag}><ClipboardCheck size={14}/> Servicios y respaldo legal</div>
          <h2 className="h2">Infraestructura y certeza jurídica</h2>
          <p className="p">Todo lo esencial para invertir con confianza desde el primer día.</p>
        </header>

        {/* Infraestructura */}
        <div className={css.group}>
          <div className={css.kicker}>Infraestructura</div>
          <div className={css.cards}>
            {SERVICES.map((s, i)=>(
              <Reveal key={i}>
                <article className={css.card}>
                  <span className={css.icon}>{s.icon}</span>
                  <span className={css.cardText}>{s.label}</span>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Legal */}
        <div className={css.group}>
          <div className={css.kicker}>Respaldo legal</div>
          <div className={css.cards}>
            {LEGAL.map((s, i)=>(
              <Reveal key={i}>
                <article className={css.card}>
                  <span className={css.icon}>{s.icon}</span>
                  <span className={css.cardText}>{s.label}</span>
                </article>
              </Reveal>
            ))}
          </div>
          <p className={css.note}>*Consultar disponibilidad y condiciones del uso de suelo por lote.</p>
        </div>

        {/* CTAs */}
        <div className={css.ctas}>
          <Button
            size="md"
            href={waLink("Hola, quiero recibir la documentación (propiedad privada, loteo, uso de suelo).")}
            onClick={onDocs}
          >
            Solicitar documentación
          </Button>
          <Button
            size="md"
            variant="ghost"
            href={waLink("Hola, quiero agendar visita para validar servicios en sitio.")}
            onClick={onVisit}
          >
            Agendar visita
          </Button>
        </div>
      </div>
    </section>
  );
}
