"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

/**
  * A GSAP-driven trailing cursor. Grows and inverts over interactive elements
  * ([data-cursor="hover"]). Rendered only on fine-pointer devices.
  */
export function CustomCursor() {
    const dot = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;
        const dotEl = dot.current;
        const ringEl = ring.current;
        if (!dotEl || !ringEl) return;

        const xTo = gsap.quickTo(ringEl, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(ringEl, "y", { duration: 0.5, ease: "power3" });
        const xDot = gsap.quickTo(dotEl, "x", { duration: 0.12, ease: "power3" });
        const yDot = gsap.quickTo(dotEl, "y", { duration: 0.12, ease: "power3" });

        const onMove = (e: PointerEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
            xDot(e.clientX);
            yDot(e.clientY);
        };

        const enter = () => gsap.to(ringEl, { scale: 2.2, borderColor: "#FF6A21", duration: 0.3 });
        const leave = () => gsap.to(ringEl, { scale: 1, borderColor: "rgba(245,239,230,0.4)", duration: 0.3 });

        document.documentElement.classList.add("has-custom-cursor");
        window.addEventListener("pointermove", onMove, { passive: true });
        const targets = document.querySelectorAll('[data-cursor="hover"]');
        targets.forEach((t) => {
            t.addEventListener("pointerenter", enter);
            t.addEventListener("pointerleave", leave);
        });

        return () => {
            document.documentElement.classList.remove("has-custom-cursor");
            window.removeEventListener("pointermove", onMove);
            targets.forEach((t) => {
                t.removeEventListener("pointerenter", enter);
                t.removeEventListener("pointerleave", leave);
            });
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
            <div
                ref={ring}
                className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-ink/40"
                style={{ willChange: "transform" }}
            />
            <div
                ref={dot}
                className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-ember"
                style={{ willChange: "transform" }}
            />
        </div>
    );
}
