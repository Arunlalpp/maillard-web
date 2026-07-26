"use client";

import { createElement, useRef, type ElementType } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Split granularity for the reveal. */
  split?: "words" | "chars";
  /** Delay before the reveal starts (s). */
  delay?: number;
  /** Trigger on scroll into view (default) or immediately on mount. */
  trigger?: "scroll" | "mount";
}

/**
 * Lightweight split-text reveal. Splits into spans in JSX (no paid plugin),
 * then staggers a clip/translate reveal with GSAP. Respects reduced motion.
 */
export function AnimatedText({
  text,
  as: Tag = "span",
  className,
  split = "words",
  delay = 0,
  trigger = "scroll",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const tokens =
    split === "chars" ? Array.from(text) : text.split(/(\s+)/);

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const parts = ref.current.querySelectorAll<HTMLElement>("[data-piece]");
      gsap.set(parts, { yPercent: 120, opacity: 0 });
      gsap.to(parts, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.04,
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? { trigger: ref.current, start: "top 85%", once: true }
            : undefined,
      });
    },
    { scope: ref, dependencies: [reduced] }
  );

  return createElement(
    Tag,
    { ref, className: cn(className), "aria-label": text },
    tokens.map((tok, i) =>
      /^\s+$/.test(tok) ? (
        <span key={i}> </span>
      ) : (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span data-piece className="inline-block will-change-transform">
            {tok}
          </span>
        </span>
      )
    )
  );
}
