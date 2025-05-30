import { Routes } from '@angular/router';
import { ItemsManagementService } from '@features/items-management/data-access';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'items-management',
    pathMatch: 'full'
  },
  {
    path: 'items-management',
    loadChildren: () => import('@features/items-management/routes').then(r => r.routes),
    // providers: [ItemsManagementService],
  }
];
