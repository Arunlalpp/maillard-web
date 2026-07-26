import type { IconType } from "react-icons";
import { FiZap, FiThermometer, FiClock, FiAward, FiFeather, FiHeart } from "react-icons/fi";

export const brand = {
  name: "MAILLARD",
  tagline: "Seared to obsession.",
  intro:
    "A cheeseburger built the hard way — dry-aged smash patty, aged cheddar, a crust you can hear.",
};

export type Feature = { icon: IconType; title: string; body: string };

export const features: Feature[] = [
  { icon: FiThermometer, title: "260° smash", body: "Cast iron at full heat. One press, then hands off until the flip." },
  { icon: FiClock, title: "45-day age", body: "A chuck-and-brisket blend, dry-aged until the flavour concentrates." },
  { icon: FiZap, title: "Live crust", body: "The Maillard reaction — hundreds of aromatic compounds, all at once." },
  { icon: FiFeather, title: "Toasted brioche", body: "Buttered on the flat-top until the crown turns amber. Never soggy." },
  { icon: FiAward, title: "Aged cheddar", body: "Laid on hot so it slumps into every ridge. Melt is the whole point." },
  { icon: FiHeart, title: "Four-minute rule", body: "Best eaten within four minutes of the flip. The chemistry makes the rules." },
];

export type Stat = { value: number; suffix: string; label: string };

export const stats: Stat[] = [
  { value: 45, suffix: "d", label: "Dry-aged before it meets the iron" },
  { value: 260, suffix: "°", label: "Surface temperature at the smash" },
  { value: 90, suffix: "s", label: "From raw to plated" },
  { value: 12, suffix: "k", label: "Burgers seared each week" },
];

export const gallery = [
  { src: "/images/hero-poster.jpg", alt: "A cheeseburger mid-assembly, ingredients suspended" },
  { src: "/images/showcase-poster.jpg", alt: "A seared cheeseburger with a bite taken out" },
  { src: "/images/hero-poster.jpg", alt: "Fresh ingredients floating above the plate" },
  { src: "/images/showcase-poster.jpg", alt: "Molten cheddar over a charred patty" },
];
