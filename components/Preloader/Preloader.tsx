"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useUIStore } from "@/store/useUIStore";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Cinematic page-intro overlay. Counts up, then wipes away and unlocks the page. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const setReady = useUIStore((s) => s.setReady);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        setReady(true);
        setDone(true);
        return;
      }
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          setReady(true);
          setDone(true);
        },
      });
      tl.to(counter, {
        v: 100,
        duration: 1.6,
        ease: "power2.inOut",
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = String(Math.round(counter.v));
        },
      })
        .to(".pl-bar", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, ">-0.1");
    },
    { scope: root, dependencies: [reduced] }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-end justify-between bg-base px-gutter pb-10"
      aria-hidden
    >
      <span className="font-display text-[clamp(3rem,12vw,9rem)] font-extrabold leading-none">
        <span ref={countRef}>0</span>
        <span className="text-ember">%</span>
      </span>
      <span className="mb-3 font-mono text-fluid-eyebrow uppercase tracking-[0.3em] text-muted">
        MAILLARD
      </span>
      <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ember pl-bar" />
    </div>
  );
}
