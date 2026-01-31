"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [text] = useState("DISCOVER");

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isBottle = target.closest(".hero-bottle");

      if (isBottle) {
        gsap.to(cursor, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
        });
      } else {
        gsap.to(cursor, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-24 h-24 -ml-12 -mt-12 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-bold tracking-widest pointer-events-none z-[100] opacity-0 scale-0 mix-blend-difference"
    >
      {text}
    </div>
  );
}
