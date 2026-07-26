"use client";

import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { Button } from "@/components/ui/Button";

/** Section 8: final CTA band. */
export function CtaSection() {
  return (
    <section id="find" className="wrap py-section">
      <div className="glass grid gap-[clamp(1.5rem,4vw,2.5rem)] rounded-xl2 p-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
        <div>
          <p className="eyebrow mb-6">
            <span className="mr-2 text-ember">06</span> Find your Maillard
          </p>
          <AnimatedText
            as="h2"
            text="Come get it while the crust is loud."
            className="block font-display text-fluid-h2 font-extrabold leading-[1.04]"
          />
          <p className="mt-4 max-w-[46ch] text-fluid-body text-muted">
            Order ahead for pickup, or find the nearest counter. Best within four minutes of the
            flip — we don&apos;t make the rules, the chemistry does.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 lg:justify-end">
          <Button as="a" href="#top">Order for pickup</Button>
          <Button as="a" href="#top" variant="ghost">Find a location</Button>
        </div>
      </div>
    </section>
  );
}
