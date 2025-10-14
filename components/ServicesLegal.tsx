import css from "./ServicesLegal.module.css";
import Reveal from "./Reveal";

export default function ServicesLegal(){
  return (
    <div className="container">
      <div className={css.wrap}>
        <div className={css.media}/>
        <div className={css.copy}>
          <h2 className="h2">Servicios y respaldo legal</h2>
          <ul className={css.list}>
            <li>Agua, luz, drenaje</li>
            <li>Calles trazadas</li>
            <li>Uso de suelo habitacional/comercial*</li>
            <li>Propiedad privada</li>
          </ul>
          <p className="p">*Consultar disponibilidad y condiciones.</p>
        </div>
      </div>
    </div>
  );
}
