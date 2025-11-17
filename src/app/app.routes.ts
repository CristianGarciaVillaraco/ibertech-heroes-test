import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app').then((c) => c.App),
    children: [
      {
        path: 'heroes',
        loadChildren: () =>
          import('./features/heroes/heroes.routes').then((r) => r.heroesRoutes),
      },
      {
        path: '',
        redirectTo: 'heroes',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'heroes',
        pathMatch: 'full',
      },
    ],
  },
];
