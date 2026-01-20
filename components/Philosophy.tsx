"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP Eklentilerini Kaydet
gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef(null);
  
  // --- SAHNE REFERANSLARI (DOM ELEMENTS) ---
  const scene0_Void = useRef(null);       // Giriş: Noscanda
  const scene1_Memory = useRef(null);     // Hafıza: Unuturlar...
  const scene2_Noise = useRef(null);      // Sorun: Görünmek
  const scene3_Silence = useRef(null);    // Çözüm: Hissedilmek
  const scene4_Rejection = useRef(null);  // İsyan: Standartları Red
  const scene5_Alchemy = useRef(null);    // İçerik: Doğanın Özü
  const scene6_Concentration = useRef(null); // Teknik: %30
  const scene7_Weight = useRef(null);     // Fizik: Ağırlık/Yoğunluk
  const scene8_Vessel = useRef(null);     // Obje: Mühür/Kasa
  const scene9_Aura = useRef(null);       // Etki: Zırh
  const scene10_Timeless = useRef(null);  // Zaman: Sonsuzluk
  const scene11_Identity = useRef(null);  // Soru: Kimsin?
  const scene12_Final = useRef(null);     // Kapanış: İmza

  // --- ARKA PLAN ELEMENTLERİ ---
  const bgGlowRef = useRef(null);
  const starsRef = useRef(null);
  const verticalLineRef = useRef(null);

  useGSAP(() => {
    // 1. ANA ZAMAN ÇİZELGESİ (MASTER TIMELINE)
    // Scroll süresini "+=20000" yaparak çok uzun, ağır bir belgesel tadı veriyoruz.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=20000", 
        scrub: 1, 
        pin: true,
        anticipatePin: 1,
      },
    });

    // --- GLOBAL EFEKTLER (SÜREKLİ) ---
    gsap.to(bgGlowRef.current, {
      scale: 3,
      opacity: 0.15,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // --- SAHNE 0: THE AUTHORITY (NOSCANDA) ---
    // Ekran tamamen siyah başlar. Marka adı yavaşça belirir.
    tl.fromTo(scene0_Void.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 2 }
    )
    .fromTo(".void-sub", { opacity: 0, letterSpacing: "0em" }, { opacity: 0.5, letterSpacing: "0.5em", duration: 3 }, "<")
    .to(scene0_Void.current, 
      { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 2, delay: 1 }
    );

    // --- SAHNE 1: MEMORY (HAFIZA) ---
    tl.fromTo(scene1_Memory.current, 
      { opacity: 0, filter: "blur(20px)" }, 
      { opacity: 1, filter: "blur(0px)", duration: 2 }
    )
    .fromTo(".mem-line-1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 }, "<")
    .to(".mem-line-1", { opacity: 0.3, duration: 1 }, "+=0.5") // İlk cümle silikleşir
    .fromTo(".mem-line-2", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5 })
    .to(".mem-line-2", { opacity: 0.3, duration: 1 }, "+=0.5") // İkinci cümle silikleşir
    .fromTo(".mem-line-3", 
      { opacity: 0, scale: 0.9, color: "#666" }, 
      { opacity: 1, scale: 1.1, color: "#D4AF37", duration: 2, textShadow: "0 0 30px #D4AF37" }
    )
    .to(scene1_Memory.current, 
      { opacity: 0, y: -100, duration: 2, delay: 1 }
    );

    // --- SAHNE 2: NOISE (GÜRÜLTÜ) ---
    tl.fromTo(scene2_Noise.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
    .fromTo(".noise-title", { opacity: 0 }, { opacity: 1, duration: 1 })
    // "Görünmek" kelimesi titreşir
    .fromTo(".noise-word", 
      { x: -2 }, 
      { x: 2, duration: 0.05, repeat: 20, yoyo: true, color: "#fff", textShadow: "0 0 10px white" }
    )
    .to(scene2_Noise.current, 
      { opacity: 0, filter: "blur(10px)", duration: 2, delay: 1 }
    );

    // --- SAHNE 3: SILENCE (SESSİZLİK) ---
    tl.fromTo(scene3_Silence.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 2 }
    )
    .fromTo(".silence-line", 
      { height: 0 }, 
      { height: 100, duration: 2, ease: "power2.out" }
    )
    .fromTo(".silence-word", 
      { opacity: 0, letterSpacing: "0em" }, 
      { opacity: 1, letterSpacing: "0.2em", color: "#D4AF37", duration: 3 }, "<"
    )
    .to(scene3_Silence.current, 
      { opacity: 0, scale: 1.2, duration: 2, delay: 1 }
    );

    // --- SAHNE 4: REJECTION (İSYAN) ---
    tl.fromTo(scene4_Rejection.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
    .fromTo(".reject-line", 
      { x: -50, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1.5, stagger: 0.5 }
    )
    .to(".strike-through", 
      { width: "100%", duration: 1, ease: "power1.inOut" }, "+=0.5"
    )
    .to(scene4_Rejection.current, 
      { opacity: 0, x: 50, duration: 2, delay: 1 }
    );

    // --- SAHNE 5: ALCHEMY (SİMYA) ---
    tl.fromTo(scene5_Alchemy.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 2 }
    )
    .fromTo(".alc-text", { opacity: 0, blur: 10 }, { opacity: 1, blur: 0, duration: 2 })
    .to(scene5_Alchemy.current, 
      { opacity: 0, duration: 2, delay: 1 }
    );

    // --- SAHNE 6: CONCENTRATION (%30) ---
    tl.fromTo(scene6_Concentration.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
    .fromTo(".conc-number", 
      { scale: 4, opacity: 0, filter: "blur(30px)" }, 
      { scale: 1, opacity: 1, filter: "blur(0px)", duration: 3, ease: "power4.out" }
    )
    .fromTo(".conc-sub", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 2 }, "-=1")
    .to(scene6_Concentration.current, 
      { opacity: 0, scale: 0.8, duration: 2, delay: 2 }
    );

    // --- SAHNE 7: WEIGHT (FİZİK) ---
    tl.fromTo(scene7_Weight.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
    .fromTo(".weight-word-1", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 })
    .fromTo(".weight-word-2", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 }, "+=0.2")
    .to(scene7_Weight.current, 
      { opacity: 0, duration: 2, delay: 1 }
    );

    // --- SAHNE 8: VESSEL (MÜHÜR) ---
    tl.fromTo(scene8_Vessel.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 2 }
    )
    .fromTo(".vessel-title", { opacity: 0 }, { opacity: 1, duration: 1 })
    .fromTo(".vessel-desc", { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 2 })
    .to(scene8_Vessel.current, 
      { opacity: 0, duration: 2, delay: 1 }
    );

    // --- SAHNE 9: AURA (ZIRH) ---
    tl.fromTo(scene9_Aura.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 2 }
    )
    .fromTo(".aura-ring", 
      { scale: 0, opacity: 0, borderWidth: "20px" }, 
      { scale: 1.5, opacity: 0.3, borderWidth: "1px", duration: 3, ease: "power2.out" }
    )
    .fromTo(".aura-text", { opacity: 0 }, { opacity: 1, duration: 1 }, "-=2")
    .to(scene9_Aura.current, 
      { opacity: 0, duration: 2, delay: 1 }
    );

    // --- SAHNE 10: TIMELESS (ZAMAN) ---
    tl.fromTo(scene10_Timeless.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 1 }
    )
    .fromTo(".time-step", 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 1, stagger: 1 } // Adım adım belirir
    )
    .to(".last-time", { color: "#D4AF37", scale: 1.2, duration: 2 })
    .to(scene10_Timeless.current, 
      { opacity: 0, duration: 2, delay: 1 }
    );

    // --- SAHNE 11: IDENTITY (KİMLİK) ---
    tl.fromTo(scene11_Identity.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 2 }
    )
    .fromTo(".id-q", { opacity: 0 }, { opacity: 1, duration: 2 })
    .to(".id-highlight", { color: "#D4AF37", fontStyle: "italic", duration: 1 })
    .to(scene11_Identity.current, 
      { opacity: 0, duration: 2, delay: 1 }
    );

    // --- SAHNE 12: FINAL (İMZA) ---
    tl.fromTo(scene12_Final.current, 
      { opacity: 0, filter: "blur(20px)" }, 
      { opacity: 1, filter: "blur(0px)", duration: 2 }
    )
    .to(".final-sig", 
      { textShadow: "0 0 60px #D4AF37", color: "#D4AF37", scale: 1.1, duration: 3 }
    );

  }, { scope: container });

  return (
    <section ref={container} className="h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-[#D4AF37] selection:text-black cursor-default">
      
      {/* --- ATMOSFER KATMANLARI --- */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0 mix-blend-overlay"></div>
      
      {/* Altın Sis (Çok yavaş hareket eden) */}
      <div 
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full blur-[300px] opacity-0 z-0 pointer-events-none"
      />

      {/* Yıldız Tozu / Mikro Partiküller */}
      <div ref={starsRef} className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-fixed"></div>

      {/* Dekoratif Dikey Çizgi (Tüm sayfa boyunca ince bir rehber) */}
      <div ref={verticalLineRef} className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 z-0 pointer-events-none"></div>


      {/* ================================================================= */}
      {/* SAHNE İÇERİKLERİ */}
      {/* ================================================================= */}

      {/* 0. AUTHORITY */}
      <div ref={scene0_Void} className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <span className="void-sub text-xs md:text-sm tracking-[0.5em] text-white/40 uppercase mb-6">
          POWERED BY
        </span>
        <h2 className="text-4xl md:text-6xl font-serif text-[#D4AF37] tracking-[0.2em] uppercase border-b border-[#D4AF37]/30 pb-6 drop-shadow-2xl">
          NOS CANDA
        </h2>
        <span className="text-[10px] tracking-[1em] text-white/20 uppercase mt-4">
          GROUP
        </span>
      </div>

      {/* 1. MEMORY */}
      <div ref={scene1_Memory} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <p className="mem-line-1 text-xl md:text-3xl font-light text-white/50 mb-8 tracking-wide">
          İnsanlar kelimeleri unutur.
        </p>
        <p className="mem-line-2 text-xl md:text-3xl font-light text-white/50 mb-16 tracking-wide">
          İnsanlar yüzleri unutur.
        </p>
        <div className="mem-line-3 relative">
          <h2 className="text-5xl md:text-8xl font-serif font-medium leading-tight">
            Ama kokuyu <br/> 
            <span className="italic">asla.</span>
          </h2>
        </div>
      </div>

      {/* 2. NOISE */}
      <div ref={scene2_Noise} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <p className="noise-title text-xs md:text-sm tracking-[0.8em] text-red-500/60 uppercase mb-12">
          MODERN YANILGI
        </p>
        <h2 className="text-3xl md:text-6xl font-light text-white/80 text-center leading-relaxed max-w-5xl">
          Herkes çaresizce <br/>
          <strong className="noise-word inline-block font-bold text-white mx-2">GÖRÜNMEK</strong> <br/>
          için çabalıyor.
        </h2>
      </div>

      {/* 3. SILENCE */}
      <div ref={scene3_Silence} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <div className="silence-line w-[1px] bg-[#D4AF37] mb-8"></div>
        <p className="text-xs md:text-sm tracking-[0.5em] text-[#D4AF37]/60 uppercase mb-8">
          GERÇEK GÜÇ
        </p>
        <h2 className="silence-word text-6xl md:text-9xl font-serif text-white text-center leading-tight">
          HİSSEDİLMEK
        </h2>
      </div>

      {/* 4. REJECTION */}
      <div ref={scene4_Rejection} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <h3 className="reject-line text-2xl md:text-4xl font-light text-white mb-4">
          Endüstri Standartları:
        </h3>
        <div className="relative inline-block mb-12">
          <span className="reject-line text-4xl md:text-6xl font-bold text-white/30 uppercase">
            SEYRELTİLMİŞ DUYGULAR
          </span>
          <div className="strike-through absolute top-1/2 left-0 h-[2px] bg-red-600 w-0"></div>
        </div>
        <p className="reject-line text-white/60 max-w-xl mx-auto text-lg leading-relaxed mt-8">
          Biz bunu reddettik.
        </p>
      </div>

      {/* 5. ALCHEMY */}
      <div ref={scene5_Alchemy} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <div className="alc-text space-y-8">
          <p className="text-xl md:text-3xl font-serif italic text-white/80">
            "Şişelerimizde su satmıyoruz."
          </p>
          <p className="text-lg md:text-2xl font-light text-white/60 max-w-2xl mx-auto leading-relaxed">
            Doğanın en vahşi, en yoğun ve en pahalı <strong className="text-white">özünü</strong><br/> 
            laboratuvar hassasiyetiyle işliyoruz.
          </p>
        </div>
      </div>

      {/* 6. CONCENTRATION */}
      <div ref={scene6_Concentration} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <div className="relative">
          <h1 className="conc-number text-[18rem] md:text-[30rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#050505] leading-none tracking-tighter select-none">
            30<span className="text-6xl align-top text-[#D4AF37]">%</span>
          </h1>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[12rem] text-white/5 font-serif -z-10 whitespace-nowrap blur-sm">
            EXTRAIT
          </span>
        </div>
        <p className="conc-sub mt-[-4rem] text-[#D4AF37] tracking-[0.3em] uppercase text-sm md:text-base border border-[#D4AF37]/20 px-8 py-3 rounded-full bg-black">
          SAF ESANS YOĞUNLUĞU
        </p>
      </div>

      {/* 7. WEIGHT */}
      <div ref={scene7_Weight} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <h2 className="weight-word-1 text-3xl md:text-5xl font-light text-white mb-4">
          Sudan daha yoğun.
        </h2>
        <h2 className="weight-word-2 text-3xl md:text-5xl font-bold text-white">
          Havadan daha ağır.
        </h2>
      </div>

      {/* 8. VESSEL */}
      <div ref={scene8_Vessel} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <div className="space-y-12">
          <h3 className="vessel-title text-2xl md:text-4xl font-serif text-white tracking-wide">
            Bir şişe değil.<br/> Bir <span className="text-[#D4AF37] italic">Mühür.</span>
          </h3>
          <div className="vessel-desc w-24 h-[1px] bg-white/20 mx-auto"></div>
          <p className="vessel-desc text-white/50 text-sm tracking-widest uppercase max-w-md mx-auto pt-4">
            Değerli özü koruyan,<br/> kusursuz bir kasa.
          </p>
        </div>
      </div>

      {/* 9. AURA */}
      <div ref={scene9_Aura} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <div className="aura-ring absolute w-[500px] h-[500px] border border-white/10 rounded-full flex items-center justify-center">
          <div className="w-[400px] h-[400px] border border-white/5 rounded-full"></div>
        </div>
        <h2 className="aura-text relative z-10 text-4xl md:text-7xl font-serif text-white text-center leading-tight">
          Görünmez Bir <br/>
          <span className="italic text-[#D4AF37]">Zırh.</span>
        </h2>
        <p className="aura-text relative z-10 mt-8 text-white/60 text-center max-w-lg text-sm tracking-wide">
          Tene değdiği an başlayan, sizi saran manyetik bir çekim alanı.
        </p>
      </div>

      {/* 10. TIMELESS */}
      <div ref={scene10_Timeless} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <div className="flex flex-col gap-12 text-center w-full max-w-xl border-l border-white/10 pl-12 py-12">
          <div className="time-step text-left">
            <span className="text-xs text-white/30 uppercase tracking-widest mb-2 block">08:00</span>
            <span className="text-2xl md:text-4xl text-white/60 font-light">Sabahın İlk Işığı</span>
          </div>
          <div className="time-step text-left">
            <span className="text-xs text-white/30 uppercase tracking-widest mb-2 block">14:00</span>
            <span className="text-2xl md:text-4xl text-white/60 font-light">Günün Kaosu</span>
          </div>
          <div className="time-step text-left last-time">
            <span className="text-xs text-[#D4AF37]/50 uppercase tracking-widest mb-2 block">02:00</span>
            <span className="text-4xl md:text-6xl text-[#D4AF37] font-serif font-bold">GECE YARISI</span>
          </div>
        </div>
        <p className="absolute bottom-24 text-xs tracking-[0.3em] text-white/30 uppercase">
          Kalıcılık bir lüks değil, standarttır.
        </p>
      </div>

      {/* 11. IDENTITY */}
      <div ref={scene11_Identity} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <h2 className="id-q text-3xl md:text-5xl font-serif text-white leading-relaxed max-w-3xl">
          "Hangi parfümü arıyorsun?"<br/> sorusu yanlıştır.
        </h2>
        <h2 className="id-q mt-16 text-3xl md:text-6xl font-serif text-white leading-tight">
          Asıl soru:<br/>
          "Bugün <span className="id-highlight border-b border-[#D4AF37]">kim</span> olmak istiyorsun?"
        </h2>
      </div>

      {/* 12. FINAL */}
      <div ref={scene12_Final} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <p className="text-sm md:text-base tracking-[0.5em] text-white/30 uppercase mb-16">
          BU BİR KOKU DEĞİL
        </p>
        <h1 className="final-sig text-6xl md:text-[8rem] font-serif text-white text-center leading-tight mb-24 drop-shadow-2xl">
          Görünmez <br/> İmzanız.
        </h1>
        
        <div className="flex flex-col items-center gap-6 animate-pulse opacity-60">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white">
            Koleksiyonu Keşfet
          </span>
          <div className="w-[1px] h-32 bg-gradient-to-b from-[#D4AF37] via-white/50 to-transparent"></div>
        </div>
      </div>

    </section>
  );
}