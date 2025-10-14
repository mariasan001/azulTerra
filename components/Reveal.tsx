"use client";
import { useEffect, useRef } from "react";
export default function Reveal({children}:{children: React.ReactNode}){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ el.classList.add("in"); io.disconnect(); } }, { threshold:.1 });
    io.observe(el); return ()=> io.disconnect();
  },[]);
  return <div className="reveal" ref={ref}>{children}</div>;
}
