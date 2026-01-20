"use client";

import { useRef, useState, useEffect, useMemo, ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP Eklentilerini Kaydet (Client-side check)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// BÖLÜM 1: TİP TANIMLAMALARI & VERİ MİMARİSİ
// ============================================================================

type Note = {
  name: string;
  desc: string;
  type: string;
};

type OlfactoryProfile = {
  top: Note[];
  heart: Note[];
  base: Note[];
};

type Chapter = {
  id: number;
  subtitle: string;
  text: string;
  mood: string;
};

type ProductTheme = {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  gradient: string;
  particleColor: string;
};

type ProductAssets = {
  image: string;
  texture: string;
};

type ProductIdentity = {
  name: string;
  sku: string;
  tagline: string;
  year: string;
  batch: string;
  family: string;
  concentration: string;
  origin: string;
};

interface Product {
  id: number;
  identity: ProductIdentity;
  assets: ProductAssets;
  palette: ProductTheme;
  narrative: Chapter[];
  olfactory: OlfactoryProfile;
  lifestyle: {
    outfit: string;
    drink: string;
    music: string;
    location: string;
    time: string;
  };
}

const products: Product[] = [
  {
    id: 1,
    identity: {
      name: "DARK OATH",
      sku: "NCT-001",
      tagline: "THE VOW",
      year: "EST. 2026",
      batch: "A-001",
      family: "Oryantal / Deri",
      concentration: "30% Extrait",
      origin: "Grasse, Fransa"
    },
    assets: {
      image: "/dark-oath.jpeg",
      texture: "/textures/leather.jpg"
    },
    palette: {
      primary: "#D4AF37", // Gold
      secondary: "#0a0a0a",
      accent: "#8a6d1c",
      glow: "rgba(212, 175, 55, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #1a1205 0%, #000000 90%)",
      particleColor: "rgba(212, 175, 55, 0.6)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "GECE YARISI",
        text: "Şehir sustuğunda uyananlar için. Deri koltukların gıcırtısı.",
        mood: "Sessiz"
      },
      {
        id: 2,
        subtitle: "MÜHÜR",
        text: "Bu bir koku değil; tene atılan ıslak bir imza. Geri dönüşü olmayan bir yemin.",
        mood: "Otoriter"
      },
      {
        id: 3,
        subtitle: "MİRAS",
        text: "Sen odayı terk ettikten saatler sonra bile, varlığın orayı yönetmeye devam eder.",
        mood: "Unutulmaz"
      }
    ],
    olfactory: {
      top: [
        { name: "Siyah Karabiber", desc: "Soğuk ateş.", type: "Baharat" },
        { name: "İtalyan Bergamot", desc: "Karanlığı delen ışık.", type: "Narenciye" },
        { name: "Menekşe Yaprağı", desc: "Metalik yeşil.", type: "Yeşil" }
      ],
      heart: [
        { name: "Somalya Tütsüsü", desc: "Kutsal duman.", type: "Reçine" },
        { name: "İsli Deri", desc: "Gücün kokusu.", type: "Hayvansal" },
        { name: "Tütün Yaprağı", desc: "Kuru sıcaklık.", type: "Aromatik" }
      ],
      base: [
        { name: "Siyah Ud", desc: "Karanlık reçine.", type: "Odunsu" },
        { name: "Haiti Vetiveri", desc: "Toprak kökü.", type: "Topraksı" },
        { name: "Sandal Ağacı", desc: "Kremsi veda.", type: "Odunsu" }
      ]
    },
    lifestyle: {
      outfit: "Siyah Deri Ceket",
      drink: "İsli Single Malt",
      music: "Viyolonsel Solosu",
      location: "Özel Üye Kulübü",
      time: "00:00 - 04:00"
    },
  },
  {
    id: 2,
    identity: {
      name: "OUTLAND",
      sku: "NCT-002",
      tagline: "THE FRONTIER",
      year: "EST. 2026",
      batch: "B-002",
      family: "Odunsu / Aromatik",
      concentration: "30% Extrait",
      origin: "Toskana, İtalya"
    },
    assets: {
      image: "/outland.jpeg",
      texture: "/textures/sand.jpg"
    },
    palette: {
      primary: "#ea580c", // Burnt Orange
      secondary: "#0f0502",
      accent: "#7c2d12",
      glow: "rgba(234, 88, 12, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #1f0a05 0%, #000000 90%)",
      particleColor: "rgba(234, 88, 12, 0.6)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "SINIR",
        text: "Haritanın bittiği yer. Medeniyetin kurallarının geçersiz olduğu o kızıl topraklar.",
        mood: "Vahşi"
      },
      {
        id: 2,
        subtitle: "DOĞA",
        text: "Yağmurun kurak toprağa ilk düştüğü an çıkan o çiğ, elektrikli ve ilkel koku.",
        mood: "Organik"
      },
      {
        id: 3,
        subtitle: "KEŞİF",
        text: "Bilinmeyene doğru atılan ilk adımın verdiği o tekinsiz ama bağımlılık yapan heyecan.",
        mood: "Özgür"
      }
    ],
    olfactory: {
      top: [
        { name: "Ardıç Meyveleri", desc: "Cin tonik ferahlığı.", type: "Aromatik" },
        { name: "Biberiye", desc: "Güneş yanığı otlar.", type: "Ot" },
        { name: "Adaçayı", desc: "Arındırıcı buhar.", type: "Ot" }
      ],
      heart: [
        { name: "Islak Toprak", desc: "Yağmur sonrası.", type: "Mineral" },
        { name: "Çam Reçinesi", desc: "Yapışkan öz.", type: "Reçine" },
        { name: "Sedir", desc: "Kuru odun.", type: "Odunsu" }
      ],
      base: [
        { name: "Meşe Yosunu", desc: "Nemli orman.", type: "Yosun" },
        { name: "Paçuli", desc: "Karanlık kökler.", type: "Odunsu" },
        { name: "Amber", desc: "Fosilleşmiş güneş.", type: "Reçine" }
      ]
    },
    lifestyle: {
      outfit: "Keten Gömlek, Bot",
      drink: "Negroni",
      music: "Desert Rock",
      location: "Açık Hava, Kanyon",
      time: "Gün Batımı"
    },
  },
  {
    id: 3,
    identity: {
      name: "GHOST TOWN",
      sku: "NCT-003",
      tagline: "THE MEMORY",
      year: "EST. 2026",
      batch: "C-003",
      family: "Mineral / Misk",
      concentration: "30% Extrait",
      origin: "İzlanda"
    },
    assets: {
      image: "/ghost-town.jpeg",
      texture: "/textures/fog.jpg"
    },
    palette: {
      primary: "#9ca3af", // Silver
      secondary: "#05070a",
      accent: "#4b5563",
      glow: "rgba(156, 163, 175, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #0d1117 0%, #000000 90%)",
      particleColor: "rgba(200, 200, 200, 0.4)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "TERK EDİLİŞ",
        text: "Boş bir sahil kasabası. Kırık camlardan içeri dolan soğuk, tuzlu rüzgar.",
        mood: "Melankolik"
      },
      {
        id: 2,
        subtitle: "HAYALET",
        text: "Sönmüş bir ateşten kalan küller. Varlığın değil, yokluğun en güçlü olduğu o an.",
        mood: "Sessiz"
      },
      {
        id: 3,
        subtitle: "ANILAR",
        text: "Asla geri gelmeyecek olan o anın, zihinde bıraktığı silik ve flu fotoğraf.",
        mood: "Nostaljik"
      }
    ],
    olfactory: {
      top: [
        { name: "Metalik Aldehitler", desc: "Soğuk bıçak.", type: "Sentetik" },
        { name: "Deniz Tuzu", desc: "Tuzlu tat.", type: "Mineral" },
        { name: "Ozon", desc: "Elektrikli hava.", type: "Havadar" }
      ],
      heart: [
        { name: "Menekşe", desc: "Pudralı hüzün.", type: "Çiçeksi" },
        { name: "Soğuk Kül", desc: "Yanmış odun.", type: "Duman" },
        { name: "Hafif Tütsü", desc: "Uzak dua.", type: "Reçine" }
      ],
      base: [
        { name: "Mineral Akoru", desc: "Islak taşlar.", type: "Mineral" },
        { name: "Beyaz Misk", desc: "Temiz ten.", type: "Misk" },
        { name: "Sedir", desc: "Yıkanmış odun.", type: "Odunsu" }
      ]
    },
    lifestyle: {
      outfit: "Oversize Gri Palto",
      drink: "Votka Martini (Dry)",
      music: "Ambient Piyano",
      location: "Sanat Galerisi",
      time: "Sabahın Erken Saatleri"
    },
  },
  {
    id: 4,
    identity: {
      name: "LIQUID CHROME",
      sku: "NCT-004",
      tagline: "THE FUTURE",
      year: "EST. 2026",
      batch: "D-004",
      family: "Narenciye / Metalik",
      concentration: "30% Extrait",
      origin: "Tokyo, Japonya"
    },
    assets: {
      image: "/liquid-chrome.jpeg",
      texture: "/textures/metal.jpg"
    },
    palette: {
      primary: "#22d3ee", // Cyan
      secondary: "#02080a",
      accent: "#0e7490",
      glow: "rgba(34, 211, 238, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #021217 0%, #000000 90%)",
      particleColor: "rgba(34, 211, 238, 0.6)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "HIZ",
        text: "Tokyo otobanında gece yarısı. Neon ışıklarının ıslak asfalttaki yansıması.",
        mood: "Elektrikli"
      },
      {
        id: 2,
        subtitle: "METAL",
        text: "Sıcak bir dilde eriyen buz parçası. Steril, kusursuz, soğuk ve yapay.",
        mood: "Fütüristik"
      },
      {
        id: 3,
        subtitle: "YARIN",
        text: "Gelecek henüz gelmedi, ama kokusu şimdiden teninde. Metalik bir rüya.",
        mood: "Sentetik"
      }
    ],
    olfactory: {
      top: [
        { name: "Buzlu Greyfurt", desc: "Şoklayıcı soğuk.", type: "Narenciye" },
        { name: "Misket Limonu", desc: "Asidik enerji.", type: "Narenciye" },
        { name: "Taze Nane", desc: "Mentollü nefes.", type: "Ot" }
      ],
      heart: [
        { name: "Limon Otu", desc: "Yeşil enerji.", type: "Ot" },
        { name: "Metalik Mineral", desc: "Krom yüzey.", type: "Sentetik" },
        { name: "Cin Akoru", desc: "Ardıç alkolü.", type: "İçki" }
      ],
      base: [
        { name: "Beyaz Misk", desc: "Steril temizlik.", type: "Misk" },
        { name: "Beyaz Sedir", desc: "Pürüzsüz yüzey.", type: "Odunsu" },
        { name: "Ambroxan", desc: "Modern derinlik.", type: "Moleküler" }
      ]
    },
    lifestyle: {
      outfit: "Teknik Kumaşlar",
      drink: "Cin Tonik",
      music: "Techno / Synthwave",
      location: "Rooftop Bar",
      time: "Gece Yarısı"
    },
  },
  {
    id: 5,
    identity: {
      name: "SOLAR FLARE",
      sku: "NCT-005",
      tagline: "THE COLLAPSE",
      year: "EST. 2026",
      batch: "E-005",
      family: "Baharatlı / Amber",
      concentration: "30% Extrait",
      origin: "Marakeş, Fas"
    },
    assets: {
      image: "/solar-flare.jpeg",
      texture: "/textures/magma.jpg"
    },
    palette: {
      primary: "#ef4444", // Red
      secondary: "#1a0505",
      accent: "#991b1b",
      glow: "rgba(239, 68, 68, 0.12)",
      gradient: "radial-gradient(circle at 50% 50%, #1f0505 0%, #000000 90%)",
      particleColor: "rgba(239, 68, 68, 0.6)"
    },
    narrative: [
      {
        id: 1,
        subtitle: "ÇÖKÜŞ",
        text: "Bir yıldızın ömrünü tamamlayıp içine çöktüğü o sessiz, sıcak ve kırmızı an.",
        mood: "Yoğun"
      },
      {
        id: 2,
        subtitle: "PATLAMA",
        text: "Tarçının ateşi, kehribarın sıcaklığıyla birleşiyor. Yıkıcı bir enerji dalgası.",
        mood: "Tehlikeli"
      },
      {
        id: 3,
        subtitle: "ÇEKİM",
        text: "Yaklaşmaya cesaret edenleri yakan, kaçılması imkansız bir yerçekimi.",
        mood: "Manyetik"
      }
    ],
    olfactory: {
      top: [
        { name: "Kan Portakalı", desc: "Koyu kırmızı su.", type: "Narenciye" },
        { name: "Karabiber", desc: "Gıdıklayan ısı.", type: "Baharat" },
        { name: "Pembe Biber", desc: "Meyvemsi baharat.", type: "Baharat" }
      ],
      heart: [
        { name: "Yanık Tarçın", desc: "Karamelize.", type: "Baharat" },
        { name: "Laden Reçinesi", desc: "Balzamik öz.", type: "Reçine" },
        { name: "Tütsü", desc: "Dumanlı dua.", type: "Reçine" }
      ],
      base: [
        { name: "Sıcak Amber", desc: "Erimiş altın.", type: "Reçine" },
        { name: "Kaşmir Ağacı", desc: "Yumuşak şal.", type: "Odunsu" },
        { name: "Vanilya", desc: "Bağımlılık.", type: "Gourmand" }
      ]
    },
    lifestyle: {
      outfit: "Kadife Ceket",
      drink: "Konyak",
      music: "Caz / Soul",
      location: "Şömine Başı",
      time: "Gece"
    },
  }
];


