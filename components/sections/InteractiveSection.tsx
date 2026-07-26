"use client";

import { useRef } from "react";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { BurgerBuild } from "@/components/BurgerBuild/BurgerBuild";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Section 4: a scroll-scrubbed photo sequence of the burger coming
 * together, frame by frame. Identical behaviour on touch and pointer
 * devices, since it's driven purely by scroll position.
 */
export function InteractiveSection() {
    const triggerRef = useRef<HTMLElement>(null);
    const reduced = usePrefersReducedMotion();

    return (
        <section
            id="interactive"
            ref={triggerRef}
            className={reduced ? "relative h-[100svh]" : "relative h-[400vh]"}
        >
            <div
                className={
                    reduced
                        ? "relative h-[100svh] overflow-hidden bg-base"
                        : "sticky top-0 h-[100svh] overflow-hidden bg-base"
                }
            >
                <BurgerBuild triggerRef={triggerRef} className="absolute inset-0" />

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-base/80 via-transparent to-base/30"
                />

                <div className="pointer-events-none absolute inset-0 z-[2] grid content-center px-gutter">
                    <div className="mx-auto w-full max-w-wrap text-center">
                        <p className="eyebrow mb-6">
                            <span className="mr-2 text-ember">03</span> Keep scrolling
                        </p>
                        <AnimatedText
                            as="h2"
                            text="Every layer, assembled in front of you."
                            split="words"
                            className="font-display text-fluid-h2 font-extrabold leading-[1.04]"
                        />
                        <p className="mx-auto mt-6 max-w-[40ch] text-fluid-body text-muted">
                            From suspended ingredients to the first bite — scroll to watch the build.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
