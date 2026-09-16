# Folder Structure — NewProj

Mirrors the IMS (`../IMS`) enterprise layout so pages, components, and styles stay portable between projects.

## Root

```
newproj/
├── DESIGN.md                 # Design system (this project's visual source of truth)
├── FOLDER_STRUCTURE.md       # This file
├── index.html
├── package.json
├── vite.config.js
├── public/                   # Static assets (favicon, logos)
└── src/
```

## Source tree (`src/`)

```
src/
├── main.jsx                  # React entry — imports theme + mounts App
├── App.jsx                   # Route definitions
├── index.css                 # Global reset + base typography
│
├── theme/
│   └── enterprise.css        # CSS custom properties (copied from IMS tokens)
│
├── layout/
│   ├── AppShell.jsx          # Sidebar + topbar shell (IMS pattern)
│   └── AppShell.css          # Shell styles (sidebar, topbar, mobile drawer)
│
├── components/
│   └── ui/                   # Shared primitives (Loader, Modal, etc.)
│
├── data/
│   └── navConfig.js          # Dummy sidebar navigation sections + items
│
├── pages/
│   ├── landing/
│   │   ├── LandingPage.jsx
│   │   └── LandingPage.css
│   │
│   ├── login/
│   │   ├── AdminLoginPage.jsx
│   │   ├── VendorLoginPage.jsx
│   │   ├── ConsumerLoginPage.jsx
│   │   ├── LoginShared.css     # Shared form field + button styles
│   │   ├── AdminLoginPage.css
│   │   ├── VendorLoginPage.css
│   │   └── ConsumerLoginPage.css
│   │
│   └── dashboard/
│       ├── DashboardPage.jsx   # Demo workspace with dummy stats
│       └── DashboardPage.css
│
├── constants/                # (future) route codes, RB mappings
├── context/                  # (future) UserContext, PageHeaderContext
├── hooks/                    # (future) shared hooks
└── utils/                    # (future) formatters, helpers
```

## IMS parity map

| IMS path | NewProj equivalent | Notes |
|----------|-------------------|-------|
| `src/theme/enterprise.css` | `src/theme/enterprise.css` | Identical token set |
| `src/layout/AppShell.jsx` | `src/layout/AppShell.jsx` | Simplified — dummy nav, no API/RBAC |
| `src/pages/login/` | `src/pages/login/` | Three role-specific login variants |
| `src/pages/dashboard/` | `src/pages/dashboard/` | Starter dashboard |
| `src/components/grid/` | *(future)* | Add when building list/grid pages |
| `src/components/forms/` | *(future)* | Add when building master forms |
| `src/api/` | *(future)* | Wire when backend is connected |
| `src/context/` | *(future)* | Auth + page header state |

## Routing convention

| Path | Page | Shell |
|------|------|-------|
| `/` | Landing | None (public) |
| `/login/admin` | Admin Login | None |
| `/login/vendor` | Vendor Login | None |
| `/login/consumer` | Consumer Login | None |
| `/dashboard` | Dashboard | AppShell |

Future workspace routes follow IMS pattern: `/admin/...`, module slug folders under `src/pages/<module-name>/`.

## Adding a new page (checklist)

1. Create folder under `src/pages/<module-name>/`
2. Add `<ModuleName>Page.jsx` + `<ModuleName>Page.css`
3. Register route in `App.jsx` inside AppShell layout
4. Add nav entry in `src/data/navConfig.js`
5. Use CSS variables from `theme/enterprise.css` — never hardcode one-off colors
6. Match topbar title pattern: 15px bold `--primary`

## Naming conventions

- **Pages:** PascalCase + `Page` suffix (`VendorLoginPage.jsx`)
- **Styles:** same basename as component (`VendorLoginPage.css`)
- **CSS classes:** BEM with project prefix — `ent-` for shell, `login-` for auth, `landing-` for marketing
- **Nav config:** `{ to, icon, label, end }` objects grouped in sections
