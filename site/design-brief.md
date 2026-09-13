# Design Brief — Akaka Favour Portfolio (v5 — MOCKUP-LOCKED)

**Subject (pinned):** Akaka Favour — freelance full-stack developer and designer, Port Harcourt, Nigeria. Design, code, copy, deploy — one person with an AI-accelerated pipeline.
**Audience:** creators, startups, businesses (hotels, real estate, clinics, law firms, schools, architecture studios) in Nigeria and abroad; most open a shared link on a phone.
**Single job of the page:** make the visitor think "this one person designs it, builds it, ships it — and it's already live" → start a conversation (form, WhatsApp, email, X).

## Source of truth — the Visual Bible

Three client-generated mockups are the EXACT visual target (read as images, aligned pixel-level):

1. `design-reference/mockup-home.png` — homepage: hero (ruler, ticker, masked headline, scribble, disc + slider, mono flanks, stack list) + the "My Signature" band + footer mono line row.
2. `design-reference/mockup-pipeline.png` — THE P✳PELINE: outlined display title, five cards with labels above, yellow dots at card corners, bottom dotted rail, signature row.
3. `design-reference/mockup-kayode-style.png` — style reference: fanned hero shots, "Featured Projects" row, taped portrait, black mega footer ("Let's Build Something Great" + "Get in Touch").

**⚠ Name artifact:** the mockups render "KAYODE"/"K" — a generation artifact. Real name **AKAKA FAVOUR**, monogram **AF**, footer **© 2026 Akaka Favour**. Code already uses the correct name; never transcribe mockup name text.

**Version history:** v1 light + WhatsApp-green (killed) → v2 rust (killed — resembled client work) → v3 dark Mission Control → v4 signals cut + reel + pill header → v4.5 Osmo-light → **v5 mockup-locked (this)**.

**Stack:** Next.js 15 (App Router) + React 19 + Tailwind CSS v4 + framer-motion + gsap (ScrollTrigger, reel) + **lenis** (buttery smooth scroll) + **rough** (available for hand-drawn strokes if the engineer prefers generating scribbles over PNGs). Clash Display + Satoshi self-hosted (Fontshare, free commercial); **Caveat** via next/font (handwritten fallback); JetBrains Mono via next/font.

## 1. Color tokens (confirmed against mockups)

