"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function NocterHero() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const text1 = useRef<HTMLHeadingElement>(null);
  const text2 = useRef<HTMLHeadingElement>(null);
  const text3 = useRef<HTMLHeadingElement>(null);
  const text4 = useRef<HTMLDivElement>(null);

  const [videoReady, setVideoReady] = useState(false);

  // ---- Load the video and ensure it's buffered enough for scrubbing ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      // Ensure we are at the very start
      video.currentTime = 0;
      setVideoReady(true);
    };

    // canplaythrough = browser estimates it can play the whole file without stopping
    if (video.readyState >= 4) {
      onReady();
    } else {
      video.addEventListener("canplaythrough", onReady, { once: true });
    }

    return () => {
      video.removeEventListener("canplaythrough", onReady);
    };
  }, []);

  // ---- GSAP scroll-driven timeline ----
  useGSAP(
    () => {
      if (!videoReady) return;
      const video = videoRef.current;
      if (!video || !container.current) return;

      const duration = video.duration || 24;

      // Proxy object for GSAP to tween
      const proxy = { time: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=6000", // longer scroll distance = smoother scrub
          scrub: 1.2, // smoothing factor – higher = smoother but laggier
          pin: true,
        },
      });

      // ---------- VIDEO SCRUB ----------
      tl.to(
        proxy,
        {
          time: duration,
          ease: "none",
          duration: 1, // normalized to timeline [0,1]
          onUpdate: () => {
            // Use fastSeek when available for better performance
            const t = Math.min(proxy.time, duration - 0.05);
            if (video.fastSeek) {
              video.fastSeek(t);
            } else {
              video.currentTime = t;
            }
          },
        },
        0
      );

      // ---------- SLOGAN 1: "AKISI DURDUR" ----------
      // Visible at start and fades away as scroll begins (0% - 12%)
      gsap.set(text1.current, { opacity: 1, scale: 1 });
      tl.to(
        text1.current,
        { opacity: 0, scale: 1.15, duration: 0.12, ease: "power2.in" },
        0.0
      );

      // ---------- SLOGAN 2: "SESSiZLiGE HUKMET" ----------
      // Appears 15% - 30%
      tl.fromTo(
        text2.current,
        { opacity: 0, filter: "blur(12px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.06,
          ease: "power2.out",
        },
        0.15
      ).to(
        text2.current,
        {
          opacity: 0,
          filter: "blur(6px)",
          duration: 0.09,
          ease: "power2.in",
        },
        0.24
      );

      // ---------- SLOGAN 3: "Anin Hakimi Ol" ----------
      // Appears 36% - 52%
      tl.fromTo(
        text3.current,
        { opacity: 0, letterSpacing: "0.5em" },
        {
          opacity: 1,
          letterSpacing: "0.05em",
          duration: 0.06,
          ease: "power3.out",
        },
        0.36
      ).to(
        text3.current,
        { opacity: 0, duration: 0.1, ease: "power2.in" },
        0.48
      );

      // ---------- SLOGAN 4: "NOCTER / Golgeni Tanimla" ----------
      // Appears from 60% and stays until end
      tl.fromTo(
        text4.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.15,
          ease: "power3.out",
        },
        0.6
      );

      // ---------- MOUSE PARALLAX ----------
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 15;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 15;

        gsap.to(text1.current, {
          x: xPos,
          y: yPos,
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to(text2.current, {
          x: -xPos * 1.3,
          y: -yPos * 1.3,
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to(text3.current, {
          x: xPos * 0.6,
          y: yPos * 0.6,
          duration: 1.2,
          ease: "power2.out",
        });
        gsap.to(text4.current, {
          x: -xPos * 0.5,
          y: -yPos * 0.5,
          duration: 1.2,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container, dependencies: [videoReady] }
  );

  return (
    <div
      ref={container}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* VIDEO element -- hidden from layout flow, covers the viewport */}
      <video
        ref={videoRef}
        src="/nocter-video.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Nocter atmospheric brand video"
      />

      {/* Loading state -- subtle, only shows when video hasn't loaded */}
      {!videoReady && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
          <div className="mb-4 h-px w-48 overflow-hidden bg-white/10">
            <div className="h-full w-1/3 bg-[#D4AF37] animate-pulse" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            {"Deneyim Hazirlaniyor"}
          </span>
        </div>
      )}

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />

      {/* SLOGAN TEXT LAYER */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 text-center">
        {/* 1 - "AKISI DURDUR" -- visible immediately, fades on scroll */}
        <h2
          ref={text1}
          className="absolute text-5xl md:text-8xl font-serif text-white font-bold tracking-tighter"
          style={{ opacity: videoReady ? 1 : 0 }}
        >
          {"AKI\u015EI"}
          <br />
          <span className="text-white italic drop-shadow-lg">{"DURDUR"}</span>
        </h2>

        {/* 2 - "SESSiZLiGE HUKMET" */}
        <h2
          ref={text2}
          className="absolute text-4xl md:text-7xl font-sans text-blue-100 opacity-0 tracking-[0.4em] uppercase font-light drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          {"SESS\u0130ZL\u0130\u011EE"}
          <br />
          {"H\u00dcKMET"}
        </h2>

        {/* 3 - "Anin Hakimi Ol" */}
        <h2
          ref={text3}
          className="absolute text-5xl md:text-8xl font-serif text-[#D4AF37] opacity-0 italic drop-shadow-2xl"
        >
          {"An\u0131n Hakimi Ol"}
        </h2>

        {/* 4 - Brand reveal "NOCTER / Golgeni Tanimla" */}
        <div
          ref={text4}
          className="absolute opacity-0 flex flex-col items-center"
        >
          <h1 className="text-7xl md:text-[10rem] font-serif font-bold text-white mb-6 drop-shadow-2xl leading-none">
            {"NOCT\u00c9R"}
          </h1>
          <div className="w-24 h-px bg-[#D4AF37] mb-6" />
          <p className="text-sm md:text-xl text-white/80 tracking-[0.6em] uppercase font-light">
            {"G\u00f6lgeni Tan\u0131mla"}
          </p>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      {videoReady && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce z-20"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase text-white">
            {"KE\u015eFETMEK \u0130\u00c7\u0130N KAYDIR"}
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      )}
    </div>
  );
}
