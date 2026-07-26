"use client";

import { useEffect, useRef } from "react";

export interface Vec2 {
  x: number;
  y: number;
}

/**
 * Tracks pointer position as normalized [-1, 1] coordinates in a ref
 * (ref avoids re-renders — read it inside rAF / useFrame loops).
 */
export function useMousePosition() {
  const pos = useRef<Vec2>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pos.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pos;
}
