import { Routes } from '@angular/router';
import { CommonService, ItemsManagementService } from '@features/items-management/data-access';

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
        providers: [ItemsManagementService, CommonService],
      }
    ]
  }
];
