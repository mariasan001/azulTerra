import css from "./Gallery.module.css";
export default function Gallery(){
  return (
    <div className="container">
      <h2 className="h2">Galería</h2>
      <div className={css.grid}>
        {Array.from({length:8}).map((_,i)=>(<div key={i} className={css.item}/>))}
      </div>
    </div>
  );
}
