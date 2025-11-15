import { Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found';

export const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () =>
      import('./features/heroes/heroes.routes').then((r) => r.heroesRoutes),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./features/not-found/not-found').then((c) => c.NotFoundComponent),
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
