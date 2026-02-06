"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  NocterHero                                                         */
/*  Canvas-rendered scroll-scrub hero with synchronised slogans        */
/* ------------------------------------------------------------------ */

export default function NocterHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // slogan refs
  const slogan1 = useRef<HTMLDivElement>(null);
  const slogan2 = useRef<HTMLDivElement>(null);
  const slogan3 = useRef<HTMLDivElement>(null);
  const slogan4 = useRef<HTMLDivElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Frame store
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameCountRef = useRef(0);

  /* ----------------------------------------------------------------
     STEP 1 — Load video off-screen, extract frames onto temp canvas,
     convert each to an <img> for instant drawing later.
     Using a moderate frame-rate (20 fps) keeps memory manageable
     while still looking buttery-smooth on scroll.
  ---------------------------------------------------------------- */
  const extractFrames = useCallback(async () => {
    const TARGET_FPS = 20;
    const video = document.createElement("video");
    video.src = "/nocter-video.mp4";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";

    await new Promise<void>((resolve, reject) => {
      video.onloadeddata = () => resolve();
      video.onerror = () => reject(new Error("Video failed to load"));
      video.load();
    });

    const duration = video.duration;
    const totalFrames = Math.ceil(duration * TARGET_FPS);
    frameCountRef.current = totalFrames;

    // Size the offscreen canvas to native video resolution (capped)
    const MAX_W = 1280;
    const scale = Math.min(1, MAX_W / video.videoWidth);
    const w = Math.round(video.videoWidth * scale);
    const h = Math.round(video.videoHeight * scale);

    const offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext("2d")!;

    const frames: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const targetTime = (i / totalFrames) * duration;

      // Seek to exact time
      video.currentTime = targetTime;
      await new Promise<void>((resolve) => {
        video.onseeked = () => resolve();
      });

      // Draw current frame
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(video, 0, 0, w, h);

      // Convert to blob URL for fast <img> drawing
      const blob = await new Promise<Blob>((resolve) => {
        offscreen.toBlob((b) => resolve(b!), "image/webp", 0.82);
      });
      const img = new Image();
      img.src = URL.createObjectURL(blob);
      await new Promise<void>((resolve) => {
        img.onload = () => resolve();
      });
      frames.push(img);

      setLoadProgress(Math.round(((i + 1) / totalFrames) * 100));
    }

    framesRef.current = frames;

    // Clean up offscreen video
    video.src = "";
    video.load();

    setReady(true);
  }, []);

  useEffect(() => {
    extractFrames();
  }, [extractFrames]);

  /* ----------------------------------------------------------------
     STEP 2 — Draw a specific frame to the visible canvas,
     covering the viewport like CSS object-fit: cover.
  ---------------------------------------------------------------- */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || frames.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(index, frames.length - 1));
    const img = frames[clamped];

    // Cover logic (like object-fit: cover)
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;

    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ----------------------------------------------------------------
     STEP 3 — Size the canvas to fill viewport (DPR-aware)
  ---------------------------------------------------------------- */
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // Redraw current frame if available
      if (framesRef.current.length > 0) drawFrame(0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  /* ----------------------------------------------------------------
     STEP 4 — GSAP timeline: scrub frame index + slogan animations.
     The scroll range is large (8000px) so each "step" of the scrub
     covers very few frames, producing perfectly smooth playback.

     Slogan schedule (% of scroll):
       0 -  15%  Slogan 1 — "AKISI DURDUR"        (visible from start)
      16 -  35%  Slogan 2 — "SESSIZLIGE HUKMET"
      38 -  58%  Slogan 3 — "Anin Hakimi Ol"
      62 - 100%  Slogan 4 — "NOCTER / Golgeni Tanimla"
  ---------------------------------------------------------------- */
  useGSAP(
    () => {
      if (!ready) return;
      const cont = containerRef.current;
      if (!cont) return;

      const total = frameCountRef.current;
      const proxy = { frame: 0 };

      // Draw first frame immediately
      drawFrame(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cont,
          start: "top top",
          end: "+=8000",
          scrub: 0.6,
          pin: true,
        },
      });

      /* --- Frame scrub ------------------------------------------ */
      tl.to(
        proxy,
        {
          frame: total - 1,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            drawFrame(Math.round(proxy.frame));
          },
        },
        0
      );

      /* --- SLOGAN 1: "AKISI DURDUR" (0 - 15%) -------------------- */
      // Starts fully visible, fades + scales out by 15%
      gsap.set(slogan1.current, { opacity: 1, scale: 1, y: 0 });
      tl.to(
        slogan1.current,
        {
          opacity: 0,
          scale: 1.12,
          y: -30,
          duration: 0.15,
          ease: "power2.in",
        },
        0.0
      );

      /* --- SLOGAN 2: "SESSIZLIGE HUKMET" (16% - 35%) -------------- */
      tl.fromTo(
        slogan2.current,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.07,
          ease: "power2.out",
        },
        0.16
      ).to(
        slogan2.current,
        {
          opacity: 0,
          y: -30,
          filter: "blur(6px)",
          duration: 0.08,
          ease: "power2.in",
        },
        0.28
      );

      /* --- SLOGAN 3: "Anin Hakimi Ol" (38% - 58%) ----------------- */
      tl.fromTo(
        slogan3.current,
        { opacity: 0, letterSpacing: "0.6em", scale: 0.92 },
        {
          opacity: 1,
          letterSpacing: "0.08em",
          scale: 1,
          duration: 0.08,
          ease: "power3.out",
        },
        0.38
      ).to(
        slogan3.current,
        {
          opacity: 0,
          scale: 1.05,
          y: -20,
          duration: 0.1,
          ease: "power2.in",
        },
        0.5
      );

      /* --- SLOGAN 4: "NOCTER / Golgeni Tanimla" (62% - 100%) ------ */
      tl.fromTo(
        slogan4.current,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.18,
          ease: "power3.out",
        },
        0.62
      );

      /* --- Mouse parallax on slogans ----------------------------- */
      const onMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 12;
        const ny = (e.clientY / window.innerHeight - 0.5) * 12;
        const ease = { duration: 1.2, ease: "power2.out" };

        gsap.to(slogan1.current, { x: nx, y: ny, ...ease });
        gsap.to(slogan2.current, { x: -nx * 1.2, y: -ny * 1.2, ...ease });
        gsap.to(slogan3.current, { x: nx * 0.7, y: ny * 0.7, ...ease });
        gsap.to(slogan4.current, { x: -nx * 0.5, y: -ny * 0.5, ...ease });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: containerRef, dependencies: [ready, drawFrame] }
  );

  /* ----------------------------------------------------------------
     RENDER
  ---------------------------------------------------------------- */
  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-label="Nocter hero section"
    >
      {/* Canvas for video frames */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Loading overlay */}
      {!ready && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black">
          {/* Brand mark during load */}
          <p className="text-white font-serif text-3xl tracking-widest mb-8 opacity-80">
            {"NOCT\u00c9R"}
          </p>
          {/* Progress bar */}
          <div className="w-56 h-[2px] bg-white/10 rounded overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-200 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="mt-4 text-[10px] uppercase tracking-[0.35em] text-white/40 tabular-nums">
            {loadProgress < 100
              ? `${loadProgress}%`
              : "Deneyim Haz\u0131rlan\u0131yor\u2026"}
          </span>
        </div>
      )}

      {/* Dark gradient overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60"
        aria-hidden="true"
      />

      {/* ========== SLOGANS ========== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6 text-center">
        {/* 1 — "AKISI DURDUR" */}
        <div
          ref={slogan1}
          className="absolute flex flex-col items-center"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white font-bold tracking-tighter leading-none">
            {"AKI\u015EI"}
          </h2>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white italic font-bold tracking-tighter leading-none mt-1 drop-shadow-lg">
            {"DURDUR"}
          </h2>
        </div>

        {/* 2 — "SESSIZLIGE HUKMET" */}
        <div
          ref={slogan2}
          className="absolute flex flex-col items-center opacity-0"
        >
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-sans text-blue-100 tracking-[0.35em] uppercase font-light drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            {"SESS\u0130ZL\u0130\u011EE"}
          </h2>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-sans text-blue-100 tracking-[0.35em] uppercase font-light mt-1">
            {"H\u00dcKMET"}
          </h2>
        </div>

        {/* 3 — "Anin Hakimi Ol" */}
        <div
          ref={slogan3}
          className="absolute flex flex-col items-center opacity-0"
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#D4AF37] italic drop-shadow-2xl">
            {"An\u0131n Hakimi Ol"}
          </h2>
        </div>

        {/* 4 — "NOCTER / Golgeni Tanimla" */}
        <div
          ref={slogan4}
          className="absolute flex flex-col items-center opacity-0"
        >
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-bold text-white leading-none drop-shadow-2xl">
            {"NOCT\u00c9R"}
          </h1>
          <div className="w-20 h-px bg-[#D4AF37] my-5" />
          <p className="text-xs sm:text-sm md:text-xl text-white/80 tracking-[0.55em] uppercase font-light">
            {"G\u00f6lgeni Tan\u0131mla"}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      {ready && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce z-20"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-white">
            {"Ke\u015ffetmek \u0130\u00e7in Kayd\u0131r"}
          </span>
          <div className="w-px h-7 bg-gradient-to-b from-white to-transparent" />
        </div>
      )}
    </section>
  );
}
