import { FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

const SOCIAL = [
    { icon: FiInstagram, label: "Instagram", href: "#" },
    { icon: FiTwitter, label: "X", href: "#" },
    { icon: FiYoutube, label: "YouTube", href: "#" },
];

export function Footer() {
    return (
        <footer className="border-t border-hair px-gutter py-[clamp(2.5rem,5vw,4rem)] text-muted">
            <div className="mx-auto max-w-wrap">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
                    <span className="font-display text-[clamp(1.4rem,1rem+2vw,2.2rem)] font-extrabold text-ink">
                        MAILLARD
                    </span>
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                        {["The sear", "The stack", "Locations", "Careers", "Contact"].map((l) => (
                            <li key={l}>
                                <a href="#" className="flex min-h-[44px] items-center transition-colors hover:text-ink">
                                    {l}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-2">
                        {SOCIAL.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="flex h-11 w-11 items-center justify-center rounded-full border border-hair transition-colors hover:border-ink hover:text-ink"
                            >
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
                <p className="mt-[clamp(1.5rem,4vw,2.5rem)] text-sm opacity-80">
                    © {new Date().getFullYear()} Maillard Provisions. Seared, never steamed.
                </p>
            </div>
        </footer>
    );
}
