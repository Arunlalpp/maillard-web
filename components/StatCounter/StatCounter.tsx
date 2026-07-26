"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface StatCounterProps {
    value: number;
    suffix?: string;
    label: string;
    duration?: number;
}

/** Counts up from 0 to `value` when scrolled into view. */
export function StatCounter({ value, suffix = "", label, duration = 1.6 }: StatCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-15%" });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        let raf = 0;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / (duration * 1000));
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, value, duration]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
        >
            <div className="font-display text-[clamp(2.4rem,1.4rem+4vw,4.5rem)] font-extrabold leading-none tracking-[-0.02em]">
                {display}
                <span className="text-ember">{suffix}</span>
            </div>
            <p className="mt-2 max-w-[26ch] text-base text-muted">{label}</p>
        </motion.div>
    );
}