// ============================================================================
// BÖLÜM 2: ATOMİK BİLEŞENLER (ATOMIC DESIGN)
// ============================================================================

// 2.1 Atmosferik Partikül Motoru (Ultra-Hafif & Fizik Tabanlı)
const AtmosphericParticles = ({ color }: { color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animationFrameId: number;
    
    // Performans için partikül sayısını optimize ettik
    const particleCount = 35;
    const particles: any[] = [];

    // Partikül Fabrikası
    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 0.15, // Çok yavaş süzülme
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.5,
      fadeSpeed: 0.003 + Math.random() * 0.003
    });

    // Başlangıç seti
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        // Pozisyon güncelleme
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Ekrandan çıkarsa karşıdan getir (Wrap)
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Nefes alma efekti (Opaklık salınımı)
        p.opacity += p.fadeSpeed;
        if (p.opacity >= 0.7 || p.opacity <= 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        // Çizim
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.abs(p.opacity);
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-70" />;
};


// 2.2 Manyetik Buton (Premium Feel)
const MagneticButton = ({ children, className, primaryColor }: { children: ReactNode, className?: string, primaryColor: string }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const content = contentRef.current;
    if (!btn || !content) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Çekim alanı
      if (Math.abs(x) < 150 && Math.abs(y) < 60) {
        gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3, ease: "power2.out" });
        gsap.to(content, { x: x * 0.1, y: y * 0.1, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
        gsap.to(content, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <button 
      ref={btnRef} 
      className={`relative group ${className}`}
      style={{ borderColor: `${primaryColor}40` }}
    >
      {/* Hover Background */}
      <div 
        className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ backgroundColor: primaryColor }}
      ></div>
      
      <div ref={contentRef} className="relative z-10 flex items-center justify-center gap-3">
        {children}
      </div>
    </button>
  );
};