| Token | Hex | Role |
|---|---|---|
| `bg` | `#F5F3EC` | Cream paper base (mockups read ≈ #F2EEE3–#F5F3EC; keep #F5F3EC) |
| `surface` | `#FFFFFF` | Cards, slider frame, browser chrome |
| `ink` / `text` | `#111214` | Text + dark surfaces (pill, terminal, footer) |
| `muted` | `#565B60` | Secondary text (~7:1 on paper) |
| `line` | `#E3E0D6` | Hairlines, dotted spine, connector rails |
| `accent` | `#F2B705` | Signal yellow — ticker strip, giant disc, scribbles, buttons, dots/markers, tape strips, underlines. Ink text on it ≈ 10:1 |
| `accent-hover` | `#D9A404` | Hover/pressed |
| `accent-tint` | `rgba(242,183,5,0.12)` | Chips, washes |
| `violet` | `#6C4CF1` | SHAPE-ONLY: headline/section asterisks, quarter-circles — never text or links |

**Banned:** green anywhere, rust, channel color-coding, live signals (badge/pulse/clock stay removed), gradients as decoration.

## 2. Type

Clash Display 500/600 (display, self-hosted) · Satoshi 400/500/700 (body, self-hosted) · Caveat (handwritten annotations, next/font) · JetBrains Mono (eyebrows/nav/ticker/terminal, next/font). Hero headline UPPERCASE poster-scale `clamp(2.75rem, 8vw, 6.5rem)`; pipeline title outlined uppercase up to 9rem.

## 3. Structure (v5 mockup-locked, one sentence per section)

1. **Header** — floating black ink pill, fixed top-center: white-circle AF monogram · WORK · SERVICES · PROCESS · ABOUT · CONTACT (active section = yellow underline, scroll-spy) · yellow "LET'S TALK ↗" → #contact. Drops in on load.
2. **Ticker** — solid yellow strip, ink mono: `// FREELANCE DEVELOPER // MODERN WEBSITES // FAST TURNAROUND //` repeating; static under reduced motion.
3. **Hero** — 01–04 ruler down the page's left edge (page-level, xl+); two masked lines "YOUR WEBSITE ✳ SHOULD" / "BRING YOU WORK." (violet ✳ inline; scribble-underline PNG under "BRING YOU WORK"); slider row flanked by the mono intro + "VIEW MY WORK →" (left) and the vertical stack list NEXT.JS/REACT/TYPESCRIPT/TAILWIND/NODE/SUPABASE/AWS (right edge, right-aligned); the before/after slider = ONE thin black frame holding the two staged crops with black BEFORE/AFTER tags at the BOTTOM corners and a black round ‹› handle on the divider, sitting over the giant yellow disc (parallax); "real projects. real results." + curved arrow annotation top-right; fanned overlapping real screenshots strip (parallax drift) below.
4. **Work (`#work`)** — "/ MY WORK" eyebrow; "Featured Projects" + "View All Projects ↗" → github.com/Akakaui; three case cards resting slightly rotated (straighten + lift on hover): browser-framed screenshot, title, mono category line, circular ↗ arrow.
5. **Case file 01 opened (`#vartex-story`)** — the Vartex deep-dive: scope + stack chips, facts row, PROBLEM/FIX/RESULT triptych with `[AKAKA: …]` placeholders.
6. **Signature band (`#about`; services column `#services`)** — 4 columns per mockup-home: intro (eyebrow "● MY SIGNATURE", H2 "I Turn Ideas Into Working Websites. ✳", EXACT paragraph, Caveat "Now:" line) · taped grayscale portrait (two yellow tape strips, crown doodle, "Building for what's next." annotation, rotation settles on scroll) · "LET'S WORK TOGETHER" + "I build websites, landing pages and web apps." (yellow underline) + 4 icon service rows · "Start a Project →" (ink, rounded-lg) + "OR JUST SAY HI" contact rows with mini icons; bottom mono row: "© 2026 Akaka Favour. All rights reserved." left + "BUILD / DESIGN / DEPLOY" right.
7. **Pipeline (`#process`) — the Pipeline Reel** — outlined "THE P✳PELINE" (violet ✳ as the I); mono intro + "From idea to live site." annotation; five cards with labels ABOVE ("01. BRIEF"…), yellow dots on top-left corners, illustrations = staged crops (`/assets/pipeline-*.png`), headings + EXACT copy + "0N / 05" pagination + arrow; yellow dotted rail under the cards with static dots + moving progress marker; GSAP pin + horizontal scrub + pointer drag on desktop; scroll-snap swipe + arrows on mobile/reduced motion; signature row "✳ BETTER PROCESS. BETTER WEBSITES." + "LET'S BUILD SOMETHING GREAT →".
8. **Contact (`#contact`)** — compact: minimal form (name / email / what do you need → `[FORM-ENDPOINT]`, mailto fallback) + "OR JUST SAY HI" channel row.
9. **Footer (black mega block)** — "✳ Let's Build Something Great" (yellow ✳) + "Got a project, idea, or just want to say hi? I'm always open to new opportunities and collaborations." + magnetic yellow "Get in Touch →" (#contact) + "BUILD / DESIGN / DEPLOY" + links row (Email · X · GitHub · WhatsApp) + "© 2026 Akaka Favour".

Page chrome: fixed violet quarter-circles at the top-right and bottom-left viewport corners (all mockups show them); faint dotted center spine; film grain overlay.

## 4. Motion spec (springs ~300/30, never linear; all off under reduced motion)

- **Load:** pill drops; headline lines reveal via line-mask (y 110% → 0, staggered); slider frame scales in; disc expands.
- **Scroll:** disc parallax; fanned hero cards drift at three different rates; portrait rotation settles (7° → 4°); line-mask reveals on headings (shared `Reveal`); Lenis smooth scroll wired into ScrollTrigger; reel pinned + scrubbed with tick ruler + rail marker tracking progress.
- **Hover:** magnetic buttons (≤8px, pointer:fine only); cursor dot scales on interactives; card lift + straighten; arrow nudges.
- **Pipeline:** GSAP pin + translate + pointer drag (drag scrubs the timeline); snap fallback for mobile/reduced motion with arrow buttons.

## 5. Asset sourcing (client directive: hand-drawn is SOURCED, not code-drawn)

Because binaries can't be fetched by the design agent, the engineer downloads from these scouted sources into `public/`:

- **Lottie (animated draw-on) — free tiers:** [LottieFiles hand-drawn arrow collection](https://lottiefiles.com/free-animations/hand-drawn-arrow), [free underline animations](https://lottiefiles.com/free-animations/underline), [free hand-drawn lines](https://lottiefiles.com/free-animations/hand-drawn-lines), e.g. [Shaker BenAshoor's free hand-drawn arrow](https://lottiefiles.com/free-animation/hand-drawn-arrow-trT0nSWuEr) — grab dotLottie JSON for the underline + arrows if animation is wanted.
- **Static SVG (CC0):** [SVGRepo hand-drawn arrow vectors](https://www.svgrepo.com/collection/hand-drawn-arrow-vectors/), [hand-drawn arrows collection](https://www.svgrepo.com/collection/hand-drawn-arrows/), confirmed-CC0 [Arrow With Scribble](https://www.svgviewer.dev/s/340468/arrow-with-scribble).
- **Grain PNG (opacity ≤0.05):** [Vecteezy film grain overlays](https://www.vecteezy.com/free-png/film-grain-overlays) (royalty-free), [Spoon Graphics 9 free grain textures](https://blog.spoongraphics.co.uk/freebies/9-free-high-resolution-grain-textures-in-jpg-png-format) (JPG+PNG), [Behance 8K film grain pack](https://www.behance.net/gallery/59398743/Film-Grain-Textures-8K-FREE-PACK) → stage as `public/assets/grain.png` and swap one line in `globals.css` (documented in-file); the zero-dep CSS feTurbulence grain remains the default meanwhile.
- **Handwriting font:** Caveat is wired via next/font (`--font-hand` utility) as the HTML fallback for annotation text.

## 6. Self-critique — final pass

The mockups validated the v4.5 skeleton almost 1:1 — the deviations I corrected were: tags moved to the slider's bottom corners, slider became one frame with two staged crops (Palmline CSS mocks retired), services folded into the signature band, footer merged with the closer, ruler numbers promoted to page chrome, and violet corners promoted to fixed viewport chrome. Watch items: (1) the staged crops must arrive or the slider/fan/illustrations render empty — every one degrades gracefully to whitespace, never a broken-image icon; (2) yellow now appears in ~10 small places — it still never touches body text on paper, and ink-on-yellow keeps every yellow surface AA; (3) Lenis + GSAP + framer-motion all listen to the same scroll — Lenis is wired into ScrollTrigger.update and framer's useScroll reads native scroll, so they compose; reduced-motion users get native scroll and static layouts. Quality floor unchanged: 360px, ink focus rings, one h1, semantic landmarks, plain-HTML form, no stock photography beyond the client's own portrait and project shots.
