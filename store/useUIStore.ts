"use client";

import { create } from "zustand";

interface UIState {
  ready: boolean;          // preloader finished
  menuOpen: boolean;
  setReady: (v: boolean) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  ready: false,
  menuOpen: false,
  setReady: (v) => set({ ready: v }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
}));
