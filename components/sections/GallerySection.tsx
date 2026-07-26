"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { gallery } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Section 7: animated masonry-ish grid with staggered reveal. */
export function GallerySection() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const items = gsap.utils.toArray<HTMLElement>(".gallery-item", root.current);
      gsap.from(items, {
        yPercent: 18,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section id="gallery" className="wrap py-section">
      <p className="eyebrow mb-6">
        <span className="mr-2 text-ember">05</span> The gallery
      </p>
      <AnimatedText
        as="h2"
        text="Every angle of the obsession."
        className="mb-[clamp(2rem,4vw,3.5rem)] block font-display text-fluid-h2 font-extrabold leading-[1.04]"
      />
      <div ref={root} className="grid grid-cols-2 gap-[clamp(0.6rem,1.5vw,1.1rem)] md:grid-cols-4">
        {gallery.map((g, i) => (
          <div
            key={i}
            className={cn(
              "gallery-item relative overflow-hidden rounded-xl2 bg-panel",
              i % 3 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
            )}
          >
            <Image
              src={g.src}
              alt={g.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
