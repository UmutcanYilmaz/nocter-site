import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy"; // Yeni eklenen
import ProductShowcase from "@/components/ProductShowcase";
import BeforeFooter from "@/components/BeforeFooter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <Philosophy />
      <ProductShowcase />
      <BeforeFooter />
      <Footer />
    </main>
  );
}