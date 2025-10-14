import css from "./page.module.css";
export default function Aviso(){
  return (
    <div className={`container ${css.wrap}`}>
      <h1 className="h2">Aviso de privacidad</h1>
      <p className="p">Este es un texto de ejemplo. Aquí se describen las finalidades del tratamiento de datos, medios de contacto y ejercicio de derechos ARCO.</p>
      <p className="p">Actualiza este contenido con tu asesor legal antes de publicar.</p>
    </div>
  );
}
