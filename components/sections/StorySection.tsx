"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LINES = [
    "The Maillard reaction is the browning that happens when protein meets a screaming-hot surface.",
    "Hundreds of new aromatic compounds, all at once. The difference between grey and seared.",
    "We smash each patty onto cast iron at full heat, press once, and leave it alone.",
    "No steaming. No shortcuts. Just a lacquered, craggy crust and a centre that stays honest.",
];

export function StorySection() {
    const root = useRef<HTMLDivElement>(null);
    const reduced = usePrefersReducedMotion();

    useGSAP(
        () => {
            if (reduced || !root.current) return;
            const lines = gsap.utils.toArray<HTMLElement>(".story-line", root.current);
            lines.forEach((line) => {
                gsap.fromTo(
                    line,
                    { opacity: 0.15 },
                    {
                        opacity: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: line,
                            start: "top 75%",
                            end: "top 40%",
                            scrub: true,
                        },
                    }
                );
            });
        },
        { scope: root, dependencies: [reduced] }
    );

    return (
        <section id="story" ref={root} className="wrap py-section">
            <div className="grid gap-[clamp(2rem,5vw,5rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                {/* sticky column */}
                <div className="lg:sticky lg:top-[18vh]">
                    <p className="eyebrow mb-6">
                        <span className="mr-2 text-ember">01</span> The reaction
                    </p>
                    <AnimatedText
                        as="h2"
                        text="Flavour is chemistry. We just refuse to rush it."
                        className="font-display text-fluid-h2 font-extrabold leading-[1.02]"
                    />
                </div>

                {/* scrolling copy */}
                <div className="flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
                    {LINES.map((line, i) => (
                        <p
                            key={i}
                            className="story-line max-w-[42ch] text-fluid-lead leading-snug text-ink"
                        >
                            {line}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
