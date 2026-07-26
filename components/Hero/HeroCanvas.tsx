"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Particles } from "@/components/ThreeScene/Particles";
import { useIsMobile } from "@/hooks/useIsMobile";

/** Subtle floating particles layered over the hero video. Decorative, non-interactive. */
export function HeroCanvas() {
  const isMobile = useIsMobile();
  const [contextLost, setContextLost] = useState(false);

  if (contextLost) return null;

  return (
    <Canvas
      aria-hidden
      className="pointer-events-none"
      dpr={[1, isMobile ? 1.3 : 1.8]}
      gl={{ antialias: false, alpha: true, powerPreference: "default" }}
      camera={{ position: [0, 0, 8], fov: 45 }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          setContextLost(true);
        });
      }}
    >
      <Particles count={isMobile ? 220 : 500} radius={11} color="#FF8A4C" />
    </Canvas>
  );
}
