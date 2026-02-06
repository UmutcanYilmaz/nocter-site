"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_URL =
  "https://res.cloudinary.com/dsvefitse/video/upload/v1768932828/nocter-video_p1pure.mp4";

/**
 * Extracts frames from a video at a given FPS into ImageBitmap objects.
 * We cap at 24fps and scale down to 960px wide to keep memory reasonable
 * (~500-600 frames at manageable resolution).
 */
function useVideoFrames(src: string, targetFps = 24) {
  const [frames, setFrames] = useState<ImageBitmap[]>([]);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function extract() {
      try {
        const video = document.createElement("video");
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.playsInline = true;
        video.preload = "auto";
        video.src = src;

        await new Promise<void>((resolve, reject) => {
          video.onloadeddata = () => resolve();
          video.onerror = () =>
            reject(new Error("Video failed to load"));
        });

        const duration = video.duration;
        const totalFrames = Math.ceil(duration * targetFps);
        const step = duration / totalFrames;

        // Use a scaled-down offscreen canvas to reduce memory.
        // We draw at 960px wide (keeps quality good enough for
        // full-screen since the canvas stretches via cover-fit).
        const nativeW = video.videoWidth;
        const nativeH = video.videoHeight;
        const maxW = Math.min(nativeW, 960);
        const scale = maxW / nativeW;
        const canvasW = Math.round(nativeW * scale);
        const canvasH = Math.round(nativeH * scale);

        const offscreen = document.createElement("canvas");
        offscreen.width = canvasW;
        offscreen.height = canvasH;
        const ctx = offscreen.getContext("2d")!;
        const extracted: ImageBitmap[] = [];

        for (let i = 0; i <= totalFrames; i++) {
          if (cancelled) return;

          video.currentTime = Math.min(i * step, duration);
          await new Promise<void>((r) => {
            video.onseeked = () => r();
          });

          ctx.drawImage(video, 0, 0, canvasW, canvasH);
          const bitmap = await createImageBitmap(offscreen);
          extracted.push(bitmap);

          // Update progress every ~5 frames to reduce re-renders
          if (i % 5 === 0 || i === totalFrames) {
            setProgress(Math.round((i / totalFrames) * 100));
          }
        }

        if (!cancelled) {
          setFrames(extracted);
          setReady(true);
        }
      } catch (err) {
        console.error("Frame extraction failed:", err);
      }
    }

    extract();
    return () => {
      cancelled = true;
    };
  }, [src, targetFps]);

  return { frames, ready, progress };
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
export default function NocterHero() {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameIndex = useRef({ value: 0 });

  // Text references
  const text1 = useRef<HTMLHeadingElement>(null);
  const text2 = useRef<HTMLHeadingElement>(null);
  const text3 = useRef<HTMLHeadingElement>(null);
  const text4 = useRef<HTMLDivElement>(null);

  const { frames, ready, progress } = useVideoFrames(VIDEO_URL, 24);

  // ------ Canvas draw helper ------
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas || frames.length === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const i = Math.min(Math.max(Math.round(index), 0), frames.length - 1);
      const bmp = frames[i];
      if (!bmp) return;

      // Cover-fit (equivalent to CSS object-cover)
      const cw = canvas.width;
      const ch = canvas.height;
      const bw = bmp.width;
      const bh = bmp.height;
      const s = Math.max(cw / bw, ch / bh);
      const dw = bw * s;
      const dh = bh * s;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(bmp, dx, dy, dw, dh);
    },
    [frames]
  );

  // ------ Resize canvas to match viewport ------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawFrame(frameIndex.current.value);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [drawFrame]);

  // Draw initial frame once ready
  useEffect(() => {
    if (ready) drawFrame(0);
  }, [ready, drawFrame]);

  // ------ GSAP scroll-driven timeline ------
  useGSAP(
    () => {
      if (!ready || frames.length === 0) return;

      const lastFrame = frames.length - 1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=4000",
          scrub: 0.3, // tight scrub for responsive feel
          pin: true,
        },
      });

      // Animate proxy value 0 -> lastFrame; every update draws the frame
      tl.to(
        frameIndex.current,
        {
          value: lastFrame,
          ease: "none",
          onUpdate: () => drawFrame(frameIndex.current.value),
        },
        0
      );

      // ---------------------------------------------------------------
      // SLOGAN OVERLAYS  (positions = fraction of total timeline)
      // ---------------------------------------------------------------

      // 1. "AKISI DURDUR" -- traffic / red lights (10% - 16%)
      tl.fromTo(
        text1.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.05 },
        0.10
      ).to(text1.current, { opacity: 0, scale: 1.1, duration: 0.05 }, 0.16);

      // 2. "SESSiZLiGE HUKMET" -- rain / stillness (20% - 27%)
      tl.fromTo(
        text2.current,
        { opacity: 0, filter: "blur(10px)" },
        { opacity: 1, filter: "blur(0px)", duration: 0.05 },
        0.20
      ).to(
        text2.current,
        { opacity: 0, filter: "blur(5px)", duration: 0.05 },
        0.27
      );

      // 3. "Anin Hakimi Ol" -- encounter / golden light (30% - 34%)
      tl.fromTo(
        text3.current,
        { opacity: 0, letterSpacing: "0.5em" },
        { opacity: 1, letterSpacing: "0em", duration: 0.05 },
        0.30
      ).to(text3.current, { opacity: 0, duration: 0.05 }, 0.34);

      // 4. "NOCTER / Golgeni Tanimla" -- final shadow (38%+)
      tl.fromTo(
        text4.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.1 },
        0.38
      );

      // ---------------------------------------------------------------
      // PARALLAX on mouse move
      // ---------------------------------------------------------------
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to(text1.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(text2.current, {
          x: -xPos * 1.5,
          y: -yPos * 1.5,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(text3.current, {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1,
          ease: "power2.out",
        });
        gsap.to(text4.current, {
          x: -xPos * 0.8,
          y: -yPos * 0.8,
          duration: 1,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    },
    { scope: container, dependencies: [ready, frames, drawFrame] }
  );

  return (
    <div
      ref={container}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* CANVAS (replaces the <video> element entirely) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label="Nocter atmospheric brand video"
        role="img"
      />

      {/* Elegant loading bar while frames are being extracted */}
      {!ready && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
          <div className="mb-4 h-[1px] w-48 overflow-hidden bg-white/10">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            {"Deneyim Hazirlaniyor"}
          </span>
        </div>
      )}

      {/* DARK GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

      {/* SLOGAN TEXT LAYER */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 text-center">
        {/* 1 - Traffic: "Stop the flow" */}
        <h2
          ref={text1}
          className="absolute text-5xl md:text-8xl font-serif text-white opacity-0 font-bold tracking-tighter mix-blend-overlay"
        >
          {"AKISI"}{" "}
          <br />{" "}
          <span className="text-white italic drop-shadow-lg">{"DURDUR"}</span>
        </h2>

        {/* 2 - Silence: "Command the silence" */}
        <h2
          ref={text2}
          className="absolute text-4xl md:text-6xl font-sans text-blue-100 opacity-0 tracking-[0.5em] uppercase font-light drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          {"Sessizlige"} <br /> {"Hukmet"}
        </h2>

        {/* 3 - Encounter: "Own the moment" */}
        <h2
          ref={text3}
          className="absolute text-5xl md:text-8xl font-serif text-[#D4AF37] opacity-0 italic drop-shadow-2xl"
        >
          {"Anin Hakimi Ol"}
        </h2>

        {/* 4 - Final: Brand reveal */}
        <div
          ref={text4}
          className="absolute opacity-0 flex flex-col items-center"
        >
          <h1 className="text-7xl md:text-[10rem] font-serif font-bold text-white mb-6 drop-shadow-2xl leading-none">
            {"NOCTER"}
          </h1>
          <div className="w-24 h-[1px] bg-[#D4AF37] mb-6" />
          <p className="text-sm md:text-xl text-white/80 tracking-[0.6em] uppercase font-light">
            {"Golgeni Tanimla"}
          </p>
        </div>
      </div>

      {/* SCROLL INDICATOR (hidden once scrolling starts via CSS) */}
      {ready && (
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce z-20"
          aria-hidden="true"
        >
          <span className="text-[10px] tracking-widest uppercase text-white">
            {"KESFETMEK ICIN KAYDIR"}
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
        </div>
      )}
    </div>
  );
}
