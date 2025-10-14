import css from "./Footer.module.css";
import { ENV } from "@/lib/env";
export default function Footer(){
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.grid}>
          <div><div className={css.brand}>{ENV.BRAND}</div><p className="p">Terrenos listos para construir.</p></div>
          <div className={css.links}><a className={css.a} href="/legal/aviso-privacidad">Aviso de privacidad</a><a className={css.a} href="#faq">Preguntas frecuentes</a></div>
        </div>
        <div className={css.copy}>© {new Date().getFullYear()} {ENV.BRAND}. Todos los derechos reservados.</div>
      </div>
    </footer>
  );
}
