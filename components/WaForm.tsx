"use client";

import { useEffect, useMemo, useState } from "react";
import css from "./WaForm.module.css";
import { buildLeadMessage, waLink, LeadPayload } from "@/lib/wa";
import { track, EVENTS } from "@/lib/track";
import { Phone, User, Calendar, Ruler, Wallet } from "lucide-react";

export default function WaForm() {
  const [form, setForm] = useState<LeadPayload>({
    name: "",
    phone: "",
    goal: "vivienda",
    size: "200–430 m²",
    financing: "si",
    visitDate: "",
  });

  const [touched, setTouched] = useState<{[K in keyof LeadPayload]?: boolean}>({});

  // Track view
  useEffect(() => {
    track(EVENTS.LOT_SELECTOR_VIEW, { source: "WaForm" });
  }, []);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as { name: keyof LeadPayload; value: string };
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target as { name: keyof LeadPayload };
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const errors = useMemo(() => {
    const out: Partial<Record<keyof LeadPayload, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      out.name = "Escribe tu nombre completo.";
    }
    // Solo dígitos (10)
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      out.phone = "Ingresa un WhatsApp de 10 dígitos.";
    }
    if (!form.size.trim()) out.size = "Indica el metraje deseado.";
    if (!form.financing) out.financing = "Selecciona una opción.";
    // visitDate es opcional
    return out;
  }, [form]);

  const canSubmit = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, size: true, financing: true, goal: true, visitDate: true });

    if (!canSubmit) return;
    track(EVENTS.LOT_SELECTOR_SUBMIT, { ...form, source: "WaForm" });

    const url = waLink(buildLeadMessage(form));
    // redirección directa a WhatsApp
    window.location.href = url;
  };

  return (
    <section className={css.wrap} aria-labelledby="waform-title">
      <div className="container">
        <header className={css.header}>
          <h2 id="waform-title" className="h2">
            Envíanos tus datos por WhatsApp
          </h2>
          <p className="p">Te contactamos en minutos para cotizar y agendar tu visita.</p>
        </header>

        <form className={css.form} onSubmit={onSubmit} noValidate>
          {/* Nombre */}
          <div className={css.field}>
            <label htmlFor="name">
              <User className={css.icon} aria-hidden />
              Nombre
            </label>
            <input
              id="name"
              name="name"
              placeholder="Nombre completo"
              value={form.name}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "err-name" : undefined}
              required
            />
            {touched.name && errors.name && (
              <span id="err-name" className={css.error}>{errors.name}</span>
            )}
          </div>

          {/* Teléfono */}
          <div className={css.field}>
            <label htmlFor="phone">
              <Phone className={css.icon} aria-hidden />
              Tel/Whats
            </label>
            <input
              id="phone"
              name="phone"
              placeholder="10 dígitos"
              value={form.phone}
              onChange={onChange}
              onBlur={onBlur}
              inputMode="numeric"
              pattern="\d{10}"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "err-phone" : undefined}
              required
            />
            {touched.phone && errors.phone && (
              <span id="err-phone" className={css.error}>{errors.phone}</span>
            )}
          </div>

          {/* Objetivo */}
          <div className={css.field}>
            <label htmlFor="goal">Objetivo</label>
            <select
              id="goal"
              name="goal"
              value={form.goal}
              onChange={onChange}
              onBlur={onBlur}
            >
              <option value="vivienda">Vivienda</option>
              <option value="inversion">Inversión</option>
            </select>
          </div>

          {/* Metraje */}
          <div className={css.field}>
            <label htmlFor="size">
              <Ruler className={css.icon} aria-hidden />
              Metraje deseado
            </label>
            <input
              id="size"
              name="size"
              placeholder="200–430 m²"
              value={form.size}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={!!errors.size}
              aria-describedby={errors.size ? "err-size" : undefined}
              required
            />
            {touched.size && errors.size && (
              <span id="err-size" className={css.error}>{errors.size}</span>
            )}
          </div>

          {/* Financiamiento */}
          <div className={css.field}>
            <label htmlFor="financing">
              <Wallet className={css.icon} aria-hidden />
              ¿Requieres financiamiento?
            </label>
            <select
              id="financing"
              name="financing"
              value={form.financing}
              onChange={onChange}
              onBlur={onBlur}
              aria-invalid={!!errors.financing}
              aria-describedby={errors.financing ? "err-fin" : undefined}
              required
            >
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>
            {touched.financing && errors.financing && (
              <span id="err-fin" className={css.error}>{errors.financing}</span>
            )}
          </div>

          {/* Fecha tentativa */}
          <div className={css.field}>
            <label htmlFor="visitDate">
              <Calendar className={css.icon} aria-hidden />
              Fecha tentativa de visita
            </label>
            <input
              id="visitDate"
              name="visitDate"
              type="date"
              value={form.visitDate}
              onChange={onChange}
              onBlur={onBlur}
            />
            <small className={css.hint}>Opcional — nos ajustamos a tu agenda.</small>
          </div>

          {/* CTA */}
          <div className={css.actions}>
            <button
              type="submit"
              className={css.btn}
              disabled={!canSubmit}
              aria-disabled={!canSubmit}
            >
              Enviar por WhatsApp
            </button>
            {!canSubmit && (
              <p className={css.help}>Completa los campos requeridos para continuar.</p>
            )}
          </div>
        </form>

        <p className={css.legal}>
          Al continuar, aceptas nuestro{" "}
          <a className={css.link} href="/legal/aviso-privacidad">
            aviso de privacidad
          </a>.
        </p>
      </div>
    </section>
  );
}
