# Golden Twilight — Design System
Reference for Michelle Renee Bloodworth's portfolio site. This is a snapshot of the tokens and components as built in `index.html` — if you change something in the site, update it here too so the two don't drift.

Pair this with **`design-system.html`** — a live, browsable version of everything below, with the light/dark toggle wired up so you can see each token and component in both modes.

---

## 1. Color

Two layers: **base palette** (the fixed Golden Twilight hues) and **semantic tokens** (what actually gets used in CSS, which remap per theme).

### Base palette
| Name | Hex | CSS variable |
|---|---|---|
| Ink Black | `#000814` | `--ink` |
| Prussian Blue | `#001D3D` | `--prussian` |
| Oxford Navy | `#003566` | `--oxford` |
| School Bus Yellow | `#FFC300` | `--bus-yellow` |
| Gold | `#FFD60A` | `--gold` |

These five never change between light/dark mode — they're the raw palette. Everything else (`--bg`, `--text`, `--accent`, etc.) is a *semantic* token built from them, and those are the ones components should reference.

### Semantic tokens — Light mode
| Variable | Value | Used for |
|---|---|---|
| `--bg` | `#FFFFFF` | Page background |
| `--bg-alt` | `#F3F7FC` | Alternating section stripes |
| `--bg-elevated` | `#FFFFFF` | Cards, inputs, popovers |
| `--text` | `--ink` | Body/heading text |
| `--text-muted` | `#3D4F63` | Secondary text |
| `--border` | `#DDE6F0` | Dividers, input borders |
| `--accent` | `--oxford` | Links, active nav, icon accents |
| `--accent-strong` | `--ink` | High-emphasis accent (theme toggle active state) |
| `--cta-bg` / `--cta-hover` | `--bus-yellow` / `--gold` | Primary buttons |
| `--cta-text` | `--ink` | Text on primary buttons |
| `--focus` | `--oxford` | Keyboard focus ring |
| `--card-border` | `#E3EAF3` | Card/chip borders |
| `--chip-bg` | `#EDF3FA` | Chip/pill backgrounds |

### Semantic tokens — Dark mode
| Variable | Value | Used for |
|---|---|---|
| `--bg` | `--ink` | Page background |
| `--bg-alt` | `#051327` | Alternating section stripes |
| `--bg-elevated` | `#051E37` | Cards, inputs, popovers |
| `--text` | `#F2F6FB` | Body/heading text |
| `--text-muted` | `#A9BED4` | Secondary text |
| `--border` | `#16324F` | Dividers, input borders |
| `--accent` | `--gold` | Links, active nav, icon accents |
| `--accent-strong` | `--bus-yellow` | High-emphasis accent |
| `--cta-bg` / `--cta-hover` | `--bus-yellow` / `--gold` | Primary buttons (same both modes) |
| `--cta-text` | `--ink` | Text on primary buttons |
| `--focus` | `--gold` | Keyboard focus ring |
| `--card-border` | `#163455` | Card/chip borders |
| `--chip-bg` | `#0A2540` | Chip/pill backgrounds |

**Rule of thumb:** never hard-code a hex value in a component. Reach for the semantic token (`var(--accent)`) so it repaints correctly in both themes automatically.

**The footer is the one deliberate exception** — it's always styled with the fixed dark colors (`--ink` background, `#D6E2EF` text, `--gold` accent) regardless of site theme, as a constant "night sky" bookend to the hero illustration.

**Contrast:** body text, links, and button text all meet WCAG AA (4.5:1) against their backgrounds in both themes. `--bus-yellow` / `--gold` are only ever used as backgrounds behind dark text, or as accents on top of very dark surfaces — never as text color on a light background, where the contrast would fail.

---

## 2. Typography

| Role | Font | Where it's set |
|---|---|---|
| Headings (h1–h4) | **Satoshi**, 700 weight | `--font-display` |
| Navigation links | **Satoshi**, 500 weight | `--font-display` |
| Body copy, labels, form fields | **Inter**, 400–600 weight | `--font-body` |

