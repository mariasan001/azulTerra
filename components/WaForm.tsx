"use client";
import css from "./WaForm.module.css";
import { useState } from "react";
import { buildLeadMessage, waLink, LeadPayload } from "@/lib/wa";
import { track, EVENTS } from "@/lib/track";

export default function WaForm(){
  const [form, setForm] = useState<LeadPayload>({ name:"", phone:"", goal:"vivienda", size:"200–430 m²", financing:"si", visitDate:"" });
  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{ const { name, value } = e.target; setForm(prev=> ({ ...prev, [name]: value })); };
  const onSubmit = () => { track(EVENTS.WA_FORM_SEND, { ...form }); const url = waLink(buildLeadMessage(form)); window.location.href = url; };
  return (
    <div className="container">
      <h2 className="h2">Envíanos tus datos por WhatsApp</h2>
      <div className={css.form}>
        <div className={css.field}><label>Nombre</label><input name="name" value={form.name} onChange={onChange} placeholder="Nombre completo" /></div>
        <div className={css.field}><label>Tel/Whats</label><input name="phone" value={form.phone} onChange={onChange} placeholder="10 dígitos" /></div>
        <div className={css.field}><label>Objetivo</label><select name="goal" value={form.goal} onChange={onChange}><option value="vivienda">Vivienda</option><option value="inversion">Inversión</option></select></div>
        <div className={css.field}><label>Metraje deseado</label><input name="size" value={form.size} onChange={onChange}/></div>
        <div className={css.field}><label>¿Requieres financiamiento?</label><select name="financing" value={form.financing} onChange={onChange}><option value="si">Sí</option><option value="no">No</option></select></div>
        <div className={css.field}><label>Fecha tentativa de visita</label><input name="visitDate" value={form.visitDate} onChange={onChange} placeholder="dd/mm/aaaa" /></div>
        <div className={css.actions}><button className={css.btn} onClick={onSubmit}>Enviar por WhatsApp</button></div>
      </div>
      <p className="p">Al continuar, aceptas nuestro <a className={css.link} href="/legal/aviso-privacidad">aviso de privacidad</a>.</p>
    </div>
  );
}
