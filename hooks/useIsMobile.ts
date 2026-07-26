"use client";

import { useMediaQuery } from "./useMediaQuery";

/** Coarse pointer or small viewport → treat as mobile for GPU budgeting. */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 768px), (pointer: coarse)");
}
