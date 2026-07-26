"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

const LINKS = [
    { label: "The sear", href: "#story" },
    { label: "The stack", href: "#features" },
    { label: "Gallery", href: "#gallery" },
    { label: "Find us", href: "#find" },
];

export function Navbar() {
    const [docked, setDocked] = useState(false);
    const menuOpen = useUIStore((s) => s.menuOpen);
    const toggleMenu = useUIStore((s) => s.toggleMenu);
    const closeMenu = useUIStore((s) => s.closeMenu);

    useEffect(() => {
        const onScroll = () => setDocked(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
                docked ? "glass border-b border-hair" : "border-b border-transparent"
            )}
            style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
        >
            <nav
                aria-label="Primary"
                className="mx-auto flex max-w-wrap items-center justify-between gap-4 px-gutter py-3"
            >
                <a
                    href="#top"
                    data-cursor="hover"
                    aria-label="Maillard, home"
                    className="flex min-h-[44px] items-center gap-2 font-display text-[clamp(1.15rem,1rem+0.8vw,1.5rem)] font-extrabold"
                >
                    <span aria-hidden className="h-2 w-2 rounded-full bg-ember shadow-[0_0_0_0.28rem_rgba(255,106,33,0.18)]" />
                    MAILLARD
                </a>

                <ul className="hidden items-center gap-[clamp(0.5rem,1.5vw,1.75rem)] md:flex">
                    {LINKS.map((l) => (
                        <li key={l.href}>
                            <a
                                href={l.href}
                                data-cursor="hover"
                                className="flex min-h-[44px] items-center px-1 text-[0.95rem] font-medium text-muted transition-colors hover:text-ink"
                            >
                                {l.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="hidden md:block">
                    <Button as="a" href="#find">Order</Button>
                </div>

                <button
                    type="button"
                    onClick={toggleMenu}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                    data-cursor="hover"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
                >
                    {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="glass mx-gutter mb-3 rounded-xl2 p-4 md:hidden"
                    >
                        <ul className="flex flex-col">
                            {LINKS.map((l) => (
                                <li key={l.href}>
                                    <a
                                        href={l.href}
                                        onClick={closeMenu}
                                        className="flex min-h-[48px] items-center text-lg text-ink"
                                    >
                                        {l.label}
                                    </a>
                                </li>
                            ))}
                            <li className="mt-2">
                                <Button as="a" href="#find" className="w-full">Order</Button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