```css
--font-display: 'Satoshi', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

Loaded via:
```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,900,400&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Scale
| Element | Size | Notes |
|---|---|---|
| H1 (hero) | `clamp(2.4rem, 1.7rem + 3vw, 4.2rem)` | Satoshi 700 |
| H2 (section head) | `clamp(1.9rem, 1.4rem + 2vw, 2.75rem)` | Satoshi 700 |
| H3 (card title) | `1.25rem` | Satoshi 700 |
| Nav link | `0.95rem` | Satoshi 500, 700 on hover/active |
| Body | `1rem` / line-height `1.65` | Inter 400 |
| Eyebrow label | `0.78rem`, uppercase, `0.14em` tracking | Inter 600, colored `--accent` |

---

## 3. Spacing, Radius, Elevation, Motion

```css
--radius-sm: 6px;   /* inputs, small buttons, focus ring corners */
--radius-md: 12px;  /* cards, process steps */
--radius-lg: 20px;  /* hero illustration frame */
--container: 1180px;
--nav-h: 76px;

--shadow-soft: 0 12px 32px -16px rgba(0, 8, 20, 0.35);
--transition: 180ms ease; /* the default for color/background/border changes */
```

Section rhythm: `section { padding: 96px 0; }`, alternating background via `.section-alt { background: var(--bg-alt); }`.

**Motion & accessibility:** any decorative animation (hero sun rise/glow, smooth scroll) is wrapped in `@media (prefers-reduced-motion: no-preference)`, so people who've asked their OS for reduced motion get a static, non-animated page instead.

---

## 4. Global setup (drop this in first)

```css
:root {
  --font-display: 'Satoshi', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  --ink: #000814;
  --prussian: #001D3D;
  --oxford: #003566;
  --bus-yellow: #FFC300;
  --gold: #FFD60A;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --container: 1180px;
  --nav-h: 76px;

  --shadow-soft: 0 12px 32px -16px rgba(0, 8, 20, 0.35);
  --transition: 180ms ease;
}

:root[data-theme="light"] {
  --bg: #FFFFFF;
  --bg-alt: #F3F7FC;
  --bg-elevated: #FFFFFF;
  --text: var(--ink);
  --text-muted: #3D4F63;
  --border: #DDE6F0;
  --accent: var(--oxford);
  --accent-strong: var(--ink);
  --cta-bg: var(--bus-yellow);
  --cta-text: var(--ink);
  --cta-hover: var(--gold);
  --focus: var(--oxford);
  --card-border: #E3EAF3;
  --chip-bg: #EDF3FA;
}

:root[data-theme="dark"] {
  --bg: var(--ink);
  --bg-alt: #051327;
  --bg-elevated: #051E37;
  --text: #F2F6FB;
  --text-muted: #A9BED4;
  --border: #16324F;
  --accent: var(--gold);
  --accent-strong: var(--bus-yellow);
  --cta-bg: var(--bus-yellow);
  --cta-text: var(--ink);
  --cta-hover: var(--gold);
  --focus: var(--gold);
  --card-border: #163455;
  --chip-bg: #0A2540;
}
```

Theme is applied by setting `data-theme="light"` or `data-theme="dark"` on `<html>` — see §7 for the toggle script.

---

## 5. Components

### Buttons
Two variants: a solid, high-contrast **primary** for the main call to action, and a low-emphasis **ghost** for secondary actions.

```html
<a class="btn btn-primary" href="#work">See my work</a>
<a class="btn btn-ghost" href="#contact">Start a project</a>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.98rem;
  padding: 14px 26px;
  border-radius: 999px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform var(--transition), background var(--transition), border-color var(--transition), color var(--transition);
  text-decoration: none;
  white-space: nowrap;
}
.btn:hover { transform: translateY(-2px); }
.btn-primary { background: var(--cta-bg); color: var(--cta-text); }
.btn-primary:hover { background: var(--cta-hover); }
.btn-ghost { background: transparent; color: var(--text); border-color: var(--border); }
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
```
Use **one primary button per view at most** — it should be obvious which action matters most.

