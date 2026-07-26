"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";
import { cn } from "@/lib/utils";

export interface VideoSectionProps {
    src: string;
    poster?: string;
    /** Accessible description of the clip. */
    label: string;
    className?: string;
    /** Rounded media frame. */
    rounded?: boolean;
    /** Autoplay muted when in view (loops). Off → plays once on first entry. */
    autoplayInView?: boolean;
    /** Show minimal custom controls overlay. */
    controls?: boolean;
    /** Fraction of the element visible before playback starts. */
    threshold?: number;
}

/**
  * A performant, reusable video block:
  * - lazy: source attached only once near the viewport (IntersectionObserver)
  * - plays when on screen, pauses when off screen (saves GPU/battery)
  * - smooth fade + scale in
  * - replay + play/pause controls (optional)
  * - respects reduced motion (no autoplay)
  */
export function VideoSection({
    src,
    poster,
    label,
    className,
    rounded = true,
    autoplayInView = true,
    controls = false,
    threshold = 0.4,
}: VideoSectionProps) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [inView, setInView] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [playing, setPlaying] = useState(false);
    const reduced = useReducedMotion();

    // Lazy: attach + control playback based on intersection.
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            { threshold: [0, threshold], rootMargin: "150px 0px" }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [threshold]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (inView) {
            if (!v.src) v.src = src; // lazy source attach
            if (autoplayInView && !reduced) {
                v.play().then(() => setPlaying(true)).catch(() => undefined);
            }
        } else {
            v.pause();
            setPlaying(false);
        }
    }, [inView, src, autoplayInView, reduced]);

    const toggle = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) {
            v.play().then(() => setPlaying(true)).catch(() => undefined);
        } else {
            v.pause();
            setPlaying(false);
        }
    }, []);

    const replay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.currentTime = 0;
        v.play().then(() => setPlaying(true)).catch(() => undefined);
    }, []);

    return (
        <motion.div
            ref={wrapRef}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
            className={cn(
                "relative overflow-hidden bg-panel",
                rounded && "rounded-xl2",
                className
            )}
        >
            <video
                ref={videoRef}
                poster={poster}
                muted
                loop={autoplayInView}
                playsInline
                preload="none"
                aria-label={label}
                onLoadedData={() => setLoaded(true)}
                className={cn(
                    "h-full w-full object-cover transition-opacity duration-700",
                    loaded ? "opacity-100" : "opacity-0"
                )}
            />

            {/* gradient scrim for overlaid captions */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-base/20"
            />

            {controls && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={toggle}
                        data-cursor="hover"
                        aria-label={playing ? "Pause video" : "Play video"}
                        className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink"
                    >
                        {playing ? <FiPause /> : <FiPlay />}
                    </button>
                    <button
                        type="button"
                        onClick={replay}
                        data-cursor="hover"
                        aria-label="Replay video"
                        className="glass flex h-11 w-11 items-center justify-center rounded-full text-ink"
                    >
                        <FiRotateCcw />
                    </button>
                </div>
            )}
        </motion.div>
    );
}
