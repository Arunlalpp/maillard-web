"use client";

import dynamic from "next/dynamic";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";

// WebGL is heavy → dynamic import, client-only, no SSR.
const ThreeScene = dynamic(
  () => import("@/components/ThreeScene/ThreeScene").then((m) => m.ThreeScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-base" /> }
);

/** Section 4: full-bleed interactive WebGL scene reacting to the mouse. */
export function InteractiveSection() {
  return (
    <section id="interactive" className="relative h-[100svh] overflow-hidden">
      <ThreeScene className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 grid content-center px-gutter">
        <div className="mx-auto w-full max-w-wrap text-center">
          <p className="eyebrow mb-6">
            <span className="mr-2 text-ember">03</span> Move your cursor
          </p>
          <AnimatedText
            as="h2"
            text="An edible still life, in motion."
            split="words"
            className="font-display text-fluid-h2 font-extrabold leading-[1.04]"
          />
          <p className="mx-auto mt-6 max-w-[40ch] text-fluid-body text-muted">
            Ingredients suspended in space. Drag your pointer to shift the light and the frame.
          </p>
        </div>
      </div>
    </section>
  );
}
