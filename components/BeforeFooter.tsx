"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP Eklentilerini Kaydet
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// BÖLÜM 1: VERİ MİMARİSİ (CONTENT LAYER)
// ============================================================================

type SocialPost = {
  id: number;
  type: "image" | "quote";
  src: string; 
  alt: string;
  likes: string;
  caption: string;
  user: string;
};

type JournalEntry = {
  id: number;
  category: string;
  title: string;
  date: string;
  readTime: string;
  image: string;
};

type LinkItem = {
  label: string;
  href: string;
  sub: string;
  icon: React.ReactNode;
};

// --- SOSYAL MEDYA AKIŞI ---
const socialFeed: SocialPost[] = [
  { id: 1, type: "image", src: "radial-gradient(circle, #222, #000)", alt: "Noir Mood", likes: "12.4K", caption: "Geceyi mühürle.", user: "@nocterofficial" },
  { id: 2, type: "quote", src: "#0a0a0a", alt: "Manifesto", likes: "8.2K", caption: "Sessizlik en büyük gürültüdür.", user: "@nocterofficial" },
  { id: 3, type: "image", src: "linear-gradient(45deg, #D4AF37, #000)", alt: "Gold Texture", likes: "15.1K", caption: "Saf altın tozu.", user: "@nocterofficial" },
  { id: 4, type: "image", src: "radial-gradient(circle, #500, #000)", alt: "Solar Flare", likes: "9.3K", caption: "Yanmaya hazır mısın?", user: "@nocterofficial" },
  { id: 5, type: "image", src: "linear-gradient(to bottom, #111, #222)", alt: "Monolith", likes: "11.2K", caption: "Monolith.", user: "@nocterofficial" },
  { id: 6, type: "image", src: "radial-gradient(circle, #002, #000)", alt: "Liquid Chrome", likes: "10.5K", caption: "Soğuk metal.", user: "@nocterofficial" },
  { id: 7, type: "quote", src: "#1a1a1a", alt: "Quote", likes: "7.8K", caption: "Görünmez imza.", user: "@nocterofficial" },
  { id: 8, type: "image", src: "linear-gradient(135deg, #222, #444)", alt: "Texture", likes: "13.4K", caption: "Detaylar.", user: "@nocterofficial" },
  { id: 9, type: "image", src: "radial-gradient(circle, #4a3b00, #000)", alt: "Dark Oath", likes: "18.9K", caption: "Yemin.", user: "@nocterofficial" }
];

// --- DERGİ / EDİTORYAL İÇERİK ---
const journalEntries: JournalEntry[] = [
  { 
    id: 1, 
    category: "CULTURE", 
    title: "Sessizliğin Mimarisi: Monolith Kiosk", 
    date: "OCT 2026", 
    readTime: "4 MIN",
    image: "linear-gradient(to bottom right, #111, #333)" 
  },
  { 
    id: 2, 
    category: "ALCHEMY", 
    title: "Extrait vs. Eau de Parfum: Neden %30?", 
    date: "SEP 2026", 
    readTime: "6 MIN",
    image: "linear-gradient(to bottom right, #D4AF37, #000)" 
  },
  { 
    id: 3, 
    category: "LIFESTYLE", 
    title: "Gece Yarısı Ritüelleri: Koku Nasıl Giyilir?", 
    date: "AUG 2026", 
    readTime: "3 MIN",
    image: "linear-gradient(to bottom right, #222, #111)" 
  }
];

