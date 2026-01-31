"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP Kayıt
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// VERİ MİMARİSİ
// ============================================================================

const sitemap = [
  {
    title: "KOLEKSİYON",
    links: [
      { label: "Tüm Parfümler", href: "#" },
      { label: "Discovery Sets", href: "#" },
      { label: "Limited Edition", href: "#" },
    ]
  },
  {
    title: "DÜNYAMIZ",
    links: [
      { label: "Philosophy", href: "#" },
      { label: "The Ritual", href: "#" },
      { label: "Sustainability", href: "#" }
    ]
  }
];

const offices = [
  { city: "ISTANBUL", timezone: "Europe/Istanbul" },
  { city: "ANKARA", timezone: "Europe/Istanbul" },
  { city: "NEW YORK", timezone: "America/New_York" }
];

const legal = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" }
];


// ============================================================================
// YARDIMCI BİLEŞENLER
// ============================================================================

// 1. Canlı Şehir Saati (Minimalist)
const OfficeTicker = ({ city, timezone }: { city: string, timezone: string }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        timeZone: timezone, 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(date));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Dakikada bir değil saniyede bir güncelle
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="group flex items-center justify-between py-4 border-b border-white/5 hover:border-[#D4AF37]/50 transition-colors duration-500">
      <span className="text-xl md:text-2xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">{city}</span>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full opacity-50 group-hover:opacity-100 group-hover:animate-pulse"></span>
        <span className="text-xs font-mono text-white/40 group-hover:text-white/80 transition-colors">{time}</span>
      </div>
    </div>
  );
};

// 2. Manyetik Link (Text Hover)
const FooterLink = ({ label, href }: { label: string, href: string }) => {
  return (
    <Link href={href} className="group block w-fit">
      <div className="relative overflow-hidden">
        <span className="block text-sm text-white/60 group-hover:text-white transition-all duration-500 group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute top-0 left-0 block text-sm text-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-all duration-500">
          {label}
        </span>
      </div>
    </Link>
  );
};


// ============================================================================
// ANA BİLEŞEN (FOOTER)
// ============================================================================

export default function Footer() {
  const container = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Mouse Fizik (Title Distortion)
  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      
      gsap.to(title, {
        skewX: x,
        x: x * 20,
        duration: 1,
        ease: "power3.out"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Giriş Animasyonu
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
      }
    });

    tl.fromTo(".footer-reveal", 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: "power4.out" }
    );

  }, { scope: container });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={container} className="relative bg-black text-white pt-48 pb-12 overflow-hidden border-t border-white/5 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Arka Plan Deseni */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
      
      {/* Dekoratif Çizgi */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#D4AF37] to-transparent opacity-50"></div>


      <div className="container mx-auto px-6 md:px-16 relative z-10">
        
        {/* 1. ÜST BÖLÜM: NAVİGASYON & OFİSLER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-48">
          
          {/* Sol: Site Haritası (Koleksiyon & Dünyamız) */}
          <div className="md:col-span-5 grid grid-cols-2 gap-12">
            {sitemap.map((section, i) => (
              <div key={i} className="footer-reveal space-y-8">
                <h4 className="text-[10px] tracking-[0.4em] text-white/20 uppercase">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <FooterLink label={link.label} href={link.href} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Sağ: Ofisler (Estetik Liste) */}
          <div className="md:col-span-7 md:pl-24 footer-reveal">
            <h4 className="text-[10px] tracking-[0.4em] text-white/20 uppercase mb-8 text-right md:text-left">
              GLOBAL PRESENCE
            </h4>
            <div className="space-y-2">
              {offices.map((office, i) => (
                <OfficeTicker key={i} city={office.city} timezone={office.timezone} />
              ))}
            </div>
          </div>

        </div>


        {/* 2. ORTA BÖLÜM: DEVASA LOGO (INTERAKTIF) */}
        <div className="relative w-full mb-12 footer-reveal select-none group">
          
          {/* Üst Bilgi Satırı */}
          <div className="flex justify-between items-end mb-4 opacity-30 group-hover:opacity-60 transition-opacity duration-500">
             <span className="text-[10px] tracking-[0.2em] uppercase">High Fidelity Fragrance</span>
             <span className="text-[10px] tracking-[0.2em] uppercase">Est. 2026</span>
          </div>
          
          {/* Logo */}
          <h1 
            ref={titleRef}
            className="text-[18vw] font-serif font-bold text-center leading-[0.75] tracking-tighter text-[#E5E5E5] mix-blend-difference cursor-default"
            style={{ textShadow: "0 0 50px rgba(255,255,255,0.05)" }}
          >
            NOCTÉR
          </h1>
        </div>


        {/* 3. ALT BÖLÜM: COPYRIGHT & NOSCANDA */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 footer-reveal">
          
          {/* Sol: Yasal */}
          <div className="flex gap-8 text-[10px] tracking-[0.2em] text-white/30 uppercase">
            {legal.map((item, i) => (
              <Link key={i} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Orta: Ana Şirket */}
          <div className="text-center">
            <p className="text-[9px] text-[#D4AF37]/60 tracking-[0.3em] uppercase">
              A <span className="text-[#D4AF37] font-bold">NOSCANDA GROUP</span> COMPANY
            </p>
          </div>

          {/* Sağ: Başa Dön */}
          <button 
            onClick={scrollToTop}
            aria-label="Back to top"
            className="text-[10px] tracking-[0.2em] text-white/30 uppercase hover:text-white transition-colors flex items-center gap-2 group"
          >
            Back to Top
            <span className="group-hover:-translate-y-1 transition-transform duration-300" aria-hidden="true">↑</span>
          </button>

        </div>

      </div>
    </footer>
  );
}