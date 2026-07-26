"use client";

import { FeatureCard } from "@/components/FeatureCard/FeatureCard";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { features } from "@/lib/content";

/** Section 5: feature cards with hover animations. */
export function FeaturesSection() {
    return (
        <section id="features" className="wrap py-section">
            <p className="eyebrow mb-6">
                <span className="mr-2 text-ember">04</span> The stack
            </p>
            <AnimatedText
                as="h2"
                text="Everything earns its place in the bite."
                className="mb-[clamp(2rem,4vw,3.5rem)] block font-display text-fluid-h2 font-extrabold leading-[1.04]"
            />
            <div className="grid gap-[clamp(0.9rem,1.5vw,1.25rem)] sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f, i) => (
                    <FeatureCard key={f.title} {...f} index={i} delay={(i % 3) * 0.08} />
                ))}
            </div>
        </section>
    );
}
