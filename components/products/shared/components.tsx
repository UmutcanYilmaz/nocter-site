"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { OlfactoryProfile } from "./types";

// 2.1 Atmosferik Partikül Motoru
export const AtmosphericParticles = ({ color }: { color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animationFrameId: number;

    const particleCount = 35;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }[] = [];

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: Math.random() * 0.5,
      fadeSpeed: 0.003 + Math.random() * 0.003
    });

    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        p.opacity += p.fadeSpeed;
        if (p.opacity >= 0.7 || p.opacity <= 0.1) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.abs(p.opacity);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 mix-blend-screen opacity-70" />;
};



// 2.3 Kelime Ayırıcı
export const SplitText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block translate-y-full opacity-0 will-change-transform"
          style={{ transitionDelay: `${delay + i * 0.02}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

// 2.4 Koku Kimliği Izgarası
export const OlfactoryGrid = ({ olfactory, color }: { olfactory: OlfactoryProfile, color: string }) => {
  return (
    <div className="space-y-12">
      <div className="olfactory-section opacity-0 translate-y-4 transition-all duration-700">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-1 rounded-full bg-white/40"></span>
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">TOP NOTES</span>
          <div className="h-[1px] flex-1 bg-white/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {olfactory.top.map((note, i) => (
            <div key={i} className="group">
              <span className="block text-[9px] uppercase tracking-widest text-white/30 mb-1">{note.type}</span>
              <h4 className="text-white text-sm font-medium mb-1 group-hover:text-white/80 transition-colors">{note.name}</h4>
              <p className="text-[10px] text-white/40 font-light leading-relaxed">{note.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="olfactory-section opacity-0 translate-y-4 transition-all duration-700 delay-100">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></span>
          <span className="text-[10px] tracking-[0.25em] uppercase font-bold" style={{ color: color }}>HEART NOTES</span>
          <div className="h-[1px] flex-1" style={{ backgroundColor: `${color}20` }}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {olfactory.heart.map((note, i) => (
            <div key={i} className="group border-l border-white/5 pl-4 hover:border-white/20 transition-colors">
              <span className="block text-[9px] uppercase tracking-widest mb-1" style={{ color: `${color}60` }}>{note.type}</span>
              <h4 className="text-white text-lg font-serif italic mb-1">{note.name}</h4>
              <p className="text-[10px] text-white/40 font-light leading-relaxed">{note.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="olfactory-section opacity-0 translate-y-4 transition-all duration-700 delay-200">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-1 h-1 rounded-full bg-white/40"></span>
          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">BASE NOTES</span>
          <div className="h-[1px] flex-1 bg-white/5"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {olfactory.base.map((note, i) => (
            <div key={i} className="group">
              <span className="block text-[9px] uppercase tracking-widest text-white/30 mb-1">{note.type}</span>
              <h4 className="text-white text-sm font-medium mb-1">{note.name}</h4>
              <p className="text-[10px] text-white/40 font-light leading-relaxed">{note.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
