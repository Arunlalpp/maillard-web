"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
  * Buttery smooth scrolling via Lenis, driven by GSAP's ticker so that Lenis and
  * ScrollTrigger share a single rAF loop (no double-rAF jank). Disabled entirely
  * under prefers-reduced-motion so the page uses native scrolling.
  */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const reduced = usePrefersReducedMotion();

    useEffect(() => {
        if (reduced) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 1.2,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
        };
    }, [reduced]);

    return <>{children}</>;
}
