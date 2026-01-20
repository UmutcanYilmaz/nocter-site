"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// GSAP eklentilerini kaydet
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function NocterHero() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Metin Referansları
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);
  const text4 = useRef(null);

  // Video hazır olduğunda tetiklenen ana fonksiyon
  const onVideoReady = () => {
    if (isLoaded) return;
    const video = videoRef.current;
    if (video) {
      video.pause();
      // Videoyu en başa çek
      video.currentTime = 0;
      setIsLoaded(true);
      
      // DOM güncellendiği için ScrollTrigger'ı yeniden hesapla
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    }
  };

  // EMNİYET MEKANİZMASI: Metadata tetiklenmezse hazır olmasını bekle
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const checkReady = () => {
      if (video.readyState >= 2) {
        onVideoReady();
      }
    };

    video.addEventListener('loadedmetadata', onVideoReady);
    video.addEventListener('canplay', onVideoReady);
    
    // Zaten yüklü olabilir (cache)
    checkReady();

    const timeout = setTimeout(() => {
      if (!isLoaded) onVideoReady();
    }, 5000);

    return () => {
      video.removeEventListener('loadedmetadata', onVideoReady);
      video.removeEventListener('canplay', onVideoReady);
      clearTimeout(timeout);
    };
  }, [isLoaded]);

  useGSAP(() => {
    if (!videoRef.current || !isLoaded) return;

    const video = videoRef.current;
    const duration = video.duration;
    
    // Süre geçerli değilse işlemi durdur
    if (!duration || isNaN(duration)) return;

    // ANA ZAMAN ÇİZELGESİ
    // Video "atlama" sorununu çözmek için daha hassas bir scrub ve end mesafesi kullanıyoruz
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=15000", // Akıcılığı artırmak için mesafe biraz daha uzatıldı
        scrub: 0.1,     // 0.1 değeri anlık ve pürüzsüz tepki sağlar
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // VİDEO ZAMANLAMASI
    // Direct property animation yerine, onUpdate ile manuel besleme bazı tarayıcılarda daha pürüzsüzdür
    tl.to({}, {
      duration: 1,
      onUpdate: function() {
        const progress = this.progress();
        // Videonun saniyesini scroll ilerlemesine göre hesapla
        const targetTime = progress * duration;
        
        // Atlamayı engellemek için sadece küçük farklarda güncelleme yap
        if (video) {
          video.currentTime = targetTime;
        }
      }
    });

    // --- METİN ANİMASYONLARI ---
    // Timeline'ın belirli yüzdelerinde tetiklenecek şekilde ayarlandı
    
    // SAHNE 1: AKIŞI DURDUR
    tl.fromTo(text1.current, 
      { opacity: 0, scale: 0.8, filter: "blur(15px)" }, 
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.1 }, 0.1) 
      .to(text1.current, { opacity: 0, scale: 1.2, filter: "blur(10px)", duration: 0.1 }, 0.22);

    // SAHNE 2: SESSİZLİĞE HÜKMET
    tl.fromTo(text2.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.1 }, 0.35)
      .to(text2.current, { opacity: 0, y: -30, duration: 0.1 }, 0.48);

    // SAHNE 3: ANIN HAKİMİ OL
    tl.fromTo(text3.current, 
      { opacity: 0, letterSpacing: "1.2em" }, 
      { opacity: 1, letterSpacing: "0.2em", duration: 0.1 }, 0.62)
      .to(text3.current, { opacity: 0, duration: 0.1 }, 0.75);

    // SAHNE 4: LOGO FİNAL
    tl.fromTo(text4.current, 
      { opacity: 0, scale: 0.6, y: 20 }, 
      { opacity: 1, scale: 1, y: 0, duration: 0.15, ease: "power3.out" }, 0.85);

  }, { scope: container, dependencies: [isLoaded] });

  return (
    <div ref={container} className="relative h-screen w-full overflow-hidden bg-black">
      
      {/* YÜKLEME EKRANI (DOM yapısını bozmamak için her zaman burada) */}
      <div className={`absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-1000 ${isLoaded ? "opacity-0 pointer-events-none scale-110" : "opacity-100"}`}>
        <div className="w-20 h-[1px] bg-white/10 relative overflow-hidden mb-5">
          <div className="absolute inset-0 bg-[#D4AF37] animate-loading-bar"></div>
        </div>
        <p className="text-[9px] tracking-[0.6em] text-[#D4AF37] animate-pulse uppercase font-medium">
          {hasError ? "BAĞLANTI KONTROL EDİLİYOR" : "SİSTEM HAZIRLANIYOR"}
        </p>
      </div>

      {/* VİDEO KATMANI */}
      <video
        ref={videoRef}
        src="/nocter-video.mp4"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        muted
        playsInline
        preload="auto"
      />

      {/* SİNEMATİK GRADYAN */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none z-10" />

      {/* METİN KATMANLARI */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 px-6 text-center">
        
        <h2 ref={text1} className="absolute text-5xl md:text-9xl font-serif text-white opacity-0 font-bold tracking-tighter">
          AKIŞI <br /> <span className="text-[#D4AF37] italic">DURDUR</span>
        </h2>

        <h2 ref={text2} className="absolute text-4xl md:text-7xl font-sans text-white opacity-0 tracking-[0.4em] uppercase font-thin">
          Sessizliğe <br /> Hükmet
        </h2>

        <h2 ref={text3} className="absolute text-5xl md:text-8xl font-serif text-[#D4AF37] opacity-0 italic font-medium">
          Anın Hakimi Ol
        </h2>

        <div ref={text4} className="absolute opacity-0 flex flex-col items-center">
          <h1 className="text-8xl md:text-[13rem] font-serif font-bold text-white mb-2 leading-none tracking-tighter">
            NOCTÉR
          </h1>
          <div className="w-16 h-[1px] bg-[#D4AF37] mb-6 opacity-50" />
          <p className="text-[10px] md:text-xs text-[#D4AF37] tracking-[1em] uppercase font-light">
            Gölgeni Tanımla
          </p>
        </div>
      </div>

      {/* SCROLL GÖSTERGESİ */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-50 animate-bounce' : 'opacity-0'}`}>
        <span className="text-[8px] tracking-[0.5em] uppercase text-white font-light">Keşfe Başla</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </div>

      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-loading-bar {
          animation: loading-bar 2s infinite cubic-bezier(0.65, 0, 0.35, 1);
        }
      `}</style>
    </div>
  );
}