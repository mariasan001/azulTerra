import Header from "@/components/Header";
import StickyBar from "@/components/StickyBar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import LocationBlock from "@/components/LocationBlock";
import InventoryGrid from "@/components/InventoryGrid";
import ServicesLegal from "@/components/ServicesLegal";
import FinancingBlock from "@/components/FinancingBlock";
import ProcessSteps from "@/components/ProcessSteps";
import Gallery from "@/components/Gallery";
import FaqForum from "@/components/FaqForum";
import VisitTeaser from "@/components/VisitTeaser";
import WaForm from "@/components/WaForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <StickyBar />
      <Header />

      {/* 👇 Hero SOLO una vez y sin section wrapper extra */}
      <Hero />

      {/* El resto de secciones sí van en contenedores/sections */}
      <main className="container" style={{ display: "grid", gap: "48px", padding: "48px 0" }}>
        <StatsStrip />
        <LocationBlock />
        <InventoryGrid />
        <ServicesLegal />
        <FinancingBlock />
        <ProcessSteps />
        <Gallery />
        <FaqForum />
        <VisitTeaser />
        <WaForm />
      </main>

      <Footer />
    </>
  );
}
