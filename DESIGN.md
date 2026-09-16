# Design System: NewProj (Horizon Enterprise lineage)

Derived from the IMS base project. All new screens in this project must visually align with Horizon Enterprise — navy workspace chrome, cool-blue data surfaces, and compact enterprise density.

## 1. Visual Theme & Atmosphere

A **Daily App Balanced** enterprise interface (density 6/10) with **Predictable Symmetric** layouts for auth flows and **Offset Asymmetric** hero marketing on the landing page. Motion is restrained but purposeful — 150ms ease transitions, subtle hover lifts on cards and buttons.

The atmosphere is **clinical yet trustworthy**: like a well-lit operations floor — navy sidebar authority, pale blue-grey canvas, white working surfaces. Not consumer-playful; not dark-mode hacker aesthetic.

**Role differentiation (same palette, different posture):**
- **Admin** — full-bleed dark navy backdrop, centered glass card (command authority)
- **Vendor** — split-panel layout, warm orange accent stripe (supply-chain energy)
- **Consumer** — light airy panel, soft sky-blue gradient (approachable self-service)

## 2. Color Palette & Roles

All values mirror IMS `src/theme/enterprise.css`. Do not introduce new accent families.

| Token | Hex / Value | Role |
|-------|-------------|------|
| **Horizon Primary** | `#1e4a7a` | Page titles, primary buttons, active nav accent |
| **Primary Hover** | `#00335f` | Button hover, deep emphasis |
| **Primary Light** | `#d3e3ff` | Avatar backgrounds, active env badge |
| **Primary Lighter** | `#eef4fa` | Canvas tint, header gradient, hover wash |
| **Accent Blue** | `#0660a7` | Links, secondary CTAs, child-grid headers |
| **Secondary Blue** | `#226db4` | Gradient stops, readonly field labels |
| **Navy Dark** | `#0f2d4a` | Sidebar gradient start, login backdrop |
| **Navy Mid** | `#1a3a5c` | Sidebar gradient end, overlay tones |
| **Sky Highlight** | `#72b1fd` | Taglines, sidebar active border, focus hints |
| **Danger** | `#d93025` | Errors, logout hover, required markers |
| **Success** | `#089949` | Confirmation states |
| **Warning Orange** | `#e37400` | Vendor accent, alerts |
| **Orange Light** | `#fef3e8` | Vendor panel wash |
| **Magenta** | `#c2327a` | Reserved — badges only, sparingly |
| **Canvas BG** | `#e8eef4` | App shell background behind content |
| **Surface White** | `#ffffff` | Cards, topbar, form inputs |
| **Border** | `#d8dee6` | Structural 1px lines |
| **Border Dark** | `#c3c6d0` | Topbar divider, input borders |
| **Text Primary** | `#161c21` | Body copy, labels |
| **Text Secondary** | `#42474f` | Descriptions, metadata |
| **Text Muted** | `#737780` | Placeholders, footer, version |
| **Sidebar Gradient** | `linear-gradient(180deg, #0f2d4a 0%, #1a3a5c 100%)` | Left navigation |
| **Sidebar Text** | `rgba(255,255,255,0.72)` | Inactive nav links |
| **Sidebar Active Pill** | `linear-gradient(90deg, #2f6fdb 0%, #1e56b3 100%)` | Active route highlight |

**Shadows:** `--shadow-sm` through `--shadow-lg` — soft, tinted navy, never neon glow.

## 3. Typography Rules

- **Font family:** `"Inter", system-ui, sans-serif` — matches IMS exactly
- **Base size:** 13px (`--font-size-base`) — compact enterprise default
- **Small:** 12px — form labels, topbar metadata
- **Extra small:** 11px — version badge, footers
- **Section headers (sidebar):** 16px, weight 700, capitalize
- **Nav links:** 15px, weight 500
- **Page title (topbar):** 15px, weight 700, color `--primary`
- **Display (landing hero):** `clamp(2rem, 5vw, 3.25rem)`, weight 700, letter-spacing -0.02em
- **Line height:** 1.25 for nav; 1.55 for body paragraphs
- **Numbers in dashboards:** tabular-nums where applicable

## 4. Component Stylings

### Buttons
- **Primary:** `linear-gradient(135deg, #226db4 0%, #1e4a7a 100%)`, white text, 42px height, radius 10px (login) or 4px (workspace)
- **Hover:** translateY(-1px) + deeper shadow; **Active:** translateY(0)
- **Ghost:** transparent, border `--border`, text `--text-secondary`

### Cards
- Login card: `rgba(255,255,255,0.88)`, backdrop-filter blur 16px, radius 16px
- Workspace panels: white surface, 4px radius, `--shadow-md`
- Landing feature tiles: white, left border accent (role-colored)

### Inputs
- Label above field, 12px weight 600
- Control height 42px, radius 10px, border `--border`
- Focus: border `--primary`, ring `0 0 0 3px rgba(30,74,122,0.1)`

### Sidebar (IMS pattern)
- Width 220px expanded / 64px collapsed
- Accordion sections with chevron toggle
- Search bar: frosted `rgba(255,255,255,0.08)` inset
- Active link: blue gradient pill + 3px left sky border
- Section dividers: `rgba(255,255,255,0.1)` between modules

### Topbar
- Height 44px, white surface, bottom border `--border-dark`
- Title in `--primary`, profile avatar circle with `--primary-light` fill

## 5. Layout Principles

- **App shell:** flex row — fixed sidebar + column (topbar + scrollable content)
- **Content max-width:** landing sections cap at 1200px centered
- **Login pages:** full viewport (`100dvh`), no page scroll — internal field scroll only on short viewports
- **Grid spacing:** 8px base unit; section gaps 20–32px
- **Border radius:** 4px workspace default; 10–16px for auth/marketing cards
- **Mobile (<768px):** sidebar becomes off-canvas drawer; landing stacks single column

## 6. Motion & Interaction

- Transition: `150ms ease` (matches `--transition`)
- Login submit hover: 200ms ease lift
- Sidebar accordion: instant open/close, no animation delay
- Landing hero: subtle CSS float on decorative shapes (transform/opacity only)
- Reduced motion: disable video backgrounds and hover transforms

## 7. Anti-Patterns (Banned)

- Do not use colors outside the IMS palette above
- No purple/neon gradients or outer glow shadows
- No pure black `#000000` — use `#161c21` or `#0f2d4a`
- No generic 3-column equal feature cards on landing — use staggered 2-column or role cards
- No emojis in UI chrome
- No fabricated uptime/performance statistics
- No floating form labels — label-above-input only
- Do not change sidebar to light theme — navy gradient is mandatory for workspace pages

## 8. Page Templates

| Page | Layout | Accent |
|------|--------|--------|
| Landing | Asymmetric hero + role portal cards | Primary navy |
| Admin Login | Full-bleed navy + centered glass card | Primary gradient button |
| Vendor Login | 50/50 split — orange brand panel + form | `#e37400` stripe |
| Consumer Login | Light gradient canvas + floating card | `#72b1fd` highlights |
| Dashboard | AppShell sidebar + stat cards | Primary + readonly blue tints |
