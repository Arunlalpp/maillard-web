"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useIsMobile } from "@/hooks/useIsMobile";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * WebGL scene wrapper. Renders the Canvas only while in view (frameloop toggles
 * to "never" off-screen to save GPU), clamps DPR, and drops effects on mobile.
 * Under reduced motion it renders a static poster gradient instead of WebGL.
 */
export function ThreeScene({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pointer = useMousePosition();
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(false);
  const [everVisible, setEverVisible] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setActive(e.isIntersecting);
        if (e.isIntersecting) setEverVisible(true);
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className={className}>
      {reduced || !everVisible || contextLost ? (
        <div
          aria-hidden
          className="h-full w-full bg-[radial-gradient(60%_60%_at_50%_40%,rgba(255,106,33,0.18),transparent_70%)]"
        />
      ) : (
        <Canvas
          frameloop={active ? "always" : "never"}
          dpr={[1, isMobile ? 1.4 : 2]}
          gl={{ antialias: !isMobile, powerPreference: "default", alpha: false }}
          camera={{ position: [0, 0, 6], fov: 42 }}
          shadows={!isMobile}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setContextLost(true);
            });
          }}
        >
          <Scene pointer={pointer} lowPower={isMobile} />
        </Canvas>
      )}
    </div>
  );
}
