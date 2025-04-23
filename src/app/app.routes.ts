import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("@layout/one-column/one-column.component").then(c => c.OneColumnLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'items-management',
        pathMatch: 'full'
      },
      {
        path: 'items-management',
        loadChildren: () => import('@features/items-management/routes').then(r => r.routes),
      }
    ]
  }
];
