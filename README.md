# Heroes App

[![CI](https://github.com/CristianGarciaVillaraco/ibertech-heroes-test/actions/workflows/ci.yml/badge.svg)](https://github.com/CristianGarciaVillaraco/ibertech-heroes-test/actions/workflows/ci.yml)

A full-featured Angular 20 CRUD application for managing superheroes. Originally written in 2022 as a technical admission test, it has been fully rebuilt to showcase modern Angular patterns, clean architecture, and professional development practices.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 — standalone components, signals, zoneless |
| UI | Angular Material 20 (M3 theme) |
| Persistence | Dexie (IndexedDB) |
| Testing | Jasmine + Karma — 91 tests passing |
| Linting | ESLint + Prettier |
| CI/CD | GitHub Actions — build and test on every PR |

---

## Features

- **Hero list** with real-time filtering by name, alter ego, publisher and creator — filters synced with URL query params
- **Hero detail** with biography, info cards, power stats radar chart, alter egos, creators with Wikipedia popover, and first appearance
- **Hero form** with full CRUD — create and edit with sliders for 6 power stats and chip inputs for alter egos and creators
- **Power stats radar chart** — pure SVG, reactive via Angular signals
- **Breadcrumb navigation** — contextual and reactive
- **Scroll restoration** — returns to the exact scroll position when navigating back
- **Lazy-loaded routes** — heroes and about sections loaded on demand

---

## Architecture

```
src/app/
├── core/
│   ├── db/           # Dexie database setup
│   ├── models/       # IHero, IPowerStats, EPublisher, HeroModel
│   ├── services/     # InitDbService (app initializer)
│   └── mocks/        # Seed data for development
├── features/
│   ├── heroes/
│   │   ├── pages/         # HeroesListPage, HeroDetail, HeroForm
│   │   ├── components/    # HeroRadarChart, HeroStats, HeroInfoCards, HeroBiography...
│   │   ├── mappers/       # HeroMapper (domain ↔ view model)
│   │   ├── pipes/         # AscendingOrder, CleanText
│   │   └── services/      # HeroesService (Dexie CRUD)
│   ├── about/
│   └── init/
└── shared/
    └── ui/           # Breadcrumb, Card, Navbar
```

The app follows a layered architecture: **core** holds domain logic and data access, **features** are self-contained vertical slices, and **shared** contains truly reusable UI primitives.

---

## Key Technical Decisions

- **Signals over RxJS** for local component state — simpler reactivity model with less boilerplate
- **Dexie over localStorage** — structured queries, typed schema, and proper async API for IndexedDB
- **Pure SVG radar chart** — no charting library dependency, fully reactive via `computed()`
- **URL-synced filters** — users can share or bookmark filtered views, and navigation preserves filter state
- **Export default for pages** — enables tree-shaking-friendly lazy loading with `loadComponent`

---

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server — http://localhost:4200
npm start

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage

# Lint
npm run lint
```

---

## Routes

| Path | Component |
|---|---|
| `/` | Home |
| `/heroes/list` | Hero list with filters |
| `/heroes/:id` | Hero detail |
| `/heroes/new` | Create hero |
| `/about` | About |

---

## Legacy Version

The original 2022 Angular 13 implementation is preserved in the `legacy/2022-version` branch for comparison.
