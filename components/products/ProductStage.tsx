"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Product } from "./shared/types";
import { AtmosphericParticles, SplitText, OlfactoryGrid } from "./shared/components";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductStageProps {
  product: Product;
  index: number;
  mousePos: { x: number, y: number };
}

export default function ProductStage({ product, index, mousePos }: ProductStageProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const hero = panel.querySelector(".hero-bottle");
    const bgTitleChars = panel.querySelectorAll(".bg-title .char");
    const glow = panel.querySelector(".atmospheric-glow");
    const leftContent = panel.querySelector(".left-content");
    const rightContent = panel.querySelector(".right-content");
    const chapter1 = panel.querySelector(".chapter-1");
    const chapter2 = panel.querySelector(".chapter-2");
    const chapter3 = panel.querySelector(".chapter-3");
    const olfSections = panel.querySelectorAll(".olfactory-section");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top top",
        end: "+=3500",
        pin: true,
        scrub: 1,
        anticipatePin: 1
      }
    });

    tl.to(glow, { opacity: 1, scale: 1, duration: 2, ease: "sine.out" })
      .to(bgTitleChars, { y: "0%", opacity: 0.08, duration: 2, stagger: 0.05, ease: "power4.out" }, "<")
      .fromTo(hero,
        { scale: 0.85, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 2.5, ease: "power3.out" }, "<"
      )
      .to([leftContent, rightContent], { autoAlpha: 1, duration: 1 }, "-=1");

    tl.fromTo(chapter1, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2 });
    tl.to(chapter1, { opacity: 0, filter: "blur(5px)", duration: 1, delay: 1 })
      .fromTo(chapter2, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2 });
    tl.to(chapter2, { opacity: 0, filter: "blur(5px)", duration: 1, delay: 1 })
      .fromTo(chapter3, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 2 });

    tl.to(hero, { x: "-22vw", scale: 0.85, duration: 2, ease: "power2.inOut" }, "-=1")
      .fromTo(rightContent, { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 2 }, "<");

    tl.to(olfSections, { opacity: 1, y: 0, stagger: 0.3, duration: 1.5 }, "-=0.5");

    tl.to([hero, glow, bgTitleChars, rightContent, chapter3], {
      opacity: 0,
      scale: 1.05,
      filter: "blur(15px)",
      duration: 2,
      delay: 1
    });

  }, { scope: panelRef });

  return (
    <div
      ref={panelRef}
      className="product-stage relative w-full h-screen flex overflow-hidden border-b border-white/5 sticky top-0"
      style={{
        zIndex: index + 1,
        background: product.palette.gradient
      }}
    >
      <div
        className="atmospheric-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[1400px] md:h-[1400px] rounded-full blur-[250px] opacity-0 z-0 pointer-events-none"
        style={{ backgroundColor: product.palette.glow }}
      />
      <AtmosphericParticles color={product.palette.particleColor} />

      <div className="bg-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none select-none w-full text-center">
         <h1
            className="text-[18vw] md:text-[22vw] font-serif font-bold text-transparent whitespace-nowrap leading-none"
            style={{ WebkitTextStroke: `1px rgba(255,255,255,0.06)` }}
         >
            <SplitText text={product.identity.name.split(' ')[0]} />
         </h1>
      </div>

      <div className="relative z-20 w-full h-full max-w-[1920px] mx-auto grid grid-cols-12 px-6 md:px-16 pointer-events-none">
        <div className="left-content col-span-12 md:col-span-4 flex flex-col justify-center h-full relative z-30 invisible opacity-0">
          <div className="absolute top-1/2 -translate-y-1/2 w-full pr-8">
            <div className="chapter-1 absolute top-0 left-0 opacity-0 w-full">
              <span className="text-[10px] tracking-[0.4em] uppercase block mb-6 text-white/40">
                {product.narrative[0].subtitle}
              </span>
              <p className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed">
                &quot;{product.narrative[0].text}&quot;
              </p>
              <div className="mt-8 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: product.palette.primary }}></div>
                <span className="text-[10px] text-white/50 tracking-widest uppercase">{product.narrative[0].mood}</span>
              </div>
            </div>

            <div className="chapter-2 absolute top-0 left-0 opacity-0 w-full">
              <span className="text-[10px] tracking-[0.4em] uppercase block mb-6" style={{ color: product.palette.primary }}>
                {product.narrative[1].subtitle}
              </span>
              <p className="text-xl md:text-3xl font-serif italic text-white leading-relaxed">
                {product.narrative[1].text}
              </p>
              <div className="mt-8 w-12 h-[1px] bg-white/20"></div>
            </div>

            <div className="chapter-3 absolute top-0 left-0 opacity-0 w-full">
              <span className="text-[10px] tracking-[0.4em] uppercase block mb-6 text-white/40">
                {product.narrative[2].subtitle}
              </span>
              <p className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed">
                &quot;{product.narrative[2].text}&quot;
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 relative flex items-center justify-center h-full z-20">
          <div
            className="hero-bottle relative w-[60vh] h-[60vh] md:w-[60vh] md:h-[80vh] pointer-events-auto cursor-none group"
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
              transition: "transform 0.2s ease-out"
            }}
          >
            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
            <Image
              src={product.assets.image}
              alt={product.identity.name}
              fill
              quality={100}
              className="object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.8)]"
              priority={index === 0}
            />
          </div>
        </div>

        <div className="right-content col-span-12 md:col-span-4 flex flex-col justify-center items-end h-full relative z-30 pl-8 border-l border-white/5 invisible opacity-0">
          <div className="mb-16 text-right w-full">
            <div className="flex justify-end items-center gap-4 mb-2">
              <span className="text-[10px] tracking-[0.3em] text-white/50">{product.identity.sku}</span>
              <span className="text-xs font-mono text-white/30">NO. 0{index + 1}</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-none mb-4 tracking-tight">{product.identity.name}</h2>
            <div className="flex justify-end items-center gap-4">
              <span className="w-8 h-[1px]" style={{ backgroundColor: product.palette.primary }}></span>
              <span className="text-xs tracking-[0.4em] uppercase font-bold text-white/90">
                {product.identity.tagline}
              </span>
            </div>
          </div>

          <div className="w-full mb-12">
            <OlfactoryGrid olfactory={product.olfactory} color={product.palette.primary} />
          </div>
        </div>
      </div>
    </div>
  );
}
