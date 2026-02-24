"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- PARTICLE SYSTEM ---
interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  angle: number;
  orbitRadius: number;
  orbitSpeed: number;
  baseX: number;
  baseY: number;
  pulse: number;
  pulseSpeed: number;
  trail: { x: number; y: number; opacity: number }[];
}

function createParticles(count: number, w: number, h: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const baseX = Math.random() * w;
    const baseY = Math.random() * h;
    particles.push({
      x: baseX,
      y: baseY,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.15,
      angle: Math.random() * Math.PI * 2,
      orbitRadius: Math.random() * 80 + 30,
      orbitSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      baseX,
      baseY,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.008,
      trail: [],
    });
  }
  return particles;
}

// --- SHOOTING STAR ---
interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

function spawnShootingStar(w: number, h: number): ShootingStar {
  const startX = Math.random() * w * 0.6 + w * 0.2;
  const angle = Math.random() * 0.8 + 0.3;
  return {
    x: startX, y: -10,
    vx: Math.cos(angle) * (3 + Math.random() * 4),
    vy: Math.sin(angle) * (3 + Math.random() * 4),
    life: 0, maxLife: 40 + Math.random() * 30,
    size: 1.5 + Math.random() * 1.5,
  };
}

export default function NocterHero() {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Text refs
  const text1 = useRef(null);
  const text2 = useRef(null);
  const text3 = useRef(null);
  const text4 = useRef(null);

  // Decorative element refs
  const deco1 = useRef(null);
  const deco2 = useRef(null);
  const deco3 = useRef(null);
  const deco4 = useRef(null);
  const cornerTL = useRef(null);
  const cornerTR = useRef(null);
  const cornerBL = useRef(null);
  const cornerBR = useRef(null);
  const breathBorder = useRef(null);

  // --- CANVAS ANIMATION ---
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const dpr = window.devicePixelRatio || 1;
    const time = Date.now() * 0.001;

    // Clear with slight fade for trailing effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, w, h);

    // --- CENTRAL GLOW (follows mouse) ---
    const glowX = w / 2 + (mouseRef.current.x - 0.5) * w * 0.2;
    const glowY = h / 2 + (mouseRef.current.y - 0.5) * h * 0.2;
    const pulseScale = 1 + Math.sin(time * 0.4) * 0.2;
    const glowRadius = Math.min(w, h) * 0.5 * pulseScale;

    const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
    grad.addColorStop(0, "rgba(212, 175, 55, 0.12)");
    grad.addColorStop(0.25, "rgba(212, 175, 55, 0.06)");
    grad.addColorStop(0.5, "rgba(180, 140, 40, 0.03)");
    grad.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // --- SECONDARY GLOW (warm, offset) ---
    const g2x = w * 0.3 + Math.sin(time * 0.3) * w * 0.05;
    const g2y = h * 0.6 + Math.cos(time * 0.25) * h * 0.05;
    const grad2 = ctx.createRadialGradient(g2x, g2y, 0, g2x, g2y, Math.min(w, h) * 0.3);
    grad2.addColorStop(0, "rgba(180, 130, 30, 0.05)");
    grad2.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, w, h);

    // --- PARTICLES WITH TRAILS ---
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.angle += p.orbitSpeed;
      p.pulse += p.pulseSpeed;

      const prevX = p.x;
      const prevY = p.y;
      p.x = p.baseX + Math.cos(p.angle) * p.orbitRadius;
      p.y = p.baseY + Math.sin(p.angle) * p.orbitRadius * 0.6;

      // Trail
      p.trail.push({ x: prevX, y: prevY, opacity: 0.4 });
      if (p.trail.length > 6) p.trail.shift();

      // Wrap
      if (p.x < -80) p.baseX += w + 160;
      if (p.x > w + 80) p.baseX -= w + 160;
      if (p.y < -80) p.baseY += h + 160;
      if (p.y > h + 80) p.baseY -= h + 160;

      const currentOpacity = p.opacity * (0.4 + Math.sin(p.pulse) * 0.6);
      const sz = p.size * dpr;

      // Draw trail
      for (let t = 0; t < p.trail.length; t++) {
        const tr = p.trail[t];
        const trOpacity = (t / p.trail.length) * currentOpacity * 0.3;
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, sz * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${trOpacity})`;
        ctx.fill();
      }

      // Outer glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, sz * 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity * 0.08})`;
      ctx.fill();

      // Mid glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, sz * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${currentOpacity * 0.2})`;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 240, 200, ${currentOpacity})`;
      ctx.fill();
    }

    // --- SHOOTING STARS ---
    const stars = shootingStarsRef.current;
    // Spawn occasionally
    if (Math.random() < 0.008 && stars.length < 3) {
      stars.push(spawnShootingStar(w, h));
    }

    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life++;

      const alpha = 1 - s.life / s.maxLife;
      if (alpha <= 0 || s.x > w + 50 || s.y > h + 50) {
        stars.splice(i, 1);
        continue;
      }

      // Trail
      const trailLen = 25;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * trailLen, s.y - s.vy * trailLen);
      const gradient = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * trailLen, s.y - s.vy * trailLen);
      gradient.addColorStop(0, `rgba(255, 240, 200, ${alpha * 0.8})`);
      gradient.addColorStop(0.3, `rgba(212, 175, 55, ${alpha * 0.3})`);
      gradient.addColorStop(1, "rgba(212, 175, 55, 0)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = s.size * dpr;
      ctx.lineCap = "round";
      ctx.stroke();

      // Head glow
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * dpr * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 240, 200, ${alpha * 0.3})`;
      ctx.fill();
    }

    // --- SUBTLE CONNECTING LINES between close particles ---
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 * dpr) {
          const lineOpacity = (1 - dist / (200 * dpr)) * 0.04;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${lineOpacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(drawCanvas);
  }, []);

  // Canvas setup and resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      particlesRef.current = createParticles(80, canvas.width, canvas.height);
      shootingStarsRef.current = [];
    };

    resize();
    animFrameRef.current = requestAnimationFrame(drawCanvas);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [drawCanvas]);

  // --- GSAP SCROLL ANIMATIONS ---
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "+=3500",
        scrub: 1,
        pin: true,
      },
    });

    // --- INITIAL STATE: Corners + border visible, fade in ---
    gsap.set([cornerTL.current, cornerTR.current, cornerBL.current, cornerBR.current], { opacity: 0 });
    gsap.set(breathBorder.current, { opacity: 0 });
    gsap.set([deco1.current, deco2.current, deco3.current, deco4.current], { opacity: 0 });

    // Corners fade in at start
    tl.to([cornerTL.current, cornerTR.current, cornerBL.current, cornerBR.current],
      { opacity: 0.4, duration: 0.03, stagger: 0.005 }, 0
    );

    // Breathing border
    tl.to(breathBorder.current, { opacity: 1, duration: 0.03 }, 0);

    // ===== TEXT 1: "AKIŞI DURDUR" =====
    // Decorative horizontal lines expand from center
    tl.to(deco1.current, { opacity: 1, scaleX: 1, duration: 0.04 }, 0.03);
    tl.fromTo(text1.current,
      { opacity: 0, scale: 0.7, filter: "blur(12px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.08, ease: "power3.out" }, 0.04
    )
      .to(deco1.current, { opacity: 0, scaleX: 1.5, duration: 0.04 }, 0.16)
      .to(text1.current, { opacity: 0, scale: 1.3, filter: "blur(12px)", duration: 0.06 }, 0.16);

    // ===== TEXT 2: "Sessizliğe Hükmet" =====
    tl.to(deco2.current, { opacity: 1, scaleY: 1, duration: 0.04 }, 0.24);
    tl.fromTo(text2.current,
      { opacity: 0, filter: "blur(20px)", y: 30 },
      { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.08, ease: "power2.out" }, 0.25
    )
      .to(deco2.current, { opacity: 0, duration: 0.04 }, 0.37)
      .to(text2.current, { opacity: 0, y: -50, filter: "blur(8px)", duration: 0.06 }, 0.37);

    // ===== TEXT 3: "Anın Hakimi Ol" =====
    tl.to(deco3.current, { opacity: 1, scaleX: 1, duration: 0.04 }, 0.45);
    tl.fromTo(text3.current,
      { opacity: 0, letterSpacing: "0.8em", filter: "blur(6px)" },
      { opacity: 1, letterSpacing: "0.02em", filter: "blur(0px)", duration: 0.1, ease: "power3.out" }, 0.46
    )
      .to(deco3.current, { opacity: 0, scaleX: 2, duration: 0.04 }, 0.58)
      .to(text3.current, { opacity: 0, scale: 1.3, filter: "blur(10px)", duration: 0.06 }, 0.58);

    // ===== TEXT 4: Final NOCTÉR brand reveal =====
    // Dramatic entrance with decorative elements
    tl.to(deco4.current, { opacity: 1, duration: 0.08 }, 0.66);
    tl.fromTo(text4.current,
      { opacity: 0, y: 80, filter: "blur(16px)", scale: 0.9 },
      { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.18, ease: "power2.out" }, 0.68
    );
    // Pulse the corners gold at the end
    tl.to([cornerTL.current, cornerTR.current, cornerBL.current, cornerBR.current],
      { borderColor: "rgba(212,175,55,0.6)", opacity: 0.8, duration: 0.1 }, 0.75
    );

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const mx = e.clientX / window.innerWidth;
      const my = e.clientY / window.innerHeight;
      mouseRef.current = { x: mx, y: my };

      const xShift = (mx - 0.5) * 24;
      const yShift = (my - 0.5) * 24;

      gsap.to(text1.current, { x: xShift, y: yShift, duration: 1.2, ease: "power2.out" });
      gsap.to(text2.current, { x: -xShift * 1.4, y: -yShift * 1.4, duration: 1.2, ease: "power2.out" });
      gsap.to(text3.current, { x: xShift * 0.6, y: yShift * 0.6, duration: 1.2, ease: "power2.out" });
      gsap.to(text4.current, { x: -xShift * 0.5, y: -yShift * 0.5, duration: 1.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: container });

  return (
    <div ref={container} className="relative h-screen w-full overflow-hidden bg-black">

      {/* CANVAS BACKGROUND */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* NOISE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* GRADIENT VIGNETTES */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

      {/* CINEMATIC LETTERBOX BARS */}
      <div className="absolute top-0 left-0 right-0 h-[8vh] bg-gradient-to-b from-black to-transparent z-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[8vh] bg-gradient-to-t from-black to-transparent z-30 pointer-events-none" />

      {/* BREATHING GOLDEN BORDER */}
      <div ref={breathBorder} className="absolute inset-[3vh_3vw] border border-[#D4AF37]/10 pointer-events-none z-20 opacity-0" style={{ animation: "breathBorder 6s ease-in-out infinite" }} />

      {/* CORNER ORNAMENTS */}
      <div ref={cornerTL} className="absolute top-[3vh] left-[3vw] w-12 h-12 border-t-2 border-l-2 border-white/30 pointer-events-none z-20 opacity-0" />
      <div ref={cornerTR} className="absolute top-[3vh] right-[3vw] w-12 h-12 border-t-2 border-r-2 border-white/30 pointer-events-none z-20 opacity-0" />
      <div ref={cornerBL} className="absolute bottom-[3vh] left-[3vw] w-12 h-12 border-b-2 border-l-2 border-white/30 pointer-events-none z-20 opacity-0" />
      <div ref={cornerBR} className="absolute bottom-[3vh] right-[3vw] w-12 h-12 border-b-2 border-r-2 border-white/30 pointer-events-none z-20 opacity-0" />

      {/* ===== DECORATIVE ELEMENTS (animate with text) ===== */}

      {/* Deco 1: Twin horizontal lines for Text 1 */}
      <div ref={deco1} className="absolute inset-0 flex items-center justify-center pointer-events-none z-[9] opacity-0" style={{ transform: "scaleX(0)" }}>
        <div className="absolute w-[60vw] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent -translate-y-[80px]" />
        <div className="absolute w-[40vw] h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent translate-y-[80px]" />
      </div>

      {/* Deco 2: Vertical accent lines for Text 2 */}
      <div ref={deco2} className="absolute inset-0 flex items-center justify-center pointer-events-none z-[9] opacity-0" style={{ transform: "scaleY(0)" }}>
        <div className="absolute w-[1px] h-[30vh] bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent -translate-x-[45vw]" />
        <div className="absolute w-[1px] h-[20vh] bg-gradient-to-b from-transparent via-[#D4AF37]/20 to-transparent translate-x-[45vw]" />
      </div>

      {/* Deco 3: Horizontal flare for Text 3 */}
      <div ref={deco3} className="absolute inset-0 flex items-center justify-center pointer-events-none z-[9] opacity-0" style={{ transform: "scaleX(0)" }}>
        <div className="absolute w-[80vw] h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      </div>

      {/* Deco 4: Diamond/ring for final reveal */}
      <div ref={deco4} className="absolute inset-0 flex items-center justify-center pointer-events-none z-[9] opacity-0">
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-[#D4AF37]/10 rounded-full" style={{ animation: "spinSlow 30s linear infinite" }} />
        <div className="absolute w-[220px] h-[220px] md:w-[380px] md:h-[380px] border border-[#D4AF37]/5 rounded-full" style={{ animation: "spinSlow 25s linear infinite reverse" }} />
        <div className="absolute w-12 h-12 border border-[#D4AF37]/20 rotate-45" />
      </div>

      {/* ===== TEXT LAYER ===== */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 text-center">

        {/* TEXT 1: "AKIŞI DURDUR" */}
        <div ref={text1} className="absolute flex flex-col items-center opacity-0">
          <span className="text-[10px] md:text-xs tracking-[1em] uppercase text-[#D4AF37]/50 mb-6">THE FLOW ENDS HERE</span>
          <h2 className="text-6xl md:text-9xl font-serif text-white font-bold tracking-tighter leading-none" style={{ textShadow: "0 0 100px rgba(212,175,55,0.4), 0 0 200px rgba(212,175,55,0.15)" }}>
            AKIŞI <br /> <span className="italic text-[#D4AF37]">DURDUR</span>
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-8" />
        </div>

        {/* TEXT 2: "Sessizliğe Hükmet" */}
        <div ref={text2} className="absolute flex flex-col items-center opacity-0">
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37]/60 to-transparent mb-8" />
          <h2 className="text-5xl md:text-8xl font-extralight text-white/90 tracking-[0.2em] uppercase leading-tight">
            Sessizliğe <br />
            <span className="font-normal text-[#D4AF37]" style={{ textShadow: "0 0 60px rgba(212,175,55,0.5)" }}>Hükmet</span>
          </h2>
          <div className="w-[1px] h-12 bg-gradient-to-t from-[#D4AF37]/60 to-transparent mt-8" />
        </div>

        {/* TEXT 3: "Anın Hakimi Ol" */}
        <div ref={text3} className="absolute flex flex-col items-center opacity-0">
          <span className="text-[10px] md:text-xs tracking-[0.8em] uppercase text-white/30 mb-6">SEIZE THE MOMENT</span>
          <h2 className="text-6xl md:text-[10rem] font-serif text-[#D4AF37] italic leading-none" style={{ textShadow: "0 0 80px rgba(212,175,55,0.5), 0 4px 30px rgba(0,0,0,0.8)" }}>
            Anın <br /> Hakimi Ol
          </h2>
        </div>

        {/* TEXT 4: FINAL BRAND REVEAL */}
        <div ref={text4} className="absolute opacity-0 flex flex-col items-center">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
            <span className="text-[9px] md:text-[11px] tracking-[0.6em] uppercase text-[#D4AF37]/60">EST. MMXXV</span>
            <div className="w-16 md:w-24 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
          </div>
          <h1 className="text-8xl md:text-[12rem] font-serif font-bold text-white leading-none" style={{ textShadow: "0 0 150px rgba(212,175,55,0.3), 0 0 60px rgba(212,175,55,0.15), 0 4px 40px rgba(0,0,0,0.9)" }}>
            NOCTÉR
          </h1>
          <div className="flex items-center gap-4 mt-6 mb-4">
            <div className="w-8 md:w-16 h-[1px] bg-[#D4AF37]/30" />
            <div className="w-2 h-2 border border-[#D4AF37]/40 rotate-45" />
            <div className="w-32 md:w-48 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <div className="w-2 h-2 border border-[#D4AF37]/40 rotate-45" />
            <div className="w-8 md:w-16 h-[1px] bg-[#D4AF37]/30" />
          </div>
          <p className="text-sm md:text-lg text-white/60 tracking-[0.6em] uppercase font-light mt-2">
            Gölgeni Tanımla
          </p>
        </div>

      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-[10vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 animate-bounce z-20" aria-hidden="true">
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">KEŞFETMEK İÇİN KAYDIR</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
      </div>

      {/* INLINE KEYFRAMES */}
      <style jsx>{`
        @keyframes breathBorder {
          0%, 100% { border-color: rgba(212, 175, 55, 0.05); }
          50% { border-color: rgba(212, 175, 55, 0.15); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}