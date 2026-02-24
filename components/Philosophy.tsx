"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const container = useRef(null);

  // --- SCENE REFS (5 scenes) ---
  const scene1_Authority = useRef(null);
  const scene2_Memory = useRef(null);
  const scene3_Essence = useRef(null);
  const scene4_Purity = useRef(null);
  const scene5_Signature = useRef(null);

  // --- BACKGROUND ELEMENTS ---
  const bgGlowRef = useRef(null);

  useGSAP(() => {
    // MASTER TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=8000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // --- AMBIENT GLOW ---
    gsap.to(bgGlowRef.current, {
      scale: 2.5,
      opacity: 0.12,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // ============================
    // SCENE 1: AUTHORITY (NOS CANDA)
    // ============================
    tl.fromTo(scene1_Authority.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    )
      .fromTo(".auth-sub", { opacity: 0, letterSpacing: "0em" }, { opacity: 0.5, letterSpacing: "0.5em", duration: 2 }, "<")
      .fromTo(".auth-brand", { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 2 }, "<0.3")
      .to(scene1_Authority.current,
        { opacity: 0, scale: 1.05, filter: "blur(8px)", duration: 1.5, delay: 1 }
      );

    // ============================
    // SCENE 2: MEMORY (KOKU HAFIZASI)
    // ============================
    tl.fromTo(scene2_Memory.current,
      { opacity: 0, filter: "blur(16px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1.5 }
    )
      .fromTo(".mem-line-1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, "<0.2")
      .to(".mem-line-1", { opacity: 0.3, duration: 0.8 }, "+=0.3")
      .fromTo(".mem-line-2", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
      .to(".mem-line-2", { opacity: 0.3, duration: 0.8 }, "+=0.3")
      .fromTo(".mem-highlight",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, color: "#D4AF37", textShadow: "0 0 40px rgba(212,175,55,0.5)", duration: 2 }
      )
      .to(scene2_Memory.current,
        { opacity: 0, y: -80, duration: 1.5, delay: 0.8 }
      );

    // ============================
    // SCENE 3: ESSENCE (HİSSEDİLMEK)
    // Merges: Noise + Silence + Alchemy
    // ============================
    tl.fromTo(scene3_Essence.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    )
      // Ring expands
      .fromTo(".ess-ring-outer",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.2, duration: 2.5, ease: "power2.out" }, "<"
      )
      .fromTo(".ess-ring-inner",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 2, ease: "power2.out" }, "<0.3"
      )
      // Main text reveals inside ring
      .fromTo(".ess-contrast",
        { opacity: 0, letterSpacing: "0em" },
        { opacity: 1, letterSpacing: "0.15em", duration: 2 }, "<0.5"
      )
      .fromTo(".ess-main",
        { opacity: 0, scale: 0.9, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", color: "#D4AF37", duration: 2, ease: "power2.out" }, "+=0.3"
      )
      // Philosophy sub-text
      .fromTo(".ess-philosophy",
        { opacity: 0, y: 30 },
        { opacity: 0.7, y: 0, duration: 1.5 }, "+=0.2"
      )
      .to(scene3_Essence.current,
        { opacity: 0, scale: 1.1, filter: "blur(6px)", duration: 1.5, delay: 1 }
      );

    // ============================
    // SCENE 4: PURITY (SAF ÖZ)
    // Merges: Concentration + Weight + Vessel
    // ============================
    tl.fromTo(scene4_Purity.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    )
      .fromTo(".pur-big",
        { scale: 3, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "power4.out" }
      )
      .fromTo(".pur-ghost",
        { opacity: 0 },
        { opacity: 0.04, duration: 1. }, "<0.5"
      )
      .fromTo(".pur-badge",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5 }, "-=0.5"
      )
      .fromTo(".pur-desc-1",
        { opacity: 0, x: -20 },
        { opacity: 0.6, x: 0, duration: 1 }, "+=0.2"
      )
      .fromTo(".pur-desc-2",
        { opacity: 0, x: 20 },
        { opacity: 0.6, x: 0, duration: 1 }, "<0.2"
      )
      .fromTo(".pur-vessel",
        { opacity: 0, y: 20 },
        { opacity: 0.5, y: 0, duration: 1 }, "+=0.3"
      )
      .to(scene4_Purity.current,
        { opacity: 0, scale: 0.9, duration: 1.5, delay: 1 }
      );

    // ============================
    // SCENE 5: SIGNATURE (GÖRÜNMEZ İMZA)
    // Merges: Identity + Final
    // ============================
    tl.fromTo(scene5_Signature.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    )
      .fromTo(".sig-question",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 2 }
      )
      .to(".sig-highlight", { color: "#D4AF37", fontStyle: "italic", duration: 1 }, "+=0.3")
      .to(".sig-question", { opacity: 0, y: -40, duration: 1 }, "+=1")
      // Final reveal
      .fromTo(".sig-label",
        { opacity: 0 },
        { opacity: 0.4, duration: 1 }
      )
      .fromTo(".sig-final",
        { opacity: 0, filter: "blur(20px)", scale: 0.95 },
        { opacity: 1, filter: "blur(0px)", scale: 1, textShadow: "0 0 80px rgba(212,175,55,0.5)", color: "#D4AF37", duration: 3, ease: "power2.out" }
      )
      .fromTo(".sig-cta",
        { opacity: 0, y: 20 },
        { opacity: 0.6, y: 0, duration: 1.5 }, "-=1"
      );

  }, { scope: container });

  return (
    <section ref={container} className="h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-[#D4AF37] selection:text-black cursor-default">

      {/* --- ATMOSPHERE LAYERS --- */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0 mix-blend-overlay" />

      {/* Golden Mist */}
      <div
        ref={bgGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#D4AF37] to-transparent rounded-full blur-[300px] opacity-0 z-0 pointer-events-none"
      />

      {/* Vertical guide line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 z-0 pointer-events-none" />


      {/* ================================================================= */}
      {/* SCENE CONTENTS                                                     */}
      {/* ================================================================= */}

      {/* 1. AUTHORITY */}
      <div ref={scene1_Authority} className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <span className="auth-sub text-xs md:text-sm tracking-[0.5em] text-white/40 uppercase mb-6">
          POWERED BY
        </span>
        <h2 className="auth-brand text-4xl md:text-6xl font-serif text-[#D4AF37] tracking-[0.2em] uppercase border-b border-[#D4AF37]/30 pb-6" style={{ textShadow: "0 0 60px rgba(212,175,55,0.2)" }}>
          NOS CANDA
        </h2>
        <span className="text-[10px] tracking-[1em] text-white/20 uppercase mt-4">
          GROUP
        </span>
      </div>

      {/* 2. MEMORY */}
      <div ref={scene2_Memory} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center">
        <p className="mem-line-1 text-xl md:text-3xl font-light text-white/50 mb-8 tracking-wide">
          İnsanlar kelimeleri unutur.
        </p>
        <p className="mem-line-2 text-xl md:text-3xl font-light text-white/50 mb-16 tracking-wide">
          İnsanlar yüzleri unutur.
        </p>
        <div className="mem-highlight relative">
          <h2 className="text-5xl md:text-8xl font-serif font-medium leading-tight">
            Ama kokuyu <br />
            <span className="italic">asla.</span>
          </h2>
        </div>
      </div>

      {/* 3. ESSENCE (Noise + Silence + Alchemy) */}
      <div ref={scene3_Essence} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        {/* Expanding golden rings */}
        <div className="ess-ring-outer absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] border border-[#D4AF37]/20 rounded-full" />
        <div className="ess-ring-inner absolute w-[350px] h-[350px] md:w-[420px] md:h-[420px] border border-[#D4AF37]/10 rounded-full" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          <p className="ess-contrast text-xs md:text-sm tracking-[0.5em] text-white/40 uppercase mb-8">
            GÖRÜNMEK DEĞİL
          </p>
          <h2 className="ess-main text-6xl md:text-9xl font-serif text-white leading-tight mb-10">
            HİSSEDİLMEK
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37]/40 mb-8" />
          <p className="ess-philosophy text-lg md:text-xl font-light text-white/50 max-w-xl leading-relaxed">
            Doğanın en vahşi özünü<br />
            laboratuvar hassasiyetiyle işliyoruz.
          </p>
        </div>
      </div>

      {/* 4. PURITY (Concentration + Weight + Vessel) */}
      <div ref={scene4_Purity} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        <div className="relative flex flex-col items-center">
          {/* Large "SAF" text */}
          <h1 className="pur-big text-[10rem] md:text-[22rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-[#0a0a0a] leading-none tracking-tighter select-none">
            SAF
          </h1>
          <span className="pur-ghost absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[6rem] md:text-[12rem] text-white/5 font-serif -z-10 whitespace-nowrap blur-sm">
            INTENSE
          </span>

          {/* Badge */}
          <span className="pur-badge mt-[-1.5rem] md:mt-[-3rem] text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm border border-[#D4AF37]/20 px-8 py-3 rounded-full bg-black/80 backdrop-blur-sm">
            YOĞUN PARFÜM ÖZÜ
          </span>

          {/* Descriptors */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-16 mt-12 text-center">
            <p className="pur-desc-1 text-white/40 text-sm md:text-base tracking-wide">
              Sudan daha yoğun
            </p>
            <p className="pur-desc-2 text-white/40 text-sm md:text-base tracking-wide">
              Havadan daha ağır
            </p>
          </div>

          {/* Vessel */}
          <p className="pur-vessel mt-10 text-xs tracking-[0.4em] text-white/25 uppercase">
            Bir şişe değil — bir <span className="text-[#D4AF37]/60 italic">mühür</span>
          </p>
        </div>
      </div>

      {/* 5. SIGNATURE (Identity + Final) */}
      <div ref={scene5_Signature} className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
        {/* Identity question */}
        <h2 className="sig-question absolute text-3xl md:text-5xl font-serif text-white leading-relaxed text-center max-w-3xl">
          Asıl soru:<br />
          &quot;Bugün <span className="sig-highlight border-b border-[#D4AF37]/50">kim</span> olmak istiyorsun?&quot;
        </h2>

        {/* Final signature */}
        <div className="flex flex-col items-center text-center">
          <p className="sig-label text-sm md:text-base tracking-[0.5em] text-white/30 uppercase mb-12">
            BU BİR KOKU DEĞİL
          </p>
          <h1 className="sig-final text-6xl md:text-[8rem] font-serif text-white leading-tight mb-16">
            Görünmez <br /> İmzanız.
          </h1>

          <div className="sig-cta flex flex-col items-center gap-6 opacity-0" aria-hidden="true">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/50">
              Koleksiyonu Keşfet
            </span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-[#D4AF37]/60 via-white/30 to-transparent" />
          </div>
        </div>
      </div>

    </section>
  );
}