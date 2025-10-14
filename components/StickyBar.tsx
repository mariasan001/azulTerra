"use client";
import css from "./StickyBar.module.css";
import { waLink } from "@/lib/wa";
import { track, EVENTS } from "@/lib/track";
import { PhoneCall } from "lucide-react";
import Button from "@/ui/Button";

export default function StickyBar(){
  const onClick = () => track(EVENTS.WA_CLICK_STICKY, { placement:"sticky" });
  return (
    <div className={css.wrap}>
      <Button href={waLink("Hola, quiero cotizar por WhatsApp")} onClick={onClick} size="lg">
        <PhoneCall/> Cotizar por WhatsApp
      </Button>
    </div>
  );
}
