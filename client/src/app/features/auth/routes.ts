import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/auth/auth.component').then(c => c.AppAuthComponent),
    title: 'Authenticate'
  }
];
