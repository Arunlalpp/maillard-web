import { Preloader } from "@/components/Preloader/Preloader";
import { Hero } from "@/components/Hero/Hero";
import { StorySection } from "@/components/sections/StorySection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { InteractiveSection } from "@/components/sections/InteractiveSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <span id="top" aria-hidden />
      <Hero />
      <StorySection />
      <ShowcaseSection />
      <InteractiveSection />
      <FeaturesSection />
      <StatsSection />
      <GallerySection />
      <CtaSection />
      <Footer />
    </>
  );
}
