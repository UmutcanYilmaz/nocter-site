"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------
   NocterHero
   
   Scroll-scrubbed video hero that fetches the full MP4 into a blob,
   creates a <video> from the blob URL (making all seeks local/instant),
   and draws each frame to a DPR-aware <canvas> on scroll.
   
   This avoids the slow frame-extraction loop entirely.
------------------------------------------------------------------ */

export default function NocterHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const slogan1 = useRef<HTMLDivElement>(null);
  const slogan2 = useRef<HTMLDivElement>(null);
  const slogan3 = useRef<HTMLDivElement>(null);
  const slogan4 = useRef<HTMLDivElement>(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  /* pending seek tracking */
  const seekPending = useRef(false);
  const targetTime = useRef(0);

  /* ----------------------------------------------------------------
     STEP 1 — Fetch the entire MP4 into memory as a Blob, then create
     a <video> from the blob URL. Because the file is fully local in
     memory, every currentTime seek resolves instantly (no network).
  ---------------------------------------------------------------- */
  useEffect(() => {
    let cancelled = false;

    async function loadVideo() {
      try {
        /* Fetch with progress tracking */
        const response = await fetch("/nocter-video.mp4");
        if (!response.ok || !response.body) {
          console.log("[v0] Video fetch failed:", response.status);
          return;
        }

        const contentLength = Number(response.headers.get("content-length")) || 0;
        const reader = response.body.getReader();
        const chunks: Uint8Array[] = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            received += value.length;
            if (contentLength > 0) {
              setLoadProgress(Math.round((received / contentLength) * 100));
            }
          }
        }

        if (cancelled) return;

        /* Create blob URL from downloaded data */
        const blob = new Blob(chunks, { type: "video/mp4" });
        const blobUrl = URL.createObjectURL(blob);

        /* Build video element from blob */
        const video = document.createElement("video");
        video.src = blobUrl;
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";

        await new Promise<void>((resolve, reject) => {
          video.onloadeddata = () => resolve();
          video.onerror = (e) => {
            console.log("[v0] Video element error:", e);
            reject(e);
          };
        });

        if (cancelled) {
          URL.revokeObjectURL(blobUrl);
          return;
        }

        console.log(
          "[v0] Video ready — duration:",
          video.duration,
          "size:",
          video.videoWidth,
          "x",
          video.videoHeight
        );

        videoRef.current = video;
        setLoadProgress(100);
        setReady(true);
      } catch (err) {
        console.log("[v0] Video load error:", err);
      }
    }

    loadVideo();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ----------------------------------------------------------------
     STEP 2 — Canvas sizing (DPR-aware, fills viewport)
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
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ----------------------------------------------------------------
     STEP 3 — Draw the current video frame to canvas (cover-fit)
  ---------------------------------------------------------------- */
  const drawVideoFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (vw === 0 || vh === 0) return;

    /* object-fit: cover */
    const scale = Math.max(cw / vw, ch / vh);
    const dw = vw * scale;
    const dh = vh * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(video, dx, dy, dw, dh);
  }, []);

  /* ----------------------------------------------------------------
     STEP 4 — Seek the video to a target time. Uses a pending-seek
     pattern: we only issue a new seek after the previous one lands,
     preventing seek queue pile-up.
  ---------------------------------------------------------------- */
  const seekTo = useCallback(
    (time: number) => {
      const video = videoRef.current;
      if (!video) return;

      targetTime.current = time;

      if (seekPending.current) return; /* will catch up when current seek lands */

      seekPending.current = true;
      video.currentTime = time;

      const onSeeked = () => {
        video.removeEventListener("seeked", onSeeked);
        drawVideoFrame();

        /* If target moved while we were seeking, seek again */
        if (Math.abs(video.currentTime - targetTime.current) > 0.04) {
          seekPending.current = false;
          seekTo(targetTime.current);
        } else {
          seekPending.current = false;
        }
      };
      video.addEventListener("seeked", onSeeked);
    },
    [drawVideoFrame]
  );

  /* ----------------------------------------------------------------
     STEP 5 — GSAP scroll timeline: scrub proxy.time from 0 to
     duration, seek the video on every update, and animate slogans.

     Scroll layout:
       +=7200  total scroll pixels (300px per second of video)
       scrub: 1  (smooth easing, responsive feel)
       pin: true (hero stays fixed while scrolling through)

     Slogan windows (% of total scroll):
       Slogan 1 "AKISI DURDUR"         —   0% to  15%
       Slogan 2 "SESSIZLIGE HUKMET"    —  18% to  38%
       Slogan 3 "Anin Hakimi Ol"       —  42% to  62%
       Slogan 4 "NOCTER / Golgeni..."  —  68% to 100%
  ---------------------------------------------------------------- */
  useGSAP(
    () => {
      if (!ready) return;
      const video = videoRef.current;
      const cont = containerRef.current;
      if (!video || !cont) return;

      const duration = video.duration;
      console.log("[v0] Setting up scroll timeline, video duration:", duration);

      /* Draw the first frame */
      video.currentTime = 0;
      const drawFirst = () => {
        video.removeEventListener("seeked", drawFirst);
        drawVideoFrame();
      };
      video.addEventListener("seeked", drawFirst);

      const proxy = { time: 0 };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cont,
          start: "top top",
          end: "+=7200",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* --- Video time scrub ------------------------------------ */
      tl.to(
        proxy,
        {
          time: duration,
          ease: "none",
          duration: 1,
          onUpdate: () => seekTo(proxy.time),
        },
        0
      );

      /* === SLOGAN 1: "AKISI DURDUR" (0% – 15%) ================ */
      /* Visible at start, fades + scales up as user scrolls */
      gsap.set(slogan1.current, { opacity: 1, scale: 1, y: 0 });
      tl.to(
        slogan1.current,
        { opacity: 0, scale: 1.15, y: -40, duration: 0.15, ease: "power2.in" },
        0.0
      );

      /* === SLOGAN 2: "SESSIZLIGE HUKMET" (18% – 38%) ========== */
      tl.fromTo(
        slogan2.current,
        { opacity: 0, y: 50, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.08, ease: "power2.out" },
        0.18
      ).to(
        slogan2.current,
        { opacity: 0, y: -40, filter: "blur(8px)", duration: 0.1, ease: "power2.in" },
        0.3
      );

      /* === SLOGAN 3: "Anin Hakimi Ol" (42% – 62%) ============= */
      tl.fromTo(
        slogan3.current,
        { opacity: 0, letterSpacing: "0.5em", scale: 0.9 },
        { opacity: 1, letterSpacing: "0.08em", scale: 1, duration: 0.1, ease: "power3.out" },
        0.42
      ).to(
        slogan3.current,
        { opacity: 0, scale: 1.08, y: -30, duration: 0.1, ease: "power2.in" },
        0.54
      );

      /* === SLOGAN 4: "NOCTER / Golgeni Tanimla" (68% – 100%) === */
      tl.fromTo(
        slogan4.current,
        { opacity: 0, y: 60, scale: 0.88 },
        { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: "power3.out" },
        0.68
      );
      /* Stays visible through end of scroll */

      /* --- Subtle mouse parallax on slogans ------------------- */
      const onMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 10;
        const ny = (e.clientY / window.innerHeight - 0.5) * 10;
        const cfg = { duration: 1.2, ease: "power2.out", overwrite: "auto" as const };
        gsap.to(slogan1.current, { x: nx, y: `+=${ny}`, ...cfg });
        gsap.to(slogan2.current, { x: -nx * 1.1, y: `+=${-ny * 1.1}`, ...cfg });
        gsap.to(slogan3.current, { x: nx * 0.8, y: `+=${ny * 0.8}`, ...cfg });
        gsap.to(slogan4.current, { x: -nx * 0.6, y: `+=${-ny * 0.6}`, ...cfg });
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    },
    { scope: containerRef, dependencies: [ready, seekTo, drawVideoFrame] }
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
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Loading overlay */}
      {!ready && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-black">
          <p
            className="font-serif text-3xl tracking-widest text-white/80 mb-8"
            aria-live="polite"
          >
            {"NOCT\u00c9R"}
          </p>
          <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] rounded-full transition-[width] duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <span className="mt-4 text-[10px] uppercase tracking-[0.35em] text-white/40 tabular-nums">
            {loadProgress}%
          </span>
        </div>
      )}

      {/* Gradient overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/60"
        aria-hidden="true"
      />

      {/* ========== SLOGANS ========== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-6 text-center">
        {/* 1 — AKISI DURDUR */}
        <div
          ref={slogan1}
          className="absolute flex flex-col items-center"
          style={{ opacity: ready ? 1 : 0 }}
        >
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white font-bold tracking-tighter leading-none text-balance">
            {"AKI\u015eI"}
          </h2>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif text-white italic font-bold tracking-tighter leading-none mt-1 drop-shadow-lg text-balance">
            {"DURDUR"}
          </h2>
        </div>

        {/* 2 — SESSIZLIGE HUKMET */}
        <div ref={slogan2} className="absolute flex flex-col items-center opacity-0">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-sans text-blue-100 tracking-[0.35em] uppercase font-light drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] text-balance">
            {"SESS\u0130ZL\u0130\u011eE"}
          </h2>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-sans text-blue-100 tracking-[0.35em] uppercase font-light mt-1 text-balance">
            {"H\u00dcKMET"}
          </h2>
        </div>

        {/* 3 — Anin Hakimi Ol */}
        <div ref={slogan3} className="absolute flex flex-col items-center opacity-0">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif text-[#D4AF37] italic drop-shadow-2xl text-balance">
            {"An\u0131n Hakimi Ol"}
          </h2>
        </div>

        {/* 4 — NOCTER / Golgeni Tanimla */}
        <div ref={slogan4} className="absolute flex flex-col items-center opacity-0">
          <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-serif font-bold text-white leading-none drop-shadow-2xl text-balance">
            {"NOCT\u00c9R"}
          </h1>
          <div className="w-20 h-px bg-[#D4AF37] my-5" aria-hidden="true" />
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
