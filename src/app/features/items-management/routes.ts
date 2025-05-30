import { Routes } from "@angular/router";
import { ItemsManagementActionsComponent } from "./ui/actions/actions.component";
import { ItemSearchStore } from "./data-access/store";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardContainerComponent),
    title: 'Items Management',
    data: {
      // component: () => import('./ui/actions/actions.component').then(c => c.ItemsManagementActionsComponent),
      component: () => import('./features/filter/filter.component').then(c => c.FilterContainerComponent),
      subTitle: 'Manage your inventory and product catalog'
    },
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./features/items-management-edit/items-management-edit.component').then(c => c.ItemsManagementEditComponent),
    title: 'Edit Item'
  },
  {
    path: 'create',
    loadComponent: () => import('./features/items-management-create/items-management-create.component').then(c => c.ItemsManagementCreateComponent),
    title: 'Create Item'
  }
]
