# MAILLARD — cinematic burger landing page

An Awwwards-style, video-driven landing page for a premium burger brand. Next.js 15 (App Router) · TypeScript · Tailwind · React Three Fiber · GSAP · Framer Motion · Lenis · Zustand.

The storytelling core is your own MP4 footage: the hero is a **scroll-scrubbed** video (the burger assembles, then a hand lifts and bites it), driven frame-by-frame by scroll position.

## Run it

```bash
npm install
npm run dev       # http://localhost:3000
```

Production:

```bash
npm run build && npm start
npm run typecheck # tsc --noEmit
```

## Your videos

Three files live in `public/videos/`:

- `scrub.mp4` — the hero scrub source. It's a concatenation of your two clips (stacking → pickup), re-encoded to an **all-keyframe** file so seeking is instant. To regenerate from new footage:

  ```bash
  ffmpeg -i clip1.mp4 -i clip2.mp4 -filter_complex \
    "[0:v]scale=1280:-2,fps=30,setsar=1[a];[1:v]scale=1280:-2,fps=30,setsar=1[b];[a][b]concat=n=2:v=1:a=0[v]" \
    -map "[v]" -an -c:v libx264 -preset slow -crf 20 \
    -x264-params "keyint=1:min-keyint=1:scenecut=0" -movflags +faststart public/videos/scrub.mp4
  ```

- `stacking.mp4`, `pickup.mp4` — the originals, used by the `VideoSection` showcase.

## Architecture

```
app/                 layout (fonts, providers, landmarks) + page (8 sections)
components/
  providers/         SmoothScrollProvider (Lenis⇄GSAP), CustomCursor
  ui/                Button, GlassCard
  Navbar/ Hero/ VideoSection/ AnimatedText/ ThreeScene/
  FeatureCard/ StatCounter/ Footer/ Preloader/
  sections/          Story, Showcase, Interactive, Features, Stats, Gallery, Cta
hooks/               useScrollScrub, useMediaQuery, usePrefersReducedMotion,
                     useIsMobile, useMousePosition
lib/                 gsap (plugin registration), utils, content (copy/data)
store/               useUIStore (zustand)
```

### Key mechanisms

- **Scroll scrub** (`hooks/useScrollScrub.ts`) — a ScrollTrigger measures progress across the pinned hero; a `gsap.ticker` loop eases `video.currentTime` toward `progress × duration` (lerp 0.12) so seeking is smooth. A watchdog clears the seek latch if a `seeked` event is dropped.
- **Smooth scroll** — Lenis is driven by GSAP's ticker so Lenis and ScrollTrigger share one rAF loop. Disabled under reduced motion.
- **WebGL** — `ThreeScene` only runs `frameloop` while in view, clamps DPR, drops post-processing on mobile, and renders a static gradient under reduced motion.
- **VideoSection** — lazy source attach, in-view play / off-screen pause, fade-in, optional controls + replay.

## Accessibility & motion

- Semantic landmarks, skip link, focus-visible rings, ARIA labels, ≥44px tap targets.
- `prefers-reduced-motion` is respected end-to-end: no scrub (hero autoplays a quiet loop), no smooth scroll, no split-text/GSAP reveals, WebGL replaced by a static gradient.

## Tech choices (why these versions)

- **React 18.3 + R3F v8 + drei v9** rather than React 19 / R3F v9 — the mature, widely-deployed 3D stack, so `npm install` resolves cleanly. Next 15 fully supports React 18.3.
- **Tailwind v3.4** (config-based) for predictable theming via `tailwind.config.ts`.

## Performance notes

Built for a high Lighthouse score — dynamic imports for WebGL, lazy video, `frameloop` gating, DPR clamps, memoized geometry, reduced-motion fast paths, `next/font`, and `next/image` for the gallery. The actual score depends on your hosting, network, and final asset weights (the hero `scrub.mp4` is ~18 MB; consider a shorter clip or adaptive sources for mobile). Benchmark on your target environment.
