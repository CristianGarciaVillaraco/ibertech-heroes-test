# ibertech-heroes-test — Contexto para Claude Code

## Descripción del proyecto

App Angular 20 de gestión de superhéroes (Marvel / DC y otros publishers). Proyecto de prueba técnica.
CRUD completo de héroes con filtros, detalle, formulario de creación/edición.
Empezó como Angular 13 y fue migrado a Angular 20 con standalone components, signals y zoneless change detection.

## Stack

- **Angular 20** — standalone components, signals, `provideZonelessChangeDetection()`
- **Angular Material 20** — UI components (Mat*)
- **Dexie 4** — IndexedDB client (base de datos local del navegador)
- **RxJS 7** — streams en servicios
- **UUID 13** — generación de IDs
- **Jasmine + Karma** — 91 unit tests
- **Playwright** — 10 e2e tests
- **ESLint + Prettier** — linting y formateo

## Comandos clave

```bash
npm start               # ng serve (http://localhost:4200)
npm test                # ng test (Karma + Jasmine, watch mode)
npm run test:ci         # unit tests headless para CI
npm run test:coverage   # unit tests + reporte de cobertura
npm run e2e             # e2e tests con Playwright (arranca ng serve solo)
npm run e2e:report      # abrir reporte HTML de Playwright
npm run build           # ng build
npm run lint            # ESLint
npm run format          # Prettier
```

## Estructura de carpetas

```
src/app/
├── core/
│   ├── db/            # HeroesDB (Dexie) — heroes.db.ts
│   ├── mocks/         # heroes.mock.ts — datos iniciales (seed)
│   ├── models/
│   │   ├── class/     # HeroModel (implementa IHero)
│   │   ├── enums/     # EPublisher
│   │   └── interfaces/ # IHero, IHeroFilters, IPowerStats, IFileManager
│   └── services/
│       └── init-db/   # InitDbService — limpia y repuebla la DB en app init
│
├── features/
│   ├── heroes/
│   │   ├── components/  # hero-biography, hero-comic-section, hero-info-cards,
│   │   │                #  hero-radar-chart, hero-stats
│   │   ├── mappers/     # HeroMapper: IHero → ICard
│   │   ├── pages/       # heroes-list, hero-detail, hero-form
│   │   ├── pipes/       # ascending-order, clean-text
│   │   ├── services/    # HeroesService
│   │   └── heroes.routes.ts
│   ├── about/
│   └── init/            # Página de inicio (/)
│
├── shared/
│   └── ui/       # breadcrumb, card, navbar
│
├── app.routes.ts
├── app.config.ts   # provideZonelessChangeDetection, provideAppInitializer
└── app.ts

e2e/
├── heroes-list.spec.ts   # 7 tests: filtros, URL sync, navegación
└── hero-crud.spec.ts     # 3 tests: crear, editar, eliminar

playwright.config.ts      # webServer: arranca ng serve automáticamente
```

## Rutas de la app

| Ruta | Componente |
|------|-----------|
| `/` | InitComponent |
| `/heroes/list` | HeroesListPageComponent |
| `/heroes/new` | HeroFormComponent (crear) |
| `/heroes/edit/:id` | HeroFormComponent (editar) |
| `/heroes/:id` | HeroDetailComponent |
| `/about` | AboutComponent |

## Modelo de datos principal

```typescript
interface IHero {
  id: string;          // formato: "dc-batman", "marvel-spider-man"
  key: string;
  superhero: string;
  publisher: EPublisher;
  alterEgo: string;
  firstAppearance: string;
  characters: string[];   // alter egos
  originators: string[];  // creadores — REQUERIDO para guardar en el form
  description: string;
  fileManager?: IFileManager; // { imgBg, imgHero?, imgFA }
  powerStats?: IPowerStats;   // 6 stats de 0-100
}

enum EPublisher {
  DC = 'DC Comics',
  Marvel = 'Marvel Comics',
  // + IMAGE, DARK_HORSE, VALIANT, IDW, ARCHIE
}
```

## Base de datos (Dexie)

- `HeroesDB` extiende `Dexie`, tabla `heroes` con schema: `++id, superhero, publisher, alterEgo, *originators`
- Al arrancar la app, `InitDbService.init()` limpia y repuebla con `HEROES_LIST` (mock)
- `HeroesService` crea su propia instancia de `HeroesDB` y devuelve `Observable<T>` via `from(dexiePromise)`

### Bug conocido en Dexie
El schema usa `++id` (auto-increment) pero el mock inicializa héroes con `id: uuidv4()`. Los héroes seed se guardan bien, pero al editar uno, la carga de datos en el form puede fallar silenciosamente si Dexie no resuelve el UUID correctamente como primary key. Los héroes creados desde el form usan `generateId()` (`dc-batman`, `marvel-spider-man`) y funcionan sin problemas. **Pendiente**: cambiar `++id` a `id` en el schema.

## Patrones clave

- **Signals-first**: los componentes usan `signal()`, `computed()`, `rxResource()` — evitar `BehaviorSubject` o `ngOnChanges`
- **rxResource con `stream:`** para cargar datos reactivos — NO usar `loader:`
- **HeroMapper** convierte `IHero` a `ICard` para el componente `CardComponent`
- **Standalone components**: sin NgModules, todo via `imports: [...]` en el decorador
- **Lazy loading**: páginas cargan con `loadComponent` / `loadChildren`
- **`withComponentInputBinding()`** activo en el router — los params de ruta se inyectan como `input()`
- **URL-synced filters**: `searchTerm`, `publisher`, etc. se sincronizan con query params via `effect()`
- **`Location.back()`** en detail y form para preservar los filtros de la URL al volver

## CI/CD y ramas

### Workflows
- `.github/workflows/ci-develop.yml` — se ejecuta en PR → `develop`: jobs `Build` + `Test`
- `.github/workflows/ci-main.yml` — se ejecuta en PR → `main`: jobs `Build` + `Test` + `E2E`

### Branch protection
- `develop`: merge bloqueado si `Build` o `Test` fallan
- `main`: merge bloqueado si `Build`, `Test` o `E2E` fallan

### Flujo de trabajo
1. Feature branch → PR → `develop` (pasa build + unit tests)
2. `develop` → PR → `main` (pasa build + unit tests + e2e)

## Convenciones del proyecto

- Archivos en kebab-case, clases en PascalCase
- Prefijo `I` para interfaces, `E` para enums
- Services con `providedIn: 'root'`
- Unit tests con sufijo `.spec.ts` junto al archivo que testean
- E2e tests en `e2e/` con sufijo `.spec.ts`
- IDs de héroe generados como `{publisher-kebab}-{superhero-kebab}` (ej: `dc-batman`)
- Imágenes en `public/heroes/{hero-id}/`
- Push/PR/merge: solo cuando el desarrollador lo pide explícitamente
