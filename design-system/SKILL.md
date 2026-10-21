---
name: modulo-stratum-design
description: Use this skill to generate well-branded interfaces and assets for Modulo Stratum — a German-language Architektur-Controlling (architecture firm management) software. Contains essential design guidelines, colors, typography, tokens, assets, and UI kit components for prototyping and production work.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key design rules to follow:
- All UI copy is in German (de-DE). Numbers use German locale. Currency: € via Intl.NumberFormat.
- Color palette: warm cream surfaces (#f0ece2 bg, #f7f4ec cards), sage green accent (oklch 0.50 0.08 145), warm text (#2a2a26).
- Fonts: Geist (sans-serif) for UI, Geist Mono for all numeric data and eyebrow labels.
- No emoji, no gradients, no textures, no photography. Data-driven UI only.
- Cards: 6px radius, 1px border (#c8c0a8), warm shadow. Buttons: 8px radius.
- Apply theme via class: `<div class="m-app theme-stratum dens-comfy">`.
- Use the density system: .dens-compact / .dens-regular / .dens-comfy on the root container.
- Icons: inline SVG stroke-based from the Icon component. Never use emoji as icons.
- Tone: calm, technical, professional German. No marketing language.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
