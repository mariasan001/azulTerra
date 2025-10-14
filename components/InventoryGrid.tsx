import css from "./InventoryGrid.module.css";
import Reveal from "./Reveal";

const lots = [
  { name:"Lote Tipo A", size:"200–250 m²", price:"Desde $X,XXX/m²" },
  { name:"Lote Tipo B", size:"250–300 m²", price:"Desde $X,XXX/m²" },
  { name:"Lote Esquina", size:"300–430 m²", price:"Consulta precio" },
  { name:"Lote Panorámico", size:"+350 m²", price:"Consulta precio" },
  { name:"Lote Central", size:"220–260 m²", price:"Desde $X,XXX/m²" },
  { name:"Lote Premium", size:"280–330 m²", price:"Consulta precio" },
];

export default function InventoryGrid(){
  return (
    <div id="lotes" className="container">
      <div className={css.head}>
        <h2 className="h2">Explora nuestra colección</h2>
        <p className="p">Selecciona tu lote ideal por metraje, orientación o cercanía a amenidades.</p>
      </div>
      <div className={css.grid}>
        {lots.map((l,i)=>(
          <Reveal key={i}>
            <article className={css.card}>
              <div className={css.thumb}/>
              <div className={css.meta}>
                <div className={css.name}>{l.name}</div>
                <div className={css.size}>{l.size}</div>
              </div>
              <div className={css.price}>{l.price}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
