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
    { src: "/images/interactive/interactive-01.jpeg", alt: "Ingredients suspended above the plate before assembly." },
    { src: "/images/interactive/interactive-02.jpeg", alt: "The stack floating mid-air, patty and cheese still melting." },
    { src: "/images/interactive/interactive-03.jpeg", alt: "Every layer visible at once, from bun to bun." },
    { src: "/images/interactive/interactive-04.jpeg", alt: "A side-lit view of the suspended cheeseburger." },
    { src: "/images/interactive/interactive-05.jpeg", alt: "Steam rising off the patty mid-assembly." },
    { src: "/images/interactive/interactive-06.jpeg", alt: "The full build, onion rings catching the light." },
    { src: "/images/interactive/interactive-07.jpeg", alt: "The finished cheeseburger, plated with fries." },
    { src: "/images/interactive/interactive-08.jpeg", alt: "A close side profile of the stacked burger." },
    { src: "/images/interactive/interactive-09.jpeg", alt: "A hand lifting the burger for the first bite." },
    { src: "/images/interactive/interactive-10.jpeg", alt: "Cheese pulling from the burger mid-bite." },
    { src: "/images/interactive/interactive-11.jpeg", alt: "A close-up bite, melted cheddar stretching." },
];

/** Portrait crops of the same build, for the mobile gallery filmstrip. */
export const galleryMobile = [
    { src: "/images/interactive-mobile/interactive-mobile-01.jpeg", alt: "Ingredients suspended above the plate before assembly." },
    { src: "/images/interactive-mobile/interactive-mobile-02.jpeg", alt: "The stack floating mid-air, steam rising off the patty." },
    { src: "/images/interactive-mobile/interactive-mobile-04.jpeg", alt: "The finished cheeseburger plated with fries and a beer." },
    { src: "/images/interactive-mobile/interactive-mobile-05.jpeg", alt: "A skewered burger, steam still rising off the crust." },
    { src: "/images/interactive-mobile/interactive-mobile-06.jpeg", alt: "The full stack plated, onion rings on top." },
    { src: "/images/interactive-mobile/interactive-mobile-07.jpeg", alt: "A close side profile of the burger and fries." },
    { src: "/images/interactive-mobile/interactive-mobile-08.jpeg", alt: "The plated burger against a rustic wood table." },
    { src: "/images/interactive-mobile/interactive-mobile-09.jpeg", alt: "A hand lifting the burger for the first bite." },
    { src: "/images/interactive-mobile/interactive-mobile-10.jpeg", alt: "Cheese pulling from the burger mid-bite." },
    { src: "/images/interactive-mobile/interactive-mobile-11.jpeg", alt: "A close-up bite, melted cheddar stretching." },
    { src: "/images/interactive-mobile/interactive-mobile-12.jpeg", alt: "Another angle on the bite, crust and crumb visible." },
    { src: "/images/interactive-mobile/interactive-mobile-13.jpeg", alt: "The last bite, cheese still stretching to the plate." },
];
