import { Routes } from '@angular/router';

export const heroesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/heroes-list/heroes-list.component').then(
        (c) => c.HeroesListComponent
      ),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/hero-form/hero-form.component').then(
        (c) => c.HeroFormComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/hero-form/hero-form.component').then(
        (c) => c.HeroFormComponent
      ),
  },
];
