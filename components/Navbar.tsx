"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Navbar() {
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const nav = navRef.current;
        if (!nav) return;

        // Initial Animation
        gsap.fromTo(nav,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.5, ease: "power3.out", delay: 1 }
        );
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference"
        >
            <Link href="/" className="group">
                <span className="text-white text-xl font-serif font-bold tracking-widest group-hover:text-[#D4AF37] transition-colors duration-300">
                    NOCTÉR
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-12">
                <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
                    Felsefe
                </button>
                <button onClick={() => window.scrollTo({ top: window.innerHeight * 4, behavior: 'smooth' })} className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
                    Koleksiyon
                </button>
                <Link href="#contact" className="text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors">
                    İletişim
                </Link>
            </div>

            <div className="w-8 h-8 flex flex-col justify-center gap-1.5 md:hidden cursor-pointer group">
                <span className="w-full h-[1px] bg-white group-hover:bg-[#D4AF37] transition-colors"></span>
                <span className="w-2/3 h-[1px] bg-white group-hover:bg-[#D4AF37] transition-colors self-end"></span>
            </div>
        </nav>
    );
}
