"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    as?: "button" | "a";
    href?: string;
}

/** Premium button — min 44px tap target, focus-visible ring, motion hover. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", className, children, href, as = "button", ...props }, ref) => {
        const classes = cn(
            "inline-flex min-h-[48px] min-w-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold leading-none transition-colors duration-300",
            variant === "primary" &&
                "bg-ember text-ember-ink shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] hover:bg-ember-soft",
            variant === "ghost" &&
                "border border-hair text-ink hover:border-ink hover:bg-white/5",
            className
        );

        const content = (
            <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="contents"
            >
                {children}
            </motion.span>
        );

        if (as === "a" && href) {
            return (
                <a href={href} data-cursor="hover" className={classes}>
                    {content}
                </a>
            );
        }

        return (
            <button ref={ref} data-cursor="hover" className={classes} {...props}>
                {content}
            </button>
        );
    }
);
Button.displayName = "Button";
