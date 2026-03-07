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
- **Jasmine + Karma** — testing

## Comandos clave

```bash
npm start          # ng serve (http://localhost:4200)
npm test           # ng test (Karma + Jasmine)
npm run build      # ng build
```

## Estructura de carpetas

```
src/app/
├── core/
│   ├── db/            # HeroesDB (Dexie) — heroes.db.ts
│   ├── mocks/         # heroes.mock.ts — datos iniciales
│   ├── models/
│   │   ├── class/     # HeroModel (implementa IHero)
│   │   ├── enums/     # EPublisher
│   │   └── interfaces/ # IHero, IHeroFilters, IFileManager
│   └── services/
│       └── init-db/   # InitDbService — se ejecuta en app init
│
├── features/
│   ├── heroes/
│   │   ├── components/  # hero-3d-viewer, hero-biography, hero-comic-section,
│   │   │                #  hero-info-cards, hero-stats
│   │   ├── mappers/     # HeroMapper: IHero → ICard
│   │   ├── pages/       # heroes-list, hero-detail, hero-form
│   │   ├── pipes/       # ascending-order
│   │   ├── services/    # HeroesService
│   │   └── heroes.routes.ts
│   ├── about/
│   └── init/            # Página de inicio (/)
│
├── shared/
│   ├── pipes/    # clean-text
│   └── ui/       # card, navbar
│
├── config/
│   └── config.json
├── app.routes.ts
├── app.config.ts   # provideZonelessChangeDetection, provideAppInitializer
└── app.ts
```

## Rutas de la app

| Ruta | Componente |
|------|-----------|
| `/` | InitComponent |
| `/heroes/list` | HeroesListPageComponent |
| `/heroes/new` | HeroFormComponent |
| `/heroes/:id` | HeroDetailComponent |
| `/about` | AboutComponent |

## Modelo de datos principal

```typescript
interface IHero {
  id: string;          // generado: "dc-batman", "marvel-spider-man"
  key: string;
  superhero: string;
  publisher: EPublisher;
  alterEgo: string;
  firstAppearance: string;
  characters: string[];
  originators: string[];
  description: string;
  fileManager?: IFileManager; // { imgBg, imgHero?, imgFA }
}

enum EPublisher {
  DC = 'DC Comics',
  Marvel = 'Marvel Comics',
  // + IMAGE, DARK_HORSE, VALIANT, IDW, ARCHIE
}
```

## Base de datos (Dexie)

- `HeroesDB` extiende `Dexie`, tabla `heroes` indexada por: `id, superhero, publisher, alterEgo, *originators`
- Al arrancar la app, `InitDbService.init()` limpia y repuebla con `HEROES_LIST` (mock)
- `HeroesService` crea su propia instancia de `HeroesDB` y devuelve `Observable<T>` via `from(dexiePromise)`

## Patrones clave

- **Signals-first**: los componentes usan `signal()`, `computed()`, `rxResource()` — evitar `BehaviorSubject` o `ngOnChanges`
- **rxResource** para cargar datos reactivos (heroes-list lo usa con filtros como params)
- **HeroMapper** convierte `IHero` a `ICard` para el componente `CardComponent`
- **Standalone components**: sin NgModules, todo via `imports: [...]` en el decorador
- **Lazy loading**: rutas cargan componentes con `loadComponent` / `loadChildren`
- **`withComponentInputBinding()`** activo en el router — los params de ruta se inyectan como `@Input()`

## Estado actual / WIP

- `HeroFormComponent.save()` tiene la lógica comentada — falta conectar create/update con el servicio
- `hero-form` en modo edición tiene un bug: `this.charactersForm.patchValue(hero.originators)` sobrescribe characters con originators
- Los componentes de detalle (`hero-3d-viewer`, `hero-biography`, etc.) existen pero pueden estar incompletos
- No hay guards de ruta implementados aún (la arquitectura los prevé en `core/guards/`)

## Convenciones del proyecto

- Archivos en kebab-case, clases en PascalCase
- Prefijo `I` para interfaces, `E` para enums
- Services con `providedIn: 'root'`
- Tests con sufijo `.spec.ts` junto al archivo que testean
- IDs de héroe generados como `{publisher-kebab}-{superhero-kebab}` (ej: `dc-batman`)
- Imágenes en `public/heroes/{hero-id}/` (múltiples variantes por héroe)
