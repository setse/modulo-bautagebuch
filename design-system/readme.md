# Modulo Stratum — Design System

## Overview

**Modulo** is a German-language Architektur-Controlling (architecture firm management) software product. **Stratum** is its visual theme — a calm, professional dashboard application used by architecture practices to manage projects, HOAI fee calculations, time tracking, team workload, and financial KPIs.

**Sources provided:**
- `uploads/Modulo Stratum Standalone.html` — a fully self-contained, bundled HTML prototype of the Stratum app, containing all JSX source code, CSS tokens, design data, and fonts embedded as compressed assets.

The entire design system was reverse-engineered from this source.

---

## Product Context

Modulo Stratum is used by architecture firms to:
- **Track projects** through HOAI Leistungsphasen 1–9 (German fee structure for architects)
- **Calculate HOAI honoraria** (fees) per §34/§35 Honorartafel — with zones I–V, Mittelsatz/Mindestsatz/Höchstsatz
- **Log time** (Zeiterfassung) against projects and phases
- **Monitor KPIs** — utilization, billing status, Deckungsbeitrag (contribution margin), outstanding invoices
- **Analyze Soll/Ist** (budget vs. actual) per project and phase in a heatmap view

The single product surface is a 1280×800 desktop web app with a persistent sidebar and content area.

---

## CONTENT FUNDAMENTALS

**Language:** German (de-DE) throughout — all UI copy, labels, navigation, data, and errors. Numbers use German locale (`,` as decimal separator, `.` as thousands separator). Currency uses `€` via `Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })`.

**Tone:** Calm, professional, precise. This is accounting/controlling software for trained architects. The tone is direct and technical — no marketing language, no exclamation points, no emoji.

**Casing:**
- Navigation labels and headings: Title Case in German (Übersicht, Aktive Projekte)
- Eyebrow labels: ALL-CAPS with wide letter-spacing (`HONORAR-UMSATZ · YTD`)
- Status labels: lowercase (aktiv, abschluss, akquise)
- Technical terms: exact German legal/professional terminology (Leistungsphasen, Honorarzone, Deckungsbeitrag, Vergabe)

**Copy style examples:**
- Dashboard greeting: `Guten Morgen, Maria`
- Subtitle: `Geschäftsjahr 2026 · KW 43 · Mittwoch, 25.10.2026`
- Project ID format: `BÜR-118`, `WHB-204`, `SAN-302` (type abbreviation + number)
- Number format: `1.842.400 €`, `34,2 %`, `8,25 h`
- Separator between related items: ` · ` (middle dot with spaces)
- Alerts: factual and specific (`Stunden 70 % über Plan in LP4 — Bauantrag verzögert`)

**Emoji:** Never used.
**Exclamation marks:** Never used.
**Abbreviations:** Common — LP (Leistungsphase), NK (Nebenkosten), VJ (Vorjahr), YTD, KW (Kalenderwoche), Pp (Prozentpunkte).

---

## VISUAL FOUNDATIONS

### Colors
Warm cream palette — a deliberate departure from blue/grey SaaS convention. Evokes paper, architectural drawings, natural materials.

| Token | Value | Role |
|---|---|---|
| `--bg` | `#f0ece2` | Canvas / outer background |
| `--surface` | `#f7f4ec` | Card / panel background |
| `--surface-2` | `#ebe6d8` | Sidebar / recessed |
| `--surface-3` | `#ddd6c3` | Track / deep inset |
| `--border` | `#c8c0a8` | Default borders |
| `--border-strong` | `#a8a087` | Inputs, emphasis |
| `--text` | `#2a2a26` | Primary — near-black, warm undertone |
| `--text-dim` | `#6a665a` | Secondary |
| `--text-mute` | `#8e8979` | Tertiary / placeholder |
| `--accent` | `oklch(0.50 0.08 145)` | Sage green — ALL interactive elements |
| `--pos` | Same as accent | Positive / on-budget |
| `--neg` | `oklch(0.55 0.18 30)` | Negative / over-budget — warm terracotta |
| `--warn` | `oklch(0.65 0.13 70)` | Warning — amber |

### Typography
- **Primary:** Geist (sans-serif) — clean, modern, excellent screen rendering. Weights 300–700.
- **Data:** Geist Mono — all numeric data, project IDs, codes, eyebrow labels. `font-variant-numeric: tabular-nums` always applied.
- **No serifs.** No display fonts. Typography is functional.
- Heading sizes: 24–32px, weight 600, `letter-spacing: -0.5px` to `-1px`
- Body: 12–13px, weight 400
- Labels/eyebrows: 9–10px Geist Mono, `text-transform: uppercase`, `letter-spacing: 0.08em`, weight 500

### Spacing
4px grid. Three density presets applied via class on the root container:
- `.dens-compact` — 8px pad, 26px row height — dense data tables
- `.dens-regular` — 12px pad, 32px row height — standard chrome
- `.dens-comfy` — 16px pad, 38px row height — forms, wizards, dashboard

### Backgrounds
Flat warm cream — no gradients, no textures, no images. The warmth comes entirely from the color palette. Background colors are layered (bg → surface → surface-2 → surface-3) to create depth without shadows.

### Cards
- `border-radius: 6px`
- `border: 1px solid var(--border)`
- `box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 2px 10px rgba(74,68,55,0.06)` — warm-tinted, very subtle
- No colored card borders. No gradient card headers. Just a slight warm shadow.

### Animations / Transitions
- Very minimal. Only `transition: filter 0.12s, box-shadow 0.12s` on buttons.
- No page transitions, no slide-in animations, no bounce.
- Calm and professional — no decorative motion.

