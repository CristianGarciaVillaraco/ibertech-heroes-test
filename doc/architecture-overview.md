# Architecture Overview

This document provides an overview of the architecture and structure of the **Heroes App** project.

---

## 📂 Project Structure

```bash
heroes-app/
├── public/                     # Public assets served directly
│   ├── favicon.ico
│   ├── no-image.png
│   └── heroes/                 # Mock hero images
│
├── src/
│   ├── custom-theme.scss       # Angular Material theme
│   │
│   ├── app-config.ts           # Global config
│   ├── app.css                 # Global styles
│   ├── app.html                # Root template
│   ├── app.routes.ts           # Root routing
│   ├── app.spec.ts
│   ├── app.ts                  # Root component (bootstrap)
│   │
│   ├── config/                 # Environment config (Angular 20)
│   │   └── config.json
│   │
│   ├── core/                   # Global singletons used across app
│   │   ├── db/                 # Database config files
│   │   ├── interceptors/
│   │   ├── mocks/              # Mock backend JSON files
│   │   ├── services/           # Global service
|   |   ├── guards/
│   │   └── models/             # Globla interfaces
│   │
│   ├── features/               # Main application domains (modules)
│   │   ├── not-found/          # Example standalone feature page
│   │   │   └── simple-page.component.ts
│   │   │
│   │   ├── heroes/             # Example domain
│   │   │   ├── pages/          # Screens / route-level components
│   │   │   ├── components/     # UI components only used by this feature
│   │   │   ├── services/       # Services used only inside the heroes feature
│   │   │   └── complex-page.routes.ts  # Feature routing
│   │
│   ├── shared/                 # Reusable components & utilities
│   │   ├── ui/                 # Shared UI components
│   │   ├── pipes/              # Shared UI pipes
│   │   ├── enums/              # Shared Enums
│   │   └── directives/         # Shared UI directives
│
├── angular.json
├── package.json
└── tsconfig.json
```
