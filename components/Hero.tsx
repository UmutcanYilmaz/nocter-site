"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function NocterHero() {
  const container = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Metin Referansları
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);
  const text4 = useRef(null);

  useGSAP(() => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    // HERO BÖLÜMÜNÜ SABİTLEME
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=4000", 
        scrub: 1,
        pin: true,
      },
    });

    // VİDEOYU SCROLL İLE SENKRONİZE ET
    tl.to(video, {
      currentTime: video.duration || 24, 
      ease: "none",
    });


    // --- UPDATED TEXT TIMINGS ---

    // 1. TRAFFIC: "The World Rushes"
    // Pushed later (starts at 28%) so the red lights are fully visible
    tl.fromTo(text1.current, 
      { opacity: 0, scale: 0.9 }, 
      { opacity: 1, scale: 1, duration: 0.05 }, 0.10) 
      .to(text1.current, { opacity: 0, scale: 1.1, duration: 0.05 }, 0.16);

    // 2. RAIN: "Command The Silence"
    // Pushed to 48% (approx 11.5s mark)
    tl.fromTo(text2.current, 
      { opacity: 0, filter: "blur(10px)" }, 
      { opacity: 1, filter: "blur(0px)", duration: 0.05 }, 0.20)
      .to(text2.current, { opacity: 0, filter: "blur(5px)", duration: 0.05 }, 0.27);

    // 3. ENCOUNTER: "Own The Moment"
    // Pushed to 68% (approx 16.3s mark)
    tl.fromTo(text3.current, 
      { opacity: 0, letterSpacing: "0.5em" }, 
      { opacity: 1, letterSpacing: "0em", duration: 0.05 }, 0.30)
      .to(text3.current, { opacity: 0, duration: 0.05 }, 0.34);

    // 4. SHADOW: "Define Your Shadow"
    // Starts at 82% (approx 19.6s mark) to catch the shadow walking
    tl.fromTo(text4.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.1 }, 0.38);

  }, { scope: container });

  return (
    <div ref={container} className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* ARKA PLAN VİDEOSU */}
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/dsvefitse/video/upload/v1768932828/nocter-video_p1pure.mp4" 
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
        aria-label="Noctér atmospheric brand video"
      />

      {/* KARARTMA KATMANI */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

      {/* YAZI KATMANI */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 text-center">
        
        {/* YAZI 1: TRAFİK SAHNESİ */}
        {/* Renk Değişimi: Kırmızı yerine BEYAZ (text-white) yapıldı */}
        <h2 ref={text1} className="absolute text-5xl md:text-8xl font-serif text-white opacity-0 font-bold tracking-tighter mix-blend-overlay">
          AKIŞI <br /> <span className="text-white italic drop-shadow-lg">DURDUR</span>
        </h2>

        {/* YAZI 2: SESSİZLİK */}
        <h2 ref={text2} className="absolute text-4xl md:text-6xl font-sans text-blue-100 opacity-0 tracking-[0.5em] uppercase font-light drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          Sessizliğe <br /> Hükmet
        </h2>

        {/* YAZI 3: KARŞILAŞMA */}
        <h2 ref={text3} className="absolute text-5xl md:text-8xl font-serif text-[#D4AF37] opacity-0 italic drop-shadow-2xl">
          Anın Hakimi Ol
        </h2>

        {/* YAZI 4: FİNAL LOGO */}
        <div ref={text4} className="absolute opacity-0 flex flex-col items-center">
          <h1 className="text-7xl md:text-[10rem] font-serif font-bold text-white mb-6 drop-shadow-2xl leading-none">
            NOCTÉR
          </h1>
          <div className="w-24 h-[1px] bg-[#D4AF37] mb-6" />
          <p className="text-sm md:text-xl text-white/80 tracking-[0.6em] uppercase font-light">
            Gölgeni Tanımla
          </p>
        </div>

      </div>

      {/* SCROLL GÖSTERGESİ */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce z-20" aria-hidden="true">
        <span className="text-[10px] tracking-widest uppercase text-white">KEŞFETMEK İÇİN KAYDIR</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </div>
  );
}