### Hover States
- Buttons: `filter: brightness(0.92)` on primary, `brightness(0.96)` on secondary
- Nav items / sidebar: background fill on hover (no border changes)
- No opacity fades. No scale transforms.

### Press / Active States
- Nav item active: `background: var(--surface)`, `box-shadow: var(--shadow-item)`, accent dot on right
- Sidebar active: left border accent (`border-left-color: var(--accent)`)

### Borders
Single-pixel, warm sand color. No thick borders. No colored borders as design elements (except the 4px left-border accent on risk severity indicators).

### Corner Radii
- 4px — small chips, progress bars
- 6px — cards (default)
- 8px — buttons, inputs, larger interactive elements
- 999px — pills/tags (fully rounded)

### Iconography
Custom inline SVG path icons. Stroke-based, `stroke-width: 1.6`, `stroke-linecap: round`. See ICONOGRAPHY section below.

### Imagery
None. No photos, no illustrations. The UI is entirely data-driven — charts, tables, progress bars, numeric KPIs.

### Color usage of charts
- Bars/progress: `var(--accent)` (sage) for current/normal
- Future/projected bars: `var(--surface-3)` at 40% opacity
- Positive divergence: `var(--pos)` (sage)
- Negative divergence: `var(--neg)` (terracotta)
- Plan lines: `var(--text-mute)` dashed

### Layout
- Fixed 1280×800 canvas for the app prototype
- 230px sidebar + remaining main area
- Main area uses CSS grid for 2-column or 3-column layouts
- `padding: 24px 28px` for main content area
- `gap: 16px` between major card blocks

---

## ICONOGRAPHY

**System:** Custom inline SVG paths — no icon font, no external library. All icons defined as SVG `<path>` elements with `stroke: currentColor`, `stroke-width: 1.6`, `stroke-linecap: round`, `stroke-linejoin: round`.

**Style:** Outline / stroke-based. 24×24 viewBox. Consistent 1.6px stroke. Never filled (except the special `dot` icon which is a filled circle).

**Usage in code:**
```jsx
<Icon name="clock" size={14} />
<Icon name="alert" size={16} stroke={2} />
```

**Available icons:**
`dashboard`, `project`, `clock`, `euro`, `invoice`, `team`, `reports`, `settings`, `search`, `chevron`, `chevdown`, `chevup`, `plus`, `play`, `pause`, `timer`, `folder`, `alert`, `download`, `filter`, `grid`, `list`, `arrowup`, `arrowdown`, `arrowright`, `arrowleft`, `check`, `x`, `drawing`, `calc`, `layers`, `dot`

**Brand mark:** `ModuloMark` — a 2×2 grid of rectangles: top-left filled, top-right outlined, bottom-left outlined, bottom-right filled at 40% opacity. This motif represents the "modulo" concept (grid/matrix). Used in the sidebar logo and favicons.

**Emoji:** Never used as icons.
**Unicode chars:** `·` (middle dot U+00B7) used as separator in labels. `↑` `↓` used in delta pills.

---

## FILE INDEX

```
styles.css                    — Global entry point (imports only)
tokens/
  colors.css                  — Color custom properties
  typography.css              — Font face + type scale tokens
  spacing.css                 — Spacing, density system, radius
  shadows.css                 — Shadow elevation system
  utilities.css               — Shared utility classes (.m-card, .m-eyebrow, etc.)
assets/
  logo/
    modulo-mark.svg           — Brand mark (currentColor)
    modulo-mark-sage.svg      — Brand mark (sage green)
    modulo-wordmark.svg       — Mark + "Modulo" wordmark
guidelines/
  colors-accent.card.html     — Accent + semantic color swatches
  colors-surfaces.card.html   — Layered surface scale
  colors-text.card.html       — Text color scale
  colors-borders.card.html    — Border tokens
  colors-team.card.html       — Team avatar palette
  type-scale.card.html        — Heading + body type scale
  type-mono.card.html         — Geist Mono data specimens
  type-utilities.card.html    — .m-eyebrow, .m-num, .m-dim, .m-mute
  spacing-scale.card.html     — 4px grid scale
  spacing-density.card.html   — Density system comparison
  spacing-radius.card.html    — Corner radii + shadow elevation
  brand-logo.card.html        — Logo & mark usage
  brand-icons.card.html       — Full icon set specimen
  brand-pills.card.html       — Pill/tag tone variants
components/
  core/
    Icon.jsx + .d.ts          — SVG icon atom + ModuloMark
    Button.jsx + .d.ts        — Button (primary/secondary/ghost/danger)
    Badge.jsx + .d.ts         — Badge / StatusBadge pill
    Card.jsx + .d.ts          — Card container + Eyebrow
    Avatar.jsx + .d.ts        — Avatar + AvatarGroup
    Input.jsx + .d.ts         — Input + SearchBar
    core.card.html            — Component showcase card
  data/
    DataViz.jsx + .d.ts       — Donut, SollIstBar, Sparkline, MonthBars, KpiCard
    data.card.html            — Data viz showcase card
  navigation/
    Sidebar.jsx + .d.ts       — Full sidebar with logo, nav, recent projects, user
    nav.card.html             — Navigation showcase card
ui_kits/
  stratum/
    index.html                — Full interactive 1280×800 app prototype
                                Screens: Dashboard · Projekte · Zeiterfassung
                                         HOAI-Rechner · Auswertungen
extracted/                    — Raw JSX source extracted from the bundle (reference)
```

---

## Namespace

Components are bundled under `window.ModuloStratumDesignSystem_879962`. In card HTML:
```js
const { Button, Badge, Card, Icon, Donut, Sidebar } = window.ModuloStratumDesignSystem_879962;
```