### Chips
Small pills for tags, skills, and metadata.
```html
<span class="chip">Custom AI Agents</span>
```
```css
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--chip-bg);
  color: var(--text);
  border: 1px solid var(--card-border);
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 0.88rem;
  font-weight: 500;
}
```

### Cards
Used for project work and service offerings. `.card-grid.cols-3` gives a 3-up grid on wide screens, dropping to 2-up then 1-up.
```html
<div class="card-grid cols-3">
  <article class="card">
    <span class="card-tag">Service Business</span>
    <h3>Card title</h3>
    <p>Supporting copy.</p>
    <div class="card-meta"><span class="chip">Tag</span></div>
    <a class="card-link" href="#">Read more →</a>
  </article>
</div>
```
```css
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform var(--transition), box-shadow var(--transition);
}
.card:hover { transform: translateY(-4px); box-shadow: var(--shadow-soft); }
.card-tag { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }
```

### Nav underline (the shared `.nav-item` component)
This is the one worth understanding well — it's used by **both** the desktop nav and the footer link columns, so the hover/focus/active behavior only has to be written once.

```css
.nav-item { position: relative; overflow: hidden; }

.nav-item::after {
  content: "";
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  height: 2px;
  /* Box stays full width (needed for the nav's slide math below);
     the visible bar is trimmed via --underline-inset instead of
     shrinking the box itself. */
  background: linear-gradient(var(--underline-color, var(--accent)) 0 0)
              no-repeat center / calc(100% - (var(--underline-inset, 0rem) * 2)) 100%;
  scale: 0 1;
  transform-origin: left;
  transition: scale 300ms var(--_scale-delay, 0ms), translate 500ms var(--_translate-delay, 0ms);
}
.nav-item:hover a,
.nav-item:focus-within a,
.nav-item.is-active a { color: var(--underline-color, var(--accent)); }
.nav-item:hover::after,
.nav-item:focus-within::after,
.nav-item.is-active::after { scale: 1 1; }
```

**Two CSS variables customize it per context:**
- `--underline-color` — defaults to `var(--accent)`. The footer sets it once to `var(--gold)` (fixed, since the footer never re-themes).
- `--underline-inset` — defaults to `0` (edge-to-edge). The desktop nav sets it to `1.1rem` so the bar sits tight to the text instead of spanning the link's full padded hit-area.

**Desktop nav wrapper** (adds spacing, typography, and the neighbor-to-neighbor slide):
```css
.primary-nav ul { display: flex; align-items: center; --_gap: 2.2rem; }
.primary-nav .nav-item { padding-inline: calc(var(--_gap) / 2); --underline-inset: 1.1rem; }
.primary-nav a { font-family: var(--font-display); font-weight: 500; font-size: 0.95rem; color: var(--text); text-decoration: none; padding-block: 8px; }
.primary-nav .nav-item:hover a, .primary-nav .nav-item.is-active a { font-weight: 700; }

/* Progressive enhancement — underline hands off to the neighbor being hovered.
   Needs true DOM siblings in a horizontal row, so it's nav-only. Feature-detected
   so it degrades safely (just no handoff) on browsers without :has(). */
@supports selector(:has(a)) {
  .primary-nav .nav-item:hover + .nav-item::after { translate: -100%; --_scale-delay: 300ms; --_translate-delay: 200ms; }
  .primary-nav .nav-item:has(+ .nav-item:hover)::after { translate: 100%; --_scale-delay: 300ms; --_translate-delay: 200ms; }
}
```

**Footer wrapper** (no slide, just the tight vertical list):
```css
.footer-col ul { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
.footer-col .nav-item { --underline-color: var(--gold); }
```
`align-items: flex-start` matters here — without it, a flex column's items stretch to the container's full width by default, which would stretch the underline the same way.

**Markup pattern** for anything using this component:
```html
<ul>
  <li class="nav-item"><a href="#about">About Me</a></li>
</ul>
```