// --- BAĞLANTILAR (SVG ICONLAR) ---
const socialLinks: LinkItem[] = [
  { 
    label: "INSTAGRAM", 
    href: "https://instagram.com/nocterofficial", 
    sub: "@nocterofficial",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
  },
  { 
    label: "TIKTOK", 
    href: "https://tiktok.com/@nocterscent", 
    sub: "@nocterscent",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.88-2.91 6.31-1.36 1.09-3.42 1.56-5.23 1.5-1.8-.05-3.52-.64-4.82-1.81-1.31-1.18-2.03-2.96-2.03-4.99 0-2.03.72-3.82 2.03-4.99 1.3-1.18 3.02-1.76 4.82-1.81.66-.02 1.32.06 1.98.24v4.2c-.29-.11-.61-.17-.93-.16-.96.02-1.71.51-2.22 1.08-.51.58-.76 1.4-.73 2.19.03.79.33 1.58.9 2.11.58.53 1.39.81 2.19.71 1.62-.19 2.82-1.49 2.82-3.14V.02h2.02z"/></svg>
  },
  { 
    label: "X (TWITTER)", 
    href: "https://x.com/nocter_x", 
    sub: "@nocter_x",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
  },
  { 
    label: "NOSCANDA", 
    href: "https://noscandagroup.com", 
    sub: "Corporate Vision",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5 10 5 10-5-5-2.5-5 2.5z"/></svg>
  }
];


// ============================================================================
// BÖLÜM 2: ATOMİK BİLEŞENLER (UI & ANIMATION)
// ============================================================================

// 2.1 Canlı Gürültü Efekti (Live Noise Canvas)
// ----------------------------------------------------------------------------
const LiveNoise = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const animate = () => {
      const imgData = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.05) {
          // Çok hafif beyaz pikseller (Grain)
          buffer32[i] = 0xffffffff;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0" />;
};


