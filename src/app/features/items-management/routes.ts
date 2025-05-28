import { Routes } from "@angular/router";
import { ItemsManagementActionsComponent } from "./ui/actions/actions.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/items-management-dashboard/items-management-dashboard.component').then(c => c.ItemsManagementDashboard),
    title: 'Items Management',
    data: {
      component: () => import('./ui/actions/actions.component').then(c => c.ItemsManagementActionsComponent),
    }
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