### Timeline (Workshops/Events)
```css
.timeline { display: flex; flex-direction: column; border-left: 2px solid var(--border); margin-left: 8px; }
.timeline-item { position: relative; padding: 0 0 40px 32px; }
.timeline-item::before {
  content: "";
  position: absolute;
  left: -7px; top: 4px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: var(--bus-yellow);
  border: 3px solid var(--bg);
}
.status-pill { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; padding: 3px 10px; border-radius: 999px; background: var(--chip-bg); color: var(--text-muted); }
.status-pill.upcoming { background: var(--bus-yellow); color: var(--ink); }
```

### Process steps (numbered, for genuine sequences only)
```css
.process { display: grid; gap: 20px; grid-template-columns: 1fr; }
@media (min-width: 760px) { .process { grid-template-columns: repeat(3, 1fr); } }
.process-step { padding: 24px; border-radius: var(--radius-md); border: 1px dashed var(--border); }
.process-num { font-family: var(--font-display); font-weight: 900; font-size: 1.6rem; color: var(--accent); }
```
Only use numbered steps for things that are **actually sequential** (e.g. "Discover → Build → Hand off"). Don't number a list just to give it visual structure — that's what cards or chips are for.

### Form fields
```css
.form-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
.form-field label { font-weight: 600; font-size: 0.92rem; }
.form-field .req { color: var(--accent); } /* required-field asterisk */
.form-field input,
.form-field textarea {
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 13px 16px;
  border-radius: var(--radius-sm);
  border: 1.5px solid var(--border);
  background: var(--bg-elevated);
  color: var(--text);
}
```
Every input needs a real `<label for="...">` — never a placeholder standing in for one.

---

## 6. Layout scaffolding

```css
.container { max-width: var(--container); margin-inline: auto; padding-inline: 24px; }
section { padding: 96px 0; }
.section-alt { background: var(--bg-alt); }
.section-head { max-width: 640px; margin-bottom: 48px; }
```

Breakpoints in use: `700px` (2-up cards), `760px` (process steps go 3-up), `860px` (hero/about go 2-column), `900px` (contact form goes 2-column), `1040px` (cards go 3-up), **`1100px`** (desktop nav replaces the hamburger — deliberately higher than a typical tablet breakpoint so tablets, including landscape iPads, keep the hamburger).

---

## 7. Theme toggle

Three-way (Light / Dark / System), persisted to `localStorage`, resolved before first paint to avoid a flash of the wrong theme:

```html
<script>
  (function () {
    var stored = localStorage.getItem('theme-preference') || 'system';
    var resolved = stored === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : stored;
    document.documentElement.setAttribute('data-theme', resolved);
    document.documentElement.setAttribute('data-theme-preference', stored);
  })();
</script>
```
```js
function applyTheme(preference) {
  var resolved = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
  root.setAttribute('data-theme', resolved);
  root.setAttribute('data-theme-preference', preference);
  localStorage.setItem('theme-preference', preference);
}
```
Buttons use `aria-pressed` (not a custom class) to indicate the active choice — that gets it announced correctly by screen readers for free.

---

## 8. Accessibility checklist

- [x] Every interactive element has a visible `:focus-visible` ring using `var(--focus)` (oxford navy in light mode, gold in dark) — never `outline: none` without a replacement.
- [x] Color is never the only signal — hover/active states also change font-weight or add an icon shift, not just color.
- [x] All animation is gated behind `@media (prefers-reduced-motion: no-preference)`.
- [x] Skip-to-content link as the first focusable element on the page.
- [x] Semantic landmarks: `<header>`, `<nav aria-label="...">`, `<main>`, `<footer>`.
- [x] Form inputs paired with real `<label>` elements, required fields marked both visually and with the `required` attribute.
- [x] Text contrast checked against both theme backgrounds — see §1 for what's safe to pair with what.

---

## 9. File map

| File | Purpose |
|---|---|
| `index.html` | The live site — source of truth for all tokens/components |
| `design-system.md` | This doc |
| `design-system.html` | Live, browsable version of this doc with the theme toggle wired up |

If you add or change a component in `index.html`, update both of these to match.