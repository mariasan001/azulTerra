import css from "./Footer.module.css";
import { ENV } from "@/lib/env";
import Link from "next/link";
import { Phone, Mail, Clock, Facebook, Instagram, Send } from "lucide-react";
const BRAND = ENV.BRAND || "AzulTerra";
const PHONE = ENV.PHONE || "+52 55 0000 0000";
const EMAIL = ENV.EMAIL || "ventas@azulterra.mx";
const WHATS = ENV.WA || "525500000000"; // <- antes usabas ENV.WHATSAPP
const HOURS = ENV.HOURS || "Lun–Vie 9:00–18:00";
const VERIFY_URL = ENV.VERIFY_URL || "#";
const AUREAN_URL = ENV.AUREAN_URL || "https://aurean.mx";

const waHref = `https://wa.me/${WHATS.replace(/\D/g, "")}`;

export default function Footer() {
  return (
    <footer id="contacto" className={css.footer}>
      <div className="container">
        <div className={css.shell}>
          {/* Columna 1: Marca */}
          <div className={css.colBrand}>
            <div className={css.brand}>{BRAND}</div>
            <p className={css.tagline}>Terrenos listos para construir.</p>

            <a className={css.verify} href={VERIFY_URL} target="_blank" rel="noreferrer">
              <span className={css.dot} /> Empresa verificada
            </a>
          </div>

          {/* Columna 2: Contacto */}
          <div className={css.col}>
            <div className={css.head}>Contacto</div>
            <ul className={css.list}>
              <li>
                <a className={css.row} href={`tel:${PHONE.replace(/\s/g,"")}`}>
                  <Phone size={16}/> <span>{PHONE}</span>
                </a>
              </li>
              <li>
                <a className={css.row} href={`mailto:${EMAIL}`}>
                  <Mail size={16}/> <span>{EMAIL}</span>
                </a>
              </li>
              <li className={css.rowMuted}>
                <Clock size={16}/> <span>{HOURS}</span>
              </li>
            </ul>

            <a className={css.waBtn} href={waHref} target="_blank" rel="noreferrer">
              <Send size={16}/> WhatsApp
            </a>
          </div>

          {/* Columna 3: Enlaces */}
          <div className={css.col}>
            <div className={css.head}>Enlaces</div>
            <nav className={css.links}>
              <Link className={css.a} href="#ubicacion">Ubicación</Link>
              <Link className={css.a} href="#lotes">Lotes</Link>
              <Link className={css.a} href="#financiamiento">Financiamiento</Link>
              <Link className={css.a} href="#proceso">Proceso</Link>
              <Link className={css.a} href="#faq">Preguntas frecuentes</Link>
              <Link className={css.a} href="/legal/aviso-privacidad">Aviso de privacidad</Link>
              
            </nav>
          </div>

          {/* Columna 4: Social */}
          <div className={css.col}>
            <div className={css.head}>Síguenos</div>
            <div className={css.social}>
              <a className={css.s} href={ENV.FB_URL || "#"} target="_blank" rel="noreferrer" aria-label="Facebook">
                <Facebook size={18}/>
              </a>
              <a className={css.s} href={ENV.IG_URL || "#"} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram size={18}/>
              </a>
              <a className={css.s} href={waHref} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <Send size={18}/>
              </a>
            </div>
          </div>
        </div>

        {/* Línea final */}
        <div className={css.bottom}>
          <div className={css.copy}>
            © {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.
          </div>
          <div className={css.by}>
            Desarrollado por <a href={AUREAN_URL} target="_blank" rel="noreferrer">Aurean</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