// 2.2 Manyetik Link Kartı (Magnetic & Tilt)
// ----------------------------------------------------------------------------
const MagneticLink = ({ label, sub, href, icon }: LinkItem) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    const text = textRef.current;
    if (!el || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Tilt efekti
      gsap.to(el, { 
        rotationX: -y / 10,
        rotationY: x / 10,
        duration: 0.5
      });
      
      // Manyetik çekim
      gsap.to(text, { 
        x: x * 0.2, 
        y: y * 0.2, 
        duration: 0.3 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
      gsap.to(text, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={cardRef} 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center justify-center h-64 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 bg-black/50 backdrop-blur-sm perspective-500 overflow-hidden"
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

      <div ref={textRef} className="relative z-10 text-center flex flex-col items-center gap-6">
        <div className="w-10 h-10 text-white/30 group-hover:text-[#D4AF37] transition-colors duration-300 transform group-hover:scale-110">
           {icon}
        </div>

        <div>
          <span className="block text-2xl font-serif text-white mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors">
            {label}
          </span>
          <span className="block text-[10px] text-white/40 tracking-[0.3em] uppercase group-hover:tracking-[0.4em] transition-all">
            {sub}
          </span>
        </div>
      </div>
    </a>
  );
};


// 2.3 Sonsuz Kayan Yazı (Hızlanan Marquee)
// ----------------------------------------------------------------------------
const InfiniteMarquee = ({ text, direction = "left", speed = 25 }: { text: string, direction?: "left"|"right", speed?: number }) => {
  return (
    <div className="w-full overflow-hidden border-y border-white/5 py-8 bg-black relative z-10 group hover:bg-[#050505] transition-colors">
      <div 
        className={`flex whitespace-nowrap ${direction === "left" ? "animate-marquee" : "animate-marquee-reverse"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center mx-16 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
            <span 
              className="text-6xl md:text-[8rem] font-serif font-bold text-transparent leading-none" 
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}
            >
              {text}
            </span>
            <span className="mx-16 text-[#D4AF37] text-3xl animate-spin-slow">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};


// 2.4 Sosyal Medya Duvarı (Paralaks & Depth)
// ----------------------------------------------------------------------------
const SocialCard = ({ post }: { post: SocialPost }) => {
  return (
    <div className="social-card relative w-72 h-[450px] bg-zinc-900 border border-white/10 overflow-hidden group cursor-pointer flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-700 hover:border-[#D4AF37]/50">
      
      {/* Görsel */}
      <div 
        className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
        style={{ background: post.src }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

      {/* İçerik */}
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
          <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            <span className="text-[9px] uppercase tracking-widest text-white">{post.user}</span>
          </div>
        </div>
        
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="w-8 h-[1px] bg-[#D4AF37] mb-4 w-0 group-hover:w-8 transition-all duration-500"></div>
          <p className="text-white font-serif text-xl leading-tight mb-4 italic">"{post.caption}"</p>
          <div className="flex items-center gap-2 text-[10px] text-white/50 uppercase tracking-widest">
            <span className="text-[#D4AF37]">♥</span>
            <span>{post.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};


// 2.5 Editoryal Dergi Kartı (The Journal)
// ----------------------------------------------------------------------------
const JournalCard = ({ entry }: { entry: JournalEntry }) => {
  return (
    <div className="group relative w-full h-full min-h-[400px] border-r border-white/10 p-12 flex flex-col justify-between hover:bg-white/5 transition-colors duration-500">
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>

      <div>
        <div className="flex justify-between items-start mb-8">
          <span className="text-[10px] tracking-[0.3em] text-[#D4AF37] uppercase">{entry.category}</span>
          <span className="text-[10px] text-white/30 font-mono">{entry.date}</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight mb-6 group-hover:translate-x-4 transition-transform duration-500">
          {entry.title}
        </h3>
      </div>

      <div className="flex items-center justify-between mt-12">
        <span className="text-xs text-white/40 uppercase tracking-widest">{entry.readTime} READ</span>
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500">
          <span className="text-white group-hover:text-black">↗</span>
        </div>
      </div>
    </div>
  );
};


// 2.6 Bülten Formu (The Dark Letter - Gelişmiş)
// ----------------------------------------------------------------------------
const NewsletterInput = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("loading");
    
    setTimeout(() => {
      setStatus("success");
      if (inputRef.current) inputRef.current.value = "";
    }, 2000);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-16">
      
      {status === "success" ? (
        <div className="py-8 text-center animate-fade-in border border-[#D4AF37]/30 bg-[#D4AF37]/5 rounded-lg">
          <div className="text-4xl text-[#D4AF37] mb-4 mx-auto w-12 h-12 flex items-center justify-center border border-[#D4AF37] rounded-full">
            ✓
          </div>
          <h4 className="text-2xl font-serif text-white mb-2">Erişim Talebi İletildi.</h4>
          <p className="text-xs text-white/40 tracking-widest uppercase">
            Davetiyeniz değerlendirme sürecine alındı.
          </p>
          <button 
            onClick={() => setStatus("idle")}
            className="mt-6 text-[10px] text-[#D4AF37] underline underline-offset-4 uppercase tracking-widest hover:text-white"
          >
            Yeni Kayıt
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="group relative">
          <div className={`relative flex items-center border-b-2 transition-all duration-500 ${status === "loading" ? "border-white/10" : "border-white/20 focus-within:border-[#D4AF37]"}`}>
            
            <input 
              ref={inputRef}
              required
              type="email" 
              placeholder="E-POSTA ADRESİNİZİ GİRİNİZ" 
              disabled={status === "loading"}
              className="w-full bg-transparent py-6 text-white placeholder-white/10 outline-none font-light tracking-[0.1em] text-sm md:text-lg uppercase"
            />
            
            <button 
              type="submit"
              disabled={status === "loading"}
              className={`absolute right-0 text-xs tracking-[0.3em] uppercase transition-all duration-300 font-bold ${status === "loading" ? "text-white/20" : "text-[#D4AF37] hover:text-white"}`}
            >
              {status === "loading" ? "İŞLENİYOR..." : "DAVETİYE İSTE"}
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-700 group-focus-within:w-full"></div>
        </form>
      )}

      {status !== "success" && (
        <div className="mt-8 flex justify-center gap-8 opacity-40 text-[9px] uppercase tracking-widest text-white/60">
          <span>* Sınırlı Kontenjan</span>
          <span>* Sadece Referanslı Üyelik</span>
          <span>* No Spam</span>
        </div>
      )}
    </div>
  );
};


// ============================================================================
// BÖLÜM 3: ANA BİLEŞEN (LOGIC LAYER)
// ============================================================================

export default function BeforeFooter() {
  const container = useRef(null);
  
  // Scroll Animasyonları
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });

    // Sosyal duvarın yavaş kayması (Parallax)
    tl.to(".social-track", {
      x: "-10%",
      ease: "none"
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative bg-[#050505] text-white overflow-hidden pt-32 pb-0 border-t border-white/5 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* ARKA PLAN EFEKTLERİ */}
      <LiveNoise />
      
      {/* ----------------------------------------------------------------- */}
      {/* 1. MANİFESTO (SON SÖZ) */}
      {/* ----------------------------------------------------------------- */}
      <div className="container mx-auto px-6 text-center mb-48 relative z-10 mt-24">
        <span className="inline-block text-[10px] text-[#D4AF37] tracking-[0.5em] uppercase mb-12 border border-[#D4AF37]/20 px-8 py-3 rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors duration-500 cursor-default">
          THE INNER CIRCLE
        </span>
        <h2 className="text-5xl md:text-9xl font-serif text-white mb-12 leading-[0.85] tracking-tight">
          Sadece Bir Koku Değil.<br/>
          Bir <span className="italic text-[#D4AF37]">Aidiyet.</span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed font-light">
          Noscanda dünyası, sadece en iyiyi arayanların buluşma noktasıdır.<br/>
          Burada sıradanlığa, gürültüye ve taklitlere yer yok.
        </p>
      </div>


      {/* ----------------------------------------------------------------- */}
      {/* 2. THE JOURNAL (EDİTORYAL KÜLTÜR) */}
      {/* ----------------------------------------------------------------- */}
      <div className="w-full border-y border-white/10 mb-48 bg-[#080808]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {journalEntries.map((entry) => (
            <JournalCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>


      {/* ----------------------------------------------------------------- */}
      {/* 3. INFINITE MARQUEE (AKIŞ) */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-48 space-y-4">
        <InfiniteMarquee text="SILENT AUTHORITY" direction="left" speed={40} />
        <InfiniteMarquee text="HIGH FIDELITY SCENT" direction="right" speed={45} />
      </div>


      {/* ----------------------------------------------------------------- */}
      {/* 4. THE SOCIAL WALL (TOPLULUK) */}
      {/* ----------------------------------------------------------------- */}
      <div className="mb-48 pl-6 md:pl-12">
        <div className="flex items-end justify-between pr-12 mb-16">
          <h3 className="text-4xl md:text-6xl font-serif">Community</h3>
          <span className="text-xs tracking-[0.3em] text-white/40 uppercase">@NOCTEROFFICIAL</span>
        </div>
        
        <div className="relative w-full overflow-hidden">
          <div className="social-track flex gap-8 w-max pb-12">
            {socialFeed.map((post) => (
              <SocialCard key={post.id} post={post} />
            ))}
            {/* Loop için tekrar */}
            {socialFeed.map((post) => (
               <SocialCard key={`dup-${post.id}`} post={post} />
            ))}
          </div>
        </div>
      </div>


      {/* ----------------------------------------------------------------- */}
      {/* 5. DARK LETTER (BÜLTEN) */}
      {/* ----------------------------------------------------------------- */}
      <div className="container mx-auto px-6 mb-48 relative z-10">
        <div className="max-w-6xl mx-auto bg-gradient-to-b from-[#0a0a0a] to-black border border-white/5 p-12 md:p-32 text-center relative overflow-hidden rounded-2xl">
          
          {/* Dekoratif Çizgiler */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-t from-[#D4AF37] to-transparent"></div>
          
          <h3 className="text-5xl md:text-8xl font-serif text-white mb-8">
            Karanlık Bülten
          </h3>
          <p className="text-white/40 text-sm md:text-base mb-12 max-w-lg mx-auto leading-relaxed">
            Yeni lansmanlar, özel davetler ve sadece üyelere özel <span className="text-[#D4AF37]">"Private Batch"</span> satışları için bekleme listesine katılın.
          </p>
          
          <NewsletterInput />
        </div>
      </div>


      {/* ----------------------------------------------------------------- */}
      {/* 6. BAĞLANTILAR (NAVİGASYON) */}
      {/* ----------------------------------------------------------------- */}
      <div className="container mx-auto px-6 mb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {socialLinks.map((link, i) => (
            <MagneticLink key={i} {...link} />
          ))}
        </div>
      </div>

    </section>
  );
}