import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'heroes',
        loadChildren: () =>
          import('./features/heroes/heroes.routes').then((r) => r.heroesRoutes),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about.component').then(
            (c) => c.AboutComponent
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./features/init/init.component').then((c) => c.InitComponent),
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];