// 2.3 Kelime Ayırıcı (Tipografik Animasyon İçin)
const SplitText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className="char inline-block translate-y-full opacity-0 will-change-transform"
          style={{ transitionDelay: `${delay + i * 0.02}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};


// 2.4 Koku Kimliği Izgarası (Editoryal Layout)
const OlfactoryGrid = ({ olfactory, color }: { olfactory: OlfactoryProfile, color: string }) => {
  return (
    <div className="space-y-12">
      
      {/* ÜST NOTALAR */}
      <div className="olfactory-section opacity-0 translate-y-4 transition-all duration-700">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-1 rounded-full bg-white/40"></span>
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">TOP NOTES</span>
          <div className="h-[1px] flex-1 bg-white/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {olfactory.top.map((note, i) => (
            <div key={i} className="group">
              <span className="block text-[9px] uppercase tracking-widest text-white/30 mb-1">{note.type}</span>
              <h4 className="text-white text-sm font-medium mb-1 group-hover:text-white/80 transition-colors">{note.name}</h4>
              <p className="text-[10px] text-white/40 font-light leading-relaxed">{note.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* KALP NOTALAR (VURGULU) */}
      <div className="olfactory-section opacity-0 translate-y-4 transition-all duration-700 delay-100">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: color }}>HEART NOTES</span>
          <div className="h-[1px] flex-1" style={{ backgroundColor: `${color}20` }}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {olfactory.heart.map((note, i) => (
            <div key={i} className="group border-l border-white/5 pl-4 hover:border-white/20 transition-colors">
              <span className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: `${color}60` }}>{note.type}</span>
              <h4 className="text-white text-lg font-serif italic mb-1">{note.name}</h4>
              <p className="text-[10px] text-white/40 font-light leading-relaxed">{note.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* DİP NOTALAR */}
      <div className="olfactory-section opacity-0 translate-y-4 transition-all duration-700 delay-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-1 rounded-full bg-white/40"></span>
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">BASE NOTES</span>
          <div className="h-[1px] flex-1 bg-white/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {olfactory.base.map((note, i) => (
            <div key={i} className="group">
              <span className="block text-[9px] uppercase tracking-widest text-white/30 mb-1">{note.type}</span>
              <h4 className="text-white text-sm font-medium mb-1">{note.name}</h4>
              <p className="text-[10px] text-white/40 font-light leading-relaxed">{note.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};


// ============================================================================
// BÖLÜM 3: ANA SAHNE YAPISI (IMMERSIVE SHOWCASE)
// ============================================================================

export default function ProductShowcase() {
  const container = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Takibi (Optimize Edilmiş)
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ 
            x: (e.clientX / window.innerWidth) * 2 - 1, 
            y: (e.clientY / window.innerHeight) * 2 - 1 
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    const panels = gsap.utils.toArray(".product-stage");

    panels.forEach((panel: any) => {
      
      // DOM Seçicileri
      const hero = panel.querySelector(".hero-bottle");
      const bgTitleChars = panel.querySelectorAll(".bg-title .char");
      const glow = panel.querySelector(".atmospheric-glow");
      const leftContent = panel.querySelector(".left-content");
      const rightContent = panel.querySelector(".right-content");
      const chapter1 = panel.querySelector(".chapter-1");
      const chapter2 = panel.querySelector(".chapter-2");
      const chapter3 = panel.querySelector(".chapter-3");
      const olfSections = panel.querySelectorAll(".olfactory-section");

      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top top", 
          end: "+=3500", // Belgesel tadında uzunluk
          pin: true,     
          scrub: 1,      
          anticipatePin: 1
        }
      });

      // --- FAZ 1: ATMOSFER VE GİRİŞ (THE ARRIVAL) ---
      tl.to(glow, { opacity: 1, scale: 1, duration: 2, ease: "sine.out" })
        .to(bgTitleChars, { y: "0%", opacity: 0.08, duration: 2, stagger: 0.05, ease: "power4.out" }, "<")
        .fromTo(hero, 
          { scale: 0.85, opacity: 0, filter: "blur(20px)" }, 
          { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "power3.out" }, "<"
        )
        .to([leftContent, rightContent], { autoAlpha: 1, duration: 1 }, "-=1");


      // --- FAZ 2: HİKAYE AKIŞI (NARRATIVE FLOW) ---
      // Bölüm 1 Gelir
      tl.fromTo(chapter1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2 });
      // Bölüm 1 Gider, 2 Gelir
      tl.to(chapter1, { opacity: 0, filter: "blur(5px)", duration: 1, delay: 1 })
        .fromTo(chapter2, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2 });
      // Bölüm 2 Gider, 3 Gelir
      tl.to(chapter2, { opacity: 0, filter: "blur(5px)", duration: 1, delay: 1 })
        .fromTo(chapter3, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2 });


      // --- FAZ 3: ANALİZ & KİMLİK (DECONSTRUCTION) ---
      // Şişe sola kayar, sağ panel açılır
      tl.to(hero, { x: "-22vw", scale: 0.85, duration: 2, ease: "power2.inOut" }, "-=1")
        .fromTo(rightContent, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 2 }, "<");

      // Notalar sırayla belirir
      tl.to(olfSections, { opacity: 1, y: 0, stagger: 0.3, duration: 1.5 }, "-=0.5");
      

      // --- FAZ 4: VEDA (DEPARTURE) ---
      // Sonraki sahneye temiz geçiş
      tl.to([hero, glow, bgTitleChars, rightContent, chapter3], { 
        opacity: 0, 
        scale: 1.05, 
        filter: "blur(15px)", 
        duration: 2, 
        delay: 1 
      });

    });

  }, { scope: container });


  return (
    <section ref={container} className="bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* GLOBAL DOKU */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      {/* ÜRÜN SAHNELERİ */}
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className="product-stage relative w-full h-screen flex overflow-hidden border-b border-white/5 sticky top-0"
          style={{ 
            zIndex: index + 1,
            background: product.palette.gradient 
          }} 
        >
          
          {/* KATMAN A: ATMOSFER */}
          <div 
            className="atmospheric-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[1400px] md:h-[1400px] rounded-full blur-[250px] opacity-0 z-0 pointer-events-none"
            style={{ backgroundColor: product.palette.glow }}
          />
          <AtmosphericParticles color={product.palette.particleColor} />

          {/* KATMAN B: DEVASA TİPOGRAFİ (ARKA PLAN) */}
          <div className="bg-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none w-full text-center">
             <h1 
                className="text-[18vw] md:text-[22vw] font-serif font-bold text-transparent whitespace-nowrap leading-none"
                style={{ WebkitTextStroke: `1px rgba(255,255,255,0.06)` }}
             >
                <SplitText text={product.identity.name.split(' ')[0]} />
             </h1>
          </div>

          {/* KATMAN C: ANA SAHNE (3 SÜTUNLU IZGARA) */}
          <div className="relative z-20 w-full h-full max-w-[1920px] mx-auto grid grid-cols-12 px-6 md:px-16 pointer-events-none">
            
            {/* 1. SOL PANEL: HİKAYE (STORYTELLING) */}
            <div className="left-content col-span-12 md:col-span-4 flex flex-col justify-center h-full relative z-30 invisible opacity-0">
              
              <div className="absolute top-1/2 -translate-y-1/2 w-full pr-8">
                
                {/* Bölüm 1 */}
                <div className="chapter-1 absolute top-0 left-0 opacity-0 w-full">
                  <span className="text-[10px] tracking-[0.4em] uppercase block mb-6 text-white/40">
                    {product.narrative[0].subtitle}
                  </span>
                  <p className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed">
                    "{product.narrative[0].text}"
                  </p>
                  <div className="mt-8 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.palette.primary }}></div>
                    <span className="text-[10px] text-white/50 tracking-widest uppercase">{product.narrative[0].mood}</span>
                  </div>
                </div>

                {/* Bölüm 2 */}
                <div className="chapter-2 absolute top-0 left-0 opacity-0 w-full">
                  <span className="text-[10px] tracking-[0.4em] uppercase block mb-6" style={{ color: product.palette.primary }}>
                    {product.narrative[1].subtitle}
                  </span>
                  <p className="text-xl md:text-3xl font-serif italic text-white leading-relaxed">
                    {product.narrative[1].text}
                  </p>
                  <div className="mt-8 w-12 h-[1px] bg-white/20"></div>
                </div>

                {/* Bölüm 3 */}
                <div className="chapter-3 absolute top-0 left-0 opacity-0 w-full">
                  <span className="text-[10px] tracking-[0.4em] uppercase block mb-6 text-white/40">
                    {product.narrative[2].subtitle}
                  </span>
                  <p className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed">
                    "{product.narrative[2].text}"
                  </p>
                </div>

              </div>
            </div>


            {/* 2. ORTA PANEL: KAHRAMAN ŞİŞE */}
            <div className="col-span-12 md:col-span-4 relative flex items-center justify-center h-full z-20">
              <div 
                className="hero-bottle relative w-[60vh] h-[60vh] md:w-[60vh] md:h-[80vh] pointer-events-auto cursor-none group"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
                  transition: "transform 0.2s ease-out"
                }}
              >
                <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
                <Image
                  src={product.assets.image}
                  alt={product.identity.name}
                  fill
                  quality={100}
                  className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
                  priority={index === 0}
                />
              </div>
            </div>


            {/* 3. SAĞ PANEL: KİMLİK & DETAYLAR */}
            <div className="right-content col-span-12 md:col-span-4 flex flex-col justify-center items-end h-full relative z-30 pl-8 border-l border-white/5 invisible opacity-0">
              
              {/* Başlık Grubu */}
              <div className="mb-16 text-right w-full">
                <div className="flex justify-end items-center gap-4 mb-2">
                  <span className="text-[10px] tracking-[0.3em] text-white/50">{product.identity.sku}</span>
                  <span className="text-xs font-mono text-white/30">NO. 0{index + 1}</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-serif text-white leading-none mb-4 tracking-tight">{product.identity.name}</h2>
                <div className="flex justify-end items-center gap-4">
                  <span className="w-8 h-[1px]" style={{ backgroundColor: product.palette.primary }}></span>
                  <span className="text-xs tracking-[0.4em] uppercase font-bold text-white/90">
                    {product.identity.tagline}
                  </span>
                </div>
              </div>

              {/* Olfactory Grid */}
              <div className="w-full mb-12">
                <OlfactoryGrid olfactory={product.olfactory} color={product.palette.primary} />
              </div>

            </div>

          </div>

        </div>
      ))}

    </section>
  );
}