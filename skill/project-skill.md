# 🧠 Secure Proctoring System — Project Skill

> **Self-improving knowledge file.** Update this document whenever the codebase changes significantly — new modules, architectural decisions, conventions, gotchas, or resolved bugs.

---

## Project Identity

| Key | Value |
|---|---|
| **Name** | Secure Online Examination & Proctoring System |
| **Repo root** | `secure-proctoring-system/` |
| **Type** | Full-stack web application |
| **Status** | Early development — home page scaffolded |
| **Last updated** | 2026-06-22 |

---

## Architecture Summary

```
React Frontend  ──►  FastAPI Backend  ──►  PostgreSQL
                           │
                     ┌─────┴──────┐
                     AI Module  WebSocket
                    (OpenCV)    Server
```

- **Frontend:** React 18 + Vite 5 + TailwindCSS 3 — lives in `frontend/`
- **Backend:** Python 3.11 + FastAPI + SQLAlchemy — will live in `backend/`
- **Database:** PostgreSQL 15
- **AI/CV:** OpenCV, face-recognition, MediaPipe — will live in `backend/app/ai/`
- **Real-time:** WebSockets via FastAPI built-in support

---

## Frontend Details

### Tech & Tooling

| Tool | Version | Purpose |
|---|---|---|
| React | ^18.x | UI framework |
| Vite | ^5.x | Dev server & bundler |
| TailwindCSS | ^3.x | Utility-first CSS (flat dark theme) |
| React Router | ^6.x | Client-side routing (installed, not yet wired) |

### Design Philosophy

- **Flat design** — no shadows, no gradients, solid colors only
- **Dark theme primary** — surface grays (#0d0f12 → #2a2f3a), single blue accent (#3b82f6)
- **Inter font** — clean, modern sans-serif via Google Fonts
- **Minimal animations** — only hover transitions and a single pulse indicator

### Color Tokens (tailwind.config.js)

| Token | Hex | Usage |
|---|---|---|
| `surface-900` | #0d0f12 | Page background |
| `surface-800` | #13161b | Section backgrounds |
| `surface-700` | #1a1d24 | Cards, elevated surfaces |
| `surface-600` | #22262f | Borders, dividers |
| `surface-500` | #2a2f3a | Hover states |
| `accent` | #3b82f6 | Primary action color |
| `accent-light` | #60a5fa | Light accent variant |
| `accent-dim` | #2563eb | Hover/pressed accent |
| `text-primary` | #e5e7eb | Main text |
| `text-secondary` | #9ca3af | Supporting text |
| `muted` | #6b7280 | Disabled/tertiary text |

### Directory Structure

```
frontend/
├── public/
├── src/
│   ├── assets/              # logo.png
│   ├── components/
│   │   ├── common/          # Navbar, Footer, FeatureCard, RoleCard
│   │   ├── exam/            # (empty — future)
│   │   └── proctor/         # (empty — future)
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   ├── student/         # (empty — future)
│   │   ├── admin/           # (empty — future)
│   │   └── proctor/         # (empty — future)
│   ├── hooks/               # (empty — future)
│   ├── store/               # (empty — future)
│   ├── services/            # (empty — future)
│   ├── utils/               # (empty — future)
│   ├── App.jsx              # Root component (renders Home)
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + Tailwind directives
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

### Component Inventory

| Component | File | Props | Notes |
|---|---|---|---|
| `Navbar` | `components/common/Navbar.jsx` | — | Fixed top, mobile hamburger |
| `Footer` | `components/common/Footer.jsx` | — | Minimal, centered |
| `FeatureCard` | `components/common/FeatureCard.jsx` | `icon, title, description` | Flat card with icon box |
| `RoleCard` | `components/common/RoleCard.jsx` | `icon, role, points[]` | Emoji + bullet list |

### Home Page Sections

1. **Hero** — status badge, h1, subtitle, 2 CTA buttons
2. **Features** — 3×2 grid of FeatureCards (6 features)
3. **Roles** — 3-column grid (Student, Admin, Proctor)
4. **About/CTA** — closing statement + action button
5. **Footer** — copyright + placeholder links

---

## Backend Details

> ⚠️ **Not yet implemented.** The architecture specifies FastAPI + SQLAlchemy. See ARCHITECTURE.md for the full plan.

### Planned Structure

```
backend/
├── app/
│   ├── api/routes/          # auth, exams, questions, results, monitoring, analytics
│   ├── api/websockets/      # exam_ws, proctor_ws
│   ├── ai/                  # face_recognition, head_movement, multi_face, grading
│   ├── core/                # config, security, database
│   ├── models/              # SQLAlchemy ORM
│   ├── schemas/             # Pydantic schemas
│   ├── crud/                # DB operations
│   └── main.py              # FastAPI entry
├── alembic/
├── tests/
├── requirements.txt
└── .env.example
```

---

## User Roles & Routes

| Role | Key Routes |
|---|---|
| **Student** | `/login`, `/register/face`, `/exams`, `/exam/:id`, `/results/:id` |
| **Admin** | `/admin`, `/admin/exams/new`, `/admin/questions`, `/admin/students`, `/admin/analytics` |
| **Proctor** | `/proctor`, `/proctor/monitor/:examId`, `/proctor/alerts`, `/proctor/reports/:examId` |

---

## Conventions

- **Commit style:** `feat:`, `fix:`, `docs:`, `chore:`, `refactor:` prefixes
- **Branching:** Git Flow — `main`, `develop`, `feature/*`, `fix/*`, `hotfix/*`
- **API prefix:** `/api/v1/`
- **Auth:** JWT Bearer tokens
- **Components:** PascalCase filenames, one component per file
- **Tailwind usage:** Extend config for design tokens, use utility classes in JSX

---

## Known Gotchas

1. The logo file has a typo in the original filename ("Proctorying" instead of "Proctoring") — copied to `src/assets/logo.png` with a clean name.
2. React Router is installed but not wired with `<BrowserRouter>` yet — App.jsx directly renders `<Home />`. Add routing when the second page is built.
3. TailwindCSS v3 is used (not v4) as specified in ARCHITECTURE.md.

---

## Change Log

| Date | Change |
|---|---|
| 2026-06-22 | Initial scaffolding — Vite + React + TailwindCSS. Home page with Navbar, Footer, FeatureCard, RoleCard components. Flat dark theme. Root .gitignore created. |

---

> 💡 **Self-improvement rule:** After any significant change (new page, new component, backend setup, convention change, bug fix), append to the Change Log and update relevant sections above. Keep this file as the single source of truth for onboarding and AI-assisted development.
