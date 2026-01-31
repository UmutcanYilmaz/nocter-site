"use client";

import { useState, useEffect } from "react";
import DarkOath from "./products/DarkOath";
import Outland from "./products/Outland";
import GhostTown from "./products/GhostTown";
import LiquidChrome from "./products/LiquidChrome";
import SolarFlare from "./products/SolarFlare";
import CustomCursor from "./products/shared/CustomCursor";

export default function ProductShowcase() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse Takibi (Optimize Edilmiş)
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ 
            x: (e.clientX / window.innerWidth) * 2 - 1, 
            y: (e.clientY / window.innerHeight) * 2 - 1 
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* GLOBAL DOKU */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-50 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <DarkOath mousePos={mousePos} />
      <Outland mousePos={mousePos} />
      <GhostTown mousePos={mousePos} />
      <LiquidChrome mousePos={mousePos} />
      <SolarFlare mousePos={mousePos} />

      <CustomCursor />
    </section>
  );
}
