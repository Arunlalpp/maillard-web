"use client";

import { VideoSection } from "@/components/VideoSection/VideoSection";
import { AnimatedText } from "@/components/AnimatedText/AnimatedText";
import { Button } from "@/components/ui/Button";

/** Section 3: split layout — video showcase + animated copy. */
export function ShowcaseSection() {
  return (
    <section id="showcase" className="wrap py-section">
      <div className="grid items-center gap-[clamp(2rem,5vw,4rem)] lg:grid-cols-2">
        <VideoSection
          src="/videos/pickup.mp4"
          poster="/images/showcase-poster.jpg"
          label="A hand lifts the finished cheeseburger and takes a bite."
          controls
          className="aspect-[4/5] w-full lg:aspect-[4/5]"
        />
        <div>
          <p className="eyebrow mb-6">
            <span className="mr-2 text-ember">02</span> The payoff
          </p>
          <AnimatedText
            as="h2"
            text="Built to be picked up while the crust is still loud."
            className="font-display text-fluid-h2 font-extrabold leading-[1.04]"
          />
          <p className="mt-6 max-w-[46ch] text-fluid-body text-muted">
            Toasted brioche that holds. Aged cheddar slumped into every ridge. A patty with
            edges you can hear. This is the four-minute window the whole kitchen is built around.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button as="a" href="#find">See the menu</Button>
            <Button as="a" href="#gallery" variant="ghost">The gallery</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
