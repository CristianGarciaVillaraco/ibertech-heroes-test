import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const heroesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
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
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];
