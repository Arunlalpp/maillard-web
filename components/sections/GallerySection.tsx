"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "@/lib/gsap";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/useIsMobile";
import { gallery, galleryMobile } from "@/lib/content";
import { clamp } from "@/lib/utils";

type Column =
    | { type: "pair"; items: [typeof gallery[number], typeof gallery[number]] }
    | { type: "large" | "portrait"; items: [typeof gallery[number]] };

/** Desktop: columns alternate a stacked pair of narrow frames with one large
 *  frame, consuming all 11 photos: 4 pairs (8 photos) + 3 large (3 photos). */
function desktopColumns(): Column[] {
    return [
        { type: "pair", items: [gallery[0], gallery[1]] },
        { type: "large", items: [gallery[2]] },
        { type: "pair", items: [gallery[3], gallery[4]] },
        { type: "large", items: [gallery[5]] },
        { type: "pair", items: [gallery[6], gallery[7]] },
        { type: "large", items: [gallery[8]] },
        { type: "pair", items: [gallery[9], gallery[10]] },
    ];
}

/** Mobile: the portrait crops don't stack — one photo per column. */
function mobileColumns(): Column[] {
    return galleryMobile.map((g) => ({ type: "portrait", items: [g] }));
}

/**
 * Section 7: a horizontal filmstrip instead of a grid. The whole page keeps
 * scrolling vertically, but that scroll drives the strip sideways — one
 * column at a time slides into frame, and whichever column is nearest
 * centre reads as "in focus" (full size/opacity; neighbours dim and shrink
 * slightly). Mobile uses portrait-cropped photos, one per column, instead
 * of the desktop pair/large mix. Under reduced motion it falls back to a
 * plain wrapping row.
 */
export function GallerySection() {
    const triggerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
    const reduced = usePrefersReducedMotion();
    const isMobile = useIsMobile();
    const columns = useMemo(() => (isMobile ? mobileColumns() : desktopColumns()), [isMobile]);
    const items = isMobile ? galleryMobile : gallery;

    useEffect(() => {
        if (reduced) return;
        const track = trackRef.current;
        const trg = triggerRef.current;
        if (!track || !trg) return;

        const st = ScrollTrigger.create({
            trigger: trg,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const maxX = Math.max(0, track.scrollWidth - window.innerWidth);
                const x = -clamp(self.progress) * maxX;
                track.style.transform = `translateX(${x}px)`;

                const viewportCenter = window.innerWidth / 2;
                columnRefs.current.forEach((col) => {
                    if (!col) return;
                    const colCenter = col.offsetLeft + x + col.offsetWidth / 2;
                    const dist = Math.abs(colCenter - viewportCenter) / viewportCenter;
                    const focus = clamp(1 - dist * 0.9);
                    col.style.opacity = String(0.4 + focus * 0.6);
                    col.style.transform = `scale(${0.94 + focus * 0.06})`;
                });
            },
        });

        return () => st.kill();
    }, [reduced, columns]);

    if (reduced) {
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
                <div className="flex flex-wrap gap-[clamp(0.6rem,1.5vw,1.1rem)]">
                    {items.map((g) => (
                        <div key={g.src} className="relative aspect-square w-[calc(50%-0.5rem)] overflow-hidden rounded-xl2 bg-panel sm:w-[calc(25%-0.75rem)]">
                            <Image src={g.src} alt={g.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section id="gallery" ref={triggerRef} className="relative h-[350vh]">
            <div className="sticky top-0 h-[100svh] overflow-hidden bg-base">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[48vh] bg-gradient-to-b from-base via-base/75 to-transparent"
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] px-gutter pt-[max(6.5rem,env(safe-area-inset-top))]">
                    <div className="max-w-[24ch]">
                        <p className="eyebrow mb-6">
                            <span className="mr-2 text-ember">05</span> The gallery
                        </p>
                        <AnimatedText
                            as="h2"
                            text="Every angle of the obsession."
                            className="block font-display text-fluid-h2 font-extrabold leading-[1.04]"
                        />
                    </div>
                </div>

                <div className="absolute inset-0 flex items-center overflow-hidden pl-gutter">
                    <div
                        ref={trackRef}
                        className="gallery-track flex items-center gap-[3vw] will-change-transform"
                        style={{ paddingLeft: isMobile ? "8vw" : "38vw" }}
                    >
                        {columns.map((col, i) => (
                            <div
                                key={col.items.map((it) => it.src).join("+")}
                                ref={(el) => {
                                    columnRefs.current[i] = el;
                                }}
                                className="gallery-col flex flex-shrink-0 flex-col gap-[2vh] will-change-transform"
                                style={
                                    col.type === "portrait"
                                        ? { height: "62vh", aspectRatio: "1536 / 2752" }
                                        : { height: "58vh", width: col.type === "large" ? "34vw" : "20vw" }
                                }
                            >
                                {col.items.map((it) => (
                                    <div key={it.src} className="relative flex-1 overflow-hidden rounded-xl2 bg-panel">
                                        <Image
                                            src={it.src}
                                            alt={it.alt}
                                            fill
                                            sizes={isMobile ? "70vw" : "40vw"}
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-[38vw] bg-gradient-to-r from-base via-base/80 to-transparent"
                />
            </div>
        </section>
    );
}
