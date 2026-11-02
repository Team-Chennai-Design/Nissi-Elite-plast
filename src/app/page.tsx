import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyUpvc from "@/components/WhyUpvc";
import ProductCatalog from "@/components/ProductCatalog";
import ImageSlideshow from "@/components/ImageSlideshow";
import ColorFinishes from "@/components/ColorFinishes";
import Manufacturing from "@/components/Manufacturing";
import HardwareSection from "@/components/HardwareSection";
import BrochureModal from "@/components/BrochureModal";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-orange-600 selection:text-white">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <WhyUpvc />
        <ProductCatalog />
        <ImageSlideshow />
        <ColorFinishes />
        <Manufacturing />
        <HardwareSection />
        <BrochureModal />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
