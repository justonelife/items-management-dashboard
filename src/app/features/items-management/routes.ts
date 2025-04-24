import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/items-management-dashboard/items-management-dashboard.component').then(c => c.ItemsManagementDashboard),
    title: 'Items Management Dashboard'
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./features/items-management-edit/items-management-edit.component').then(c => c.ItemsManagementEditComponent),
    title: 'Edit Item'
  }
]
