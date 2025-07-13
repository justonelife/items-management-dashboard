import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'items-management',
    pathMatch: 'full'
  },
  {
    path: 'items-management',
    loadChildren: () => import('@features/items-management/routes').then(r => r.routes),
  },
  {
    path: 'workflow',
    loadChildren: () => import('@features/workflow/routes').then(r => r.routes),
  },
  {
    path: 'challenges',
    loadChildren: () => import('@features/challenges/routes').then(r => r.routes),
  },
];
