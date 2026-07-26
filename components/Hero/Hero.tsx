"use client";

import { useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { useScrollScrub } from "@/hooks/useScrollScrub";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { brand } from "@/lib/content";
import { clamp } from "@/lib/utils";

// WebGL particles are non-critical → load client-side only, after paint.
const HeroCanvas = dynamic(
  () => import("./HeroCanvas").then((m) => m.HeroCanvas),
  { ssr: false }
);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  const onProgress = useCallback((p: number) => {
    const fade = 1 - clamp(p / 0.16);
    if (overlayRef.current) {
      overlayRef.current.style.opacity = String(fade);
      overlayRef.current.style.transform = `translateY(${-(1 - fade) * 24}px)`;
      overlayRef.current.style.pointerEvents = fade < 0.05 ? "none" : "auto";
    }
    if (fillRef.current) fillRef.current.style.width = `${(p * 100).toFixed(2)}%`;
    if (tcRef.current) {
      const dur = videoRef.current?.duration ?? 0;
      const t = p * dur;
      const m = Math.floor(t / 60);
      const s = Math.floor(t % 60);
      tcRef.current.textContent = `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
    }
  }, []);

  useScrollScrub({
    trigger: heroRef,
    video: videoRef,
    enabled: !reduced,
    onProgress,
  });

  // Reduced motion → quiet autoplay loop.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !reduced) return;
    v.loop = true;
    v.muted = true;
    v.play().catch(() => undefined);
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      aria-label="Watch a cheeseburger come together"
      className={reduced ? "relative h-[100svh]" : "relative h-[500vh]"}
    >
      <div
        className={
          reduced
            ? "relative h-[100svh] overflow-hidden bg-[#0a0806]"
            : "sticky top-0 h-[100svh] overflow-hidden bg-[#0a0806]"
        }
      >
        <video
          ref={videoRef}
          src="/videos/scrub.mp4"
          poster="/images/hero-poster.jpg"
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          disablePictureInPicture
          aria-label="A cheeseburger assembling layer by layer, then lifted by hand and bitten into."
          className="absolute inset-0 h-full w-full object-cover [object-position:50%_42%]"
        />

        {/* atmosphere */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 32%, transparent 40%, rgba(11,10,8,.55) 100%), linear-gradient(to top, rgba(11,10,8,.92) 2%, rgba(11,10,8,.25) 30%, rgba(11,10,8,.15) 55%, rgba(11,10,8,.55) 100%)",
          }}
        />
        <div
          aria-hidden
          className="grain-layer animate-grain pointer-events-none absolute inset-0 z-[2] opacity-40 mix-blend-overlay"
        />

        {/* floating particles */}
        <div className="absolute inset-0 z-[2]">
          <HeroCanvas />
        </div>

        {/* overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[3] grid content-end px-gutter pb-[max(clamp(2.5rem,1rem+7vw,6rem),env(safe-area-inset-bottom))] pt-[max(6rem,env(safe-area-inset-top))]"
        >
          <div className="mx-auto w-full max-w-wrap">
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span aria-hidden className="h-px w-[clamp(1.5rem,6vw,3.5rem)] bg-ember opacity-70" />
              Est. by the reaction, not the recipe
            </p>
            <h1 className="font-display text-fluid-hero font-extrabold leading-[0.98] tracking-[-0.02em]">
              <AnimatedText text="Seared to" trigger="mount" className="block" />
              <AnimatedText text="obsession." trigger="mount" delay={0.15} className="block text-ember" />
            </h1>
            <p className="mt-[clamp(1rem,2.5vw,1.6rem)] max-w-[44ch] text-fluid-lead text-ink/90">
              {brand.intro} Scroll to watch it come together.
            </p>
            <div className="mt-[clamp(1.6rem,3.5vw,2.6rem)] flex flex-wrap gap-3">
              <Button as="a" href="#find">Order now</Button>
              <Button as="a" href="#story" variant="ghost">How it&apos;s made</Button>
            </div>
          </div>
        </div>

        {/* scrubber HUD */}
        {!reduced && (
          <div
            aria-hidden
            className="absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-gutter right-gutter z-[3] mx-auto flex max-w-wrap items-center gap-3 font-mono text-fluid-eyebrow tracking-[0.12em] text-muted"
          >
            <span ref={tcRef} className="text-ink">00:00</span>
            <span className="relative h-0.5 flex-1 overflow-hidden rounded bg-hair">
              <span ref={fillRef} className="absolute inset-y-0 left-0 w-0 bg-ember" />
            </span>
            <span className="whitespace-nowrap">The build</span>
          </div>
        )}
      </div>
    </section>
  );
}
