"use client";
import { useEffect, useRef } from "react";
import css from "./StatsStrip.module.css";

type Stat = { v: number; suffix?: string; l: string };

const stats: Stat[] = [
  { v: 500, suffix: "+", l: "Clientes interesados" },
  { v: 20,  suffix: "+", l: "Proyectos" },
  { v: 50,  suffix: "+", l: "Visitas al mes" },
  { v: 1,   suffix: "°", l: "Plusvalía en la zona" },
];

export default function StatsStrip(){
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-target]"));
    if (!items.length) return;

    const animate = (el: HTMLElement) => {
      const target = Number(el.dataset.target || "0");
      const suffix = el.dataset.suffix || "";
      if (prefersReduced || target === 0) {
        el.textContent = `${target}${suffix}`;
        return;
      }
      let start: number | null = null;
      const duration = 900; // ms
      const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

      const step = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        const val = Math.round(target * ease(p));
        el.textContent = `${val}${suffix}`;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.classList.add(css.in);     // dispara animación visual
            const num = el.querySelector<HTMLElement>(`.${css.val}`);
            if (num) animate(num);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );

    items.forEach((card) => io.observe(card));
    return () => io.disconnect();
  }, []);

  return (
    <div className="container">
      <div className={css.box} ref={wrapRef}>
        {stats.map((s, i) => (
          <article
            key={i}
            className={css.item}
            style={{ ["--d" as any]: `${i * 70}ms` }}
            data-target // para seleccionar con el observer
          >
            <div
              className={css.val}
              data-target={s.v}
              data-suffix={s.suffix || ""}
              aria-label={`${s.v}${s.suffix || ""}`}
            >
              0
            </div>
            <div className={css.lab}>{s.l}</div>
            <div className={css.edge} aria-hidden />
          </article>
        ))}
      </div>
    </div>
  );
}
