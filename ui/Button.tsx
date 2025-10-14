"use client";
import css from "./Button.module.css";
type Props = { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "primary" | "ghost" | "soft"; size?: "md" | "lg"; };
export default function Button({ children, href, onClick, variant = "primary", size = "md" }: Props) {
  const cls = [css.btn, css[variant], css[size]].join(" ");
  if (href) return <a className={cls} href={href} onClick={onClick}>{children}</a>;
  return <button className={cls} onClick={onClick}>{children}</button>;
}
